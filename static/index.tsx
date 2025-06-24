
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Simple PRNG (Mulberry32)
class PRNG {
    private seed: number;
    constructor(seed: number) {
        this.seed = seed;
    }
    public next(): number { // Returns a float in [0, 1)
        let t = this.seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    public nextInt(min: number, max: number): number { // Returns an int in [min, max] (inclusive)
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    public randFloat(min: number, max: number): number {
        return min + this.next() * (max - min);
    }
}
let prng: PRNG | null = null; // Default PRNG, will be re-seeded for games
let currentMapSeed: number | null = null;


let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: PointerLockControls;
let pitchObject: THREE.Object3D | undefined = undefined; // For camera pitch control

const targetMeshes: Map<string, THREE.Mesh> = new Map();
const targetBoundingBoxCache: Map<string, THREE.Box3> = new Map(); // Cache for performance
interface Projectile {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  lifeTime: number;
  spawnTime: number;
  weaponType: 'handgun' | 'sniper' | 'smg'; // To know which stats to use
}
const projectiles: Projectile[] = [];

interface RemoteProjectile extends Projectile {}
const remoteProjectiles: RemoteProjectile[] = [];


let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const INPUT_DELAY_MS = 50;
interface PendingInput {
  timestamp: number;
  action: () => void;
}
const pendingInputs: PendingInput[] = [];

let moveForwardActual = false;
let moveBackwardActual = false;
let moveLeftActual = false;
let moveRightActual = false;
let isAimingWithKeyActual = false;
let isAimingWithMouseActual = false;
let isFiringSMGActual = false;


const PLAYER_HEIGHT = 1.8;
const PLAYER_RADIUS = 0.4;
const MOVEMENT_SPEED = 5.0 * 1.5; // Increased movement speed
const PROJECTILE_LIFETIME = 5.0; 
const PROJECTILE_RADIUS = 0.08;
const GRAVITY = 9.8; // Gravity acceleration (m/s²) 

const projectileGeometry = new THREE.SphereGeometry(PROJECTILE_RADIUS, 8, 8);
const handgunProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sniperProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const smgProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Orange for SMG
const remoteProjectileMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red for remote projectiles

// Weapon Models & Muzzle Points
let handgunModel: THREE.Group;
let handgunMuzzlePoint: THREE.Object3D;
let sniperRifleModel: THREE.Group;
let sniperMuzzlePoint: THREE.Object3D;
let smgModel: THREE.Group;
let smgMuzzlePoint: THREE.Object3D;

const raycaster = new THREE.Raycaster(); // Still used for ground detection, potentially other things


// Weapon Stats Structure
interface WeaponStats {
    hipPosition: THREE.Vector3;
    adsPosition: THREE.Vector3;
    hipRotation: THREE.Euler;
    adsRotation: THREE.Euler;
    adsFov: number;
    recoilAmount: THREE.Vector3; // x: max random sideways positional kick, y: (sniper ADS: camera pitch radians) OR (other: model vertical positional kick), z: model backward positional kick
    recoilDuration: number;
    recoilReturnSpeed: number;
    fireRate: number; // milliseconds
    projectileSpeed: number;
    projectileMaterial: THREE.Material;
    model: THREE.Group;
    muzzlePoint: THREE.Object3D;
    damage: number; // Damage dealt per hit
    spreadAngle?: number; // Max angle (radians) of deviation from center for hip fire
    adsSpreadMultiplier?: number; // Factor to reduce spreadAngle when ADS (e.g., 0.3 for 30%)
    magazineCapacity: number; // Maximum bullets in magazine
    reloadTime: number; // Time in milliseconds to reload
    zeroingDistance?: number; // Zeroing distance in meters (for sniper rifles)
}

let weaponStatsDB: Record<string, Partial<WeaponStats>> = {}; // Will be populated after models are created

const NORMAL_FOV = 75;
const ADS_TRANSITION_SPEED = 10.0;

let currentEquippedWeapon: 'handgun' | 'sniper' | 'smg' = 'handgun';
let lastFireTime = 0;
let currentAmmo: Record<string, number> = {}; // Current ammo for each weapon
let sniperZeroingDistance = 100; // Current zeroing distance for sniper rifle (meters)
let isReloading = false;
let reloadStartTime = 0;
let weaponReloadOffset = new THREE.Vector3(); // Reload animation offset
let weaponReloadTime = 0; // Time elapsed in reload animation

let activeWeaponRecoilOffset = new THREE.Vector3(); // Current positional recoil of weapon model
let cameraPitchRecoil = 0; // Current camera pitch recoil value (radians)
let isWeaponRecoiling = false;
let weaponRecoilTime = 0;


let gameMode: 'idle' | 'singleplayer' | 'multiplayer' = 'idle';
let isGameInitialized = false;

// UI Elements
const mainMenuDiv = document.getElementById('main-menu') as HTMLDivElement;
const instructionOverlay = document.getElementById('instruction-overlay') as HTMLDivElement;
const gameContainer = document.getElementById('game-container') as HTMLDivElement;
const startSinglePlayerButton = document.getElementById('start-singleplayer') as HTMLButtonElement;
const startMultiplayerButton = document.getElementById('start-multiplayer') as HTMLButtonElement;
const instructionText = document.getElementById('instruction-text') as HTMLDivElement;
const p2pInstructionText = document.getElementById('p2p-instruction') as HTMLParagraphElement;
const scopeOverlay = document.getElementById('scope-overlay') as HTMLDivElement;


// P2P Signaling UI Elements
const signalingPanel = document.getElementById('webrtc-signaling-panel') as HTMLDivElement;
const p2pStatusText = document.getElementById('p2p-status') as HTMLParagraphElement;
const createOfferBtn = document.getElementById('create-offer-btn') as HTMLButtonElement;
const createAnswerBtn = document.getElementById('create-answer-btn') as HTMLButtonElement;
const localSdpTextarea = document.getElementById('local-sdp') as HTMLTextAreaElement;
const remoteSdpTextarea = document.getElementById('remote-sdp') as HTMLTextAreaElement;
const setRemoteSdpBtn = document.getElementById('set-remote-sdp-btn') as HTMLButtonElement;
const localIceTextarea = document.getElementById('local-ice') as HTMLTextAreaElement;
const remoteIceTextarea = document.getElementById('remote-ice') as HTMLTextAreaElement;
const addRemoteIceBtn = document.getElementById('add-remote-ice-btn') as HTMLButtonElement;
const closeSignalingBtn = document.getElementById('close-signaling-btn') as HTMLButtonElement;
const copyLocalSdpBtn = document.getElementById('copy-local-sdp-btn') as HTMLButtonElement;
const copyLocalIceBtn = document.getElementById('copy-local-ice-btn') as HTMLButtonElement;


// WebRTC Variables
let peerConnection: RTCPeerConnection | null = null;
let dataChannel: RTCDataChannel | null = null;

// WebSocket Signaling Variables
let signalingSocket: WebSocket | null = null;
let clientId: string | null = null;
let currentRoom: string | null = null;
let isWaitingForOpponent = false;
let matchmakingTimeout: number | null = null;

const FALLBACK_STUN_SERVERS: RTCIceServer[] = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
];

async function getIceServersConfiguration(): Promise<RTCConfiguration> {
    const apiKey = "d51424dc9b80232dbc239f680b412cdbfe33"; // As provided by the user
    try {
        const response = await fetch(`https://p2p-sample.metered.live/api/v1/turn/credentials?apiKey=${apiKey}`);
        if (!response.ok) {
            console.warn(`Failed to fetch TURN credentials: ${response.status} ${response.statusText}. Using fallback STUN servers.`);
            return { iceServers: FALLBACK_STUN_SERVERS };
        }
        const fetchedIceServers = await response.json(); // Expected to be an array of RTCICEServer objects

        if (Array.isArray(fetchedIceServers) && fetchedIceServers.length > 0) {
            console.log("Successfully fetched TURN credentials. Combining with fallback STUN.");
            // Combine fetched TURN servers with fallback STUN servers.
            return { iceServers: [...fetchedIceServers, ...FALLBACK_STUN_SERVERS] };
        } else {
            console.warn("Fetched TURN credentials but the list is empty or invalid. Using fallback STUN servers only.");
            return { iceServers: FALLBACK_STUN_SERVERS };
        }
    } catch (error) {
        console.error("Error fetching TURN credentials, using fallback STUN servers:", error);
        return { iceServers: FALLBACK_STUN_SERVERS };
    }
}


let remotePlayerMesh: THREE.Group | null = null;
let remotePlayerHandgunMesh: THREE.Mesh | null = null;
let remotePlayerSniperMesh: THREE.Mesh | null = null;
let remotePlayerSMGMesh: THREE.Mesh | null = null;


// Constants for humanoid remote player model parts
const REMOTE_PLAYER_HEAD_RADIUS = 0.25;
const REMOTE_PLAYER_TORSO_SIZE = new THREE.Vector3(0.5, 0.8, 0.3);
const REMOTE_PLAYER_LEGS_HEIGHT = PLAYER_HEIGHT - (REMOTE_PLAYER_HEAD_RADIUS * 2) - REMOTE_PLAYER_TORSO_SIZE.y;
const REMOTE_PLAYER_LEGS_SIZE = new THREE.Vector3(0.4, REMOTE_PLAYER_LEGS_HEIGHT, 0.25);


const REMOTE_HANDGUN_HIP_OFFSET = new THREE.Vector3(
    REMOTE_PLAYER_TORSO_SIZE.x / 2 + 0.05,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.3,
    REMOTE_PLAYER_TORSO_SIZE.z / 2 - 0.05
);
const REMOTE_HANDGUN_ADS_OFFSET = new THREE.Vector3(
    0, 
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.8, 
    REMOTE_PLAYER_TORSO_SIZE.z / 2 + 0.2 
);

const REMOTE_SNIPER_HIP_OFFSET = new THREE.Vector3(
    REMOTE_PLAYER_TORSO_SIZE.x / 2 + 0.08, 
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.35, 
    REMOTE_PLAYER_TORSO_SIZE.z / 2 - 0.03
);
const REMOTE_SNIPER_ADS_OFFSET = new THREE.Vector3(
    0,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.75, 
    REMOTE_PLAYER_TORSO_SIZE.z / 2 + 0.35 
);

const REMOTE_SMG_HIP_OFFSET = new THREE.Vector3(
    REMOTE_PLAYER_TORSO_SIZE.x / 2 + 0.04,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.32,
    REMOTE_PLAYER_TORSO_SIZE.z / 2 - 0.02
);
const REMOTE_SMG_ADS_OFFSET = new THREE.Vector3(
    0,
    REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y * 0.77,
    REMOTE_PLAYER_TORSO_SIZE.z / 2 + 0.25
);


let lastSentStateTime = 0;
const STATE_SEND_INTERVAL = 1000 / 20;
let isPlayerOne: boolean | null = null;

const defaultSpawnPoints: THREE.Vector3[] = [
    new THREE.Vector3(0, PLAYER_HEIGHT, 70),    // North field
    new THREE.Vector3(0, PLAYER_HEIGHT, -70),   // South field
    new THREE.Vector3(70, PLAYER_HEIGHT, 0),    // East field
    new THREE.Vector3(-70, PLAYER_HEIGHT, 0),   // West field
    new THREE.Vector3(50, PLAYER_HEIGHT, -50),  // Southeast
    new THREE.Vector3(-50, PLAYER_HEIGHT, 50),  // Northwest
    new THREE.Vector3(-50, PLAYER_HEIGHT, -50), // Southwest
    new THREE.Vector3(50, PLAYER_HEIGHT, 50),   // Northeast
    new THREE.Vector3(0, PLAYER_HEIGHT, 0),     // Center (less ideal for start)
];

const mountainSpawnPoints: THREE.Vector3[] = [
    new THREE.Vector3(0, PLAYER_HEIGHT, 70),    // North - height will be adjusted to terrain
    new THREE.Vector3(0, PLAYER_HEIGHT, -70),   // South - height will be adjusted to terrain
    new THREE.Vector3(70, PLAYER_HEIGHT, 0),    // East - height will be adjusted to terrain
    new THREE.Vector3(-70, PLAYER_HEIGHT, 0),   // West - height will be adjusted to terrain
    new THREE.Vector3(50, PLAYER_HEIGHT, -50),  // Southeast - height will be adjusted to terrain
    new THREE.Vector3(-50, PLAYER_HEIGHT, 50),  // Northwest - height will be adjusted to terrain
    new THREE.Vector3(-50, PLAYER_HEIGHT, -50), // Southwest - height will be adjusted to terrain
    new THREE.Vector3(50, PLAYER_HEIGHT, 50),   // Northeast - height will be adjusted to terrain
    new THREE.Vector3(0, PLAYER_HEIGHT, 0),     // Center - height will be adjusted to terrain
];

function getSpawnPointsForCurrentMap(): THREE.Vector3[] {
    if (currentMapType === MapType.MOUNTAIN) {
        return mountainSpawnPoints;
    }
    return defaultSpawnPoints;
}

// Function to detect terrain height at given X,Z coordinates
function getTerrainHeightAt(x: number, z: number): number {
    if (currentMapType !== MapType.MOUNTAIN || terrainMeshes.length === 0) {
        return PLAYER_HEIGHT; // Default height for non-mountain maps
    }
    
    // Create a raycaster pointing downward from high above
    const raycaster = new THREE.Raycaster();
    const rayOrigin = new THREE.Vector3(x, 1000, z); // Start from high above
    const rayDirection = new THREE.Vector3(0, -1, 0); // Point downward
    
    raycaster.set(rayOrigin, rayDirection);
    
    // Collect all meshes from terrain for intersection testing
    const terrainMeshesToTest: THREE.Mesh[] = [];
    terrainMeshes.forEach(terrain => {
        terrain.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                terrainMeshesToTest.push(child);
            }
        });
    });
    
    // Find intersections with terrain
    const intersections = raycaster.intersectObjects(terrainMeshesToTest);
    
    if (intersections.length > 0) {
        // Return the height of the highest intersection point + player height
        const highestPoint = intersections[0].point.y;
        const adjustedHeight = highestPoint + PLAYER_HEIGHT;
        return adjustedHeight;
    }
    
    // Fallback to default height if no intersection found
    return PLAYER_HEIGHT + 10; // Slightly elevated fallback
}

// Function to adjust spawn point to terrain height
function adjustSpawnPointToTerrain(spawnPoint: THREE.Vector3): THREE.Vector3 {
    if (currentMapType === MapType.MOUNTAIN) {
        const terrainHeight = getTerrainHeightAt(spawnPoint.x, spawnPoint.z);
        return new THREE.Vector3(spawnPoint.x, terrainHeight, spawnPoint.z);
    }
    return spawnPoint.clone();
}
const mapFeatures: THREE.Mesh[] = [];
const terrainMeshes: THREE.Object3D[] = []; // Store terrain meshes separately from collision objects
let cachedTerrainMeshes: THREE.Mesh[] = []; // Cache terrain meshes for performance
const arenaMapFeatureMaterial = new THREE.MeshStandardMaterial({ color: 0x607D8B, roughness: 0.8, metalness: 0.2 });
const urbanBuildingMaterial = new THREE.MeshStandardMaterial({ color: 0x78909C, roughness: 0.7, metalness: 0.1 }); 
const urbanObstacleMaterial = new THREE.MeshStandardMaterial({ color: 0x546E7A, roughness: 0.8, metalness: 0.1 }); 
const forestTreeTrunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9, metalness: 0.1 });
const forestFoliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8, metalness: 0.0 });
const forestRockMaterial = new THREE.MeshStandardMaterial({ color: 0x696969, roughness: 0.9, metalness: 0.2 });
const plainsRockMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.8, metalness: 0.1 }); // Sandy brown
const plainsGrassMaterial = new THREE.MeshStandardMaterial({ color: 0x9ACD32, roughness: 0.9, metalness: 0.0 }); // Yellow green
const plainsTreeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8, metalness: 0.1 }); // Saddle brown


let groundMesh: THREE.Mesh;
const ARENA_GROUND_COLOR = 0x283747;
const URBAN_GROUND_COLOR = 0x424242; 
const FOREST_GROUND_COLOR = 0x556B2F;
const PLAINS_GROUND_COLOR = 0x6B8E23; // Olive drab for grasslands
const MOUNTAIN_GROUND_COLOR = 0x5D4E37; // Brown for rocky terrain

enum MapType {
    ARENA,
    URBAN,
    FOREST,
    PLAINS,
    MOUNTAIN
}
let currentMapType: MapType | undefined = undefined;
let selectedMapType: MapType | 'random' = 'random';


const PLAYER_MAX_HEALTH = 3;
const KILLS_TO_WIN = 3;
let playerHealth = PLAYER_MAX_HEALTH;
let myScore = 0;
let opponentScore = 0;
let isGameOver = false;


interface PlayerState {
  position: { x: number; y: number; z: number };
  quaternion: { x: number; y: number; z: number; w: number };
  aiming: boolean;
  weaponType: 'handgun' | 'sniper' | 'smg';
}

interface GameEventShootData {
    muzzlePosition: { x: number; y: number; z: number };
    direction: { x: number; y: number; z: number };
    weaponType: 'handgun' | 'sniper' | 'smg';
}

interface GameEventHitOpponentData {
    damageDealt: number;
}

interface GameEventGameOverData {
    winnerIsPlayerOne: boolean | null;
}

interface GameEventMapSeedData {
    seed: number;
    mapType: MapType;
}

interface GameEvent {
  type: 'shoot' | 'hit_opponent' | 'i_was_defeated' | 'game_over_notif' | 'map_seed';
  data?: GameEventShootData | GameEventHitOpponentData | GameEventGameOverData | GameEventMapSeedData | any;
}

/**
 * Determines the map type based on a seed and user selection.
 * Uses a temporary PRNG for 'random' choice to avoid affecting the main game PRNG.
 */
function determineMapType(seedForChoice: number, selection: MapType | 'random'): MapType {
    if (selection === 'random') {
        const tempPrng = new PRNG(seedForChoice); // Use the provided seed for a temporary PRNG
        const randVal = tempPrng.next();
        if (randVal < 0.20) return MapType.ARENA;
        if (randVal < 0.40) return MapType.URBAN;
        if (randVal < 0.60) return MapType.FOREST;
        if (randVal < 0.80) return MapType.PLAINS;
        return MapType.MOUNTAIN;
    }
    return selection as MapType;
}


/**
 * Selects a random spawn point from a list, with optional conditions.
 * Uses the global 'prng' for randomness.
 */
function isSpawnPointSafe(position: THREE.Vector3): boolean {
    // Create a collision box around the spawn position
    const spawnCollider = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(position.x, position.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, position.z),
        new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT - PLAYER_RADIUS * 2, PLAYER_RADIUS * 2)
    );
    
    // Check collision with all map features
    for (const feature of mapFeatures) {
        const featureBoundingBox = new THREE.Box3().setFromObject(feature);
        if (spawnCollider.intersectsBox(featureBoundingBox)) {
            return false; // Collision detected
        }
    }
    
    return true; // Safe position
}

