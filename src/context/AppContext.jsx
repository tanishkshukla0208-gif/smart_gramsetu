import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE = {
  language: "gramsetu-language",
  saved: "gramsetu-saved",
  recent: "gramsetu-recent",
  compare: "gramsetu-compare",
  documents: "gramsetu-documents",
};

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readLanguage() {
  try {
    const value = localStorage.getItem(STORAGE.language);
    return value === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguageState] = useState(readLanguage);
  const [savedIds, setSavedIds] = useState(() => readArray(STORAGE.saved));
  const [recentIds, setRecentIds] = useState(() => readArray(STORAGE.recent));
  const [compareIds, setCompareIds] = useState(() => readArray(STORAGE.compare));
  const [checkedDocuments, setCheckedDocuments] = useState(() => readArray(STORAGE.documents));

  const persist = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* local-only enhancement */ }
  };

  useEffect(() => { persist(STORAGE.saved, savedIds); }, [savedIds]);
  useEffect(() => { persist(STORAGE.recent, recentIds); }, [recentIds]);
  useEffect(() => { persist(STORAGE.compare, compareIds); }, [compareIds]);
  useEffect(() => { persist(STORAGE.documents, checkedDocuments); }, [checkedDocuments]);
  useEffect(() => {
    try { localStorage.setItem(STORAGE.language, language); } catch { /* local-only enhancement */ }
    document.documentElement.lang = language === "hi" ? "hi" : "en";
  }, [language]);

  const setLanguage = (value) => setLanguageState(value === "hi" ? "hi" : "en");
  const toggleSaved = (id) => setSavedIds((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const addRecent = (id) => setRecentIds((items) => [id, ...items.filter((item) => item !== id)].slice(0, 6));
  const toggleCompare = (id) => setCompareIds((items) => items.includes(id) ? items.filter((item) => item !== id) : items.length >= 3 ? items : [...items, id]);
  const toggleDocument = (id) => setCheckedDocuments((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const clearSaved = () => setSavedIds([]);
  const clearCompare = () => setCompareIds([]);

  const value = useMemo(() => ({
    language, setLanguage, savedIds, toggleSaved, clearSaved, recentIds, addRecent,
    compareIds, toggleCompare, clearCompare, checkedDocuments, toggleDocument,
  }), [language, savedIds, recentIds, compareIds, checkedDocuments]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
