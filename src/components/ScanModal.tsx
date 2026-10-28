import { useEffect, useState } from 'react';
import { X, Camera, ScanLine, RefreshCw, Leaf, Volume2, Check, FlaskConical, Droplet, Beaker } from 'lucide-react';
import type { Lang } from '@/i18n';
import { tr } from '@/i18n';
import { speak, stopSpeaking } from '@/lib/voice';

type Stage = 'photo' | 'analyzing' | 'result';

const LEAF_IMG =
  'https://images.pexels.com/photos/7799709/pexels-photo-7799709.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const STEPS_HI = ['तस्वीर ली जा रही है…', 'पत्ते के रंग जाँचे जा रहे हैं…', 'बीमारी के निशान…', 'जैविक उपाय तैयार…'];
const STEPS_EN = ['Capturing image…', 'Inspecting leaf color…', 'Detecting disease marks…', 'Preparing organic remedy…'];

// Container-measure organic remedy — household objects
const REMEDY_HI = [
  '🌿 पत्ता सल्फर की कमी दिखा रहा है — हल्का पीलापन।',
  '🧴 उपाय: १ बाल्टी (10 लीटर) पानी में २ बोतल-कैप नीम का तेल + ३ चम्मच बेकिंग सोडा मिलाएँ।',
  '💧 इस मिश्रण का छिडकाव हर 5 दिन में शाम को करें।',
  '🚫 रसायनिक कीटनाशक की ज़रूरत नहीं — घरेलू सामग्री काफी है।',
];
const REMEDY_EN = [
  '🌿 Leaf shows sulfur deficiency — mild yellowing.',
  '🧴 Remedy: Mix 2 bottle caps of neem oil + 3 tsp baking soda into 1 bucket (10L) of water.',
  '💧 Spray this mixture every 5 days in the evening.',
  '🚫 No chemical pesticide needed — household items are enough.',
];

