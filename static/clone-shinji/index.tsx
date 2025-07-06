
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { createRoot } from 'react-dom/client';

// SpeechRecognition interface for cross-browser compatibility
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

// Message structure
interface Message {
  role: 'user' | 'model';
  text: string;
}

// SVG Icons as React components
const MicIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5.4-3a5.4 5.4 0 0 1-10.8 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-1.6z"/></svg>
);

const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/></svg>
);

const SpeakerIcon: React.FC = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
);

// Avatar Component
interface AvatarProps {
  isThinking: boolean;
  isSpeaking: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ isThinking, isSpeaking }) => {
  const avatarClasses = [
    'avatar',
    isThinking ? 'thinking' : '',
    isSpeaking ? 'speaking' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="avatar-container">
      <svg className={avatarClasses} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="grad-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: 'rgba(138, 43, 226, 0.5)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgba(138, 43, 226, 0)', stopOpacity: 1}} />
            </radialGradient>
        </defs>
        <circle className="avatar-glow" cx="50" cy="50" r="50" fill="url(#grad-glow)" />
        <g className="avatar-body">
            <circle cx="50" cy="50" r="40" fill="#2a2a2a" stroke="#8a2be2" strokeWidth="2" />
            <circle cx="38" cy="45" r="4" fill="white" />
            <circle cx="62" cy="45" r="4" fill="white" />
            <rect className="mouth" x="42" y="62" width="16" height="4" rx="2" fill="white" />
            <path d="M 50 10 L 50 20" stroke="white" strokeWidth="1.5" />
            <circle className="antenna-light" cx="50" cy="10" r="3" fill="white" />
        </g>
      </svg>
    </div>
  );
};


