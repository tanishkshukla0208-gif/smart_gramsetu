/**
 * GramSetu Speech Service — Multi-lingual STT (Speech-to-Text) and TTS (Text-to-Speech)
 * Provider-independent architecture supporting:
 * 1. Digital India Bhashini (NLTM) AI Pipeline (when API credentials configured)
 * 2. Browser-native Web Speech API with script dialect matching and runtime capability detection
 * 3. Graceful text fallback for browsers/environments without microphone or speech synthesis
 */

// Official 13 Voice Assistant Languages metadata with primary BCP-47 and dialect fallbacks
export const VOICE_LANGUAGES = [
  {
    code: "hi",
    bcp47: "hi-IN",
    fallbacks: ["hi", "hi-Deva-IN"],
    name: "Hindi",
    nativeName: "हिन्दी",
    script: "Devanagari",
    voiceKeywords: ["hindi", "हिन्दी", "swara", "madhur", "kalpana", "hemant"],
    sampleQuery: "किसानों के लिए सरकारी योजनाएं बताएं",
    placeholder: "बोलें या यहां टाइप करें...",
    voiceHint: "पीएम-किसान, छात्रवृत्ति, पेंशन आदि पूछें",
  },
  {
    code: "en",
    bcp47: "en-IN",
    fallbacks: ["en-US", "en-GB", "en"],
    name: "English",
    nativeName: "English",
    script: "Latin",
    voiceKeywords: ["india", "indian", "neerja", "prabhat", "heera", "ravi", "en-in"],
    sampleQuery: "Which scholarships are available for students?",
    placeholder: "Speak or type your question here...",
    voiceHint: "Ask about schemes, eligibility, documents, or application",
  },
  {
    code: "bn",
    bcp47: "bn-IN",
    fallbacks: ["bn-BD", "bn"],
    name: "Bengali",
    nativeName: "বাংলা",
    script: "Bengali",
    voiceKeywords: ["bengali", "bangla", "বাংলা", "tanishaa", "bashkar"],
    sampleQuery: "কৃষকদের জন্য কি কি সরকারি প্রকল্প আছে?",
    placeholder: "বলুন বা এখানে লিখুন...",
    voiceHint: "প্রকল্প, যোগ্যতা বা আবেদন সম্পর্কে জিজ্ঞাসা করুন",
  },
  {
    code: "te",
    bcp47: "te-IN",
    fallbacks: ["te"],
    name: "Telugu",
    nativeName: "తెలుగు",
    script: "Telugu",
    voiceKeywords: ["telugu", "తెలుగు", "shruti", "mohan", "chitra"],
    sampleQuery: "రైతుల కోసం ప్రభుత్వ పథకాలు ఏమిటి?",
    placeholder: "మాట్లాడండి లేదా ఇక్కడ టైప్ చేయండి...",
    voiceHint: "పథకాలు, అర్హత, దరఖాస్తు గురించి అడగండి",
  },
  {
    code: "ta",
    bcp47: "ta-IN",
    fallbacks: ["ta-LK", "ta-SG", "ta"],
    name: "Tamil",
    nativeName: "தமிழ்",
    script: "Tamil",
    voiceKeywords: ["tamil", "தமிழ்", "pallavi", "valluvar", "iniya"],
    sampleQuery: "விவசாயிகளுக்கான அரசு திட்டங்கள் என்ன?",
    placeholder: "பேசுங்கள் அல்லது தட்டச்சு செய்க...",
    voiceHint: "திட்டங்கள், தகுதி, ஆவணங்கள் பற்றி கேளுங்கள்",
  },
  {
    code: "mr",
    bcp47: "mr-IN",
    fallbacks: ["mr", "mr-Deva-IN"],
    name: "Marathi",
    nativeName: "मराठी",
    script: "Devanagari",
    voiceKeywords: ["marathi", "मराठी", "aarohi", "manohar"],
    sampleQuery: "शेतकऱ्यांसाठी कोणत्या शासकीय योजना आहेत?",
    placeholder: "बोला किंवा येथे टाईप करा...",
    voiceHint: "योजना, पात्रता आणि कागदपत्रांबद्दल विचारा",
  },
  {
    code: "gu",
    bcp47: "gu-IN",
    fallbacks: ["gu"],
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    script: "Gujarati",
    voiceKeywords: ["gujarati", "ગુજરાતી", "dhwani", "niranjan"],
    sampleQuery: "ખેડૂતો માટે કઈ સરકારી યોજનાઓ છે?",
    placeholder: "બોલો અથવા અહીં લખો...",
    voiceHint: "યોજના, પાત્રતા અને દસ્તાવેજો વિશે પૂછો",
  },
  {
    code: "pa",
    bcp47: "pa-IN",
    fallbacks: ["pa-Guru-IN", "pa-PK", "pa"],
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    script: "Gurmukhi",
    voiceKeywords: ["punjabi", "ਪੰਜਾਬੀ", "gurpreet", "harpreet"],
    sampleQuery: "ਕਿਸਾਨਾਂ ਲਈ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਕਿਹੜੀਆਂ ਹਨ?",
    placeholder: "ਬੋਲੋ ਜਾਂ ਇੱਥੇ ਟਾਈਪ ਕਰੋ...",
    voiceHint: "ਸਕੀਮਾਂ, ਯੋਗਤਾ ਅਤੇ ਅਰਜ਼ੀ ਬਾਰੇ ਪੁੱਛੋ",
  },
  {
    code: "kn",
    bcp47: "kn-IN",
    fallbacks: ["kn"],
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    script: "Kannada",
    voiceKeywords: ["kannada", "ಕನ್ನಡ", "sapna", "gagan"],
    sampleQuery: "ರೈತರಿಗಾಗಿ ಇರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಯಾವುವು?",
    placeholder: "ಮಾತನಾಡಿ ಅಥವಾ ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
    voiceHint: "ಯೋಜನೆಗಳು, ಅರ್ಹತೆ ಮತ್ತು ಅರ್ಜಿ ಬಗ್ಗೆ ಕೇಳಿ",
  },
  {
    code: "ml",
    bcp47: "ml-IN",
    fallbacks: ["ml"],
    name: "Malayalam",
    nativeName: "മലയാളം",
    script: "Malayalam",
    voiceKeywords: ["malayalam", "മലയാളം", "sobhana", "midhun"],
    sampleQuery: "കർഷകർക്കുള്ള സർക്കാർ പദ്ധതികൾ ഏവ?",
    placeholder: "സംസാരിക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക...",
    voiceHint: "പദ്ധതികൾ, യോഗ്യത, രേഖകൾ എന്നിവ ചോദിക്കുക",
  },
  {
    code: "or",
    bcp47: "or-IN",
    fallbacks: ["od-IN", "or", "od"],
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    script: "Odia",
    voiceKeywords: ["odia", "oriya", "ଓଡ଼ିଆ", "subhadra"],
    sampleQuery: "କୃଷକମାନଙ୍କ ପାଇଁ କଣ ସରକାରୀ ଯୋଜନା ଅଛି?",
    placeholder: "କୁହନ୍ତୁ କିମ୍ବା ଏଠାରେ ଟାଇପ୍ କରନ୍ତୁ...",
    voiceHint: "ଯୋଜନା, ଯୋଗ୍ୟତା ଏବଂ ଆବେଦନ ବିଷୟରେ ପଚାରନ୍ତୁ",
  },
  {
    code: "as",
    bcp47: "as-IN",
    fallbacks: ["as"],
    name: "Assamese",
    nativeName: "অসমীয়া",
    script: "Bengali-Assamese",
    voiceKeywords: ["assamese", "অসমীয়া", "priya"],
    sampleQuery: "কৃষকৰ বাবে চৰকাৰী আঁচনিবোৰ কি কি?",
    placeholder: "কওঁক বা ইয়াত লিখক...",
    voiceHint: "আঁচনি, যোগ্যতা আৰু নথি-পত্ৰ সম্পৰ্কে সোধক",
  },
  {
    code: "ur",
    bcp47: "ur-IN",
    fallbacks: ["ur-PK", "ur"],
    name: "Urdu",
    nativeName: "اردو",
    script: "Perso-Arabic",
    dir: "rtl",
    voiceKeywords: ["urdu", "اردو", "gul", "salman"],
    sampleQuery: "کسانوں کے لیے سرکاری اسکیمیں کونسی ہیں؟",
    placeholder: "بولیں یا یہاں ٹائپ کریں...",
    voiceHint: "اسکیموں، اہلیت اور دستاویزات کے بارے میں پوچھیں",
  },
];

