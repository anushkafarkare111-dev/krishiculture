import { useState } from 'react';
import { TrendingUp, Handshake, MessageSquare } from 'lucide-react';
import { Header } from '@/components/Header';
import { CropWealth } from '@/components/CropWealth';
import { BuyerLedger } from '@/components/BuyerLedger';
import { Assistant } from '@/components/Assistant';
import { PitchFooter } from '@/components/PitchFooter';
import type { Lang } from '@/i18n';
import { tr } from '@/i18n';

type Tab = 'wealth' | 'buyers' | 'chat';

function App() {
  const [lang, setLang] = useState<Lang>('hi');
  const [tab, setTab] = useState<Tab>('wealth');

  const tabs: { id: Tab; label: string; icon: typeof TrendingUp }[] = [
    { id: 'wealth', label: tr('tabWealth', lang), icon: TrendingUp },
    { id: 'buyers', label: tr('tabBuyers', lang), icon: Handshake },
    { id: 'chat', label: tr('tabChat', lang), icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      <Header lang={lang} onToggleLang={() => setLang((l) => (l === 'hi' ? 'en' : 'hi'))} />

      <main className="mx-auto max-w-md px-4 pb-8 pt-4">
        <nav className="mb-4 grid grid-cols-3 gap-2 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-sand-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-bold transition ${
                tab === id ? 'bg-clay-500 text-white shadow-sm' : 'text-slate2-500 hover:bg-sand-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-5">
          {tab === 'wealth' && <CropWealth lang={lang} />}
          {tab === 'buyers' && <BuyerLedger lang={lang} />}
          {tab === 'chat' && <Assistant lang={lang} />}
        </div>

        <div className="mt-5">
          <PitchFooter lang={lang} />
        </div>
      </main>

      <footer className="mx-auto max-w-md px-4 pb-8 text-center text-[11px] text-slate2-400">
        {tr('footerNote', lang)}
      </footer>
    </div>
  );
}

export default App;
