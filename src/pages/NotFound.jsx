import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export default function NotFound() {
  const { language } = useApp(); const t = translations[language];
  return <section className="page-width not-found"><div className="not-found-orbit"><span>404</span><Compass size={38} /></div><p className="section-kicker">GramSetu / 404</p><h1>{t.notFound}</h1><p>{t.notFoundBody}</p><div className="hero-actions"><Link className="button button-primary" to="/"><ArrowLeft size={16} />{t.returnHome}</Link><Link className="button button-ghost dark" to="/schemes">{t.explore}</Link></div></section>;
}
