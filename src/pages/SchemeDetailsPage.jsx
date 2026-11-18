import { ArrowLeft, ArrowUpRight, Banknote, Bookmark, Check, CheckCircle2, ExternalLink, FileCheck, GitCompareArrows, Info, Layers, Printer, Sparkles, UserCheck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getSchemeById, getSchemes, localizeScheme } from "../services/schemeService.js";
import VerificationBanner from "../components/VerificationBanner.jsx";
import SchemeCard from "../components/SchemeCard.jsx";

export default function SchemeDetailsPage() {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const { language, savedIds, toggleSaved, compareIds, toggleCompare, addRecent } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  const scheme = getSchemeById(schemeId);
  const text = localizeScheme(scheme, language);

  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (scheme) addRecent(scheme.id);
  }, [scheme?.id]);

  if (!scheme) {
    return (
      <section className="page-width details-page py-12">
        <div className="empty-state">
          <h2>{t.schemeNotFound}</h2>
          <p>{t.schemeNotFoundBody}</p>
          <Link className="button button-primary" to="/schemes">
            {t.returnHome}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const isSaved = savedIds.includes(scheme.id);
  const isCompared = compareIds.includes(scheme.id);
  const related = getSchemes()
    .filter((item) => item.category.id === scheme.category.id && item.id !== scheme.id)
    .slice(0, 3);

  // 6 Colorful Tabs specification
  const tabDefs = [
    {
      id: "about",
      label: t.aboutScheme || "About the Scheme",
      icon: Info,
      colorName: "Green",
      activeBg: "bg-emerald-600 text-white shadow-md shadow-emerald-600/25",
      inactiveBg: "bg-emerald-50 text-emerald-900 hover:bg-emerald-100/90",
      accentBg: "bg-emerald-50/80",
      accentText: "text-emerald-900",
      dotColor: "bg-emerald-600",
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      id: "benefits",
      label: t.benefits || "Benefits",
      icon: Sparkles,
      colorName: "Teal",
      activeBg: "bg-teal-600 text-white shadow-md shadow-teal-600/25",
      inactiveBg: "bg-teal-50 text-teal-900 hover:bg-teal-100/90",
      accentBg: "bg-teal-50/80",
      accentText: "text-teal-900",
      dotColor: "bg-teal-600",
      badgeColor: "bg-teal-100 text-teal-800",
    },
    {
      id: "financial",
      label: t.financialAssistance || "Financial Assistance",
      icon: Banknote,
      colorName: "Orange",
      activeBg: "bg-amber-600 text-white shadow-md shadow-amber-600/25",
      inactiveBg: "bg-amber-50 text-amber-950 hover:bg-amber-100/90",
      accentBg: "bg-amber-50/80",
      accentText: "text-amber-950",
      dotColor: "bg-amber-600",
      badgeColor: "bg-amber-100 text-amber-900",
    },
    {
      id: "eligibility",
      label: t.eligibilityTitle || "Eligibility",
      icon: UserCheck,
      colorName: "Purple",
      activeBg: "bg-purple-600 text-white shadow-md shadow-purple-600/25",
      inactiveBg: "bg-purple-50 text-purple-950 hover:bg-purple-100/90",
      accentBg: "bg-purple-50/80",
      accentText: "text-purple-950",
      dotColor: "bg-purple-600",
      badgeColor: "bg-purple-100 text-purple-900",
    },
    {
      id: "documents",
      label: t.documents || "Documents",
      icon: FileCheck,
      colorName: "Blue",
      activeBg: "bg-blue-600 text-white shadow-md shadow-blue-600/25",
      inactiveBg: "bg-blue-50 text-blue-950 hover:bg-blue-100/90",
      accentBg: "bg-blue-50/80",
      accentText: "text-blue-950",
      dotColor: "bg-blue-600",
      badgeColor: "bg-blue-100 text-blue-900",
    },
    {
      id: "apply",
      label: t.howToApply || t.application || "How to Apply",
      icon: CheckCircle2,
      colorName: "Coral Red",
      activeBg: "bg-rose-500 text-white shadow-md shadow-rose-500/25",
      inactiveBg: "bg-rose-50 text-rose-950 hover:bg-rose-100/90",
      accentBg: "bg-rose-50/80",
      accentText: "text-rose-950",
      dotColor: "bg-rose-500",
      badgeColor: "bg-rose-100 text-rose-900",
    },
  ];

  return (
    <>
      <section className="page-width details-page pt-8 pb-16">
        <Link className="back-link inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 mb-6" to="/schemes">
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        <div className="detail-layout">
          <article className="details-card bg-white rounded-3xl p-6 sm:p-9 shadow-sm border-0">
            {/* Top Bar with Category, Level, and Quick Actions */}
            <div className="detail-hero flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="category-label inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border-0">
                  {text.displayCategory}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 uppercase tracking-wide">
                  {scheme.level === "central" ? (isHi ? "केंद्रीय योजना" : "Central Scheme") : scheme.level}
                </span>
              </div>
              <div className="detail-actions flex items-center gap-2">
                <button
                  className={isSaved ? "icon-button active" : "icon-button"}
                  type="button"
                  onClick={() => toggleSaved(scheme.id)}
                  aria-label={isSaved ? t.saved : t.save}
                  title={isSaved ? t.saved : t.save}
                >
                  <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                </button>
                <button
                  className={isCompared ? "icon-button active" : "icon-button"}
                  type="button"
                  onClick={() => toggleCompare(scheme.id)}
                  aria-label={t.compare}
                  title={t.compare}
                >
                  <GitCompareArrows size={18} />
                  {isCompared && <Check size={12} />}
                </button>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => window.print()}
                  aria-label={t.print}
                  title={t.print}
                >
                  <Printer size={18} />
                </button>
              </div>
            </div>

            {/* Scheme Title & Primary Description */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mt-2 mb-4">
              {text.displayName}
            </h1>
            <p className="details-summary text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-5">
              {text.displayDescription}
            </p>

            {/* Who Can Benefit Badges */}
            <div className="detail-audience flex items-center flex-wrap gap-2 mb-6">
              <strong className="text-sm font-bold text-slate-800">{t.whoCanBenefit || t.beneficiaries}:</strong>
              {text.displayBeneficiaries?.map((item) => (
                <span key={item} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border-0">
                  {item}
                </span>
              ))}
            </div>

            <VerificationBanner compact />

            {/* =========================================================================
                4. COLORFUL DETAILS TABS (About: Green, Benefits: Teal, Finance: Orange,
                Eligibility: Purple, Documents: Blue, How to Apply: Coral Red)
               ========================================================================= */}
            <div className="scheme-info my-8">
              <div className="scheme-tab-intro flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  {isHi ? "योजना विवरण टैब" : "Scheme Information Tabs"}
                </span>
                {activeTab !== "all" && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                  >
                    {isHi ? "सभी विवरण एक साथ देखें" : "View All Details"}
                  </button>
                )}
                {activeTab === "all" && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("about")}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                  >
                    {isHi ? "टैब दृश्य में देखें" : "Switch to Tabbed View"}
                  </button>
                )}
              </div>

              {/* Colorful Tab Buttons */}
              <div className="scheme-tab-bar flex flex-wrap gap-2.5 p-2 rounded-2xl bg-slate-100/80">
                {tabDefs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-sm transition-all duration-200 outline-none border-0 cursor-pointer ${
                        isActive ? tab.activeBg : tab.inactiveBg
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Content Display with Smooth Animation */}
              <div className="scheme-tab-panel mt-6">
                <AnimatePresence mode="wait">
                  {/* TAB 1: ABOUT THE SCHEME (Green) */}
                  {(activeTab === "about" || activeTab === "all") && (
                    <motion.div
                      key="tab-about"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 mb-6 border-0 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="p-2.5 rounded-xl bg-emerald-600 text-white">
                          <Info size={22} />
                        </span>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-emerald-950">
                            {t.aboutScheme || "About the Scheme"}
                          </h2>
                          <span className="text-xs font-semibold text-emerald-800">
                            {text.displayCategory} • {scheme.level === "central" ? "Government of India" : "State Government"}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal mb-5">
                        {text.displayDescription}
                      </p>
                      <div className="p-4 rounded-xl bg-white/90 text-sm text-slate-800 leading-relaxed font-medium">
                        <strong className="block text-emerald-900 font-bold mb-1">
                          {isHi ? "योजना का उद्देश्य:" : "Scheme Objective:"}
                        </strong>
                        {isHi
                          ? "यह योजना लक्षित नागरिकों को सरकारी वित्तीय सहायता, बुनियादी सुविधाएं और आजीविका सुरक्षा प्रदान कर उनके जीवन स्तर को बेहतर बनाने के उद्देश्य से संचालित की जा रही है।"
                          : "This scheme is designed to directly empower eligible citizens through financial relief, institutional facilities, and transparent direct-to-bank benefits."}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: BENEFITS (Teal) */}
                  {(activeTab === "benefits" || activeTab === "all") && (
                    <motion.div
                      key="tab-benefits"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-2xl bg-teal-50/60 mb-6 border-0 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="p-2.5 rounded-xl bg-teal-600 text-white">
                          <Sparkles size={22} />
                        </span>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-teal-950">
                            {t.benefits || "Key Benefits for Citizens"}
                          </h2>
                          <span className="text-xs font-semibold text-teal-800">
                            {isHi ? "नागरिकों को मिलने वाले प्रत्यक्ष लाभ" : "Direct advantages provided to beneficiaries"}
                          </span>
                        </div>
                      </div>

                      {/* Benefits List */}
                      <ul className="grid gap-3 pl-0 list-none mb-6">
                        {text.displayBenefits?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 text-slate-800 text-base leading-relaxed">
                            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* What It Provides Sub-section */}
                      {text.displayWhatItProvides?.length > 0 && (
                        <div className="pt-4 border-t border-teal-200/60">
                          <div className="flex items-center gap-2 text-teal-900 font-bold text-lg mb-3">
                            <Layers size={20} className="text-teal-700" />
                            <h3>{t.whatItProvides || "What This Scheme Provides"}</h3>
                          </div>
                          <ul className="grid gap-2.5 pl-0 list-none">
                            {text.displayWhatItProvides.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-teal-100/50 text-teal-950 text-sm sm:text-base leading-relaxed">
                                <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 3: FINANCIAL ASSISTANCE (Orange) */}
                  {(activeTab === "financial" || activeTab === "all") && (
                    <motion.div
                      key="tab-financial"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 mb-6 border-0 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="p-2.5 rounded-xl bg-amber-600 text-white">
                          <Banknote size={22} />
                        </span>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
                            {t.financialAssistance || "Financial Assistance & Benefits"}
                          </h2>
                          <span className="text-xs font-semibold text-amber-800">
                            {isHi ? "आर्थिक सहायता राशि, अनुदान व भुगतान विवरण" : "Direct payment amounts, subsidy grants, and disbursement cycles"}
                          </span>
                        </div>
                      </div>

                      <div className="grid gap-3.5 pl-0">
                        {text.displayFinancialAssistance?.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/95 shadow-xs flex items-start gap-3 text-slate-900 text-base sm:text-lg leading-relaxed font-semibold">
                            <span className="w-3 h-3 rounded-full bg-amber-600 mt-2 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 p-4 rounded-xl bg-amber-100/60 text-xs sm:text-sm text-amber-950 font-medium flex items-center gap-2">
                        <span className="font-bold">✓ Direct Benefit Transfer (DBT):</span>
                        <span>
                          {isHi
                            ? "सभी वित्तीय भुगतान बिना किसी बिचौलिए के सीधे लाभार्थी के आधार-सीडेड बैंक खाते में भेजे जाते हैं।"
                            : "All payments are credited directly into beneficiary's Aadhaar-linked bank accounts without intermediary deductions."}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: ELIGIBILITY (Purple) */}
                  {(activeTab === "eligibility" || activeTab === "all") && (
                    <motion.div
                      key="tab-eligibility"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-2xl bg-purple-50/60 mb-6 border-0 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="p-2.5 rounded-xl bg-purple-600 text-white">
                          <UserCheck size={22} />
                        </span>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-purple-950">
                            {t.eligibilityTitle || "Eligibility Criteria"}
                          </h2>
                          <span className="text-xs font-semibold text-purple-800">
                            {isHi ? "पात्रता शर्तें एवं अपवाद नियम" : "Qualifying conditions, household requirements, and exclusions"}
                          </span>
                        </div>
                      </div>

                      <ul className="grid gap-3 pl-0 list-none mb-6">
                        {text.displayEligibility?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/95 text-slate-800 text-base leading-relaxed">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Who Can Benefit Tag Summary */}
                      <div className="p-4 rounded-xl bg-purple-100/50">
                        <strong className="block text-purple-950 font-bold mb-2 text-sm">
                          {isHi ? "लक्षित लाभार्थी समूह:" : "Target Beneficiary Groups:"}
                        </strong>
                        <div className="flex flex-wrap gap-2">
                          {text.displayBeneficiaries?.map((b) => (
                            <span key={b} className="px-3 py-1 rounded-full bg-white text-purple-900 text-xs font-bold shadow-xs">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: DOCUMENTS (Blue) */}
                  {(activeTab === "documents" || activeTab === "all") && (
                    <motion.div
                      key="tab-documents"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-2xl bg-blue-50/60 mb-6 border-0 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="p-2.5 rounded-xl bg-blue-600 text-white">
                          <FileCheck size={22} />
                        </span>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-blue-950">
                            {t.documents || "Required Documents"}
                          </h2>
                          <span className="text-xs font-semibold text-blue-800">
                            {isHi ? "आवेदन के लिए आवश्यक प्रमाण पत्र व अभिलेख" : "Documents and certificates to keep ready before applying"}
                          </span>
                        </div>
                      </div>

                      <ul className="grid gap-3 pl-0 list-none mb-6">
                        {text.displayDocuments?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/95 text-slate-800 text-base leading-relaxed font-medium">
                            <span className="p-1 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                              <Check size={14} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="p-4 rounded-xl bg-blue-100/50 text-xs sm:text-sm text-blue-950 font-medium">
                        💡 {isHi
                          ? "सुझाव: अपने सभी दस्तावेज़ों की स्पष्ट फोटोकॉपी और आधार से जुड़ा चालू मोबाइल नंबर साथ रखें।"
                          : "Tip: Keep clear photocopies of your documents and have your Aadhaar-linked mobile phone ready for OTP verification."}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 6: HOW TO APPLY (Coral Red) */}
                  {(activeTab === "apply" || activeTab === "all") && (
                    <motion.div
                      key="tab-apply"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-2xl bg-rose-50/60 mb-6 border-0 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="p-2.5 rounded-xl bg-rose-500 text-white">
                          <CheckCircle2 size={22} />
                        </span>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-rose-950">
                            {t.howToApply || t.application || "How to Apply"}
                          </h2>
                          <span className="text-xs font-semibold text-rose-800">
                            {isHi ? "चरण-दर-चरण आधिकारिक आवेदन प्रक्रिया" : "Step-by-step registration and submission process"}
                          </span>
                        </div>
                      </div>

                      <ol className="grid gap-3.5 pl-0 list-none mb-6">
                        {text.displaySteps?.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3.5 p-4 rounded-xl bg-white/95 text-slate-800 text-base leading-relaxed font-medium">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Official Link Card inside application tab */}
                      <div className="p-5 rounded-2xl bg-white/95 border-0 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <strong className="block text-slate-900 font-bold text-base">
                            {t.officialWebsite || "Official Government Portal"}
                          </strong>
                          <p className="text-xs text-slate-600 mt-1">
                            {scheme.verificationStatus}
                          </p>
                        </div>
                        {scheme.officialUrl && (
                          <a
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm shrink-0"
                            href={scheme.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>{t.officialDetails || "Open Official Portal"}</span>
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Persistent Official Portal Card at Bottom */}
            <div className="my-6 p-6 rounded-2xl bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-0">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  {t.officialWebsite || "Official Government Portal"}
                </span>
                <p className="text-base font-bold text-slate-900 mt-1">
                  {scheme.verificationStatus}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {isHi
                    ? "नवीनतम आधिकारिक दिशा-निर्देशों, तिथियों और आवेदन के लिए सरकार के आधिकारिक पोर्टल पर जाएं।"
                    : "Always verify final criteria and latest circulars directly on the authorized government portal."}
                </p>
              </div>
              {scheme.officialUrl && (
                <a
                  className="button button-primary whitespace-nowrap px-6 py-3 rounded-xl shrink-0 flex items-center gap-2 text-sm font-bold shadow-sm"
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.officialDetails || "Open Official Portal"}</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </article>

          {/* Sidebar Cards */}
          <aside className="detail-aside">
            <div className="side-card bg-white rounded-2xl p-6 shadow-sm border-0">
              <span className="side-label text-xs font-mono font-bold uppercase text-slate-500">{t.category}</span>
              <strong className="block text-lg font-bold text-slate-900 my-2">{text.displayCategory}</strong>
              <Link to={`/categories/${scheme.category.id}`} className="text-sm font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1">
                {t.viewAll}
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="side-card authority-card bg-white rounded-2xl p-6 shadow-sm border-0">
              <span className="side-label text-xs font-mono font-bold uppercase text-slate-500">{t.verificationStatus || t.sample}</span>
              <p className="text-sm leading-relaxed text-slate-700 font-medium my-2">
                {scheme.verificationStatus}
              </p>
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 mt-2"
              >
                {t.verify}
                <ExternalLink size={14} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Schemes */}
      {related.length > 0 && (
        <section className="page-width related-section pb-16">
          <div className="section-heading-row mb-6">
            <div>
              <p className="section-kicker text-xs font-mono font-bold uppercase text-emerald-700">{t.related}</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.related}</h2>
            </div>
          </div>
          <div className="scheme-grid">
            {related.map((item) => (
              <SchemeCard key={item.id} scheme={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
