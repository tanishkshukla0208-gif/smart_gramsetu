import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getCategories, getSchemes } from "../services/schemeService.js";

export default function Categories() {
  const { language } = useApp(); const t = translations[language]; const categories = getCategories(); const schemes = getSchemes();
  return <><PageHeader eyebrow={t.nav.categories} title={t.browse} body={t.browseBody} /><section className="page-width category-page"><div className="category-explorer-grid">{categories.map((category, index) => <Link className="large-category-card" key={category.id} to={`/categories/${category.id}`}><span className="large-category-number">0{index + 1}</span><span className="large-category-icon"><CategoryIcon name={category.icon} size={28} /></span><h2>{language === "hi" ? category.nameHi : category.name}</h2><p>{language === "hi" ? category.descriptionHi : category.description}</p><div><span>{schemes.filter((scheme) => scheme.category.id === category.id).length} {t.nav.schemes}</span><ArrowRight size={17} /></div></Link>)}</div></section></>;
}
