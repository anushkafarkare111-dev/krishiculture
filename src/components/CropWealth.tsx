import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, IndianRupee, Check } from 'lucide-react';
import type { Lang } from '@/i18n';
import { tr } from '@/i18n';

interface CropData {
  id: string;
  nameEn: string;
  nameHi: string;
  emoji: string;
  color: string;
  profit: number;
  cost: number;
  payout: number;
}

const CROPS: CropData[] = [
  { id: 'tomato', nameEn: 'Tomato', nameHi: 'टमाटर', emoji: '🍅', color: '#C2593F', profit: 74, cost: 12000, payout: 31000 },
  { id: 'rice', nameEn: 'Rice', nameHi: 'धान', emoji: '🌾', color: '#E5A93B', profit: 81, cost: 9000, payout: 28000 },
  { id: 'wheat', nameEn: 'Wheat', nameHi: 'गेहूं', emoji: '🌱', color: '#8B9D5A', profit: 88, cost: 8000, payout: 24000 },
];

function Gauge({ percent, color, label }: { percent: number; color: string; label: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const tm = window.setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(tm);
  }, [percent]);

  return (
    <div className="relative grid place-items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#EDE5D6" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={animated ? offset : c}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-extrabold text-slate2-900">{percent}%</span>
        <span className="text-[10px] font-bold tracking-wide text-slate2-400 uppercase">{label}</span>
      </div>
    </div>
  );
}

export function CropWealth({ lang }: { lang: Lang }) {
  const [selIdx, setSelIdx] = useState(2); // Wheat default
  const crop = CROPS[selIdx];
  const net = crop.payout - crop.cost;
  const isHigh = crop.profit >= 80;

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-sand-200">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">📈</span>
        <div>
          <h2 className="font-display text-lg font-extrabold text-slate2-900">{tr('wealthTitle', lang)}</h2>
          <p className="text-xs text-slate2-400">{tr('wealthSub', lang)}</p>
        </div>
      </div>

      {/* crop selector */}
      <div className="mb-5 flex gap-2.5">
        {CROPS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setSelIdx(i)}
            className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl px-2 py-3.5 transition active:scale-95 ${
              i === selIdx ? 'bg-slate2-900 text-white shadow-md' : 'bg-sand-100 text-slate2-700 ring-1 ring-sand-200 hover:bg-sand-200'
            }`}
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="text-xs font-bold leading-tight">{lang === 'hi' ? c.nameHi : c.nameEn}</span>
          </button>
        ))}
      </div>

      {/* gauge + status */}
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-sand-50 p-5">
        <Gauge percent={crop.profit} color={crop.color} label={tr('profitProb', lang)} />
        <div
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold ${
            isHigh ? 'bg-amber-100 text-amber-700' : 'bg-clay-100 text-clay-700'
          }`}
        >
          {isHigh ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {isHigh ? tr('successLabel', lang) : tr('warningLabel', lang)}
        </div>
      </div>

      {/* financial breakdown */}
      <div className="mt-4 space-y-2.5">
        <Row
          icon={<Wallet className="h-4 w-4" />}
          label={tr('estCosts', lang)}
          value={`${fmt(crop.cost)} ${tr('perAcre', lang)}`}
          color="text-clay-600"
        />
        <Row
          icon={<IndianRupee className="h-4 w-4" />}
          label={tr('marketPayout', lang)}
          value={`${fmt(crop.payout)} ${tr('perAcre', lang)}`}
          color="text-slate2-700"
        />
        <div className="flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3.5 ring-1 ring-amber-200">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-bold text-amber-800">{tr('netProfit', lang)}</span>
          </div>
          <span className="font-display text-lg font-extrabold text-amber-700">
            +{fmt(net)} <span className="text-xs font-semibold text-amber-500">{tr('perAcre', lang)}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function Row({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-sand-200">
      <div className="flex items-center gap-2">
        <span className={`${color}`}>{icon}</span>
        <span className="text-sm font-semibold text-slate2-600">{label}</span>
      </div>
      <span className={`font-display text-sm font-bold ${color}`}>{value}</span>
    </div>
  );
}
