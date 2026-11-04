import { Info, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export default function VerificationBanner({ compact = false }) {
  const { language } = useApp(); const t = translations[language];
  return <div className={compact ? "verification-banner compact" : "verification-banner"}><ShieldCheck size={18} /><div><strong>{t.sample}</strong>{!compact && <p>{t.sampleLong}</p>}</div><Info size={16} className="verification-info" /></div>;
}