const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isTakingSnapshot, setIsTakingSnapshot] = useState(false);

  const conversationHistory = useRef<Message[]>([]);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const speechSubmitTimeoutRef = useRef<number | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Refs for audio playback queue
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const audioPlaybackIndexRef = useRef(0);

  // Helper function to play audio chunks sequentially
  const playAudioQueue = () => {
      if (!audioQueueRef.current || audioPlaybackIndexRef.current >= audioQueueRef.current.length) {
          setIsSpeaking(false);
          setSpeakingMessageIndex(null);
          currentAudioRef.current = null;
          return;
      }

      const audioSrc = audioQueueRef.current[audioPlaybackIndexRef.current];
      const audio = new Audio(audioSrc);
      currentAudioRef.current = audio;
      
      audio.play().catch(e => console.error("Audio playback error:", e));

      audio.onended = () => {
          audioPlaybackIndexRef.current++;
          playAudioQueue();
      };
      audio.onerror = (e) => {
          console.error("Audio error:", e);
          audioPlaybackIndexRef.current++;
          playAudioQueue(); // Skip to next on error
      }
  };


  // Text-to-Speech function using backend API
  const speak = async (text: string, index: number) => {
    // 1. Stop any currently playing audio and clear state
    if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.onended = null;
    }
    audioQueueRef.current = [];
    audioPlaybackIndexRef.current = 0;
    
    // Don't set speaking state yet, wait for TTS API response
    setError(null);

    // 2. Clean the text to remove unreadable characters before synthesis
    const cleanedText = text
      .replace(/`{1,3}[\s\S]*?`{1,3}/g, '') // Remove markdown code blocks
      .replace(/(\*\*|__|\*|_|`)/g, '')      // Remove markdown emphasis
      .replace(/https?:\/\/[^\s]+/g, '')   // Remove URLs
      .replace(/【|】|『|』|「|」/g, '')     // Remove decorative brackets
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '') // Remove emojis
      .trim();

    // 3. Split text into sentences and filter empty chunks
    const chunks = (cleanedText.match(/[^。？！\n]+([。？！\n]|$)/g) || []).filter((c: string) => c.trim());
    if (chunks.length === 0) {
        // No need to set speaking state as it wasn't set yet
        return;
    }

    // 4. Fetch audio for all chunks in parallel using backend API
    try {
        const audioPromises = chunks.map(chunk => {
            return fetch('/api/text-to-speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: chunk.trim() }),
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`TTS API Error: ${response.status}`);
                }
                const data = await response.json();
                if (!data.audio_content) return null;
                return `data:audio/mp3;base64,${data.audio_content}`;
            });
        });

        const resolvedAudio = await Promise.all(audioPromises);
        audioQueueRef.current = resolvedAudio.filter((src): src is string => src !== null);
        
        if (audioQueueRef.current.length > 0) {
            // Set speaking state only when audio is ready to play
            setIsSpeaking(true);
            setSpeakingMessageIndex(index);
            audioPlaybackIndexRef.current = 0;
            playAudioQueue();
        } else {
            throw new Error("すべての音声チャンクの生成に失敗しました。");
        }

    } catch (e: any) {
        console.error("Failed to synthesize speech:", e);
        setError(`音声の生成に失敗しました: ${e.message}`);
        // No need to clear speaking state as it wasn't set yet
    }
  };


  // Initialize Speech Recognition
  useEffect(() => {
    try {
      const welcomeMessage: Message = { role: 'model', text: 'やあ！俺はしんじのAIアシスタント。あんたの顔、見えてるぜ。マイクのアイコンを押して、気軽に話しなよ。' };
      setMessages([welcomeMessage]);
      conversationHistory.current = [welcomeMessage];
      setTimeout(() => speak(welcomeMessage.text, 0), 100);

    } catch (e) {
      console.error(e);
      setError("AIの初期化に失敗しました。");
    }

    // Speech Recognition setup
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'ja-JP';

      recognition.onresult = (event: any) => {
        if (speechSubmitTimeoutRef.current) {
            clearTimeout(speechSubmitTimeoutRef.current);
        }
        const fullTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');

        finalTranscriptRef.current = fullTranscript;
        setInput(fullTranscript); 

        speechSubmitTimeoutRef.current = window.setTimeout(() => {
          recognition.stop();
        }, 1200);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
        if (speechSubmitTimeoutRef.current) {
            clearTimeout(speechSubmitTimeoutRef.current);
        }
        const transcriptToSubmit = finalTranscriptRef.current.trim();
        if (transcriptToSubmit) {
          handleSubmit(null, transcriptToSubmit);
        }
        finalTranscriptRef.current = '';
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setError(`音声認識エラー: ${event.error}`);
        if (speechSubmitTimeoutRef.current) {
            clearTimeout(speechSubmitTimeoutRef.current);
        }
        setIsRecording(false);
      };
    }
    
    return () => {
      if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.onended = null;
      }
    };
  }, []);


  // Webcam effect
  useEffect(() => {
    let streamInstance: MediaStream | null = null;
    const enableWebcam = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamInstance = stream;
          setVideoStream(stream);
        } catch (err) {
          console.error("Error accessing webcam:", err);
          setCameraError("カメラにアクセスできませんでした。プライバシー設定を確認してください。");
        }
      } else {
        setCameraError("このブラウザはカメラ機能をサポートしていません。");
      }
    };
    enableWebcam();

    return () => {
      if (streamInstance) {
          streamInstance.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Attach stream to video element
  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);


  // Scroll to bottom effect
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  
  
  const captureFrameAsBase64 = (): string | null => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg').split(',')[1];
  };

  // Handle form submission (can be triggered by text or voice)
  const handleSubmit = async (e: FormEvent | null, voiceInput?: string) => {
    e?.preventDefault();
    const currentInput = voiceInput || input;
    if (!currentInput.trim() || isLoading) return;
    
    if (isSpeaking && currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.onended = null;
      setIsSpeaking(false);
      setSpeakingMessageIndex(null);
    }

    setIsTakingSnapshot(true);
    const frame = captureFrameAsBase64();
    setTimeout(() => setIsTakingSnapshot(false), 500);

    const userMessage: Message = { role: 'user', text: currentInput };
    setMessages(prev => [...prev, userMessage]);
    conversationHistory.current.push(userMessage);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const requestBody = {
        message: currentInput,
        image_data: frame || undefined,
      };
      
      const response = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      const modelMessage: Message = { role: 'model', text: data.text };
      
      setMessages(prev => {
        const newMessages = [...prev, modelMessage];
        // Don't start speaking immediately, wait for TTS API response
        return newMessages;
      });
      
      // Start speaking after message is added to UI
      await speak(modelMessage.text, messages.length);
      
      conversationHistory.current.push(modelMessage);

    } catch (e) {
      console.error(e);
      setError("メッセージの送信中にエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle microphone button click
  const handleToggleRecording = () => {
    if (!SpeechRecognition) {
        setError("お使いのブラウザは音声認識をサポートしていません。");
        return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setInput('');
      finalTranscriptRef.current = '';
      if(isSpeaking && currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.onended = null;
          setIsSpeaking(false);
          setSpeakingMessageIndex(null);
      }
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };


  return (
    <div className="chat-container">
      <Avatar isThinking={isLoading} isSpeaking={isSpeaking} />
      
      <div className={`user-video-container ${isTakingSnapshot ? 'snapshot' : ''}`}>
        {videoStream && (
          <video 
            ref={videoRef} 
            className="user-video" 
            autoPlay 
            playsInline 
            muted 
          />
        )}
        {cameraError && !videoStream && <div className="camera-error-notice">{cameraError}</div>}
      </div>

      <div className="message-list" ref={messageListRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.text}
            {msg.role === 'model' && isSpeaking && speakingMessageIndex === index && (
                <div className="speaker-icon"><SpeakerIcon /></div>
            )}
          </div>
        ))}
        {isLoading && (
           <div className="message model">
            <div className="loading-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
           </div>
        )}
         {error && <div className="message model" style={{backgroundColor: '#ff4444'}}>{error}</div>}
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isRecording ? "話してください..." : "メッセージを入力..."}
          aria-label="Your message"
          disabled={isLoading || isRecording || isSpeaking}
        />
        {SpeechRecognition && (
            <button 
                type="button" 
                className={`mic-button ${isRecording ? 'recording' : ''}`}
                onClick={handleToggleRecording}
                disabled={isLoading || isSpeaking}
                aria-label={isRecording ? '録音を停止' : '録音を開始'}
            >
                <MicIcon />
            </button>
        )}
        <button 
            type="submit" 
            className="send-button" 
            disabled={isLoading || !input.trim() || isRecording || isSpeaking}
            aria-label="メッセージを送信"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

// Render the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
