import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, t, onSubmit, large = false }) {
  const inputRef = useRef(null);

  // Preserve working keyboard search shortcut without displaying redundant visual clutter
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form
      role="search"
      className={large ? "search-field search-field-large" : "search-field"}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Search className="search-icon" size={large ? 20 : 18} aria-hidden="true" />
      <label htmlFor={large ? "hero-search-input" : "search-input"} className="sr-only">
        {t.searchLabel || "Search schemes"}
      </label>
      <input
        ref={inputRef}
        id={large ? "hero-search-input" : "search-input"}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.searchPlaceholder || "Search schemes, benefits, categories or keywords..."}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          className="clear-search"
          type="button"
          aria-label={t.clear || "Clear search"}
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
        >
          <X size={15} aria-hidden="true" />
        </button>
      )}
      {large && (
        <button className="search-submit" type="submit">
          <Search size={16} aria-hidden="true" className="search-submit-icon" />
          <span>{t.search || "Search"}</span>
        </button>
      )}
    </form>
  );
}