function selectRandomSpawnPoint(
    points: THREE.Vector3[],
    referencePosition?: THREE.Vector3,
    minDistance?: number,
    pointToExclude?: THREE.Vector3
): THREE.Vector3 {
    if (!prng) { // Should not happen if game logic is correct, but as a safeguard
        console.warn("selectRandomSpawnPoint called before PRNG initialized. Using temporary PRNG.");
        const tempPrng = new PRNG(Date.now());
        return points[tempPrng.nextInt(0, points.length - 1)]?.clone() || new THREE.Vector3(0, PLAYER_HEIGHT, 0);
    }
    if (points.length === 0) {
        return new THREE.Vector3(0, PLAYER_HEIGHT, 0); 
    }

    let candidatePoints = points;
    if (pointToExclude) {
        candidatePoints = points.filter(p => !(p.x === pointToExclude.x && p.y === pointToExclude.y && p.z === pointToExclude.z));
    }

    if (candidatePoints.length === 0 && points.length > 0) {
        candidatePoints = points;
    }
    if (candidatePoints.length === 0) {
        return new THREE.Vector3(0, PLAYER_HEIGHT, 0);
    }
    
    let filteredByDistance: THREE.Vector3[] = [];
    if (referencePosition && typeof minDistance === 'number' && minDistance > 0) {
        filteredByDistance = candidatePoints.filter(p => {
            const dx = p.x - referencePosition.x;
            const dz = p.z - referencePosition.z;
            return Math.sqrt(dx * dx + dz * dz) >= minDistance;
        });
    }

    // Filter points by safety (no collision with map objects)
    let safePoints: THREE.Vector3[] = [];
    const pointsToCheck = filteredByDistance.length > 0 ? filteredByDistance : candidatePoints;
    
    for (const point of pointsToCheck) {
        if (isSpawnPointSafe(point)) {
            safePoints.push(point);
        }
    }
    
    // If no safe points found in filtered points, check all candidate points
    if (safePoints.length === 0 && filteredByDistance.length > 0) {
        for (const point of candidatePoints) {
            if (isSpawnPointSafe(point)) {
                safePoints.push(point);
            }
        }
    }
    
    // If still no safe points, check all original points
    if (safePoints.length === 0) {
        for (const point of points) {
            if (isSpawnPointSafe(point)) {
                safePoints.push(point);
            }
        }
    }
    
    // Return a safe point if available, otherwise fallback to center with warning
    if (safePoints.length > 0) {
        const selectedPoint = safePoints[prng.nextInt(0, safePoints.length - 1)].clone();
        return adjustSpawnPointToTerrain(selectedPoint);
    } else {
        console.warn('No safe spawn points found! Using fallback position.');
        const fallbackPoint = new THREE.Vector3(0, PLAYER_HEIGHT + 5, 0);
        return adjustSpawnPointToTerrain(fallbackPoint);
    }
}


function showTemporaryMessage(message: string, duration: number = 2000) {
    if (isGameOver || !instructionOverlay || !instructionText) return;

    const originalInstructionText = instructionText.textContent;
    const originalP2PTextDisplay = p2pInstructionText ? p2pInstructionText.style.display : 'none';

    instructionOverlay.style.display = 'flex';
    instructionText.textContent = message;
    if (p2pInstructionText) p2pInstructionText.style.display = 'none';

    setTimeout(() => {
        if (isGameOver) return;

        if (instructionText.textContent === message) {
            if (controls.isLocked) {
                instructionOverlay.style.display = 'none';
            } else {
                if (gameMode === 'multiplayer' && (!dataChannel || dataChannel.readyState !== 'open')) {
                    instructionText.textContent = "Connect via P2P, then Click to Start";
                    if (p2pInstructionText) p2pInstructionText.style.display = originalP2PTextDisplay;
                } else if (gameMode === 'singleplayer') {
                    instructionText.textContent = "Click to Start Single Player";
                } else {
                     instructionText.textContent = "Click to Start";
                }
            }
        }
    }, duration);
}

// WebSocket Signaling Functions
function connectToSignalingServer(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signalingSocket && signalingSocket.readyState === WebSocket.OPEN) {
            resolve();
            return;
        }

        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${wsProtocol}//${window.location.host}/ws`;
        
        signalingSocket = new WebSocket(wsUrl);
        
        signalingSocket.onopen = () => {
            console.log('Connected to signaling server');
            if (p2pStatusText) p2pStatusText.textContent = 'Status: Connected to server';
            resolve();
        };
        
        signalingSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                handleSignalingMessage(message);
            } catch (error) {
                console.error('Error parsing signaling message:', error);
            }
        };
        
        signalingSocket.onclose = () => {
            console.log('Disconnected from signaling server');
            if (p2pStatusText) p2pStatusText.textContent = 'Status: Disconnected';
            signalingSocket = null;
            clientId = null;
        };
        
        signalingSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            reject(error);
        };
        
        // Timeout after 10 seconds
        setTimeout(() => {
            if (signalingSocket && signalingSocket.readyState !== WebSocket.OPEN) {
                reject(new Error('Connection timeout'));
            }
        }, 10000);
    });
}

function handleSignalingMessage(message: any) {
    console.log('Received signaling message:', message);
    
    switch (message.msg_type) {
        case 'welcome':
            clientId = message.data.client_id;
            console.log('Assigned client ID:', clientId);
            break;
            
        case 'user-joined':
            console.log('User joined room:', message.data);
            if (isWaitingForOpponent && message.sender !== clientId) {
                // Store the opponent's client ID for targeting messages
                const opponentId = message.sender;
                startAutomaticPeerConnection(true, opponentId); // We become the offer creator
            }
            break;
            
        case 'offer':
            if (message.sender !== clientId) {
                handleRemoteOffer(message.data, message.sender);
            }
            break;
            
        case 'answer':
            if (message.sender !== clientId) {
                handleRemoteAnswer(message.data);
            }
            break;
            
        case 'ice-candidate':
            if (message.sender !== clientId) {
                handleRemoteIceCandidate(message.data);
            }
            break;
    }
}

function joinRoom(roomId: string) {
    if (!signalingSocket || signalingSocket.readyState !== WebSocket.OPEN) {
        console.error('Not connected to signaling server');
        return;
    }
    
    currentRoom = roomId;
    isWaitingForOpponent = true;
    
    const joinMessage = {
        msg_type: 'join-room',
        data: { room_id: roomId },
        target: null,
        sender: clientId
    };
    
    signalingSocket.send(JSON.stringify(joinMessage));
    console.log('Joined room:', roomId);
    
    if (p2pStatusText) p2pStatusText.textContent = `Status: Waiting for opponent in room ${roomId}`;
    
    // Set timeout for matchmaking
    if (matchmakingTimeout) clearTimeout(matchmakingTimeout);
    matchmakingTimeout = window.setTimeout(() => {
        if (isWaitingForOpponent) {
            console.log('Matchmaking timeout, starting game with default settings');
            if (p2pStatusText) p2pStatusText.textContent = 'Status: Timeout, starting solo';
            // Fall back to single player or try another room
        }
    }, 30000); // 30 second timeout
}

// Add opponent tracking variable
let opponentClientId: string | null = null;

async function startAutomaticPeerConnection(shouldCreateOffer: boolean, targetOpponentId?: string) {
    try {
        if (targetOpponentId) {
            opponentClientId = targetOpponentId;
        }
        
        await initPeerConnection();
        
        if (shouldCreateOffer) {
            isPlayerOne = true;
            await createAutomaticOffer();
        } else {
            isPlayerOne = false;
        }
        
        isWaitingForOpponent = false;
        if (matchmakingTimeout) {
            clearTimeout(matchmakingTimeout);
            matchmakingTimeout = null;
        }
        
    } catch (error) {
        console.error('Error in automatic peer connection:', error);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Connection failed';
    }
}

async function createAutomaticOffer() {
    if (!peerConnection) {
        console.error('Peer connection not initialized');
        return;
    }
    
    try {
        // Create data channel for game communication
        console.log("Creating data channel 'gameData'.");
        dataChannel = peerConnection.createDataChannel("gameData");
        setupDataChannelEvents();
        
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        // Send offer through signaling server
        if (signalingSocket && currentRoom) {
            const offerMessage = {
                msg_type: 'offer',
                data: offer,
                target: opponentClientId, // Target specific opponent
                sender: clientId
            };
            signalingSocket.send(JSON.stringify(offerMessage));
            console.log('Sent automatic offer to', opponentClientId);
        }
        
    } catch (error) {
        console.error('Error creating automatic offer:', error);
    }
}

async function handleRemoteOffer(offer: RTCSessionDescriptionInit, senderId: string) {
    if (!peerConnection) {
        opponentClientId = senderId; // Store opponent ID
        await initPeerConnection();
        isPlayerOne = false;
    }
    
    try {
        await peerConnection!.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection!.createAnswer();
        await peerConnection!.setLocalDescription(answer);
        
        // Send answer through signaling server
        if (signalingSocket) {
            const answerMessage = {
                msg_type: 'answer',
                data: answer,
                target: senderId,
                sender: clientId
            };
            signalingSocket.send(JSON.stringify(answerMessage));
            console.log('Sent automatic answer to', senderId);
        }
        
    } catch (error) {
        console.error('Error handling remote offer:', error);
    }
}

async function handleRemoteAnswer(answer: RTCSessionDescriptionInit) {
    if (!peerConnection) {
        console.error('Peer connection not found when handling answer');
        return;
    }
    
    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log('Set remote answer successfully');
    } catch (error) {
        console.error('Error handling remote answer:', error);
    }
}

async function handleRemoteIceCandidate(candidateData: any) {
    if (!peerConnection) {
        console.error('Peer connection not found when handling ICE candidate');
        return;
    }
    
    try {
        const candidate = new RTCIceCandidate(candidateData);
        await peerConnection.addIceCandidate(candidate);
        console.log('Added remote ICE candidate');
    } catch (error) {
        console.error('Error adding remote ICE candidate:', error);
    }
}

function initializeApp() {
  if (!mainMenuDiv || !instructionOverlay || !gameContainer || !startSinglePlayerButton || !startMultiplayerButton || !signalingPanel || !localSdpTextarea || !remoteSdpTextarea || !localIceTextarea || !remoteIceTextarea || !p2pStatusText || !scopeOverlay || !copyLocalSdpBtn || !copyLocalIceBtn) {
    console.error("Required UI elements not found!");
    return;
  }
  isPlayerOne = null;

  startSinglePlayerButton.addEventListener('click', () => {
    gameMode = 'singleplayer';
    if (signalingPanel) signalingPanel.style.display = 'none';
    if (p2pInstructionText) p2pInstructionText.style.display = 'none';
    startGame();
  });

  startMultiplayerButton.addEventListener('click', async () => {
    gameMode = 'multiplayer';
    
    try {
      if (p2pStatusText) p2pStatusText.textContent = 'Status: Connecting to server...';
      
      await connectToSignalingServer();
      
      // Generate a room ID based on map selection and timestamp
      const roomPrefix = selectedMapType === 'random' ? 'any' : selectedMapType.toString();
      const roomId = `${roomPrefix}_${Math.floor(Date.now() / 60000)}`; // Changes every 60 seconds
      
      joinRoom(roomId);
      
      // Hide manual P2P panel and show automatic status
      if (signalingPanel) signalingPanel.style.display = 'none';
      if (p2pInstructionText) p2pInstructionText.style.display = 'none';
      
      startGame();
      
    } catch (error) {
      console.error('Failed to connect to signaling server:', error);
      if (p2pStatusText) p2pStatusText.textContent = 'Status: Connection failed, using manual mode';
      
      // Fall back to manual P2P mode
      if (signalingPanel) signalingPanel.style.display = 'block';
      if (p2pInstructionText) p2pInstructionText.style.display = 'block';
      startGame();
    }
  });

  createOfferBtn.addEventListener('click', createOffer);
  createAnswerBtn.addEventListener('click', createAnswer);
  setRemoteSdpBtn.addEventListener('click', setRemoteDescription);
  addRemoteIceBtn.addEventListener('click', addRemoteIceCandidate);
  closeSignalingBtn.addEventListener('click', () => {
    if (dataChannel && dataChannel.readyState === 'open') {
      signalingPanel.style.display = 'none';
    } else {
      alert("Connect to a peer first!");
    }
  });

  copyLocalSdpBtn.addEventListener('click', async () => {
    if (localSdpTextarea && localSdpTextarea.value) {
        try {
            await navigator.clipboard.writeText(localSdpTextarea.value);
            const originalText = copyLocalSdpBtn.textContent;
            copyLocalSdpBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyLocalSdpBtn.textContent = originalText;
            }, 1500);
        } catch (err) {
            console.error('Failed to copy local SDP: ', err);
            alert('Failed to copy local SDP. See console for details.');
        }
    }
  });

  copyLocalIceBtn.addEventListener('click', async () => {
      if (localIceTextarea && localIceTextarea.value) {
          try {
              await navigator.clipboard.writeText(localIceTextarea.value);
              const originalText = copyLocalIceBtn.textContent;
              copyLocalIceBtn.textContent = 'Copied!';
              setTimeout(() => {
                  copyLocalIceBtn.textContent = originalText;
              }, 1500);
          } catch (err) {
              console.error('Failed to copy local ICE candidates: ', err);
              alert('Failed to copy local ICE candidates. See console for details.');
          }
      }
  });

  const mapArenaButton = document.getElementById('map-arena-btn') as HTMLButtonElement;
  const mapUrbanButton = document.getElementById('map-urban-btn') as HTMLButtonElement;
  const mapForestButton = document.getElementById('map-forest-btn') as HTMLButtonElement;
  const mapPlainsButton = document.getElementById('map-plains-btn') as HTMLButtonElement;
  const mapMountainButton = document.getElementById('map-mountain-btn') as HTMLButtonElement;
  const mapRandomButton = document.getElementById('map-random-btn') as HTMLButtonElement;
  const mapSelectionButtons = [mapArenaButton, mapUrbanButton, mapForestButton, mapPlainsButton, mapMountainButton, mapRandomButton];

  if (!mapArenaButton || !mapUrbanButton || !mapForestButton || !mapPlainsButton || !mapMountainButton || !mapRandomButton) {
      console.error("Map selection buttons not found!");
  } else {
      function updateSelectedMapButton(selectedBtn: HTMLButtonElement) {
          mapSelectionButtons.forEach(btn => {
              if (btn) btn.classList.remove('selected-map');
          });
          if (selectedBtn) selectedBtn.classList.add('selected-map');
      }

      mapArenaButton.addEventListener('click', () => {
          selectedMapType = MapType.ARENA;
          updateSelectedMapButton(mapArenaButton);
      });
      mapUrbanButton.addEventListener('click', () => {
          selectedMapType = MapType.URBAN;
          updateSelectedMapButton(mapUrbanButton);
      });
      mapForestButton.addEventListener('click', () => {
          selectedMapType = MapType.FOREST;
          updateSelectedMapButton(mapForestButton);
      });
      mapPlainsButton.addEventListener('click', () => {
          selectedMapType = MapType.PLAINS;
          updateSelectedMapButton(mapPlainsButton);
      });
      mapMountainButton.addEventListener('click', () => {
          selectedMapType = MapType.MOUNTAIN;
          updateSelectedMapButton(mapMountainButton);
      });
      mapRandomButton.addEventListener('click', () => {
          selectedMapType = 'random';
          updateSelectedMapButton(mapRandomButton);
      });
      // Set default selected button visual state
      updateSelectedMapButton(mapRandomButton);
  }
}

function startGame() {
  if (!mainMenuDiv || !instructionOverlay || !gameContainer || !instructionText) return;
  mainMenuDiv.style.display = 'none';
  gameContainer.style.display = 'block';
  isGameOver = false; 

  if (gameMode === 'singleplayer') {
    instructionText.textContent = "Click to Start Single Player";
    currentMapSeed = Date.now(); 
    currentMapType = determineMapType(currentMapSeed, selectedMapType);
    prng = new PRNG(currentMapSeed); 
    console.log(`SP Start: Seed=${currentMapSeed}, Type=${currentMapType}, Selected=${selectedMapType}`);
  } else if (gameMode === 'multiplayer') {
    instructionText.textContent = "Connect via P2P, then Click to Start";
    if (p2pInstructionText) p2pInstructionText.style.display = 'block';
    if (signalingPanel && (!dataChannel || dataChannel.readyState !== 'open')) {
        signalingPanel.style.display = 'block';
    }
    // For multiplayer, map seed and type are set via P2P. PRNG is initialized then.
  }
  instructionOverlay.style.display = 'flex';

  if (!isGameInitialized) {
    initThreeJSGame(); 
  }
  
  // For single player, resetGameScene (which generates map) is called here.
  // For multiplayer, resetGameScene is triggered by P2P map seed exchange.
  if (gameMode === 'singleplayer') {
     resetGameScene(); 
  }
}

function resetP2PState() {
    console.log("Attempting to reset P2P state...");
    if (dataChannel) {
        console.log("Closing data channel");
        dataChannel.close();
        dataChannel = null;
    }
    if (peerConnection) {
        console.log("Closing peer connection");
        peerConnection.close();
        peerConnection = null;
    }
    if (localSdpTextarea) localSdpTextarea.value = '';
    if (remoteSdpTextarea) remoteSdpTextarea.value = '';
    if (localIceTextarea) localIceTextarea.value = '';
    if (remoteIceTextarea) remoteIceTextarea.value = '';
    isPlayerOne = null;
    currentMapSeed = null; 
    prng = null; 
    currentMapType = undefined; 
    if (p2pStatusText) p2pStatusText.textContent = 'Status: Disconnected';
    if (gameMode === 'multiplayer' && signalingPanel) {
        if (!dataChannel || dataChannel.readyState !== 'open') {
             signalingPanel.style.display = 'block';
        }
    }
    console.log("P2P State Reset Complete");
}