export function ScanModal({ open, lang, onClose }: { open: boolean; lang: Lang; onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('photo');
  const [step, setStep] = useState(0);
  const [spoken, setSpoken] = useState(false);

  const steps = lang === 'hi' ? STEPS_HI : STEPS_EN;
  const remedies = lang === 'hi' ? REMEDY_HI : REMEDY_EN;

  useEffect(() => {
    if (!open) {
      stopSpeaking();
      setStage('photo');
      setStep(0);
      setSpoken(false);
    }
  }, [open]);

  const startAnalysis = () => {
    stopSpeaking();
    setStage('analyzing');
    setStep(0);
    const timers: number[] = [];
    steps.forEach((_, i) => timers.push(window.setTimeout(() => setStep(i), i * 250)));
    timers.push(window.setTimeout(() => { setStage('result'); setSpoken(false); }, 1000));
    return () => timers.forEach(clearTimeout);
  };

  const retake = () => {
    stopSpeaking();
    setSpoken(false);
    setStage('photo');
    setStep(0);
  };

  const handleListen = () => {
    if (spoken) { stopSpeaking(); setSpoken(false); return; }
    setSpoken(true);
    const fullText = remedies.join('. ');
    speak(fullText, lang);
    window.setTimeout(() => setSpoken(false), fullText.length * 90 + 3000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate2-900/60 backdrop-blur-sm animate-[floatUp_0.2s_ease-out]" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl animate-[floatUp_0.3s_ease-out] sm:rounded-3xl max-h-[92vh] flex flex-col">
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1.5 w-10 rounded-full bg-sand-300" />
        </div>

        <div className="flex items-center justify-between border-b border-sand-200 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-clay-100">
              <Leaf className="h-5 w-5 text-clay-600" />
            </div>
            <div>
              <h2 className="font-display text-base font-extrabold text-slate2-900">{tr('scanTitle', lang)}</h2>
              <p className="text-[11px] font-medium text-slate2-400">
                {stage === 'result' ? tr('scanDone', lang) : tr('scanHint', lang)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-sand-100 text-slate2-500 transition active:scale-90 hover:bg-sand-200"
            aria-label={tr('scanClose', lang)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="thin-scroll overflow-y-auto px-5 py-4">
          <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl ring-1 ring-sand-300 bg-slate2-900">
            <img src={LEAF_IMG} alt="scanned leaf" className="h-full w-full object-cover" />

            {stage === 'photo' && (
              <>
                <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-white/80" />
                <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-white/80" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-white/80" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-white/80" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-slate2-900/50 px-3 py-2 backdrop-blur">
                  <Camera className="h-3.5 w-3.5 text-white" />
                  <span className="text-[11px] font-semibold text-white">{tr('scanHint', lang)}</span>
                </div>
              </>
            )}

            {stage === 'analyzing' && (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-clay-900/30" />
                <div className="absolute inset-x-0 top-0 h-1 bg-amber-400 shadow-[0_0_12px_2px] shadow-amber-400/70 animate-[scanline_1s_ease-in-out_infinite]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center gap-2 rounded-2xl bg-slate2-900/70 px-4 py-3 backdrop-blur">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-300 border-t-transparent" />
                    <span className="text-xs font-semibold text-white">{steps[step]}</span>
                  </div>
                </div>
              </div>
            )}

            {stage === 'result' && (
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate2-900">
                <FlaskConical className="h-3.5 w-3.5" />
                {tr('scanDone', lang)}
              </span>
            )}
          </div>

          {stage === 'analyzing' && (
            <ul className="mx-auto mt-5 max-w-[260px] space-y-2">
              {steps.map((s, i) => (
                <li key={i} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${i <= step ? 'bg-amber-50 text-amber-800' : 'bg-sand-50 text-slate2-400'}`}>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${i < step ? 'bg-clay-500 text-white' : i === step ? 'bg-amber-400 text-slate2-900' : 'bg-sand-300 text-slate2-500'}`}>
                    {i < step ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          )}

          {stage === 'result' && (
            <div className="mt-5 space-y-4 animate-[floatUp_0.3s_ease-out]">
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-clay-500" />
                <h3 className="font-display text-sm font-extrabold text-slate2-900">{tr('scanResult', lang)}</h3>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
                <div className="mb-2 flex items-center gap-2">
                  <Beaker className="h-4 w-4 text-amber-600" />
                  <p className="text-[11px] font-bold tracking-wide text-amber-700 uppercase">{tr('scanRemedy', lang)}</p>
                </div>
                <ul className="space-y-2">
                  {remedies.map((r, i) => (
                    <li key={i} className="rounded-xl bg-white px-3 py-2.5 text-[13px] leading-relaxed text-slate2-800 ring-1 ring-amber-100">
                      {r}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleListen}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-clay-500 px-3 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-clay-600"
                >
                  {spoken ? <Check className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  🔊 {tr('scanListen', lang)}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-sand-200 bg-white px-5 py-4">
          {stage === 'photo' && (
            <button
              onClick={startAnalysis}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-clay-500 px-4 py-4 text-base font-extrabold text-white shadow-lg shadow-clay-500/30 transition active:scale-[0.98] hover:bg-clay-600"
            >
              <ScanLine className="h-5 w-5" />
              {tr('scanAnalyze', lang)}
            </button>
          )}
          {stage === 'analyzing' && (
            <div className="flex items-center justify-center gap-2 py-2 text-sm font-bold text-slate2-400">
              <RefreshCw className="h-4 w-4 animate-spin" />
              {tr('scanAnalyzing', lang)}
            </div>
          )}
          {stage === 'result' && (
            <button
              onClick={retake}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sand-100 px-4 py-4 text-base font-bold text-slate2-700 transition active:scale-[0.98] hover:bg-sand-200"
            >
              <RefreshCw className="h-5 w-5" />
              {tr('scanRetake', lang)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
