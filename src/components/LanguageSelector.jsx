import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe, RotateCcw, Search, X } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { INDIAN_LANGUAGES, getLanguageByCode } from "../i18n/languages.js";
import { translations } from "../i18n/translations.js";

export default function LanguageSelector() {
  const { language, setLanguage } = useApp();
  const t = translations[language] || translations.en;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const currentLang = useMemo(() => getLanguageByCode(language), [language]);
  const isEnglish = language === "en";

  // Filter languages based on search query (excluding English from the regional list so it's not duplicate with pinned card)
  const regionalLanguages = useMemo(() => {
    return INDIAN_LANGUAGES.filter((item) => item.code !== "en");
  }, []);

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return regionalLanguages;
    return regionalLanguages.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.nativeName.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q) ||
      item.script.toLowerCase().includes(q)
    );
  }, [regionalLanguages, searchQuery]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open and focus search input
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
  }, [isOpen]);

  // Select language and close
  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button in Header */}
      <button
        type="button"
        className="lang-selector-trigger"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={t.chooseLanguage || "Choose language"}
        title={isEnglish ? "Change Language (English selected)" : `Current language: ${currentLang.name} (${currentLang.nativeName}) — Click to change or switch back to English`}
      >
        <Globe size={16} className="lang-trigger-globe" />
        <span className="lang-trigger-text">{currentLang.nativeName}</span>
        {!isEnglish && <span className="lang-trigger-en-tag">EN</span>}
        <ChevronDown size={14} className={`lang-trigger-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="lang-modal-overlay"
            onClick={(e) => {
              if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div
              ref={modalRef}
              className="lang-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lang-modal-heading"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal Header */}
              <div className="lang-modal-header">
                <div className="lang-modal-title-wrap">
                  <h2 id="lang-modal-heading" className="lang-modal-title">
                    <Globe size={20} className="lang-modal-title-icon" />
                    {t.chooseLanguage || "Choose Language"}
                  </h2>
                  <p className="lang-modal-subtitle">
                    {t.selectLanguagePrompt || "Select from 22 official scheduled languages of India"}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {!isEnglish && (
                    <button
                      type="button"
                      className="lang-modal-reset-btn"
                      onClick={() => handleSelect("en")}
                      title="Reset language back to English"
                    >
                      <RotateCcw size={12} />
                      Reset to English
                    </button>
                  )}
                  <button
                    type="button"
                    className="lang-modal-close"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close language selector"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PERMANENTLY ACCESSIBLE ENGLISH OPTION (Always visible, regardless of search query) */}
              <div
                className={`lang-pinned-english ${isEnglish ? "is-active" : ""}`}
                onClick={() => handleSelect("en")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelect("en");
                  }
                }}
                aria-label="Select English (Default Language)"
              >
                <div className="lang-pinned-info">
                  <div className="lang-pinned-icon">
                    <Globe size={18} />
                  </div>
                  <div className="lang-pinned-title-box">
                    <span className="lang-pinned-title">English</span>
                    <span className="lang-pinned-sub">Default Language • Primary interface</span>
                  </div>
                </div>
                {isEnglish ? (
                  <span className="lang-pinned-active-badge">
                    <Check size={13} strokeWidth={2.5} /> Active
                  </span>
                ) : (
                  <button
                    type="button"
                    className="lang-pinned-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect("en");
                    }}
                  >
                    <RotateCcw size={13} />
                    Switch to English
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="lang-modal-search-area">
                <div className="lang-search-bar">
                  <Search size={17} className="lang-search-icon" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchLanguage || "Search Indian language or script..."}
                    className="lang-search-input"
                    aria-label={t.searchLanguage || "Search Indian language or script..."}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="lang-search-clear"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Regional Languages Grid */}
              <div className="lang-modal-body">
                {filteredLanguages.length > 0 ? (
                  <div className="lang-grid" role="listbox">
                    {filteredLanguages.map((item) => {
                      const isSelected = item.code === language;
                      const scriptClass = `script-${item.script.split(/[\s/-]+/)[0]}`;

                      return (
                        <button
                          key={item.code}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`lang-item-btn ${isSelected ? "selected" : ""}`}
                          onClick={() => handleSelect(item.code)}
                        >
                          <span className={`lang-native-text ${scriptClass}`}>
                            {item.nativeName}
                          </span>
                          <div className="lang-sub-row">
                            <span className="lang-english-text">{item.name}</span>
                          </div>
                          <span className="lang-region-badge">{item.region}</span>
                          {isSelected && (
                            <span className="lang-check-badge" aria-hidden="true">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="lang-no-results">
                    <p>{t.noLanguageFound || "No language found matching your search"}</p>
                    <button
                      type="button"
                      className="button button-ghost"
                      style={{ marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      onClick={() => handleSelect("en")}
                    >
                      <RotateCcw size={14} />
                      Switch to English
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="lang-modal-footer">
                <span>22 Official Languages of India + English</span>
                <span className="lang-footer-hint">
                  <kbd className="lang-footer-kbd">Esc</kbd> to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