function resetGameScene() {
    playerHealth = PLAYER_MAX_HEALTH;
    myScore = 0;
    opponentScore = 0;
    isGameOver = false;
    lastFireTime = 0;
    isFiringSMGActual = false;


    if (gameMode === 'singleplayer') {
        if (!prng || currentMapSeed === null || currentMapSeed === undefined) {
            console.warn("SP resetGameScene: PRNG or MapSeed missing. This should have been set by startGame. Re-initializing as a fallback.");
            currentMapSeed = currentMapSeed ?? Date.now(); 
            currentMapType = determineMapType(currentMapSeed, selectedMapType); 
            prng = new PRNG(currentMapSeed); 
        } else if (currentMapType === undefined || currentMapType === null) { 
             console.warn("SP resetGameScene: currentMapType missing, but PRNG/seed exists. Re-determining map type.");
             currentMapType = determineMapType(currentMapSeed!, selectedMapType); 
        }
    } else if (gameMode === 'multiplayer') {
        if (!prng || currentMapSeed === null || currentMapSeed === undefined) {
            console.error("MP resetGameScene: PRNG or map seed is NOT INITIALIZED. Map generation may fail or desync.");
        }
        if (currentMapType === undefined || currentMapType === null) {
             console.error("MP resetGameScene: currentMapType is NOT SET. Map features might not generate as expected or desync.");
        }
    }

    if (!prng) {
        console.warn("resetGameScene Fallback: PRNG still not initialized. Using random seed and Arena map as last resort.");
        currentMapSeed = Date.now();
        currentMapType = determineMapType(currentMapSeed, 'random'); 
        prng = new PRNG(currentMapSeed);
    }
    console.log(`Resetting scene with: Mode=${gameMode}, Seed=${currentMapSeed}, Type=${currentMapType}, PRNG Valid: ${!!prng}`);
    if (prng) console.log(`PRNG Next (consumed for log): ${prng.next()}`);


    if (groundMesh && groundMesh.material instanceof THREE.MeshStandardMaterial) {
        let groundColor = ARENA_GROUND_COLOR;
        if (currentMapType === MapType.URBAN) groundColor = URBAN_GROUND_COLOR;
        else if (currentMapType === MapType.FOREST) groundColor = FOREST_GROUND_COLOR;
        else if (currentMapType === MapType.PLAINS) groundColor = PLAINS_GROUND_COLOR;
        else if (currentMapType === MapType.MOUNTAIN) groundColor = MOUNTAIN_GROUND_COLOR;
        groundMesh.material.color.setHex(groundColor);
    }

    if (scene && scene.fog instanceof THREE.Fog) {
        if (currentMapType === MapType.URBAN) {
            scene.fog.color.setHex(0xA0A0A0); 
            scene.fog.near = 0;
            scene.fog.far = 180; 
        } else if (currentMapType === MapType.FOREST) {
            scene.fog.color.setHex(0x2F4F2F); 
            scene.fog.near = 0;
            scene.fog.far = 120; 
        } else if (currentMapType === MapType.PLAINS) {
            scene.fog.color.setHex(0x87CEEB); // Light sky blue
            scene.fog.near = 0;
            scene.fog.far = 800; // Very far for long-range sniping
        } else if (currentMapType === MapType.MOUNTAIN) {
            scene.fog.color.setHex(0x6B8E60); // Mountain mist color
            scene.fog.near = 0;
            scene.fog.far = 400; // Medium distance for mountain terrain
        } else { 
            scene.fog.color.setHex(0x87ceeb); 
            scene.fog.near = 0;
            scene.fog.far = 250;
        }
    }
     if (scene) {
        let bgColor = 0x87ceeb; 
        if (currentMapType === MapType.URBAN) bgColor = 0x607D8B; 
        else if (currentMapType === MapType.FOREST) bgColor = 0x3A5F0B;
        else if (currentMapType === MapType.MOUNTAIN) bgColor = 0x4682B4; // Steel blue for mountain sky 
        scene.background = new THREE.Color(bgColor);
    }

    targetMeshes.forEach(target => {
        scene.remove(target);
        if (target.geometry) target.geometry.dispose();
        if (Array.isArray(target.material)) {
            target.material.forEach(m => m.dispose());
        } else if (target.material) {
            (target.material as THREE.Material).dispose();
        }
    });
    targetMeshes.clear();
    targetBoundingBoxCache.clear();

    projectiles.forEach(p => {
        scene.remove(p.mesh);
        if (p.mesh.geometry) p.mesh.geometry.dispose();
    });
    projectiles.length = 0;

    remoteProjectiles.forEach(p => {
        scene.remove(p.mesh);
        if (p.mesh.geometry) p.mesh.geometry.dispose();
    });
    remoteProjectiles.length = 0;

    pendingInputs.length = 0;

    mapFeatures.forEach(feature => {
        if (feature.parent === scene) scene.remove(feature);
        else if (feature.parent) feature.parent.remove(feature); 
        if (feature.geometry) feature.geometry.dispose();
         if (feature.name.startsWith("forest_bush_") && feature.material && !Array.isArray(feature.material)) {
            (feature.material as THREE.Material).dispose(); 
        }
    });
    mapFeatures.length = 0;
    
    // Clean up terrain meshes
    terrainMeshes.forEach(terrain => {
        if (terrain.parent === scene) scene.remove(terrain);
        terrain.traverse((child: any) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => mat.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    });
    terrainMeshes.length = 0;
    cachedTerrainMeshes.length = 0;
    generateMapFeatures(); 

    moveForwardActual = false; moveBackwardActual = false; moveLeftActual = false; moveRightActual = false;
    isAimingWithKeyActual = false; isAimingWithMouseActual = false;

    createTargets(); 

    if (controls) {
      const playerObject = controls.getObject();
      let localPlayerSpawnPoint: THREE.Vector3;

      if (gameMode === 'multiplayer') {
          const currentSpawnPoints = getSpawnPointsForCurrentMap();
          if (isPlayerOne === true && currentSpawnPoints.length > 0) {
              localPlayerSpawnPoint = adjustSpawnPointToTerrain(currentSpawnPoints[0]);
          } else if (isPlayerOne === false && currentSpawnPoints.length > 1) {
              localPlayerSpawnPoint = adjustSpawnPointToTerrain(currentSpawnPoints[1]);
          } else { 
              localPlayerSpawnPoint = selectRandomSpawnPoint(currentSpawnPoints); 
          }
      } else { 
          const currentSpawnPoints = getSpawnPointsForCurrentMap();
          localPlayerSpawnPoint = selectRandomSpawnPoint(currentSpawnPoints); 
      }
      playerObject.position.copy(localPlayerSpawnPoint);
      if (pitchObject) pitchObject.rotation.x = 0;
      playerObject.rotation.y = 0;
    }
    
    equipWeapon('handgun'); 
    isWeaponRecoiling = false; weaponRecoilTime = 0; activeWeaponRecoilOffset.set(0,0,0); cameraPitchRecoil = 0;
    camera.fov = NORMAL_FOV; camera.updateProjectionMatrix();
    if (scopeOverlay) scopeOverlay.style.display = 'none';


    const oldOpponent = scene.getObjectByName("remotePlayer_1");
    if (oldOpponent) {
        scene.remove(oldOpponent); 
        oldOpponent.traverse(child => {
            if (child instanceof THREE.Mesh) {
                if (child.geometry) child.geometry.dispose();
            }
        });
    }
    remotePlayerMesh = null;
    remotePlayerHandgunMesh = null;
    remotePlayerSniperMesh = null;
    remotePlayerSMGMesh = null;

    let shouldResetP2P = true; 
    if (peerConnection && gameMode === 'multiplayer') {
        const pc = peerConnection;
        if (pc.connectionState === 'connecting' || pc.connectionState === 'connected' ||
            pc.iceConnectionState === 'checking' || pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed' ||
            pc.iceGatheringState === 'gathering' ||
            pc.signalingState === 'have-local-offer' || pc.signalingState === 'have-remote-offer' ||
            (pc.signalingState === 'stable' && (pc.connectionState !== 'closed' && pc.connectionState !== 'failed' && pc.connectionState !== 'disconnected'))
            ) {
            shouldResetP2P = false;
        }
    } else if (gameMode !== 'multiplayer' && !peerConnection) {
        shouldResetP2P = false;
    }


    if (gameMode === 'multiplayer') {
        setupMultiplayerSceneElements(); 
        if (shouldResetP2P && (!dataChannel || dataChannel.readyState !== 'open')) resetP2PState();
    } else {
         if (shouldResetP2P) resetP2PState();
    }
    prevTime = performance.now();
}

function createHandgunModel(): {model: THREE.Group, muzzlePoint: THREE.Object3D} {
    const handgunGrp = new THREE.Group();
    const handgunMaterial = new THREE.MeshStandardMaterial({ color: 0x3c3c3c, metalness: 0.7, roughness: 0.35 });
    const bodyGeometry = new THREE.BoxGeometry(0.07, 0.1, 0.22);
    const bodyMesh = new THREE.Mesh(bodyGeometry, handgunMaterial); bodyMesh.castShadow = true; handgunGrp.add(bodyMesh);
    const handleGeometry = new THREE.BoxGeometry(0.06, 0.13, 0.06);
    const handleMesh = new THREE.Mesh(handleGeometry, handgunMaterial); handleMesh.position.set(0, -0.08, 0.03); handleMesh.rotation.x = -0.2; handleMesh.castShadow = true; bodyMesh.add(handleMesh);
    const barrelHeight = 0.13; const barrelRadius = 0.025;
    const barrelGeometry = new THREE.CylinderGeometry(barrelRadius, barrelRadius, barrelHeight, 16);
    const barrelMesh = new THREE.Mesh(barrelGeometry, handgunMaterial); barrelMesh.position.set(0, 0.02, -(bodyGeometry.parameters.depth / 2 - barrelHeight / 2 + 0.005)); barrelMesh.rotation.x = Math.PI / 2; barrelMesh.castShadow = true; bodyMesh.add(barrelMesh);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, barrelHeight / 2, 0); barrelMesh.add(muzzle);
    const frontSightHeight = 0.018; const frontSightGeometry = new THREE.BoxGeometry(0.01, frontSightHeight, 0.01);
    const frontSightMesh = new THREE.Mesh(frontSightGeometry, handgunMaterial); frontSightMesh.position.set(0, barrelRadius + frontSightHeight / 2, -(barrelHeight / 2 - 0.02) ); barrelMesh.add(frontSightMesh);
    const rearSightPostGeometry = new THREE.BoxGeometry(0.007, 0.015, 0.01);
    const rearSightLeftPost = new THREE.Mesh(rearSightPostGeometry, handgunMaterial); rearSightLeftPost.position.set(-0.015 / 2 - 0.007 / 2, bodyGeometry.parameters.height / 2 + 0.015 / 2, bodyGeometry.parameters.depth / 2 - 0.01 / 2 - 0.01); bodyMesh.add(rearSightLeftPost);
    const rearSightRightPost = new THREE.Mesh(rearSightPostGeometry, handgunMaterial); rearSightRightPost.position.set(0.015 / 2 + 0.007 / 2, bodyGeometry.parameters.height / 2 + 0.015 / 2, bodyGeometry.parameters.depth / 2 - 0.01 / 2 - 0.01); bodyMesh.add(rearSightRightPost);
    return {model: handgunGrp, muzzlePoint: muzzle};
}

function createSniperRifleModel(): {model: THREE.Group, muzzlePoint: THREE.Object3D} {
    const sniperGrp = new THREE.Group();
    const sniperMaterial = new THREE.MeshStandardMaterial({ color: 0x282828, metalness: 0.6, roughness: 0.4 });

    const bodyGeom = new THREE.BoxGeometry(0.08, 0.1, 0.7);
    const bodyMesh = new THREE.Mesh(bodyGeom, sniperMaterial);
    bodyMesh.position.y = 0.03;
    bodyMesh.castShadow = true;
    sniperGrp.add(bodyMesh);

    const barrelLength = 0.6;
    const barrelRadius = 0.02;
    const barrelGeom = new THREE.CylinderGeometry(barrelRadius, barrelRadius, barrelLength, 12);
    const barrelMesh = new THREE.Mesh(barrelGeom, sniperMaterial);
    barrelMesh.rotation.x = Math.PI / 2;
    barrelMesh.position.set(0, 0.01, -(bodyGeom.parameters.depth / 2 + barrelLength / 2 - 0.05));
    barrelMesh.castShadow = true;
    bodyMesh.add(barrelMesh);

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, barrelLength / 2, 0); 
    barrelMesh.add(muzzle);

    const scopeLength = 0.25;
    const scopeRadius = 0.03;
    const scopeGeom = new THREE.CylinderGeometry(scopeRadius, scopeRadius, scopeLength, 12);
    const scopeMesh = new THREE.Mesh(scopeGeom, sniperMaterial);
    scopeMesh.name = "sniperScopeMesh"; 
    scopeMesh.rotation.x = Math.PI / 2;
    scopeMesh.position.set(0, bodyGeom.parameters.height / 2 + scopeRadius -0.01, -0.1); 
    scopeMesh.castShadow = true;
    bodyMesh.add(scopeMesh);

    const stockGeom = new THREE.BoxGeometry(0.07, 0.08, 0.25);
    const stockMesh = new THREE.Mesh(stockGeom, sniperMaterial);
    stockMesh.position.set(0, -0.02, bodyGeom.parameters.depth / 2 + 0.05);
    stockMesh.rotation.x = 0.3;
    stockMesh.castShadow = true;
    bodyMesh.add(stockMesh);

    return {model: sniperGrp, muzzlePoint: muzzle};
}

function createSMGModel(): { model: THREE.Group, muzzlePoint: THREE.Object3D } {
    const smgGrp = new THREE.Group();
    const smgMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.65, roughness: 0.4 });

    // Main Body
    const bodyGeom = new THREE.BoxGeometry(0.07, 0.09, 0.35);
    const bodyMesh = new THREE.Mesh(bodyGeom, smgMaterial);
    bodyMesh.position.y = 0.01;
    bodyMesh.castShadow = true;
    smgGrp.add(bodyMesh);

    // Barrel
    const barrelLength = 0.15;
    const barrelRadius = 0.02;
    const barrelGeom = new THREE.CylinderGeometry(barrelRadius, barrelRadius * 0.9, barrelLength, 10);
    const barrelMesh = new THREE.Mesh(barrelGeom, smgMaterial);
    barrelMesh.rotation.x = Math.PI / 2;
    barrelMesh.position.set(0, 0.005, -(bodyGeom.parameters.depth / 2 + barrelLength / 2 - 0.02));
    barrelMesh.castShadow = true;
    bodyMesh.add(barrelMesh);

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, barrelLength / 2, 0);
    barrelMesh.add(muzzle);

    // Magazine
    const magGeom = new THREE.BoxGeometry(0.035, 0.12, 0.07);
    const magazineMesh = new THREE.Mesh(magGeom, smgMaterial);
    magazineMesh.position.set(0, -0.06, -0.05);
    magazineMesh.rotation.x = 0.15; // Slight forward angle
    magazineMesh.castShadow = true;
    bodyMesh.add(magazineMesh);

    // Simple stock/handle part
    const stockGeom = new THREE.BoxGeometry(0.05, 0.07, 0.1);
    const stockMesh = new THREE.Mesh(stockGeom, smgMaterial);
    stockMesh.position.set(0, -0.03, bodyGeom.parameters.depth / 2 - 0.03);
    stockMesh.castShadow = true;
    bodyMesh.add(stockMesh);
    
    // Top rail / sight base (optional visual detail)
    const railGeom = new THREE.BoxGeometry(0.02, 0.015, 0.15);
    const railMesh = new THREE.Mesh(railGeom, smgMaterial);
    railMesh.position.set(0, bodyGeom.parameters.height/2 + 0.0075, -0.05);
    bodyMesh.add(railMesh);

    return { model: smgGrp, muzzlePoint: muzzle };
}


function populateWeaponStatsDB() {
    weaponStatsDB = {
        handgun: {
            hipPosition: new THREE.Vector3(0.2, -0.20, -0.4),
            adsPosition: new THREE.Vector3(0, -0.065, -0.38),
            hipRotation: new THREE.Euler(0, -Math.PI / 45, 0),
            adsRotation: new THREE.Euler(0, 0, 0),
            adsFov: 50,
            recoilAmount: new THREE.Vector3(0.01, 0.025, 0.06), 
            recoilDuration: 0.05,
            recoilReturnSpeed: 18,
            fireRate: 250, 
            projectileSpeed: 250.0,
            projectileMaterial: handgunProjectileMaterial,
            model: handgunModel,
            muzzlePoint: handgunMuzzlePoint,
            damage: 1,
            magazineCapacity: 15,
            reloadTime: 1500,
        },
        sniper: {
            hipPosition: new THREE.Vector3(0.3, -0.22, -0.6), 
            adsPosition: new THREE.Vector3(0, -0.11, -0.4), 
            hipRotation: new THREE.Euler(0, -Math.PI / 60, 0),
            adsRotation: new THREE.Euler(0, 0, 0), 
            adsFov: 20,
            recoilAmount: new THREE.Vector3(0.005, 0.07, 0.15), 
            recoilDuration: 0.15,
            recoilReturnSpeed: 12, 
            fireRate: 1500, 
            projectileSpeed: 850.0,
            projectileMaterial: sniperProjectileMaterial,
            model: sniperRifleModel,
            muzzlePoint: sniperMuzzlePoint,
            damage: PLAYER_MAX_HEALTH,
            magazineCapacity: 5,
            reloadTime: 2500,
            zeroingDistance: 100, // Default 100m zeroing 
        },
        smg: {
            hipPosition: new THREE.Vector3(0.25, -0.18, -0.45),
            adsPosition: new THREE.Vector3(0.01, -0.075, -0.39), // Slightly offset for iron sights feel
            hipRotation: new THREE.Euler(0, -Math.PI / 50, 0),
            adsRotation: new THREE.Euler(0, 0, 0),
            adsFov: 60,
            recoilAmount: new THREE.Vector3(0.025, 0.035, 0.04), // x:sideways, y:model_vertical, z:model_backward
            recoilDuration: 0.06, // quick per shot
            recoilReturnSpeed: 16,
            fireRate: 100, // Fast
            projectileSpeed: 300.0,
            projectileMaterial: smgProjectileMaterial,
            model: smgModel,
            muzzlePoint: smgMuzzlePoint,
            damage: 1,
            spreadAngle: THREE.MathUtils.degToRad(7.0), // ~7 degree cone for hip fire
            adsSpreadMultiplier: 0.45, // 45% of hip fire spread when ADS
            magazineCapacity: 30,
            reloadTime: 2000,
        }
    };
    
    // Initialize ammo for all weapons
    currentAmmo = {
        'handgun': weaponStatsDB.handgun.magazineCapacity || 15,
        'sniper': weaponStatsDB.sniper.magazineCapacity || 5,
        'smg': weaponStatsDB.smg.magazineCapacity || 30
    };
}


function equipWeapon(weaponType: 'handgun' | 'sniper' | 'smg') {
    if (!weaponStatsDB[weaponType] || !weaponStatsDB[weaponType].model) {
        console.error(`Weapon type ${weaponType} or its model is not initialized.`);
        return;
    }
    
    if (isFiringSMGActual && currentEquippedWeapon === 'smg' && weaponType !== 'smg') {
        isFiringSMGActual = false; // Stop auto-fire if switching from SMG while firing
    }
    currentEquippedWeapon = weaponType;


    const newWeaponStats = weaponStatsDB[currentEquippedWeapon];

    handgunModel.visible = (weaponType === 'handgun');
    sniperRifleModel.visible = (weaponType === 'sniper');
    smgModel.visible = (weaponType === 'smg');
    
    const sniperScope = sniperRifleModel.getObjectByName("sniperScopeMesh");
    if (sniperScope) {
        sniperScope.visible = true; 
    }

    isAimingWithKeyActual = false;
    isAimingWithMouseActual = false;

    if (newWeaponStats.model && newWeaponStats.hipPosition && newWeaponStats.hipRotation) {
        newWeaponStats.model.position.copy(newWeaponStats.hipPosition);
        newWeaponStats.model.rotation.copy(newWeaponStats.hipRotation);
    }
    
    isWeaponRecoiling = false;
    weaponRecoilTime = 0;
    activeWeaponRecoilOffset.set(0,0,0);
    cameraPitchRecoil = 0;
    
    // Initialize ammo if not already set
    if (Object.keys(currentAmmo).length === 0) {
        currentAmmo = {
            'handgun': weaponStatsDB.handgun.magazineCapacity || 15,
            'sniper': weaponStatsDB.sniper.magazineCapacity || 5,
            'smg': weaponStatsDB.smg.magazineCapacity || 30
        };
    } 

    if (scopeOverlay) {
        scopeOverlay.style.display = 'none'; 
    }
    
    // Show/hide zeroing display based on weapon type
    const zeroingDisplay = document.getElementById('zeroing-display');
    if (zeroingDisplay) {
        if (weaponType === 'sniper') {
            zeroingDisplay.style.display = 'block';
            updateZeroingDisplay();
        } else {
            zeroingDisplay.style.display = 'none';
        }
    }
}


