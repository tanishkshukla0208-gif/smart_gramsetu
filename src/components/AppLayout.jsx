import { useEffect } from "react";
import { useLocation } from "react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import VoiceAssistant from "./VoiceAssistant/index.jsx";

export default function AppLayout({ children }) {
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
    </div>
  );
}

