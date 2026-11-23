import { ArrowRight, CheckCircle2, ExternalLink, FileCheck2, Flag, SearchCheck, Send, ShieldAlert } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import VerificationBanner from "../components/VerificationBanner.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

const icons = [SearchCheck, FileCheck2, ExternalLink, Send, CheckCircle2, Flag];

export default function ApplicationGuide() {
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);

  const steps = isHi
    ? [
        "पात्रता की शर्तें पढ़ें",
        "ज़रूरी दस्तावेज़ तैयार करें",
        "आधिकारिक आवेदन माध्यम खोजें",
        "आवेदन भरें और जानकारी जाँचें",
        "जमा करने के बाद पावती संभालें",
        "उपलब्ध होने पर आधिकारिक माध्यम से स्थिति देखें",
      ]
    : [
        "Read the eligibility conditions",
        "Prepare relevant documents",
        "Find the official application channel",
        "Complete and review the application",
        "Keep an acknowledgement or reference",
        "Track through the official channel when available",
      ];

  const bodies = isHi
    ? [
        "वर्तमान नियम, आय सीमा और अपवादों को ध्यान से समझें।",
        "केवल उस विशिष्ट योजना के लिए मांगे गए वैध दस्तावेज़ ही तैयार रखें।",
        "किसी अनजान लिंक या बिचौलिए के बजाय सरकार के आधिकारिक पोर्टल या CSC केंद्र का उपयोग करें।",
        "जमा करने से पहले नाम, आधार संख्या और बैंक खाता विवरण ध्यान से जांचें।",
        "भविष्य के संदर्भ और पूछताछ के लिए आवेदन रसीद या पावती नंबर सुरक्षित रखें।",
        "GramSetu आवेदन की स्थिति ट्रैक नहीं करता; आधिकारिक विभागीय पोर्टल पर स्थिति जांचें।",
      ]
    : [
        "Carefully understand the current rules, income ceilings, and scheme exceptions.",
        "Prepare only the authentic documents specifically required for the scheme.",
        "Always use authorized government portals or registered CSC centres rather than unknown intermediaries.",
        "Double-check spelling, Aadhaar digits, and bank account details prior to final submission.",
        "Retain the acknowledgment receipt or registration application reference safely.",
        "GramSetu does not accept or track citizen applications; verify updates on the official portal.",
      ];

  return (
    <>
      <PageHeader
        eyebrow={t.applicationGuide}
        title={isHi ? "आवेदन के लिए सुरक्षित और स्पष्ट मार्गदर्शन" : "A safer route from discovery to action"}
        body={
          isHi
            ? "GramSetu का उपयोग योजना को समझने के लिए करें, फिर आधिकारिक प्राधिकरण के माध्यम से सुरक्षित आवेदन करें।"
            : "Use GramSetu to understand the pathway, then move to the responsible authority with care."
        }
      />

      <section className="page-width guide-page pb-20">

        {/* Advisory Notice */}
        <div className="guide-notice my-8 p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-200/80 shadow-xs flex items-start gap-4">
          <span className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <ShieldAlert size={22} />
          </span>
          <div>
            <strong className="block text-base font-bold text-amber-950 mb-1">
              {isHi
                ? "GramSetu केवल खोज और मार्गदर्शन मंच है"
                : "GramSetu is a discovery and guidance platform"}
            </strong>
            <p className="text-sm text-amber-900/80 leading-relaxed m-0 font-medium">
              {isHi
                ? "यह आधिकारिक सरकारी पोर्टल नहीं है और न ही नागरिकों से कोई आवेदन डेटा स्वीकार करता है। अंतिम आवेदन हमेशा अधिकृत वेबसाइट पर करें।"
                : "It is not an official government application portal and does not accept citizen application data. Always finalize your application at the official source."}
            </p>
          </div>
        </div>

        {/* Step-by-Step Timeline */}
        <div className="guide-timeline max-w-3xl my-10 pl-6 sm:pl-8 border-l-2 border-emerald-300 relative space-y-10">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div className="guide-step relative flex items-start gap-4 sm:gap-6" key={step}>
                {/* Step Marker on Timeline Line */}
                <span className="absolute -left-[37px] sm:-left-[45px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-emerald-600 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                  0{index + 1}
                </span>

                <span className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200/60 shadow-xs">
                  <Icon size={22} />
                </span>

                <div className="flex-1 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Step {index + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                    {step}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed m-0">
                    {bodies[index]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ready to Explore CTA Box */}
        <div className="guide-bottom flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm mt-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              {isHi ? "क्या आप योजनाओं की सूची देखने के लिए तैयार हैं?" : "Ready to make a shortlist?"}
            </h2>
            <p className="text-sm text-slate-600 m-0">
              {isHi
                ? "कुछ योजनाओं की तुलना करें और आधिकारिक स्रोत पर अंतिम विवरण सत्यापित करें।"
                : "Compare a few records and verify the final details at the source."}
            </p>
          </div>
          <Link
            className="button button-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-sm font-bold shadow-xs transition-colors shrink-0"
            to="/schemes"
          >
            <span>{t.explore}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