function updateZeroingDisplay() {
    const secondZeroElement = document.getElementById('second-zero');
    const firstZeroElement = document.getElementById('first-zero');
    
    if (secondZeroElement && firstZeroElement && currentEquippedWeapon === 'sniper') {
        const weaponStats = weaponStatsDB.sniper;
        if (weaponStats && weaponStats.projectileSpeed) {
            const firstZeroDistance = calculateFirstZeroDistance(sniperZeroingDistance, weaponStats.projectileSpeed);
            
            secondZeroElement.textContent = `${sniperZeroingDistance}m (2nd)`;
            firstZeroElement.textContent = `${Math.round(firstZeroDistance)}m (1st)`;
        }
    }
}

function updateAmmoDisplay() {
    const ammoText = document.getElementById('ammo-text');
    const reloadProgressContainer = document.getElementById('reload-progress-container');
    const reloadProgressBar = document.getElementById('reload-progress-bar');
    
    if (!ammoText || !reloadProgressContainer || !reloadProgressBar) return;
    
    if (isReloading) {
        // Hide ammo text, show progress bar
        ammoText.style.display = 'none';
        reloadProgressContainer.style.display = 'block';
        
        // Calculate reload progress
        const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
        if (currentWeaponStats && currentWeaponStats.reloadTime) {
            const elapsed = performance.now() - reloadStartTime;
            const progress = Math.min(elapsed / currentWeaponStats.reloadTime, 1.0);
            const progressPercent = Math.round(progress * 100);
            
            // Update progress bar width
            reloadProgressBar.style.setProperty('--progress', `${progressPercent}%`);
        }
    } else {
        // Show ammo text, hide progress bar
        ammoText.style.display = 'block';
        reloadProgressContainer.style.display = 'none';
        
        const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
        const currentAmmoCount = currentAmmo[currentEquippedWeapon] || 0;
        const maxAmmo = currentWeaponStats?.magazineCapacity || 0;
        
        ammoText.textContent = `${currentAmmoCount}/${maxAmmo}`;
    }
}

function calculateFirstZeroDistance(secondZeroDistance: number, velocity: number): number {
    // Calculate the first zero (close range intersection)
    // Using ballistic trajectory mathematics
    const g = GRAVITY;
    const v = velocity;
    const d2 = secondZeroDistance;
    
    // Simplified calculation for first zero distance
    // First zero is typically much closer than second zero
    const timeToSecondZero = d2 / v;
    const maxHeight = (g * timeToSecondZero * timeToSecondZero) / 8;
    const firstZeroDistance = d2 * 0.1; // Approximation: ~10% of second zero distance
    
    return Math.max(5, firstZeroDistance); // Minimum 5m for realism
}

function calculateZeroingAngle(distance: number, velocity: number): number {
    // Calculate the angle needed to hit a target at given distance (SECOND ZERO)
    // Using improved ballistics formula for second zero intersection
    const g = GRAVITY;
    const v = velocity;
    const d = distance;
    
    // Calculate launch angle for second zero intersection
    // Formula: angle = 0.5 * arcsin(g * d / v^2)
    const sinValue = (g * d) / (v * v);
    
    // Ensure sinValue is within valid range [-1, 1]
    if (sinValue > 1) {
        console.warn(`Zeroing distance ${d}m is too far for velocity ${v}m/s`);
        return Math.atan((g * d) / (v * v)); // Fallback to first zero calculation
    }
    
    // Second zero calculation (higher trajectory)
    const angle = 0.5 * Math.asin(sinValue);
    return angle;
}

function adjustZeroing(adjustment: number) {
    if (currentEquippedWeapon === 'sniper') {
        sniperZeroingDistance = Math.max(50, Math.min(300, sniperZeroingDistance + adjustment));
        
        // Update zeroing display
        updateZeroingDisplay();
        
        // Show temporary message with new zeroing distance
        showTemporaryMessage(`Zeroing: ${sniperZeroingDistance}m`);
    }
}

function startReload() {
    if (isReloading || isGameOver) return;
    
    const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
    if (!currentWeaponStats || !currentWeaponStats.magazineCapacity || !currentWeaponStats.reloadTime) return;
    
    // Check if reload is needed
    if (currentAmmo[currentEquippedWeapon] >= currentWeaponStats.magazineCapacity) return;
    
    isReloading = true;
    reloadStartTime = performance.now();
    
    // Stop SMG auto-fire during reload
    if (currentEquippedWeapon === 'smg') {
        isFiringSMGActual = false;
    }
}

function initThreeJSGame() {
  if (isGameInitialized) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); 
  scene.fog = new THREE.Fog(0x87ceeb, 0, 250); 
  camera = new THREE.PerspectiveCamera(NORMAL_FOV, window.innerWidth / window.innerHeight, 0.1, 1000);

  if (!gameContainer) { console.error("Game container not found for renderer!"); return; }
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  gameContainer.appendChild(renderer.domElement);

  controls = new PointerLockControls(camera, renderer.domElement);
  
  // Wait for next frame to ensure PointerLockControls internal structure is ready
  setTimeout(() => {
    pitchObject = camera.parent as THREE.Object3D;

    if (!(pitchObject && pitchObject instanceof THREE.Object3D && pitchObject.parent === controls.getObject())) {
      console.warn("Primary method for pitchObject (camera.parent) failed or structure unexpected. Trying fallback.");
      const yawObjectFallback = controls.getObject();
      if (yawObjectFallback && yawObjectFallback.children && yawObjectFallback.children.length > 0 && yawObjectFallback.children[0] instanceof THREE.Object3D) {
          pitchObject = yawObjectFallback.children[0] as THREE.Object3D;
          console.log("Used fallback (controls.getObject().children[0]) for pitchObject.");
      } else {
          console.error("CRITICAL: Both methods to get pitchObject failed. Camera recoil and aiming will be affected.");
          // Create a fallback pitch object as last resort
          pitchObject = new THREE.Object3D();
          pitchObject.add(camera);
          controls.getObject().add(pitchObject);
          console.log("Created fallback pitchObject and added camera to it.");
      }
    }
    
    if (pitchObject) {
      console.log("Successfully initialized pitchObject");
    }
  }, 0);


  if (instructionOverlay) {
    instructionOverlay.addEventListener('click', () => {
      if (isGameOver) return; 
      if (gameMode === 'multiplayer' && (!dataChannel || dataChannel.readyState !== 'open')) {
        alert("Please connect to a peer first using the P2P controls."); return;
      }
      controls.lock();
    });
    controls.addEventListener('lock', () => {
      if (isGameOver) return;
      instructionOverlay.style.display = 'none';
      if (gameMode === 'multiplayer' && signalingPanel) signalingPanel.style.display = 'none';
      
      // Show ammo counter when gameplay starts
      const ammoCounter = document.getElementById('ammo-counter');
      if (ammoCounter) {
        ammoCounter.style.display = 'block';
        updateAmmoDisplay();
      }
      
      prevTime = performance.now(); pendingInputs.length = 0;
      isFiringSMGActual = false; // Ensure SMG is not firing when locking controls initially
    });
    controls.addEventListener('unlock', () => {
      if (isGameOver) return;
      instructionOverlay.style.display = 'flex';
      
      // Hide ammo counter when returning to menu
      const ammoCounter = document.getElementById('ammo-counter');
      if (ammoCounter) {
        ammoCounter.style.display = 'none';
      }
      if (gameMode === 'multiplayer' && signalingPanel && (!dataChannel || dataChannel.readyState !== 'open')) {
           signalingPanel.style.display = 'block';
      }
      moveForwardActual = false; moveBackwardActual = false; moveLeftActual = false; moveRightActual = false;
      isAimingWithKeyActual = false; isAimingWithMouseActual = false;
      isFiringSMGActual = false; // Stop firing SMG if controls are unlocked
      if (mainMenuDiv && gameMode !== 'idle') {
          mainMenuDiv.style.display = 'none';
      } else if (mainMenuDiv) {
          mainMenuDiv.style.display = 'flex';
          gameMode = 'idle';
          if (peerConnection) resetP2PState(); 
      }
    });
  }
  scene.add(controls.getObject()); 

  const hg = createHandgunModel();
  handgunModel = hg.model;
  handgunMuzzlePoint = hg.muzzlePoint;
  camera.add(handgunModel); 

  const sr = createSniperRifleModel();
  sniperRifleModel = sr.model;
  sniperMuzzlePoint = sr.muzzlePoint;
  camera.add(sniperRifleModel); 

  const smgData = createSMGModel();
  smgModel = smgData.model;
  smgMuzzlePoint = smgData.muzzlePoint;
  camera.add(smgModel);
  
  populateWeaponStatsDB(); 
  equipWeapon('handgun'); 


  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(25, 40, 30); directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 4096; directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 0.5; directionalLight.shadow.camera.far = 150;
  directionalLight.shadow.camera.left = -60; directionalLight.shadow.camera.right = 60;
  directionalLight.shadow.camera.top = 60; directionalLight.shadow.camera.bottom = -60;
  scene.add(directionalLight);

  const groundGeometry = new THREE.PlaneGeometry(500, 500);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: ARENA_GROUND_COLOR, roughness: 0.9 }); 
  groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2; groundMesh.receiveShadow = true; groundMesh.name = "ground";
  scene.add(groundMesh);
  
  document.addEventListener('keydown', onKeyDown); document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousedown', onMouseDown); document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('contextmenu', (event) => event.preventDefault());
  window.addEventListener('resize', onWindowResize);

  isGameInitialized = true;
  animate();
}

function generateArenaMap() {
    if (!prng) { console.error("ArenaMap: PRNG not initialized!"); return; }
    const featurePlacementBounds = { minX: -80, maxX: 80, minZ: -80, maxZ: 80 };
    const numObstacles = prng.nextInt(15, 24);
    for (let i = 0; i < numObstacles; i++) {
        const sizeX = prng.randFloat(2, 10);
        const sizeY = prng.randFloat(1, 6);
        const sizeZ = prng.randFloat(2, 10);
        const boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        const obstacle = new THREE.Mesh(boxGeometry, arenaMapFeatureMaterial);
        obstacle.position.x = prng.randFloat(featurePlacementBounds.minX, featurePlacementBounds.maxX);
        obstacle.position.y = sizeY / 2;
        obstacle.position.z = prng.randFloat(featurePlacementBounds.minZ, featurePlacementBounds.maxZ);
        obstacle.rotation.y = prng.next() * Math.PI * 2;
        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        obstacle.name = `arena_obstacle_${i}`;
        scene.add(obstacle);
        mapFeatures.push(obstacle);
    }

    const numRamps = prng.nextInt(2, 3);
    for (let i = 0; i < numRamps; i++) {
        const rampWidth = prng.randFloat(3, 5);
        const rampHeight = prng.randFloat(1.5, 3);
        const rampLength = prng.randFloat(8, 15);
        const rampGeometry = new THREE.BoxGeometry(rampWidth, rampHeight, rampLength);
        const ramp = new THREE.Mesh(rampGeometry, arenaMapFeatureMaterial);
        ramp.position.x = prng.randFloat(featurePlacementBounds.minX / 2, featurePlacementBounds.maxX / 2);
        ramp.position.z = prng.randFloat(featurePlacementBounds.minZ / 2, featurePlacementBounds.maxZ / 2);
        ramp.position.y = rampHeight / 2;

        const yRotation = prng.next() * Math.PI * 2;
        const rampWrapper = new THREE.Object3D();
        rampWrapper.position.copy(ramp.position);
        rampWrapper.rotation.y = yRotation;
        ramp.position.set(0,0,0);
        rampWrapper.add(ramp);
        rampWrapper.name = `arena_ramp_wrapper_${i}`;

        const angle = Math.atan2(rampHeight, rampLength);
        ramp.geometry.computeBoundingBox();
        const rampCenterToEdge = ramp.geometry.boundingBox!.max.z;
        ramp.position.y = rampCenterToEdge * Math.sin(angle/2) + rampHeight *0.1;
        ramp.rotation.x = -angle * 0.8;

        ramp.castShadow = true;
        ramp.receiveShadow = true;
        ramp.name = `arena_ramp_${i}`;
        scene.add(rampWrapper);
        mapFeatures.push(ramp); 
    }
}

function generateUrbanMap() {
    if (!prng) { console.error("UrbanMap: PRNG not initialized!"); return; }
    const cityBounds = { minX: -100, maxX: 100, minZ: -100, maxZ: 100 };
    const numBuildings = prng.nextInt(20, 35);
    const minBuildingDim = 8, maxBuildingDim = 25;
    const minBuildingHeight = 10, maxBuildingHeight = 40;

    for (let i = 0; i < numBuildings; i++) {
        const sizeX = prng.randFloat(minBuildingDim, maxBuildingDim);
        const sizeY = prng.randFloat(minBuildingHeight, maxBuildingHeight);
        const sizeZ = prng.randFloat(minBuildingDim, maxBuildingDim);
        const buildingGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        const building = new THREE.Mesh(buildingGeometry, urbanBuildingMaterial);

        building.position.x = prng.randFloat(cityBounds.minX + sizeX / 2, cityBounds.maxX - sizeX / 2);
        building.position.y = sizeY / 2;
        building.position.z = prng.randFloat(cityBounds.minZ + sizeZ / 2, cityBounds.maxZ - sizeZ / 2);
        
        let tooClose = false;
        const buildingBox = new THREE.Box3().setFromObject(building);
        for(const existingFeature of mapFeatures){
            const existingBox = new THREE.Box3().setFromObject(existingFeature);
            if(buildingBox.intersectsBox(existingBox)){
                const intersection = buildingBox.clone().intersect(existingBox);
                const intersectionSize = new THREE.Vector3();
                intersection.getSize(intersectionSize);
                if (intersectionSize.x > 1 && intersectionSize.y > 1 && intersectionSize.z > 1) { 
                    tooClose = true;
                    break;
                }
            }
        }

        if(tooClose && prng.next() < 0.7){ 
             if (building.geometry) building.geometry.dispose(); 
            continue;
        }

        building.castShadow = true;
        building.receiveShadow = true;
        building.name = `urban_building_${i}`;
        scene.add(building);
        mapFeatures.push(building);
    }

    const numStreetObstacles = prng.nextInt(10, 18);
    for (let i = 0; i < numStreetObstacles; i++) {
        const type = prng.next();
        let obsSizeX, obsSizeY, obsSizeZ;
        if (type < 0.6) { 
            obsSizeX = prng.randFloat(1.8, 2.5);
            obsSizeY = prng.randFloat(1.2, 1.8);
            obsSizeZ = prng.randFloat(3.5, 5.0);
        } else { 
            obsSizeX = prng.randFloat(3, 6);
            obsSizeY = prng.randFloat(0.8, 1.5);
            obsSizeZ = prng.randFloat(0.5, 1.0);
        }
        const obstacleGeometry = new THREE.BoxGeometry(obsSizeX, obsSizeY, obsSizeZ);
        const obstacle = new THREE.Mesh(obstacleGeometry, urbanObstacleMaterial);

        obstacle.position.x = prng.randFloat(cityBounds.minX, cityBounds.maxX);
        obstacle.position.y = obsSizeY / 2;
        obstacle.position.z = prng.randFloat(cityBounds.minZ, cityBounds.maxZ);
        obstacle.rotation.y = prng.next() * Math.PI * 0.5; 

        let placedInsideBuilding = false;
        const obstacleBox = new THREE.Box3().setFromObject(obstacle);
        for (const feature of mapFeatures) { 
            if(feature.name.startsWith("urban_building_")){
                const featureBox = new THREE.Box3().setFromObject(feature);
                if (obstacleBox.intersectsBox(featureBox)) {
                    placedInsideBuilding = true;
                    break;
                }
            }
        }
        if (placedInsideBuilding) {
             if (obstacle.geometry) obstacle.geometry.dispose();
            continue;
        }

        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        obstacle.name = `urban_obstacle_${i}`;
        scene.add(obstacle);
        mapFeatures.push(obstacle);
    }
}

function generateForestMap() {
    if (!prng) { console.error("ForestMap: PRNG not initialized!"); return; }
    const forestBounds = { minX: -90, maxX: 90, minZ: -90, maxZ: 90 };
    const numTrees = prng.nextInt(35, 50); 

    for (let i = 0; i < numTrees; i++) {
        const treeGroup = new THREE.Group();
        treeGroup.name = `forest_tree_group_${i}`; 

        const trunkHeight = prng.randFloat(3, 10);
        const trunkRadius = prng.randFloat(0.3, 0.8);
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 0.8, trunkHeight, 12);
        const trunkMesh = new THREE.Mesh(trunkGeometry, forestTreeTrunkMaterial);
        trunkMesh.castShadow = true;
        trunkMesh.receiveShadow = true;
        trunkMesh.position.y = trunkHeight / 2;
        trunkMesh.name = `forest_trunk_${i}`;
        treeGroup.add(trunkMesh);

        const foliageType = prng.next();
        let foliageMesh: THREE.Mesh;
        if (foliageType < 0.6) { 
            const foliageHeight = prng.randFloat(trunkHeight * 0.6, trunkHeight * 1.2);
            const foliageRadius = prng.randFloat(trunkRadius * 3, trunkRadius * 5);
            const foliageGeometry = new THREE.ConeGeometry(foliageRadius, foliageHeight, 16);
            foliageMesh = new THREE.Mesh(foliageGeometry, forestFoliageMaterial);
            foliageMesh.position.y = trunkHeight + foliageHeight * 0.4; 
        } else { 
            const foliageRadius = prng.randFloat(trunkRadius * 2.5, trunkRadius * 4);
            const foliageSegments = prng.next() < 0.5 ? 8 : 12; 
            const foliageGeometry = new THREE.SphereGeometry(foliageRadius, foliageSegments, foliageSegments / 2);
            foliageMesh = new THREE.Mesh(foliageGeometry, forestFoliageMaterial);
            foliageMesh.position.y = trunkHeight + foliageRadius * 0.6; 
        }
        foliageMesh.castShadow = true;
        foliageMesh.name = `forest_foliage_${i}`;
        treeGroup.add(foliageMesh);
        
        mapFeatures.push(trunkMesh); 
        mapFeatures.push(foliageMesh); 

        treeGroup.position.x = prng.randFloat(forestBounds.minX, forestBounds.maxX);
        treeGroup.position.z = prng.randFloat(forestBounds.minZ, forestBounds.maxZ);
        treeGroup.position.y = 0; 

        let tooClose = false;
        for (const existingFeature of mapFeatures) {
             if (existingFeature.parent === treeGroup || !existingFeature.parent) continue; 
             if(existingFeature.parent && existingFeature.parent !== scene && existingFeature.parent.name.startsWith("forest_tree_group")) {
                const dist = treeGroup.position.distanceTo(existingFeature.parent.position);
                if (dist < trunkRadius * 2 + 2) { 
                    tooClose = true;
                    break;
                }
             }
        }
        if (tooClose && prng.next() < 0.6) { 
            trunkMesh.geometry.dispose();
            foliageMesh.geometry.dispose();
            mapFeatures.pop(); mapFeatures.pop(); 
            scene.remove(treeGroup); // Remove the group if not adding its children
            continue;
        }
        
        scene.add(treeGroup);
    }

    const numRocks = prng.nextInt(15, 25);
    for (let i = 0; i < numRocks; i++) {
        const rockSizeX = prng.randFloat(0.5, 3);
        const rockSizeY = prng.randFloat(0.5, 2.5);
        const rockSizeZ = prng.randFloat(0.5, 3);
        const rockGeometry = new THREE.BoxGeometry(rockSizeX, rockSizeY, rockSizeZ); 
        const rock = new THREE.Mesh(rockGeometry, forestRockMaterial);
        rock.position.x = prng.randFloat(forestBounds.minX, forestBounds.maxX);
        rock.position.y = rockSizeY / 2;
        rock.position.z = prng.randFloat(forestBounds.minZ, forestBounds.maxZ);
        rock.rotation.y = prng.next() * Math.PI;
        rock.rotation.x = (prng.next() - 0.5) * 0.3;
        rock.rotation.z = (prng.next() - 0.5) * 0.3;
        rock.castShadow = true;
        rock.receiveShadow = true;
        rock.name = `forest_rock_${i}`;
        scene.add(rock);
        mapFeatures.push(rock);
    }

    const numBushes = prng.nextInt(8, 15);
    for (let i = 0; i < numBushes; i++) {
        const bushRadius = prng.randFloat(0.8, 2.0);
        const bushDetail = prng.next() < 0.5 ? 6 : 8;
        const bushGeometry = new THREE.SphereGeometry(bushRadius, bushDetail, bushDetail / 2);
        const baseBushColorHex = Number(forestFoliageMaterial.color.getHex());
        const colorVariation = prng.nextInt(0, 0x001100); 
        const bushMaterial = new THREE.MeshStandardMaterial({ color: (baseBushColorHex * 0.8 + colorVariation), roughness: 0.9, metalness: 0.0 });
        const bush = new THREE.Mesh(bushGeometry, bushMaterial);
        bush.position.x = prng.randFloat(forestBounds.minX, forestBounds.maxX);
        bush.position.y = bushRadius * 0.6; 
        bush.position.z = prng.randFloat(forestBounds.minZ, forestBounds.maxZ);
        bush.castShadow = true;
        bush.name = `forest_bush_${i}`;
        scene.add(bush);
        mapFeatures.push(bush);
    }
}

