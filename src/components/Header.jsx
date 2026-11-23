import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router";
import {
  Bookmark,
  ChevronDown,
  Menu,
  RotateCcw,
  Sparkles,
  X,
  FileText,
  User,
} from "lucide-react";
import AvatarDropdown from "./AvatarDropdown.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import LanguageSelector from "./LanguageSelector.jsx";

const links = [
  ["/", "home"],
  ["/schemes", "schemes"],
  ["/eligibility", "eligibility"],
  ["/categories", "categories"],
  ["/dashboard", "dashboard"],
];

function linkClass({ isActive }) {
  return isActive ? "nav-link active" : "nav-link";
}

export default function Header() {
  const { language, setLanguage, savedIds } = useApp();
  const t = translations[language] || translations.en;
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="header-inner">
        {/* LEFT: Brand Identity */}
        <div className="header-left">
          <Link className="brand" to="/" aria-label="GramSetu home">
            <span className="brand-symbol" aria-hidden="true"><span /></span>
            <span className="brand-text">Gram<span className="brand-accent">Setu</span></span>
          </Link>
        </div>

        {/* CENTER: Primary Navigation Links */}
        <nav className="header-center desktop-nav" aria-label="Primary navigation">
          {links.map(([to, key]) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              end={to === "/"}
            >
              {t.nav[key]}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT: Action Controls (Unified 38px Height) */}
        <div className="header-right header-actions">
          {/* 1. Bookmarks with Notification Count */}
          <Link
            className="saved-nav"
            to="/saved"
            aria-label={`${t.nav.saved} (${savedIds ? savedIds.length : 0})`}
            title={`Saved Schemes (${savedIds ? savedIds.length : 0})`}
          >
            <Bookmark size={16} />
            {savedIds && savedIds.length > 0 && (
              <span className="saved-nav-badge">
                {savedIds.length > 99 ? "99+" : savedIds.length}
              </span>
            )}
          </Link>

          {/* 2. Language Selector */}
          <LanguageSelector />

          {/* Quick Reset back to English when non-English */}
          {language !== "en" && (
            <button
              type="button"
              className="quick-reset-en-btn"
              onClick={() => setLanguage("en")}
              title="Reset language back to English"
              aria-label="Reset language back to English"
            >
              <RotateCcw size={13} />
              <span className="reset-en-label">English</span>
            </button>
          )}

          {/* 3. User Profile Dropdown */}
          <AvatarDropdown />

          {/* 4. Discover My Schemes CTA */}
          <Link className="header-cta" to="/eligibility">
            <Sparkles size={14} className="cta-sparkle" />
            <span>{t.discover}</span>
            <ChevronDown size={13} className="cta-arrow" />
          </Link>

          {/* 5. Mobile Menu Toggle */}
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav-wrap"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top utility row inside mobile menu */}
            <div className="mobile-utility-bar">
              <LanguageSelector />
              {language !== "en" && (
                <button
                  type="button"
                  className="quick-reset-en-btn"
                  onClick={() => {
                    setLanguage("en");
                    setOpen(false);
                  }}
                  title="Reset language back to English"
                >
                  <RotateCcw size={13} />
                  <span>Reset to English</span>
                </button>
              )}
            </div>

            {/* Links */}
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <div className="mobile-nav-section-label">Main Menu</div>
              {links.map(([to, key]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={linkClass}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                >
                  <span>{t.nav[key]}</span>
                  <ChevronDown size={14} className="mobile-nav-arrow" />
                </NavLink>
              ))}

              <div className="mobile-nav-section-label">Citizen Utilities</div>
              <NavLink
                to="/saved"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <div className="mobile-nav-icon-label">
                  <Bookmark size={16} />
                  <span>{t.nav.saved}</span>
                </div>
                <span className="mobile-count-pill">{savedIds ? savedIds.length : 0}</span>
              </NavLink>

              <NavLink
                to="/compare"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <div className="mobile-nav-icon-label">
                  <Sparkles size={16} />
                  <span>{t.nav.compare}</span>
                </div>
              </NavLink>

              <NavLink
                to="/documents"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <div className="mobile-nav-icon-label">
                  <FileText size={16} />
                  <span>{t.nav.documents}</span>
                </div>
              </NavLink>

              <NavLink
                to="/account/profile"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <div className="mobile-nav-icon-label">
                  <User size={16} />
                  <span>My Profile</span>
                </div>
              </NavLink>

              <Link
                className="mobile-cta"
                to="/eligibility"
                onClick={() => setOpen(false)}
              >
                <Sparkles size={16} />
                <span>{t.discover}</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
