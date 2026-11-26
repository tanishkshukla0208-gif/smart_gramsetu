import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { 
  ArrowRight, 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Sprout, 
  ShieldCheck, 
  HeartPulse, 
  House, 
  GraduationCap, 
  Smartphone,
  Sparkles
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

// 6 Authentic Indian Rural Welfare Scheme Scenes
export const CINEMATIC_SCENES = [
  {
    id: "pm-kisan",
    schemeId: "pm-kisan",
    icon: Sprout,
    name: "PM-KISAN Samman Nidhi",
    nameHi: "पीएम-किसान सम्मान निधि (प्रधानमंत्री किसान सम्मान निधि)",
    category: "Agriculture & Farmers Welfare",
    categoryHi: "कृषि एवं किसान कल्याण",
    tag: "Direct Income Support",
    tagHi: "प्रत्यक्ष आय सहायता",
    highlight: "₹6,000 / Year via DBT",
    highlightHi: "₹6,000 प्रति वर्ष सीधे बैंक खाते में",
    description: "Direct financial assistance delivered straight to eligible landholding farmer families across India in three 4-monthly installments.",
    descriptionHi: "सभी पात्र भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष की प्रत्यक्ष सहायता, डीबीटी द्वारा सीधे उनके आधार से जुड़े बैंक खाते में।",
    story: "Farmer receiving direct financial assistance on mobile phone in a thriving green agricultural field.",
    storyHi: "हरे-भरे खेत में किसान अपने मोबाइल पर सीधी सरकारी सम्मान निधि सहायता प्राप्त करते हुए।",
    image: "/scenes/scene-kisan.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1920&q=80",
    themeColor: "#2F855A", // Rich Forest Emerald
    accentBg: "rgba(47, 133, 90, 0.25)",
    link: "/schemes/pm-kisan"
  },
  {
    id: "pm-fasal-bima",
    schemeId: "pm-fasal-bima",
    icon: ShieldCheck,
    name: "PM Fasal Bima Yojana",
    nameHi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    category: "Crop Insurance & Risk Shield",
    categoryHi: "फसल बीमा एवं जोखिम सुरक्षा",
    tag: "Comprehensive Crop Protection",
    tagHi: "व्यापक फसल सुरक्षा कवच",
    highlight: "Lowest Premium • Full Crop Cover",
    highlightHi: "न्यूनतम प्रीमियम • अधिकतम क्लेम सुरक्षा",
    description: "Comprehensive financial security shielding farmers against natural calamities, unseasonal rains, drought, and post-harvest losses.",
    descriptionHi: "प्राकृतिक आपदाओं, ओलावृष्टि, बेमौसम बारिश और कीटों से फसलों को संपूर्ण आर्थिक सुरक्षा और समय पर क्षतिपूर्ति।",
    story: "Farmer inspecting golden wheat crop field under sunny skies with digital weather and crop protection.",
    storyHi: "धूप खिली सुबह में सुनहरे गेहूं के खेत में अन्नदाता अपनी फसल की सुरक्षा के प्रति निश्चिंत।",
    image: "/scenes/scene-bima.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1920&q=80",
    themeColor: "#D69E2E", // Warm Golden Amber
    accentBg: "rgba(214, 158, 46, 0.25)",
    link: "/schemes/pm-fasal-bima"
  },
  {
    id: "ayushman-bharat",
    schemeId: "ayushman-bharat-pmjay",
    icon: HeartPulse,
    name: "Ayushman Bharat – PM-JAY",
    nameHi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    category: "Universal Rural Healthcare",
    categoryHi: "सार्वभौमिक ग्रामीण स्वास्थ्य रक्षा",
    tag: "Free Cashless Hospital Care",
    tagHi: "मुफ़्त एवं कैशलेस अस्पताल उपचार",
    highlight: "₹5 Lakh Coverage / Family / Year",
    highlightHi: "प्रति परिवार ₹5 लाख का वार्षिक निःशुल्क इलाज",
    description: "World's largest health assurance scheme providing secondary and tertiary cashless treatment at public and empanelled private hospitals.",
    descriptionHi: "ग्रामीण व गरीब परिवारों को गंभीर बीमारियों के लिए देश भर के सूचीबद्ध अस्पतालों में ₹5 लाख तक का कैशलेस इलाज।",
    story: "Rural Indian family accessing quality medical care with dignity through their Ayushman golden health card.",
    storyHi: "आयुष्मान कार्ड के साथ ग्रामीण परिवार को गांव के निकट स्वास्थ्य केंद्र में सम्मानजनक और निःशुल्क चिकित्सा सुविधा।",
    image: "/scenes/scene-ayushman.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1920&q=80",
    themeColor: "#319795", // Deep Health Teal
    accentBg: "rgba(49, 151, 149, 0.25)",
    link: "/schemes/ayushman-bharat-pmjay"
  },
  {
    id: "pm-awas",
    schemeId: "pmay-gramin",
    icon: House,
    name: "PM Awas Yojana – Gramin",
    nameHi: "प्रधानमंत्री आवास योजना - ग्रामीण (PMAY-G)",
    category: "Rural Housing & Dignity",
    categoryHi: "ग्रामीण पक्का आवास एवं सम्मान",
    tag: "Pucca House with Core Amenities",
    tagHi: "मूलभूत सुविधाओं युक्त पक्का मकान",
    highlight: "Direct Grant + Clean Fuel & Tap Water",
    highlightHi: "प्रत्यक्ष अनुदान + नल का जल व रसोई गैस",
    description: "Financial assistance provided to homeless and kutcha-house rural families to build disaster-resilient permanent homes.",
    descriptionHi: "ग्रामीण बेघर और कच्चे मकान वाले परिवारों को पक्का, स्वच्छ और सुरक्षित मकान बनाने हेतु सीधी वित्तीय सहायता।",
    story: "Happy village family proudly standing in front of their newly completed permanent brick house.",
    storyHi: "ग्रामीण परिवार अपने नए पक्के मकान, स्वच्छ शौचालय और नल के जल की सुविधा के साथ खुशहाल जीवन शुरू करते हुए।",
    image: "/scenes/scene-awas.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=80",
    themeColor: "#DD6B20", // Warm Terracotta Saffron
    accentBg: "rgba(221, 107, 32, 0.25)",
    link: "/schemes/pmay-gramin"
  },
  {
    id: "pm-scholarship",
    schemeId: "national-scholarship-portal",
    icon: GraduationCap,
    name: "PM Scholarship & Education Schemes",
    nameHi: "प्रधानमंत्री छात्रवृत्ति एवं उच्च शिक्षा योजनाएं",
    category: "Youth & Educational Empowerment",
    categoryHi: "शिक्षा एवं युवा सशक्तिकरण",
    tag: "Direct Fellowship & Tuition Aid",
    tagHi: "प्रत्यक्ष छात्रवृत्ति व उच्च शिक्षा सहायता",
    highlight: "Merit & Means DBT Grants",
    highlightHi: "मेधावी विद्यार्थियों को सीधी छात्रवृत्ति",
    description: "Financial support for meritorious rural students, especially girls and underprivileged youth, to pursue higher and technical education.",
    descriptionHi: "ग्रामीण होनहार छात्र-छात्राओं को कॉलेज, तकनीकी और मेडिकल शिक्षा के लिए राष्ट्रीय छात्रवृत्ति पोर्टल से सीधी आर्थिक मदद।",
    story: "Rural student studying diligently with digital tablet and books, aspiring toward a bright future.",
    storyHi: "गांव की मेधावी छात्रा डिजिटल टैबलेट और किताबों के साथ उच्च शिक्षा की ओर आत्मविश्वास से आगे बढ़ते हुए।",
    image: "/scenes/scene-scholarship.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
    themeColor: "#3182CE", // Aspirational Sky Blue
    accentBg: "rgba(49, 130, 206, 0.25)",
    link: "/schemes/national-scholarship-portal"
  },
  {
    id: "digital-india",
    schemeId: "digital-india",
    icon: Smartphone,
    name: "Digital India – Gramin e-Governance",
    nameHi: "डिजिटल इंडिया - ग्रामीण ई-सेवाएं एवं सीएससी",
    category: "Digital Empowerment & Women Entrepreneurs",
    categoryHi: "डिजिटल सशक्तिकरण व महिला उद्यमिता",
    tag: "Doorstep e-Services via Smartphone",
    tagHi: "मोबाइल व सीएससी से डिजिटल सेवाएं",
    highlight: "100+ Welfare Services on Phone",
    highlightHi: "घर बैठे 100+ सरकारी योजनाओं का लाभ",
    description: "Empowering villagers, self-help groups, and rural youth with smartphones, Common Service Centres (CSC), and direct online welfare access.",
    descriptionHi: "ग्रामीण नागरिकों और महिला स्वयं सहायता समूहों को स्मार्टफोन और डिजिटल सेवाओं से सशक्त बनाकर पारदर्शी योजनाओं से जोड़ना।",
    story: "Villagers and women entrepreneurs using smartphones together to access online government welfare and banking.",
    storyHi: "गांव में महिलाएं और युवा स्मार्टफोन व डिजिटल कियोस्क के माध्यम से सरकारी योजनाओं की जानकारी और आवेदन करते हुए।",
    image: "/scenes/scene-digital.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80",
    themeColor: "#805AD5", // Vibrant Purple
    accentBg: "rgba(128, 90, 213, 0.25)",
    link: "/schemes/digital-india"
  }
];

export default function CinematicBackground({ 
  children,
  rotationInterval = 6500, 
  showBanner = true,
  onSceneChange = null
}) {
  const { language } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [isPaused, setIsPaused] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [pausedByFocus, setPausedByFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const timerRef = useRef(null);

  // Check reduced motion preference dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setIsPaused(true);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Automatic 6.5-second rotation loop
  // Strictly respects prefers-reduced-motion, manual pause, keyboard focus pause, and pointer hover
  useEffect(() => {
    // If reduced motion is requested or rotation is paused/hovered, do not run automatic slide timer
    if (reducedMotion || isPaused || isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % CINEMATIC_SCENES.length;
        if (onSceneChange) onSceneChange(CINEMATIC_SCENES[next]);
        return next;
      });
    }, rotationInterval);

    return () => clearInterval(timerRef.current);
  }, [isPaused, isHovered, reducedMotion, rotationInterval, onSceneChange]);

  // Subtle Mouse Parallax
  const handleMouseMove = useCallback((e) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, [reducedMotion]);

  // Floating Golden Particles Canvas (Sunlight dust motes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // 38 Golden glowing ambient particles drifting in sunlight
    const particleCount = reducedMotion ? 12 : 38;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 2.5 + 1.0,
      baseAlpha: Math.random() * 0.45 + 0.25,
      speedY: (Math.random() * 0.0003 + 0.00015),
      swaySpeed: Math.random() * 0.002 + 0.001,
      swayOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.35 ? "255, 215, 120" : "255, 185, 85" // Golden sunlight & warm amber
    }));

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!reducedMotion) {
          p.y -= p.speedY;
          if (p.y < -0.05) {
            p.y = 1.05;
            p.x = Math.random();
          }
        }

        const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * 0.0015;
        const currentX = (p.x + sway) * width;
        const currentY = p.y * height;
        const pulse = 0.8 + Math.sin(time * 0.025 + p.swayOffset) * 0.2;

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha * pulse})`;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  const activeScene = CINEMATIC_SCENES[currentIndex];
  const IconComponent = activeScene.icon;

  const goToScene = (index) => {
    setCurrentIndex(index);
    if (onSceneChange) onSceneChange(CINEMATIC_SCENES[index]);
  };

  const nextScene = () => {
    goToScene((currentIndex + 1) % CINEMATIC_SCENES.length);
  };

  const prevScene = () => {
    goToScene((currentIndex - 1 + CINEMATIC_SCENES.length) % CINEMATIC_SCENES.length);
  };

  return (
    <div 
      className="cinematic-bg-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Cinematic Indian Rural Development Showcase"
    >
      {/* ───── 1. Photographic Scenes with Ken Burns Zoom & Crossfade ───── */}
      <div 
        className="cinematic-slides-wrapper"
        aria-live="off"
        style={{
          transform: reducedMotion ? "none" : `translate3d(${mousePos.x * -16}px, ${mousePos.y * -12}px, 0)`
        }}
      >
        {CINEMATIC_SCENES.map((scene, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={scene.id}
              className={`cinematic-slide ${isActive ? "active" : ""}`}
              style={{
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0
              }}
              aria-hidden={!isActive}
            >
              <img
                src={scene.image}
                alt={language === "hi" ? scene.nameHi : scene.name}
                className="cinematic-image"
                loading={idx <= 1 ? "eager" : "lazy"}
                onError={(e) => {
                  if (e.target.src !== scene.fallbackUrl) {
                    e.target.src = scene.fallbackUrl;
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ───── 2. Atmospheric Golden Sunlight & God Rays Overlay ───── */}
      <div className="cinematic-sunlight-layer" aria-hidden="true">
        {/* Directional Sunbeam (God Rays) */}
        <div className="sun-god-rays" />
        {/* Sun Corona / Lens Flare Glow */}
        <div className="sun-flare-orb" />
        {/* Subtle Indian Tricolor Glow Accent */}
        <div className="tricolor-ambient-glow" />
      </div>

      {/* ───── 3. Floating Golden Dust Motes Particle Canvas ───── */}
      <canvas className="cinematic-particle-canvas" ref={canvasRef} aria-hidden="true" />

      {/* ───── 4. Cinematic Contrast & Readability Vignette ───── */}
      <div className="cinematic-contrast-vignette" aria-hidden="true" />

      {/* ───── 5. Foreground Content Wrapper (Children + Scheme Banner) ───── */}
      <div className="cinematic-content-wrapper">
        {children}

        {/* ───── 6. Professionally Designed Scheme Banner ───── */}
        {showBanner && (
          <section 
            className="cinematic-scheme-banner-wrap" 
            role="region"
            aria-roledescription="carousel"
            aria-label={language === "hi" ? "योजना विशेष हिंडोला" : "Featured Schemes Spotlight Carousel"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocusCapture={() => {
              setIsPaused(true);
              setPausedByFocus(true);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cinematic-scheme-banner">
              {/* Tricolor Ribbon Line Accent on top */}
              <div className="banner-tricolor-bar" />

              <div className="banner-inner">
                {/* Left Column: Scheme Icon & Live Spotlight Badge */}
                <div className="banner-left">
                  <div 
                    className="banner-icon-badge"
                    style={{ 
                      backgroundColor: activeScene.themeColor,
                      boxShadow: `0 0 20px ${activeScene.themeColor}66`
                    }}
                  >
                    <IconComponent size={24} className="text-white" />
                  </div>
                  
                  <div className="banner-meta">
                    <div className="banner-badge-row">
                      <span className="live-spotlight-pill">
                        <span className="live-pulse-dot" />
                        {language === "hi" ? "योजना विशेष" : "SCHEME SPOTLIGHT"}
                      </span>
                      <span className="banner-category-tag">
                        {language === "hi" ? activeScene.categoryHi : activeScene.category}
                      </span>
                    </div>

                    {/* Scheme Title & Highlight */}
                    <h3 className="banner-title">
                      <Link to={activeScene.link}>
                        {language === "hi" ? activeScene.nameHi : activeScene.name}
                      </Link>
                    </h3>
                    
                    {/* Short Clear Description */}
                    <p className="banner-desc">
                      {language === "hi" ? activeScene.descriptionHi : activeScene.description}
                    </p>
                  </div>
                </div>

                {/* Right Column: Key Benefit Callout & Interactive Controls */}
                <div className="banner-right">
                  <div className="banner-benefit-box">
                    <span className="benefit-label">
                      {language === "hi" ? "प्रमुख लाभ" : "KEY BENEFIT"}
                    </span>
                    <strong className="benefit-value" style={{ color: activeScene.themeColor }}>
                      {language === "hi" ? activeScene.highlightHi : activeScene.highlight}
                    </strong>
                  </div>

                  <div className="banner-actions">
                    <Link 
                      to={activeScene.link}
                      className="banner-cta-button"
                      style={{ backgroundColor: activeScene.themeColor }}
                    >
                      <span>{language === "hi" ? "योजना देखें" : "Explore Scheme"}</span>
                      <ArrowRight size={15} />
                    </Link>

                    {/* Play / Pause Toggle Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isPaused) {
                          setIsPaused(false);
                          setPausedByFocus(false);
                        } else {
                          setIsPaused(true);
                        }
                      }}
                      className="banner-control-btn"
                      title={isPaused ? (language === "hi" ? "स्लाइड घुमाव पुनः शुरू करें" : "Resume slide rotation") : (language === "hi" ? "स्लाइड घुमाव रोकें" : "Pause slide rotation")}
                      aria-label={isPaused ? (language === "hi" ? "स्लाइड घुमाव पुनः शुरू करें" : "Resume slide rotation") : (language === "hi" ? "स्लाइड घुमाव रोकें" : "Pause slide rotation")}
                      aria-pressed={isPaused}
                    >
                      {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                    </button>

                    {/* Previous / Next Slide Nav */}
                    <button
                      type="button"
                      onClick={prevScene}
                      className="banner-control-btn"
                      title={language === "hi" ? "पिछली योजना पर जाएं" : "Previous Scheme"}
                      aria-label={language === "hi" ? "पिछली योजना पर जाएं" : "Previous Scheme"}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={nextScene}
                      className="banner-control-btn"
                      title={language === "hi" ? "अगली योजना पर जाएं" : "Next Scheme"}
                      aria-label={language === "hi" ? "अगली योजना पर जाएं" : "Next Scheme"}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Countdown Progress Bar & 6 Scene Dots */}
              <div className="banner-progress-row">
                <div className="scene-indicator-pills" role="group" aria-label={language === "hi" ? "योजना स्लाइड चयन" : "Scheme slide navigation"}>
                  {CINEMATIC_SCENES.map((scene, i) => (
                    <button
                      key={scene.id}
                      type="button"
                      aria-current={i === currentIndex ? "true" : undefined}
                      onClick={() => goToScene(i)}
                      className={`scene-dot-btn ${i === currentIndex ? "active" : ""}`}
                      title={language === "hi" ? scene.nameHi : scene.name}
                      aria-label={language === "hi" 
                        ? `स्लाइड ${i + 1}: ${scene.nameHi}${i === currentIndex ? " (वर्तमान स्लाइड)" : ""}` 
                        : `Slide ${i + 1}: ${scene.name}${i === currentIndex ? " (Current slide)" : ""}`}
                    >
                      <span className="dot-index">0{i + 1}</span>
                      <span className="dot-name">
                        {scene.name.split(" ")[0]}
                      </span>
                      {i === currentIndex && !isPaused && !isHovered && !reducedMotion && (
                        <span 
                          className="dot-progress-fill" 
                          style={{ animationDuration: `${rotationInterval}ms` }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="banner-speed-tag">
                  <Sparkles size={12} className="text-amber-400" />
                  <span>
                    {language === "hi" 
                      ? (isPaused ? "घुमाव रुका हुआ" : "स्वचालित परिभ्रमण: 6.5s") 
                      : (isPaused ? "Rotation Paused" : "Auto-loop: 6.5s")}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
