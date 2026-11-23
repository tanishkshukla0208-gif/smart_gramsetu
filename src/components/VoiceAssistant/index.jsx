import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import VoiceAssistantButton from "./VoiceAssistantButton.jsx";
import VoiceAssistantModal from "./VoiceAssistantModal.jsx";

/**
 * Authoritative Voice Assistant State Controller
 * Manages 4 strictly defined visibility states:
 * STATE 1 — CLOSED: Assistant panel hidden, no backdrop, launcher ready.
 * STATE 2 — MINIMIZED: Small floating launcher visible, 0% overlay/blur, free navigation.
 * STATE 3 — OPEN: Floating docked assistant card, interactive background, no root blur.
 * STATE 4 — NAVIGATION: On any route change, assistant minimizes cleanly, restoring sharp rendering.
 */
export default function VoiceAssistant() {
  const [assistantState, setAssistantState] = useState("closed"); // 'closed' | 'minimized' | 'open'
  const location = useLocation();

  // STATE 4 — NAVIGATION:
  // Automatically minimize the expanded panel on any route transition (clicks, action chips, back/forward)
  // Guarantees zero lingering modal overlay, zero blur, and instantaneous sharp rendering of destination.
  useEffect(() => {
    if (assistantState === "open") {
      setAssistantState("minimized");
    }
  }, [location.pathname]);

  const handleToggle = () => {
    setAssistantState((prev) => (prev === "open" ? "minimized" : "open"));
  };

  const handleMinimize = () => {
    setAssistantState("minimized");
  };

  const handleClose = () => {
    setAssistantState("closed");
  };

  return (
    <>
      {/* Floating launcher button: Always accessible and interactive in closed & minimized states */}
      <VoiceAssistantButton
        isOpen={assistantState === "open"}
        isMinimized={assistantState === "minimized"}
        onClick={handleToggle}
      />

      {/* Assistant Modal Window: ONLY rendered when open. Never lingers in DOM when closed or minimized */}
      {assistantState === "open" && (
        <VoiceAssistantModal
          isOpen={true}
          onClose={handleClose}
          onMinimize={handleMinimize}
        />
      )}
    </>
  );
}
