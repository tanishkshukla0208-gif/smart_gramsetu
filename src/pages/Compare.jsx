import { ArrowRight, Check, GitCompareArrows, X } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { localizeScheme, getSchemes } from "../services/schemeService.js";

export default function Compare() {
  const { language, compareIds, toggleCompare, clearCompare } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  const selected = compareIds
    .map((id) => getSchemes().find((scheme) => scheme.id === id))
    .filter(Boolean);

  const attributes = [
    {
      key: "category",
      label: t.category,
      render: (scheme) => <CompareValue value={localizeScheme(scheme, language).displayCategory} />,
    },
    {
      key: "beneficiaries",
      label: t.beneficiaries,
      render: (scheme) => (
        <CompareValue value={localizeScheme(scheme, language).displayBeneficiaries?.join(", ") || "—"} />
      ),
    },
    {
      key: "benefits",
      label: t.benefits,
      render: (scheme) => <CompareList items={localizeScheme(scheme, language).displayBenefits} />,
    },
    {
      key: "eligibility",
      label: t.eligibilityTitle,
      render: (scheme) => <CompareList items={localizeScheme(scheme, language).displayEligibility} />,
    },
    {
      key: "documents",
      label: t.documents,
      render: (scheme) => <CompareList items={localizeScheme(scheme, language).displayDocuments} />,
    },
    {
      key: "application",
      label: t.application,
      render: (scheme) => <CompareList items={localizeScheme(scheme, language).displaySteps} />,
    },
  ];

  return (
    <>
      <PageHeader eyebrow={t.nav.compare} title={t.nav.compare} body={t.checkerBody}>
        {selected.length > 0 && (
          <button className="clear-saved" type="button" onClick={clearCompare}>
            <X size={15} />
            {t.clearAll}
          </button>
        )}
      </PageHeader>
      <section className="page-width compare-page">
        {selected.length < 2 ? (
          <EmptyState
            title={isHi ? "तुलना करने के लिए दो या अधिक योजनाएं जोड़ें" : "Add two or more schemes to compare"}
            body={
              isHi
                ? "योजना कार्डों पर दिए गए तुलना आइकन का उपयोग करके एक साथ तुलना करें। आप एक समय में 3 योजनाओं की तुलना कर सकते हैं।"
                : "Use the compare icon on scheme cards to build a focused, side-by-side view. You can compare up to three records."
            }
            action={t.openExplorer}
          />
        ) : (
          <div className="comparison-wrap">
            <div className="comparison-header">
              <div>
                <GitCompareArrows size={20} />
                <strong>
                  {selected.length} / 3 {t.nav.schemes}
                </strong>
              </div>
              <Link className="subtle-link" to="/schemes">
                {t.openExplorer}
                <ArrowRight size={15} />
              </Link>
            </div>

            <div
              className="comparison-matrix"
              style={{
                "--compare-count": selected.length,
              }}
            >
              {/* Row 1: Scheme Titles Header */}
              <div className="compare-row compare-row-titles">
                <div className="compare-row-label">
                  <span>{isHi ? "योजना का नाम" : "Scheme"}</span>
                </div>
                {selected.map((scheme) => {
                  const text = localizeScheme(scheme, language);
                  return (
                    <div key={scheme.id} className="comparison-title">
                      <Link to={`/schemes/${scheme.id}`} className="hover:text-emerald-700 transition-colors">
                        {text.displayName}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleCompare(scheme.id)}
                        aria-label={t.remove}
                        title={t.remove}
                        className="hover:text-red-600 transition-colors shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Data Rows */}
              {attributes.map((attr) => (
                <div key={attr.key} className="compare-row">
                  <div className="compare-row-label">
                    <span>{attr.label}</span>
                  </div>
                  {selected.map((scheme) => (
                    <div key={scheme.id} className="compare-cell-wrap">
                      {attr.render(scheme)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function CompareValue({ value }) {
  return <div className="compare-cell font-medium text-slate-700">{value}</div>;
}

function CompareList({ items }) {
  if (!items || items.length === 0) {
    return <div className="compare-cell text-slate-400 italic">—</div>;
  }
  return (
    <div className="compare-cell">
      <ul className="space-y-2">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="flex items-start gap-2 text-slate-700">
            <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
