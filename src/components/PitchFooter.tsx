import { useState } from 'react';
import { ChevronDown, X, Check, Layers } from 'lucide-react';
import type { Lang } from '@/i18n';
import { tr } from '@/i18n';

export function PitchFooter({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="overflow-hidden rounded-3xl bg-slate2-900 text-white shadow-lg ring-1 ring-slate2-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-clay-500">
            <Layers className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="font-display text-base font-extrabold leading-tight">{tr('pitchTitle', lang)}</h2>
            <p className="text-[11px] font-medium text-slate2-400">{tr('pitchHint', lang)}</p>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-slate2-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="space-y-4 px-5 pb-5">
            <div className="rounded-2xl bg-slate2-800 p-4 ring-1 ring-slate2-700">
              <div className="mb-2 flex items-center gap-2">
                <X className="h-4 w-4 text-clay-400" />
                <h3 className="font-display text-sm font-bold tracking-wide text-clay-300 uppercase">{tr('competitorLabel', lang)}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate2-300">{tr('competitorText', lang)}</p>
            </div>

            <div className="rounded-2xl bg-amber-400/10 p-4 ring-1 ring-amber-400/30">
              <div className="mb-2 flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <h3 className="font-display text-sm font-bold tracking-wide text-amber-300 uppercase">{tr('matrixLabel', lang)}</h3>
              </div>
              <p className="text-sm leading-relaxed text-amber-50/90">{tr('matrixText', lang)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
