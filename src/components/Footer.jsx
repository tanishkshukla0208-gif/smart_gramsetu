import { Link } from "react-router";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export default function Footer() {
  const { language } = useApp();
  const t = translations[language];
  return <footer className="site-footer"><div className="page-width footer-top"><div className="footer-brand"><Link className="brand" to="/"><span className="brand-symbol"><span /></span><span>Gram<span className="brand-accent">Setu</span></span></Link><p>{t.footerNote}</p><div className="footer-trust"><ShieldCheck size={15} />{t.sample}</div></div><div className="footer-links"><div><b>{t.footerExplore}</b><Link to="/schemes">{t.nav.schemes}</Link><Link to="/categories">{t.nav.categories}</Link><Link to="/saved">{t.nav.saved}</Link></div><div><b>{t.footerResources}</b><Link to="/eligibility">{t.nav.eligibility}</Link><Link to="/application-guide">{t.applicationGuide}</Link><Link to="/documents">{t.nav.documents}</Link><Link to="/faq">{t.faq}</Link></div><div><b>{t.more}</b><Link to="/about">{t.about}</Link><Link to="/dashboard">{t.nav.dashboard}</Link><a href="https://www.india.gov.in/" target="_blank" rel="noreferrer">{t.official} <ArrowUpRight size={12} /></a></div></div></div><div className="page-width footer-bottom"><span>© {new Date().getFullYear()} GramSetu</span><span>{t.sampleLong}</span></div></footer>;
}