function generatePlainsMap() {
    if (!prng) { console.error("PlainsMap: PRNG not initialized!"); return; }
    
    // Large 1km x 1km plains (500 units radius = 1km diameter)
    const plainsBounds = { minX: -500, maxX: 500, minZ: -500, maxZ: 500 };
    
    // Create rolling hills using elevation points
    const numHills = prng.nextInt(8, 15);
    for (let i = 0; i < numHills; i++) {
        const hillRadius = prng.randFloat(15, 40);
        const hillHeight = prng.randFloat(3, 12);
        const hillGeometry = new THREE.SphereGeometry(hillRadius, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const hill = new THREE.Mesh(hillGeometry, plainsGrassMaterial);
        
        hill.position.x = prng.randFloat(plainsBounds.minX + hillRadius, plainsBounds.maxX - hillRadius);
        hill.position.y = 0;
        hill.position.z = prng.randFloat(plainsBounds.minZ + hillRadius, plainsBounds.maxZ - hillRadius);
        hill.scale.y = hillHeight / hillRadius;
        
        hill.castShadow = true;
        hill.receiveShadow = true;
        hill.name = `plains_hill_${i}`;
        scene.add(hill);
        mapFeatures.push(hill);
    }
    
    // Sparse rock formations for cover
    const numRockFormations = prng.nextInt(12, 20);
    for (let i = 0; i < numRockFormations; i++) {
        const rockGroup = new THREE.Group();
        rockGroup.name = `plains_rocks_${i}`;
        
        const numRocksInFormation = prng.nextInt(2, 6);
        for (let j = 0; j < numRocksInFormation; j++) {
            const rockSize = prng.randFloat(1.5, 4.5);
            const rockHeight = prng.randFloat(rockSize * 0.8, rockSize * 2.0);
            const rockGeometry = new THREE.BoxGeometry(rockSize, rockHeight, rockSize * prng.randFloat(0.7, 1.3));
            const rock = new THREE.Mesh(rockGeometry, plainsRockMaterial);
            
            rock.position.x = prng.randFloat(-6, 6);
            rock.position.y = rockHeight / 2;
            rock.position.z = prng.randFloat(-6, 6);
            rock.rotation.y = prng.randFloat(0, Math.PI * 2);
            
            rock.castShadow = true;
            rock.receiveShadow = true;
            rock.name = `plains_rock_${i}_${j}`;
            rockGroup.add(rock);
        }
        
        rockGroup.position.x = prng.randFloat(plainsBounds.minX, plainsBounds.maxX);
        rockGroup.position.z = prng.randFloat(plainsBounds.minZ, plainsBounds.maxZ);
        
        scene.add(rockGroup);
        mapFeatures.push(rockGroup);
    }
    
    // Scattered individual trees for long-range reference points
    const numTrees = prng.nextInt(8, 15);
    for (let i = 0; i < numTrees; i++) {
        const treeGroup = new THREE.Group();
        treeGroup.name = `plains_tree_${i}`;
        
        const trunkHeight = prng.randFloat(8, 16);
        const trunkRadius = prng.randFloat(0.4, 1.0);
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 0.9, trunkHeight, 12);
        const trunk = new THREE.Mesh(trunkGeometry, plainsTreeMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        treeGroup.add(trunk);
        
        // Large canopy for long-distance visibility
        const canopyRadius = prng.randFloat(trunkRadius * 4, trunkRadius * 7);
        const canopyGeometry = new THREE.SphereGeometry(canopyRadius, 12, 8);
        const canopy = new THREE.Mesh(canopyGeometry, plainsGrassMaterial);
        canopy.position.y = trunkHeight + canopyRadius * 0.5;
        canopy.scale.y = 0.6; // Flatten slightly
        canopy.castShadow = true;
        canopy.receiveShadow = true;
        treeGroup.add(canopy);
        
        treeGroup.position.x = prng.randFloat(plainsBounds.minX, plainsBounds.maxX);
        treeGroup.position.z = prng.randFloat(plainsBounds.minZ, plainsBounds.maxZ);
        
        scene.add(treeGroup);
        mapFeatures.push(treeGroup);
    }
    
    // Small bushes and grass clumps for minor cover
    const numVegetation = prng.nextInt(20, 35);
    for (let i = 0; i < numVegetation; i++) {
        const vegSize = prng.randFloat(0.8, 2.5);
        const vegGeometry = new THREE.SphereGeometry(vegSize, 8, 6);
        const vegetation = new THREE.Mesh(vegGeometry, plainsGrassMaterial);
        
        vegetation.position.x = prng.randFloat(plainsBounds.minX, plainsBounds.maxX);
        vegetation.position.y = vegSize * 0.3;
        vegetation.position.z = prng.randFloat(plainsBounds.minZ, plainsBounds.maxZ);
        vegetation.scale.y = 0.4; // Make bushes low
        
        vegetation.castShadow = true;
        vegetation.receiveShadow = true;
        vegetation.name = `plains_vegetation_${i}`;
        scene.add(vegetation);
        mapFeatures.push(vegetation);
    }
}

function generateMountainMap() {
    if (!prng) {
        console.error("generateMountainMap: PRNG not initialized!");
        return;
    }

    console.log("Loading terrain assets...");
    
    // First, try to load via fetch to check if file exists
    const fbxPath = '/assets/89-terrain/uploads_files_2708212_terrain.fbx';
    console.log("Attempting to load FBX from:", fbxPath);
    
    fetch(fbxPath, { method: 'HEAD' })
        .then(response => {
            console.log("FBX file accessibility check:", response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`File not accessible: ${response.status}`);
            }
            return loadFBXTerrain(fbxPath);
        })
        .catch(error => {
            console.error('FBX file not accessible:', error);
            console.log('Falling back to procedural mountain generation...');
            generateProceduralMountainMap();
        });
}

function loadFBXTerrain(fbxPath: string) {
    const fbxLoader = new FBXLoader();
    
    // Load the terrain FBX model
    fbxLoader.load(
        fbxPath,
        (terrainModel) => {
            console.log("Terrain FBX loaded successfully");
            console.log("Terrain model:", terrainModel);
            console.log("Terrain children count:", terrainModel.children.length);
            
            // Debug: Log all children in the model
            terrainModel.traverse((child: any) => {
                console.log("Child type:", child.type, "Name:", child.name);
                if (child.geometry) {
                    console.log("  Geometry vertices:", child.geometry.attributes.position?.count || 0);
                }
            });
            
            // Set up terrain material
            const terrainMaterial = new THREE.MeshStandardMaterial({
                color: 0x8B7355, // Mountain brown
                roughness: 0.8,
                metalness: 0.1
            });

            let meshCount = 0;
            // Apply material to all meshes in the model
            terrainModel.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    meshCount++;
                    console.log(`Processing mesh ${meshCount}:`, child.name);
                    if (child.material) {
                        // Dispose old material to prevent memory leaks
                        if (Array.isArray(child.material)) {
                            child.material.forEach((mat: any) => mat.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                    child.material = terrainMaterial;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            console.log(`Found and processed ${meshCount} meshes in terrain model`);

            // Use the terrain as-is, just scale appropriately for gameplay
            // Scale to fit the game's coordinate system (similar to other maps)
            const terrainScale = 2.0; // Fixed scale for consistent gameplay
            terrainModel.scale.set(terrainScale, terrainScale, terrainScale);
            
            // Center the terrain at origin
            terrainModel.position.set(0, 0, 0);
            
            // Add to scene but keep separate from mapFeatures for proper collision handling
            scene.add(terrainModel);
            terrainMeshes.push(terrainModel); // Store for cleanup
            // DO NOT add to mapFeatures - terrain has specialized collision detection
            
            // Cache terrain meshes for performance
            cachedTerrainMeshes = [];
            terrainModel.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    cachedTerrainMeshes.push(child);
                }
            });
            
            console.log(`Generated mountain map using original terrain asset`);
            console.log("Terrain model position:", terrainModel.position);
            console.log("Terrain model scale:", terrainModel.scale);
            console.log("Terrain model bounds:", terrainModel);
            
            // Trigger respawn after terrain is loaded to ensure proper height calculation
            if (controls && scene) {
                console.log("Terrain loaded - triggering respawn to adjust height");
                setTimeout(() => {
                    triggerRespawn();
                }, 100); // Small delay to ensure terrain is fully processed
            }
        },
        (progress) => {
            console.log('Terrain loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('Error loading terrain FBX:', error);
            console.error('Error details:', error.message || error);
            console.log('FBX file path attempted:', '/assets/89-terrain/uploads_files_2708212_terrain.fbx');
            console.log('Falling back to procedural mountain generation...');
            // Fallback to procedural generation if asset loading fails
            generateProceduralMountainMap();
        }
    );
}

// Procedural elements to complement terrain assets
function addProceduralMountainElements() {
    if (!prng) return;

    const mountainRockMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x696969, 
        roughness: 0.9, 
        metalness: 0.1 
    });

    const mountainBounds = 250;

    // Add scattered boulders
    const numBoulders = prng.nextInt(15, 25);
    for (let i = 0; i < numBoulders; i++) {
        const boulderSize = prng.randFloat(1.5, 6);
        const boulderGeometry = new THREE.SphereGeometry(boulderSize, 8, 8);
        const boulderMesh = new THREE.Mesh(boulderGeometry, mountainRockMaterial);
        
        let boulderX, boulderZ;
        let attempts = 0;
        do {
            boulderX = prng.randFloat(-mountainBounds, mountainBounds);
            boulderZ = prng.randFloat(-mountainBounds, mountainBounds);
            attempts++;
        } while (attempts < 10 && mapFeatures.some(feature => 
            Math.abs(feature.position.x - boulderX) < 8 && 
            Math.abs(feature.position.z - boulderZ) < 8
        ));
        
        boulderMesh.position.set(boulderX, boulderSize / 2, boulderZ);
        boulderMesh.scale.set(1, prng.randFloat(0.7, 1.3), 1);
        boulderMesh.castShadow = true;
        boulderMesh.receiveShadow = true;
        scene.add(boulderMesh);
        mapFeatures.push(boulderMesh);
    }

    // Add sparse mountain trees
    const numTrees = prng.nextInt(3, 8);
    for (let i = 0; i < numTrees; i++) {
        const treeHeight = prng.randFloat(6, 12);
        const treeRadius = prng.randFloat(1.5, 3);
        
        // Tree trunk
        const trunkGeometry = new THREE.CylinderGeometry(treeRadius * 0.3, treeRadius * 0.4, treeHeight * 0.6);
        const trunkMesh = new THREE.Mesh(trunkGeometry, new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, 
            roughness: 0.8 
        }));
        
        let treeX, treeZ;
        let attempts = 0;
        do {
            treeX = prng.randFloat(-mountainBounds + 20, mountainBounds - 20);
            treeZ = prng.randFloat(-mountainBounds + 20, mountainBounds - 20);
            attempts++;
        } while (attempts < 10 && mapFeatures.some(feature => 
            Math.abs(feature.position.x - treeX) < 12 && 
            Math.abs(feature.position.z - treeZ) < 12
        ));
        
        trunkMesh.position.set(treeX, treeHeight * 0.3, treeZ);
        trunkMesh.castShadow = true;
        scene.add(trunkMesh);
        mapFeatures.push(trunkMesh);
        
        // Tree foliage
        const foliageGeometry = new THREE.ConeGeometry(treeRadius, treeHeight * 0.6, 8);
        const foliageMesh = new THREE.Mesh(foliageGeometry, new THREE.MeshStandardMaterial({ 
            color: 0x228B22, 
            roughness: 0.8 
        }));
        foliageMesh.position.set(treeX, treeHeight * 0.8, treeZ);
        foliageMesh.castShadow = true;
        scene.add(foliageMesh);
        mapFeatures.push(foliageMesh);
    }
}

// Fallback function if asset loading fails
function generateProceduralMountainMap() {
    if (!prng) return;

    const mountainRockMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x696969, 
        roughness: 0.9, 
        metalness: 0.1 
    });

    const mountainBounds = 350;

    // Create a few large mountain peaks as fallback
    const numPeaks = prng.nextInt(2, 4);
    for (let i = 0; i < numPeaks; i++) {
        const peakHeight = prng.randFloat(30, 60);
        const peakRadius = prng.randFloat(20, 35);
        
        const peakGeometry = new THREE.ConeGeometry(peakRadius, peakHeight, 8);
        const peakMesh = new THREE.Mesh(peakGeometry, mountainRockMaterial);
        
        let peakX, peakZ;
        let attempts = 0;
        do {
            peakX = prng.randFloat(-mountainBounds, mountainBounds);
            peakZ = prng.randFloat(-mountainBounds, mountainBounds);
            attempts++;
        } while (attempts < 15 && mapFeatures.some(feature => 
            Math.abs(feature.position.x - peakX) < 50 && 
            Math.abs(feature.position.z - peakZ) < 50
        ));
        
        peakMesh.position.set(peakX, peakHeight / 2, peakZ);
        peakMesh.castShadow = true;
        peakMesh.receiveShadow = true;
        scene.add(peakMesh);
        mapFeatures.push(peakMesh);
    }

    addProceduralMountainElements();
    console.log(`Generated fallback procedural mountain map with ${mapFeatures.length} features`);
}

function generateMapFeatures() {
    mapFeatures.forEach(feature => {
        if (feature.parent === scene) { 
            scene.remove(feature);
        } else if (feature.parent && feature.parent !== scene) { 
            if (scene.getObjectById(feature.parent.id)) {
                 scene.remove(feature.parent);
            }
        } else if (scene.getObjectById(feature.id)) { 
            scene.remove(feature);
        }

        if (feature.geometry) feature.geometry.dispose();
        if (feature.name.startsWith("forest_bush_") && feature.material && !Array.isArray(feature.material)) {
            (feature.material as THREE.Material).dispose();
        }
    });
    mapFeatures.length = 0;
    
    // Clean up terrain meshes
    terrainMeshes.forEach(terrain => {
        if (terrain.parent === scene) scene.remove(terrain);
        terrain.traverse((child: any) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => mat.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    });
    terrainMeshes.length = 0;
    cachedTerrainMeshes.length = 0;

    const treeGroupsToRemove = scene.children.filter(child => child.name.startsWith("forest_tree_group"));
    treeGroupsToRemove.forEach(group => scene.remove(group));
    const rampWrappersToRemove = scene.children.filter(child => child.name.startsWith("arena_ramp_wrapper_")); 
    rampWrappersToRemove.forEach(wrapper => scene.remove(wrapper));


    if (!prng) {
        console.error("generateMapFeatures: PRNG not initialized! Cannot generate map.");
        return;
    }
    if (currentMapType === undefined || currentMapType === null) {
        console.error("generateMapFeatures: currentMapType is not set! Cannot determine which map to generate. Defaulting to Arena.");
        currentMapType = MapType.ARENA; 
    }
    console.log(`Generating map features for type: ${MapType[currentMapType]} (Seed: ${currentMapSeed})`);


    if (currentMapType === MapType.URBAN) {
        generateUrbanMap();
    } else if (currentMapType === MapType.FOREST) {
        generateForestMap();
    } else if (currentMapType === MapType.PLAINS) {
        generatePlainsMap();
    } else if (currentMapType === MapType.MOUNTAIN) {
        generateMountainMap();
    } else { 
        generateArenaMap();
    }
    console.log(`Generated ${mapFeatures.length} map features.`);
}

function createTargets() {
  if (!prng) { console.error("CreateTargets: PRNG not initialized!"); return; }
  const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  let MAX_TARGET_ATTEMPTS = 15;
  
  // Increase attempts for larger maps
  if (currentMapType === MapType.PLAINS) {
    MAX_TARGET_ATTEMPTS = 25; // More attempts needed for sparse large map
  } 
  let numTargets = 40;
  let boundsMultiplier = 160; 
  let yBase = 0.75 + (prng.next() * 12); 

  if (currentMapType === MapType.URBAN) {
    numTargets = 50;
    boundsMultiplier = 190;
    yBase = 0.75 + (prng.next() * 25);
  } else if (currentMapType === MapType.FOREST) {
    numTargets = 45;
    boundsMultiplier = 170; 
    yBase = 0.75 + (prng.next() * 8); 
  } else if (currentMapType === MapType.PLAINS) {
    numTargets = 100; // More targets for the large map
    boundsMultiplier = 900; // Cover most of the 1km x 1km area
    yBase = 0.75 + (prng.next() * 15); // Slightly higher for visibility
  } else if (currentMapType === MapType.MOUNTAIN) {
    numTargets = 40; // Fewer targets for the specific terrain layout
    boundsMultiplier = 200; // Match terrain asset scale
    yBase = 0.75 + (prng.next() * 20); // Appropriate height for terrain
  }
  console.log(`Creating ${numTargets} targets for map type ${currentMapType !== undefined ? MapType[currentMapType] : 'undefined'}`);

  for (let i = 0; i < numTargets; i++) {
    let placed = false;
    for (let attempt = 0; attempt < MAX_TARGET_ATTEMPTS; attempt++) {
        const r = prng.next();
        const g = prng.next();
        const b = prng.next();
        const boxMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(r,g,b) });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        
        box.position.x = (prng.next() - 0.5) * boundsMultiplier;
        if (currentMapType === MapType.URBAN) {
            box.position.y = 0.75 + (prng.next() * 25);
        } else if (currentMapType === MapType.FOREST) {
             box.position.y = 0.75 + (prng.next() * 5); 
        } else if (currentMapType === MapType.MOUNTAIN) {
            box.position.y = 0.75 + (prng.next() * 20); // Altitude matching terrain features
        } else { 
            box.position.y = 0.75 + (prng.next() * 12);
        }
        box.position.z = (prng.next() - 0.5) * boundsMultiplier;
        box.castShadow = true;
        box.receiveShadow = true;

        const targetBoundingBox = new THREE.Box3().setFromObject(box);
        let collisionWithMapFeature = false;
        for (const feature of mapFeatures) {
            const featureBoundingBox = new THREE.Box3().setFromObject(feature);
            if (targetBoundingBox.intersectsBox(featureBoundingBox)) {
                collisionWithMapFeature = true;
                break;
            }
        }

        if (!collisionWithMapFeature) {
            const targetId = `target_${i}_${currentMapSeed}_${prng.next().toString(36).substring(7)}`; 
            box.name = targetId;
            scene.add(box);
            targetMeshes.set(targetId, box);
            // Cache bounding box for performance
            const boundingBox = new THREE.Box3().setFromObject(box);
            targetBoundingBoxCache.set(targetId, boundingBox.clone().expandByScalar(PROJECTILE_RADIUS));
            placed = true;
            break;
        } else {
             if(box.geometry) box.geometry.dispose();
             if(box.material && !Array.isArray(box.material)) (box.material as THREE.Material).dispose();
        }
    }
    if (!placed) {
        // console.warn(`Could not place target ${i} after ${MAX_TARGET_ATTEMPTS} attempts.`);
    }
  }
  console.log(`Placed ${targetMeshes.size} targets.`);
}

