/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState, useCallback, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

// import {GoogleGenAI} from '@google/genai'; // Gemini API currently not used

type View = 'main' | 'room' | 'cardEditor' | 'deckEditor' | 'tokenEditor' | 'testGameView';
type P2PConnectionState = 'disconnected' | 'connecting' | 'connected' | 'failed';

// Mulligan Phase States for London Mulligan
type MulliganPhasePlayerState = 'deciding' | 'selecting_bottom' | 'kept';
type MulliganPhaseOpponentState = 'deciding' | 'kept'; // Opponent's selecting_bottom is internal to them

type RoomPhase = 'chat_only' | 'deck_selection' | 'MULLIGAN' | 'game_active' | 'game_over';
type TestGamePhase = 'deck_selection' | 'MULLIGAN' | 'game_active' | 'game_over';


interface ChatMessage {
  id: string;
  sender: 'me' | 'peer' | 'system';
  text: string;
  timestamp: number;
}

// --- Card Game Types ---
interface CardDefinition {
  id:string;
  name: string;
  cost: number;
  attack: number;
  defense: number;
  text: string;
  imageUrl?: string;
}

interface TokenDefinition {
  id: string;
  name: string;
  power?: number;
  toughness?: number;
  colors?: string[]; // e.g., ['W', 'U', 'B', 'R', 'G', 'C', 'Gold']
  types?: string[]; // e.g., ["Creature - Goblin"], ["Artifact - Treasure"]
  text?: string;
  imageUrl?: string;
  isCreature?: boolean; // Auto-derived if power/toughness present
}

interface TokenInstance {
  instanceId: string; // Unique ID for this token on the battlefield
  definition: TokenDefinition;
}


interface DeckData {
  id: string;
  name: string;
  cardIds: string[]; // Can now contain duplicate card IDs
}

interface NoteItem {
  id: string;
  title: string;
  text: string;
  isShared: boolean;
}

interface PlayerGameState {
  life: number;
  deck: CardDefinition[];
  hand: CardDefinition[];
  field: CardDefinition[];
  fieldTokens: TokenInstance[];
  graveyard: CardDefinition[];
  myNotes: NoteItem[];
}

interface OpponentGameState {
  life: number;
  deckCount: number;
  handCount: number;
  field: CardDefinition[];
  fieldTokens: TokenInstance[];
  graveyard: CardDefinition[];
  opponentNotes: NoteItem[];
}

// --- Signaling Message Types ---
interface SignalingMessage {
  msg_type: string;
  data: any;
  target?: string;
  sender?: string;
}

// --- Game Action Types ---
interface BaseGameAction {
  peerId: string;
}

interface DeckSelectedAction extends BaseGameAction {
  type: 'deck_selected';
  deckName: string;
  deckSize: number;
}

interface GameStartRequestAction extends BaseGameAction {
  type: 'game_start_request';
  initialOpponentHandSize: number; 
  initialOpponentLife: number;
}

interface PlayerDecisionMulliganAction extends BaseGameAction {
    type: 'player_decision_mulligan';
    actionTaken: 'kept_hand' | 'performed_mulligan_step';
    mulligansTakenThisGame: number; 
    resultingHandSize: number; 
}

interface DrawCardAction extends BaseGameAction {
  type: 'draw_card';
}

interface PlayCardAction extends BaseGameAction {
  type: 'play_card';
  card: CardDefinition;
}

interface MoveToGraveyardAction extends BaseGameAction {
  type: 'move_to_graveyard';
  card: CardDefinition; // Only for cards, tokens cease to exist
  fromZone: 'hand' | 'field';
  fromZoneIndex: number;
}

interface UpdateLifeAction extends BaseGameAction {
  type: 'update_life';
  newLifeTotal: number;
}

interface MoveFromGraveyardAction extends BaseGameAction {
  type: 'move_from_graveyard';
  card: CardDefinition;
  toZone: 'hand' | 'field';
  graveyardCardIndex: number; 
}

interface UpdateNotesAction extends BaseGameAction {
  type: 'update_notes';
  notes: NoteItem[];
}

interface CreateTokenAction extends BaseGameAction {
  type: 'create_token';
  tokenDefinition: TokenDefinition; // Send full definition for robustness
  instanceId: string;
}

interface RemoveTokenFromFieldAction extends BaseGameAction {
  type: 'remove_token_from_field';
  instanceId: string;
}


type GameActionPayload = DeckSelectedAction | GameStartRequestAction | PlayerDecisionMulliganAction | DrawCardAction | PlayCardAction | MoveToGraveyardAction | UpdateLifeAction | MoveFromGraveyardAction | UpdateNotesAction | CreateTokenAction | RemoveTokenFromFieldAction;
// --- End Game Action Types ---

// --- End Card Game Types ---

interface DraggedItemInfo {
  type: 'card' | 'token';
  data: CardDefinition | TokenInstance; // The actual card or tokenInstance object
  fromZone: 'hand' | 'field';
  originalIndex: number; // Index in the source array (hand, field, fieldTokens)
  isTestGame: boolean;
}


const MOCK_AVAILABLE_ROOMS = ['P2Pチャットルーム1'];
const INITIAL_LIFE_TOTAL = 20;
const INITIAL_DRAW_SIZE = 7; 

const FALLBACK_STUN_SERVERS: RTCIceServer[] = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
];

const TURN_API_URL = "https://p2p-sample.metered.live/api/v1/turn/credentials?apiKey=d51424dc9b80232dbc239f680b412cdbfe33";
const WS_SIGNALING_URL = window.location.protocol === 'https:' ? 'wss://' : 'ws://' + window.location.host + '/ws';


const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
const generatePeerId = () => Math.random().toString(36).substring(2, 10);

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface GroupedCardInfo {
  card: CardDefinition;
  count: number;
  originalIndices: number[];
}

function groupCardsById(cards: CardDefinition[]): GroupedCardInfo[] {
  const cardGroups = new Map<string, { cardDef: CardDefinition; count: number; indices: number[] }>();
  cards.forEach((card, index) => {
    if (cardGroups.has(card.id)) {
      const group = cardGroups.get(card.id)!;
      group.count++;
      group.indices.push(index);
    } else {
      cardGroups.set(card.id, { cardDef: card, count: 1, indices: [index] });
    }
  });
  const sortedGroups = Array.from(cardGroups.values()).sort((a, b) => Math.min(...a.indices) - Math.min(...b.indices));
  return sortedGroups.map(g => ({ card: g.cardDef, count: g.count, originalIndices: g.indices.sort((x,y) => x-y) }));
}

// --- MtgCard Component ---
interface MtgCardProps {
  card?: CardDefinition; // Optional if tokenInstance is provided
  tokenInstance?: TokenInstance; // Optional if card is provided
  isTokenDisplay?: boolean; // True if rendering a token
  context: 'field' | 'hand' | 'editor-list' | 'deck-selector' | 'graveyard-viewer' | 'token-editor-list' | 'token-selector';
  count?: number;
  originalIndex?: number; 
  isMyCard?: boolean;
  isSelected?: boolean; 
  onAddToDeck?: (cardId: string) => void;
  onRemoveFromDeck?: (cardId: string) => void;
  cardsInDeckCount?: number;
  onDragStartItem?: (event: React.DragEvent<HTMLDivElement>, item: CardDefinition | TokenInstance, itemType: 'card' | 'token', fromZone: 'hand' | 'field', originalIndex: number) => void;
  onDragEndItem?: (event: React.DragEvent<HTMLDivElement>) => void;
  isDraggable?: boolean;
  isDragging?: boolean;
  isDisabled?: boolean;
  onClick?: (originalIndexOrTokenDefId: number | string) => void; // For mulligan card selection or token definition selection in modal
  isSelectable?: boolean; 
  onMoveFromGraveyardToHand?: (card: CardDefinition, graveyardIndex: number) => void;
  onMoveFromGraveyardToField?: (card: CardDefinition, graveyardIndex: number) => void;
  isGameActive?: boolean; 
}

