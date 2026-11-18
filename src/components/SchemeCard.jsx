import { motion } from "framer-motion";
import { ArrowUpRight, Bookmark, Check, GitCompareArrows, GraduationCap, HandHeart, HeartPulse, House, Leaf, Sprout, Store, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router";
import { localizeScheme } from "../services/schemeService.js";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

const icons = { Sprout, GraduationCap, House, BriefcaseBusiness, HeartPulse, Store, HandHeart };
const iconFor = (name) => icons[name] || Leaf;

export default function SchemeCard({ scheme, featured = false }) {
  const { language, savedIds, toggleSaved, compareIds, toggleCompare } = useApp();
  const t = translations[language] || translations.en;
  const text = localizeScheme(scheme, language);
  const Icon = iconFor(scheme.category.icon);
  const isSaved = savedIds.includes(scheme.id);
  const isCompared = compareIds.includes(scheme.id);

  return (
    <motion.article
      className={featured ? "scheme-card featured-card" : "scheme-card"}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-topline flex items-center justify-between gap-2">
        <span className="category-label inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border-0">
          <Icon size={14} />
          {text.displayCategory}
        </span>
        {scheme.featured && (
          <span className="featured-label text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="card-icon my-3 w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border-0 shadow-sm">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">
        {text.displayName}
      </h3>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3 mb-3">
        {text.displayDescription}
      </p>

      {/* Financial assistance preview - NO harsh box outline, soft background */}
      {text.displayFinancialAssistance?.[0] && (
        <div className="my-3 px-3.5 py-2.5 rounded-xl bg-emerald-50/80 text-emerald-950 text-sm font-semibold flex items-center gap-2 border-0 shadow-none">
          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
          <span className="line-clamp-2 leading-relaxed">{text.displayFinancialAssistance[0]}</span>
        </div>
      )}

      {/* Beneficiary tags - comfortable size, rounded pills without harsh borders */}
      <div className="audience-row flex flex-wrap gap-1.5 mt-auto pt-2">
        {text.displayBeneficiaries.slice(0, 3).map((item) => (
          <span key={item} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border-0">
            {item}
          </span>
        ))}
      </div>

      <div className="card-actions flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
        <Link className="text-link text-sm font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1" to={`/schemes/${scheme.id}`}>
          {t.details || "Details"} <ArrowUpRight size={15} />
        </Link>
        <div className="card-tools flex gap-1.5">
          <button
            className={isCompared ? "mini-action active" : "mini-action"}
            type="button"
            onClick={() => toggleCompare(scheme.id)}
            aria-label={isCompared ? (t.remove || "Remove") : (t.addCompare || "Add to compare")}
            title={isCompared ? (t.remove || "Remove") : (t.addCompare || "Add to compare")}
          >
            <GitCompareArrows size={15} />
            {isCompared && <Check size={11} />}
          </button>
          <button
            className={isSaved ? "mini-action active" : "mini-action"}
            type="button"
            onClick={() => toggleSaved(scheme.id)}
            aria-label={isSaved ? (t.remove || "Remove") : (t.save || "Save")}
            title={isSaved ? (t.remove || "Remove") : (t.save || "Save")}
          >
            <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
