export type Lang = 'en' | 'hi';

type Dict = Record<string, { en: string; hi: string }>;

export const t: Dict = {
  appName: { en: 'Krishiculture', hi: 'क्रिशीकल्चर' },
  tagline: { en: 'Offline agrarian intelligence', hi: 'बिना इंटरनेट कृषि सहायक' },
  langSwitch: { en: 'हिंदी', hi: 'English' },
  edgeAi: { en: 'Edge-AI Client Processing: Active Without Internet', hi: 'एज-एआई: बिना इंटरनेट चालू' },

  // Tabs
  tabWealth: { en: 'Crop Wealth', hi: 'फसल मुनाफा' },
  tabBuyers: { en: 'Buyers', hi: 'थोक खरीदार' },
  tabChat: { en: 'Chat & Scan', hi: 'बातचीत व स्कैन' },

  // Crop Wealth Engine
  wealthTitle: { en: 'Crop Wealth Engine', hi: 'फसल मुनाफा मीटर' },
  wealthSub: { en: 'Tap a crop to see profit probability', hi: 'फसल चुनें — मुनाफा देखें' },
  profitProb: { en: 'Profit Probability', hi: 'मुनाफा संभावना' },
  successLabel: { en: 'High Success', hi: 'बढ़िया मुनाफा' },
  warningLabel: { en: 'Tight Margins', hi: 'मुनाफा कम' },
  estCosts: { en: 'Estimated Costs', hi: 'अनुमानित लागत' },
  marketPayout: { en: 'Assured Market Payout', hi: 'बाज़ार भुगतान' },
  netProfit: { en: 'Net Seasonal Profit', hi: 'सीज़न मुनाफा' },
  perAcre: { en: '/acre', hi: '/एकड़' },

  // Buyers
  buyersTitle: { en: 'Direct Wholesale Deals', hi: 'मंडी थोक खरीदार संपर्क' },
  buyersSub: { en: 'Guaranteed locked-in prices — no market loss', hi: 'कीमतें गारंटीड — नुकसान नहीं' },
  buyerCol: { en: 'Buyer', hi: 'खरीदार' },
  cropCol: { en: 'Crop', hi: 'फसल' },
  priceCol: { en: 'Locked Price', hi: 'लॉक कीमत' },
  callCol: { en: 'Call Now', hi: 'कॉल करें' },
  guaranteed: { en: 'Guaranteed', hi: 'गारंटीड' },
  verified: { en: 'Verified', hi: 'जाँची हुई' },

  // Chat & Scan
  chatTitle: { en: 'Chat & Scan Companion', hi: 'बातचीत व स्कैन सहायक' },
  chatIntro: { en: 'Ask by voice or scan a leaf — works offline.', hi: 'आवाज से पूछें या पत्ता स्कैन करें — बिना इंटरनेट।' },
  mic: { en: 'Tap to Speak', hi: 'बोलकर पूछें' },
  listening: { en: 'Listening…', hi: 'सुन रहा हूँ…' },
  scan: { en: 'Scan Leaf', hi: 'पत्ता स्कैन करें' },
  listen: { en: 'Listen', hi: 'आवाज सुनें' },
  you: { en: 'You', hi: 'आप' },
  mitr: { en: 'Mitra (AI)', hi: 'मित्र (एआई)' },
  mitrAdvice: { en: 'Mitra says:', hi: 'मित्र की सलाह:' },

  // Scan modal
  scanTitle: { en: 'Leaf Scanner', hi: 'पत्ता स्कैनर' },
  scanHint: { en: 'Point at a leaf, then tap Analyze.', hi: 'पत्ते पर लगाएँ, फिर जाँचें दबाएँ।' },
  scanAnalyze: { en: 'Analyze Leaf', hi: 'पत्ता जाँचें' },
  scanAnalyzing: { en: 'Analyzing leaf…', hi: 'पत्ता जाँच रहा हूँ…' },
  scanClose: { en: 'Close', hi: 'बंद करें' },
  scanDone: { en: 'Scan complete', hi: 'जाँच पूरी' },
  scanRetake: { en: 'Scan Again', hi: 'दोबारा स्कैन' },
  scanResult: { en: 'Leaf Health Report', hi: 'पत्ता सेहत रिपोर्ट' },
  scanRemedy: { en: 'Organic Remedy (household measures)', hi: 'घरेलू जैविक उपाय' },
  scanListen: { en: 'Listen to report', hi: 'रिपोर्ट सुनें' },

  // Pitch
  pitchTitle: { en: 'Pitch Compliance — Judges', hi: 'पिच — जजों के लिए' },
  pitchHint: { en: 'Tap to compare models', hi: 'तुलना के लिए दबाएँ' },
  competitorLabel: { en: 'Competitor Model', hi: 'प्रतियोगी मॉडल' },
  competitorText: {
    en: 'Standard cloud-based crop leaf scanner showing dense scientific text graphs, requiring data signal to run.',
    hi: 'सामान्य क्लाउड-आधारित पत्ता स्कैनर — घने वैज्ञानिक ग्राफ दिखाता है, चलाने के लिए इंटरनेट ज़रूरी।',
  },
  matrixLabel: { en: 'Krishiculture Matrix', hi: 'क्रिशीकल्चर मैट्रिक्स' },
  matrixText: {
    en: '100% offline edge-vision app + predictive profit engine + direct marketplace pricing links — guaranteeing smallholder financial resilience.',
    hi: '१००% ऑफलाइन एज-विज़न ऐप + मुनाफा अनुमान इंजन + सीधा बाज़ार कीमत कनेक्शन — छोटे किसान की आर्थिक सुरक्षा।',
  },

  // Share idea (kept for community feed if reused)
  footerNote: { en: 'Runs entirely on-device. Airplane mode ready.', hi: 'पूरी तरह फोन पर चलता है। एयरप्लेन मोड तैयार।' },
};

export function tr(key: string, lang: Lang): string {
  const e = t[key];
  if (!e) return key;
  return e[lang];
}
