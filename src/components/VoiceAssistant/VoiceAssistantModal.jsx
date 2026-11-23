import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Minimize2,
  Send,
  Sparkles,
  ArrowRight,
  Globe,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { speechService, VOICE_LANGUAGES, getVoiceLanguage } from "../../services/speechService.js";
import { processVoiceAssistantQuery, getLocalizedStrings } from "../../services/voiceAssistantEngine.js";

const VOICE_LANG_STORAGE_KEY = "gramsetu-voice-language";
const VOICE_MESSAGES_STORAGE_KEY = "gramsetu-voice-messages";

export default function VoiceAssistantModal({ isOpen, onClose, onMinimize }) {
  const navigate = useNavigate();

  // Selected assistant language (persisted in localStorage)
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem(VOICE_LANG_STORAGE_KEY);
      if (saved && VOICE_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
      return "hi"; // Default to Hindi, with instant 1-click toggle to English and 11 other languages
    } catch {
      return "hi";
    }
  });

  const [showLangPicker, setShowLangPicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [typedInput, setTypedInput] = useState("");
  const [errorNotice, setErrorNotice] = useState(null);

  // Runtime capabilities detection
  const [capabilities, setCapabilities] = useState({
    sttSupported: false,
    ttsSupported: false,
    voiceName: null,
    provider: "Browser Web Speech API",
    hasBhashini: false,
  });

  // Conversation history with localStorage persistence across minimize/restore
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(VOICE_MESSAGES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Safe fallback
    }
    return [];
  });

  const messagesEndRef = useRef(null);
  const textInputRef = useRef(null);

  // Localized strings for current assistant language
  const strings = getLocalizedStrings(selectedLang);
  const langMeta = getVoiceLanguage(selectedLang);

  // Initialize capability detection and greeting
  useEffect(() => {
    const caps = speechService.detectLanguageCapabilities(selectedLang);
    setCapabilities(caps);

    try {
      localStorage.setItem(VOICE_LANG_STORAGE_KEY, selectedLang);
    } catch {
      // Safe ignore
    }

    // Set initial greeting if empty
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-1",
          sender: "assistant",
          text: strings.greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: [
            selectedLang === "hi" ? "किसानों के लिए योजनाएं" : "Farming Schemes",
            selectedLang === "hi" ? "छात्रवृत्ति कैसे मिलेगी?" : "Student Scholarships",
            selectedLang === "hi" ? "पीएम-किसान में कितना पैसा मिलता है?" : "PM-KISAN benefits",
            selectedLang === "hi" ? "आयुष्मान भारत योजना" : "Ayushman Bharat",
          ],
        },
      ]);
    }
  }, [selectedLang]);

  // Persist messages in localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(VOICE_MESSAGES_STORAGE_KEY, JSON.stringify(messages.slice(-25)));
      }
    } catch {
      // Safe ignore
    }
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, interimText, isListening, isOpen]);

  // Clean up speech when component unmounts
  useEffect(() => {
    return () => {
      speechService.stopListening();
      speechService.stopSpeaking();
    };
  }, []);

  // Handle switching language
  const handleLanguageChange = (newCode) => {
    if (newCode === selectedLang) return;
    speechService.stopListening();
    speechService.stopSpeaking();
    setIsListening(false);
    setIsSpeaking(false);
    setErrorNotice(null);

    setSelectedLang(newCode);
    setShowLangPicker(false);

    const newStrings = getLocalizedStrings(newCode);
    setMessages((prev) => [
      ...prev,
      {
        id: "sys-" + Date.now(),
        sender: "assistant",
        text: newStrings.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: [
          newCode === "hi" ? "किसानों के लिए योजनाएं" : "Farming Schemes",
          newCode === "hi" ? "छात्रवृत्ति योजनाएं" : "Scholarships",
          newCode === "hi" ? "आयुष्मान भारत" : "Ayushman Bharat",
        ],
      },
    ]);
  };

  // Clear conversation history
  const handleClearHistory = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    const welcome = [
      {
        id: "welcome-" + Date.now(),
        sender: "assistant",
        text: strings.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: [
          selectedLang === "hi" ? "किसानों के लिए योजनाएं" : "Farming Schemes",
          selectedLang === "hi" ? "छात्रवृत्ति कैसे मिलेगी?" : "Student Scholarships",
          selectedLang === "hi" ? "पीएम-किसान में कितना पैसा मिलता है?" : "PM-KISAN benefits",
        ],
      },
    ];
    setMessages(welcome);
    try {
      localStorage.setItem(VOICE_MESSAGES_STORAGE_KEY, JSON.stringify(welcome));
    } catch {
      // Safe ignore
    }
  };

  // Submit and process user query
  const handleQuerySubmit = async (queryText) => {
    const q = (queryText || "").trim();
    if (!q) return;

    setErrorNotice(null);
    setTypedInput("");
    setInterimText("");
    speechService.stopListening();
    setIsListening(false);

    // Append User Message
    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const response = await processVoiceAssistantQuery(q, selectedLang);
      setIsProcessing(false);

      const assistantMsg = {
        id: "assistant-" + Date.now(),
        sender: "assistant",
        text: response.text,
        speechText: response.speechText,
        actions: response.actions,
        suggestions: response.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If speech output is supported, read aloud smoothly in selected language
      if (capabilities.ttsSupported && response.speechText) {
        speechService.speak(response.speechText, {
          lang: selectedLang,
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      }
    } catch {
      setIsProcessing(false);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "assistant",
          text: strings.noMatch,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  // Toggle Microphone Listening
  const handleMicToggle = () => {
    setErrorNotice(null);

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      if (interimText) {
        handleQuerySubmit(interimText);
      }
      return;
    }

    // Stop ongoing speech before listening
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    }

    const started = speechService.startListening({
      lang: selectedLang,
      onStart: () => {
        setIsListening(true);
        setInterimText("");
      },
      onInterim: (text) => {
        setInterimText(text);
      },
      onResult: (finalText) => {
        setIsListening(false);
        handleQuerySubmit(finalText);
      },
      onError: (err) => {
        setIsListening(false);
        setErrorNotice(err.message || "Microphone recognition error");
      },
      onEnd: (finalTranscript) => {
        setIsListening(false);
        if (finalTranscript && !isProcessing) {
          handleQuerySubmit(finalTranscript);
        }
      },
    });

    if (!started && !capabilities.sttSupported) {
      setErrorNotice(
        "Voice input is not supported in this browser. Please type your query in the box below."
      );
    }
  };

  // Speak / Replay a specific message
  const handleReplayVoice = (speechText) => {
    if (!speechText) return;
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    speechService.speak(speechText, {
      lang: selectedLang,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // Stop any audio playback
  const handleStopAudio = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  // Navigate to route: Minimizes the assistant cleanly so destination page loads 100% sharp
  const handleActionClick = (action) => {
    if (action.route) {
      if (onMinimize) onMinimize();
      navigate(action.route);
    } else if (action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="voice-panel-overlay"
      role="dialog"
      aria-label="GramSetu Multilingual Voice Assistant"
      onClick={(e) => {
        // On mobile viewports, tapping the dimmed backdrop area minimizes the panel
        if (e.target === e.currentTarget && onMinimize) {
          onMinimize();
        }
      }}
    >
      <div className="voice-panel-window" onClick={(e) => e.stopPropagation()}>
        {/* =========================================================================
            HEADER: Assistant Brand, Status Indicator, Quick Language Switch & Tools
           ========================================================================= */}
        <div className="voice-header">
          <div className="voice-header-top">
            <div className="voice-brand-group">
              <div className="voice-saathi-avatar">
                <Sparkles size={20} />
              </div>
              <div className="voice-title-box">
                <h3>GramSetu Saathi (ग्रामसेतु साथी)</h3>
                <span className="voice-status-indicator">
                  <span
                    className={`voice-status-dot ${
                      isListening
                        ? "listening"
                        : isSpeaking
                        ? "speaking"
                        : isProcessing
                        ? "processing"
                        : ""
                    }`}
                  />
                  {isListening
                    ? selectedLang === "hi" ? "आपकी आवाज़ सुन रहा हूँ..." : "Listening to your voice..."
                    : isProcessing
                    ? selectedLang === "hi" ? "जानकारी खोजी जा रही है..." : "Thinking..."
                    : isSpeaking
                    ? selectedLang === "hi" ? "उत्तर सुनाया जा रहा है..." : "Speaking response..."
                    : selectedLang === "hi" ? "सहायता के लिए तैयार" : "Ready to assist"}
                </span>
              </div>
            </div>

            <div className="voice-header-actions">
              <button
                type="button"
                onClick={handleClearHistory}
                className="voice-tool-btn"
                aria-label="Clear Conversation"
                title="Clear Conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={onMinimize}
                className="voice-tool-btn"
                aria-label="Minimize Assistant"
                title="Minimize (Alt+V)"
              >
                <Minimize2 size={16} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="voice-tool-btn"
                aria-label="Close Voice Assistant"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Pinned Language Bar (Always allows 1-click switch back to Hindi or English) */}
          <div className="voice-pinned-lang-bar">
            <div className="voice-pinned-buttons">
              <button
                type="button"
                onClick={() => handleLanguageChange("hi")}
                className={`voice-lang-pill ${selectedLang === "hi" ? "active" : ""}`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange("en")}
                className={`voice-lang-pill ${selectedLang === "en" ? "active" : ""}`}
              >
                English
              </button>
              {selectedLang !== "hi" && selectedLang !== "en" && (
                <span className="voice-lang-pill active">
                  {langMeta.nativeName}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowLangPicker(true)}
              className="voice-lang-more-btn"
              title="Change language (13 languages)"
            >
              <Globe size={13} />
              <span>{langMeta.name}</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <>
          {/* Capability Strip: Truth in Multilingual Voice & Synthesizer Support */}
          <div className="voice-capability-strip">
            <span
              className={`voice-capability-badge ${
                capabilities.sttSupported ? "supported" : "limited"
              }`}
            >
              {capabilities.sttSupported ? (
                <>
                  <CheckCircle2 size={12} />
                  <span>Mic: Active ({langMeta.nativeName})</span>
                </>
              ) : (
                <>
                  <AlertCircle size={12} />
                  <span>Mic: Text Only</span>
                </>
              )}
            </span>

            <span
              className={`voice-capability-badge ${
                capabilities.ttsSupported ? "supported" : "limited"
              }`}
            >
              {capabilities.ttsSupported ? (
                <>
                  <CheckCircle2 size={12} />
                  <span>Speaker: Ready</span>
                </>
              ) : (
                <>
                  <AlertCircle size={12} />
                  <span>Speaker: Visual Text Only</span>
                </>
              )}
            </span>

            <span className="voice-provider-tag" title={capabilities.hasBhashini ? "Connected via Digital India Bhashini Pipeline" : "Using Browser Native Web Speech Service"}>
              {capabilities.hasBhashini ? "Bhashini AI" : "Web Speech"}
            </span>
          </div>

          {/* Error / Permission Notice */}
          {errorNotice && (
            <div className="p-3 mx-4 my-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold flex items-start gap-2">
              <AlertCircle size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <span className="flex-1">{errorNotice}</span>
              <button
                type="button"
                onClick={() => setErrorNotice(null)}
                className="text-amber-800 hover:text-amber-950 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* =========================================================================
              CONVERSATION THREAD: User queries, Assistant answers, Action Chips
             ========================================================================= */}
          <div className="voice-messages-wrap">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`voice-msg-row ${msg.sender === "user" ? "user" : "assistant"}`}
              >
                <div
                  className={
                    msg.sender === "user" ? "voice-bubble-user" : "voice-bubble-assistant"
                  }
                >
                  {/* Render message with line breaks */}
                  {msg.text.split("\n").map((line, idx) => {
                    if (line.startsWith("### ")) {
                      return <h3 key={idx}>{line.replace("### ", "")}</h3>;
                    }
                    if (line.startsWith("• ")) {
                      return (
                        <div key={idx} className="flex items-start gap-2 my-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                          <span>{line.replace("• ", "")}</span>
                        </div>
                      );
                    }
                    if (!line.trim()) {
                      return <div key={idx} className="h-2" />;
                    }
                    return <p key={idx}>{line}</p>;
                  })}

                  {/* Audio Readout Controls on Assistant Message */}
                  {msg.sender === "assistant" && msg.speechText && (
                    <div className="voice-audio-toolbar">
                      <button
                        type="button"
                        onClick={() => handleReplayVoice(msg.speechText)}
                        className="voice-audio-btn"
                        title="Listen to this response aloud"
                      >
                        <Volume2 size={13} />
                        <span>
                          {selectedLang === "hi"
                            ? isSpeaking ? "आवाज़ रोकें" : "बोलकर सुनाएं"
                            : isSpeaking ? "Stop Voice" : "Listen Aloud"}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Interactive Action Chips (Deep Linking to Schemes & Routes) */}
                  {msg.actions?.length > 0 && (
                    <div className="voice-action-chips">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className={`voice-action-btn ${i > 0 ? "secondary" : ""}`}
                        >
                          <span>{act.label}</span>
                          {act.url ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggestion Follow-up Pills */}
                {msg.suggestions?.length > 0 && (
                  <div className="voice-suggestions-row">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleQuerySubmit(sug)}
                        className="voice-suggest-pill"
                      >
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Sound Wave Listening Animation */}
          {isListening && (
            <div className="voice-listening-overlay">
              <div className="voice-soundwave">
                <span className="soundwave-bar" />
                <span className="soundwave-bar" />
                <span className="soundwave-bar" />
                <span className="soundwave-bar" />
                <span className="soundwave-bar" />
              </div>
              <div className="voice-live-interim">
                {interimText || (selectedLang === "hi" ? "कृपया बोलें, मैं सुन रहा हूँ..." : "Please speak now, listening...")}
              </div>
            </div>
          )}

          {/* Active Speech Playing Indicator Bar */}
          {isSpeaking && (
            <div className="voice-stop-audio-bar mx-4 mb-2">
              <div className="flex items-center gap-2">
                <Volume2 size={15} className="animate-bounce" />
                <span>{selectedLang === "hi" ? "उत्तर सुनाया जा रहा है..." : "Speaking response aloud..."}</span>
              </div>
              <button
                type="button"
                onClick={handleStopAudio}
                className="voice-stop-audio-btn"
                title="Stop audio playback"
              >
                <VolumeX size={12} />
                <span>{selectedLang === "hi" ? "रोकें" : "Stop"}</span>
              </button>
            </div>
          )}

          {/* =========================================================================
              INPUT CONTROLS BAR: Big Mic Button, Text Input, Send
             ========================================================================= */}
          <div className="voice-input-bar">
            <div className="voice-input-row">
              {/* Big Accessible Microphone Button */}
              <button
                type="button"
                onClick={handleMicToggle}
                className={`voice-mic-main-btn ${isListening ? "listening" : ""}`}
                aria-label={isListening ? "Stop listening" : "Start speaking"}
                title={isListening ? "Tap to finish speaking" : "Tap and speak your question"}
              >
                {isListening ? <MicOff size={26} /> : <Mic size={26} />}
              </button>

              {/* Text Input Fallback */}
              <div className="voice-text-input-wrap">
                <input
                  ref={textInputRef}
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleQuerySubmit(typedInput);
                  }}
                  placeholder={langMeta.placeholder || "Speak or type your question..."}
                  className="voice-text-input"
                  disabled={isListening}
                />
                <button
                  type="button"
                  onClick={() => handleQuerySubmit(typedInput)}
                  disabled={!typedInput.trim() || isListening}
                  className="voice-send-btn"
                  aria-label="Send query"
                  title="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              LANGUAGE SELECTOR MODAL (13 Official Indian Languages)
             ========================================================================= */}
          {showLangPicker && (
            <div className="voice-lang-modal-overlay" onClick={() => setShowLangPicker(false)}>
              <div
                className="voice-lang-modal-sheet"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="voice-lang-sheet-header">
                  <h4>Choose Assistant Language / भाषा चुनें</h4>
                  <button
                    type="button"
                    onClick={() => setShowLangPicker(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-xs text-slate-600 m-0">
                  Select from 13 supported Indian languages. The assistant will listen and speak in your chosen language.
                </p>

                <div className="voice-lang-grid">
                  {VOICE_LANGUAGES.map((lang) => {
                    const isActive = lang.code === selectedLang;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`voice-lang-card ${isActive ? "active" : ""}`}
                      >
                        <span className="voice-lang-card-native">{lang.nativeName}</span>
                        <span className="voice-lang-card-english">{lang.name}</span>
                        <span className="voice-lang-card-cap">{lang.bcp47} • {lang.script}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
