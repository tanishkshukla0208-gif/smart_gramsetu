import { ArrowLeft, ArrowUpRight, Banknote, Bookmark, Check, CheckCircle2, ExternalLink, FileCheck, GitCompareArrows, Info, Layers, Printer, Sparkles, UserCheck, ShieldCheck, Calendar, Building2 } from "lucide-react";
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
      <section className="page-width details-page py-16">
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

  // 6 Colorful Tabs specification with balanced layouts
  const tabDefs = [
    {
      id: "about",
      label: t.aboutScheme || "About the Scheme",
      icon: Info,
      colorName: "Green",
      activeBg: "bg-emerald-600 text-white shadow-md shadow-emerald-600/30",
      inactiveBg: "bg-emerald-50/90 text-emerald-950 hover:bg-emerald-100",
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
      activeBg: "bg-teal-600 text-white shadow-md shadow-teal-600/30",
      inactiveBg: "bg-teal-50/90 text-teal-950 hover:bg-teal-100",
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
      activeBg: "bg-amber-600 text-white shadow-md shadow-amber-600/30",
      inactiveBg: "bg-amber-50/90 text-amber-950 hover:bg-amber-100",
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
      activeBg: "bg-purple-600 text-white shadow-md shadow-purple-600/30",
      inactiveBg: "bg-purple-50/90 text-purple-950 hover:bg-purple-100",
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
      activeBg: "bg-blue-600 text-white shadow-md shadow-blue-600/30",
      inactiveBg: "bg-blue-50/90 text-blue-950 hover:bg-blue-100",
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
      activeBg: "bg-rose-600 text-white shadow-md shadow-rose-600/30",
      inactiveBg: "bg-rose-50/90 text-rose-950 hover:bg-rose-100",
      accentBg: "bg-rose-50/80",
      accentText: "text-rose-950",
      dotColor: "bg-rose-600",
      badgeColor: "bg-rose-100 text-rose-900",
    },
  ];

  return (
    <>
      <section className="page-width details-page pt-6 pb-20">
        {/* Back Link Breadcrumb */}
        <div className="mb-6">
          <Link 
            className="back-link inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 px-3.5 py-2 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 transition-colors w-fit shadow-xs" 
            to="/schemes"
          >
            <ArrowLeft size={16} />
            <span>{t.back}</span>
          </Link>
        </div>

        <div className="detail-layout">
          {/* Main Scheme Content Container */}
          <article className="details-card scheme-details-card">
            {/* Top Bar with Category, Level, and Quick Actions */}
            <div className="detail-hero flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="category-label inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border-0">
                  {text.displayCategory}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 uppercase tracking-wide">
                  <Building2 size={13} />
                  {scheme.level === "central" ? (isHi ? "केंद्रीय योजना" : "Central Scheme") : (isHi ? "राज्य योजना" : "State Scheme")}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/70 text-emerald-800">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  {isHi ? "सत्यापित योजना" : "Official Portal Verified"}
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
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                {text.displayName}
              </h1>
              <p className="details-summary text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-4xl">
                {text.displayDescription}
              </p>
            </div>

            {/* Structured Government Portal Scheme Overview Strip */}
            <div className="scheme-meta-strip">
              <div className="scheme-meta-item">
                <span className="scheme-meta-label">
                  {isHi ? "प्रशासनिक स्तर" : "Administering Level"}
                </span>
                <strong className="scheme-meta-value">
                  {scheme.level === "central" ? (isHi ? "भारत सरकार (केंद्रीय)" : "Government of India (Central)") : (isHi ? "राज्य सरकार" : "State Government")}
                </strong>
              </div>
              <div className="scheme-meta-item">
                <span className="scheme-meta-label">
                  {isHi ? "योजना श्रेणी" : "Scheme Category"}
                </span>
                <strong className="scheme-meta-value">
                  {text.displayCategory}
                </strong>
              </div>
              <div className="scheme-meta-item">
                <span className="scheme-meta-label">
                  {isHi ? "लाभार्थी समूह" : "Target Beneficiaries"}
                </span>
                <strong className="scheme-meta-value truncate">
                  {text.displayBeneficiaries?.slice(0, 2).join(", ") || (isHi ? "पात्र नागरिक" : "Eligible Citizens")}
                </strong>
              </div>
              <div className="scheme-meta-item">
                <span className="scheme-meta-label">
                  {isHi ? "आवेदन माध्यम" : "Application Mode"}
                </span>
                <strong className="scheme-meta-value text-emerald-800">
                  {isHi ? "ऑनलाइन / सीएससी केंद्र" : "Online / CSC Centre"}
                </strong>
              </div>
            </div>

            {/* Who Can Benefit Badges Row */}
            <div className="detail-audience flex items-center flex-wrap gap-2.5 my-5 pb-5 border-b border-slate-100">
              <strong className="text-sm font-bold text-slate-800 mr-1">{t.whoCanBenefit || t.beneficiaries}:</strong>
              {text.displayBeneficiaries?.map((item) => (
                <span key={item} className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/40">
                  {item}
                </span>
              ))}
            </div>

            <VerificationBanner compact />

            {/* =========================================================================
                4. COLORFUL DETAILS TABS (About: Green, Benefits: Teal, Finance: Orange,
                Eligibility: Purple, Documents: Blue, How to Apply: Coral Red)
               ========================================================================= */}
            <div className="scheme-info mt-10 mb-8">
              {/* Tab Header Row */}
              <div className="scheme-tab-intro flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                    {isHi ? "योजना विवरण टैब" : "Scheme Information Tabs"}
                  </span>
                </div>
                {activeTab !== "all" ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
                  >
                    <span>{isHi ? "सभी विवरण एक साथ देखें" : "View All Details on One Page"}</span>
                    <ArrowUpRight size={13} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTab("about")}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
                  >
                    <span>{isHi ? "टैब दृश्य में देखें" : "Switch to Tabbed View"}</span>
                    <ArrowUpRight size={13} />
                  </button>
                )}
              </div>

              {/* Colorful Tab Buttons in Balanced Responsive Grid: 2 cols on mobile, 3 cols on tablet/laptop, 6 cols on wide desktop */}
              {/* Responsive Scheme Information Navigation Tabs */}
              <div 
                className="scheme-tab-bar" 
                role="tablist" 
                aria-label={isHi ? "योजना विवरण टैब" : "Scheme information tabs"}
              >
                {tabDefs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.id}`}
                      tabIndex={0}
                      onClick={() => setActiveTab(tab.id)}
                      className={`scheme-tab-button ${
                        isActive ? tab.activeBg : tab.inactiveBg
                      }`}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span className="leading-snug text-center">{tab.label}</span>
                    </button>
                  );
                })}
              </div>


              {/* Active Tab Content Display with Generous Breathing Space */}
              <div className="scheme-tab-panel">
                <AnimatePresence mode="wait">
                  {/* TAB 1: ABOUT THE SCHEME (Green) */}
                  {(activeTab === "about" || activeTab === "all") && (
                    <motion.div
                      key="tab-about"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="scheme-info-card scheme-info-card-green"
                    >
                      <div className="scheme-card-header-row">
                        <span className="scheme-card-icon-badge badge-green">
                          <Info size={24} />
                        </span>
                        <div className="scheme-card-title-group">
                          <h2 className="scheme-card-main-title">
                            {t.aboutScheme || "About the Scheme"}
                          </h2>
                          <div className="scheme-card-sub-meta">
                            <span className="scheme-meta-pill bg-emerald-100 text-emerald-800">
                              {text.displayCategory}
                            </span>
                            <span>•</span>
                            <span>
                              {scheme.level === "central" 
                                ? (isHi ? "भारत सरकार द्वारा संचालित" : "Administered by Government of India") 
                                : (isHi ? "राज्य सरकार द्वारा संचालित" : "Administered by State Government")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="scheme-card-description">
                        {text.displayDescription}
                      </p>

                      {/* Official Scheme Objective Subsection Card */}
                      <div className="scheme-objective-box">
                        <div className="scheme-objective-header-row">
                          <span className="scheme-objective-icon-badge">
                            <CheckCircle2 size={18} />
                          </span>
                          <h3 className="scheme-objective-title">
                            {isHi ? "योजना का मुख्य उद्देश्य:" : "Primary Scheme Objective:"}
                          </h3>
                        </div>
                        <p className="scheme-objective-content">
                          {isHi
                            ? "यह योजना लक्षित नागरिकों को सरकारी वित्तीय सहायता, बुनियादी सुविधाएं और आजीविका सुरक्षा प्रदान कर उनके जीवन स्तर को बेहतर बनाने और समाज की मुख्यधारा से जोड़ने के उद्देश्य से संचालित की जा रही है।"
                            : "This scheme is designed to directly empower eligible citizens through financial relief, institutional facilities, transparent direct-to-bank benefits, and sustainable livelihood security."}
                        </p>
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
                      className="scheme-info-card scheme-info-card-teal"
                    >
                      <div className="scheme-card-header-row">
                        <span className="scheme-card-icon-badge badge-teal">
                          <Sparkles size={24} />
                        </span>
                        <div className="scheme-card-title-group">
                          <h2 className="scheme-card-main-title">
                            {t.benefits || "Key Benefits for Citizens"}
                          </h2>
                          <span className="scheme-card-sub-meta">
                            {isHi ? "नागरिकों को मिलने वाले प्रत्यक्ष लाभ एवं सुविधाएं" : "Direct advantages and coverage provided to beneficiaries"}
                          </span>
                        </div>
                      </div>

                      {/* Benefits Cards Grid */}
                      <ul className="scheme-feature-list">
                        {text.displayBenefits?.map((item, idx) => (
                          <li key={idx} className="scheme-feature-item">
                            <span className="scheme-bullet-dot bg-teal-600" />
                            <span className="font-medium text-slate-800">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* What It Provides Sub-section */}
                      {text.displayWhatItProvides?.length > 0 && (
                        <div className="pt-6 border-t border-teal-200/60 mt-6">
                          <div className="flex items-center gap-2.5 text-teal-900 font-bold text-lg mb-4">
                            <Layers size={22} className="text-teal-700" />
                            <h3>{t.whatItProvides || "What This Scheme Provides"}</h3>
                          </div>
                          <ul className="scheme-feature-list">
                            {text.displayWhatItProvides.map((item, idx) => (
                              <li key={idx} className="scheme-feature-item bg-teal-50/70 border-teal-200/60 text-teal-950 font-medium">
                                <span className="scheme-bullet-dot bg-teal-600" />
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
                      className="scheme-info-card scheme-info-card-orange"
                    >
                      <div className="scheme-card-header-row">
                        <span className="scheme-card-icon-badge badge-orange">
                          <Banknote size={24} />
                        </span>
                        <div className="scheme-card-title-group">
                          <h2 className="scheme-card-main-title">
                            {t.financialAssistance || "Financial Assistance & Benefits"}
                          </h2>
                          <span className="scheme-card-sub-meta">
                            {isHi ? "आर्थिक सहायता राशि, अनुदान व भुगतान विवरण" : "Direct payment amounts, subsidy grants, and disbursement cycles"}
                          </span>
                        </div>
                      </div>

                      <div className="scheme-feature-list mb-6">
                        {text.displayFinancialAssistance?.map((item, idx) => (
                          <div key={idx} className="scheme-feature-item font-semibold text-slate-900 text-base sm:text-lg">
                            <span className="scheme-bullet-dot bg-amber-600 mt-2" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Direct Benefit Transfer (DBT) Callout */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 text-sm text-amber-950 font-medium flex items-start gap-3.5 border border-amber-200">
                        <ShieldCheck size={22} className="text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-amber-900 text-base mb-1">Direct Benefit Transfer (DBT) Compliant:</strong>
                          <span className="text-slate-700 leading-relaxed">
                            {isHi
                              ? "सभी वित्तीय भुगतान बिना किसी बिचौलिए या कमीशन के सीधे लाभार्थी के आधार-सीडेड बैंक खाते में पारदर्शी रूप से भेजे जाते हैं।"
                              : "All financial payments are credited directly into beneficiary's Aadhaar-linked bank accounts without intermediary deductions or commission fees."}
                          </span>
                        </div>
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
                      className="scheme-info-card scheme-info-card-purple"
                    >
                      <div className="scheme-card-header-row">
                        <span className="scheme-card-icon-badge badge-purple">
                          <UserCheck size={24} />
                        </span>
                        <div className="scheme-card-title-group">
                          <h2 className="scheme-card-main-title">
                            {t.eligibilityTitle || "Eligibility Criteria"}
                          </h2>
                          <span className="scheme-card-sub-meta">
                            {isHi ? "पात्रता शर्तें एवं अपवाद नियम" : "Qualifying conditions, household requirements, and exclusions"}
                          </span>
                        </div>
                      </div>

                      <ul className="scheme-feature-list mb-6">
                        {text.displayEligibility?.map((item, idx) => (
                          <li key={idx} className="scheme-feature-item">
                            <span className="scheme-bullet-dot bg-purple-600" />
                            <span className="font-medium text-slate-800">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Who Can Benefit Tag Summary */}
                      <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-200">
                        <strong className="block text-purple-950 font-bold mb-3 text-sm">
                          {isHi ? "लक्षित लाभार्थी समूह:" : "Target Beneficiary Groups:"}
                        </strong>
                        <div className="flex flex-wrap gap-2">
                          {text.displayBeneficiaries?.map((b) => (
                            <span key={b} className="px-3.5 py-1.5 rounded-full bg-white text-purple-900 text-xs font-bold shadow-xs border border-purple-200">
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
                      className="scheme-info-card scheme-info-card-blue"
                    >
                      <div className="scheme-card-header-row">
                        <span className="scheme-card-icon-badge badge-blue">
                          <FileCheck size={24} />
                        </span>
                        <div className="scheme-card-title-group">
                          <h2 className="scheme-card-main-title">
                            {t.documents || "Required Documents"}
                          </h2>
                          <span className="scheme-card-sub-meta">
                            {isHi ? "आवेदन के लिए आवश्यक प्रमाण पत्र व अभिलेख" : "Documents and certificates to keep ready before applying"}
                          </span>
                        </div>
                      </div>

                      <ul className="scheme-feature-list mb-6">
                        {text.displayDocuments?.map((item, idx) => (
                          <li key={idx} className="scheme-feature-item">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                              <Check size={14} />
                            </span>
                            <span className="font-medium text-slate-800">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 text-sm text-blue-950 font-medium flex items-start gap-3 border border-blue-200">
                        <span className="text-xl shrink-0">💡</span>
                        <span className="leading-relaxed">
                          {isHi
                            ? "सुझाव: अपने सभी दस्तावेज़ों की स्पष्ट फोटोकॉपी और आधार से जुड़ा चालू मोबाइल नंबर साथ रखें ताकि ओटीपी सत्यापन में कोई रुकावट न आए।"
                            : "Tip: Keep clear photocopies of your documents and have your Aadhaar-linked mobile phone ready for immediate OTP verification."}
                        </span>
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
                      className="scheme-info-card scheme-info-card-rose"
                    >
                      <div className="scheme-card-header-row">
                        <span className="scheme-card-icon-badge badge-rose">
                          <CheckCircle2 size={24} />
                        </span>
                        <div className="scheme-card-title-group">
                          <h2 className="scheme-card-main-title">
                            {t.howToApply || t.application || "How to Apply"}
                          </h2>
                          <span className="scheme-card-sub-meta">
                            {isHi ? "चरण-दर-चरण आधिकारिक आवेदन प्रक्रिया" : "Step-by-step registration and submission process"}
                          </span>
                        </div>
                      </div>

                      <ol className="scheme-feature-list mb-8">
                        {text.displaySteps?.map((step, idx) => (
                          <li key={idx} className="scheme-feature-item">
                            <span className="scheme-step-number-badge bg-rose-600">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5 font-medium text-slate-800 leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Official Link Card inside application tab */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-rose-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <strong className="block text-slate-900 font-bold text-base mb-1">
                            {t.officialWebsite || "Official Government Portal"}
                          </strong>
                          <p className="text-xs text-slate-600 m-0">
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

            {/* Persistent Official Government Portal Verification Card at Bottom */}
            <div className="scheme-portal-official-card">
              <div className="scheme-portal-info-side">
                <div className="scheme-portal-seal">
                  <ShieldCheck size={28} />
                </div>
                <div className="scheme-portal-texts">
                  <span className="scheme-portal-badge-verified">
                    <Check size={13} />
                    <span>{isHi ? "भारत सरकार अधिकृत पोर्टल" : "Government of India Verified Portal"}</span>
                  </span>
                  <h3 className="scheme-portal-title">
                    {t.officialWebsite || "Official Government Portal"} — {scheme.verificationStatus}
                  </h3>
                  <p className="scheme-portal-desc">
                    {isHi
                      ? "नवीनतम आधिकारिक दिशा-निर्देशों, पात्रता संशोधन, समय-सीमा और ऑनलाइन आवेदन की स्थिति जांचने के लिए सरकार के आधिकारिक पोर्टल पर जाएं।"
                      : "Always verify final criteria, latest policy circulars, deadlines, and application status directly on the authorized government portal."}
                  </p>
                </div>
              </div>
              {scheme.officialUrl && (
                <a
                  className="scheme-portal-action-btn"
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

          {/* Sticky Sidebar Cards */}
          <aside className="detail-aside lg:sticky lg:top-24 flex flex-col gap-5">
            <div className="side-card bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70">
              <span className="side-label text-xs font-mono font-bold uppercase text-slate-500">{t.category}</span>
              <strong className="block text-lg font-bold text-slate-900 my-2">{text.displayCategory}</strong>
              <Link to={`/categories/${scheme.category.id}`} className="text-sm font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1">
                {t.viewAll}
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="side-card authority-card bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70">
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

            <div className="side-card bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70">
              <span className="side-label text-xs font-mono font-bold uppercase text-slate-500">{isHi ? "सत्यापन तिथि" : "Last Verification"}</span>
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm my-2">
                <Calendar size={16} className="text-emerald-600" />
                <span>{scheme.lastVerified || "2026-11"}</span>
              </div>
              <p className="text-xs text-slate-500 m-0">
                {isHi ? "नियमित रूप से सरकारी वेबसाइटों से अद्यतन" : "Periodically cross-checked with official ministry publications."}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Schemes Section */}
      {related.length > 0 && (
        <section className="page-width related-section pb-20 pt-4">
          <div className="section-heading-row mb-8">
            <div>
              <p className="section-kicker text-xs font-mono font-bold uppercase text-emerald-700 mb-1">{t.related}</p>
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
