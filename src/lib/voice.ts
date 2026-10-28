const PREFIX = 'agri_mitra_';

interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}
interface SpeechRecognitionResultList {
  length: number;
  [index: number]: { length: number; [index: number]: SpeechRecognitionResultItem };
  isFinal: boolean;
}
interface SpeechRecognitionEventLike {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: unknown) => void) | null;
  start: () => void;
  stop: () => void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function speak(text: string, lang: 'en' | 'hi'): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  u.rate = 0.92;
  u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find((v) => v.lang.startsWith(lang === 'hi' ? 'hi' : 'en'));
  if (match) u.voice = match;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isRecognitionSupported(): boolean {
  return getRecognitionCtor() !== null;
}

export interface VoiceHandlers {
  start: (onText: (text: string) => void, onEnd: () => void) => void;
  stop: () => void;
}

export function createVoiceRecognizer(lang: 'en' | 'hi'): VoiceHandlers | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return null;
  let recognition: SpeechRecognitionLike | null = null;

  return {
    start(onText, onEnd) {
      recognition = new Ctor();
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (e: SpeechRecognitionEventLike) => {
        const text = e.results[0]?.[0]?.transcript ?? '';
        if (text) onText(text);
      };
      recognition.onend = () => onEnd();
      recognition.onerror = () => onEnd();
      recognition.start();
    },
    stop() {
      recognition?.stop();
      recognition = null;
    },
  };
}
