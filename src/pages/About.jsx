import { useEffect, useState } from "react";
import { 
  ArrowRight, ArrowUpRight, Globe2, HeartHandshake, LockKeyhole, Mail, 
  MessageSquare, Network, ShieldAlert, ShieldCheck, Headphones, LifeBuoy, 
  HelpCircle, Building2, Laptop, Wrench, MessageSquarePlus, Send, Check, 
  ChevronDown, Compass, BookOpen, FileCheck, FileText, ShieldQuestion, Sparkles 
} from "lucide-react";
import { Link, useLocation } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export default function About() {
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  const location = useLocation();

  const [openFaq, setOpenFaq] = useState(null);
  const [feedbackCategory, setFeedbackCategory] = useState("general");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackText("");
    }, 400);
  };

  const faqItems = [
    {
      q: isHi ? "ग्रामसेतु पर अपने लिए प्रासंगिक सरकारी योजनाएं कैसे खोजें?" : "How do I discover government schemes relevant to me?",
      a: isHi 
        ? "आप होमपेज पर खोज बार का उपयोग कर सकते हैं, 'योजनाएं' पृष्ठ पर श्रेणी और लाभार्थी के अनुसार फ़िल्टर कर सकते हैं, या 4 आसान प्रश्नों के उत्तर देकर 'पात्रता जांच' टूल का उपयोग कर सकते हैं। साथ ही, आप अपनी भाषा में 'ग्रामसेतु साथी' वॉइस असिस्टेंट से बोलकर भी पूछ सकते हैं।"
        : "You can search by keyword on the homepage, filter schemes by category or beneficiary type in the Scheme Explorer, or run the guided 4-step Eligibility Checker. You can also tap GramSetu Saathi, our voice assistant, to ask questions directly in your preferred Indian language."
    },
    {
      q: isHi ? "योजना की पात्रता शर्तों और लाभों को कैसे समझें?" : "How do I understand scheme eligibility and financial assistance?",
      a: isHi
        ? "प्रत्येक योजना के विवरण पृष्ठ पर 'पात्रता' और 'वित्तीय सहायता' टैब में स्पष्ट बुलेट बिंदुओं के माध्यम से आयु सीमा, आय वर्ग, निवास और आवश्यक मानदंडों की विस्तृत जानकारी दी गई है।"
        : "Each scheme's dedicated details page breaks down criteria into dedicated tabs covering Eligibility, Financial Assistance & Payment Details, Benefits, and Target Beneficiaries in plain, accessible language."
    },
    {
      q: isHi ? "आधिकारिक आवेदन प्रक्रिया और आवश्यक दस्तावेज़ कहां मिलेंगे?" : "Where can I find official application procedures and document checklists?",
      a: isHi
        ? "ग्रामसेतु पर 'आवेदन गाइड' और 'दस्तावेज़ चेकलिस्ट' पृष्ठ उपलब्ध हैं। इसके अलावा, प्रत्येक योजना के पृष्ठ पर 'आवेदन कैसे करें' टैब और अधिकृत सरकारी पोर्टल (जैसे india.gov.in) का सीधा लिंक दिया गया है।"
        : "Use the Document Preparation tool to generate a tailored checklist before visiting the local office, and review the Step-by-Step Application Guide. Each scheme also provides a direct verified handoff link to the official central or state government portal."
    },
    {
      q: isHi ? "क्या ग्रामसेतु कोई सरकारी शुल्क लेता है या सीधे आवेदन स्वीकार करता है?" : "Does GramSetu charge fees or process official applications directly?",
      a: isHi
        ? "नहीं। ग्रामसेतु एक 100% निःशुल्क और स्वतंत्र नागरिक खोज मंच है। हम कोई शुल्क नहीं लेते और न ही सीधे सरकारी आवेदन स्वीकार करते हैं। अंतिम आवेदन हमेशा संबंधित आधिकारिक सरकारी पोर्टल या सीएससी केंद्र पर ही किया जाता है।"
        : "No. GramSetu is a 100% free, independent public-service discovery directory. We never charge any fees, and we do not process formal government applications. The authoritative application always takes place directly on the official government ministry portal or at your local CSC centre."
    }
  ];

  useEffect(() => {
    if (location.pathname === "/contact" || location.hash === "#contact") {
      const elem = document.getElementById("contact");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);


  return (
    <>
      <PageHeader
        eyebrow={t.about}
        title={isHi ? "सार्वजनिक कल्याणकारी सेवाओं के लिए एक सशक्त सेतु" : "A bridge to better public-service discovery"}
        body={
          isHi
            ? "ग्रामसेतु एक स्वतंत्र खोज मंच है जो सूचना संरचना को सरल बनाकर नागरिकों के लिए सरकारी योजनाओं तक पहुंच को सुगम बनाता है।"
            : "GramSetu is an independent discovery platform designed to make public support and welfare schemes transparent, accessible, and easier to navigate."
        }
      />

      <section className="page-width about-page pb-20">
        <div className="about-hero-grid">
          <div className="about-statement">
            <span className="section-kicker">{isHi ? "ग्रामसेतु का उद्देश्य" : "Why GramSetu"}</span>
            <h2>{isHi ? "स्पष्टता ही सच्ची पहुंच है।" : "Clarity is a form of access."}</h2>
            <p>
              {isHi
                ? "सरकारी योजनाएं कल्याणकारी हो सकती हैं, लेकिन उन तक पहुंचना अक्सर जटिल होता है। ग्रामसेतु सरल भाषा, पात्रता समझ और आधिकारिक पोर्टलों तक सुरक्षित मार्गदर्शन को एक सहज अनुभव में समेटता है।"
                : "Government programmes can be life-changing yet difficult to find. GramSetu brings discovery, plain-language context, and a careful handoff to official portals into one calm, accessible experience."}
            </p>
            <Link className="subtle-link" to="/schemes">
              {isHi ? "योजना सूची देखें" : "Explore the directory"}
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="about-signal">
            <Network size={30} />
            <span>01</span>
            <strong>{isHi ? "एक स्पष्ट प्रारंभिक बिंदु" : "One clear starting point"}</strong>
            <p>{isHi ? "व्यापक खोजें, सोच-समझकर जांचें, और आवेदन से पहले आधिकारिक पुष्टि करें।" : "Search broadly, narrow thoughtfully, verify with the authority before acting."}</p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="principles-grid my-12">
          <Principle
            icon={Globe2}
            title={isHi ? "सुलभ और समावेशी" : "Inclusive by design"}
            body={
              isHi
                ? "भारतीय भाषाओं के लिए समर्थन, उत्तरदायी लेआउट और सुगम पठन अनुभव।"
                : "Multilingual Indian language foundations, responsive layouts, and accessible readability."
            }
          />
          <Principle
            icon={ShieldCheck}
            title={isHi ? "पारदर्शी और निष्पक्ष" : "Honest by default"}
            body={
              isHi
                ? "योजनाओं की पात्रता का केवल मार्गदर्शन; कोई झूठा दावा या सरकारी स्वामित्व नहीं।"
                : "Informational guidance without misleading claims of official government ownership or guaranteed benefits."
            }
          />
          <Principle
            icon={LockKeyhole}
            title={isHi ? "गोपनीयता के प्रति जागरूक" : "Privacy-aware"}
            body={
              isHi
                ? "सहेजी गई योजनाएं और सेटिंग्स आपके डिवाइस के स्थानीय ब्राउज़र में ही सुरक्षित रहती हैं।"
                : "Saved schemes and language choices remain strictly on your local device. No tracking cookies."
            }
          />
          <Principle
            icon={HeartHandshake}
            title={isHi ? "आधिकारिक प्राधिकरण से जुड़ाव" : "Human handoff"}
            body={
              isHi
                ? "अंतिम और आधिकारिक निर्णय हमेशा संबंधित सरकारी विभाग और उसके पोर्टल के पास होता है।"
                : "The authoritative decision always rests with the responsible government department and its portal."
            }
          />
        </div>

        {/* =========================================================================
            SECTION: Institutional Contact & Support Centre
           ========================================================================= */}
        <section id="contact" className="about-legal-section my-12 p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-emerald-100 shadow-sm scroll-mt-24">
          {/* Header & Introductory Description */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <Headphones size={20} />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  {isHi ? "आधिकारिक नागरिक सहायता" : "Institutional Citizen Support"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0">
                {isHi ? "संपर्क एवं सहायता केंद्र (Contact & Support)" : "Contact & Support Centre"}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isHi ? "सक्रिय सहायता डेस्क" : "Citizen Assistance Desk"}</span>
            </div>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            {isHi
              ? "ग्रामसेतु प्लेटफॉर्म का उद्देश्य प्रत्येक नागरिक को सरकारी योजनाओं की निष्पक्ष और सुलभ जानकारी प्रदान करना है। यदि आपको मार्गदर्शन, तकनीकी सहायता या प्रतिक्रिया साझा करनी है, तो नीचे दिए गए चैनलों का उपयोग करें:"
              : "GramSetu is committed to providing calm, transparent, and accessible public-welfare discovery. Whether you need navigation guidance, accessibility support, or wish to report an issue, connect with our support desk below:"}
          </p>

          {/* 1. Main Contact Options Grid (A, B, C, D) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* A. General Support */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-100/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                    <HelpCircle size={22} />
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wide bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                    {isHi ? "सामान्य सहायता" : "General Support"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {isHi ? "सामान्य पूछताछ एवं नागरिक मार्गदर्शन" : "General Enquiries & User Guidance"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {isHi
                    ? "योजनाओं की खोज, श्रेणियों को समझने और डिजिटल नागरिक सुविधाओं के उपयोग से संबंधित सहायता।"
                    : "Assistance with scheme exploration, category navigation, and general citizen platform guidance."}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600 shrink-0" />
                    <span>{isHi ? "योजना खोजने में सहायता" : "Scheme discovery guidance"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600 shrink-0" />
                    <span>{isHi ? "मंच से जुड़ी सामान्य जानकारी" : "Platform-related assistance"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600 shrink-0" />
                    <span>{isHi ? "प्रथम बार उपयोगकर्ता मार्गदर्शन" : "First-time user assistance"}</span>
                  </li>
                </ul>
              </div>
              <a
                href="mailto:support@gramsetu.in?subject=GramSetu%20General%20Support%20Enquiry"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Mail size={16} />
                <span>support@gramsetu.in</span>
              </a>
            </div>

            {/* B. Administrative Support */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Building2 size={22} />
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wide bg-slate-100 px-2.5 py-1 rounded-full">
                    {isHi ? "प्रशासनिक" : "Administrative"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {isHi ? "प्रशासनिक एवं संस्थागत समन्वय" : "Administrative & Coordination"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {isHi
                    ? "आधिकारिक सरकारी डेटा सत्यापन, नागरिक मंच साझेदारी एवं संस्थागत प्रश्नों के लिए।"
                    : "Institutional inquiries, government data cross-referencing, and public-service coordination."}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-slate-600 shrink-0" />
                    <span>{isHi ? "योजना विवरण सत्यापन प्रश्न" : "Scheme verification correspondence"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-slate-600 shrink-0" />
                    <span>{isHi ? "प्रशासनिक समन्वय" : "Institutional coordination"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-slate-600 shrink-0" />
                    <span>{isHi ? "नागरिक सेवा साझेदारी" : "Public service digital governance"}</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">{isHi ? "आधिकारिक संपर्क निर्देश:" : "Official Correspondence:"}</span>
                {isHi 
                  ? "प्रशासनिक पूछताछ के लिए 'Administrative' विषय के साथ support@gramsetu.in पर ईमेल करें।"
                  : "Please route formal administrative inquiries to support@gramsetu.in with subject '[Administrative]'."}
              </div>
            </div>

            {/* C. Technical Support */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50/70 to-white border border-teal-100/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center">
                    <Laptop size={22} />
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wide bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/50">
                    {isHi ? "तकनीकी सहायता" : "Technical Support"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {isHi ? "तकनीकी एवं सुगमता सहायता" : "Technical Assistance & Bug Reporting"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {isHi
                    ? "वेबसाइट कार्यप्रणाली, बहुभाषी डिस्प्ले, फॉन्ट रेंडरिंग या वॉइस असिस्टेंट से जुड़ी समस्याओं की रिपोर्ट करें।"
                    : "Report portal functionality bugs, multilingual text rendering issues, or voice assistant troubleshooting."}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-teal-600 shrink-0" />
                    <span>{isHi ? "वेबसाइट कार्यक्षमता में त्रुटि" : "Website functionality & navigation"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-teal-600 shrink-0" />
                    <span>{isHi ? "भाषा एवं लिपि प्रदर्शन समस्या" : "Language switcher & font display"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-teal-600 shrink-0" />
                    <span>{isHi ? "सुगमता (Accessibility) सहायता" : "Accessibility & screen reader assistance"}</span>
                  </li>
                </ul>
              </div>
              <a
                href="mailto:support@gramsetu.in?subject=GramSetu%20Technical%20Issue%20Report"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-teal-700 text-white font-bold text-sm hover:bg-teal-800 transition-colors shadow-xs"
              >
                <Wrench size={16} />
                <span>{isHi ? "तकनीकी समस्या रिपोर्ट करें" : "Report Technical Issue"}</span>
              </a>
            </div>

            {/* D. Feedback & Suggestions Interactive Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 to-white border border-amber-100/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-900 flex items-center justify-center">
                    <MessageSquarePlus size={22} />
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wide bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                    {isHi ? "प्रतिक्रिया" : "Feedback"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {isHi ? "प्रतिक्रिया एवं सुझाव केंद्र" : "Feedback & Portal Suggestions"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {isHi
                    ? "ग्रामसेतु को हर नागरिक के लिए और अधिक उपयोगी बनाने के लिए अपने सुझाव या सुगमता संबंधी विचार साझा करें।"
                    : "Share your experience, report outdated scheme details, or suggest accessibility and feature improvements."}
                </p>

                {feedbackSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3 my-2">
                    <Check size={20} className="text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-1">
                        {isHi ? "आपकी प्रतिक्रिया प्राप्त हुई!" : "Thank you for your feedback!"}
                      </strong>
                      <p className="text-xs text-emerald-800 m-0">
                        {isHi
                          ? "आपके सुझाव हमारे नागरिक कल्याण मंच को और अधिक समावेशी बनाने में मदद करेंगे।"
                          : "Your input helps us make GramSetu more accessible and helpful for every citizen."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                    <div className="flex gap-2">
                      <select
                        value={feedbackCategory}
                        onChange={(e) => setFeedbackCategory(e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="general">{isHi ? "सामान्य सुझाव (General)" : "General Feedback"}</option>
                        <option value="accessibility">{isHi ? "सुगमता (Accessibility)" : "Accessibility Issue"}</option>
                        <option value="scheme">{isHi ? "योजना विवरण सुधार (Scheme Info)" : "Scheme Information Accuracy"}</option>
                        <option value="bug">{isHi ? "तकनीकी त्रुटि (Technical Bug)" : "Technical Bug"}</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder={isHi ? "अपना बहुमूल्य सुझाव या अनुभव यहां लिखें..." : "Type your feedback or suggestion here..."}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      <Send size={14} />
                      <span>{isHi ? "प्रतिक्रिया सबमिट करें" : "Submit Feedback"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* 2. Section E: Frequently Asked Questions Accordion */}
          <div className="my-10 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <HelpCircle size={20} />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">
                  {isHi ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions"}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {isHi ? "ग्रामसेतु एवं सरकारी योजनाओं से जुड़े सामान्य प्रश्नों के उत्तर" : "Quick answers regarding discovery, eligibility, and navigation"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-800 hover:bg-emerald-50/30 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base leading-snug">{item.q}</span>
                      <span className={`p-1.5 rounded-lg bg-slate-100 text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 bg-emerald-100 text-emerald-800" : ""}`}>
                        <ChevronDown size={16} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-emerald-50/20 pt-4">
                        <p className="m-0">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Section F: Important Citizen Resources Grid */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Compass size={20} />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">
                  {isHi ? "महत्वपूर्ण नागरिक संसाधन" : "Important Citizen Resources"}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {isHi ? "पोर्टल नेविगेशन एवं आधिकारिक दिशानिर्देशों के लिए त्वरित लिंक" : "Direct access to key platform services, guides, and authoritative links"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/schemes"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <BookOpen size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                    {isHi ? "योजना निर्देशिका" : "Scheme Directory"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "सभी केंद्रीय एवं राज्य कल्याणकारी योजनाओं को ब्राउज़ करें।" : "Explore all central and state welfare programmes."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-3 pt-2 border-t border-slate-100">
                  <span>{isHi ? "खोजें" : "Explore"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/eligibility"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Sparkles size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-purple-800 transition-colors mb-1">
                    {isHi ? "पात्रता जांचकर्ता" : "Eligibility Checker"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "4 सरल प्रश्नों में अपने लिए अनुकूल योजनाएं पहचानें।" : "Discover schemes tailored to your specific profile."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 mt-3 pt-2 border-t border-slate-100">
                  <span>{isHi ? "जांचें" : "Check"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/documents"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <FileCheck size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-blue-800 transition-colors mb-1">
                    {isHi ? "दस्तावेज़ चेकलिस्ट" : "Document Checklist"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "आवेदन से पूर्व आवश्यक प्रमाण पत्रों की तैयारी करें।" : "Prepare required papers before visiting offices."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 mt-3 pt-2 border-t border-slate-100">
                  <span>{isHi ? "चेकलिस्ट" : "Prepare"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/application-guide"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <FileText size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-1">
                    {isHi ? "आवेदन गाइड" : "Application Guide"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "सरकारी पोर्टल एवं सीएससी केंद्रों की चरणबद्ध प्रक्रिया।" : "Step-by-step procedures for citizen welfare."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 mt-3 pt-2 border-t border-slate-100">
                  <span>{isHi ? "गाइड पढ़ें" : "Read Guide"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/faq"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <ShieldQuestion size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                    {isHi ? "संपूर्ण प्रश्नोत्तरी (FAQ)" : "Full FAQ Directory"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "मंच से जुड़े सभी सामान्य सवालों के विस्तृत उत्तर।" : "Comprehensive platform answers and clarifications."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-3 pt-2 border-t border-slate-100">
                  <span>{isHi ? "देखें" : "View FAQ"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <a
                href="https://www.india.gov.in"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Globe2 size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                    {isHi ? "राष्ट्रीय सरकारी पोर्टल" : "National Portal of India"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "भारत सरकार का आधिकारिक सूचना व सेवा प्रवेश द्वार।" : "Official National Portal of the Government of India."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-3 pt-2 border-t border-slate-100">
                  <span>india.gov.in</span>
                  <ArrowUpRight size={13} />
                </span>
              </a>

              <a
                href="#privacy"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <LockKeyhole size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                    {isHi ? "गोपनीयता नीति" : "Privacy Policy"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "लोकल-फर्स्ट, शून्य डेटा संग्रह गोपनीयता मानक।" : "Client-side storage & strict zero data collection policy."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 mt-3 pt-2 border-t border-slate-100">
                  <span>{isHi ? "नीति पढ़ें" : "Read Policy"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#terms"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <ShieldAlert size={18} />
                  </span>
                  <strong className="block text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                    {isHi ? "उपयोग की शर्तें" : "Terms & Disclaimer"}
                  </strong>
                  <p className="text-xs text-slate-600 m-0 line-clamp-2">
                    {isHi ? "पारदर्शी सूचना खोज एवं आधिकारिक सत्यापन नियम।" : "Discovery scope, citizen guidelines & handoff disclaimer."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 mt-3 pt-2 border-t border-slate-100">
                  <span>{isHi ? "शर्तें पढ़ें" : "Read Terms"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </section>


        {/* SECTION: Privacy Policy */}
        <section id="privacy" className="about-legal-section my-10 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
              <LockKeyhole size={22} />
            </span>
            <h2 className="text-2xl font-bold text-slate-900 m-0">
              {isHi ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 text-base leading-relaxed max-w-3xl">
            <p>
              {isHi
                ? "ग्रामसेतु नागरिकों की गोपनीयता का पूर्ण सम्मान करता है। हमारा आर्किटेक्चर 'लोकल-फर्स्ट' सिद्धांत पर बना है।"
                : "GramSetu respects citizen privacy above all. Our architecture is engineered with a strict local-first privacy standard."}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
              <li>
                <strong>{isHi ? "कोई व्यक्तिगत डेटा संग्रह नहीं:" : "Zero Personal Data Collection:"}</strong>{" "}
                {isHi
                  ? "हम आधार संख्या, बैंक खाता विवरण, फोन नंबर या पहचान पत्र जैसे संवेदनशील डेटा न तो मांगते हैं और न ही किसी सर्वर पर एकत्र करते हैं।"
                  : "We never ask for or store sensitive identifiers such as Aadhaar numbers, bank account credentials, phone numbers, or ID copies."}
              </li>
              <li>
                <strong>{isHi ? "स्थानीय सहेजना (Client-Side Storage):" : "Local Device Bookmarks:"}</strong>{" "}
                {isHi
                  ? "आपकी बुकमार्क की गई योजनाएं और भाषा प्राथमिकताएं केवल आपके अपने ब्राउज़र के LocalStorage में संग्रहीत होती हैं।"
                  : "Bookmarked schemes, recent views, and language choices remain strictly inside your browser's local storage."}
              </li>
              <li>
                <strong>{isHi ? "कोई ट्रैकिंग कुकीज नहीं:" : "Zero Tracking Cookies:"}</strong>{" "}
                {isHi
                  ? "ग्रामसेतु विज्ञापनों या नागरिक व्यवहार की ट्रैकिंग के लिए किसी भी तीसरे पक्ष की ट्रैकिंग कुकीज का उपयोग नहीं करता।"
                  : "We do not utilize third-party commercial tracking pixels or behavioural monetization cookies."}
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: Terms of Use */}
        <section id="terms" className="about-legal-section my-10 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
              <ShieldAlert size={22} />
            </span>
            <h2 className="text-2xl font-bold text-slate-900 m-0">
              {isHi ? "उपयोग की शर्तें एवं अस्वीकरण (Terms of Use & Disclaimer)" : "Terms of Use & Disclaimer"}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 text-base leading-relaxed max-w-3xl">
            <p>
              {isHi
                ? "ग्रामसेतु का उपयोग करने से पहले कृपया निम्नलिखित शर्तों को समझें:"
                : "Please review the following foundational terms governing the use of GramSetu:"}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
              <li>
                <strong>{isHi ? "केवल खोज एवं मार्गदर्शन:" : "Informational Discovery Only:"}</strong>{" "}
                {isHi
                  ? "ग्रामसेतु एक नागरिक खोज व मार्गदर्शन माध्यम है। यह कोई आधिकारिक सरकारी विभाग नहीं है और न ही किसी योजना की पात्रता की कानूनी गारंटी देता है।"
                  : "GramSetu is an independent discovery and navigation aid. It does not represent an official government ministry and does not guarantee scheme approval."}
              </li>
              <li>
                <strong>{isHi ? "आधिकारिक सत्यापन अनिवार्य:" : "Official Authority Verification:"}</strong>{" "}
                {isHi
                  ? "आवेदन करने से पहले नियमों, आय सीमाओं, अंतिम तिथियों और आवश्यक दस्तावेजों की पुष्टि हमेशा संबंधित विभाग के आधिकारिक पोर्टल (जैसे india.gov.in या राज्य पोर्टल) पर करें।"
                  : "Prior to applying, citizens must verify current eligibility rules, deadlines, and documentation on the responsible authority's designated portal."}
              </li>
              <li>
                <strong>{isHi ? "कोई आवेदन शुल्क नहीं:" : "No Application Charges:"}</strong>{" "}
                {isHi
                  ? "ग्रामसेतु किसी भी योजना की जानकारी देने या मार्गदर्शन के लिए कभी कोई शुल्क नहीं लेता।"
                  : "GramSetu is free public-service discovery software. We never charge fees for scheme discovery."}
              </li>
            </ul>
          </div>
        </section>

        <div className="about-note">
          <span>{isHi ? "सुलभ डिजिटल भारत" : "Built for Digital Public Good"}</span>
          <h2>{isHi ? "भ्रमित करने वाली खोज से आत्मविश्वास भरे अगले कदम तक।" : "From a confusing search to a confident next step."}</h2>
          <p>
            {isHi
              ? "ग्रामसेतु का संकल्प है कि हर भारतीय नागरिक को उसके लिए बनी जनकल्याणकारी योजनाओं की स्पष्ट और विश्वसनीय जानकारी मिले।"
              : "GramSetu is dedicated to making sure every Indian citizen can find clear, dignified, and authentic pathways to public welfare schemes."}
          </p>
        </div>
      </section>
    </>
  );
}

function Principle({ icon: Icon, title, body }) {
  return (
    <article className="principle-card">
      <Icon size={21} />
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
