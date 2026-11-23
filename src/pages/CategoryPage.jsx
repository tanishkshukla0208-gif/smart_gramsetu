import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getCategories, getSchemes } from "../services/schemeService.js";

export default function CategoryPage() {
  const { category } = useParams();
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  const item = getCategories().find((entry) => entry.id === category);
  const matches = getSchemes().filter((scheme) => scheme.category.id === category);

  if (!item) {
    return (
      <section className="page-width details-page py-16">
        <EmptyState title={t.notFound} body={t.notFoundBody} action={t.returnHome} to="/categories" />
      </section>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={t.nav.categories}
        title={language === "hi" ? item.nameHi : item.name}
        body={language === "hi" ? item.descriptionHi : item.description}
        back
      />
      <section className="page-width category-results pb-20">
        <div className="results-bar flex items-center justify-between gap-4 py-4 mb-6 border-b border-slate-200">
          <strong className="text-base font-bold text-slate-800">
            {t.resultCount(matches.length)}
          </strong>
          <Link
            className="subtle-link inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
            to="/categories"
          >
            <ArrowLeft size={15} />
            <span>{isHi ? "सभी श्रेणियां देखें" : "All Categories"}</span>
          </Link>
        </div>
        <div className="scheme-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>
    </>
  );
}