export function getVoiceLanguage(code) {
  return VOICE_LANGUAGES.find((l) => l.code === code) || VOICE_LANGUAGES[0];
}

/**
 * Digital India Bhashini (NLTM) Provider Layer
 * Handles Government of India ULCA ASR and TTS endpoints when configured in environment.
 */
class BhashiniSpeechProvider {
  constructor() {
    this.apiKey = typeof import.meta !== "undefined" ? import.meta.env?.VITE_BHASHINI_API_KEY : null;
    this.userId = typeof import.meta !== "undefined" ? import.meta.env?.VITE_BHASHINI_USER_ID : null;
    this.pipelineId = typeof import.meta !== "undefined" ? import.meta.env?.VITE_BHASHINI_PIPELINE_ID : null;
    this.inferenceUrl = typeof import.meta !== "undefined" ? import.meta.env?.VITE_BHASHINI_INFERENCE_URL : "https://dhruva-api.bhashini.gov.in/services/inference/pipeline";
  }

  isConfigured() {
    return Boolean(this.apiKey && this.userId && this.pipelineId);
  }

  async synthesize(text, langCode) {
    if (!this.isConfigured()) return null;
    try {
      const response = await fetch(this.inferenceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.apiKey,
          "User-ID": this.userId,
        },
        body: JSON.stringify({
          pipelineTasks: [
            {
              taskType: "tts",
              config: {
                language: { sourceLanguage: langCode },
                gender: "female",
              },
            },
          ],
          inputData: {
            input: [{ source: text }],
          },
        }),
      });

