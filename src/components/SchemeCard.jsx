import { motion } from "framer-motion";
import { ArrowUpRight, Bookmark, Check, GitCompareArrows, GraduationCap, HandHeart, HeartPulse, House, Leaf, Sprout, Store, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router";
import { localizeScheme } from "../services/schemeService.js";
import { useApp } from "../context/AppContext.jsx";

const icons = { Sprout, GraduationCap, House, BriefcaseBusiness, HeartPulse, Store, HandHeart };
const iconFor = (name) => icons[name] || Leaf;

export default function SchemeCard({ scheme, featured = false }) {
  const { language, savedIds, toggleSaved, compareIds, toggleCompare } = useApp();
  const text = localizeScheme(scheme, language);
  const Icon = iconFor(scheme.category.icon);
  const isSaved = savedIds.includes(scheme.id);
  const isCompared = compareIds.includes(scheme.id);
  return <motion.article className={featured ? "scheme-card featured-card" : "scheme-card"} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
    <div className="card-topline"><span className="category-label"><Icon size={13} />{text.displayCategory}</span>{scheme.featured && <span className="featured-label">Featured</span>}</div>
    <div className="card-icon"><Icon size={21} /></div>
    <h3>{text.displayName}</h3>
    <p>{text.displayDescription}</p>
    <div className="audience-row">{text.displayBeneficiaries.slice(0, 2).map((item) => <span key={item}>{item}</span>)}</div>
    <div className="card-actions"><Link className="text-link" to={`/schemes/${scheme.id}`}>Details <ArrowUpRight size={14} /></Link><div className="card-tools"><button className={isCompared ? "mini-action active" : "mini-action"} type="button" onClick={() => toggleCompare(scheme.id)} aria-label={isCompared ? "Remove from comparison" : "Add to comparison"} title={isCompared ? "Remove from comparison" : "Add to comparison"}><GitCompareArrows size={15} />{isCompared && <Check size={11} />}</button><button className={isSaved ? "mini-action active" : "mini-action"} type="button" onClick={() => toggleSaved(scheme.id)} aria-label={isSaved ? "Remove saved scheme" : "Save scheme"} title={isSaved ? "Remove saved scheme" : "Save scheme"}><Bookmark size={15} fill={isSaved ? "currentColor" : "none"} /></button></div></div>
  </motion.article>;
}
