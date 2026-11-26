import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, GitCompareArrows, X } from "lucide-react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import VoiceAssistant from "./VoiceAssistant/index.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function AppLayout({ children }) {
  const { language, compareNotice, clearCompareNotice } = useApp();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Dismiss compare notice on Escape key
  useEffect(() => {
    if (!compareNotice) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        clearCompareNotice();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [compareNotice, clearCompareNotice]);

  return (
    <div className="app-shell">
      {/* System 6: Top Scroll Progress Indicator */}
      <motion.div
        className="top-scroll-progress-bar"
        style={{ scaleX }}
        aria-hidden="true"
      />
      {/* System 2: Cinematic Background Motion */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-shimmer-sweep" />
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
        <div className="blob blob4" />
      </div>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <VoiceAssistant />

      {/* Compare Limit Toast Notification */}
      <AnimatePresence>
        {compareNotice && (
          <motion.aside
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white shadow-2xl border border-amber-500/30 flex items-start gap-3.5"
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <GitCompareArrows size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-amber-300 m-0">
                {language === "hi" ? "तुलना सीमा समाप्त (अधिकतम 3)" : "Comparison Limit Reached (Max 3)"}
              </h4>
              <p className="text-xs text-slate-300 mt-1 mb-2.5 leading-relaxed">
                {language === "hi"
                  ? "आप एक समय में अधिकतम 3 योजनाओं की तुलना कर सकते हैं। नई योजना जोड़ने से पहले किसी एक को हटाएं।"
                  : "You can compare up to 3 schemes at a time. Remove an existing scheme before adding another."}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/compare"
                  onClick={clearCompareNotice}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 rounded underline px-1 py-0.5"
                >
                  {language === "hi" ? "तुलना पृष्ठ देखें" : "View Comparison"}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={clearCompareNotice}
              aria-label={language === "hi" ? "सूचना बंद करें (Escape दबाएं)" : "Dismiss notice (press Escape)"}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