function setupMultiplayerSceneElements() {
  if (remotePlayerMesh) {
      scene.remove(remotePlayerMesh);
      remotePlayerMesh.traverse(child => {
          if (child instanceof THREE.Mesh) {
              if (child.geometry) child.geometry.dispose();
          }
      });
  }
  if (remotePlayerHandgunMesh && remotePlayerHandgunMesh.parent) remotePlayerHandgunMesh.parent.remove(remotePlayerHandgunMesh);
  if (remotePlayerSniperMesh && remotePlayerSniperMesh.parent) remotePlayerSniperMesh.parent.remove(remotePlayerSniperMesh);
  if (remotePlayerSMGMesh && remotePlayerSMGMesh.parent) remotePlayerSMGMesh.parent.remove(remotePlayerSMGMesh);


  const remotePlayerMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500, roughness: 0.6, metalness: 0.3 });
  remotePlayerMesh = new THREE.Group(); 

  const headGeometry = new THREE.SphereGeometry(REMOTE_PLAYER_HEAD_RADIUS, 16, 12);
  const headMesh = new THREE.Mesh(headGeometry, remotePlayerMaterial);
  headMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y + REMOTE_PLAYER_HEAD_RADIUS;
  headMesh.castShadow = true; headMesh.receiveShadow = true;
  remotePlayerMesh.add(headMesh);

  const torsoGeometry = new THREE.BoxGeometry(REMOTE_PLAYER_TORSO_SIZE.x, REMOTE_PLAYER_TORSO_SIZE.y, REMOTE_PLAYER_TORSO_SIZE.z);
  const torsoMesh = new THREE.Mesh(torsoGeometry, remotePlayerMaterial);
  torsoMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y + REMOTE_PLAYER_TORSO_SIZE.y / 2;
  torsoMesh.castShadow = true; torsoMesh.receiveShadow = true;
  remotePlayerMesh.add(torsoMesh);

  const legsGeometry = new THREE.BoxGeometry(REMOTE_PLAYER_LEGS_SIZE.x, REMOTE_PLAYER_LEGS_SIZE.y, REMOTE_PLAYER_LEGS_SIZE.z);
  const legsMesh = new THREE.Mesh(legsGeometry, remotePlayerMaterial);
  legsMesh.position.y = REMOTE_PLAYER_LEGS_SIZE.y / 2;
  legsMesh.castShadow = true; legsMesh.receiveShadow = true;
  remotePlayerMesh.add(legsMesh);
  
  let remoteSpawnPos: THREE.Vector3;
  const currentSpawnPoints = getSpawnPointsForCurrentMap();
   if (isPlayerOne === true && currentSpawnPoints.length > 1) { 
        remoteSpawnPos = adjustSpawnPointToTerrain(currentSpawnPoints[1]);
    } else if (isPlayerOne === false && currentSpawnPoints.length > 0) { 
        remoteSpawnPos = adjustSpawnPointToTerrain(currentSpawnPoints[0]);
    } else { 
        remoteSpawnPos = selectRandomSpawnPoint(currentSpawnPoints.slice(2)); 
    }
  remotePlayerMesh.position.set(remoteSpawnPos.x, remoteSpawnPos.y, remoteSpawnPos.z); 

  remotePlayerMesh.castShadow = true; remotePlayerMesh.receiveShadow = true;
  remotePlayerMesh.name = "remotePlayer_1";

  const remoteGunMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  
  const remoteHandgunGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8); 
  remotePlayerHandgunMesh = new THREE.Mesh(remoteHandgunGeom, remoteGunMaterial);
  remotePlayerHandgunMesh.castShadow = true;
  remotePlayerHandgunMesh.visible = true; 
  remotePlayerMesh.add(remotePlayerHandgunMesh); 

  const remoteSniperGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
  remotePlayerSniperMesh = new THREE.Mesh(remoteSniperGeom, remoteGunMaterial);
  remotePlayerSniperMesh.castShadow = true;
  remotePlayerSniperMesh.visible = false;
  remotePlayerMesh.add(remotePlayerSniperMesh);

  const remoteSMGGeom = new THREE.BoxGeometry(0.08, 0.08, 0.5); // Simple box for remote SMG
  remotePlayerSMGMesh = new THREE.Mesh(remoteSMGGeom, remoteGunMaterial);
  remotePlayerSMGMesh.castShadow = true;
  remotePlayerSMGMesh.visible = false;
  remotePlayerMesh.add(remotePlayerSMGMesh);

  scene.add(remotePlayerMesh);
}

async function initPeerConnection() {
    console.log("Initializing PeerConnection...");
    if (peerConnection && peerConnection.signalingState !== 'closed') {
        console.log("Closing existing PeerConnection.");
        peerConnection.close();
    }
    
    const rtcConfig = await getIceServersConfiguration();
    peerConnection = new RTCPeerConnection(rtcConfig);
    console.log("PeerConnection created with configuration:", rtcConfig);
    
    if (p2pStatusText) p2pStatusText.textContent = 'Status: Initializing...';

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("Local ICE candidate gathered:", event.candidate);
            
            // Add to manual UI for fallback
            if (localIceTextarea) {
                localIceTextarea.value += JSON.stringify(event.candidate) + '\n';
            }
            
            // Send automatically through WebSocket signaling
            if (signalingSocket && signalingSocket.readyState === WebSocket.OPEN && currentRoom) {
                const candidateMessage = {
                    msg_type: 'ice-candidate',
                    data: event.candidate,
                    target: opponentClientId, // Target specific opponent
                    sender: clientId
                };
                signalingSocket.send(JSON.stringify(candidateMessage));
                console.log('Sent ICE candidate automatically to', opponentClientId);
            }
        } else {
            console.log("Local ICE candidate gathering complete (event.candidate is null).");
        }
    };
    peerConnection.onicecandidateerror = (event) => {
        console.error("ICE candidate error:", event);
        if (p2pStatusText) p2pStatusText.textContent = `Status: ICE Error - ${event.errorCode}`;
    };
    peerConnection.onicegatheringstatechange = () => {
        if (!peerConnection) return;
        console.log(`ICE gathering state changed: ${peerConnection.iceGatheringState}`);
        if (p2pStatusText) p2pStatusText.textContent = `Status: ICE Gathering - ${peerConnection.iceGatheringState}`;
    };
    peerConnection.onconnectionstatechange = () => {
        if (!peerConnection || !p2pStatusText) return;
        const state = peerConnection.connectionState;
        console.log(`Connection state changed: ${state}`);
        p2pStatusText.textContent = `Status: ${state}`;

        if (state === 'connected') {
            console.log("PeerConnection: Connected");
            if (p2pInstructionText) p2pInstructionText.textContent = "Connected! Click screen to start.";
        } else if (state === 'disconnected') {
            console.warn("PeerConnection: Disconnected. This might be temporary. Waiting for potential auto-reconnect or closure.");
             if (signalingPanel && gameMode === 'multiplayer') signalingPanel.style.display = 'block';
             if (p2pInstructionText) p2pInstructionText.textContent = "Disconnected. Use P2P controls to reconnect.";
        } else if (state === 'failed') {
            console.error("PeerConnection: Failed. Attempting to reset P2P state.");
             if (signalingPanel && gameMode === 'multiplayer') signalingPanel.style.display = 'block';
             if (p2pInstructionText) p2pInstructionText.textContent = "Connection Failed. Use P2P controls to reconnect.";
             if (remotePlayerMesh) scene.remove(remotePlayerMesh); remotePlayerMesh = null;
             remotePlayerHandgunMesh = null; remotePlayerSniperMesh = null; remotePlayerSMGMesh = null;
             if (!isGameOver) resetP2PState(); 
        } else if (state === 'closed') {
            console.log("PeerConnection: Closed.");
             if (signalingPanel && gameMode === 'multiplayer') signalingPanel.style.display = 'block';
             if (p2pInstructionText) p2pInstructionText.textContent = "Connection Closed. Use P2P controls to reconnect.";
             if (remotePlayerMesh && remotePlayerMesh.parent) scene.remove(remotePlayerMesh); remotePlayerMesh = null;
             remotePlayerHandgunMesh = null; remotePlayerSniperMesh = null; remotePlayerSMGMesh = null;
        }
    };
    peerConnection.ondatachannel = (event) => {
        console.log("Data channel received:", event.channel.label);
        dataChannel = event.channel;
        setupDataChannelEvents();
    };
}

function setupDataChannelEvents() {
    if (!dataChannel || !p2pStatusText) return;
    console.log("Setting up data channel events for:", dataChannel.label);
    dataChannel.onopen = () => {
        console.log(`Data channel '${dataChannel?.label}' opened.`);
        p2pStatusText.textContent = 'Status: Connected (Data Channel Open)';

        if (gameMode === 'multiplayer' && isPlayerOne) {
            currentMapSeed = Date.now();
            currentMapType = determineMapType(currentMapSeed, selectedMapType);
            prng = new PRNG(currentMapSeed); 

            console.log("P1: Sending map seed:", currentMapSeed, "and map type:", currentMapType);
            sendGameEvent({
                type: 'map_seed',
                data: { seed: currentMapSeed, mapType: currentMapType } as GameEventMapSeedData
            });
            resetGameScene(); 
            if (signalingPanel) signalingPanel.style.display = 'none';
        } else if (gameMode === 'multiplayer' && !isPlayerOne) {
            console.log("P2: Data channel open, waiting for map seed.");
            if (signalingPanel) signalingPanel.style.display = 'none';
        }
    };
    dataChannel.onclose = () => {
        console.log(`Data channel '${dataChannel?.label}' closed.`);
    };
    dataChannel.onerror = (error) => {
        console.error(`Data channel '${dataChannel?.label}' error:`, error);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Data Channel Error';
    };
    dataChannel.onmessage = (event) => {
        if (isGameOver && JSON.parse(event.data as string).type !== 'game_over_notif') return;
        try {
            const message = JSON.parse(event.data as string);
            if (message.type === 'playerState' && remotePlayerMesh) {
                const state = message.data as PlayerState;
                remotePlayerMesh.position.set(state.position.x, state.position.y - PLAYER_HEIGHT, state.position.z);
                remotePlayerMesh.quaternion.set(state.quaternion.x, state.quaternion.y, state.quaternion.z, state.quaternion.w);

                if (remotePlayerHandgunMesh && remotePlayerSniperMesh && remotePlayerSMGMesh) {
                    remotePlayerHandgunMesh.visible = state.weaponType === 'handgun';
                    remotePlayerSniperMesh.visible = state.weaponType === 'sniper';
                    remotePlayerSMGMesh.visible = state.weaponType === 'smg';

                    let activeRemoteGunMesh: THREE.Mesh | null = null;
                    let hipOffset: THREE.Vector3 | null = null;
                    let adsOffset: THREE.Vector3 | null = null;

                    if (state.weaponType === 'handgun') {
                        activeRemoteGunMesh = remotePlayerHandgunMesh;
                        hipOffset = REMOTE_HANDGUN_HIP_OFFSET;
                        adsOffset = REMOTE_HANDGUN_ADS_OFFSET;
                    } else if (state.weaponType === 'sniper') {
                        activeRemoteGunMesh = remotePlayerSniperMesh;
                        hipOffset = REMOTE_SNIPER_HIP_OFFSET;
                        adsOffset = REMOTE_SNIPER_ADS_OFFSET;
                    } else if (state.weaponType === 'smg') {
                        activeRemoteGunMesh = remotePlayerSMGMesh;
                        hipOffset = REMOTE_SMG_HIP_OFFSET;
                        adsOffset = REMOTE_SMG_ADS_OFFSET;
                    }
                    
                    if (activeRemoteGunMesh && hipOffset && adsOffset) {
                        if (state.aiming) {
                            activeRemoteGunMesh.position.copy(adsOffset);
                            activeRemoteGunMesh.rotation.set(Math.PI / 2, 0, 0); 
                        } else {
                            activeRemoteGunMesh.position.copy(hipOffset);
                            let hipRotX = Math.PI / 2 + 0.3;
                            let hipRotZ = 0.1;
                            if (state.weaponType === 'sniper') { hipRotZ = 0.05;}
                            else if (state.weaponType === 'smg') { hipRotX = Math.PI / 2 + 0.25; hipRotZ = 0.08;}
                            activeRemoteGunMesh.rotation.set(hipRotX, 0, hipRotZ); 
                        }
                    }
                }

            } else if (message.type === 'gameEvent') {
                const gameEvent = message.data as GameEvent; 
                if (gameEvent.type === 'map_seed' && !isPlayerOne) { 
                    const seedData = gameEvent.data as GameEventMapSeedData;
                    currentMapSeed = seedData.seed;
                    currentMapType = seedData.mapType; 
                    prng = new PRNG(currentMapSeed!); 
                    console.log("P2: Received and set map seed:", currentMapSeed, "and map type:", currentMapType);
                    resetGameScene(); 
                }
                else if (gameEvent.type === 'shoot' && gameEvent.data) {
                     const shootData = gameEvent.data as GameEventShootData;
                     if (shootData.muzzlePosition && shootData.direction) {
                        const projectileMesh = new THREE.Mesh(projectileGeometry, remoteProjectileMaterial); 
                        projectileMesh.castShadow = true;
                        projectileMesh.position.set(shootData.muzzlePosition.x, shootData.muzzlePosition.y, shootData.muzzlePosition.z);
                        
                        let speed = weaponStatsDB.handgun.projectileSpeed!; // Default
                        if (shootData.weaponType === 'sniper' && weaponStatsDB.sniper.projectileSpeed) {
                            speed = weaponStatsDB.sniper.projectileSpeed;
                        } else if (shootData.weaponType === 'smg' && weaponStatsDB.smg.projectileSpeed) {
                            speed = weaponStatsDB.smg.projectileSpeed;
                        }
                        
                        const remoteProj: RemoteProjectile = {
                            mesh: projectileMesh,
                            velocity: new THREE.Vector3(shootData.direction.x, shootData.direction.y, shootData.direction.z).multiplyScalar(speed),
                            lifeTime: 0,
                            spawnTime: performance.now(),
                            weaponType: shootData.weaponType,
                        };
                        scene.add(projectileMesh);
                        remoteProjectiles.push(remoteProj);
                     }
                }
                else if (gameEvent.type === 'hit_opponent') {
                    if(isGameOver) return;
                    const hitData = gameEvent.data as GameEventHitOpponentData;
                    playerHealth -= hitData.damageDealt;

                    const hitOverlay = document.createElement('div');
                    hitOverlay.style.position = 'absolute'; hitOverlay.style.top = '0'; hitOverlay.style.left = '0';
                    hitOverlay.style.width = '100%'; hitOverlay.style.height = '100%';
                    hitOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; hitOverlay.style.zIndex = '1000';
                    document.body.appendChild(hitOverlay);
                    setTimeout(() => { if (document.body.contains(hitOverlay)) document.body.removeChild(hitOverlay); }, 150);
                    showTemporaryMessage(`HIT! Health: ${playerHealth}`, 1500);

                    if (playerHealth <= 0) {
                        opponentScore++;
                        sendGameEvent({ type: 'i_was_defeated' });
                        if (opponentScore >= KILLS_TO_WIN) {
                            handleGameOver(false); 
                        } else {
                            playerHealth = PLAYER_MAX_HEALTH;
                            triggerRespawn();
                        }
                    }
                } else if (gameEvent.type === 'i_was_defeated') {
                    if(isGameOver) return;
                    myScore++;
                    showTemporaryMessage(`Opponent Defeated! Your Score: ${myScore}`, 2000);
                    if (myScore >= KILLS_TO_WIN) {
                        handleGameOver(true); 
                    }
                } else if (gameEvent.type === 'game_over_notif') {
                    const gameOverData = gameEvent.data as GameEventGameOverData;
                    if (gameOverData.winnerIsPlayerOne !== null && !isGameOver) { 
                        const thisPlayerWon = (isPlayerOne === gameOverData.winnerIsPlayerOne);
                        handleGameOver(thisPlayerWon);
                    }
                }
            }
        } catch (error) { console.error("Failed to parse message or update remote player:", error); }
    };
}

async function createOffer() {
    console.log("Creating offer...");
    isPlayerOne = true;
    if (localIceTextarea) localIceTextarea.value = '';
    await initPeerConnection(); // Now async
    if (!peerConnection || !localSdpTextarea || !p2pStatusText) {
        console.error("Cannot create offer: PeerConnection or UI elements missing.");
        return;
    }
    console.log("Creating data channel 'gameData'.");
    dataChannel = peerConnection.createDataChannel("gameData");
    setupDataChannelEvents(); 
    try {
        const offer = await peerConnection.createOffer();
        console.log("Offer created:", offer);
        await peerConnection.setLocalDescription(offer);
        console.log("Local description set with offer.");
        localSdpTextarea.value = JSON.stringify(offer);
        p2pStatusText.textContent = 'Status: Offer created. Send to Peer 2.';
    } catch (e) {
        console.error("Error creating offer or setting local description:", e);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Error creating offer.';
        isPlayerOne = null; 
    }
}

async function createAnswer() {
    console.log("Creating answer...");
    isPlayerOne = false;
    if (localIceTextarea) localIceTextarea.value = '';
    await initPeerConnection(); // Now async
    if (!peerConnection || !remoteSdpTextarea || !localSdpTextarea || !p2pStatusText) {
        console.error("Cannot create answer: PeerConnection or UI elements missing.");
        return;
    }
    const remoteOfferText = remoteSdpTextarea.value;
    if (!remoteOfferText) {
        alert("Paste Peer 1's offer first!");
        console.warn("Remote offer text is empty.");
        return;
    }
    try {
        console.log("Parsing remote offer:", remoteOfferText);
        const offer = JSON.parse(remoteOfferText);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("Remote description (offer) set.");
        const answer = await peerConnection.createAnswer();
        console.log("Answer created:", answer);
        await peerConnection.setLocalDescription(answer);
        console.log("Local description set with answer.");
        localSdpTextarea.value = JSON.stringify(answer);
        p2pStatusText.textContent = 'Status: Answer created. Send to Peer 1.';
    } catch (e) {
        console.error("Error creating answer or setting descriptions:", e);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Error creating answer.';
        isPlayerOne = null; 
    }
}

