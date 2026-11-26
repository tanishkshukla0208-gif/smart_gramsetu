import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

const faqs = [
  {
    q: "Is GramSetu an official government portal?",
    qHi: "क्या GramSetu आधिकारिक सरकारी पोर्टल है?",
    a: "No. GramSetu is a discovery and guidance platform. Use the linked responsible authority for the authoritative rules, forms, deadlines, and application status.",
    aHi: "नहीं। GramSetu एक स्वतंत्र खोज और नागरिक मार्गदर्शन मंच है। आधिकारिक नियमों, फॉर्म, समय-सीमा और आवेदन स्थिति के लिए संबंधित सरकारी मंत्रालय या विभाग के आधिकारिक पोर्टल का उपयोग करें।",
  },
  {
    q: "Can GramSetu tell me if I will receive a benefit?",
    qHi: "क्या GramSetu गारंटी देता है कि मुझे योजना का लाभ मिलेगा?",
    a: "No. The eligibility checker surfaces potential matches based on official eligibility criteria. The responsible authority makes the final decision after its own document verification.",
    aHi: "नहीं। पात्रता जांचकर्ता सरकारी मानदंडों के आधार पर संभावित योजनाओं की जानकारी देता है। दस्तावेज़ सत्यापन और अंतिम स्वीकृति का अधिकार केवल संबंधित सरकारी विभाग के पास है।",
  },
  {
    q: "What happens to my eligibility answers?",
    qHi: "पात्रता जांच में दिए गए मेरे उत्तरों का क्या होता है?",
    a: "The answers are kept strictly in your local browser session to calculate matching schemes. GramSetu does not store, transmit, or share your personal details.",
    aHi: "उत्तर केवल आपके वर्तमान ब्राउज़र सत्र में स्थानीय रूप से रहते हैं। GramSetu आपका कोई भी व्यक्तिगत डेटा, आधार या बैंक विवरण न तो मांगता है और न ही कहीं भेजता है।",
  },
  {
    q: "Are the scheme details always current?",
    qHi: "क्या योजनाओं की जानकारी हमेशा अद्यतन रहती है?",
    a: "We regularly update information against official notifications. However, government circulars and application deadlines can change; always verify with the linked official portal.",
    aHi: "हम आधिकारिक सरकारी विज्ञप्तियों के आधार पर जानकारी नियमित अद्यतन करते हैं। फिर भी, अंतिम पुष्टि हमेशा संबंधित योजना के आधिकारिक पोर्टल पर अवश्य करें।",
  },
  {
    q: "Are my saved schemes synced across devices?",
    qHi: "क्या मेरी सहेजी गई योजनाएं अन्य उपकरणों पर सिंक होंगी?",
    a: "Bookmarks and checklist items are securely saved in this local browser only. No cloud account or tracking is required.",
    aHi: "आपकी बुकमार्क की गई योजनाएं और चेकलिस्ट केवल इसी डिवाइस के ब्राउज़र में सुरक्षित रहती हैं। इसके लिए किसी क्लाउड खाते की आवश्यकता नहीं होती।",
  },
  {
    q: "Which Indian languages does GramSetu support?",
    qHi: "GramSetu किन भारतीय भाषाओं का समर्थन करता है?",
    a: "GramSetu provides access to 22 scheduled Indian regional languages alongside English in the top navigation selector. Currently, comprehensive interface and scheme data translations are provided in English and Hindi. Thirteen major languages (English, Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Malayalam, Odia, Punjabi, and Assamese) have translated UI navigation and controls. Detailed scheme records are currently available in English and Hindi; Devanagari-script languages (such as Marathi, Nepali, and Konkani) display Hindi scheme details as a script-compatible fallback, while other regional languages display English scheme documentation.",
    aHi: "GramSetu के शीर्ष भाषा चयनकर्ता में अंग्रेजी के साथ संविधान की 8वीं अनुसूची की 22 भारतीय भाषाएं उपलब्ध हैं। वर्तमान में अंग्रेजी और हिंदी में पूर्ण इंटरफेस और योजना डेटा अनुवाद उपलब्ध है। 13 प्रमुख भाषाओं (अंग्रेजी, हिंदी, बंगाली, तेलुगु, मराठी, तमिल, उर्दू, गुजराती, कन्नड़, मलयालम, उड़िया, पंजाबी और असमिया) में नेविगेशन और मुख्य इंटरफ़ेस अनुवादित है। योजनाओं का विस्तृत विवरण वर्तमान में हिंदी और अंग्रेजी में उपलब्ध है; देवनागरी लिपि वाली भाषाओं (जैसे मराठी, नेपाली, कोंकणी) में योजना विवरण हिंदी में और अन्य क्षेत्रीय भाषाओं में योजना विवरण अंग्रेजी में प्रदर्शित होता है।",
  },
  {
    q: "How does the GramSetu Saathi voice assistant handle Indian languages?",
    qHi: "ग्रामसेतु साथी वॉइस असिस्टेंट भारतीय भाषाओं में कैसे कार्य करता है?",
    a: "GramSetu Saathi supports voice interaction across 13 major Indian languages (Hindi, English, Bengali, Telugu, Tamil, Marathi, Gujarati, Punjabi, Kannada, Malayalam, Odia, Assamese, and Urdu). Voice input (speech-to-text) uses your browser's native speech recognition engine with support for typed native-script queries. Spoken responses (text-to-speech) use compatible browser voice synthesis when available on your device, with clear on-screen textual cards and verified action links always provided as the primary source of truth.",
    aHi: "ग्रामसेतु साथी 13 प्रमुख भाषाओं (हिंदी, अंग्रेजी, बंगाली, तेलुगु, तमिल, मराठी, गुजराती, पंजाबी, कन्नड़, मलयालम, उड़िया, असमिया और उर्दू) में बातचीत की सुविधा देता है। वॉइस इनपुट आपके ब्राउज़र के स्पीच रिकग्निशन पर आधारित है, साथ ही आप अपनी भाषा में टाइप करके भी पूछ सकते हैं। बोलकर उत्तर देने की सुविधा आपके डिवाइस पर उपलब्ध ब्राउज़र वॉइस इंजन पर निर्भर करती है, जबकि स्क्रीन पर सभी उत्तर और योजनाओं के सत्यापित लिंक हमेशा मुख्य रूप से प्रदर्शित होते हैं।",
  },
];

export default function FAQ() {
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHeader eyebrow={t.faq} title={t.faqTitle} body={t.faqBody} />
      <section className="page-width faq-page pb-20">
        <div className="faq-list max-w-3xl mx-auto space-y-4">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const question = isHi ? item.qHi : item.q;
            const answer = isHi ? item.aHi : item.a;

            return (
              <div
                className={`faq-item rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-emerald-50/60 border-emerald-300 shadow-xs"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
                key={item.q}
              >
                <button
                  type="button"
                  id={`faq-header-${index}`}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer border-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-2xl"
                >
                  <span className="flex items-center gap-3.5 font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    <span
                      className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isOpen
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <MessageCircleQuestion size={18} />
                    </span>
                    <span>{question}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-700" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div 
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-header-${index}`}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-emerald-100"
                  >
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed m-0 font-normal pl-11">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
