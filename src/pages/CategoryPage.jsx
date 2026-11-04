import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getCategories, getSchemes } from "../services/schemeService.js";

export default function CategoryPage() {
  const { category } = useParams(); const { language } = useApp(); const t = translations[language]; const item = getCategories().find((entry) => entry.id === category); const matches = getSchemes().filter((scheme) => scheme.category.id === category);
  if (!item) return <section className="page-width details-page"><EmptyState title={t.notFound} body={t.notFoundBody} action={t.returnHome} to="/categories" /></section>;
  return <><PageHeader eyebrow={t.nav.categories} title={language === "hi" ? item.nameHi : item.name} body={language === "hi" ? item.descriptionHi : item.description} back /><section className="page-width category-results"><div className="results-bar"><strong>{t.resultCount(matches.length)}</strong><Link className="subtle-link" to="/categories"><ArrowLeft size={14} />{t.back}</Link></div><div className="scheme-grid">{matches.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}</div></section></>;
}
