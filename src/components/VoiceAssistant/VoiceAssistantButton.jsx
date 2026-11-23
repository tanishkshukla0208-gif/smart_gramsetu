import { Mic, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useApp } from "../../context/AppContext.jsx";

export default function VoiceAssistantButton({ isOpen, isMinimized, onClick }) {
  const { language } = useApp();
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);

  // Keyboard shortcut: Alt + V to toggle voice assistant
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "v" || e.key === "V")) {
        e.preventDefault();
        onClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClick]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`voice-assistant-fab ${isOpen ? "is-active" : ""} ${isMinimized ? "is-minimized" : ""}`}
      aria-label="GramSetu Voice Saathi Assistant (Alt + V)"
      aria-expanded={isOpen}
      title={isOpen ? "Minimize Voice Assistant (Alt + V)" : "Open GramSetu Multilingual Voice Assistant (Alt + V)"}
    >
      <div className="voice-fab-icon-wrap">
        <div className="voice-fab-pulse-ring" />
        {isMinimized ? <Sparkles size={20} /> : <Mic size={20} />}
      </div>
      <div className="voice-fab-text">
        <span className="voice-fab-primary">
          {isMinimized ? (isHi ? "साथी (चालू)" : "Saathi (Active)") : (isHi ? "बोलकर पूछें" : "Voice Saathi")}
        </span>
        <span className="voice-fab-secondary">
          {isHi ? "आवाज़ साथी (Alt+V)" : "AI Assistant (Alt+V)"}
        </span>
      </div>
    </button>
  );
}
