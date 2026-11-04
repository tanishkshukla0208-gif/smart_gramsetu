import { ArrowRight, Bookmark, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getSchemes } from "../services/schemeService.js";

export default function Saved() {
  const { language, savedIds, clearSaved } = useApp(); const t = translations[language]; const [confirm, setConfirm] = useState(false); const saved = savedIds.map((id) => getSchemes().find((scheme) => scheme.id === id)).filter(Boolean);
  return <><PageHeader eyebrow={t.nav.saved} title={t.savedCount} body={t.dashboardBody}>{saved.length > 0 && <button className="clear-saved" type="button" onClick={() => setConfirm(true)}><Trash2 size={15} />{t.clearAll}</button>}</PageHeader><section className="page-width saved-page">{saved.length ? <div className="scheme-grid">{saved.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}</div> : <EmptyState title={t.emptySaved} body={t.emptySavedBody} action={t.openExplorer} />}{confirm && <div className="modal-backdrop" role="presentation"><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="clear-title"><Bookmark size={24} /><h2 id="clear-title">{t.clearSavedConfirm}</h2><div><button className="button button-ghost dark" type="button" onClick={() => setConfirm(false)}>{t.cancel}</button><button className="button button-danger" type="button" onClick={() => { clearSaved(); setConfirm(false); }}>{t.confirm}</button></div></div></div>}<div className="saved-next"><div><strong>{t.nav.compare}</strong><p>{t.checkerBody}</p></div><Link className="subtle-link" to="/compare">{t.viewAll}<ArrowRight size={15} /></Link></div></section></>;
}
