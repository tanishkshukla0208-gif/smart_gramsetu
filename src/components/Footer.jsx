import { Link } from "react-router";
import { ArrowUpRight, Globe2, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export default function Footer() {
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-container">
        {/* 4-Column Structured Main Footer */}
        <div className="footer-main-grid">
          
          {/* SECTION A — BRAND IDENTITY */}
          <div className="footer-brand-col">
            <Link className="footer-brand-logo" to="/" aria-label="GramSetu Home">
              <span className="brand-symbol" aria-hidden="true">
                <span />
              </span>
              <span className="brand-text">
                Gram<span className="brand-accent">Setu</span>
              </span>
            </Link>

            <p className="footer-description">
              {t.footerBrandDesc ||
                "Connecting citizens with government welfare schemes, public services and opportunities through one accessible digital platform."}
            </p>

            <div className="footer-disclosure-badge">
              <ShieldCheck size={14} className="disclosure-icon" aria-hidden="true" />
              <span>{t.independentInitiative || "Independent Public Discovery Initiative"}</span>
            </div>

            <div className="footer-source-note">
              <Globe2 size={13} aria-hidden="true" />
              <span>{t.nationalPortalAttribution || "Cross-referenced with official portals including India.gov.in"}</span>
              <a
                href="https://www.india.gov.in"
                target="_blank"
                rel="noreferrer"
                className="footer-source-link"
                title="National Portal of India (External Official Link)"
              >
                india.gov.in
                <ArrowUpRight size={11} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* SECTION B — EXPLORE */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">
              {t.footerExplore || "Explore"}
            </h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/">{t.nav?.home || "Home"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/schemes">{t.nav?.schemes || "Explore Schemes"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/categories">{t.nav?.categories || "Categories"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/eligibility">{t.discoverMySchemes || "Discover My Schemes"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/saved">{t.nav?.saved || "Saved Schemes"}</Link>
              </li>
            </ul>
          </div>

          {/* SECTION C — PUBLIC SERVICES */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">
              {t.footerResources || "Public Services"}
            </h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/eligibility">{t.nav?.eligibility || "Eligibility"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/application-guide">{t.applicationGuide || "Application Guide"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/documents">{t.nav?.documents || "Documents"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/faq">{t.faq || "Frequently Asked Questions"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/schemes">{t.schemeInfo || "Scheme Information"}</Link>
              </li>
            </ul>
          </div>

          {/* SECTION D — ABOUT GRAMSETU */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">
              {t.footerAboutBrand || "About GramSetu"}
            </h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/about">{t.about || "About Us"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about#contact">{t.contact || "Contact"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/faq">{t.helpSupport || "Help & Support"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about#privacy">{t.privacyPolicy || "Privacy Policy"}</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about#terms">{t.termsOfUse || "Terms of Use"}</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="footer-bottom-bar">
        <div className="footer-container footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} GramSetu. {t.allRightsReserved || "All rights reserved."}
          </p>

          <nav className="footer-legal-links" aria-label="Legal and contact links">
            <Link to="/about#privacy">{t.privacyPolicy || "Privacy Policy"}</Link>
            <span className="footer-legal-separator" aria-hidden="true">•</span>
            <Link to="/about#terms">{t.termsOfUse || "Terms of Use"}</Link>
            <span className="footer-legal-separator" aria-hidden="true">•</span>
            <Link to="/about#contact">{t.contact || "Contact"}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
