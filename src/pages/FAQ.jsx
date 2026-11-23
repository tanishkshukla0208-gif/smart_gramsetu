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
    q: "Can I use GramSetu in Indian languages?",
    qHi: "क्या GramSetu भारतीय भाषाओं में उपलब्ध है?",
    a: "Yes. GramSetu supports English and Hindi, with seamless switching from the top navigation bar.",
    aHi: "हाँ। GramSetu हिंदी और अंग्रेजी दोनों भाषाओं का पूर्ण समर्थन करता है। आप ऊपर दिए गए भाषा बटन से आसानी से भाषा बदल सकते हैं।",
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
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer border-0 bg-transparent"
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
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-emerald-100">
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