async function setRemoteDescription() {
    if (!remoteSdpTextarea || !p2pStatusText) {
         console.error("Cannot set remote SDP: UI elements missing.");
        return;
    }
    const remoteSdpValue = remoteSdpTextarea.value;
    if (!remoteSdpValue) {
        alert("Paste remote SDP first!");
        console.warn("Remote SDP text is empty.");
        return;
    }
    console.log("Setting remote description with SDP:", remoteSdpValue);
    
    let sdpInit: RTCSessionDescriptionInit;
    try {
        sdpInit = JSON.parse(remoteSdpValue) as RTCSessionDescriptionInit;
    } catch (e) {
        alert("Invalid JSON in remote SDP textarea.");
        console.error("Error parsing remote SDP JSON:", e, "\nInput:", remoteSdpValue);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Invalid remote SDP format.';
        return;
    }

    if (!peerConnection) {
       if (sdpInit.type === 'offer') {
           console.log("PeerConnection not initialized, and received an offer. Initializing as Peer 2.");
           isPlayerOne = false;
           if (localIceTextarea) localIceTextarea.value = '';
           await initPeerConnection(); // Now async
       } else {
           alert("Connection not initialized. Player 1 should 'Create Offer' first if this is an answer.");
           console.warn("Received non-offer SDP but PeerConnection is not initialized.");
           return;
       }
    }
    if (!peerConnection) { // Check again after conditional await
        alert("PeerConnection failed to initialize after attempting for offer.");
        console.error("PeerConnection still null after conditional init for offer.");
        return;
    }

    try {
        if (sdpInit.type === 'offer' && !isPlayerOne) { 
             console.log("Setting remote offer. This client is Peer 2.");
             if (localIceTextarea && peerConnection.signalingState === 'stable') localIceTextarea.value = ''; 
        } else if (sdpInit.type === 'answer' && isPlayerOne) { 
            console.log("Setting remote answer. This client is Peer 1.");
        }
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdpInit));
        console.log(`Remote description (${sdpInit.type}) set successfully.`);
        p2pStatusText.textContent = `Status: Remote ${sdpInit.type} set.`;
        remoteSdpTextarea.value = '';
    } catch (e) {
        console.error("Error setting remote description:", e, "\nSDP:", sdpInit);
        if (p2pStatusText) p2pStatusText.textContent = 'Status: Error setting remote description.';
    }
}

async function addRemoteIceCandidate() { 
    if (!peerConnection || !remoteIceTextarea || !p2pStatusText) {
        alert("Initialize connection or UI elements missing for adding ICE candidate.");
        console.warn("Cannot add remote ICE: PeerConnection or UI elements missing.");
        return;
    }
    const inputText = remoteIceTextarea.value.trim();
    if (!inputText) {
        alert("Paste remote ICE candidate(s) first! Each candidate JSON should be on a new line.");
        console.warn("Remote ICE textarea is empty.");
        return;
    }

    console.log("Attempting to add remote ICE candidates from textarea:\n", inputText);
    const candidatesTexts = inputText.split('\n');
    let successCount = 0;
    let errorCount = 0;
    let candidatesProcessed = 0;

    for (const candidateText of candidatesTexts) {
        const trimmedCandidateText = candidateText.trim();
        if (!trimmedCandidateText) {
            console.log("Skipping empty line in ICE candidates input.");
            continue; 
        }
        candidatesProcessed++;
        console.log(`Processing ICE candidate string (line ${candidatesProcessed}): ${trimmedCandidateText}`);
        try {
            const candidateInit = JSON.parse(trimmedCandidateText);
            if (candidateInit && (typeof candidateInit.candidate === 'string' || typeof candidateInit.sdpMid === 'string' || typeof candidateInit.sdpMLineIndex === 'number')) {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidateInit));
                console.log("Successfully added remote ICE candidate:", candidateInit);
                successCount++;
            } else {
                console.warn("Skipping invalid ICE candidate structure (parsed but not valid RTCIceCandidateInit):", trimmedCandidateText, "\nParsed:", candidateInit);
                errorCount++;
            }
        } catch (e) {
            console.error(`Error parsing or adding remote ICE candidate: "${trimmedCandidateText}"`, e);
            errorCount++;
        }
    }

    let statusMsg = "Status: ";
    if (candidatesProcessed === 0) {
        statusMsg += 'No ICE candidates found in input.';
    } else {
        statusMsg += `Processed ${candidatesProcessed} candidate(s). Added: ${successCount}. Failed: ${errorCount}.`;
        if (errorCount > 0) {
            statusMsg += " Check console for details.";
        }
    }
    p2pStatusText.textContent = statusMsg;
    console.log(statusMsg);

    if (successCount > 0 || candidatesProcessed > 0) { 
      remoteIceTextarea.value = '';
    }
}

function sendPlayerState() {
    if (dataChannel && dataChannel.readyState === 'open' && controls.isLocked && !isGameOver) {
        const playerObject = controls.getObject();
        const state: PlayerState = {
            position: { x: playerObject.position.x, y: playerObject.position.y, z: playerObject.position.z }, 
            quaternion: { x: camera.quaternion.x, y: camera.quaternion.y, z: camera.quaternion.z, w: camera.quaternion.w },
            aiming: isAimingWithMouseActual || isAimingWithKeyActual,
            weaponType: currentEquippedWeapon,
        };
        try {
            dataChannel.send(JSON.stringify({ type: 'playerState', data: state }));
        } catch (e) {
            console.error("Error sending player state:", e);
        }
    }
}

function sendGameEvent(event: GameEvent) {
    if (dataChannel && dataChannel.readyState === 'open') {
        try {
            dataChannel.send(JSON.stringify({ type: 'gameEvent', data: event }));
        } catch (e) {
            console.error("Error sending game event:", e, "\nEvent:", event);
        }
    }
}

function triggerRespawn() {
    const currentSpawnPoints = getSpawnPointsForCurrentMap();
    if (!controls || !scene || currentSpawnPoints.length === 0 || !prng) return;
    const playerObject = controls.getObject();
    let newSpawnPoint: THREE.Vector3;

    if (gameMode === 'multiplayer' && remotePlayerMesh && remotePlayerMesh.parent) { 
        const remotePlayerWorldPosition = new THREE.Vector3();
        remotePlayerMesh.getWorldPosition(remotePlayerWorldPosition); 
        
        newSpawnPoint = selectRandomSpawnPoint( 
            currentSpawnPoints,
            remotePlayerWorldPosition, 
            50 
        );
    } else {
        newSpawnPoint = selectRandomSpawnPoint(currentSpawnPoints); 
    }
    
    playerObject.position.copy(newSpawnPoint);
    playerObject.rotation.y = 0; 
    
    if(pitchObject) {
        pitchObject.rotation.x = 0; 
    }
    
    velocity.set(0,0,0);
    showTemporaryMessage("RESPAWNED!", 1500);
}

function handleGameOver(playerWon: boolean) {
    if (isGameOver) return;
    isGameOver = true;
    isFiringSMGActual = false; // Ensure SMG stops firing on game over
    controls.unlock();
    console.log(`Game Over. Player ${playerWon ? "WON" : "LOST"}. My PlayerOne status: ${isPlayerOne}`);

    const message = playerWon ? "YOU WIN!" : "YOU LOSE!";
    if (instructionOverlay && instructionText) {
        instructionOverlay.style.display = 'flex';
        instructionText.textContent = message;
        if (p2pInstructionText) p2pInstructionText.style.display = 'none';
    }
    if (dataChannel && dataChannel.readyState === 'open') { 
         const gameOverData: GameEventGameOverData = { winnerIsPlayerOne: playerWon ? isPlayerOne : (isPlayerOne === null ? null : !isPlayerOne) };
         console.log("Sending game_over_notif, data:", gameOverData);
         sendGameEvent({ type: 'game_over_notif', data: gameOverData });
    }

    setTimeout(() => {
        gameMode = 'idle';
        if (mainMenuDiv) mainMenuDiv.style.display = 'flex';
        if (gameContainer) gameContainer.style.display = 'none';
        if (instructionOverlay && instructionText) {
            instructionOverlay.style.display = 'none';
            instructionText.textContent = "Click to Start";
        }
        if (signalingPanel) signalingPanel.style.display = 'none';
    }, 5000);
}

function onWindowResize() { 
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function queueInput(action: () => void) { 
  pendingInputs.push({ timestamp: performance.now(), action });
}
function onKeyDown(event: KeyboardEvent) { 
  if (!controls || !controls.isLocked || isGameOver) return;
  switch (event.code) {
    case 'KeyW': case 'ArrowUp': queueInput(() => moveForwardActual = true); break;
    case 'KeyA': case 'ArrowLeft': queueInput(() => moveLeftActual = true); break;
    case 'KeyS': case 'ArrowDown': queueInput(() => moveBackwardActual = true); break;
    case 'KeyD': case 'ArrowRight': queueInput(() => moveRightActual = true); break;
    case 'ShiftLeft': queueInput(() => isAimingWithKeyActual = true); break;
    case 'Digit1': queueInput(() => equipWeapon('handgun')); break;
    case 'Digit2': queueInput(() => equipWeapon('sniper')); break;
    case 'Digit3': queueInput(() => equipWeapon('smg')); break;
    case 'KeyR': queueInput(() => startReload()); break;
    case 'PageUp': queueInput(() => adjustZeroing(25)); break; // Increase zeroing distance
    case 'PageDown': queueInput(() => adjustZeroing(-25)); break; // Decrease zeroing distance
  }
}
function onKeyUp(event: KeyboardEvent) { 
  if (isGameOver) { 
    if (event.code === 'ShiftLeft') queueInput(() => isAimingWithKeyActual = false);
    return;
  }
  switch (event.code) {
    case 'KeyW': case 'ArrowUp': queueInput(() => moveForwardActual = false); break;
    case 'KeyA': case 'ArrowLeft': queueInput(() => moveLeftActual = false); break;
    case 'KeyS': case 'ArrowDown': queueInput(() => moveBackwardActual = false); break;
    case 'KeyD': case 'ArrowRight': queueInput(() => moveRightActual = false); break;
    case 'ShiftLeft': queueInput(() => isAimingWithKeyActual = false); break;
  }
}
function onMouseDown(event: MouseEvent) { 
  if (!controls || !controls.isLocked || isGameOver || !prng) return;
  
  if (event.button === 0) { // Left click
    if (currentEquippedWeapon === 'smg') {
        isFiringSMGActual = true;
        // The first shot will be handled by the animate loop's SMG firing logic
    } else { // Handgun or Sniper - single shot
        const currentTime = performance.now();
        const currentWpnStats = weaponStatsDB[currentEquippedWeapon];
        if (!currentWpnStats || !currentWpnStats.fireRate) return;

        if (currentTime - lastFireTime < currentWpnStats.fireRate) {
            return; 
        }
        // lastFireTime will be updated inside the queued action for these weapons
        
        queueInput(() => {
          if (isGameOver) return; // Re-check in case game ended during input delay
          const actualFireTime = performance.now(); // Use actual fire time after delay
          if (actualFireTime - lastFireTime < currentWpnStats.fireRate!) return;
          lastFireTime = actualFireTime;

          const muzzleWorldPosition = new THREE.Vector3();
          currentWpnStats.muzzlePoint!.getWorldPosition(muzzleWorldPosition);
          
          // Check ammo and reload state before shooting
          if (currentAmmo[currentEquippedWeapon] <= 0 || isReloading) {
            return; // No ammo or reloading, can't shoot
          }
          
          const projectileDirection = new THREE.Vector3();
          camera.getWorldDirection(projectileDirection);

          spawnProjectileInternal(muzzleWorldPosition, projectileDirection.clone(), currentEquippedWeapon);
          
          // Consume ammo
          currentAmmo[currentEquippedWeapon]--;
          
          if (gameMode === 'multiplayer') {
            const shootEventData: GameEventShootData = {
                muzzlePosition: { x: muzzleWorldPosition.x, y: muzzleWorldPosition.y, z: muzzleWorldPosition.z },
                direction: { x: projectileDirection.x, y: projectileDirection.y, z: projectileDirection.z },
                weaponType: currentEquippedWeapon
            };
            sendGameEvent({ type: 'shoot', data: shootEventData });
          }

          if (currentWpnStats.model && !isWeaponRecoiling) {
            isWeaponRecoiling = true; 
            weaponRecoilTime = 0;
          }
        });
    }
  } else if (event.button === 2) { // Right click
    queueInput(() => isAimingWithMouseActual = true);
  }
}
function onMouseUp(event: MouseEvent) { 
  if (isGameOver) { 
      if (event.button === 2) queueInput(() => isAimingWithMouseActual = false);
      // For left mouse up, if SMG was firing, it's already handled by isFiringSMGActual = false in handleGameOver
      // or if controls unlock, it's also handled.
      return;
  }
  if (event.button === 0) { // Left click up
    if (isFiringSMGActual) {
        isFiringSMGActual = false;
    }
  } else if (event.button === 2) { // Right click up
    queueInput(() => isAimingWithMouseActual = false);
  }
}

function spawnProjectileInternal(muzzlePos: THREE.Vector3, projDir: THREE.Vector3, weaponType: 'handgun' | 'sniper' | 'smg') {
  if (!scene || !weaponStatsDB[weaponType] || !camera || !prng) return;

  const stats = weaponStatsDB[weaponType];
  const finalProjDir = projDir.clone(); // Clone to avoid modifying the original direction vector used for P2P

  // Apply spread for SMG
  if (weaponType === 'smg' && stats.spreadAngle && stats.projectileMaterial) {
    const currentIsAimingDownSights = isAimingWithMouseActual || isAimingWithKeyActual;
    const spreadMultiplier = currentIsAimingDownSights && stats.adsSpreadMultiplier !== undefined ? stats.adsSpreadMultiplier : 1.0;
    const currentSpreadConeAngle = stats.spreadAngle * spreadMultiplier;

    if (currentSpreadConeAngle > 0.001) { 
        const camQuaternion = camera.quaternion;
        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camQuaternion);
        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camQuaternion);

        const angle = prng.next() * 2 * Math.PI;
        const tanHalfAngle = Math.tan(currentSpreadConeAngle / 2);
        // Use prng.next() for radius. sqrt(prng.next()) gives uniform distribution over area, but this is simpler for small angles.
        const randomRadius = prng.next() * tanHalfAngle; 

        const offsetX = Math.cos(angle) * randomRadius;
        const offsetY = Math.sin(angle) * randomRadius;

        finalProjDir.addScaledVector(camRight, offsetX);
        finalProjDir.addScaledVector(camUp, offsetY);
        finalProjDir.normalize();
    }
  }
  
  // Apply zeroing adjustment for sniper rifle
  if (weaponType === 'sniper' && stats.projectileSpeed) {
    const zeroingAngle = calculateZeroingAngle(sniperZeroingDistance, stats.projectileSpeed);
    
    // Apply upward angle adjustment to compensate for bullet drop
    const camQuaternion = camera.quaternion.clone();
    const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camQuaternion);
    
    // Rotate the direction vector upward by the zeroing angle
    finalProjDir.addScaledVector(camUp, Math.sin(zeroingAngle));
    finalProjDir.normalize();
  }

  const projectileMesh = new THREE.Mesh(projectileGeometry, stats.projectileMaterial);
  projectileMesh.castShadow = true;
  projectileMesh.position.copy(muzzlePos);
  
  const projectile: Projectile = {
    mesh: projectileMesh,
    velocity: finalProjDir.multiplyScalar(stats.projectileSpeed!),
    lifeTime: 0,
    spawnTime: performance.now(),
    weaponType: weaponType,
  };
  scene.add(projectile.mesh);
  projectiles.push(projectile);
}

const _projectileCollisionRay = new THREE.Ray();
const _projectileIntersectionPoint = new THREE.Vector3();

function updateProjectiles(delta: number) {
  if (!scene) return;

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    
    const oldPosition = p.mesh.position.clone();
    
    // Apply gravity to velocity (negative Y direction)
    p.velocity.y -= GRAVITY * delta;
    
    // Update position with modified velocity
    p.mesh.position.addScaledVector(p.velocity, delta);
    p.lifeTime += delta;

    if (p.lifeTime > PROJECTILE_LIFETIME) {
      scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
      projectiles.splice(i, 1);
      continue;
    }
    
    _projectileCollisionRay.origin.copy(oldPosition);
    _projectileCollisionRay.direction.copy(p.mesh.position).sub(oldPosition);
    const projectileSegmentLength = _projectileCollisionRay.direction.length();

    if (projectileSegmentLength >= 0.0001) { 
        _projectileCollisionRay.direction.normalize();
    }
    
    let hitSomething = false;

    // Optimized target collision detection with caching and distance culling
    const projectilePosition = p.mesh.position;
    const maxCheckDistance = 50; // Only check targets within 50 units
    
    for (const [targetId, target] of targetMeshes.entries()) {
        // Distance culling - skip distant targets for performance
        const targetDistance = projectilePosition.distanceTo(target.position);
        if (targetDistance > maxCheckDistance) continue;
        
        // Use cached bounding box instead of calculating each frame
        const expandedTargetBox = targetBoundingBoxCache.get(targetId);
        if (!expandedTargetBox) continue;
        
        let intersectsThisFrame = false;
        if (projectileSegmentLength >= 0.0001) {
            const hitTargetPoint = _projectileCollisionRay.intersectBox(expandedTargetBox, _projectileIntersectionPoint);
            if (hitTargetPoint && oldPosition.distanceTo(hitTargetPoint) <= projectileSegmentLength) {
                intersectsThisFrame = true;
            }
        }
        
        if (intersectsThisFrame || expandedTargetBox.containsPoint(projectilePosition)) {
            scene.remove(target);
            if (target.geometry) target.geometry.dispose();
            if (target.material && !Array.isArray(target.material)) (target.material as THREE.Material).dispose();
            targetMeshes.delete(targetId);
            targetBoundingBoxCache.delete(targetId);
            hitSomething = true;
            break; 
        }
    }

    if (!hitSomething && gameMode === 'multiplayer' && remotePlayerMesh && remotePlayerMesh.parent) { 
        const remotePlayerBoundingBox = new THREE.Box3().setFromObject(remotePlayerMesh);
        const expandedRemotePlayerBox = remotePlayerBoundingBox.clone().expandByScalar(PLAYER_RADIUS); 
        
        let intersectsThisFrame = false;
        if (projectileSegmentLength >= 0.0001) {
            const hitRemotePlayerPoint = _projectileCollisionRay.intersectBox(expandedRemotePlayerBox, _projectileIntersectionPoint);
            if (hitRemotePlayerPoint && oldPosition.distanceTo(hitRemotePlayerPoint) <= projectileSegmentLength) {
                intersectsThisFrame = true;
            }
        }
            
        if (intersectsThisFrame || expandedRemotePlayerBox.containsPoint(p.mesh.position)) {
             const weaponStats = weaponStatsDB[p.weaponType];
             if (weaponStats && typeof weaponStats.damage === 'number') {
                sendGameEvent({ type: 'hit_opponent', data: { damageDealt: weaponStats.damage } as GameEventHitOpponentData });
             } else {
                sendGameEvent({ type: 'hit_opponent', data: { damageDealt: 1 } as GameEventHitOpponentData }); 
             }
             hitSomething = true;
             remotePlayerMesh.traverse(child => {
                 if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                     const originalColor = (child.material as THREE.MeshStandardMaterial).color.getHex();
                     (child.material as THREE.MeshStandardMaterial).color.setHex(0xff0000); 
                     setTimeout(() => {
                         if(child && child.material instanceof THREE.MeshStandardMaterial) { 
                             (child.material as THREE.MeshStandardMaterial).color.setHex(originalColor);
                         }
                     }, 150);
                 }
             });
        }
    }
    
    // Check collision with map features (walls, obstacles, buildings)
    if (!hitSomething) {
        for (const feature of mapFeatures) {
            const featureBoundingBox = new THREE.Box3().setFromObject(feature);
            
            // Expand the bounding box slightly to ensure collision detection
            const expansion = PROJECTILE_RADIUS;
            featureBoundingBox.expandByScalar(expansion);
            
            // Check if projectile intersects with the feature
            let intersectsThisFrame = false;
            if (projectileSegmentLength >= 0.0001) {
                const hitFeaturePoint = _projectileCollisionRay.intersectBox(featureBoundingBox, _projectileIntersectionPoint);
                if (hitFeaturePoint && oldPosition.distanceTo(hitFeaturePoint) <= projectileSegmentLength) {
                    intersectsThisFrame = true;
                }
            }
            
            if (intersectsThisFrame || featureBoundingBox.containsPoint(p.mesh.position)) {
                hitSomething = true;
                break;
            }
        }
    }
    
    // Terrain collision skipped for performance - bullets pass through terrain
    
    // Check collision with ground
    if (!hitSomething && groundMesh) {
        const groundBoundingBox = new THREE.Box3().setFromObject(groundMesh);
        
        // Check if projectile hits the ground
        let intersectsGround = false;
        if (projectileSegmentLength >= 0.0001) {
            const hitGroundPoint = _projectileCollisionRay.intersectBox(groundBoundingBox, _projectileIntersectionPoint);
            if (hitGroundPoint && oldPosition.distanceTo(hitGroundPoint) <= projectileSegmentLength) {
                intersectsGround = true;
            }
        }
        
        if (intersectsGround || groundBoundingBox.containsPoint(p.mesh.position)) {
            hitSomething = true;
        }
    }

    if (hitSomething) {
        scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
        projectiles.splice(i, 1);
    }
  }
}

