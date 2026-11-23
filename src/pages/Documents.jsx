import { Check, ClipboardCheck, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader.jsx";
import VerificationBanner from "../components/VerificationBanner.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getSchemes, localizeScheme } from "../services/schemeService.js";

const common = ["Identity proof", "Address proof", "Income certificate", "Educational documents", "Bank account details", "Category or disability certificate"];

export default function Documents() {
  const { language, checkedDocuments, toggleDocument } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  const schemes = getSchemes();
  const [selectedId, setSelectedId] = useState("");
  const selected = selectedId ? schemes.find((scheme) => scheme.id === selectedId) : null;
  const text = localizeScheme(selected, language);
  const items = text?.displayDocuments || common;
  const completed = items.filter((item) =>
    checkedDocuments.includes(`${selectedId || "general"}:${item}`)
  ).length;

  return (
    <>
      <PageHeader
        eyebrow={t.nav.documents}
        title={isHi ? "दस्तावेज़ों की स्पष्ट तैयारी" : "Prepare with clarity"}
        body={
          isHi
            ? "संबंधित सरकारी कार्यालय जाने से पहले एक व्यावहारिक दस्तावेज़ चेकलिस्ट तैयार करें।"
            : "Create a practical checklist before you approach the responsible authority."
        }
      />

      <section className="page-width documents-page pb-20">

        {/* Scheme Selector Toolbar & Progress */}
        <div className="document-toolbar flex flex-col sm:flex-row sm:items-end justify-between gap-4 my-6">
          <label className="flex-1 max-w-xl flex flex-col gap-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              {isHi ? "योजना के अनुसार दस्तावेज़ चुनें" : "Select Scheme for Document List"}
            </span>
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">
                {isHi ? "सामान्य दस्तावेज़ सूची (General Checklist)" : "Common starting checklist"}
              </option>
              {schemes.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {language === "hi" ? scheme.nameHi : scheme.name}
                </option>
              ))}
            </select>
          </label>

          <div className="check-progress flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-xl border sm:border-0 border-slate-200/60">
            <strong className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {completed} / {items.length}
            </strong>
            <span className="text-xs font-semibold text-slate-500">
              {isHi ? "तैयार दस्तावेज़" : "documents verified locally"}
            </span>
            <div className="w-28 sm:w-36 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${items.length > 0 ? (completed / items.length) * 100 : 0}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

        </div>

        {/* Main Document Checklist & Advisory Layout */}
        <div className="document-layout grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <section className="document-list lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="panel-heading flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <span className="section-kicker text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  {selected ? text.displayName : isHi ? "आवेदन से पहले" : "Before you apply"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">
                  {isHi ? "आवश्यक दस्तावेज़ चेकलिस्ट" : "Document Checklist"}
                </h2>
              </div>
              <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                <ClipboardCheck size={22} />
              </span>
            </div>

            <div className="space-y-2">
              {items.map((item) => {
                const key = `${selectedId || "general"}:${item}`;
                const checked = checkedDocuments.includes(key);
                return (
                  <button
                    className={`document-item w-full flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      checked
                        ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                        : "bg-white border-slate-100 hover:bg-slate-50 text-slate-700"
                    }`}
                    type="button"
                    key={item}
                    onClick={() => toggleDocument(key)}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
                        checked
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {checked && <Check size={14} strokeWidth={3} />}
                    </span>
                    <strong className="text-sm sm:text-base font-semibold leading-relaxed">
                      {item}
                    </strong>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="document-aside bg-amber-50/80 rounded-3xl p-6 sm:p-7 border border-amber-200/70 shadow-xs flex flex-col gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Info size={20} />
            </span>
            <h2 className="text-lg font-bold text-amber-950 m-0">
              {isHi ? "दस्तावेज़ मार्गदर्शन सूचना" : "Use the list as a prompt"}
            </h2>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed m-0">
              {isHi
                ? "वास्तविक आवश्यकताएं योजना, वर्तमान नियमों और संबंधित प्राधिकरण पर निर्भर करती हैं। इस सूची का कोई दस्तावेज़ हर योजना के लिए आवश्यक नहीं हो सकता।"
                : "Actual requirements depend on the scheme, current government circulars, and the responsible authority. A document on this list may not be required for every category."}
            </p>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed m-0 pt-2 border-t border-amber-200/60 font-medium">
              {isHi
                ? "GramSetu पर कोई भी निजी दस्तावेज अपलोड न करें। केवल अधिकृत सरकारी पोर्टल या CSC केंद्र का ही उपयोग करें।"
                : "Do not upload or share confidential identity documents on third-party sites. Use only the authorized government portal or official CSC centre."}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
