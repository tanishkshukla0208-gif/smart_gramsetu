import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router";
import { Bookmark, ChevronDown, Menu, Search, Sparkles, X } from "lucide-react";
import AvatarDropdown from "./AvatarDropdown.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import LanguageToggle from "./LanguageToggle.jsx";

const links = [
  ["/", "home"], ["/schemes", "schemes"], ["/eligibility", "eligibility"], ["/categories", "categories"], ["/dashboard", "dashboard"],
];

function linkClass({ isActive }) { return isActive ? "nav-link active" : "nav-link"; }

export default function Header() {
  const { language, setLanguage, savedIds } = useApp();
  const t = translations[language];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const nav = <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([to, key]) => <NavLink key={to} to={to} className={linkClass} end={to === "/"}>{t.nav[key]}</NavLink>)}</nav>;
  return <header className={scrolled ? "site-header scrolled" : "site-header"}>
    <div className="page-width header-inner">
      <Link className="brand" to="/" aria-label="GramSetu home"><span className="brand-symbol"><span /></span><span>Gram<span className="brand-accent">Setu</span></span></Link>
      {nav}
      <div className="header-actions">
        <Link className="icon-button saved-nav" to="/saved" aria-label={`${t.nav.saved} (${savedIds.length})`}><Bookmark size={17} /><span>{savedIds.length}</span></Link>
        <LanguageToggle language={language} onChange={setLanguage} t={t} />
        <AvatarDropdown />
        <Link className="header-cta" to="/eligibility"><Sparkles size={15} />{t.discover}<ChevronDown size={14} className="cta-arrow" /></Link>
        <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
    <AnimatePresence>{open && <motion.div className="mobile-nav-wrap" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([to, key]) => <NavLink key={to} to={to} className={linkClass} end={to === "/"}>{t.nav[key]}<ChevronDown size={15} /></NavLink>)}<NavLink to="/saved" className={linkClass}>{t.nav.saved}<span className="mobile-count">{savedIds.length}</span></NavLink><NavLink to="/compare" className={linkClass}>{t.nav.compare}</NavLink><NavLink to="/documents" className={linkClass}>{t.nav.documents}</NavLink><Link className="mobile-cta" to="/schemes"><Search size={16} />{t.explore}</Link></nav></motion.div>}</AnimatePresence>
  </header>;
}
