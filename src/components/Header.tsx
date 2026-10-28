import { Sprout, Globe, WifiOff } from 'lucide-react';
import type { Lang } from '@/i18n';
import { tr } from '@/i18n';

export function Header({ lang, onToggleLang }: { lang: Lang; onToggleLang: () => void }) {
  return (
    <header className="sticky top-0 z-20 bg-slate2-900 text-white shadow-xl shadow-slate2-900/20">
      <div className="mx-auto max-w-md px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-clay-500 ring-1 ring-clay-400/40">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display truncate text-lg font-extrabold leading-tight tracking-tight">
                {tr('appName', lang)} <span className="font-semibold text-sand-300">/ क्रिशीकल्चर</span>
              </h1>
              <p className="truncate text-[11px] font-medium text-slate2-300">{tr('tagline', lang)}</p>
            </div>
          </div>

          <button
            onClick={onToggleLang}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-clay-500 px-3.5 py-2 text-sm font-bold text-white transition active:scale-95 hover:bg-clay-600"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {tr('langSwitch', lang)}
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 ring-1 ring-amber-400/30">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
          </span>
          <WifiOff className="h-3.5 w-3.5 text-amber-200" />
          <span className="text-[11px] font-semibold text-amber-50">
            🟢 {tr('edgeAi', lang)}
          </span>
        </div>
      </div>
    </header>
  );
}
