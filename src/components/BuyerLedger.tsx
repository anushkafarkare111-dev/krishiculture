import { Phone, ShieldCheck, Building2 } from 'lucide-react';
import type { Lang } from '@/i18n';
import { tr } from '@/i18n';

interface Buyer {
  id: string;
  name: string;
  nameHi: string;
  crop: string;
  cropHi: string;
  pricePerKg: number;
  phone: string;
  badge: string;
}

const BUYERS: Buyer[] = [
  { id: '1', name: 'BigBasket Procurement', nameHi: 'बिगबास्केट खरीद', crop: 'Tomato', cropHi: 'टमाटर', pricePerKg: 28, phone: '98765-43210', badge: 'Corporate' },
  { id: '2', name: 'Nafed Mandi', nameHi: 'नाफेड मंडी', crop: 'Wheat', cropHi: 'गेहूं', pricePerKg: 24, phone: '98111-22345', badge: 'Govt' },
  { id: '3', name: 'Reliance Fresh Sourcing', nameHi: 'रिलायंस फ्रेश', crop: 'Rice', cropHi: 'धान', pricePerKg: 31, phone: '99000-55678', badge: 'Corporate' },
  { id: '4', name: 'ITC e-Choupal Hub', nameHi: 'आईटीसी ई-चौपाल', crop: 'Wheat', cropHi: 'गेहूं', pricePerKg: 25, phone: '98222-67890', badge: 'Verified' },
];

export function BuyerLedger({ lang }: { lang: Lang }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-sand-200">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🤝</span>
        <div>
          <h2 className="font-display text-lg font-extrabold text-slate2-900">{tr('buyersTitle', lang)}</h2>
          <p className="text-xs text-slate2-400">{tr('buyersSub', lang)}</p>
        </div>
      </div>

      {/* guaranteed banner */}
      <div className="mb-4 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2.5 ring-1 ring-amber-200">
        <ShieldCheck className="h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-xs font-bold text-amber-800">
          {lang === 'en'
            ? 'All prices are officially guaranteed — no market loss.'
            : 'सभी कीमतें आधिकारिक रूप से गारंटीड हैं — बाज़ार में नुकसान नहीं।'}
        </p>
      </div>

      <div className="space-y-3">
        {BUYERS.map((b) => (
          <div key={b.id} className="rounded-2xl bg-sand-50 p-4 ring-1 ring-sand-200 transition hover:ring-clay-300">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 shrink-0 text-clay-500" />
                  <h3 className="truncate text-sm font-bold text-slate2-900">
                    {lang === 'hi' ? b.nameHi : b.name}
                  </h3>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate2-100 px-2.5 py-0.5 text-[11px] font-bold text-slate2-700">
                    {lang === 'hi' ? b.cropHi : b.crop}
                  </span>
                  <span className="flex items-center gap-0.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                    ₹{b.pricePerKg}/kg
                    <span className="text-amber-500">· {tr('guaranteed', lang)}</span>
                  </span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${b.phone}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-clay-500 px-4 py-3.5 text-base font-bold text-white transition active:scale-95 hover:bg-clay-600"
            >
              <Phone className="h-5 w-5" />
              📞 {b.phone}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