const MtgCard: React.FC<MtgCardProps> = ({
  card,
  tokenInstance,
  isTokenDisplay,
  context,
  count,
  originalIndex,
  isMyCard,
  isSelected,
  onAddToDeck,
  onRemoveFromDeck,
  cardsInDeckCount,
  onDragStartItem,
  onDragEndItem,
  isDraggable,
  isDragging,
  isDisabled,
  onClick,
  isSelectable,
  onMoveFromGraveyardToHand,
  onMoveFromGraveyardToField,
  isGameActive,
}) => {
  const displayItem = isTokenDisplay ? tokenInstance?.definition : card;
  if (!displayItem) return null; // Should not happen if props are correct

  const isCreature = isTokenDisplay ? 
    (displayItem as TokenDefinition).isCreature || ((displayItem as TokenDefinition).power !== undefined && (displayItem as TokenDefinition).power! > 0) || ((displayItem as TokenDefinition).toughness !== undefined && (displayItem as TokenDefinition).toughness! > 0)
    : (displayItem as CardDefinition).attack > 0 || (displayItem as CardDefinition).defense > 0;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragStartItem && typeof originalIndex === 'number' && isDraggable && !isDisabled) {
      const itemType = isTokenDisplay ? 'token' : 'card';
      const itemData = isTokenDisplay ? tokenInstance! : card!;
      onDragStartItem(e, itemData, itemType, context === 'hand' ? 'hand' : 'field', originalIndex);
      if (e.dataTransfer) {
         e.dataTransfer.effectAllowed = 'move';
      }
    }
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragEndItem && isDraggable && !isDisabled) {
        onDragEndItem(e);
    }
  };

  const handleClick = () => {
    if (onClick && !isDisabled && isSelectable) {
      if (context === 'token-selector' && isTokenDisplay) {
         onClick(displayItem.id); // Pass token definition ID for selection
      } else if (typeof originalIndex === 'number') {
         onClick(originalIndex);
      }
    }
  };

  const handleGYToHand = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (onMoveFromGraveyardToHand && typeof originalIndex === 'number' && isMyCard && isGameActive && card) {
      onMoveFromGraveyardToHand(card, originalIndex);
    }
  };

  const handleGYToField = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMoveFromGraveyardToField && typeof originalIndex === 'number' && isMyCard && isGameActive && card) {
      onMoveFromGraveyardToField(card, originalIndex);
    }
  };

  const renderColors = (colors?: string[]) => {
    if (!colors || colors.length === 0) return null;
    return (
      <div className="mtg-card-token-colors">
        {colors.map(color => (
          <span key={color} className={`color-indicator color-${color.toLowerCase()}`} title={color}></span>
        ))}
      </div>
    );
  };
  
  const tokenHeaderBgColor = () => {
    if (!isTokenDisplay || !tokenInstance?.definition.colors || tokenInstance.definition.colors.length === 0) return undefined;
    const colors = tokenInstance.definition.colors;
    if (colors.length === 1) {
        const colorMap: {[key:string]: string} = { 'w': '#f0f0c0', 'u': '#c0d8f0', 'b': '#c0c0c0', 'r': '#f0c0c0', 'g': '#c0f0c0', 'c': '#d0d0d0', 'gold': '#f0e0a0' };
        return colorMap[colors[0].toLowerCase()];
    }
    return '#e0d0b0'; // Default for multi-color or if specific single not mapped
  }


  return (
    <div 
      className={`mtg-card context-${context} ${isTokenDisplay ? 'token-display' : ''} ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isDisabled ? 'disabled-card' : ''} ${isSelectable ? 'selectable-card-overlay' : ''}`}
      aria-label={`${displayItem.name} ${isTokenDisplay ? 'token' : 'card'} ${isSelectable ? '(選択可能)' : ''} ${isDisabled ? '(操作不可)' : ''}`}
      draggable={isDraggable && isMyCard && (context === 'hand' || context === 'field') && !isDisabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      role={isSelectable ? 'button' : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      onKeyPress={isSelectable ? (e) => (e.key === 'Enter' || e.key === ' ') && handleClick() : undefined}
    >
      <div className="mtg-card-header" style={isTokenDisplay ? { backgroundColor: tokenHeaderBgColor() } : {}}>
        <span className="mtg-card-name" title={displayItem.name}>{displayItem.name}</span>
        {!isTokenDisplay && <span className="mtg-card-cost">{(displayItem as CardDefinition).cost}</span>}
        {isTokenDisplay && renderColors((displayItem as TokenDefinition).colors)}
      </div>
      <div className="mtg-card-image-area">
        {displayItem.imageUrl ? (
          <img src={displayItem.imageUrl} alt={displayItem.name} />
        ) : (
          <div className="mtg-card-no-image"><span>{isTokenDisplay ? 'Token' : 'No Image'}</span></div>
        )}
      </div>
      {(context === 'field' || context === 'editor-list' || context === 'token-editor-list' || context === 'graveyard-viewer' || context === 'hand' || context === 'token-selector') && (
         <div className="mtg-card-type-line">
            {isTokenDisplay ? ((displayItem as TokenDefinition).types?.join(' / ') || (isCreature ? 'Token Creature' : 'Token')) : (isCreature ? 'Creature' : 'Spell')}
         </div>
      )}
      <div className="mtg-card-text-box scrollable-text">
        <p>{displayItem.text || ' '}</p>
      </div>
      {isCreature && (
        <div className="mtg-card-pt">
          {isTokenDisplay ? `${(displayItem as TokenDefinition).power || 0}/${(displayItem as TokenDefinition).toughness || 0}` : `${(displayItem as CardDefinition).attack}/${(displayItem as CardDefinition).defense}`}
        </div>
      )}
      {count && count > 1 && context === 'field' && !isTokenDisplay && (
        <span className="mtg-card-count-badge">x{count}</span>
      )}
      
      {context === 'deck-selector' && onAddToDeck && onRemoveFromDeck && card && (
        <div className="mtg-card-actions deck-selector-actions">
            <span>In deck: {cardsInDeckCount}</span>
            <button onClick={() => onAddToDeck(card.id)} aria-label={`Add ${card.name}`}>Add</button>
            <button onClick={() => onRemoveFromDeck(card.id)} disabled={cardsInDeckCount === 0} aria-label={`Remove ${card.name}`}>Remove</button>
        </div>
      )}

      {context === 'graveyard-viewer' && isMyCard && isGameActive && !isTokenDisplay && card && (
        <div className="mtg-card-actions graveyard-actions">
          {onMoveFromGraveyardToHand && <button onClick={handleGYToHand} className="card-action-button gy-to-hand">To Hand</button>}
          {onMoveFromGraveyardToField && <button onClick={handleGYToField} className="card-action-button gy-to-field">To Field</button>}
        </div>
      )}
    </div>
  );
};


function App() {
  const [currentView, setCurrentView] = useState<View>('main');
  const [roomNameInput, setRoomNameInput] = useState('');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // General loading, e.g. for entering room
  const [isLoadingP2PSetup, setIsLoadingP2PSetup] = useState(false); // Specific for P2P init

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  const [localSdpManual, setLocalSdpManual] = useState('');
  const [remoteSdpInputManual, setRemoteSdpInputManual] = useState('');
  const [localIceCandidatesManual, setLocalIceCandidatesManual] = useState<RTCIceCandidateInit[]>([]);
  const [remoteIceCandidatesInputManual, setRemoteIceCandidatesInputManual] = useState('');
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [p2pConnectionStatus, setP2PConnectionStatus] = useState<P2PConnectionState>('disconnected');
  
  const [myPeerId, setMyPeerId] = useState<string>('');
  const [opponentActualPeerId, setOpponentActualPeerId] = useState<string | null>(null);
  const [isP2PInitiator, setIsP2PInitiator] = useState(false);
  
  // WebSocket signaling state
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const [wsConnectionStatus, setWsConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'failed'>('disconnected');
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  
  // ICE candidate queuing for timing issues
  const [pendingIceCandidates, setPendingIceCandidates] = useState<RTCIceCandidateInit[]>([]);
  const [handshakeStep, setHandshakeStep] = useState<string>('waiting');

  const chatMessagesContainerRef = useRef<HTMLDivElement>(null);
  const cardImportFileRef = useRef<HTMLInputElement>(null);
  const deckImportFileRef = useRef<HTMLInputElement>(null);
  const tokenImportFileRef = useRef<HTMLInputElement>(null);


  const [allCards, setAllCards] = useState<CardDefinition[]>(() => {
    try {
      const stored = localStorage.getItem('cardGame_allCards');
      return stored ? JSON.parse(stored) : [];
    } catch (e) { console.error("Error loading cards from localStorage", e); return []; }
  });
  const [allDecks, setAllDecks] = useState<DeckData[]>(() => {
    try {
      const stored = localStorage.getItem('cardGame_allDecks');
      return stored ? JSON.parse(stored) : [];
    } catch (e) { console.error("Error loading decks from localStorage", e); return []; }
  });
  const [allTokenDefinitions, setAllTokenDefinitions] = useState<TokenDefinition[]>(() => {
    try {
      const stored = localStorage.getItem('cardGame_allTokenDefinitions');
      return stored ? JSON.parse(stored) : [];
    } catch (e) { console.error("Error loading token definitions from localStorage", e); return []; }
  });


  const [editingCard, setEditingCard] = useState<Partial<CardDefinition> | null>(null);
  const [cardForm, setCardForm] = useState<Partial<CardDefinition>>({ name: '', cost: 0, attack: 0, defense: 0, text: '', imageUrl: '' });
  
  const [editingDeck, setEditingDeck] = useState<Partial<DeckData> & { cardsInDeck?: CardDefinition[] } | null>(null);
  const [deckForm, setDeckForm] = useState<{name: string, selectedCardIds: string[]}>({ name: '', selectedCardIds: []});
  
  const [editingTokenDefinition, setEditingTokenDefinition] = useState<Partial<TokenDefinition> | null>(null);
  const [tokenDefinitionForm, setTokenDefinitionForm] = useState<Partial<TokenDefinition>>({ name: '', power: 0, toughness: 0, colors: [], types: [], text: '', imageUrl: ''});


  // P2P Game State
  const [roomPhase, setRoomPhase] = useState<RoomPhase>('chat_only');
  const [myPlayerGameState, setMyPlayerGameState] = useState<PlayerGameState | null>(null);
  const [opponentPlayerState, setOpponentPlayerState] = useState<OpponentGameState | null>(null);
  const [mySelectedDeckId, setMySelectedDeckId] = useState<string | null>(null);
  const [opponentSelectedDeckInfo, setOpponentSelectedDeckInfo] = useState<{name: string, size: number, peerId: string} | null>(null);
  const [isGameReadyToStart, setIsGameReadyToStart] = useState(false);
  
  // London Mulligan State (P2P)
  const [myMulliganCount, setMyMulliganCount] = useState(0);
  const [opponentMulliganCount, setOpponentMulliganCount] = useState(0);
  const [myMulliganPhaseState, setMyMulliganPhaseState] = useState<MulliganPhasePlayerState>('deciding');
  const [opponentMulliganPhaseState, setOpponentMulliganPhaseState] = useState<MulliganPhaseOpponentState>('deciding');
  const [cardsToPutOnBottomSelectedIndices, setCardsToPutOnBottomSelectedIndices] = useState<number[]>([]);


  // Test Game State
  const [testGamePhase, setTestGamePhase] = useState<TestGamePhase>('deck_selection');
  const [testPlayerGameState, setTestPlayerGameState] = useState<PlayerGameState | null>(null);
  const [testOpponentMockState, setTestOpponentMockState] = useState<OpponentGameState | null>(null);
  const [testSelectedDeckId, setTestSelectedDeckId] = useState<string | null>(null);
  const [testGameError, setTestGameError] = useState<string | null>(null);
  const [testMulliganCount, setTestMulliganCount] = useState(0);
  const [testMulliganPhaseState, setTestMulliganPhaseState] = useState<MulliganPhasePlayerState>('deciding');
  const [testCardsToPutOnBottomSelectedIndices, setTestCardsToPutOnBottomSelectedIndices] = useState<number[]>([]);


  const [isGraveyardModalOpen, setIsGraveyardModalOpen] = useState(false);
  const [viewingGraveyardFor, setViewingGraveyardFor] = useState<'my' | 'opponent' | null>(null);
  const [graveyardToView, setGraveyardToView] = useState<CardDefinition[]>([]); // Tokens don't go to graveyard view

  const [isCreateTokenModalOpen, setIsCreateTokenModalOpen] = useState(false);
  const [isTestGameTokenModal, setIsTestGameTokenModal] = useState(false);


  const [draggingItemInfo, setDraggingItemInfo] = useState<DraggedItemInfo | null>(null);
  const [isFieldDropTarget, setIsFieldDropTarget] = useState(false);
  const [isGraveyardDropTarget, setIsGraveyardDropTarget] = useState(false);


  useEffect(() => {
    try { localStorage.setItem('cardGame_allCards', JSON.stringify(allCards)); }
    catch (e) { console.error("Failed to save cards:", e); setError("カードの保存に失敗しました。");}
  }, [allCards]);

  useEffect(() => {
    try { localStorage.setItem('cardGame_allDecks', JSON.stringify(allDecks)); }
    catch (e) { console.error("Failed to save decks:", e); setError("デッキの保存に失敗しました。");}
  }, [allDecks]);

  useEffect(() => {
    try { localStorage.setItem('cardGame_allTokenDefinitions', JSON.stringify(allTokenDefinitions)); }
    catch (e) { console.error("Failed to save token definitions:", e); setError("トークン定義の保存に失敗しました。");}
  }, [allTokenDefinitions]);


  useEffect(() => {
    if (activeRoom && chatMessages) {
      try {
        localStorage.setItem(`chatHistory_${activeRoom}`, JSON.stringify(chatMessages));
      } catch (e) {
        console.error("Failed to save chat history to localStorage:", e);
        setError("チャット履歴の保存に失敗しました。");
      }
    }
  }, [chatMessages, activeRoom]);

  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const getCardById = useCallback((cardId: string): CardDefinition | undefined => {
    return allCards.find(c => c.id === cardId);
  }, [allCards]);

  const getTokenDefinitionById = useCallback((id: string): TokenDefinition | undefined => {
    return allTokenDefinitions.find(td => td.id === id);
  }, [allTokenDefinitions]);


  const sendDataChannelMessage = useCallback((payload: object) => {
    if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
      try {
        dataChannelRef.current.send(JSON.stringify(payload));
      } catch (e) {
        console.error("Failed to send data channel message:", e);
        setError("データチャネルでのメッセージ送信に失敗しました。");
      }
    } else {
      console.warn("Data channel not open, cannot send game message:", payload);
      setError("P2P接続が確立していないか、データチャネルが開いていません。");
    }
  }, []);

  const handleCloseGraveyardModal = useCallback(() => {
    setIsGraveyardModalOpen(false);
    setViewingGraveyardFor(null);
    setGraveyardToView([]);
  }, []);

  const handleOpenCreateTokenModal = (isTest: boolean) => {
    setIsTestGameTokenModal(isTest);
    setIsCreateTokenModalOpen(true);
  };
  const handleCloseCreateTokenModal = () => setIsCreateTokenModalOpen(false);


  // Effect to transition from MULLIGAN phase to GAME_ACTIVE (P2P)
  useEffect(() => {
    if (roomPhase === 'MULLIGAN' && myMulliganPhaseState === 'kept' && opponentMulliganPhaseState === 'kept') {
      setRoomPhase('game_active');
      setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `両プレイヤーが手札をキープしました。ゲーム開始！${isP2PInitiator ? 'あなたのターンです。' : '相手のターンです。'}`, timestamp: Date.now()}]);
    }
  }, [myMulliganPhaseState, opponentMulliganPhaseState, roomPhase, isP2PInitiator]);


  const handleGameAction = useCallback((action: GameActionPayload) => {
    if (action.peerId && action.peerId !== myPeerId) {
        setOpponentActualPeerId(action.peerId); 
    }

    switch (action.type) {
      case 'deck_selected':
        if (action.peerId !== myPeerId) { 
            const oldOpponentDeckName = opponentSelectedDeckInfo?.name;
            setOpponentSelectedDeckInfo({ name: action.deckName, size: action.deckSize, peerId: action.peerId });

            let opponentChatMessageText = `相手 (${action.peerId.substring(0,6)}) がデッキ「${action.deckName}」(${action.deckSize}枚)`;
            if (oldOpponentDeckName && oldOpponentDeckName !== action.deckName) {
                 opponentChatMessageText += ` に変更しました。`;
            } else if (oldOpponentDeckName && oldOpponentDeckName === action.deckName) {
                 opponentChatMessageText += ` を再度選択しました。`;
            } else {
                 opponentChatMessageText += ` を選択しました。`;
            }
            
            if (mySelectedDeckId) {
                opponentChatMessageText += ` あなたも選択済みです。`;
                setIsGameReadyToStart(true);
            } else {
                opponentChatMessageText += ` あなたの選択を待っています。`;
            }
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: opponentChatMessageText, timestamp: Date.now()}]);
        }
        break;
      case 'game_start_request': // Received by non-initiator
        if (action.peerId !== myPeerId && mySelectedDeckId && opponentSelectedDeckInfo) {
          const myDeck = allDecks.find(d => d.id === mySelectedDeckId);
          if (myDeck) {
            const myDeckCards = myDeck.cardIds.map(id => getCardById(id)).filter(Boolean) as CardDefinition[];
            const shuffledMyDeck = shuffleArray(myDeckCards);
            const initialMyHand = shuffledMyDeck.slice(0, INITIAL_DRAW_SIZE);
            const remainingMyDeck = shuffledMyDeck.slice(INITIAL_DRAW_SIZE);
            
            const defaultMyNotes: NoteItem[] = [{ id: generateId(), title: 'Note 1', text: '', isShared: false }];
            const defaultOpponentNotes: NoteItem[] = [{ id: generateId(), title: 'Note 1', text: '', isShared: false }];


            setMyPlayerGameState({
                life: action.initialOpponentLife, 
                deck: remainingMyDeck,
                hand: initialMyHand,
                field: [],
                fieldTokens: [],
                graveyard: [],
                myNotes: defaultMyNotes,
            });
            setOpponentPlayerState({
                life: INITIAL_LIFE_TOTAL, 
                deckCount: opponentSelectedDeckInfo.size - INITIAL_DRAW_SIZE, 
                handCount: INITIAL_DRAW_SIZE,
                field: [],
                fieldTokens: [],
                graveyard: [],
                opponentNotes: defaultOpponentNotes, 
            });
            setRoomPhase('MULLIGAN');
            setMyMulliganCount(0);
            setOpponentMulliganCount(0);
            setMyMulliganPhaseState('deciding');
            setOpponentMulliganPhaseState('deciding');
            setCardsToPutOnBottomSelectedIndices([]);
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `ゲームセットアップ完了。マリガンフェイズです。両プレイヤーは手札${INITIAL_DRAW_SIZE}枚で開始。`, timestamp: Date.now()}]);
          } else {
            console.error("game_start_request: My selected deck not found. mySelectedDeckId:", mySelectedDeckId);
            setError("ゲーム開始エラー：自分の選択したデッキが見つかりません。");
          }
        }
        break;
      case 'player_decision_mulligan':
        if (action.peerId !== myPeerId) {
            setOpponentMulliganCount(action.mulligansTakenThisGame);
            setOpponentPlayerState(prev => prev ? {...prev, handCount: action.resultingHandSize} : null);

            let decisionText = '';
            if (action.actionTaken === 'kept_hand') {
                setOpponentMulliganPhaseState('kept');
                decisionText = `手札をキープしました (最終手札 ${action.resultingHandSize}枚、マリガン ${action.mulligansTakenThisGame}回)。`;
            } else { 
                setOpponentMulliganPhaseState('deciding'); 
                decisionText = `マリガンを行い、手札を ${action.resultingHandSize}枚にしました (マリガン ${action.mulligansTakenThisGame}回目)。`;
            }
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `相手(${action.peerId.substring(0,6)})が${decisionText}`, timestamp: Date.now()}]);
        }
        break;
      case 'draw_card':
         if (action.peerId !== myPeerId && opponentPlayerState) {
            setOpponentPlayerState(prev => prev ? {...prev, deckCount: prev.deckCount -1, handCount: prev.handCount + 1} : null);
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `相手(${action.peerId.substring(0,6)})がカードを1枚ドローしました。`, timestamp: Date.now()}]);
         }
        break;
      case 'play_card':
        if (action.peerId !== myPeerId && opponentPlayerState && action.card) {
            setOpponentPlayerState(prev => prev ? {
                ...prev,
                handCount: prev.handCount - 1,
                field: [...prev.field, action.card] 
            } : null);
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `相手(${action.peerId.substring(0,6)})がカード「${action.card.name}」をプレイしました。`, timestamp: Date.now()}]);
        }
        break;
      case 'move_to_graveyard': // Only for cards
        if (action.peerId !== myPeerId && opponentPlayerState && action.card) {
            const { card, fromZone } = action;
            let chatMsg = `相手(${action.peerId.substring(0,6)})がカード「${card.name}」を`;
            setOpponentPlayerState(prev => {
                if (!prev) return null;
                let newHandCount = prev.handCount;
                let newField = [...prev.field];
                const newGraveyard = prev.graveyard ? [...prev.graveyard, card] : [card];

                if (fromZone === 'hand') {
                    newHandCount--;
                    chatMsg += `手札から墓地へ送りました。`;
                } else if (fromZone === 'field') {
                    const fieldIndexToRemove = newField.findIndex(c => c.id === card.id); 
                    if (fieldIndexToRemove > -1) {
                        newField.splice(fieldIndexToRemove, 1);
                        chatMsg += `フィールドから墓地へ送りました。`;
                    } else {
                        console.warn(`Opponent move_to_graveyard from field: card ${card.name} (ID: ${card.id}) not found.`);
                        chatMsg += `フィールドから墓地へ送ろうとしましたが、見つかりませんでした。`;
                    }
                }
                return { ...prev, handCount: newHandCount, field: newField, graveyard: newGraveyard };
            });
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: chatMsg, timestamp: Date.now()}]);
        }
        break;
      case 'update_life':
        if (action.peerId !== myPeerId && opponentPlayerState) {
            setOpponentPlayerState(prev => prev ? {...prev, life: action.newLifeTotal} : null);
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `相手(${action.peerId.substring(0,6)})がライフを ${action.newLifeTotal} に変更しました。`, timestamp: Date.now()}]);
        }
        break;
      case 'move_from_graveyard':
        if (action.peerId !== myPeerId && opponentPlayerState) {
            const { card, toZone } = action;
            let chatMsg = `相手(${action.peerId.substring(0,6)})がカード「${card.name}」を墓地から`;
            setOpponentPlayerState(prev => {
                if (!prev) return null;
                const newGraveyard = [...prev.graveyard];
                const gyIndexToRemove = newGraveyard.findIndex(c => c.id === card.id);
                if (gyIndexToRemove > -1) {
                    newGraveyard.splice(gyIndexToRemove, 1);
                } else {
                    console.warn(`Opponent move_from_graveyard: card ${card.name} (ID: ${card.id}) not found in their graveyard representation. Decrementing count only.`);
                }
                
                let newHandCount = prev.handCount;
                let newField = [...prev.field];

                if (toZone === 'hand') {
                    newHandCount++;
                    chatMsg += "手札へ移動しました。";
                } else { 
                    newField.push(card);
                    chatMsg += "フィールドへ移動しました。";
                }
                return { ...prev, handCount: newHandCount, field: newField, graveyard: newGraveyard };
            });
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: chatMsg, timestamp: Date.now()}]);
        }
        break;
      case 'update_notes':
        if (action.peerId !== myPeerId) {
            setOpponentPlayerState(prev => prev ? { 
                ...prev, 
                opponentNotes: action.notes 
            } : null);
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `相手(${action.peerId.substring(0,6)})がメモを更新しました。`, timestamp: Date.now()}]);
        }
        break;
      case 'create_token':
        if (action.peerId !== myPeerId && opponentPlayerState) {
            // Add token definition to local store if it's new (for robustness if not already synced)
            if (!allTokenDefinitions.find(td => td.id === action.tokenDefinition.id)) {
                setAllTokenDefinitions(prev => [...prev, action.tokenDefinition]);
            }
            const newTokenInstance: TokenInstance = { instanceId: action.instanceId, definition: action.tokenDefinition };
            setOpponentPlayerState(prev => prev ? {
                ...prev,
                fieldTokens: [...prev.fieldTokens, newTokenInstance]
            } : null);
            setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `相手(${action.peerId.substring(0,6)})がトークン「${action.tokenDefinition.name}」を生成しました。`, timestamp: Date.now()}]);
        }
        break;
      case 'remove_token_from_field':
        if (action.peerId !== myPeerId && opponentPlayerState) {
            const tokenToRemove = opponentPlayerState.fieldTokens.find(t => t.instanceId === action.instanceId);
            setOpponentPlayerState(prev => prev ? {
                ...prev,
                fieldTokens: prev.fieldTokens.filter(t => t.instanceId !== action.instanceId)
            } : null);
            if (tokenToRemove) {
                 setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `相手(${action.peerId.substring(0,6)})のトークン「${tokenToRemove.definition.name}」がフィールドを離れました。`, timestamp: Date.now()}]);
            }
        }
        break;
    }
  }, [myPeerId, opponentPlayerState, mySelectedDeckId, allDecks, getCardById, opponentSelectedDeckInfo, setIsGameReadyToStart, setRoomPhase, setError, allTokenDefinitions]);

  const handleGameActionRef = useRef(handleGameAction);
  useEffect(() => {
    handleGameActionRef.current = handleGameAction;
  }, [handleGameAction]);

  const resetP2PGameStates = useCallback(() => {
    setRoomPhase('chat_only');
    setMyPlayerGameState(null); 
    setOpponentPlayerState(null); 
    setMySelectedDeckId(null);
    setOpponentSelectedDeckInfo(null);
    setIsGameReadyToStart(false);
    setMyMulliganCount(0);
    setOpponentMulliganCount(0);
    setMyMulliganPhaseState('deciding');
    setOpponentMulliganPhaseState('deciding');
    setCardsToPutOnBottomSelectedIndices([]);
    setOpponentActualPeerId(null); 
    handleCloseGraveyardModal();
    handleCloseCreateTokenModal();
  },[handleCloseGraveyardModal, handleCloseCreateTokenModal]); // Added handleCloseCreateTokenModal

  const setupDataChannelEvents = useCallback((channel: RTCDataChannel) => {
    channel.onopen = () => {
      console.log('Data channel opened');
      setP2PConnectionStatus('connected');
      setChatMessages(prev => [...prev, {id: Date.now().toString(), sender: 'system', text: 'P2P接続が確立しました！チャットまたはゲームを開始できます。', timestamp: Date.now()}]);
      setError(null);
      console.log('データチャンネル開通 - activeRoom:', activeRoom, 'roomPhase:', roomPhase);
      if (activeRoom && roomPhase === 'chat_only') {
        console.log('デッキ選択フェーズに移行します');
        setRoomPhase('deck_selection');
      } else {
        console.log('デッキ選択フェーズに移行しない理由:', {activeRoom, roomPhase});
      }
    };

    channel.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data as string);
        if (message.messageType === 'chat' && message.payload && typeof message.payload.text === 'string' && typeof message.payload.sender === 'string') {
            if(message.payload.sender !== myPeerId) { 
                setOpponentActualPeerId(message.payload.sender);
            }
            setChatMessages(prev => [...prev, { id: Date.now().toString(), sender: 'peer', text: message.payload.text, timestamp: Date.now() }]);
        } else if (message.messageType === 'game_action' && message.payload) {
            handleGameActionRef.current(message.payload as GameActionPayload);
        } else {
            console.warn("Unknown data channel message structure:", message);
        }
      } catch (e) {
          const receivedText = event.data as string;
          setChatMessages(prev => [...prev, { id: Date.now().toString(), sender: 'peer', text: `[RAW] ${receivedText}`, timestamp: Date.now() }]);
          console.warn("Received non-JSON message on data channel, treating as raw text:", receivedText, e);
      }
    };

    channel.onclose = () => {
      console.log('Data channel closed');
      // This handler can be called when the channel is closed locally (e.g. by handleP2PDisconnectManual)
      // or if the remote peer closes it.
      if (peerConnectionRef.current) { // Only update status if the PC itself isn't already being torn down
          if (p2pConnectionStatus !== 'failed') {
             setP2PConnectionStatus('disconnected');
          }
          setChatMessages(prev => [...prev, {id: Date.now().toString(), sender: 'system', text: 'データチャネルが閉じました。接続が失われたかリセットされた可能性があります。', timestamp: Date.now()}]);
          resetP2PGameStates();
      } else {
          console.log("Data channel closed, but peer connection already handled/null (likely local reset).");
      }
    };
    channel.onerror = (errorEvent) => {
      console.error('Data channel error:', errorEvent);
      setError('データチャネルエラーが発生しました。');
      setP2PConnectionStatus('failed');
    };
  }, [p2pConnectionStatus, myPeerId, setRoomPhase, setError, resetP2PGameStates]);

  const initializePeerConnection = useCallback(async (): Promise<RTCPeerConnection | null> => {
    

    setIsLoadingP2PSetup(true);
    setError(null);
    let pc: RTCPeerConnection | null = null;

    try {
      console.log("Fetching TURN credentials...");
      const response = await fetch(TURN_API_URL);
      let fetchedIceServers: RTCIceServer[] = [];

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch TURN credentials: ${response.status} ${response.statusText}`, errorText);
        setError(`TURNサーバー情報の取得に失敗: ${response.status}. STUNサーバーで試行します。`);
        fetchedIceServers = [...FALLBACK_STUN_SERVERS];
      } else {
        fetchedIceServers = await response.json();
        console.log("Successfully fetched TURN credentials:", fetchedIceServers);
        if (!Array.isArray(fetchedIceServers) || fetchedIceServers.length === 0) {
            console.warn("Fetched TURN credentials are not a valid array or are empty. Using fallback STUN servers.");
            setError("取得したTURNサーバー情報が空です。STUNサーバーで試行します。");
            fetchedIceServers = [...FALLBACK_STUN_SERVERS];
        }
      }
      
      const pcConfig: RTCConfiguration = { iceServers: fetchedIceServers };
      console.log("Initializing RTCPeerConnection with config:", pcConfig);
      pc = new RTCPeerConnection(pcConfig);
      peerConnectionRef.current = pc;

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("=== ICE候補送信 ===");
          console.log("Local ICE candidate generated:", event.candidate);
          
          // Send ICE candidate through WebSocket if available
          if (wsConnection && wsConnection.readyState === WebSocket.OPEN && activeRoom) {
            console.log('ICE候補をWebSocket経由で送信中...');
            wsConnection.send(JSON.stringify({
              msg_type: 'ice-candidate',
              data: event.candidate.toJSON(),
              target: connectedUsers.find(id => id !== myPeerId) || null
            }));
            console.log('✓ ICE候補送信完了');
          } else {
            // Fallback to manual exchange
            console.log('WebSocket利用不可、手動交換にフォールバック');
            setLocalIceCandidatesManual(prev => [...prev, event.candidate!.toJSON()]);
          }
        } else {
          console.log('ICE候補生成完了 (null candidate received)');
        }
      };
      
      pc.onicegatheringstatechange = () => {
        if (!peerConnectionRef.current) return;
        console.log('P2P ICE Gathering State:', peerConnectionRef.current.iceGatheringState);
        if (peerConnectionRef.current.iceGatheringState === 'complete') {
            setChatMessages(prev => [...prev, {
                id: generateId(),
                sender: 'system',
                text: 'ローカルICE候補の収集が完了しました。全ての候補を相手に伝えてください。',
                timestamp: Date.now()
            }]);
        }
      };

      pc.oniceconnectionstatechange = () => {
        if (!peerConnectionRef.current) return;
        console.log('=== ICE接続状態変更 ===');
        console.log('P2P ICE Connection State:', peerConnectionRef.current.iceConnectionState);
        
        switch (peerConnectionRef.current.iceConnectionState) {
          case 'checking':
            console.log('ICE接続チェック中...');
            setHandshakeStep('ice-checking');
            if (p2pConnectionStatus !== 'connected') {
                 setP2PConnectionStatus('connecting');
            }
            break;
          case 'connected':
          case 'completed':
            console.log('✓ ICE接続成功！');
            setHandshakeStep('ice-connected');
            
            // Only update to connected if data channel is also open or expected to open.
            if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
              console.log('=== P2P接続完全確立 ===');
              setP2PConnectionStatus('connected');
              setHandshakeStep('completed');
              
              setChatMessages(prev => [...prev, {
                id: generateId(),
                sender: 'system',
                text: '🎉 P2P接続が完全に確立されました！ゲーム開始準備完了',
                timestamp: Date.now()
              }]);
              
              console.log('P2P接続確立 - activeRoom:', activeRoom, 'roomPhase:', roomPhase);
              if (activeRoom && roomPhase === 'chat_only') {
                console.log('デッキ選択フェーズに移行します');
                setRoomPhase('deck_selection');
              } else {
                console.log('デッキ選択フェーズに移行しない理由:', {activeRoom, roomPhase});
              }
            } else if (!dataChannelRef.current && p2pConnectionStatus !== 'connected') {
               console.log('ICE接続成功、データチャンネル待機中...');
               setP2PConnectionStatus('connecting'); 
            }
            break;
          case 'disconnected':
             // Can sometimes recover from 'disconnected', but for manual setup, treat as a persistent issue.
            if (p2pConnectionStatus !== 'failed' && p2pConnectionStatus !== 'disconnected') {
                setP2PConnectionStatus('disconnected');
                setError('P2P接続が切断されました。再接続を試みてください。');
                resetP2PGameStates(); // Reset game state on disconnect for manual setup
            }
            break;
          case 'failed':
            if (p2pConnectionStatus !== 'failed') {
                setP2PConnectionStatus('failed');
                setError('P2P接続に失敗しました。ネットワーク設定や相手との情報交換を確認してください。');
                resetP2PGameStates();
            }
            break;
          case 'closed':
            if (p2pConnectionStatus !== 'disconnected' && p2pConnectionStatus !== 'failed') {
                setP2PConnectionStatus('disconnected'); // Treat closed like disconnected
                setError('P2P接続が閉じられました。');
                resetP2PGameStates();
            }
            break;
          default: 
            if (p2pConnectionStatus !== 'connected' && p2pConnectionStatus !== 'failed') { 
              setP2PConnectionStatus('connecting');
            }
        }
      };

      pc.ondatachannel = (event) => {
        console.log('Data channel received');
        dataChannelRef.current = event.channel;
        setupDataChannelEvents(event.channel);
        if (peerConnectionRef.current && (peerConnectionRef.current.iceConnectionState === 'connected' || peerConnectionRef.current.iceConnectionState === 'completed')) {
            setP2PConnectionStatus('connected');
            console.log('データチャンネル受信時のP2P接続確立 - activeRoom:', activeRoom, 'roomPhase:', roomPhase);
            if ( roomPhase === 'chat_only') {
              console.log('デッキ選択フェーズに移行します');
              setRoomPhase('deck_selection');
            } else {
              console.log('デッキ選択フェーズに移行しない理由:', {activeRoom, roomPhase});
            }
        }
      };
      
    } catch (e: any) {
      console.error("Error in initializePeerConnection:", e);
      setError(`P2P初期化エラー: ${e.message}`);
      setP2PConnectionStatus('failed');
      if(pc) { pc.close(); }
      peerConnectionRef.current = null;
      pc = null;
    } finally {
      setIsLoadingP2PSetup(false);
    }
    return pc;
  }, [setupDataChannelEvents, setRoomPhase, resetP2PGameStates, p2pConnectionStatus, setError]);

  const connectToSignalingServer = useCallback(async (roomName: string): Promise<WebSocket | null> => {
    if (wsConnection) {
      wsConnection.close();
    }

    setWsConnectionStatus('connecting');
    setIsJoiningRoom(true);
    
    try {
      const ws = new WebSocket(WS_SIGNALING_URL);
      
      ws.onopen = () => {
        console.log('WebSocket connected to signaling server');
        setWsConnectionStatus('connected');
        setWsConnection(ws);
        console.log('WebSocket state after setWsConnection:', ws.readyState);
        
        // Join room immediately after connection
        ws.send(JSON.stringify({
          msg_type: 'join-room',
          data: {
            room_id: roomName,
            max_players: 2
          }
        }));
      };

      ws.onmessage = (event) => {
        console.log('WebSocket message received, ws.readyState:', ws.readyState);
        handleSignalingMessage(JSON.parse(event.data), ws);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setWsConnectionStatus('disconnected');
        setWsConnection(null);
        setConnectedUsers([]);
        setIsJoiningRoom(false);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setWsConnectionStatus('failed');
        setError('シグナリングサーバーへの接続に失敗しました。');
        setIsJoiningRoom(false);
      };

      return ws;
    } catch (error) {
      console.error('Failed to connect to signaling server:', error);
      setWsConnectionStatus('failed');
      setError('シグナリングサーバーへの接続に失敗しました。');
      setIsJoiningRoom(false);
      return null;
    }
  }, [wsConnection, myPeerId]);

  const handleSignalingMessage = useCallback(async (message: SignalingMessage, wsRef?: WebSocket) => {
    console.log('Received signaling message:', message);
    console.log('Message structure - msg_type:', message.msg_type, 'sender:', message.sender, 'target:', message.target);
    
    switch (message.msg_type) {
      case 'welcome':
        console.log('Welcome message received, client ID:', message.data.client_id);
        break;
        
      case 'room-joined':
        console.log('room-joined メッセージ受信:', message.data);
        
        console.log('activeRoom を設定:', message.data.room_id);
        setConnectedUsers(message.data.players || []);
        setChatMessages(prev => [...prev, {
          id: generateId(),
          sender: 'system',
          text: `ルーム「${message.data.room_id}」に参加しました。接続されているユーザー: ${message.data.player_count}人`,
          timestamp: Date.now()
        }]);
        break;
        
      case 'user-joined':
        setConnectedUsers(prev => {
          const newUsers = [...(prev || [])];
          if (!newUsers.includes(message.data.user_id)) {
            newUsers.push(message.data.user_id);
          }
          return newUsers;
        });
        setChatMessages(prev => [...prev, {
          id: generateId(),
          sender: 'system', 
          text: `新しいユーザーが参加しました: ${message.data.user_id}`,
          timestamp: Date.now()
        }]);
        
        // If this is the second user and we don't have a connection, show connection button
        if (message.data.player_count === 2 && p2pConnectionStatus === 'disconnected') {
          setChatMessages(prev => [...prev, {
            id: generateId(),
            sender: 'system',
            text: '2人揃いました！接続開始ボタンが表示されます。',
            timestamp: Date.now()
          }]);
        }
        break;
        
      case 'user-left':
        setConnectedUsers(prev => prev.filter(id => id !== message.data.user_id));
        setChatMessages(prev => [...prev, {
          id: generateId(),
          sender: 'system',
          text: `ユーザーが退出しました: ${message.data.user_id}`,
          timestamp: Date.now()
        }]);
        break;
        
      case 'offer':
        if (message.sender) {
          await handleReceivedOffer(message.data, message.sender, wsRef);
        }
        break;
        
      case 'answer':
        if (message.sender) {
          await handleReceivedAnswer(message.data, message.sender);
        }
        break;
        
      case 'ice-candidate':
        if (message.sender) {
          await handleReceivedIceCandidate(message.data, message.sender);
        }
        break;
        
      case 'room-error':
        console.log('room-error受信:', message.data);
        setError(`ルーム参加エラー: ${message.data.error}`);
        // room-errorでactiveRoomをリセットしない
        break;
        
      default:
        console.warn('Unknown signaling message type:', message.msg_type);
    }
  }, [p2pConnectionStatus, setChatMessages]);

  const initiateAutomaticP2PConnection = useCallback(async (isInitiator: boolean) => {
    if (peerConnectionRef.current) {
      console.log('P2P connection already exists, skipping initialization');
      return;
    }

    console.log('=== WebRTC ハンドシェイク開始 ===');
    console.log('Role:', isInitiator ? 'オファー側' : 'アンサー側');
    setIsP2PInitiator(isInitiator);
    setHandshakeStep(isInitiator ? 'creating-offer' : 'waiting-for-offer');
    setPendingIceCandidates([]); // Clear any pending ICE candidates
    
    const pc = await initializePeerConnection();
    if (!pc) {
      setError('P2P接続の初期化に失敗しました。');
      setHandshakeStep('failed');
      return;
    }

    if (isInitiator) {
      // オファー側の処理
      console.log('1. オファーSDP送信準備中...');
      setHandshakeStep('creating-offer');
      
      // Create data channel and offer
      const dc = pc.createDataChannel('game_and_chat_auto');
      dataChannelRef.current = dc;
      setupDataChannelEvents(dc);
      
      try {
        console.log('2. オファーSDP作成中...');
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        
        console.log('3. オファーSDP送信中...', offer);
        setHandshakeStep('offer-sent');
        
        // Send offer through WebSocket
        console.log(JSON.stringify({
            msg_type: 'offer',
            data: offer,
            target: connectedUsers.find(id => id !== myPeerId) || null
          }))
          
        if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
          wsConnection.send(JSON.stringify({
            msg_type: 'offer',
            data: offer,
            target: connectedUsers.find(id => id !== myPeerId) || null
          }));
          
          setChatMessages(prev => [...prev, {
            id: generateId(),
            sender: 'system',
            text: '✓ ステップ1: オファーSDP送信完了',
            timestamp: Date.now()
          }]);
        } else {
          throw new Error('WebSocket接続が利用できません');
        }
      } catch (error) {
        console.error('Error creating/sending offer:', error);
        setError('オファーの作成または送信に失敗しました。');
        setHandshakeStep('failed');
      }
    } else {
      // アンサー側は待機状態
      console.log('アンサー側: オファー受信を待機中...');
      setChatMessages(prev => [...prev, {
        id: generateId(),
        sender: 'system',
        text: 'アンサー側として待機中... オファーを待っています',
        timestamp: Date.now()
      }]);
    }
  }, [initializePeerConnection, setupDataChannelEvents, wsConnection, connectedUsers, myPeerId, setChatMessages]);

  const processPendingIceCandidates = useCallback(async () => {
    if (!peerConnectionRef.current || !peerConnectionRef.current.remoteDescription) {
      console.log('Remote description not set yet, cannot process pending ICE candidates');
      return;
    }

    console.log(`Processing ${pendingIceCandidates.length} pending ICE candidates`);
    
    for (const candidate of pendingIceCandidates) {
      try {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('✓ Pending ICE candidate processed successfully');
      } catch (error) {
        console.error('Error processing pending ICE candidate:', error);
      }
    }
    
    setPendingIceCandidates([]);
    console.log('All pending ICE candidates processed');
  }, [pendingIceCandidates]);

  const handleReceivedOffer = useCallback(async (offer: RTCSessionDescriptionInit, fromPeerId: string, wsRef?: WebSocket) => {
    console.log('=== オファー受信 ===');
    console.log('4. オファー受信:', fromPeerId);
    console.log('Offer SDP:', offer);
    
    if (peerConnectionRef.current) {
      console.log('既にP2P接続が存在します。無視します。');
      return;
    }

    setHandshakeStep('offer-received');
    setIsP2PInitiator(false);
    
    
    
    setChatMessages(prev => [...prev, {
      id: generateId(),
      sender: 'system',
      text: '✓ ステップ2: オファー受信完了',
      timestamp: Date.now()
    }]);

    const pc = await initializePeerConnection();
    if (!pc) {
      setError('P2P接続の初期化に失敗しました。');
      setHandshakeStep('failed');
      return;
    }

    try {
      console.log('5. オファー情報セット中...');
      setHandshakeStep('setting-offer');
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      
      console.log('6. アンサーSDP作成中...');
      setHandshakeStep('creating-answer');
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      console.log('7. アンサーSDP送信中...', answer);
      setHandshakeStep('answer-sent');
      
      // Send answer through WebSocket
      console.log(JSON.stringify({
          msg_type: 'answer',
          data: answer,
          target: fromPeerId
        }))
      const activeWs = wsRef || wsConnection;
      console.log('=== デバッグ情報 ===');
      console.log('activeRoom:', activeRoom);
      console.log('roomPhase:', roomPhase);
      console.log('WebSocket状態:', activeWs?.readyState === WebSocket.CONNECTING ? 'CONNECTING' : 
                                   activeWs?.readyState === WebSocket.OPEN ? 'OPEN' : 
                                   activeWs?.readyState === WebSocket.CLOSING ? 'CLOSING' : 
                                   activeWs?.readyState === WebSocket.CLOSED ? 'CLOSED' : 'UNKNOWN');
      if (activeWs && activeWs.readyState === WebSocket.OPEN) {
        activeWs.send(JSON.stringify({
          msg_type: 'answer',
          data: answer,
          target: fromPeerId
        }));
        
        setChatMessages(prev => [...prev, {
          id: generateId(),
          sender: 'system',
          text: '✓ ステップ3: アンサーSDP送信完了',
          timestamp: Date.now()
        }]);
        
        // Process any pending ICE candidates now that remote description is set
        await processPendingIceCandidates();
      } else {
        throw new Error('WebSocket接続が利用できません');
      }
    } catch (error) {
      console.error('Error handling offer:', error);
      setError('オファーの処理に失敗しました。');
      setHandshakeStep('failed');
    }
  }, [initializePeerConnection, wsConnection, setChatMessages, processPendingIceCandidates]);

  const handleReceivedAnswer = useCallback(async (answer: RTCSessionDescriptionInit, fromPeerId: string) => {
    console.log('=== アンサー受信 ===');
    console.log('8. アンサー受信:', fromPeerId);
    console.log('Answer SDP:', answer);
    
    if (!peerConnectionRef.current) {
      console.error('No peer connection when receiving answer');
      setError('P2P接続が初期化されていません。');
      setHandshakeStep('failed');
      return;
    }

    try {
      console.log('9. アンサー情報セット中...');
      setHandshakeStep('setting-answer');
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      
      setChatMessages(prev => [...prev, {
        id: generateId(),
        sender: 'system',
        text: '✓ ステップ4: アンサー情報セット完了',
        timestamp: Date.now()
      }]);
      
      console.log('10. ICE候補交換を開始...');
      setHandshakeStep('ice-exchange');
      
      // Process any pending ICE candidates now that remote description is set
      await processPendingIceCandidates();
      
    } catch (error) {
      console.error('Error handling answer:', error);
      setError('アンサーの処理に失敗しました。');
      setHandshakeStep('failed');
    }
  }, [setChatMessages, processPendingIceCandidates]);

  const handleReceivedIceCandidate = useCallback(async (candidate: RTCIceCandidateInit, fromPeerId: string) => {
    console.log('=== ICE候補受信 ===');
    console.log('ICE候補受信 from:', fromPeerId);
    console.log('Candidate:', candidate);
    
    if (!peerConnectionRef.current) {
      console.error('No peer connection when receiving ICE candidate');
      return;
    }

    // Check if remote description is set
    if (!peerConnectionRef.current.remoteDescription) {
      console.log('Remote description not set yet, queuing ICE candidate');
      setPendingIceCandidates(prev => {
        const updated = [...prev, candidate];
        console.log(`ICE候補をキューに追加 (total: ${updated.length})`);
        return updated;
      });
      return;
    }

    try {
      console.log('ICE候補情報セット中...');
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      console.log('✓ ICE候補追加成功');
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }, []);


  const handleP2PDisconnectManual = useCallback(async () => { // Made async just in case, though not strictly needed now
    console.log("Manual P2P disconnect initiated.");
    if (dataChannelRef.current) {
      dataChannelRef.current.onclose = null; // Prevent onclose handler from firing during manual teardown
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.onicecandidate = null;
      peerConnectionRef.current.oniceconnectionstatechange = null;
      peerConnectionRef.current.ondatachannel = null;
      peerConnectionRef.current.onicegatheringstatechange = null;
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setLocalSdpManual('');
    setRemoteSdpInputManual('');
    setLocalIceCandidatesManual([]);
    setRemoteIceCandidatesInputManual('');
    setPendingIceCandidates([]);
    setHandshakeStep('waiting');
    
    if (p2pConnectionStatus !== 'failed') { // Avoid overwriting a more specific 'failed' status
        setP2PConnectionStatus('disconnected');
    }
    setIsP2PInitiator(false);
    resetP2PGameStates(); 
    // Do not add system message here, as it's a local action.
    // The calling function (e.g. LeaveRoom) can add context-specific messages.
  }, [resetP2PGameStates, p2pConnectionStatus]);


  const handleSendChatMessage = () => {
    if (chatInput.trim()) {
        sendDataChannelMessage({messageType: 'chat', payload: { text: chatInput, sender: myPeerId } });
        setChatMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', text: chatInput, timestamp: Date.now() }]);
        setChatInput('');
    } else if (!chatInput.trim()) {
        setError('メッセージが空です。');
    }
  };

  const handleLeaveRoom = useCallback(async () => {
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `ルーム「${activeRoom}」から退出しました。`, timestamp: Date.now()}]);
    
    // Close WebSocket connection
    if (wsConnection) {
      wsConnection.close();
      setWsConnection(null);
    }
    setWsConnectionStatus('disconnected');
    setConnectedUsers([]);
    setPendingIceCandidates([]);
    setHandshakeStep('waiting');
    
    await handleP2PDisconnectManual(); 
    setActiveRoom(null);
    setCurrentView('main');
    setError(null);
    setMyPeerId(''); 
    // setChatMessages([]); // Chat messages are cleared by handleP2PDisconnectManual via resetP2PGameStates or should be kept per room
  }, [handleP2PDisconnectManual, activeRoom, wsConnection]);

  const handleEnterP2PRoom = useCallback(async (roomToEnter: string) => {
    if (!roomToEnter.trim() && currentView === 'main' && !roomNameInput.trim()) {
        setError('部屋名を入力するか、既存の部屋を選択してください。');
        return;
    }
    const targetRoom = currentView === 'main' && roomNameInput.trim() ? roomNameInput : roomToEnter;

    setIsLoading(true);
    await handleP2PDisconnectManual(); // Ensure clean state before entering a new room

    const newPeerId = generatePeerId();
    setMyPeerId(newPeerId);

    setActiveRoom(targetRoom);
    setCurrentView('room');
    setRoomNameInput('');
    setError(null);

    // Load chat history
    const storageKey = `chatHistory_${targetRoom}`;
    const storedMessagesJson = localStorage.getItem(storageKey);
    let initialMessages: ChatMessage[] = [];
    if (storedMessagesJson) {
      try {
        initialMessages = JSON.parse(storedMessagesJson) as ChatMessage[];
      } catch (e) {
        console.error("Failed to parse stored chat history:", e);
        initialMessages.push({id:Date.now().toString(), sender:'system', text:`チャット履歴の読み込みに失敗しました。`, timestamp:Date.now()});
      }
    }
    setChatMessages([...initialMessages, {id:Date.now().toString(), sender:'system', text:`ルーム「${targetRoom}」に入室しました。シグナリングサーバーに接続中...`, timestamp:Date.now()}]);

    // Connect to WebSocket signaling server
    const ws = await connectToSignalingServer(targetRoom);
    if (!ws) {
      setError('シグナリングサーバーへの接続に失敗しました。手動接続を使用してください。');
      setChatMessages(prev => [...prev, {id:Date.now().toString(), sender:'system', text:`手動P2P接続を使用してください。あなたのP2P ID: ${newPeerId.substring(0,6)}`, timestamp:Date.now()}]);
    }
    
    setIsLoading(false);
  }, [currentView, roomNameInput, handleP2PDisconnectManual, connectToSignalingServer]);


  const copyToClipboard = async (text: string, type: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert(`${type} をクリップボードにコピーしました。`);
    } catch (err) {
      console.error(`クリップボードへのコピーに失敗しました (${type}):`, err);
      setError(`クリップボードへのコピーに失敗しました。手動でコピーしてください。`);
    }
  };

  const handleCreateOfferManual = useCallback(async () => {
    await handleP2PDisconnectManual();
    setIsP2PInitiator(true);
    setLocalIceCandidatesManual([]); // Clear previous candidates specifically
    
    const pc = await initializePeerConnection();
    if (!pc) {
        setError('P2P接続の初期化に失敗しました。TURNサーバー情報を確認してください。');
        setP2PConnectionStatus('failed'); // Ensure status reflects failure
        return;
    }

    const dc = pc.createDataChannel('game_and_chat_manual');
    dataChannelRef.current = dc;
    setupDataChannelEvents(dc);
    
    try {
      setP2PConnectionStatus('connecting');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      setLocalSdpManual(JSON.stringify(offer));
      setChatMessages(prev => [...prev, {id:Date.now().toString(), sender:'system', text:`オファーを作成しました。SDPを相手に伝えてください。ICE候補は集まり次第表示されます。`, timestamp: Date.now()}]);
    } catch (e: any) { 
        console.error("Error creating offer:", e); 
        setError(`手動オファー作成失敗: ${e.message}`); 
        setP2PConnectionStatus('failed');
    }
  }, [initializePeerConnection, setupDataChannelEvents, handleP2PDisconnectManual, setError]);

  const handleCreateAnswerManual = useCallback(async () => {
    if (!remoteSdpInputManual.trim()) { setError('相手のオファーSDP(手動)を入力してください。'); return; }
    await handleP2PDisconnectManual();
    setIsP2PInitiator(false);
    setLocalIceCandidatesManual([]); // Clear previous candidates specifically

    const pc = await initializePeerConnection();
    if (!pc) {
        setError('P2P接続の初期化に失敗しました。TURNサーバー情報を確認してください。');
        setP2PConnectionStatus('failed');
        return;
    }

    try {
      setP2PConnectionStatus('connecting');
      const offer = JSON.parse(remoteSdpInputManual) as RTCSessionDescriptionInit;
      if (offer.type !== 'offer') {
        setError("入力されたSDPはオファーではありません。相手のオファーSDPを正しく入力してください。");
        setP2PConnectionStatus('failed');
        return;
      }
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      setLocalSdpManual(JSON.stringify(answer));
      setRemoteSdpInputManual(''); // Clear after use
      setChatMessages(prev => [...prev, {id:Date.now().toString(), sender:'system', text:`アンサーを作成しました。SDPを相手に伝えてください。ICE候補は集まり次第表示されます。`, timestamp: Date.now()}]);
    } catch (e: any) { 
        console.error("Error creating answer:", e); 
        setError(`手動アンサー作成失敗: ${e.message}. オファーSDPが正しいか確認してください。`); 
        setP2PConnectionStatus('failed');
    }
  }, [remoteSdpInputManual, initializePeerConnection, handleP2PDisconnectManual, setError]);

  const handleSetRemoteInfoManual = useCallback(async () => {
    const pc = peerConnectionRef.current;
    if (!pc) { setError('P2P接続が初期化されていません。まずオファーまたはアンサーを作成してください。'); return; }
    
    let sdpSuccessfullySet = false;
    if (remoteSdpInputManual.trim()) {
        try {
            const sdp = JSON.parse(remoteSdpInputManual) as RTCSessionDescriptionInit;
            if (isP2PInitiator) { // Offerer expects an answer
                if (sdp.type === 'answer' && pc.signalingState === 'have-local-offer') {
                    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                    setChatMessages(prev => [...prev, {id:Date.now().toString(), sender:'system', text:`相手のアンサーSDPを設定しました。`, timestamp: Date.now()}]);
                    sdpSuccessfullySet = true;
                } else {
                    setError("無効なSDPタイプまたはP2P状態です。オファー側はアンサーSDPを期待しています。現在の状態: " + pc.signalingState);
                }
            } else { // Answerer expects nothing more typically, offer was set in handleCreateAnswerManual
                 setError("アンサー側は通常、このステップでSDPを再設定しません。オファーSDPはアンサー作成時に設定されます。");
                 console.warn("Answerer attempting to set remote SDP via handleSetRemoteInfoManual. This is unusual.");
            }
            if(sdpSuccessfullySet) setRemoteSdpInputManual(''); // Clear only if successfully processed
        } catch (e: any) { 
            console.error("Error setting remote SDP:", e); 
            setError(`相手のSDP設定失敗(手動): ${e.message}. 有効なJSON形式のSDPを入力してください。`); 
        }
    }

    if (remoteIceCandidatesInputManual.trim()) {
      try {
        let parsedCandidates = JSON.parse(remoteIceCandidatesInputManual);
        if (!Array.isArray(parsedCandidates)) {
            if (typeof parsedCandidates === 'object' && parsedCandidates !== null && (parsedCandidates.candidate || parsedCandidates.sdpMid)) {
                 console.warn("Remote ICE input was a single candidate object, wrapping in an array. Please provide a JSON array of candidates.");
                 parsedCandidates = [parsedCandidates];
            } else {
                throw new Error("ICE候補はJSON配列形式である必要があります。");
            }
        }
        const candidates = parsedCandidates as RTCIceCandidateInit[];
        
        let addedCount = 0;
        for (const cand of candidates) {
            if (cand && (typeof cand.candidate === 'string' || typeof cand.sdpMid === 'string' || typeof cand.sdpMLineIndex === 'number')) {
                // Ensure remote description is set before adding candidates if it's an answerer setting offerer's candidates.
                // Offerer sets answer first, then candidates. Answerer sets offer first, then candidates.
                if (pc.remoteDescription) {
                    await pc.addIceCandidate(new RTCIceCandidate(cand));
                    addedCount++;
                } else {
                     console.warn("Skipping ICE candidate, remote description not yet set.", cand);
                     setError("ICE候補を追加する前に、相手のSDP（オファー/アンサー）を設定する必要があります。");
                     break; 
                }
            } else {
                console.warn("Skipping invalid remote ICE candidate object:", cand);
            }
        }
        if (addedCount > 0) {
            setChatMessages(prev => [...prev, {id:Date.now().toString(), sender:'system', text:`${addedCount}件の相手ICE候補を設定しました。`, timestamp: Date.now()}]);
            setRemoteIceCandidatesInputManual(''); // Clear only if successfully processed
        } else if (candidates.length > 0 && addedCount === 0 && !error) { // If there were candidates but none were added
            setError("ICE候補の追加に失敗しました。有効な候補か、または相手のSDPが先に設定されているか確認してください。");
        }

      } catch (e: any) { 
          console.error("Error processing remote ICE candidates:", e); 
          setError(`相手ICE候補設定失敗(手動): ${e.message}. 有効なJSON配列を入力してください。`);
      }
    }
    // setError(null); // Don't clear error here, let specific error messages persist
  }, [isP2PInitiator, remoteSdpInputManual, remoteIceCandidatesInputManual, setError, error]); // Added error to dependency array


  const handleCardFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardForm(prev => ({ ...prev, [name]: name === 'cost' || name === 'attack' || name === 'defense' ? parseInt(value) || 0 : value }));
  };

  const handleSaveCard = () => {
    if (!cardForm.name?.trim()) { setError("カード名を入力してください。"); return; }
    if (editingCard?.id) {
      setAllCards(allCards.map(c => c.id === editingCard.id ? { ...c, ...cardForm, id: editingCard.id } as CardDefinition : c));
    } else {
      setAllCards([...allCards, { ...cardForm, id: generateId() } as CardDefinition]);
    }
    setCardForm({ name: '', cost: 0, attack: 0, defense: 0, text: '', imageUrl: '' });
    setEditingCard(null);
    setError(null);
  };

  const handleEditCard = (card: CardDefinition) => {
    setEditingCard(card);
    setCardForm(card);
  };

  const handleDeleteCard = (cardId: string) => {
    if (window.confirm("このカードを本当に削除しますか？このカードを使用しているデッキからも削除されます。")) {
        setAllCards(allCards.filter(c => c.id !== cardId));
        setAllDecks(prevDecks => prevDecks.map(deck => ({
            ...deck,
            cardIds: deck.cardIds.filter(id => id !== cardId)
        })));
        setError(null);
    }
  };

  const handleExportCards = () => {
    if (allCards.length === 0) { setError("エクスポートするカードがありません。"); return; }
    try {
      const jsonString = JSON.stringify(allCards, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cards.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setError(null);
    } catch (e) { console.error("カードのエクスポートに失敗しました:", e); setError("カードのエクスポートに失敗しました。"); }
  };

  const handleImportCardsFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') { setError("ファイル内容の読み取りに失敗しました。"); return; }
        const importedCards = JSON.parse(text) as CardDefinition[];
        if (!Array.isArray(importedCards)) { setError("無効なJSON形式です。カードの配列ではありません。"); return; }
        setAllCards(prevAllCards => {
            const cardsMap = new Map(prevAllCards.map(card => [card.id, card]));
            let importedCount = 0; let skippedCount = 0;
            importedCards.forEach(importedCard => {
                if (importedCard && typeof importedCard.id === 'string' && typeof importedCard.name === 'string' &&
                    typeof importedCard.cost === 'number' && typeof importedCard.attack === 'number' &&
                    typeof importedCard.defense === 'number' && typeof importedCard.text === 'string') {
                    cardsMap.set(importedCard.id, { ...cardsMap.get(importedCard.id), ...importedCard });
                    importedCount++;
                } else { console.warn("インポート中に無効なカード構造をスキップ:", importedCard); skippedCount++; }
            });
            if (skippedCount > 0) { setError(`${skippedCount}件のカードが無効な構造のためスキップされました。`); } else { setError(null); }
            alert(`${importedCount}件のカードがインポート/更新されました。${skippedCount > 0 ? skippedCount + '件はスキップされました。' : ''}`);
            return Array.from(cardsMap.values());
        });
      } catch (err) { console.error("カードのインポートに失敗しました:", err); setError("カードのインポートに失敗しました。ファイルが正しいJSON形式であることを確認してください。");
      } finally { if (cardImportFileRef.current) cardImportFileRef.current.value = ""; }
    };
    reader.onerror = () => { setError("ファイル読み込みエラーが発生しました。"); if (cardImportFileRef.current) cardImportFileRef.current.value = ""; };
    reader.readAsText(file);
  };


  const handleTokenDefinitionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setTokenDefinitionForm(prev => {
            const currentColors = prev.colors || [];
            if (checked) {
                return { ...prev, colors: [...currentColors, name] };
            } else {
                return { ...prev, colors: currentColors.filter(c => c !== name) };
            }
        });
    } else if (name === "types") {
         setTokenDefinitionForm(prev => ({ ...prev, types: value.split(',').map(s => s.trim()).filter(Boolean) }));
    } else {
        setTokenDefinitionForm(prev => ({ ...prev, [name]: (name === 'power' || name === 'toughness') ? parseInt(value) || 0 : value }));
    }
  };

  const handleSaveTokenDefinition = () => {
    if (!tokenDefinitionForm.name?.trim()) { setError("トークン名を入力してください。"); return; }
    
    const definitionToSave: TokenDefinition = {
        id: editingTokenDefinition?.id || generateId(),
        name: tokenDefinitionForm.name!,
        power: tokenDefinitionForm.power || 0,
        toughness: tokenDefinitionForm.toughness || 0,
        colors: tokenDefinitionForm.colors || [],
        types: tokenDefinitionForm.types || [],
        text: tokenDefinitionForm.text || '',
        imageUrl: tokenDefinitionForm.imageUrl || '',
        isCreature: (tokenDefinitionForm.power || 0) > 0 || (tokenDefinitionForm.toughness || 0) > 0 || (tokenDefinitionForm.types || []).some(t => t.toLowerCase().includes('creature')),
    };

    if (editingTokenDefinition?.id) {
      setAllTokenDefinitions(allTokenDefinitions.map(td => td.id === editingTokenDefinition.id ? definitionToSave : td));
    } else {
      setAllTokenDefinitions([...allTokenDefinitions, definitionToSave]);
    }
    setTokenDefinitionForm({ name: '', power: 0, toughness: 0, colors: [], types: [], text: '', imageUrl: '' });
    setEditingTokenDefinition(null);
    setError(null);
  };

  const handleEditTokenDefinition = (tokenDef: TokenDefinition) => {
    setEditingTokenDefinition(tokenDef);
    setTokenDefinitionForm(tokenDef);
  };

  const handleDeleteTokenDefinition = (tokenDefId: string) => {
    if (window.confirm("このトークン定義を本当に削除しますか？")) {
        setAllTokenDefinitions(allTokenDefinitions.filter(td => td.id !== tokenDefId));
        setError(null);
    }
  };

  const handleExportTokenDefinitions = () => {
    if (allTokenDefinitions.length === 0) { setError("エクスポートするトークン定義がありません。"); return; }
    try {
      const jsonString = JSON.stringify(allTokenDefinitions, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'token_definitions.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      setError(null);
    } catch (e) { console.error("トークン定義のエクスポートに失敗:", e); setError("トークン定義のエクスポートに失敗。"); }
  };
  
  const handleImportTokenDefinitionsFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') { setError("ファイル内容の読み取り失敗。"); return; }
        const importedDefs = JSON.parse(text) as TokenDefinition[];
        if (!Array.isArray(importedDefs)) { setError("無効なJSON形式。トークン定義の配列ではありません。"); return; }
        
        setAllTokenDefinitions(prevDefs => {
            const defsMap = new Map(prevDefs.map(def => [def.id, def]));
            let importedCount = 0; let skippedCount = 0;
            importedDefs.forEach(importedDef => {
                if (importedDef && typeof importedDef.id === 'string' && typeof importedDef.name === 'string') { // Basic validation
                    defsMap.set(importedDef.id, { ...defsMap.get(importedDef.id), ...importedDef });
                    importedCount++;
                } else { console.warn("インポート中に無効なトークン定義構造をスキップ:", importedDef); skippedCount++; }
            });
            if (skippedCount > 0) { setError(`${skippedCount}件のトークン定義が無効な構造のためスキップ。`); } else { setError(null); }
            alert(`${importedCount}件のトークン定義がインポート/更新されました。${skippedCount > 0 ? skippedCount + '件はスキップ。' : ''}`);
            return Array.from(defsMap.values());
        });
      } catch (err) { console.error("トークン定義のインポート失敗:", err); setError("トークン定義のインポート失敗。JSON形式確認。");
      } finally { if (tokenImportFileRef.current) tokenImportFileRef.current.value = ""; }
    };
    reader.onerror = () => { setError("ファイル読み込みエラー。"); if (tokenImportFileRef.current) tokenImportFileRef.current.value = ""; };
    reader.readAsText(file);
  };



  const handleDeckFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckForm(prev => ({ ...prev, name: e.target.value }));
  };

  const addCardCopyToDeck = (cardId: string) => {
    setDeckForm(prev => ({
        ...prev,
        selectedCardIds: [...prev.selectedCardIds, cardId]
    }));
  };

  const removeCardCopyFromDeck = (cardId: string) => {
    setDeckForm(prev => {
        const indexToRemove = prev.selectedCardIds.indexOf(cardId); 
        if (indexToRemove === -1) return prev; 
        const newSelectedCardIds = [...prev.selectedCardIds];
        newSelectedCardIds.splice(indexToRemove, 1);
        return { ...prev, selectedCardIds: newSelectedCardIds };
    });
  };


  const handleSaveDeck = () => {
    if (!deckForm.name.trim()) { setError("デッキ名を入力してください。"); return; }
    if (editingDeck?.id) {
      setAllDecks(allDecks.map(d => d.id === editingDeck.id ? { ...d, name: deckForm.name, cardIds: deckForm.selectedCardIds } : d));
    } else {
      setAllDecks([...allDecks, { id: generateId(), name: deckForm.name, cardIds: deckForm.selectedCardIds }]);
    }
    setDeckForm({ name: '', selectedCardIds: [] });
    setEditingDeck(null);
    setError(null);
  };

  const handleEditDeck = (deck: DeckData) => {
    setEditingDeck(deck);
    setDeckForm({ name: deck.name, selectedCardIds: [...deck.cardIds] }); 
  };

  const handleDeleteDeck = (deckId: string) => {
     if (window.confirm("このデッキを本当に削除しますか？")) { setAllDecks(allDecks.filter(d => d.id !== deckId)); setError(null); }
  };

  const handleExportDecks = () => {
    if (allDecks.length === 0) { setError("エクスポートするデッキがありません。"); return; }
    try {
      const jsonString = JSON.stringify(allDecks, null, 2); 
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'decks.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      setError(null);
    } catch (e) { console.error("デッキのエクスポートに失敗しました:", e); setError("デッキのエクスポートに失敗しました。"); }
  };

  const handleImportDecksFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') { setError("ファイル内容の読み取りに失敗しました。"); return; }
        const importedDecks = JSON.parse(text) as DeckData[];
         if (!Array.isArray(importedDecks)) { setError("無効なJSON形式です。デッキの配列ではありません。"); return; }
        const validCardIdsSet = new Set(allCards.map(c => c.id));
        let skippedDeckCount = 0; let decksProcessedInfo: string[] = [];
        const processedImportedDecks = importedDecks.map(deck => {
          if (!deck || typeof deck.id !== 'string' || typeof deck.name !== 'string' || !Array.isArray(deck.cardIds)) {
            console.warn("インポート中に無効なデッキ構造をスキップ:", deck); skippedDeckCount++; return null;
          }
          let removedCardIdsCount = 0;
          const validatedCardIds = deck.cardIds.filter(id => {
            const isValid = validCardIdsSet.has(id);
            if (!isValid) { console.warn(`デッキ "${deck.name}" (ID: ${deck.id}) - 存在しないカードID "${id}" を発見。除去します。`); removedCardIdsCount++; }
            return isValid;
          });
          if (removedCardIdsCount > 0) { decksProcessedInfo.push(`デッキ「${deck.name}」から存在しないカードID ${removedCardIdsCount}件を除去。`); }
          return { ...deck, cardIds: validatedCardIds }; 
        }).filter(Boolean) as DeckData[];
        setAllDecks(prevAllDecks => {
            const decksMap = new Map(prevAllDecks.map(d => [d.id, d]));
            processedImportedDecks.forEach(importedDeck => { decksMap.set(importedDeck.id, { ...decksMap.get(importedDeck.id), ...importedDeck }); });
            return Array.from(decksMap.values());
        });
        let importSummary = `${processedImportedDecks.length}件のデッキがインポート/更新されました。`;
        if (skippedDeckCount > 0) importSummary += ` ${skippedDeckCount}件はスキップ。`;
        if (decksProcessedInfo.length > 0) importSummary += `\n詳細:\n${decksProcessedInfo.join('\n')}`;
        alert(importSummary);
        setError(decksProcessedInfo.length > 0 || skippedDeckCount > 0 ? importSummary.split('\n')[0] + " (詳細はコンソール確認)" : null);
      } catch (err) { console.error("デッキのインポートに失敗:", err); setError("デッキのインポート失敗。JSON形式確認。");
      } finally { if (deckImportFileRef.current) deckImportFileRef.current.value = ""; }
    };
    reader.onerror = () => { setError("ファイル読み込みエラー。"); if (deckImportFileRef.current) deckImportFileRef.current.value = ""; };
    reader.readAsText(file);
  };
  
  const handleSelectDeckForGame = (deckId: string) => {
    const selectedDeck = allDecks.find(d => d.id === deckId);
    if (selectedDeck) {
        const isReselection = mySelectedDeckId === deckId;
        const previousDeckName = mySelectedDeckId ? allDecks.find(d=>d.id===mySelectedDeckId)?.name : null;
        setMySelectedDeckId(deckId);
        
        const payload: DeckSelectedAction = {
            type: 'deck_selected',
            deckName: selectedDeck.name,
            deckSize: selectedDeck.cardIds.length,
            peerId: myPeerId
        };
        sendDataChannelMessage({ messageType: 'game_action', payload });

        let chatMessageText = '';
        if (isReselection) {
            chatMessageText = `デッキ「${selectedDeck.name}」(${selectedDeck.cardIds.length}枚) を再度選択しました。`;
        } else if (previousDeckName) {
            chatMessageText = `デッキ「${previousDeckName}」から「${selectedDeck.name}」(${selectedDeck.cardIds.length}枚) に変更しました。`;
        } else {
            chatMessageText = `デッキ「${selectedDeck.name}」(${selectedDeck.cardIds.length}枚) を選択しました。`;
        }

        if (opponentSelectedDeckInfo) {
            chatMessageText += ` 相手も選択済みです。`;
            setIsGameReadyToStart(true);
        } else {
            chatMessageText += ` 相手の選択を待っています...`;
        }
        setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: chatMessageText, timestamp: Date.now()}]);
    }
  };

  const handleStartGame = () => { 
    if (!mySelectedDeckId || !opponentSelectedDeckInfo || !isP2PInitiator) {
        setError("両プレイヤーがデッキを選択し、あなたがオファー作成者である必要があります。");
        if(!isP2PInitiator) setError("あなたはゲーム開始者(オファー作成者)ではありません。");
        return;
    }
    const myDeck = allDecks.find(d => d.id === mySelectedDeckId);
    if (!myDeck) { setError("選択したデッキが見つかりません。"); return; }
    if (!opponentSelectedDeckInfo) { setError("相手のデッキ情報がありません。"); return; }


    const myDeckCards = myDeck.cardIds.map(id => getCardById(id)).filter(Boolean) as CardDefinition[];
    const shuffledMyDeck = shuffleArray(myDeckCards);
    const initialMyHand = shuffledMyDeck.slice(0, INITIAL_DRAW_SIZE);
    const remainingMyDeck = shuffledMyDeck.slice(INITIAL_DRAW_SIZE);

    const defaultMyNotes: NoteItem[] = [{ id: generateId(), title: 'Note 1', text: '', isShared: false }];
    const defaultOpponentNotes: NoteItem[] = [{ id: generateId(), title: 'Note 1', text: '', isShared: false }];

    setMyPlayerGameState({ 
        life: INITIAL_LIFE_TOTAL, 
        deck: remainingMyDeck, 
        hand: initialMyHand, 
        field: [], 
        fieldTokens: [],
        graveyard: [],
        myNotes: defaultMyNotes,
    });
    setOpponentPlayerState({ 
        life: INITIAL_LIFE_TOTAL, 
        deckCount: opponentSelectedDeckInfo.size - INITIAL_DRAW_SIZE, 
        handCount: INITIAL_DRAW_SIZE, 
        field: [], 
        fieldTokens: [],
        graveyard: [],
        opponentNotes: defaultOpponentNotes,
    });
    
    setRoomPhase('MULLIGAN');
    setMyMulliganCount(0);
    setOpponentMulliganCount(0);
    setMyMulliganPhaseState('deciding');
    setOpponentMulliganPhaseState('deciding');
    setCardsToPutOnBottomSelectedIndices([]);

    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `ゲームセットアップ完了。マリガンフェイズです。両プレイヤーは手札${INITIAL_DRAW_SIZE}枚で開始。`, timestamp: Date.now()}]);
    
    const payload: GameStartRequestAction = {
        type: 'game_start_request',
        peerId: myPeerId,
        initialOpponentHandSize: INITIAL_DRAW_SIZE, 
        initialOpponentLife: INITIAL_LIFE_TOTAL 
    };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setIsGameReadyToStart(false);
  };

  // --- P2P Mulligan Logic ---
  const handleKeepHand = () => {
    if (!myPlayerGameState || myMulliganPhaseState === 'kept') return;
    
    setMyMulliganPhaseState('kept');
    const finalHandSize = myPlayerGameState.hand.length;

    const payload: PlayerDecisionMulliganAction = {
        type: 'player_decision_mulligan',
        peerId: myPeerId,
        actionTaken: 'kept_hand',
        mulligansTakenThisGame: myMulliganCount,
        resultingHandSize: finalHandSize
    };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `あなたは手札をキープしました (手札${finalHandSize}枚、マリガン${myMulliganCount}回)。相手の決定を待っています...`, timestamp: Date.now()}]);
  };

  const handleInitiateMulliganStep = () => {
    if (!myPlayerGameState || myMulliganPhaseState === 'kept' || myMulliganCount >= 7) return;

    setMyMulliganPhaseState('selecting_bottom');
    const currentHandAndDeck = shuffleArray([...myPlayerGameState.hand, ...myPlayerGameState.deck]);
    const newSevenCardHand = currentHandAndDeck.slice(0, INITIAL_DRAW_SIZE);
    const remainingDeck = currentHandAndDeck.slice(INITIAL_DRAW_SIZE);
    
    setMyPlayerGameState(prev => prev ? {...prev, hand: newSevenCardHand, deck: remainingDeck } : null);
    setCardsToPutOnBottomSelectedIndices([]); 
    const numToBottom = myMulliganCount + 1;
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `マリガン ${myMulliganCount + 1}回目: 7枚ドローしました。${numToBottom}枚をデッキボトムに送ってください。`, timestamp: Date.now()}]);
  };

  const handleConfirmBottomSelection = () => {
    if (!myPlayerGameState || myMulliganPhaseState !== 'selecting_bottom') return;

    const numToSelect = myMulliganCount + 1;
    if (cardsToPutOnBottomSelectedIndices.length !== numToSelect) {
        setError(`マリガンエラー: ${numToSelect}枚のカードを選択してボトムに送る必要があります。現在${cardsToPutOnBottomSelectedIndices.length}枚選択されています。`);
        return;
    }
    setError(null);

    const handAfterBottoming = myPlayerGameState.hand.filter((_, index) => !cardsToPutOnBottomSelectedIndices.includes(index));
    const cardsForBottom = myPlayerGameState.hand.filter((_, index) => cardsToPutOnBottomSelectedIndices.includes(index));
    
    const newMulliganCount = myMulliganCount + 1;
    setMyPlayerGameState(prev => prev ? {
        ...prev,
        hand: handAfterBottoming,
        deck: [...prev.deck, ...cardsForBottom] 
    } : null);
    
    setMyMulliganCount(newMulliganCount);
    setMyMulliganPhaseState('deciding'); 
    setCardsToPutOnBottomSelectedIndices([]);

    const payload: PlayerDecisionMulliganAction = {
        type: 'player_decision_mulligan',
        peerId: myPeerId,
        actionTaken: 'performed_mulligan_step',
        mulligansTakenThisGame: newMulliganCount,
        resultingHandSize: handAfterBottoming.length
    };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `マリガン ${newMulliganCount}回目完了。新しい手札は ${handAfterBottoming.length}枚です。この手札でキープしますか？`, timestamp: Date.now()}]);
  };

  const handleToggleCardForBottomSelection = (index: number) => {
    if (myMulliganPhaseState !== 'selecting_bottom') return;
    const numToSelect = myMulliganCount + 1;
    setCardsToPutOnBottomSelectedIndices(prev => {
        const newSelected = [...prev];
        const cardIndexInSelection = newSelected.indexOf(index);
        if (cardIndexInSelection > -1) {
            newSelected.splice(cardIndexInSelection, 1); 
        } else {
            if (newSelected.length < numToSelect) {
                newSelected.push(index); 
            } else {
                setError(`既に ${numToSelect}枚選択済みです。選択済みのカードをクリックして解除してください。`);
            }
        }
        return newSelected;
    });
  };
  // --- End P2P Mulligan Logic ---

  // --- P2P Game Actions ---
  const handleUpdateMyLife = useCallback((rawNewLife: number | string) => {
    if (!myPlayerGameState || roomPhase !== 'game_active') return;
    let newLife = typeof rawNewLife === 'string' ? parseInt(rawNewLife, 10) : rawNewLife;
    if (isNaN(newLife)) {
        return;
    }
    newLife = Math.max(0, newLife); 

    setMyPlayerGameState(prev => prev ? { ...prev, life: newLife } : null);
    const payload: UpdateLifeAction = { type: 'update_life', newLifeTotal: newLife, peerId: myPeerId };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setChatMessages(prev => [...prev, { id: generateId(), sender: 'system', text: `あなたはライフを ${newLife} に変更しました。`, timestamp: Date.now() }]);
  }, [myPlayerGameState, roomPhase, myPeerId, sendDataChannelMessage]);


  const handleDrawCard = () => {
    if (!myPlayerGameState || myPlayerGameState.deck.length === 0 || roomPhase !== 'game_active') {
         setError(roomPhase !== 'game_active' ? "まだゲームがアクティブではありません。" : "デッキにカードがありません。");
         return;
    }
    const [drawnCard, ...remainingDeck] = myPlayerGameState.deck;
    setMyPlayerGameState(prev => prev ? { ...prev, deck: remainingDeck, hand: [...prev.hand, drawnCard] } : null);
    
    const payload: DrawCardAction = { type: 'draw_card', peerId: myPeerId };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `カード「${drawnCard.name}」をドローしました。`, timestamp: Date.now()}]);
  };

  const handlePlayCard = (cardToPlay: CardDefinition, handIndex: number) => {
    if (!myPlayerGameState || roomPhase !== 'game_active') {
        setError(roomPhase !== 'game_active' ? "まだゲームがアクティブではありません。" : "ゲームの状態が正しくありません。");
        return;
    }
    const newHand = myPlayerGameState.hand.filter((_, index) => index !== handIndex);
    setMyPlayerGameState(prev => prev ? { ...prev, hand: newHand, field: [...prev.field, cardToPlay] } : null);
    
    const payload: PlayCardAction = { type: 'play_card', card: cardToPlay, peerId: myPeerId };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `カード「${cardToPlay.name}」をプレイしました。`, timestamp: Date.now()}]);
  };

  const handleCreateTokenP2P = (tokenDefId: string) => {
    if (!myPlayerGameState || roomPhase !== 'game_active') {
        setError("ゲームがアクティブでないためトークンを生成できません。");
        return;
    }
    const tokenDef = getTokenDefinitionById(tokenDefId);
    if (!tokenDef) {
        setError("選択されたトークン定義が見つかりません。");
        return;
    }

    const newInstanceId = generateId();
    const newTokenInstance: TokenInstance = { instanceId: newInstanceId, definition: tokenDef };

    setMyPlayerGameState(prev => prev ? {
        ...prev,
        fieldTokens: [...prev.fieldTokens, newTokenInstance]
    } : null);

    const payload: CreateTokenAction = {
        type: 'create_token',
        tokenDefinition: tokenDef,
        instanceId: newInstanceId,
        peerId: myPeerId
    };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `トークン「${tokenDef.name}」を生成しました。`, timestamp: Date.now()}]);
    handleCloseCreateTokenModal();
  };


  const handleSendToGraveyard = (item: CardDefinition | TokenInstance, itemType: 'card' | 'token', fromZone: 'hand' | 'field', indexInZone: number) => {
    if (!myPlayerGameState || roomPhase !== 'game_active') {
        setError(roomPhase !== 'game_active' ? "まだゲームがアクティブではありません。" : "ゲームの状態が正しくありません。");
        return;
    }

    if (itemType === 'card') {
        const card = item as CardDefinition;
        let chatMsg = `カード「${card.name}」を`;
        setMyPlayerGameState(prev => {
            if (!prev) return null;
            let newHand = [...prev.hand];
            let newField = [...prev.field];
            const newGraveyard = [...prev.graveyard, card];

            if (fromZone === 'hand') {
                newHand.splice(indexInZone, 1);
                chatMsg += "手札から墓地へ送りました。";
            } else if (fromZone === 'field') {
                const fieldIndexToRemove = newField.findIndex((c, idx) => idx === indexInZone && c.id === card.id );
                if (fieldIndexToRemove > -1) {
                    newField.splice(fieldIndexToRemove, 1);
                    chatMsg += "フィールドから墓地へ送りました。";
                } else {
                     const fallbackIndex = newField.findIndex(c => c.id === card.id);
                     if (fallbackIndex > -1) {
                        newField.splice(fallbackIndex, 1);
                        chatMsg += "フィールドから墓地へ送りました (フォールバックIDマッチ)。";
                     } else {
                        console.warn(`SendToGraveyard (P2P Card): card ID ${card.id} not found on field at index ${indexInZone} or by ID.`);
                        chatMsg += "フィールドから墓地へ送ろうとしましたが、見つかりませんでした。";
                     }
                }
            }
            return { ...prev, hand: newHand, field: newField, graveyard: newGraveyard };
        });
        
        const payload: MoveToGraveyardAction = {
            type: 'move_to_graveyard',
            card,
            fromZone,
            fromZoneIndex: indexInZone, 
            peerId: myPeerId
        };
        sendDataChannelMessage({ messageType: 'game_action', payload });
        setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: chatMsg, timestamp: Date.now()}]);

    } else if (itemType === 'token') {
        const tokenInstance = item as TokenInstance;
        setMyPlayerGameState(prev => prev ? {
            ...prev,
            fieldTokens: prev.fieldTokens.filter(t => t.instanceId !== tokenInstance.instanceId)
        } : null);

        const payload: RemoveTokenFromFieldAction = {
            type: 'remove_token_from_field',
            instanceId: tokenInstance.instanceId,
            peerId: myPeerId
        };
        sendDataChannelMessage({ messageType: 'game_action', payload });
        setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `トークン「${tokenInstance.definition.name}」がフィールドを離れました。`, timestamp: Date.now()}]);
    }
  };

  const handleMoveCardFromGraveyard = useCallback((card: CardDefinition, graveyardIndex: number, toZone: 'hand' | 'field') => {
    if (!myPlayerGameState || roomPhase !== 'game_active') return;

    let chatMsg = `あなたはカード「${card.name}」を墓地から`;
    const updatedGraveyard = [...myPlayerGameState.graveyard];
    updatedGraveyard.splice(graveyardIndex, 1);
    let updatedHand = [...myPlayerGameState.hand];
    let updatedField = [...myPlayerGameState.field];

    if (toZone === 'hand') {
        updatedHand.push(card);
        chatMsg += "手札へ移動しました。";
    } else { 
        updatedField.push(card);
        chatMsg += "フィールドへ移動しました。";
    }

    setMyPlayerGameState(prev => prev ? {
        ...prev,
        graveyard: updatedGraveyard,
        hand: updatedHand,
        field: updatedField
    } : null);
    
    if (isGraveyardModalOpen && viewingGraveyardFor === 'my') {
        setGraveyardToView(updatedGraveyard);
    }

    const payload: MoveFromGraveyardAction = {
        type: 'move_from_graveyard',
        card,
        toZone,
        graveyardCardIndex: graveyardIndex,
        peerId: myPeerId
    };
    sendDataChannelMessage({ messageType: 'game_action', payload });
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: chatMsg, timestamp: Date.now()}]);
  }, [myPlayerGameState, roomPhase, myPeerId, sendDataChannelMessage, isGraveyardModalOpen, viewingGraveyardFor]);

  const updateAndSendNotes = useCallback((updatedNotes: NoteItem[]) => {
    setMyPlayerGameState(prev => prev ? { ...prev, myNotes: updatedNotes } : null);
    const payload: UpdateNotesAction = {
        type: 'update_notes',
        peerId: myPeerId,
        notes: updatedNotes
    };
    sendDataChannelMessage({ messageType: 'game_action', payload });
  }, [myPeerId, sendDataChannelMessage]);

  const handleMyNoteTextChange = useCallback((noteId: string, newText: string) => {
    if (!myPlayerGameState || roomPhase !== 'game_active') return;
    const updatedNotes = myPlayerGameState.myNotes.map(note => 
        note.id === noteId ? { ...note, text: newText } : note
    );
    updateAndSendNotes(updatedNotes);
  }, [myPlayerGameState, roomPhase, updateAndSendNotes]);

  const handleMyNoteTitleChange = useCallback((noteId: string, newTitle: string) => {
    if (!myPlayerGameState || roomPhase !== 'game_active') return;
    const updatedNotes = myPlayerGameState.myNotes.map(note => 
        note.id === noteId ? { ...note, title: newTitle } : note
    );
    updateAndSendNotes(updatedNotes);
  }, [myPlayerGameState, roomPhase, updateAndSendNotes]);

  const handleToggleMyNoteShared = useCallback((noteId: string) => {
    if (!myPlayerGameState || roomPhase !== 'game_active') return;
    let newSharedState = false;
    const updatedNotes = myPlayerGameState.myNotes.map(note => {
        if (note.id === noteId) {
            newSharedState = !note.isShared;
            return { ...note, isShared: newSharedState };
        }
        return note;
    });
    updateAndSendNotes(updatedNotes);
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `あなたのメモ「${updatedNotes.find(n=>n.id===noteId)?.title || '無題'}」を ${newSharedState ? '公開' : '非公開'} にしました。`, timestamp: Date.now()}]);
  }, [myPlayerGameState, roomPhase, updateAndSendNotes]);
  
  const handleAddMyNote = useCallback(() => {
    if (!myPlayerGameState || roomPhase !== 'game_active') return;
    const newNoteId = generateId();
    const newNote: NoteItem = {
        id: newNoteId,
        title: `Note ${myPlayerGameState.myNotes.length + 1}`,
        text: '',
        isShared: false
    };
    const updatedNotes = [...myPlayerGameState.myNotes, newNote];
    updateAndSendNotes(updatedNotes);
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `新しいメモ「${newNote.title}」を追加しました。`, timestamp: Date.now()}]);
  }, [myPlayerGameState, roomPhase, updateAndSendNotes]);

  const handleDeleteMyNote = useCallback((noteIdToDelete: string) => {
    if (!myPlayerGameState || roomPhase !== 'game_active' || myPlayerGameState.myNotes.length <= 1) return;
    const noteToDelete = myPlayerGameState.myNotes.find(n => n.id === noteIdToDelete);
    const updatedNotes = myPlayerGameState.myNotes.filter(note => note.id !== noteIdToDelete);
    updateAndSendNotes(updatedNotes);
    setChatMessages(prev => [...prev, {id: generateId(), sender: 'system', text: `メモ「${noteToDelete?.title || '無題'}」を削除しました。`, timestamp: Date.now()}]);
  }, [myPlayerGameState, roomPhase, updateAndSendNotes]);

  // --- End P2P Game Actions ---


  // --- Test Game View Handlers ---
  const resetTestGameStates = () => {
    setTestGamePhase('deck_selection');
    setTestPlayerGameState(null);
    setTestOpponentMockState(null);
    setTestSelectedDeckId(null);
    setTestGameError(null);
    setTestMulliganCount(0);
    setTestMulliganPhaseState('deciding');
    setTestCardsToPutOnBottomSelectedIndices([]);
    handleCloseGraveyardModal();
    handleCloseCreateTokenModal();
  };

  const handleSelectTestDeck = (deckId: string) => {
    setTestSelectedDeckId(deckId);
    setTestGameError(null);
  };

  const handleStartTestGame = () => {
    if (!testSelectedDeckId) {
      setTestGameError("テスト用のデッキを選択してください。");
      return;
    }
    const selectedDeck = allDecks.find(d => d.id === testSelectedDeckId);
    if (!selectedDeck) {
      setTestGameError("選択されたデッキが見つかりません。");
      return;
    }
    if (selectedDeck.cardIds.length === 0) {
      setTestGameError("選択されたデッキにカードがありません。");
      return;
    }

    const deckCards = selectedDeck.cardIds.map(id => getCardById(id)).filter(Boolean) as CardDefinition[];
    const shuffledDeck = shuffleArray(deckCards);
    const initialHand = shuffledDeck.slice(0, INITIAL_DRAW_SIZE);
    const remainingDeck = shuffledDeck.slice(INITIAL_DRAW_SIZE);
    
    const defaultTestNotes: NoteItem[] = [{ id: generateId(), title: 'Test Note 1', text: '', isShared: false }];
    const defaultMockOpponentNotes: NoteItem[] = [{ id: generateId(), title: 'Opponent Note 1', text: 'Mock opponent notes visible for testing.', isShared: true }];


    setTestPlayerGameState({
      life: INITIAL_LIFE_TOTAL,
      deck: remainingDeck,
      hand: initialHand,
      field: [],
      fieldTokens: [],
      graveyard: [],
      myNotes: defaultTestNotes,
    });
    setTestOpponentMockState({ 
      life: INITIAL_LIFE_TOTAL,
      deckCount: Math.max(0, selectedDeck.cardIds.length - INITIAL_DRAW_SIZE),
      handCount: INITIAL_DRAW_SIZE,
      field: [], 
      fieldTokens: [],
      graveyard: [],
      opponentNotes: defaultMockOpponentNotes, 
    });
    setTestGamePhase('MULLIGAN');
    setTestMulliganCount(0);
    setTestMulliganPhaseState('deciding');
    setTestCardsToPutOnBottomSelectedIndices([]);
    setTestGameError(`マリガンフェイズ。初期手札${INITIAL_DRAW_SIZE}枚。`);
  };

  const handleTestKeepHand = () => {
    if (!testPlayerGameState || testMulliganPhaseState === 'kept') return;
    setTestMulliganPhaseState('kept');
    setTestGamePhase('game_active');
    setTestGameError(`手札をキープしました (手札${testPlayerGameState.hand.length}枚、マリガン${testMulliganCount}回)。テストゲーム開始！`);
  };

  const handleTestInitiateMulliganStep = () => {
    if (!testPlayerGameState || testMulliganPhaseState === 'kept' || testMulliganCount >= 7) return;

    setTestMulliganPhaseState('selecting_bottom');
    const currentHandAndDeck = shuffleArray([...testPlayerGameState.hand, ...testPlayerGameState.deck]);
    const newSevenCardHand = currentHandAndDeck.slice(0, INITIAL_DRAW_SIZE);
    const remainingDeck = currentHandAndDeck.slice(INITIAL_DRAW_SIZE);
    
    setTestPlayerGameState(prev => prev ? {...prev, hand: newSevenCardHand, deck: remainingDeck } : null);
    setTestCardsToPutOnBottomSelectedIndices([]);
    const numToBottom = testMulliganCount + 1;
    setTestGameError(`マリガン ${testMulliganCount + 1}回目: 7枚ドローしました。${numToBottom}枚をデッキボトムに送ってください。`);
  };

  const handleTestConfirmBottomSelection = () => {
    if (!testPlayerGameState || testMulliganPhaseState !== 'selecting_bottom') return;

    const numToSelect = testMulliganCount + 1;
    if (testCardsToPutOnBottomSelectedIndices.length !== numToSelect) {
        setTestGameError(`マリガンエラー: ${numToSelect}枚のカードを選択してボトムに送る必要があります。現在${testCardsToPutOnBottomSelectedIndices.length}枚選択されています。`);
        return;
    }
    setTestGameError(null);

    const handAfterBottoming = testPlayerGameState.hand.filter((_, index) => !testCardsToPutOnBottomSelectedIndices.includes(index));
    const cardsForBottom = testPlayerGameState.hand.filter((_, index) => testCardsToPutOnBottomSelectedIndices.includes(index));
    
    const newMulliganCount = testMulliganCount + 1;
    setTestPlayerGameState(prev => prev ? {
        ...prev,
        hand: handAfterBottoming,
        deck: [...prev.deck, ...cardsForBottom]
    } : null);
    
    setTestMulliganCount(newMulliganCount);
    setTestMulliganPhaseState('deciding');
    setTestCardsToPutOnBottomSelectedIndices([]);
    setTestGameError(`マリガン ${newMulliganCount}回目完了。新しい手札は ${handAfterBottoming.length}枚です。この手札でキープしますか？`);
  };

  const handleTestToggleCardForBottomSelection = (index: number) => {
    if (testMulliganPhaseState !== 'selecting_bottom') return;
    const numToSelect = testMulliganCount + 1;
    setTestCardsToPutOnBottomSelectedIndices(prev => {
        const newSelected = [...prev];
        const cardIndexInSelection = newSelected.indexOf(index);
        if (cardIndexInSelection > -1) {
            newSelected.splice(cardIndexInSelection, 1);
        } else {
            if (newSelected.length < numToSelect) {
                newSelected.push(index);
            } else {
                 setTestGameError(`既に ${numToSelect}枚選択済みです。選択済みのカードをクリックして解除してください。`);
            }
        }
        return newSelected;
    });
  };

  const handleTestUpdateLife = useCallback((rawNewLife: number | string) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') return;
    let newLife = typeof rawNewLife === 'string' ? parseInt(rawNewLife, 10) : rawNewLife;
     if (isNaN(newLife)) {
        setTestGameError("無効なライフ値です。");
        return;
    }
    newLife = Math.max(0, newLife);
    setTestPlayerGameState(prev => prev ? { ...prev, life: newLife } : null);
    setTestGameError(`ライフを ${newLife} に変更しました。`);
  }, [testPlayerGameState, testGamePhase]);

  const handleTestDrawCard = () => {
    if (!testPlayerGameState || testPlayerGameState.deck.length === 0 || testGamePhase !== 'game_active') {
      setTestGameError(testGamePhase !== 'game_active' ? "まだゲームがアクティブではありません。" : "デッキにカードがありません。");
      return;
    }
    const [drawnCard, ...remainingDeck] = testPlayerGameState.deck;
    setTestPlayerGameState(prev => prev ? { ...prev, deck: remainingDeck, hand: [...prev.hand, drawnCard] } : null);
    setTestGameError(null);
  };

  const handleTestPlayCard = (cardToPlay: CardDefinition, handIndex: number) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') {
        setTestGameError(testGamePhase !== 'game_active' ? "まだゲームがアクティブではありません。" : "ゲームの状態が正しくありません。");
        return;
    }
    const newHand = testPlayerGameState.hand.filter((_, index) => index !== handIndex);
    setTestPlayerGameState(prev => prev ? { ...prev, hand: newHand, field: [...prev.field, cardToPlay] } : null);
    setTestGameError(null);
  };

  const handleTestCreateToken = (tokenDefId: string) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') {
        setTestGameError("テストゲームがアクティブでないためトークンを生成できません。");
        return;
    }
    const tokenDef = getTokenDefinitionById(tokenDefId);
    if (!tokenDef) {
        setTestGameError("選択されたトークン定義が見つかりません。");
        return;
    }
    const newInstanceId = generateId();
    const newTokenInstance: TokenInstance = { instanceId: newInstanceId, definition: tokenDef };
    setTestPlayerGameState(prev => prev ? {
        ...prev,
        fieldTokens: [...prev.fieldTokens, newTokenInstance]
    } : null);
    setTestGameError(`テストトークン「${tokenDef.name}」を生成しました。`);
    handleCloseCreateTokenModal();
  };


  const handleTestSendToGraveyard = (item: CardDefinition | TokenInstance, itemType: 'card' | 'token', fromZone: 'hand' | 'field', indexInZone: number) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') {
        setTestGameError(testGamePhase !== 'game_active' ? "まだゲームがアクティブではありません。" : "ゲームの状態が正しくありません。");
        return;
    }

    if (itemType === 'card') {
        const card = item as CardDefinition;
        setTestPlayerGameState(prev => {
          if (!prev) return null;
          let newHand = [...prev.hand];
          let newField = [...prev.field];
          const newGraveyard = [...prev.graveyard, card];

          if (fromZone === 'hand') {
            newHand.splice(indexInZone, 1);
          } else if (fromZone === 'field') {
             const fieldIndexToRemove = newField.findIndex((c, idx) => idx === indexInZone && c.id === card.id);
              if (fieldIndexToRemove > -1) {
                newField.splice(fieldIndexToRemove, 1);
              } else {
                 const fallbackIndex = newField.findIndex(c => c.id === card.id);
                 if (fallbackIndex > -1) newField.splice(fallbackIndex, 1);
                 else console.warn(`TestSendToGraveyard (Card): card ID ${card.id} not found on field.`);
              }
          }
          return { ...prev, hand: newHand, field: newField, graveyard: newGraveyard };
        });
    } else if (itemType === 'token') {
        const tokenInstance = item as TokenInstance;
        setTestPlayerGameState(prev => prev ? {
            ...prev,
            fieldTokens: prev.fieldTokens.filter(t => t.instanceId !== tokenInstance.instanceId)
        } : null);
        setTestGameError(`テストトークン「${tokenInstance.definition.name}」がフィールドを離れました。`);
    }
    setTestGameError(null);
  };

  const handleTestMoveCardFromGraveyard = useCallback((card: CardDefinition, graveyardIndex: number, toZone: 'hand' | 'field') => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') return;

    let statusMsg = `カード「${card.name}」を墓地から`;
    const updatedGraveyard = [...testPlayerGameState.graveyard];
    updatedGraveyard.splice(graveyardIndex, 1);
    let updatedHand = [...testPlayerGameState.hand];
    let updatedField = [...testPlayerGameState.field];

    if (toZone === 'hand') {
        updatedHand.push(card);
        statusMsg += "手札へ移動しました。";
    } else { 
        updatedField.push(card);
        statusMsg += "フィールドへ移動しました。";
    }

    setTestPlayerGameState(prev => prev ? {
        ...prev,
        graveyard: updatedGraveyard,
        hand: updatedHand,
        field: updatedField
    } : null);
    
    if (isGraveyardModalOpen && viewingGraveyardFor === 'my') {
        setGraveyardToView(updatedGraveyard);
    }
    setTestGameError(statusMsg);
  }, [testPlayerGameState, testGamePhase, isGraveyardModalOpen, viewingGraveyardFor]);

  const handleTestNoteTextChange = useCallback((noteId: string, newText: string) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') return;
    setTestPlayerGameState(prev => prev ? { 
        ...prev, 
        myNotes: prev.myNotes.map(note => note.id === noteId ? { ...note, text: newText } : note) 
    } : null);
  }, [testPlayerGameState, testGamePhase]);

  const handleTestNoteTitleChange = useCallback((noteId: string, newTitle: string) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') return;
     setTestPlayerGameState(prev => prev ? { 
        ...prev, 
        myNotes: prev.myNotes.map(note => note.id === noteId ? { ...note, title: newTitle } : note) 
    } : null);
  }, [testPlayerGameState, testGamePhase]);

  const handleTestToggleNoteShared = useCallback((noteId: string) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') return;
    let newSharedState = false;
    let noteTitle = '';
    setTestPlayerGameState(prev => {
        if (!prev) return null;
        const updatedNotes = prev.myNotes.map(note => {
            if (note.id === noteId) {
                newSharedState = !note.isShared;
                noteTitle = note.title;
                return { ...note, isShared: newSharedState };
            }
            return note;
        });
        return { ...prev, myNotes: updatedNotes };
    });
    setTestGameError(`テストメモ「${noteTitle || '無題'}」を ${newSharedState ? '公開' : '非公開'} にしました。`);
  }, [testPlayerGameState, testGamePhase]);
  
  const handleTestAddNote = useCallback(() => {
    if (!testPlayerGameState || testGamePhase !== 'game_active') return;
    const newNoteId = generateId();
    const newNote: NoteItem = {
        id: newNoteId,
        title: `Test Note ${testPlayerGameState.myNotes.length + 1}`,
        text: '',
        isShared: false
    };
    setTestPlayerGameState(prev => prev ? { ...prev, myNotes: [...prev.myNotes, newNote] } : null);
    setTestGameError(`新しいテストメモ「${newNote.title}」を追加しました。`);
  }, [testPlayerGameState, testGamePhase]);

  const handleTestDeleteNote = useCallback((noteIdToDelete: string) => {
    if (!testPlayerGameState || testGamePhase !== 'game_active' || testPlayerGameState.myNotes.length <= 1) return;
    const noteToDelete = testPlayerGameState.myNotes.find(n => n.id === noteIdToDelete);
    setTestPlayerGameState(prev => prev ? { 
        ...prev, 
        myNotes: prev.myNotes.filter(note => note.id !== noteIdToDelete) 
    } : null);
    setTestGameError(`テストメモ「${noteToDelete?.title || '無題'}」を削除しました。`);
  }, [testPlayerGameState, testGamePhase]);


  const handleOpenGraveyardModal = useCallback((forPlayer: 'my' | 'opponent', isTestContext: boolean = false) => {
    let gyCards: CardDefinition[] = [];
    if (isTestContext) {
      if (forPlayer === 'my' && testPlayerGameState) {
        gyCards = testPlayerGameState.graveyard;
      } else if (forPlayer === 'opponent' && testOpponentMockState) {
        gyCards = testOpponentMockState.graveyard; 
      }
    } else { 
      if (forPlayer === 'my' && myPlayerGameState) {
        gyCards = myPlayerGameState.graveyard;
      } else if (forPlayer === 'opponent' && opponentPlayerState) {
        gyCards = opponentPlayerState.graveyard; 
      }
    }
    setGraveyardToView(gyCards);
    setViewingGraveyardFor(forPlayer);
    setIsGraveyardModalOpen(true);
  }, [myPlayerGameState, opponentPlayerState, testPlayerGameState, testOpponentMockState]);


  const handleItemDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, item: CardDefinition | TokenInstance, itemType: 'card' | 'token', fromZone: 'hand' | 'field', originalIndex: number, isTestContext: boolean) => {
    const currentPhase = isTestContext ? testGamePhase : roomPhase;
    if (currentPhase !== 'game_active') return; 

    const dragInfo: DraggedItemInfo = { type: itemType, data: item, fromZone, originalIndex, isTestGame: isTestContext };
    event.dataTransfer.setData('application/json', JSON.stringify(dragInfo));
    event.dataTransfer.effectAllowed = 'move';
    setDraggingItemInfo(dragInfo);
  }, [roomPhase, testGamePhase]);

  const handleItemDragEnd = useCallback(() => {
    setDraggingItemInfo(null);
    setIsFieldDropTarget(false);
    setIsGraveyardDropTarget(false);
  }, []);

  const handleZoneDragOver = useCallback((event: React.DragEvent<HTMLDivElement>, targetZone: 'field' | 'graveyard') => {
    event.preventDefault();
    if (draggingItemInfo) {
      const currentPhase = draggingItemInfo.isTestGame ? testGamePhase : roomPhase;
      if (currentPhase !== 'game_active') {
         event.dataTransfer.dropEffect = 'none';
         return;
      }

      if (targetZone === 'field' && draggingItemInfo.fromZone === 'hand' && draggingItemInfo.type === 'card') {
        event.dataTransfer.dropEffect = 'move';
        setIsFieldDropTarget(true);
      } else if (targetZone === 'graveyard' && (draggingItemInfo.fromZone === 'hand' || draggingItemInfo.fromZone === 'field')) {
        event.dataTransfer.dropEffect = 'move';
        setIsGraveyardDropTarget(true);
      } else {
        event.dataTransfer.dropEffect = 'none';
      }
    }
  }, [draggingItemInfo, roomPhase, testGamePhase]);
  
  const handleZoneDragEnter = useCallback((targetZone: 'field' | 'graveyard') => {
     if (draggingItemInfo) {
      const currentPhase = draggingItemInfo.isTestGame ? testGamePhase : roomPhase;
      if (currentPhase !== 'game_active') return;

      if (targetZone === 'field' && draggingItemInfo.fromZone === 'hand' && draggingItemInfo.type === 'card') {
        setIsFieldDropTarget(true);
      } else if (targetZone === 'graveyard' && (draggingItemInfo.fromZone === 'hand' || draggingItemInfo.fromZone === 'field')) {
        setIsGraveyardDropTarget(true);
      }
    }
  }, [draggingItemInfo, roomPhase, testGamePhase]);

  const handleZoneDragLeave = useCallback((targetZone: 'field' | 'graveyard') => {
    if (targetZone === 'field') setIsFieldDropTarget(false);
    if (targetZone === 'graveyard') setIsGraveyardDropTarget(false);
  }, []);

  const handleZoneDrop = useCallback((event: React.DragEvent<HTMLDivElement>, targetZone: 'field' | 'graveyard') => {
    event.preventDefault();
    const data = event.dataTransfer.getData('application/json');
    if (!data) return;

    try {
      const droppedItemInfo = JSON.parse(data) as DraggedItemInfo;
      const { type, data: itemData, fromZone, originalIndex, isTestGame } = droppedItemInfo;
      
      const currentPhase = isTestGame ? testGamePhase : roomPhase;
      if (currentPhase !== 'game_active') return;


      if (targetZone === 'field' && fromZone === 'hand' && type === 'card') {
        if (isTestGame) {
          handleTestPlayCard(itemData as CardDefinition, originalIndex);
        } else {
          handlePlayCard(itemData as CardDefinition, originalIndex);
        }
      } else if (targetZone === 'graveyard') {
        if (isTestGame) {
          handleTestSendToGraveyard(itemData, type, fromZone, originalIndex);
        } else {
          handleSendToGraveyard(itemData, type, fromZone, originalIndex);
        }
      }
    } catch (e) {
      console.error("Error processing dropped item data:", e);
    }

    setDraggingItemInfo(null);
    setIsFieldDropTarget(false);
    setIsGraveyardDropTarget(false);
  }, [handlePlayCard, handleSendToGraveyard, handleTestPlayCard, handleTestSendToGraveyard, roomPhase, testGamePhase]);


  const renderFieldCardGroup = (groupedCardInfo: GroupedCardInfo, isMyCard: boolean, isTestGame: boolean = false) => {
    const { card, count, originalIndices } = groupedCardInfo;
    const topmostCardOriginalIndex = originalIndices[originalIndices.length - 1]; 
    const isCurrentlyDraggingThis = draggingItemInfo?.type === 'card' &&
                                   (draggingItemInfo?.data as CardDefinition).id === card.id && 
                                   draggingItemInfo?.originalIndex === topmostCardOriginalIndex && 
                                   draggingItemInfo?.fromZone === 'field' &&
                                   draggingItemInfo?.isTestGame === isTestGame;
    const currentPhase = isTestGame ? testGamePhase : roomPhase;
    const cardDisabled = currentPhase !== 'game_active';

    return (
      <MtgCard
        key={`${card.id}-${isMyCard ? 'my' : 'opponent'}-fieldgroup-${topmostCardOriginalIndex}`}
        card={card}
        context="field"
        count={count > 1 ? count : undefined}
        isMyCard={isMyCard}
        originalIndex={topmostCardOriginalIndex} 
        onDragStartItem={isMyCard ? (e, item, itemType, fz, oi) => handleItemDragStart(e, item, itemType, fz, oi, isTestGame) : undefined}
        onDragEndItem={isMyCard ? handleItemDragEnd : undefined}
        isDraggable={isMyCard && currentPhase === 'game_active'}
        isDragging={isCurrentlyDraggingThis}
        isDisabled={cardDisabled}
      />
    );
  };
  
  const renderFieldToken = (tokenInst: TokenInstance, index: number, isMyToken: boolean, isTestGame: boolean = false) => {
    const isCurrentlyDraggingThis = draggingItemInfo?.type === 'token' &&
                                   (draggingItemInfo?.data as TokenInstance).instanceId === tokenInst.instanceId &&
                                   draggingItemInfo?.fromZone === 'field' &&
                                   draggingItemInfo?.isTestGame === isTestGame;
    const currentPhase = isTestGame ? testGamePhase : roomPhase;
    const tokenDisabled = currentPhase !== 'game_active';
    
    return (
        <MtgCard
            key={tokenInst.instanceId}
            tokenInstance={tokenInst}
            isTokenDisplay={true}
            context="field"
            isMyCard={isMyToken}
            originalIndex={index}
            onDragStartItem={isMyToken ? (e, item, itemType, fz, oi) => handleItemDragStart(e, item, itemType, fz, oi, isTestGame) : undefined}
            onDragEndItem={isMyToken ? handleItemDragEnd : undefined}
            isDraggable={isMyToken && currentPhase === 'game_active'}
            isDragging={isCurrentlyDraggingThis}
            isDisabled={tokenDisabled}
        />
    );
  };


  const renderMainView = () => (
    <div className="view-container main-view">
      <header><h1>P2Pチャット & カードゲーム</h1></header>
      <nav className="main-nav">
        <button onClick={() => setCurrentView('cardEditor')}>カードエディタ</button>
        <button onClick={() => setCurrentView('deckEditor')}>デッキエディタ</button>
        <button onClick={() => setCurrentView('tokenEditor')}>トークンエディタ</button>
        <button onClick={() => { resetTestGameStates(); setCurrentView('testGameView'); }}>テストゲーム画面</button>
      </nav>
      <section className="room-actions" aria-labelledby="room-actions-heading">
        <h2 id="room-actions-heading" className="sr-only">ルーム操作</h2>
        <div className="create-room-section">
          <h3>P2Pセッションを開始/参加</h3>
          <p className="info-text">部屋名を入力してP2Pセッションを開始または参加します。相手と同じ部屋名を使用してください。</p>
          <div className="input-group">
            <label htmlFor="roomNameInput" className="sr-only">部屋名</label>
            <input id="roomNameInput" type="text" value={roomNameInput} onChange={(e) => setRoomNameInput(e.target.value)} placeholder="部屋名（例: ProjectOmega）" aria-describedby={error ? "error-message" : undefined} disabled={isLoading}/>
            <button onClick={() => handleEnterP2PRoom(roomNameInput)} disabled={isLoading || !roomNameInput.trim()} aria-live="polite">
              {isLoading ? '準備中...' : 'ルームに入る'}
            </button>
          </div>
        </div>
         <div className="join-room-section">
          <h3>既存の部屋に参加 (クイック選択)</h3>
           <p className="info-text">一般的な部屋名を選択して素早く参加できます。</p>
          {MOCK_AVAILABLE_ROOMS.length > 0 ? (
            <ul className="room-list">
              {MOCK_AVAILABLE_ROOMS.map((room) => (
                <li key={room}>
                  <span>{room}</span>
                  <button onClick={() => handleEnterP2PRoom(room)} disabled={isLoading} aria-label={`${room} に参加する`}>
                    {isLoading ? '準備中...' : '選択'}
                  </button>
                </li>
              ))}
            </ul>
          ) : ( <p>利用可能なクイック選択ルームはありません。</p> )}
        </div>
      </section>
      {error && <p id="error-message" className="error-message global-error" role="alert">{error}</p>}
    </div>
  );

  const renderCardEditorView = () => (
    <div className="view-container card-editor-view">
      <header>
        <h2>カードエディタ</h2>
        <button onClick={() => { setCurrentView('main'); setError(null); setEditingCard(null); setCardForm({ name: '', cost: 0, attack: 0, defense: 0, text: '', imageUrl: '' }); }}>メインに戻る</button>
      </header>
      {error && <p className="error-message" role="alert">{error}</p>}
      <section className="import-export-section">
        <h4>JSONインポート/エクスポート</h4>
        <input type="file" accept=".json" ref={cardImportFileRef} onChange={handleImportCardsFileChange} style={{display: 'none'}} id="card-import-input" />
        <button onClick={() => cardImportFileRef.current?.click()} className="import-button">カードをJSONからインポート</button>
        <button onClick={handleExportCards} className="export-button" disabled={allCards.length === 0}>カードをJSONへエクスポート</button>
      </section>
      <section className="card-form-section">
        <h3>{editingCard ? 'カードを編集' : '新しいカードを作成'}</h3>
        <div className="form-grid">
            <div className="input-group-vertical"><label htmlFor="cardName">カード名:</label><input type="text" id="cardName" name="name" value={cardForm.name || ''} onChange={handleCardFormChange} required /></div>
            <div className="input-group-vertical"><label htmlFor="cardCost">コスト:</label><input type="number" id="cardCost" name="cost" value={cardForm.cost || 0} onChange={handleCardFormChange} min="0" /></div>
            <div className="input-group-vertical"><label htmlFor="cardAttack">攻撃力:</label><input type="number" id="cardAttack" name="attack" value={cardForm.attack || 0} onChange={handleCardFormChange} min="0" /></div>
            <div className="input-group-vertical"><label htmlFor="cardDefense">防御力/体力:</label><input type="number" id="cardDefense" name="defense" value={cardForm.defense || 0} onChange={handleCardFormChange} min="0" /></div>
            <div className="input-group-vertical full-width"><label htmlFor="cardText">カードテキスト:</label><textarea id="cardText" name="text" value={cardForm.text || ''} onChange={handleCardFormChange} rows={3}></textarea></div>
            <div className="input-group-vertical full-width"><label htmlFor="cardImageUrl">画像URL (任意):</label><input type="text" id="cardImageUrl" name="imageUrl" value={cardForm.imageUrl || ''} onChange={handleCardFormChange} placeholder="https://example.com/image.png" /></div>
        </div>
        <button onClick={handleSaveCard}>{editingCard ? 'カードを更新' : 'カードを追加'}</button>
        {editingCard && <button onClick={() => { setEditingCard(null); setCardForm({ name: '', cost: 0, attack: 0, defense: 0, text: '', imageUrl: '' }); }} className="cancel-button">キャンセル</button>}
      </section>
      <section className="card-list-section">
        <h3>登録済みカード一覧 ({allCards.length}枚)</h3>
        {allCards.length === 0 ? <p>登録されているカードはありません。</p> : (
          <ul className="card-list editor-list mtg-card-grid">
            {allCards.map(card => (
              <li key={card.id} className="card-item-wrapper">
                <MtgCard card={card} context="editor-list" isMyCard={false} />
                <div className="card-actions editor-actions">
                    <button onClick={() => handleEditCard(card)}>編集</button>
                    <button onClick={() => handleDeleteCard(card.id)} className="delete-button">削除</button>
                </div>
              </li> ))}
          </ul> )}
      </section>
    </div>
  );

  const renderTokenEditorView = () => (
    <div className="view-container token-editor-view">
        <header>
            <h2>トークンエディタ</h2>
            <button onClick={() => { setCurrentView('main'); setError(null); setEditingTokenDefinition(null); setTokenDefinitionForm({ name: '', power: 0, toughness: 0, colors: [], types: [], text: '', imageUrl: '' }); }}>メインに戻る</button>
        </header>
        {error && <p className="error-message" role="alert">{error}</p>}
        <section className="import-export-section">
            <h4>JSONインポート/エクスポート</h4>
            <input type="file" accept=".json" ref={tokenImportFileRef} onChange={handleImportTokenDefinitionsFileChange} style={{display: 'none'}} id="token-import-input" />
            <button onClick={() => tokenImportFileRef.current?.click()} className="import-button">トークン定義をJSONからインポート</button>
            <button onClick={handleExportTokenDefinitions} className="export-button" disabled={allTokenDefinitions.length === 0}>トークン定義をJSONへエクスポート</button>
        </section>
        <section className="token-form-section">
            <h3>{editingTokenDefinition ? 'トークン定義を編集' : '新しいトークン定義を作成'}</h3>
            <div className="form-grid">
                <div className="input-group-vertical"><label htmlFor="tokenName">トークン名:</label><input type="text" id="tokenName" name="name" value={tokenDefinitionForm.name || ''} onChange={handleTokenDefinitionFormChange} required /></div>
                <div className="input-group-vertical"><label htmlFor="tokenPower">パワー:</label><input type="number" id="tokenPower" name="power" value={tokenDefinitionForm.power || 0} onChange={handleTokenDefinitionFormChange} min="0" /></div>
                <div className="input-group-vertical"><label htmlFor="tokenToughness">タフネス:</label><input type="number" id="tokenToughness" name="toughness" value={tokenDefinitionForm.toughness || 0} onChange={handleTokenDefinitionFormChange} min="0" /></div>
                <div className="input-group-vertical full-width"><label htmlFor="tokenTypes">タイプ (カンマ区切り 例: Creature - Goblin, Artifact):</label><input type="text" id="tokenTypes" name="types" value={(tokenDefinitionForm.types || []).join(', ')} onChange={handleTokenDefinitionFormChange} /></div>
                <div className="input-group-vertical full-width">
                    <label>色:</label>
                    <div className="checkbox-group">
                        {['W', 'U', 'B', 'R', 'G', 'C', 'Gold'].map(color => (
                            <label key={color}><input type="checkbox" name={color} checked={(tokenDefinitionForm.colors || []).includes(color)} onChange={handleTokenDefinitionFormChange} /> {color}</label>
                        ))}
                    </div>
                </div>
                <div className="input-group-vertical full-width"><label htmlFor="tokenText">テキスト:</label><textarea id="tokenText" name="text" value={tokenDefinitionForm.text || ''} onChange={handleTokenDefinitionFormChange} rows={2}></textarea></div>
                <div className="input-group-vertical full-width"><label htmlFor="tokenImageUrl">画像URL (任意):</label><input type="text" id="tokenImageUrl" name="imageUrl" value={tokenDefinitionForm.imageUrl || ''} onChange={handleTokenDefinitionFormChange} placeholder="https://example.com/token.png" /></div>
            </div>
            <button onClick={handleSaveTokenDefinition}>{editingTokenDefinition ? 'トークン定義を更新' : 'トークン定義を追加'}</button>
            {editingTokenDefinition && <button onClick={() => { setEditingTokenDefinition(null); setTokenDefinitionForm({ name: '', power: 0, toughness: 0, colors: [], types: [], text: '', imageUrl: '' }); }} className="cancel-button">キャンセル</button>}
        </section>
        <section className="token-list-section">
            <h3>登録済みトークン定義一覧 ({allTokenDefinitions.length}件)</h3>
            {allTokenDefinitions.length === 0 ? <p>登録されているトークン定義はありません。</p> : (
            <ul className="card-list editor-list mtg-card-grid"> {/* Reusing card-list styles for grid */}
                {allTokenDefinitions.map(td => (
                <li key={td.id} className="card-item-wrapper"> {/* Reusing card-item-wrapper */}
                    <MtgCard tokenInstance={{instanceId: td.id, definition: td}} isTokenDisplay={true} context="token-editor-list" isMyCard={false} />
                    <div className="card-actions editor-actions">
                        <button onClick={() => handleEditTokenDefinition(td)}>編集</button>
                        <button onClick={() => handleDeleteTokenDefinition(td.id)} className="delete-button">削除</button>
                    </div>
                </li> ))}
            </ul> )}
        </section>
    </div>
  );


  const renderDeckEditorView = () => (
    <div className="view-container deck-editor-view">
      <header>
        <h2>デッキエディタ</h2>
        <button onClick={() => { setCurrentView('main'); setError(null); setEditingDeck(null); setDeckForm({ name: '', selectedCardIds: []}); }}>メインに戻る</button>
      </header>
      {error && <p className="error-message" role="alert">{error}</p>}
      <section className="import-export-section">
        <h4>JSONインポート/エクスポート</h4>
        <input type="file" accept=".json" ref={deckImportFileRef} onChange={handleImportDecksFileChange} style={{display: 'none'}} id="deck-import-input"/>
        <button onClick={() => deckImportFileRef.current?.click()} className="import-button">デッキをJSONからインポート</button>
        <button onClick={handleExportDecks} className="export-button" disabled={allDecks.length === 0}>デッキをJSONへエクスポート</button>
      </section>
      <section className="deck-form-section">
        <h3>{editingDeck ? 'デッキを編集' : '新しいデッキを作成'}</h3>
        <div className="input-group-vertical"><label htmlFor="deckName">デッキ名:</label><input type="text" id="deckName" value={deckForm.name} onChange={handleDeckFormChange} required /></div>
        <h4>カードを選択 (現在 {deckForm.selectedCardIds.length}枚)</h4>
        <div className="available-cards-list mtg-card-grid">
          {allCards.length === 0 ? <p>登録カードなし。まずカードエディタでカードを作成してください。</p> : (
            allCards.map(card => {
              const countInDeck = deckForm.selectedCardIds.filter(id => id === card.id).length;
              return (
                <MtgCard
                    key={card.id}
                    card={card}
                    context="deck-selector"
                    isSelected={countInDeck > 0}
                    onAddToDeck={addCardCopyToDeck}
                    onRemoveFromDeck={removeCardCopyFromDeck}
                    cardsInDeckCount={countInDeck}
                />
              );
            })
          )}
        </div>
        <button onClick={handleSaveDeck}>{editingDeck ? 'デッキを更新' : 'デッキを保存'}</button>
        {editingDeck && <button onClick={() => { setEditingDeck(null); setDeckForm({ name: '', selectedCardIds: [] }); }} className="cancel-button">キャンセル</button>}
      </section>
      <section className="deck-list-section">
        <h3>登録済みデッキ一覧 ({allDecks.length}件)</h3>
        {allDecks.length === 0 ? <p>登録されているデッキはありません。</p> : (
          <ul className="deck-list editor-list">
            {allDecks.map(deck => (
              <li key={deck.id} className="deck-item">
                <span>{deck.name} ({deck.cardIds.length}枚)</span>
                <div className="deck-actions"><button onClick={() => handleEditDeck(deck)}>編集</button><button onClick={() => handleDeleteDeck(deck.id)} className="delete-button">削除</button></div>
              </li> ))}
          </ul> )}
      </section>
    </div>
  );

  const renderRoomView = () => (
    <div className={`view-container room-view ${roomPhase === 'game_active' || roomPhase === 'MULLIGAN' ? 'game-active-scrollable' : ''}`}>
      <header className="room-header">
        <h2>{activeRoom ? `P2Pルーム: ${activeRoom}` : 'P2Pルーム'} (あなたのID: {myPeerId ? myPeerId.substring(0,6) : '未接続'})</h2>
        <button onClick={handleLeaveRoom} disabled={isLoading || isLoadingP2PSetup} className="leave-button">ルーム退出</button>
      </header>

      {error && <p className="error-message room-error" role="alert">{error}</p>}

      {roomPhase !== 'game_active' && roomPhase !== 'MULLIGAN' && (
        <section className="connection-setup" aria-labelledby="connection-setup-heading">
          <h3 id="connection-setup-heading">接続設定</h3>
          
          {/* WebSocket Connection Status */}
          <div className="ws-status-section">
            <h4>シグナリングサーバー接続状態</h4>
            <p>WebSocket: <span className={`status-${wsConnectionStatus}`}>{wsConnectionStatus.toUpperCase()}</span></p>
            {activeRoom && <p>参加中のルーム: {activeRoom}</p>}
            {connectedUsers.length > 0 && (
              <p>接続ユーザー数: {connectedUsers.length}人</p>
            )}
            {isJoiningRoom && <p className="info-text">ルームに参加中...</p>}
          </div>

          {/* Auto P2P Connection Status */}
          {wsConnectionStatus === 'connected' && (
            <div className="auto-p2p-section">
              <h4>自動P2P接続</h4>
              <p>P2P接続状態: <span className={`status-${p2pConnectionStatus}`}>{p2pConnectionStatus.toUpperCase()}</span></p>
              
              {/* Handshake progress indicator */}
              {handshakeStep !== 'waiting' && handshakeStep !== 'completed' && (
                <div className="handshake-progress">
                  <h5>ハンドシェイク進行状況:</h5>
                  <p className="handshake-step">
                    {handshakeStep === 'creating-offer' && '📝 オファーSDP作成中...'}
                    {handshakeStep === 'offer-sent' && '✓ オファーSDP送信完了 → アンサー待機中'}
                    {handshakeStep === 'offer-received' && '✓ オファー受信完了'}
                    {handshakeStep === 'setting-offer' && '📝 オファー情報セット中...'}
                    {handshakeStep === 'creating-answer' && '📝 アンサーSDP作成中...'}
                    {handshakeStep === 'answer-sent' && '✓ アンサーSDP送信完了'}
                    {handshakeStep === 'setting-answer' && '📝 アンサー情報セット中...'}
                    {handshakeStep === 'ice-exchange' && '🔄 ICE候補交換中...'}
                    {handshakeStep === 'ice-checking' && '🔍 ICE接続性チェック中...'}
                    {handshakeStep === 'ice-connected' && '✓ ICE接続成功 → データチャンネル待機中'}
                    {handshakeStep === 'failed' && '❌ ハンドシェイク失敗'}
                  </p>
                  {pendingIceCandidates.length > 0 && (
                    <p className="ice-queue">保留中のICE候補: {pendingIceCandidates.length}個</p>
                  )}
                </div>
              )}
              
              {connectedUsers.length < 2 && (
                <p className="info-text">他のユーザーの参加を待っています...</p>
              )}
              {connectedUsers.length >= 2 && p2pConnectionStatus === 'disconnected' && handshakeStep === 'waiting' && (
                <button onClick={() => initiateAutomaticP2PConnection(true)} className="start-connection-btn">
                  P2P接続を開始
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {/* Manual P2P Fallback */}
      {roomPhase !== 'game_active' && roomPhase !== 'MULLIGAN' && (wsConnectionStatus === 'failed' || wsConnectionStatus === 'disconnected') && (
        <section className="p2p-setup manual-fallback" aria-labelledby="p2p-setup-manual-heading">
          <h3 id="p2p-setup-manual-heading">P2P接続設定 (手動フォールバック)</h3>
          <p className="info-text">自動接続が失敗しました。手動でP2P接続情報を交換してください。</p>
           {isLoadingP2PSetup && <p className="info-text">P2P接続を初期化中 (TURNサーバー情報取得中)...</p>}
          <p className="info-text">以下の手順でP2P接続情報を相手と交換してください。</p>
          <div className="connection-actions">
              <button onClick={handleCreateOfferManual} disabled={isLoadingP2PSetup || p2pConnectionStatus === 'connected' || p2pConnectionStatus === 'connecting'}>1a. オファー作成 (あなたが開始)</button>
              <button onClick={handleCreateAnswerManual} disabled={isLoadingP2PSetup || p2pConnectionStatus === 'connected' || p2pConnectionStatus === 'connecting' || !remoteSdpInputManual.trim()}>1b. アンサー作成 (相手オファー受信後)</button>
          </div>
          
          {localSdpManual && ( <div className="sdp-section">
              <label htmlFor="localSdpManualTextarea">あなたの{isP2PInitiator ? 'オファー' : 'アンサー'}SDP (相手に伝えてください):</label>
              <textarea id="localSdpManualTextarea" value={localSdpManual} readOnly rows={4}></textarea>
              <button onClick={() => copyToClipboard(localSdpManual, `自分の${isP2PInitiator ? 'オファー' : 'アンサー'}SDP`)}>コピー</button>
          </div> )}
          
          <div className="sdp-section">
              <label htmlFor="remoteSdpInputManual">相手の{isP2PInitiator ? 'アンサー' : 'オファー'}SDP (相手から受け取って入力):</label>
              <textarea id="remoteSdpInputManual" value={remoteSdpInputManual} onChange={(e) => setRemoteSdpInputManual(e.target.value)} rows={4} placeholder={isP2PInitiator ? '相手のアンサーSDPをここに貼り付け' : '相手のオファーSDPをここに貼り付け'} />
          </div>
          
          {localIceCandidatesManual.length > 0 && ( <div className="ice-section">
              <label htmlFor="localIceManualTextarea">あなたのICE候補 (相手に伝えてください):</label>
              <textarea id="localIceManualTextarea" value={JSON.stringify(localIceCandidatesManual, null, 2)} readOnly rows={4}></textarea>
              <button onClick={() => copyToClipboard(JSON.stringify(localIceCandidatesManual, null, 2), "自分のICE候補")}>コピー</button>
          </div> )}
          
          <div className="ice-section">
              <label htmlFor="remoteIceInputManual">相手のICE候補 (相手から受け取って入力):</label>
              <textarea id="remoteIceInputManual" value={remoteIceCandidatesInputManual} onChange={(e) => setRemoteIceCandidatesInputManual(e.target.value)} rows={4} placeholder="相手のICE候補をここにJSON配列として貼り付け" />
          </div>
          
          <button onClick={handleSetRemoteInfoManual} className="connection-actions" disabled={isLoadingP2PSetup || (!remoteSdpInputManual.trim() && !remoteIceCandidatesInputManual.trim()) || p2pConnectionStatus === 'connected'}>2. 相手情報セット & 接続試行</button>
          <p>P2P接続状態: <span className={`status-${p2pConnectionStatus}`}>{p2pConnectionStatus.toUpperCase()}</span> {isP2PInitiator ? "(あなたはオファー側)" : "(あなたはアンサー側)"}</p>
        </section>
      )}


      {p2pConnectionStatus === 'connected' && (
        <section className={`game-section ${roomPhase === 'game_active' || roomPhase === 'MULLIGAN' ? 'full-game-board-active' : ''}`} aria-labelledby="game-heading">
          {(roomPhase !== 'game_active' && roomPhase !== 'MULLIGAN') && <h3 id="game-heading">カードゲーム</h3>}
          {roomPhase === 'deck_selection' && (
            <div className="deck-selection-area">
              <h4>デッキを選択してください</h4>
              {allDecks.length === 0 ? <p>プレイ可能なデッキがありません。デッキエディタで作成してください。</p> : (
                <ul className="deck-list game-deck-selector">
                  {allDecks.map(deck => (
                    <li key={deck.id} className={mySelectedDeckId === deck.id ? 'selected' : ''}>
                      {deck.name} ({deck.cardIds.length}枚)
                      <button onClick={() => handleSelectDeckForGame(deck.id)}>{mySelectedDeckId === deck.id ? '再選択' : '選択'}</button>
                    </li>))}
                </ul>)}
              {mySelectedDeckId && <p>あなたが選択中のデッキ: {allDecks.find(d=>d.id===mySelectedDeckId)?.name} ({allDecks.find(d=>d.id===mySelectedDeckId)?.cardIds.length}枚)</p>}
              {opponentSelectedDeckInfo && <p>相手({opponentSelectedDeckInfo.peerId.substring(0,6)})が選択中のデッキ: {opponentSelectedDeckInfo.name} ({opponentSelectedDeckInfo.size}枚)</p>}
              {isGameReadyToStart && isP2PInitiator && (
                <button onClick={handleStartGame} className="start-game-button">ゲーム開始 (あなたはオファー側)</button>
              )}
               {isGameReadyToStart && !isP2PInitiator && ( <p>オファー側がゲームを開始するのを待っています...</p> )}
            </div>)}
          
          {roomPhase === 'MULLIGAN' && myPlayerGameState && (
            <div className="mulligan-decision-area">
                <h4>マリガンフェイズ (ロンドンマリガン)</h4>
                {myMulliganPhaseState === 'deciding' && (
                    <>
                        <p>現在のあなたの手札 ({myPlayerGameState.hand.length}枚、マリガン {myMulliganCount}回)。どうしますか？</p>
                        <div className="hand-zone-arena my-hand-arena mtg-card-zone" aria-label="あなたの現在の手札（確認用）">
                            {myPlayerGameState.hand.map((card, index) => (
                                <MtgCard
                                    key={`${card.id}-mymulligandecide-${index}`}
                                    card={card}
                                    context="hand"
                                    isMyCard={true}
                                    originalIndex={index}
                                    isDisabled={true} 
                                    isDraggable={false}
                                />
                            ))}
                        </div>
                        <div className="mulligan-buttons">
                            <button onClick={handleKeepHand} className="mulligan-button keep">手札をキープ ({myPlayerGameState.hand.length}枚)</button>
                            {myMulliganCount < 7 && ( 
                                <button onClick={handleInitiateMulliganStep} className="mulligan-button mulligan">
                                    マリガン (7枚引き、{myMulliganCount + 1}枚ボトムへ)
                                </button>
                            )}
                             {myMulliganCount >= 7 && (
                                <p>これ以上マリガンできません。この手札（{myPlayerGameState.hand.length}枚）をキープしてください。</p>
                            )}
                        </div>
                    </>
                )}
                {myMulliganPhaseState === 'selecting_bottom' && (
                    <>
                        <p>マリガン {myMulliganCount + 1}回目: 新しく7枚引きました。その中から {myMulliganCount + 1}枚を選んでデッキの底に送ってください。</p>
                        <p>選択済み: {cardsToPutOnBottomSelectedIndices.length} / {myMulliganCount + 1} 枚</p>
                        <div className="hand-zone-arena my-hand-arena mtg-card-zone mulligan-selection-hand">
                            {myPlayerGameState.hand.map((card, index) => ( 
                                <MtgCard
                                    key={`${card.id}-mymulliganselect-${index}`}
                                    card={card}
                                    context="hand"
                                    isMyCard={true}
                                    originalIndex={index}
                                    onClick={() => handleToggleCardForBottomSelection(index)}
                                    isSelected={cardsToPutOnBottomSelectedIndices.includes(index)}
                                    isSelectable={true}
                                    isDisabled={false}
                                />
                            ))}
                        </div>
                        <button 
                            onClick={handleConfirmBottomSelection} 
                            disabled={cardsToPutOnBottomSelectedIndices.length !== (myMulliganCount + 1)}
                            className="confirm-bottom-selection-button"
                        >
                            選択完了 ({myMulliganCount + 1}枚ボトムへ)
                        </button>
                    </>
                )}
                {myMulliganPhaseState === 'kept' && (
                    <p>あなたは手札をキープしました。相手の決定を待っています...</p>
                )}
                 <div className="opponent-mulligan-status">
                    相手のマリガン状態: {opponentMulliganPhaseState === 'kept' ? `キープ済み (手札 ${opponentPlayerState?.handCount ?? '?'}, マリガン ${opponentMulliganCount}回)` : `考慮中 (マリガン ${opponentMulliganCount}回)`}
                </div>
            </div>
          )}

          {(roomPhase === 'game_active' || (roomPhase === 'MULLIGAN' && myMulliganPhaseState === 'kept')) && myPlayerGameState && opponentPlayerState && (
            <div className="game-board arena-style">
              {/* Opponent's Area */}
              <div className="player-area opponent-area-arena">
                <div className="player-info-bar arena-info-bar">
                  <div className="avatar-placeholder arena-avatar">O</div>
                  <span className="player-name-arena">相手 ({opponentActualPeerId ? opponentActualPeerId.substring(0,6) : '確認中'})</span>
                  <div className="life-display-arena">
                    <span className="life-label">Life: </span>
                    <span className="life-value">{opponentPlayerState.life}</span>
                  </div>
                  <div className="zone-counts-arena">
                    <span>Hand: {opponentPlayerState.handCount}</span>
                    <span>Deck: {opponentPlayerState.deckCount}</span>
                    <span>GY Cards: {opponentPlayerState.graveyard.length}</span>
                    <span>Tokens: {opponentPlayerState.fieldTokens.length}</span>
                  </div>
                </div>
                <div className="playing-space-arena">
                    <div className="deck-zone-arena opponent-deck-arena" aria-label="相手のデッキ">
                        <div className="deck-pile-visual">Deck</div>
                        <span className="count-overlay">{opponentPlayerState.deckCount}</span>
                    </div>
                    <div className="field-zone-arena opponent-field-arena mtg-card-zone" aria-label="相手のフィールド">
                        {groupCardsById(opponentPlayerState.field).map(groupedCardInfo => renderFieldCardGroup(groupedCardInfo, false, false))}
                        {opponentPlayerState.fieldTokens.map((tokenInst, index) => renderFieldToken(tokenInst, index, false, false) )}
                    </div>
                    <div className="graveyard-zone-arena opponent-graveyard-arena" aria-label="相手の墓地 (クリックで表示)" 
                         onClick={() => handleOpenGraveyardModal('opponent')} role="button" tabIndex={0} onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenGraveyardModal('opponent')}>
                        <div className="graveyard-pile-visual">GY</div>
                        <span className="count-overlay">{opponentPlayerState.graveyard.length}</span>
                         {opponentPlayerState.graveyard.length > 0 && 
                            <span className="graveyard-top-card-preview">{opponentPlayerState.graveyard[opponentPlayerState.graveyard.length -1].name}</span>
                        }
                    </div>
                </div>
                {roomPhase === 'game_active' && (
                  <div className="notes-container opponent-notes-container">
                    {opponentPlayerState.opponentNotes.map(note => (
                      <div key={note.id} className="notes-area opponent-notes-area individual-note-area">
                        <div className="notes-header">
                            <span className="notes-title" title={note.title}>{note.title}</span>
                            <span className="notes-status">({note.isShared ? '公開中' : '非公開'})</span>
                        </div>
                        {note.isShared ? (
                          <div className="notes-content scrollable-text">{note.text || (<em>メモは空です</em>)}</div>
                        ) : (
                          <div className="notes-content hidden-notes"><em>相手のメモは非公開です。</em></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Player's Area */}
              <div className="player-area my-area-arena">
                 <div className="player-info-bar arena-info-bar">
                  <div className="avatar-placeholder arena-avatar">P</div>
                  <span className="player-name-arena">あなた ({myPeerId.substring(0,6)})</span>
                  <div className="life-control-arena">
                    <span className="life-label">Life: </span>
                    <button onClick={() => handleUpdateMyLife(myPlayerGameState.life - 1)} disabled={roomPhase !== 'game_active'} aria-label="ライフを1減らす">-</button>
                    <input 
                        type="number" 
                        value={myPlayerGameState.life} 
                        onChange={(e) => handleUpdateMyLife(e.target.value)}
                        disabled={roomPhase !== 'game_active'}
                        className="life-input-arena"
                        aria-label="現在のライフ"
                    />
                    <button onClick={() => handleUpdateMyLife(myPlayerGameState.life + 1)} disabled={roomPhase !== 'game_active'} aria-label="ライフを1増やす">+</button>
                  </div>
                  <div className="zone-counts-arena">
                    <span>Deck: {myPlayerGameState.deck.length}</span>
                    <span>GY Cards: {myPlayerGameState.graveyard.length}</span>
                    <span>Tokens: {myPlayerGameState.fieldTokens.length}</span>
                  </div>
                  {roomPhase === 'game_active' && <button onClick={() => handleOpenCreateTokenModal(false)} className="create-token-button">トークン生成</button>}
                </div>
                <div className="playing-space-arena">
                     <div className="deck-zone-arena my-deck-arena" aria-label="あなたのデッキ">
                        <button onClick={handleDrawCard} disabled={myPlayerGameState.deck.length === 0 || roomPhase !== 'game_active'} className="deck-pile-visual draw-button-on-deck">
                            Deck
                        </button>
                        <span className="count-overlay">{myPlayerGameState.deck.length}</span>
                    </div>
                    <div 
                        className={`field-zone-arena my-field-arena mtg-card-zone ${isFieldDropTarget ? 'drop-target-active' : ''}`}
                        aria-label="あなたのフィールド (手札からドラッグ&ドロップでプレイ可能)"
                        onDragOver={(e) => handleZoneDragOver(e, 'field')}
                        onDrop={(e) => handleZoneDrop(e, 'field')}
                        onDragEnter={() => handleZoneDragEnter('field')}
                        onDragLeave={() => handleZoneDragLeave('field')}
                    >
                        {groupCardsById(myPlayerGameState.field).map(groupedCardInfo => renderFieldCardGroup(groupedCardInfo, true, false))}
                        {myPlayerGameState.fieldTokens.map((tokenInst, index) => renderFieldToken(tokenInst, index, true, false))}
                    </div>
                    <div 
                        className={`graveyard-zone-arena my-graveyard-arena ${isGraveyardDropTarget ? 'drop-target-graveyard-active' : ''}`}
                        aria-label="あなたの墓地 (クリックで表示、手札/フィールドからドラッグ&ドロップで墓地へ)"
                        onClick={() => handleOpenGraveyardModal('my')} role="button" tabIndex={0} onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenGraveyardModal('my')}
                        onDragOver={(e) => handleZoneDragOver(e, 'graveyard')}
                        onDrop={(e) => handleZoneDrop(e, 'graveyard')}
                        onDragEnter={() => handleZoneDragEnter('graveyard')}
                        onDragLeave={() => handleZoneDragLeave('graveyard')}
                    >
                        <div className="graveyard-pile-visual">GY</div>
                        <span className="count-overlay">{myPlayerGameState.graveyard.length}</span>
                        {myPlayerGameState.graveyard.length > 0 && 
                            <span className="graveyard-top-card-preview">{myPlayerGameState.graveyard[myPlayerGameState.graveyard.length -1].name}</span>
                        }
                    </div>
                </div>
                 {roomPhase === 'game_active' && (
                    <div className="notes-container my-notes-container">
                        <button onClick={handleAddMyNote} className="add-note-button">新しいメモを追加</button>
                        {myPlayerGameState.myNotes.map((note) => (
                            <div key={note.id} className="notes-area my-notes-area individual-note-area">
                                <div className="notes-header">
                                    <input 
                                        type="text" 
                                        value={note.title} 
                                        onChange={(e) => handleMyNoteTitleChange(note.id, e.target.value)} 
                                        className="notes-title-input"
                                        aria-label={`メモ「${note.title}」のタイトル`}
                                    />
                                    <span className="notes-status">({note.isShared ? '公開中' : '非公開'})</span>
                                    <button 
                                        onClick={() => handleToggleMyNoteShared(note.id)} 
                                        className="notes-toggle-button"
                                        aria-pressed={note.isShared}
                                        aria-label={note.isShared ? `メモ「${note.title}」を非公開にする` : `メモ「${note.title}」を公開する`}
                                    >
                                        {note.isShared ? '非公開' : '公開'}
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteMyNote(note.id)} 
                                        className="notes-delete-button" 
                                        disabled={myPlayerGameState.myNotes.length <= 1}
                                        aria-label={`メモ「${note.title}」を削除`}
                                    >
                                        削除
                                    </button>
                                </div>
                                <textarea
                                    className="notes-textarea scrollable-text"
                                    value={note.text}
                                    onChange={(e) => handleMyNoteTextChange(note.id, e.target.value)}
                                    placeholder="ここにメモを入力..."
                                    aria-label={`メモ「${note.title}」の内容`}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="hand-zone-arena my-hand-arena mtg-card-zone" aria-label="あなたの手札">
                  { (roomPhase === 'game_active' || (roomPhase === 'MULLIGAN' && myMulliganPhaseState === 'kept')) &&
                    myPlayerGameState.hand.map((card, index) => {
                        const isCurrentlyDraggingThis = draggingItemInfo?.type === 'card' &&
                                                      (draggingItemInfo.data as CardDefinition).id === card.id && // Check if it's the same card definition
                                                      draggingItemInfo.originalIndex === index && // And from the same hand index
                                                      draggingItemInfo.fromZone === 'hand' &&
                                                      !draggingItemInfo.isTestGame;
                        return (
                            <MtgCard
                                key={`${card.id}-myhand-${index}`}
                                card={card}
                                context="hand"
                                isMyCard={true}
                                originalIndex={index}
                                onDragStartItem={(e, item, itemType, fz, oi) => handleItemDragStart(e, item, itemType, fz, oi, false)}
                                onDragEndItem={handleItemDragEnd}
                                isDraggable={roomPhase === 'game_active'}
                                isDragging={isCurrentlyDraggingThis}
                                isDisabled={roomPhase !== 'game_active'}
                            />
                        );
                    })}
                </div>
              </div>
            </div> 
          )}
           {roomPhase === 'game_over' && <p>ゲーム終了！</p>}
        </section>)}

      {p2pConnectionStatus === 'connected' && roomPhase !== 'game_active' && roomPhase !== 'MULLIGAN' && (
        <section className="chat-section" aria-labelledby="chat-heading">
          <h3 id="chat-heading">チャット</h3>
          <div className="chat-messages" role="log" aria-live="polite" ref={chatMessagesContainerRef}>
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>))}
          </div>
          <div className="chat-input-area">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="メッセージを入力..." onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()} disabled={isLoading || isLoadingP2PSetup || p2pConnectionStatus !== 'connected'} aria-label="チャットメッセージ入力"/>
            <button onClick={handleSendChatMessage} disabled={isLoading || isLoadingP2PSetup || p2pConnectionStatus !== 'connected'}>送信</button>
          </div>
        </section>)}
      
      {roomPhase !== 'game_active' && roomPhase !== 'MULLIGAN' && (
        <div style={{ marginTop: '20px', fontSize: '0.8em', color: '#777' }}>
            <p>あなたのピアID: {myPeerId || 'N/A'}</p>
            <p>相手のピアID (判明時): {opponentActualPeerId || 'N/A'}</p>
        </div>
      )}
    </div>
  );

  const renderTestGameView = () => (
    <div className={`view-container test-game-view ${testGamePhase === 'game_active' || testGamePhase === 'MULLIGAN' ? 'game-active-scrollable' : ''}`}>
      <header className="room-header">
        <h2>テストゲーム画面</h2>
        <button onClick={() => { setCurrentView('main'); resetTestGameStates(); }} className="leave-button">メインに戻る</button>
      </header>

      {testGameError && <p className="error-message room-error" role="alert">{testGameError}</p>}

      {testGamePhase === 'deck_selection' && (
        <section className="deck-selection-area" aria-labelledby="test-deck-selection-heading">
          <h3 id="test-deck-selection-heading">テスト用デッキを選択</h3>
          {allDecks.length === 0 ? <p>プレイ可能なデッキがありません。デッキエディタで作成してください。</p> : (
            <ul className="deck-list game-deck-selector">
              {allDecks.map(deck => (
                <li key={deck.id} className={testSelectedDeckId === deck.id ? 'selected' : ''}>
                  {deck.name} ({deck.cardIds.length}枚)
                  <button onClick={() => handleSelectTestDeck(deck.id)}>{testSelectedDeckId === deck.id ? '選択中' : '選択'}</button>
                </li>))}
            </ul>)}
          {testSelectedDeckId && <p>選択中のデッキ: {allDecks.find(d=>d.id===testSelectedDeckId)?.name} ({allDecks.find(d=>d.id===testSelectedDeckId)?.cardIds.length}枚)</p>}
          <button onClick={handleStartTestGame} className="start-game-button" disabled={!testSelectedDeckId}>テストゲーム開始</button>
        </section>
      )}

      {testGamePhase === 'MULLIGAN' && testPlayerGameState && (
        <section className="mulligan-decision-area" aria-labelledby="test-mulligan-heading">
            <h3 id="test-mulligan-heading">マリガンフェイズ (ロンドンマリガン - テスト)</h3>
            {testMulliganPhaseState === 'deciding' && (
                <>
                    <p>現在のあなたの手札 ({testPlayerGameState.hand.length}枚、マリガン {testMulliganCount}回)。どうしますか？</p>
                    <div className="hand-zone-arena my-hand-arena mtg-card-zone" aria-label="あなたの現在の手札（確認用）">
                        {testPlayerGameState.hand.map((card, index) => (
                            <MtgCard
                                key={`${card.id}-mytestmulligandecide-${index}`}
                                card={card}
                                context="hand"
                                isMyCard={true}
                                originalIndex={index}
                                isDisabled={true}
                                isDraggable={false}
                            />
                        ))}
                    </div>
                    <div className="mulligan-buttons">
                        <button onClick={handleTestKeepHand} className="mulligan-button keep">手札をキープ ({testPlayerGameState.hand.length}枚)</button>
                        {testMulliganCount < 7 && (
                            <button onClick={handleTestInitiateMulliganStep} className="mulligan-button mulligan">
                                マリガン (7枚引き、{testMulliganCount + 1}枚ボトムへ)
                            </button>
                        )}
                        {testMulliganCount >= 7 && (
                           <p>これ以上マリガンできません。この手札（{testPlayerGameState.hand.length}枚）をキープしてください。</p>
                        )}
                    </div>
                </>
            )}
            {testMulliganPhaseState === 'selecting_bottom' && (
                <>
                    <p>マリガン {testMulliganCount + 1}回目: 新しく7枚引きました。その中から {testMulliganCount + 1}枚を選んでデッキの底に送ってください。</p>
                    <p>選択済み: {testCardsToPutOnBottomSelectedIndices.length} / {testMulliganCount + 1} 枚</p>
                    <div className="hand-zone-arena my-hand-arena mtg-card-zone mulligan-selection-hand">
                        {testPlayerGameState.hand.map((card, index) => (
                            <MtgCard
                                key={`${card.id}-mytestmulliganselect-${index}`}
                                card={card}
                                context="hand"
                                isMyCard={true}
                                originalIndex={index}
                                onClick={() => handleTestToggleCardForBottomSelection(index)}
                                isSelected={testCardsToPutOnBottomSelectedIndices.includes(index)}
                                isSelectable={true}
                                isDisabled={false}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={handleTestConfirmBottomSelection} 
                        disabled={testCardsToPutOnBottomSelectedIndices.length !== (testMulliganCount + 1)}
                        className="confirm-bottom-selection-button"
                    >
                        選択完了 ({testMulliganCount + 1}枚ボトムへ)
                    </button>
                </>
            )}
            {testMulliganPhaseState === 'kept' && ( <p>手札をキープしました。ゲームを開始しています...</p> )}
        </section>
      )}


      {(testGamePhase === 'game_active' || (testGamePhase === 'MULLIGAN' && testMulliganPhaseState === 'kept')) && testPlayerGameState && testOpponentMockState && (
         <section className="game-section full-game-board-active" aria-labelledby="test-game-board-heading">
            <h3 id="test-game-board-heading" className="sr-only">テストゲームボード</h3>
            <div className="game-board arena-style">
              {/* Opponent's Area (Mock) */}
              <div className="player-area opponent-area-arena">
                <div className="player-info-bar arena-info-bar">
                  <div className="avatar-placeholder arena-avatar">M</div>
                  <span className="player-name-arena">相手 (モック)</span>
                  <div className="life-display-arena">
                    <span className="life-label">Life: </span>
                    <span className="life-value">{testOpponentMockState.life}</span>
                  </div>
                  <div className="zone-counts-arena">
                    <span>Hand: {testOpponentMockState.handCount}</span>
                    <span>Deck: {testOpponentMockState.deckCount}</span>
                    <span>GY Cards: {testOpponentMockState.graveyard.length}</span>
                    <span>Tokens: {testOpponentMockState.fieldTokens.length}</span>
                  </div>
                </div>
                <div className="playing-space-arena">
                     <div className="deck-zone-arena opponent-deck-arena" aria-label="相手のデッキ(モック)">
                        <div className="deck-pile-visual">Deck</div>
                        <span className="count-overlay">{testOpponentMockState.deckCount}</span>
                    </div>
                    <div className="field-zone-arena opponent-field-arena mtg-card-zone" aria-label="相手のフィールド (モック)">
                        {groupCardsById(testOpponentMockState.field).map(groupedCardInfo => renderFieldCardGroup(groupedCardInfo, false, true))}
                        {testOpponentMockState.fieldTokens.map((tokenInst, index) => renderFieldToken(tokenInst, index, false, true) )}
                    </div>
                    <div className="graveyard-zone-arena opponent-graveyard-arena" aria-label="相手の墓地(モック) (クリックで表示)"
                        onClick={() => handleOpenGraveyardModal('opponent', true)} role="button" tabIndex={0} onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenGraveyardModal('opponent', true)}>
                        <div className="graveyard-pile-visual">GY</div>
                        <span className="count-overlay">{testOpponentMockState.graveyard.length}</span>
                         {testOpponentMockState.graveyard.length > 0 && 
                            <span className="graveyard-top-card-preview">{testOpponentMockState.graveyard[testOpponentMockState.graveyard.length -1].name}</span>
                        }
                    </div>
                </div>
                 {testGamePhase === 'game_active' && (
                    <div className="notes-container opponent-notes-container">
                         {testOpponentMockState.opponentNotes.map(note => (
                            <div key={note.id} className="notes-area opponent-notes-area individual-note-area">
                                <div className="notes-header">
                                    <span className="notes-title" title={note.title}>{note.title}</span>
                                    <span className="notes-status">({note.isShared ? '公開中' : '非公開'})</span>
                                </div>
                                {note.isShared ? (
                                <div className="notes-content scrollable-text">{note.text || (<em>メモは空です</em>)}</div>
                                ) : (
                                <div className="notes-content hidden-notes"><em>相手のメモは非公開です。</em></div>
                                )}
                            </div>
                        ))}
                    </div>
                 )}
              </div>

              {/* Player's Area (Test) */}
              <div className="player-area my-area-arena">
                 <div className="player-info-bar arena-info-bar">
                  <div className="avatar-placeholder arena-avatar">T</div>
                  <span className="player-name-arena">あなた (テスト)</span>
                   <div className="life-control-arena">
                    <span className="life-label">Life: </span>
                    <button onClick={() => handleTestUpdateLife(testPlayerGameState.life - 1)} disabled={testGamePhase !== 'game_active'} aria-label="テストライフを1減らす">-</button>
                    <input 
                        type="number" 
                        value={testPlayerGameState.life} 
                        onChange={(e) => handleTestUpdateLife(e.target.value)}
                        disabled={testGamePhase !== 'game_active'}
                        className="life-input-arena"
                        aria-label="現在のテストライフ"
                    />
                    <button onClick={() => handleTestUpdateLife(testPlayerGameState.life + 1)} disabled={testGamePhase !== 'game_active'} aria-label="テストライフを1増やす">+</button>
                  </div>
                  <div className="zone-counts-arena">
                    <span>Deck: {testPlayerGameState.deck.length}</span>
                    <span>GY Cards: {testPlayerGameState.graveyard.length}</span>
                     <span>Tokens: {testPlayerGameState.fieldTokens.length}</span>
                  </div>
                  {testGamePhase === 'game_active' && <button onClick={() => handleOpenCreateTokenModal(true)} className="create-token-button">テストトークン生成</button>}
                </div>
                <div className="playing-space-arena">
                    <div className="deck-zone-arena my-deck-arena" aria-label="あなたのデッキ">
                        <button onClick={handleTestDrawCard} disabled={testPlayerGameState.deck.length === 0 || testGamePhase !== 'game_active'} className="deck-pile-visual draw-button-on-deck">
                           Deck
                        </button>
                         <span className="count-overlay">{testPlayerGameState.deck.length}</span>
                    </div>
                    <div 
                        className={`field-zone-arena my-field-arena mtg-card-zone ${isFieldDropTarget && draggingItemInfo?.isTestGame ? 'drop-target-active' : ''}`}
                        aria-label="あなたのフィールド (手札からドラッグ&ドロップでプレイ可能)"
                        onDragOver={(e) => handleZoneDragOver(e, 'field')}
                        onDrop={(e) => handleZoneDrop(e, 'field')}
                        onDragEnter={() => handleZoneDragEnter('field')}
                        onDragLeave={() => handleZoneDragLeave('field')}
                    >
                        {groupCardsById(testPlayerGameState.field).map(groupedCardInfo => renderFieldCardGroup(groupedCardInfo, true, true))}
                        {testPlayerGameState.fieldTokens.map((tokenInst, index) => renderFieldToken(tokenInst, index, true, true))}
                    </div>
                     <div 
                        className={`graveyard-zone-arena my-graveyard-arena ${isGraveyardDropTarget && draggingItemInfo?.isTestGame ? 'drop-target-graveyard-active' : ''}`}
                        aria-label="あなたの墓地 (クリックで表示、手札/フィールドからドラッグ&ドロップで墓地へ)"
                        onClick={() => handleOpenGraveyardModal('my', true)} role="button" tabIndex={0} onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenGraveyardModal('my', true)}
                        onDragOver={(e) => handleZoneDragOver(e, 'graveyard')}
                        onDrop={(e) => handleZoneDrop(e, 'graveyard')}
                        onDragEnter={() => handleZoneDragEnter('graveyard')}
                        onDragLeave={() => handleZoneDragLeave('graveyard')}
                    >
                        <div className="graveyard-pile-visual">GY</div>
                        <span className="count-overlay">{testPlayerGameState.graveyard.length}</span>
                        {testPlayerGameState.graveyard.length > 0 &&
                             <span className="graveyard-top-card-preview">{testPlayerGameState.graveyard[testPlayerGameState.graveyard.length -1].name}</span>
                        }
                    </div>
                </div>
                 {testGamePhase === 'game_active' && (
                    <div className="notes-container my-notes-container">
                        <button onClick={handleTestAddNote} className="add-note-button">新しいテストメモを追加</button>
                        {testPlayerGameState.myNotes.map((note) => (
                             <div key={note.id} className="notes-area my-notes-area individual-note-area">
                                <div className="notes-header">
                                    <input 
                                        type="text" 
                                        value={note.title} 
                                        onChange={(e) => handleTestNoteTitleChange(note.id, e.target.value)} 
                                        className="notes-title-input"
                                        aria-label={`テストメモ「${note.title}」のタイトル`}
                                    />
                                    <span className="notes-status">({note.isShared ? '公開中' : '非公開'})</span>
                                    <button 
                                        onClick={() => handleTestToggleNoteShared(note.id)} 
                                        className="notes-toggle-button"
                                        aria-pressed={note.isShared}
                                        aria-label={note.isShared ? `テストメモ「${note.title}」を非公開にする` : `テストメモ「${note.title}」を公開する`}
                                    >
                                        {note.isShared ? '非公開' : '公開'}
                                    </button>
                                    <button 
                                        onClick={() => handleTestDeleteNote(note.id)} 
                                        className="notes-delete-button" 
                                        disabled={testPlayerGameState.myNotes.length <= 1}
                                        aria-label={`テストメモ「${note.title}」を削除`}
                                    >
                                        削除
                                    </button>
                                </div>
                                <textarea
                                    className="notes-textarea scrollable-text"
                                    value={note.text}
                                    onChange={(e) => handleTestNoteTextChange(note.id, e.target.value)}
                                    placeholder="テストメモを入力..."
                                    aria-label={`テストメモ「${note.title}」の内容`}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="hand-zone-arena my-hand-arena mtg-card-zone" aria-label="あなたの手札">
                     { (testGamePhase === 'game_active' || (testGamePhase === 'MULLIGAN' && testMulliganPhaseState === 'kept')) &&
                        testPlayerGameState.hand.map((card, index) => {
                           const isCurrentlyDraggingThis = draggingItemInfo?.type === 'card' &&
                                                          (draggingItemInfo.data as CardDefinition).id === card.id && // Check card def ID
                                                          draggingItemInfo.originalIndex === index && // And original hand index
                                                          draggingItemInfo.fromZone === 'hand' &&
                                                          draggingItemInfo.isTestGame;
                           return (
                               <MtgCard
                                   key={`${card.id}-mytest-hand-${index}`}
                                   card={card}
                                   context="hand"
                                   isMyCard={true}
                                   originalIndex={index}
                                   onDragStartItem={(e, item, itemType, fz, oi) => handleItemDragStart(e, item, itemType, fz, oi, true)}
                                   onDragEndItem={handleItemDragEnd}
                                   isDraggable={testGamePhase === 'game_active'}
                                   isDragging={isCurrentlyDraggingThis}
                                   isDisabled={testGamePhase !== 'game_active'}
                               />
                           );
                        })
                    }
                </div>
              </div>
            </div>
        </section>
      )}
      {testGamePhase === 'game_over' && <p>テストゲーム終了。</p>}
    </div>
  );


  const renderCurrentView = () => {
    switch (currentView) {
      case 'main': return renderMainView();
      case 'room': return renderRoomView();
      case 'cardEditor': return renderCardEditorView();
      case 'deckEditor': return renderDeckEditorView();
      case 'tokenEditor': return renderTokenEditorView();
      case 'testGameView': return renderTestGameView();
      default: return renderMainView();
    }
  }

  return ( 
    <div className={`app-container ${
        ((currentView === 'room' && (roomPhase === 'game_active' || roomPhase === 'MULLIGAN')) ||
         (currentView === 'testGameView' && ['game_active', 'MULLIGAN'].includes(testGamePhase)))
        ? 'full-width-game game-active-bg' : '' 
    }`}> 
      {renderCurrentView()} 
      {isGraveyardModalOpen && (
        <div className="modal-overlay" onClick={handleCloseGraveyardModal} role="dialog" aria-modal="true" aria-labelledby="graveyard-modal-title">
          <div className="modal-content graveyard-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3 id="graveyard-modal-title">
                {viewingGraveyardFor === 'my' ? 'あなたの墓地' : '相手の墓地'} ({graveyardToView.length}枚)
              </h3>
              <button onClick={handleCloseGraveyardModal} className="modal-close-button" aria-label="閉じる">&times;</button>
            </header>
            <div className="modal-body mtg-card-grid graveyard-cards-display">
              {graveyardToView.length === 0 ? <p>墓地は空です。</p> :
                graveyardToView.map((card, index) => (
                  <MtgCard
                    key={`${card.id}-gyview-${index}-${viewingGraveyardFor}`} 
                    card={card}
                    context="graveyard-viewer"
                    isMyCard={viewingGraveyardFor === 'my'}
                    originalIndex={index}
                    onMoveFromGraveyardToHand={viewingGraveyardFor === 'my' ? (currentView === 'room' ? (c, i) => handleMoveCardFromGraveyard(c, i, 'hand') : (c, i) => handleTestMoveCardFromGraveyard(c, i, 'hand')) : undefined}
                    onMoveFromGraveyardToField={viewingGraveyardFor === 'my' ? (currentView === 'room' ? (c, i) => handleMoveCardFromGraveyard(c, i, 'field') : (c, i) => handleTestMoveCardFromGraveyard(c, i, 'field')) : undefined}
                    isGameActive={currentView === 'room' ? roomPhase === 'game_active' : testGamePhase === 'game_active'}
                  />
                ))
              }
            </div>
          </div>
        </div>
      )}
      {isCreateTokenModalOpen && (
        <div className="modal-overlay" onClick={handleCloseCreateTokenModal} role="dialog" aria-modal="true" aria-labelledby="create-token-modal-title">
          <div className="modal-content create-token-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3 id="create-token-modal-title">トークンを生成</h3>
              <button onClick={handleCloseCreateTokenModal} className="modal-close-button" aria-label="閉じる">&times;</button>
            </header>
            <div className="modal-body mtg-card-grid token-selector-list">
              {allTokenDefinitions.length === 0 ? <p>利用可能なトークン定義がありません。トークンエディタで作成してください。</p> :
                allTokenDefinitions.map((td) => (
                  <MtgCard
                    key={td.id}
                    tokenInstance={{instanceId: td.id, definition: td}}
                    isTokenDisplay={true}
                    context="token-selector"
                    onClick={() => isTestGameTokenModal ? handleTestCreateToken(td.id) : handleCreateTokenP2P(td.id)}
                    isSelectable={true}
                    isMyCard={true} /* To make it clickable in the modal */
                  />
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div> 
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render( <React.StrictMode> <App /> </React.StrictMode> );
}
