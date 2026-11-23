import { ArrowUpRight, Globe2, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export default function VerificationBanner({ compact = false }) {
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);

  return (
    <div className={compact ? "verification-banner compact" : "verification-banner"} role="note">
      <div className="flex items-center gap-2">
        <ShieldCheck size={16} className="text-emerald-700 shrink-0" aria-hidden="true" />
        <span className="font-bold text-xs uppercase tracking-wider text-emerald-950 font-mono">
          {isHi ? "आधिकारिक स्रोत संदर्भ" : "Official Source Reference"}
        </span>
      </div>
      <p className="text-xs text-slate-600 m-0 leading-relaxed">
        {isHi
          ? "सूचना सरकारी पोर्टलों पर आधारित है। आवेदन से पूर्व संबंधित मंत्रालय के आधिकारिक पोर्टल पर विवरण की पुष्टि करें।"
          : "Information cross-referenced from government sources. Verify current rules and eligibility on the official portal."}
      </p>
      <a
        href="https://www.india.gov.in"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition underline underline-offset-2 shrink-0"
        title="National Portal of India"
      >
        <span>india.gov.in</span>
        <ArrowUpRight size={11} aria-hidden="true" />
      </a>
    </div>
  );
}
