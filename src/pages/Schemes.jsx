import { useEffect, useMemo, useState } from "react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import VerificationBanner from "../components/VerificationBanner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getCategories, getSchemes, searchSchemes } from "../services/schemeService.js";

export default function Schemes() {
  const { language } = useApp(); const t = translations[language]; const [params, setParams] = useSearchParams();
  const [view, setView] = useState("grid"); const [showFilters, setShowFilters] = useState(false); const [limit, setLimit] = useState(8);
  const query = params.get("q") || ""; const category = params.get("category") || "all"; const beneficiary = params.get("beneficiary") || "all"; const level = params.get("level") || "all"; const sort = params.get("sort") || "featured";
  const categories = getCategories(); const schemes = getSchemes();
  const filtered = useMemo(() => searchSchemes(schemes, { query, category, beneficiary, level, sort }), [schemes, query, category, beneficiary, level, sort]);
  useEffect(() => setLimit(8), [query, category, beneficiary, level, sort]);
  const update = (key, value) => { const next = new URLSearchParams(params); if (!value || value === "all" || value === "featured") next.delete(key); else next.set(key, value); setParams(next); };
  const clear = () => setParams({});
  return <><PageHeader eyebrow={t.nav.schemes} title={t.featured} body={t.featuredBody}><VerificationBanner compact /></PageHeader><section className="page-width explorer"><div className="explorer-toolbar"><SearchBar value={query} onChange={(value) => update("q", value)} t={t} /><button className="filter-toggle" type="button" onClick={() => setShowFilters((value) => !value)}><SlidersHorizontal size={16} />{t.filters}</button><div className="view-toggle" role="group" aria-label="View mode"><button className={view === "grid" ? "active" : ""} type="button" onClick={() => setView("grid")} aria-label={t.grid}><Grid2X2 size={16} /></button><button className={view === "list" ? "active" : ""} type="button" onClick={() => setView("list")} aria-label={t.list}><List size={17} /></button></div></div><div className={showFilters ? "filter-panel open" : "filter-panel"}><label>{t.category}<select value={category} onChange={(event) => update("category", event.target.value)}><option value="all">{t.allCategories}</option>{categories.map((item) => <option key={item.id} value={item.id}>{language === "hi" ? item.nameHi : item.name}</option>)}</select></label><label>{t.beneficiaries}<select value={beneficiary} onChange={(event) => update("beneficiary", event.target.value)}><option value="all">{t.allBeneficiaries}</option>{Object.entries(t.audience).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label><label>{t.level}<select value={level} onChange={(event) => update("level", event.target.value)}><option value="all">{t.allLevels}</option><option value="central">{t.central}</option><option value="state">{t.state}</option></select></label><label>{t.sort}<select value={sort} onChange={(event) => update("sort", event.target.value)}><option value="featured">{t.featuredSort}</option><option value="name">{t.nameSort}</option><option value="category">{t.categorySort}</option><option value="newest">{t.newestSort}</option></select></label><button type="button" className="clear-filter" onClick={clear}>{t.clearFilters}</button></div><div className="results-bar"><strong>{t.resultCount(filtered.length)}</strong><span>{query ? `“${query}”` : t.sample}</span>{(query || category !== "all" || beneficiary !== "all" || level !== "all") && <button type="button" onClick={clear}>{t.clearFilters}</button>}</div>{filtered.length ? <div className={view === "list" ? "scheme-grid list-view" : "scheme-grid"}>{filtered.slice(0, limit).map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}</div> : <EmptyState title={t.noResults} body={t.noResultsBody} action={t.clearFilters} to="/schemes" />}{limit < filtered.length && <button className="load-more" type="button" onClick={() => setLimit((value) => value + 8)}>{t.loadMore}</button>}</section></>;
}