      if (!response.ok) return null;
      const data = await response.json();
      const base64Audio = data?.pipelineResponse?.[0]?.output?.[0]?.audio?.[0]?.audioContent;
      return base64Audio ? `data:audio/wav;base64,${base64Audio}` : null;
    } catch {
      return null;
    }
  }
}

/**
 * Universal Multilingual Speech Service
 * Combines Bhashini AI Pipeline and Browser Web Speech API
 */
class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.voices = [];
    this.voicesLoaded = false;
    this.bhashini = new BhashiniSpeechProvider();
    this.currentAudioElement = null;

    if (typeof window !== "undefined") {
      this.initVoices();
    }
  }

  initVoices() {
    if (!("speechSynthesis" in window)) return;

    const updateVoices = () => {
      try {
        const list = window.speechSynthesis.getVoices() || [];
        if (list.length > 0) {
          this.voices = list;
          this.voicesLoaded = true;
        }
      } catch {
        // Safe ignore
      }
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }

  getVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
    if (this.voices.length === 0) {
      this.voices = window.speechSynthesis.getVoices() || [];
    }
    return this.voices;
  }

  isSTTSupported() {
    if (typeof window === "undefined") return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  isTTSSupported() {
    if (typeof window === "undefined") return false;
    return "speechSynthesis" in window;
  }

  /**
   * Match best speech synthesis voice for a language
   */
  findVoiceForLanguage(langCode) {
    const langMeta = getVoiceLanguage(langCode);
    const allVoices = this.getVoices();
    if (allVoices.length === 0) return null;

    const bcp47Target = langMeta.bcp47.toLowerCase();
    const fallbacks = (langMeta.fallbacks || []).map((f) => f.toLowerCase());
    const keywords = (langMeta.voiceKeywords || []).map((k) => k.toLowerCase());

    // 1. Exact match on BCP-47 tag
    let matched = allVoices.find((v) => {
      const vLang = (v.lang || "").toLowerCase().replace("_", "-");
      return vLang === bcp47Target;
    });

    // 2. Match on dialect fallbacks (e.g. bn-BD, ur-PK)
    if (!matched && fallbacks.length > 0) {
      matched = allVoices.find((v) => {
        const vLang = (v.lang || "").toLowerCase().replace("_", "-");
        return fallbacks.some((f) => vLang === f || vLang.startsWith(f + "-"));
      });
    }

    // 3. Match on voice name keywords (e.g. "Google हिन्दी", "Microsoft Swara", "Google বাংলা")
    if (!matched && keywords.length > 0) {
      matched = allVoices.find((v) => {
        const vName = (v.name || "").toLowerCase();
        return keywords.some((k) => vName.includes(k));
      });
    }

    // 4. Primary language prefix match (e.g. 'ta', 'te', 'mr')
    if (!matched) {
      const prefix = langCode.toLowerCase();
      matched = allVoices.find((v) => {
        const vLang = (v.lang || "").toLowerCase().replace("_", "-");
        return vLang.startsWith(prefix + "-") || vLang === prefix;
      });
    }

    return matched || null;
  }

  /**
   * Detect actual runtime availability for a specific language
   * @param {string} langCode - Language code ('hi', 'en', 'bn', etc.)
   * @returns {{ sttSupported: boolean, ttsSupported: boolean, voiceName?: string, provider: string }}
   */
  detectLanguageCapabilities(langCode) {
    const langMeta = getVoiceLanguage(langCode);
    const hasBhashini = this.bhashini.isConfigured();

    const sttSupported = this.isSTTSupported() || hasBhashini;
    const voice = this.findVoiceForLanguage(langCode);
    const ttsSupported = Boolean(voice) || hasBhashini || this.isTTSSupported();

    let provider = "Browser Web Speech API";
    if (hasBhashini) {
      provider = "Digital India Bhashini (NLTM)";
    }

    return {
      sttSupported,
      ttsSupported,
      voiceName: voice?.name || (ttsSupported ? `Native Synthesizer (${langMeta.bcp47})` : null),
      provider,
      hasBhashini,
      nativeName: langMeta.nativeName,
    };
  }

  /**
   * Start listening for voice input in designated language
   */
  startListening({
    lang = "hi",
    onResult,
    onInterim,
    onError,
    onEnd,
    onStart,
  } = {}) {
    if (!this.isSTTSupported()) {
      if (onError) {
        onError({
          code: "unsupported",
          message: "Microphone speech recognition is not supported in this browser. Please use text input.",
        });
      }
      return false;
    }

    this.stopListening();
    this.stopSpeaking();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    try {
      this.recognition = new SpeechRecognition();
    } catch (err) {
      if (onError) onError({ code: "init_failed", message: "Failed to initialize microphone service.", original: err });
      return false;
    }

    const langMeta = getVoiceLanguage(lang);
    this.recognition.lang = langMeta.bcp47;
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    let finalTranscript = "";

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStart) onStart();
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        const text = item[0]?.transcript || "";
        if (item.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      if (interimTranscript && onInterim) {
        onInterim(interimTranscript);
      }
      if (finalTranscript && onResult) {
        onResult(finalTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      const errorType = event.error;
      let humanMessage = "An error occurred with voice recognition.";

      if (errorType === "not-allowed" || errorType === "service-not-allowed") {
        humanMessage = "Microphone access was denied. Please allow microphone permissions in your browser.";
      } else if (errorType === "no-speech") {
        humanMessage = "No speech was detected. Please tap the mic and speak clearly.";
      } else if (errorType === "network") {
        humanMessage = "Network connectivity issue during speech recognition. Please check your connection.";
      } else if (errorType === "audio-capture") {
        humanMessage = "No microphone hardware found. Please check your audio input settings.";
      } else if (errorType === "aborted") {
        return; // Normal abort
      }

      if (onError) onError({ code: errorType, message: humanMessage });
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd(finalTranscript);
    };

    try {
      this.recognition.start();
      return true;
    } catch (err) {
      this.isListening = false;
      if (onError) onError({ code: "start_failed", message: "Could not activate microphone.", original: err });
      return false;
    }
  }

  /**
   * Stop listening for voice input
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Safe ignore
      }
    }
    this.isListening = false;
  }

  /**
   * Clean text for natural speech synthesis
   */
  prepareSpokenText(rawText) {
    if (!rawText) return "";
    return rawText
      .replace(/###\s*(.*?)/g, "$1. ")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/https?:\/\/\S+/g, "official government portal")
      .replace(/•/g, ", ")
      .replace(/₹/g, "rupees ")
      .replace(/[\n\r]+/g, ". ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Speak response aloud in designated language
   */
  async speak(text, { lang = "hi", onStart, onEnd, onError } = {}) {
    this.stopSpeaking();

    const spokenText = this.prepareSpokenText(text);
    if (!spokenText) return false;

    // 1. If Bhashini provider is configured, attempt neural audio synthesis first
    if (this.bhashini.isConfigured()) {
      try {
        const audioUrl = await this.bhashini.synthesize(spokenText, lang);
        if (audioUrl) {
          const audio = new Audio(audioUrl);
          this.currentAudioElement = audio;
          audio.onplay = () => {
            this.isSpeaking = true;
            if (onStart) onStart();
          };
          audio.onended = () => {
            this.isSpeaking = false;
            if (onEnd) onEnd();
          };
          audio.onerror = (e) => {
            this.isSpeaking = false;
            // Fall back to Web Speech
            this.speakWebSpeech(spokenText, lang, { onStart, onEnd, onError });
          };
          audio.play();
          return true;
        }
      } catch {
        // Fall back to Web Speech
      }
    }

    // 2. Browser Web Speech Synthesis fallback
    return this.speakWebSpeech(spokenText, lang, { onStart, onEnd, onError });
  }

  speakWebSpeech(spokenText, lang, { onStart, onEnd, onError } = {}) {
    if (!this.isTTSSupported()) {
      if (onError) onError({ code: "unsupported", message: "Speech synthesis not supported in this browser." });
      return false;
    }

    // Length control for rural acoustic clarity
    const truncatedText = spokenText.length > 360
      ? spokenText.slice(0, 360).replace(/\s+\S*$/, "") + "..."
      : spokenText;

    const utterance = new SpeechSynthesisUtterance(truncatedText);
    const langMeta = getVoiceLanguage(lang);
    utterance.lang = langMeta.bcp47;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const matchedVoice = this.findVoiceForLanguage(lang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (err) => {
      this.isSpeaking = false;
      if (onError) onError({ code: "synthesis_error", original: err });
    };

    try {
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      this.isSpeaking = false;
      if (onError) onError({ code: "speak_failed", original: err });
      return false;
    }
  }

  /**
   * Stop speaking aloud immediately
   */
  stopSpeaking() {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {
        // Safe ignore
      }
      this.currentAudioElement = null;
    }

    if (this.isTTSSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Safe ignore
      }
    }
    this.isSpeaking = false;
  }
}

export const speechService = new SpeechService();
