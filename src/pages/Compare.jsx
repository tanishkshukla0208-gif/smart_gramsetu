import { ArrowRight, Check, GitCompareArrows, X } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { localizeScheme, getSchemes } from "../services/schemeService.js";

export default function Compare() {
  const { language, compareIds, toggleCompare, clearCompare } = useApp(); const t = translations[language]; const selected = compareIds.map((id) => getSchemes().find((scheme) => scheme.id === id)).filter(Boolean);
  return <><PageHeader eyebrow={t.nav.compare} title={t.nav.compare} body={t.checkerBody}>{selected.length > 0 && <button className="clear-saved" type="button" onClick={clearCompare}><X size={15} />{t.clearAll}</button>}</PageHeader><section className="page-width compare-page">{selected.length < 2 ? <EmptyState title="Add two or more schemes to compare" body="Use the compare icon on scheme cards to build a focused, side-by-side view. You can compare up to three records." action={t.openExplorer} /> : <div className="comparison-wrap"><div className="comparison-header"><div><GitCompareArrows size={20} /><strong>{selected.length} / 3 {t.nav.schemes}</strong></div><Link className="subtle-link" to="/schemes">{t.openExplorer}<ArrowRight size={15} /></Link></div><div className="comparison-table"><div className="comparison-labels"><span>{t.category}</span><span>{t.beneficiaries}</span><span>{t.benefits}</span><span>{t.eligibilityTitle}</span><span>{t.documents}</span><span>{t.application}</span></div>{selected.map((scheme) => <ComparisonColumn key={scheme.id} scheme={scheme} language={language} t={t} onRemove={() => toggleCompare(scheme.id)} />)}</div></div>}</section></>;
}

function ComparisonColumn({ scheme, language, t, onRemove }) {
  const text = localizeScheme(scheme, language);
  return <div className="comparison-column"><div className="comparison-title"><Link to={`/schemes/${scheme.id}`}>{text.displayName}</Link><button type="button" onClick={onRemove} aria-label={t.remove}><X size={15} /></button></div><CompareValue value={text.displayCategory} /><CompareValue value={text.displayBeneficiaries.join(", ")} /><CompareList items={text.displayBenefits} /><CompareList items={text.displayEligibility} /><CompareList items={text.displayDocuments} /><CompareList items={text.displaySteps} /></div>;
}

function CompareValue({ value }) { return <div className="compare-cell">{value}</div>; }
function CompareList({ items }) { return <div className="compare-cell"><ul>{items.slice(0, 3).map((item) => <li key={item}><Check size={12} />{item}</li>)}</ul></div>; }
