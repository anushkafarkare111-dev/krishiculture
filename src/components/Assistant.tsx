import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, Mic, Volume2, User, Sparkles, Check, Square } from 'lucide-react';
import type { Lang } from '@/i18n';
import { tr } from '@/i18n';
import { ScanModal } from '@/components/ScanModal';
import {
  speak,
  stopSpeaking,
  createVoiceRecognizer,
  isRecognitionSupported,
  type VoiceHandlers,
} from '@/lib/voice';

interface Msg {
  id: number;
  from: 'user' | 'ai';
  text: string;
  bullets?: string[];
}

let msgId = 3;

function generateAdvice(text: string, lang: Lang): { text: string; bullets: string[] } {
  const q = text.toLowerCase();
  if (q.includes('पानी') || q.includes('सिंचाई') || q.includes('water') || q.includes('irrigation')) {
    return lang === 'hi'
      ? {
          text: 'मित्र की सलाह:',
          bullets: [
            '💧 शाम के समय हल्की सिंचाई करें।',
            '🌾 जड़ के पास गीली घास बिछाएं (Mulching) — नमी बनी रहेगी।',
            '🔊 आवाज सुनें बटन दबाकर यह जानकारी सुन सकते हैं।',
          ],
        }
      : {
          text: 'Mitra says:',
          bullets: [
            '💧 Give light irrigation in the evening.',
            '🌾 Mulch with wet grass near roots to retain moisture.',
            '🔊 Tap Listen to hear this aloud.',
          ],
        };
  }
  if (q.includes('कीट') || q.includes('कीड़ा') || q.includes('pest') || q.includes('insect')) {
    return lang === 'hi'
      ? {
          text: 'मित्र की सलाह:',
          bullets: [
            '🌿 १ बाल्टी पानी में २ बोतल कैप नीम का तेल मिलाकर छिडकाव करें।',
            '🥛 छाछ + लहसुन का घोल — कीड़े तुरंत भाग जाएँगे।',
            '🔊 आवाज सुनें बटन दबाकर सुनें।',
          ],
        }
      : {
          text: 'Mitra says:',
          bullets: [
            '🌿 Mix 2 bottle caps of neem oil into 1 bucket of water and spray.',
            '🥛 Buttermilk + garlic spray — pests flee instantly.',
            '🔊 Tap Listen to hear this aloud.',
          ],
        };
  }
  return lang === 'hi'
    ? {
        text: 'मित्र की सलाह:',
        bullets: [
          '✅ आपका सवाल मिल गया — बिना इंटरनेट भी मदद मिलेगी।',
          '💡 विस्तार से पूछें — जैसे "पानी कम लग रहा है" या "कीड़े लग गए"।',
          '🔊 आवाज सुनें बटन दबाकर सुनें।',
        ],
      }
    : {
        text: 'Mitra says:',
        bullets: [
          '✅ Got your question — help works offline too.',
          '💡 Be specific — like "less water" or "pests appeared".',
          '🔊 Tap Listen to hear this aloud.',
        ],
      };
}

const DEMO_QUESTION = 'धान की फसल में पानी कम लग रहा है, क्या उपाय है?';

