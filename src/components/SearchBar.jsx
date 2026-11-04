import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, t, onSubmit, large = false }) {
  return (
    <form className={large ? "search-field search-field-large" : "search-field"} onSubmit={(event) => { event.preventDefault(); onSubmit?.(value); }}>
      <Search className="search-icon" size={large ? 21 : 18} aria-hidden="true" />
      <span className="sr-only">{t.searchLabel}</span>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={t.searchPlaceholder} autoComplete="off" />
      {value && <button className="clear-search" type="button" aria-label={t.clear} onClick={() => onChange("")}><X size={15} /></button>}
      {large && <button className="search-submit" type="submit">{t.search}</button>}
    </form>
  );
}