function updateRemoteProjectiles(delta: number) {
    if (!scene) return;
    for (let i = remoteProjectiles.length - 1; i >= 0; i--) {
        const p = remoteProjectiles[i];
        
        const oldPosition = p.mesh.position.clone();
        
        // Apply gravity to remote projectiles as well
        p.velocity.y -= GRAVITY * delta;
        
        p.mesh.position.addScaledVector(p.velocity, delta);
        p.lifeTime += delta;

        if (p.lifeTime > PROJECTILE_LIFETIME) {
            scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
            remoteProjectiles.splice(i, 1);
            continue;
        }
        
        // Check collision with map features for remote projectiles
        let hitSomething = false;
        
        // Setup collision ray
        _projectileCollisionRay.origin.copy(oldPosition);
        _projectileCollisionRay.direction.copy(p.mesh.position).sub(oldPosition);
        const projectileSegmentLength = _projectileCollisionRay.direction.length();
        
        if (projectileSegmentLength >= 0.0001) {
            _projectileCollisionRay.direction.normalize();
        }
        
        // Check collision with map features
        for (const feature of mapFeatures) {
            const featureBoundingBox = new THREE.Box3().setFromObject(feature);
            featureBoundingBox.expandByScalar(PROJECTILE_RADIUS);
            
            let intersectsThisFrame = false;
            if (projectileSegmentLength >= 0.0001) {
                const hitFeaturePoint = _projectileCollisionRay.intersectBox(featureBoundingBox, _projectileIntersectionPoint);
                if (hitFeaturePoint && oldPosition.distanceTo(hitFeaturePoint) <= projectileSegmentLength) {
                    intersectsThisFrame = true;
                }
            }
            
            if (intersectsThisFrame || featureBoundingBox.containsPoint(p.mesh.position)) {
                hitSomething = true;
                break;
            }
        }
        
        // Check collision with ground
        if (!hitSomething && groundMesh) {
            const groundBoundingBox = new THREE.Box3().setFromObject(groundMesh);
            
            let intersectsGround = false;
            if (projectileSegmentLength >= 0.0001) {
                const hitGroundPoint = _projectileCollisionRay.intersectBox(groundBoundingBox, _projectileIntersectionPoint);
                if (hitGroundPoint && oldPosition.distanceTo(hitGroundPoint) <= projectileSegmentLength) {
                    intersectsGround = true;
                }
            }
            
            if (intersectsGround || groundBoundingBox.containsPoint(p.mesh.position)) {
                hitSomething = true;
            }
        }
        
        if (hitSomething) {
            scene.remove(p.mesh); if(p.mesh.geometry) p.mesh.geometry.dispose();
            remoteProjectiles.splice(i, 1);
        }
    }
}


function updateWeaponDynamics(delta: number) { 
  if (!camera || !weaponStatsDB[currentEquippedWeapon] || !scopeOverlay || !handgunModel || !sniperRifleModel || !smgModel || !prng) return;

  const stats = weaponStatsDB[currentEquippedWeapon];
  const weaponModel = stats.model!;
  const currentIsAimingDownSights = isAimingWithMouseActual || isAimingWithKeyActual;

  const targetFOV = currentIsAimingDownSights ? stats.adsFov! : NORMAL_FOV;
  camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, ADS_TRANSITION_SPEED * delta);
  camera.updateProjectionMatrix();

  const sniperScopeObject = sniperRifleModel.getObjectByName("sniperScopeMesh") as THREE.Mesh | undefined;

  if (currentEquippedWeapon === 'sniper') {
    scopeOverlay.style.display = currentIsAimingDownSights ? 'block' : 'none';
    if (sniperScopeObject && sniperRifleModel.visible) {
        sniperScopeObject.visible = !currentIsAimingDownSights;
    }
  } else { 
    scopeOverlay.style.display = 'none';
  }

  if (isWeaponRecoiling) {
    weaponRecoilTime += delta;
    let targetCameraPitchValue = 0;
    const targetWeaponOffsetValue = new THREE.Vector3();

    if (weaponRecoilTime <= stats.recoilDuration!) { 
        targetWeaponOffsetValue.x = (prng.next() - 0.5) * 2 * (stats.recoilAmount!.x || 0); 
        targetWeaponOffsetValue.z = stats.recoilAmount!.z;

        if (currentEquippedWeapon === 'sniper' && currentIsAimingDownSights) {
            targetCameraPitchValue = stats.recoilAmount!.y; 
        } else { 
            targetWeaponOffsetValue.y = stats.recoilAmount!.y; 
            let defaultPitchKick = 0.015;
            if (currentEquippedWeapon === 'sniper') defaultPitchKick = 0.020;
            else if (currentEquippedWeapon === 'smg') defaultPitchKick = 0.025; // Slightly more pitch kick for SMG hip/non-ADS sniper
            targetCameraPitchValue = defaultPitchKick; 
        }
    } 

    const lerpSpeedFactor = stats.recoilReturnSpeed! * delta;
    const actualLerpFactor = (weaponRecoilTime <= stats.recoilDuration!) ? lerpSpeedFactor * 2.5 : lerpSpeedFactor * 1.5;

    cameraPitchRecoil = THREE.MathUtils.lerp(cameraPitchRecoil, targetCameraPitchValue, actualLerpFactor);
    activeWeaponRecoilOffset.lerp(targetWeaponOffsetValue, actualLerpFactor);
    
    if (weaponRecoilTime > stats.recoilDuration!) {
        const isPitchSettled = Math.abs(cameraPitchRecoil) < 0.001 && Math.abs(targetCameraPitchValue) < 0.001;
        const isOffsetSettled = activeWeaponRecoilOffset.lengthSq() < 0.00001 && targetWeaponOffsetValue.lengthSq() < 0.00001;

        if (isPitchSettled && isOffsetSettled) {
            isWeaponRecoiling = false;
            weaponRecoilTime = 0;
            cameraPitchRecoil = 0;
            activeWeaponRecoilOffset.set(0,0,0);
        }
    }
  } else { 
      cameraPitchRecoil = THREE.MathUtils.lerp(cameraPitchRecoil, 0, stats.recoilReturnSpeed! * delta * 1.5); 
      activeWeaponRecoilOffset.lerp(new THREE.Vector3(0,0,0), stats.recoilReturnSpeed! * delta * 1.5); 
  }

  const baseTargetPosition = currentIsAimingDownSights ? stats.adsPosition! : stats.hipPosition!;
  const baseTargetRotation = currentIsAimingDownSights ? stats.adsRotation! : stats.hipRotation!;

  weaponModel.position.lerp(baseTargetPosition, ADS_TRANSITION_SPEED * delta);
  weaponModel.rotation.x = THREE.MathUtils.lerp(weaponModel.rotation.x, baseTargetRotation.x, ADS_TRANSITION_SPEED * delta);
  weaponModel.rotation.y = THREE.MathUtils.lerp(weaponModel.rotation.y, baseTargetRotation.y, ADS_TRANSITION_SPEED * delta);
  weaponModel.rotation.z = THREE.MathUtils.lerp(weaponModel.rotation.z, baseTargetRotation.z, ADS_TRANSITION_SPEED * delta);

  if (currentEquippedWeapon === 'sniper' && currentIsAimingDownSights) {
    weaponModel.rotation.x += cameraPitchRecoil; 
    weaponModel.position.x -= activeWeaponRecoilOffset.x; 
    weaponModel.position.z -= activeWeaponRecoilOffset.z; 
  } else {
    weaponModel.position.x -= activeWeaponRecoilOffset.x;
    weaponModel.position.y -= activeWeaponRecoilOffset.y; 
    weaponModel.position.z -= activeWeaponRecoilOffset.z; 
  }
  
  // RELOAD ANIMATION
  if (isReloading && stats.reloadTime) {
    weaponReloadTime += delta;
    const reloadProgress = Math.min(weaponReloadTime / (stats.reloadTime / 1000), 1.0);
    
    // Create smooth reload motion curve
    const reloadCurve = Math.sin(reloadProgress * Math.PI);
    const downwardCurve = Math.sin(reloadProgress * Math.PI * 2) * 0.5; // Double frequency for down-up motion
    
    weaponReloadOffset.y = -0.25 * reloadCurve; // Move weapon down
    weaponReloadOffset.z = 0.15 * downwardCurve; // Move weapon back and forth
    weaponReloadOffset.x = Math.sin(reloadProgress * Math.PI * 3) * 0.05; // Slight side wobble
    
    weaponModel.position.add(weaponReloadOffset);
  } else if (!isReloading) {
    weaponReloadTime = 0;
    weaponReloadOffset.set(0, 0, 0);
  }
}


function processPendingInputs() { 
  const currentTime = performance.now();
  let i = 0;
  while (i < pendingInputs.length) {
    if (currentTime >= pendingInputs[i].timestamp + INPUT_DELAY_MS) {
      pendingInputs[i].action();
      pendingInputs.splice(i, 1);
    } else {
      i++;
    }
  }
}

const playerCollider = new THREE.Box3();

function animate() {
  if (!isGameInitialized || !renderer || !scene || !camera || !controls) {
     if (gameMode === 'idle' && isGameInitialized && (!mainMenuDiv?.style.display || mainMenuDiv?.style.display === 'flex')) {
        if(peerConnection && !isGameOver) resetP2PState();
        return;
     }
    requestAnimationFrame(animate);
    return;
  }
  requestAnimationFrame(animate);

  if (isGameOver) {
      renderer.render(scene, camera);
      return;
  }

  const time = performance.now();
  const delta = controls.isLocked ? Math.min((time - prevTime) / 1000, 0.05) : 0;
  prevTime = time;


  if (controls.isLocked) {
    processPendingInputs();

    // SMG Full Auto Fire Logic
    if (isFiringSMGActual && currentEquippedWeapon === 'smg' && !isGameOver && prng) {
        const smgStats = weaponStatsDB.smg;
        if (smgStats && smgStats.fireRate && (time - lastFireTime >= smgStats.fireRate)) {
            lastFireTime = time;

            const muzzleWorldPosition = new THREE.Vector3();
            smgStats.muzzlePoint!.getWorldPosition(muzzleWorldPosition);
            
            // Check ammo and reload state before shooting
            if (currentAmmo['smg'] <= 0 || isReloading) {
                isFiringSMGActual = false; // Stop auto-fire when out of ammo or reloading
                return;
            }
            
            const projectileDirection = new THREE.Vector3();
            camera.getWorldDirection(projectileDirection);

            spawnProjectileInternal(muzzleWorldPosition, projectileDirection.clone(), 'smg');
            
            // Consume ammo
            currentAmmo['smg']--;
            
            if (gameMode === 'multiplayer') {
                const shootEventData: GameEventShootData = {
                    muzzlePosition: { x: muzzleWorldPosition.x, y: muzzleWorldPosition.y, z: muzzleWorldPosition.z },
                    direction: { x: projectileDirection.x, y: projectileDirection.y, z: projectileDirection.z },
                    weaponType: 'smg'
                };
                sendGameEvent({ type: 'shoot', data: shootEventData });
            }

            if (smgStats.model && !isWeaponRecoiling) {
                isWeaponRecoiling = true; 
                weaponRecoilTime = 0;
            }
        }
    }
    
    // Handle reload timing
    if (isReloading) {
        const currentWeaponStats = weaponStatsDB[currentEquippedWeapon];
        if (currentWeaponStats && currentWeaponStats.reloadTime) {
            if (time - reloadStartTime >= currentWeaponStats.reloadTime) {
                // Reload complete
                currentAmmo[currentEquippedWeapon] = currentWeaponStats.magazineCapacity || 0;
                isReloading = false;
                weaponReloadTime = 0; // Reset reload animation timer
                weaponReloadOffset.set(0, 0, 0); // Reset reload animation offset
            }
        }
    }

    const playerObject = controls.getObject(); 
    const currentSpeed = MOVEMENT_SPEED * ((isAimingWithKeyActual || isAimingWithMouseActual) ? 0.6 : 1.0);
    velocity.x -= velocity.x * 10.0 * delta; velocity.z -= velocity.z * 10.0 * delta;
    direction.z = Number(moveForwardActual) - Number(moveBackwardActual);
    direction.x = Number(moveLeftActual) - Number(moveRightActual);
    direction.normalize();
    if (moveForwardActual || moveBackwardActual) velocity.z -= direction.z * currentSpeed * 10.0 * delta;
    if (moveLeftActual || moveRightActual) velocity.x -= direction.x * currentSpeed * 10.0 * delta;
    const intendedMove = new THREE.Vector3();
    intendedMove.x = velocity.x * delta; intendedMove.z = velocity.z * delta;
    const originalPosition = playerObject.position.clone();
    
    // Try X movement first
    playerObject.translateX(intendedMove.x);
    playerCollider.setFromCenterAndSize( new THREE.Vector3(playerObject.position.x, originalPosition.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, playerObject.position.z), new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT - PLAYER_RADIUS*2 , PLAYER_RADIUS * 2) );
    // Check collision with regular map features
    for (const feature of mapFeatures) { 
        const featureBox = new THREE.Box3().setFromObject(feature); 
        if (playerCollider.intersectsBox(featureBox)) { 
            playerObject.position.x = originalPosition.x; 
            velocity.x = 0; 
            break; 
        } 
    }
    
    // Check collision with terrain (mountain maps)
    if (currentMapType === MapType.MOUNTAIN && cachedTerrainMeshes.length > 0) {
        for (const terrainMesh of cachedTerrainMeshes) {
            const terrainBox = new THREE.Box3().setFromObject(terrainMesh);
            if (playerCollider.intersectsBox(terrainBox)) {
                playerObject.position.x = originalPosition.x;
                velocity.x = 0;
                break;
            }
        }
    }
    
    // Try Z movement
    playerObject.translateZ(intendedMove.z);
    playerCollider.setFromCenterAndSize( new THREE.Vector3(playerObject.position.x, originalPosition.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, playerObject.position.z), new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT- PLAYER_RADIUS*2, PLAYER_RADIUS * 2) );
    // Check collision with regular map features
    for (const feature of mapFeatures) { 
        const featureBox = new THREE.Box3().setFromObject(feature); 
        if (playerCollider.intersectsBox(featureBox)) { 
            playerObject.position.z = originalPosition.z; 
            velocity.z = 0; 
            break; 
        } 
    }
    
    // Check collision with terrain (mountain maps)
    if (currentMapType === MapType.MOUNTAIN && cachedTerrainMeshes.length > 0) {
        for (const terrainMesh of cachedTerrainMeshes) {
            const terrainBox = new THREE.Box3().setFromObject(terrainMesh);
            if (playerCollider.intersectsBox(terrainBox)) {
                playerObject.position.z = originalPosition.z;
                velocity.z = 0;
                break;
            }
        }
    }
    
    // Final combined movement check to prevent corner clipping
    const finalCollider = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(playerObject.position.x, originalPosition.y - PLAYER_HEIGHT / 2 + PLAYER_RADIUS, playerObject.position.z),
        new THREE.Vector3(PLAYER_RADIUS * 2, PLAYER_HEIGHT - PLAYER_RADIUS * 2, PLAYER_RADIUS * 2)
    );
    
    for (const feature of mapFeatures) {
        const featureBox = new THREE.Box3().setFromObject(feature);
        if (finalCollider.intersectsBox(featureBox)) {
            // Revert to original position if final position causes collision
            playerObject.position.x = originalPosition.x;
            playerObject.position.z = originalPosition.z;
            velocity.x = 0;
            velocity.z = 0;
            break;
        }
    }
    const rayOrigin = playerObject.position.clone(); rayOrigin.y += PLAYER_HEIGHT * 0.5;
    const rayDirection = new THREE.Vector3(0, -1, 0);
    const groundRaycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, PLAYER_HEIGHT * 2);
    // Collect all meshes for collision detection, including terrain children
    const allCollidableObjects: THREE.Object3D[] = [groundMesh];
    
    // Add regular map features
    mapFeatures.forEach(f => {
        const featureBox = new THREE.Box3().setFromObject(f);
        if (featureBox.max.y < rayOrigin.y + PLAYER_HEIGHT * 0.5) {
            allCollidableObjects.push(f);
        }
    });
    
    // For mountain maps, add cached terrain meshes for performance
    if (currentMapType === MapType.MOUNTAIN && cachedTerrainMeshes.length > 0) {
        allCollidableObjects.push(...cachedTerrainMeshes);
    }
    
    const intersects = groundRaycaster.intersectObjects(allCollidableObjects, false);
    
    if (intersects.length > 0) { 
        const closestIntersect = intersects[0]; 
        const newY = closestIntersect.point.y + PLAYER_HEIGHT;
        playerObject.position.y = newY;
    }
    else { 
        playerObject.position.y -= 9.81 * delta * delta * 2; 
    }

    if (pitchObject) {
        const basePitchByMouse = pitchObject.rotation.x; 
        let finalPitch = basePitchByMouse - cameraPitchRecoil; 
        pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, finalPitch));
    }

    if (gameMode === 'multiplayer' && time - lastSentStateTime > STATE_SEND_INTERVAL) { sendPlayerState(); lastSentStateTime = time; }
  } else { 
      velocity.set(0,0,0); 
      if (pitchObject && cameraPitchRecoil !== 0) {
          const basePitchByMouse = pitchObject.rotation.x;
          let finalPitch = basePitchByMouse - cameraPitchRecoil;
          pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, finalPitch));
      }
  }
  
  updateWeaponDynamics(delta); 
  updateProjectiles(delta);
  if (gameMode === 'multiplayer') updateRemoteProjectiles(delta);
  
  updateAmmoDisplay();

  renderer.render(scene, camera);
}

initializeApp();