export function Assistant({ lang }: { lang: Lang }) {
  const [listening, setListening] = useState(false);
  const [spoken, setSpoken] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [scanOpen, setScanOpen] = useState(false);
  const [supported] = useState(isRecognitionSupported());
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<VoiceHandlers | null>(null);

  const respondTo = useCallback(
    (question: string) => {
      setMessages((m) => [...m, { id: msgId++, from: 'user', text: question }]);
      setTyping(true);
      window.setTimeout(() => {
        const advice = generateAdvice(question, lang);
        setTyping(false);
        setMessages((m) => [...m, { id: msgId++, from: 'ai', text: advice.text, bullets: advice.bullets }]);
      }, 1000);
    },
    [lang],
  );

  const runDemo = useCallback(() => {
    setSpoken(false);
    setMessages([]);
    msgId = 1;
    setMessages([{ id: 1, from: 'user', text: DEMO_QUESTION }]);
    setTyping(true);
    window.setTimeout(() => {
      const advice = generateAdvice(DEMO_QUESTION, lang);
      setTyping(false);
      setMessages((m) => [...m, { id: 2, from: 'ai', text: advice.text, bullets: advice.bullets }]);
    }, 1200);
  }, [lang]);

  useEffect(() => {
    if (messages.length === 0) runDemo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const handleMic = () => {
    if (typing) return;
    stopSpeaking();
    setSpoken(false);
    if (!supported) {
      runDemo();
      return;
    }
    if (listening) {
      recognizerRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = createVoiceRecognizer(lang);
    if (!rec) {
      runDemo();
      return;
    }
    recognizerRef.current = rec;
    setListening(true);
    rec.start(
      (text) => {
        setListening(false);
        respondTo(text);
      },
      () => setListening(false),
    );
  };

  const handleListen = () => {
    if (spoken) {
      stopSpeaking();
      setSpoken(false);
      return;
    }
    const aiMsg = [...messages].reverse().find((m) => m.from === 'ai');
    if (!aiMsg?.bullets) return;
    setSpoken(true);
    const fullText = [aiMsg.text, ...aiMsg.bullets].join('. ');
    speak(fullText, lang);
    window.setTimeout(() => setSpoken(false), fullText.length * 90 + 3000);
  };

  return (
    <section className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-sand-200">
      <div className="flex items-center gap-2 border-b border-sand-200 bg-sand-50 px-4 py-3">
        <Sparkles className="h-4 w-4 text-clay-500" />
        <p className="text-sm font-semibold text-slate2-700">{tr('chatIntro', lang)}</p>
      </div>

      <div ref={scrollRef} className="thin-scroll flex max-h-[340px] min-h-[260px] flex-col gap-3 overflow-y-auto bg-sand-50/50 px-4 py-4">
        {messages.map((m) =>
          m.from === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] animate-bubbleIn rounded-2xl rounded-br-md bg-clay-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm">
                <div className="mb-0.5 flex items-center gap-1.5 text-[11px] font-bold text-clay-100">
                  <User className="h-3 w-3" /> {tr('you', lang)}
                </div>
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div className="max-w-[90%] animate-bubbleIn rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-slate2-800 shadow-sm ring-1 ring-sand-200">
                <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-clay-600">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-clay-100 text-xs">🤖</span>
                  {tr('mitr', lang)}
                </div>
                <p className="mb-1.5 font-semibold text-slate2-900">{m.text}</p>
                <ul className="space-y-1.5">
                  {m.bullets?.map((b, i) => (
                    <li key={i} className="rounded-lg bg-sand-50 px-2.5 py-1.5 text-[13px] leading-relaxed text-slate2-700">
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleListen}
                  className="mt-2.5 flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-2 text-sm font-bold text-slate2-900 transition active:scale-95 hover:bg-amber-300"
                >
                  {spoken ? <Check className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {tr('listen', lang)} / आवाज सुनें
                </button>
              </div>
            </div>
          )
        )}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-sand-200">
              {[0, 150, 300].map((d) => (
                <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-clay-400" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-sand-200 bg-white px-4 py-4">
        <button
          onClick={handleMic}
          disabled={typing}
          className="relative flex flex-1 items-center justify-center gap-2 rounded-2xl bg-clay-500 px-4 py-4 text-base font-bold text-white shadow-md shadow-clay-500/30 transition active:scale-95 disabled:opacity-60 hover:bg-clay-600"
        >
          {!listening && !typing && (
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-clay-400/40 animate-pulseRing" />
          )}
          {listening ? <Square className="relative h-5 w-5" /> : <Mic className="relative h-5 w-5" />}
          <span className="relative">
            {listening ? tr('listening', lang) : `🎤 ${tr('mic', lang)} / Speak`}
          </span>
        </button>

        <button
          onClick={() => setScanOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-amber-100 px-4 py-4 text-base font-bold text-amber-800 ring-1 ring-amber-300 transition active:scale-95 hover:bg-amber-200"
        >
          <Camera className="h-5 w-5" />
          📸 {tr('scan', lang)} / Scan
        </button>
      </div>

      <ScanModal open={scanOpen} lang={lang} onClose={() => setScanOpen(false)} />
    </section>
  );
}
