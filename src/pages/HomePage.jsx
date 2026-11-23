import { ArrowRight, BookOpenCheck, CheckCircle2, Compass, GraduationCap, Languages, Search, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CinematicBackground from "../components/CinematicBackground.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import MetricCard from "../components/MetricCard.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import VerificationBanner from "../components/VerificationBanner.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getCategories, getSchemes } from "../services/schemeService.js";

// Authentic Indian Tricolour (Tiranga) SVG Vector with 24-spoke Ashoka Chakra
function IndiaFlag({ className = "" }) {
  return (
    <svg
      className={`hero-flag-icon ${className}`.trim()}
      width="21"
      height="14"
      viewBox="0 0 21 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="National Flag of India"
      role="img"
    >
      <title>National Flag of India</title>
      <rect width="21" height="4.67" fill="#FF9933" />
      <rect y="4.67" width="21" height="4.67" fill="#FFFFFF" />
      <rect y="9.33" width="21" height="4.67" fill="#138808" />
      <g transform="translate(10.5, 7)">
        <circle r="1.95" fill="none" stroke="#000080" strokeWidth="0.45" />
        <circle r="0.45" fill="#000080" />
        <line x1="0" y1="-1.95" x2="0" y2="1.95" stroke="#000080" strokeWidth="0.22" />
        <line x1="-1.95" y1="0" x2="1.95" y2="0" stroke="#000080" strokeWidth="0.22" />
        <line x1="-1.38" y1="-1.38" x2="1.38" y2="1.38" stroke="#000080" strokeWidth="0.22" />
        <line x1="-1.38" y1="1.38" x2="1.38" y2="-1.38" stroke="#000080" strokeWidth="0.22" />
        <line x1="-0.75" y1="-1.8" x2="0.75" y2="1.8" stroke="#000080" strokeWidth="0.22" />
        <line x1="-1.8" y1="-0.75" x2="1.8" y2="0.75" stroke="#000080" strokeWidth="0.22" />
        <line x1="-1.8" y1="0.75" x2="1.8" y2="-0.75" stroke="#000080" strokeWidth="0.22" />
        <line x1="-0.75" y1="1.8" x2="0.75" y2="-1.8" stroke="#000080" strokeWidth="0.22" />
        <line x1="-0.38" y1="-1.91" x2="0.38" y2="1.91" stroke="#000080" strokeWidth="0.22" />
        <line x1="-1.91" y1="-0.38" x2="1.91" y2="0.38" stroke="#000080" strokeWidth="0.22" />
        <line x1="-1.91" y1="0.38" x2="1.91" y2="-0.38" stroke="#000080" strokeWidth="0.22" />
        <line x1="-0.38" y1="1.91" x2="0.38" y2="-1.91" stroke="#000080" strokeWidth="0.22" />
      </g>
    </svg>
  );
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
};

export default function HomePage() {
  const { language, recentIds, savedIds } = useApp();
  const t = translations[language];
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const schemes = getSchemes();
  const categories = getCategories();
  const featured = useMemo(() => schemes.filter((scheme) => scheme.featured).slice(0, 3), [schemes]);
  const recent = recentIds.map((id) => schemes.find((scheme) => scheme.id === id)).filter(Boolean).slice(0, 3);
  return <>
    <section className="hero-section">
      <CinematicBackground>
        <div className="page-width hero-content">
          <motion.div 
            className="hero-badge-wrap"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
          >
            <div className="hero-identification-badge">
              <IndiaFlag />
              <span className="hero-badge-text">
                {language === "hi" ? "राष्ट्रीय जन कल्याण योजना खोज पोर्टल" : "National Public Welfare Discovery Portal"}
              </span>
            </div>
          </motion.div>
          <motion.p 
            className="hero-subtitle"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
          >
            {t.heroEyebrow}
          </motion.p>
          <motion.h1 
            className="hero-main-title"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
          >
            {language === "hi" ? "सरकारी योजनाओं एवं लाभों का प्रवेश द्वार" : "Your Gateway to Government Schemes & Benefits"}
          </motion.h1>
          <motion.p 
            className="hero-copy"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
          >
            {t.heroBody}
          </motion.p>
          <motion.div 
            className="hero-search-wrap"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
          >
            <SearchBar value={query} onChange={setQuery} onSubmit={(value) => navigate(`/schemes${value ? `?q=${encodeURIComponent(value)}` : ""}`)} t={t} large />
          </motion.div>
          <motion.div 
            className="hero-actions"
            custom={5}
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
          >
            <Link className="button button-glow" to="/eligibility"><Sparkles size={17} />{t.discover}<ArrowRight size={16} /></Link>
            <Link className="button button-ghost" to="/schemes">{t.explore}<ArrowRight size={16} /></Link>
          </motion.div>
          <motion.div 
            className="hero-proof"
            custom={6}
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
          >
            <ShieldCheck size={15} /><span>{language === "hi" ? "स्वतंत्र नागरिक मंच • आधिकारिक सरकारी पोर्टलों से सत्यापित जानकारी" : "Independent Citizen Platform • Cross-referenced with official portals"}</span>
          </motion.div>
        </div>
      </CinematicBackground>
      <div className="hero-scroll"><span />Scroll to explore</div>
    </section>
    <section className="metrics-strip page-width">
      <MetricCard value={schemes.length} label={t.metrics.schemes} icon={BookOpenCheck} delay={0} />
      <MetricCard value={categories.length} label={t.metrics.categories} icon={Compass} delay={0.08} />
      <MetricCard value={13} label={t.metrics.languages} icon={Languages} delay={0.16} />
      <MetricCard value={savedIds.length} label={t.metrics.saved} icon={ShieldCheck} delay={0.24} />
    </section>

    <main className="home-main">
      <motion.section
        className="page-width home-section featured-section"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">01 / {t.featured}</p>
            <h2>{t.featured}</h2>
            <p>{t.featuredBody}</p>
          </div>
          <Link className="subtle-link" to="/schemes">
            {t.viewAll}<ArrowRight size={15} />
          </Link>
        </div>
        <div className="scheme-grid featured-grid">
          {featured.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} featured />
          ))}
        </div>
      </motion.section>

      <motion.section
        className="page-width home-section"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">02 / {t.browse}</p>
            <h2>{t.browse}</h2>
            <p>{t.browseBody}</p>
          </div>
          <Link className="subtle-link" to="/categories">
            {t.viewAll}<ArrowRight size={15} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const count = schemes.filter((scheme) => scheme.category.id === category.id).length;
            const catName = language === "hi" ? category.nameHi : category.name;
            const catDesc = language === "hi" ? category.descriptionHi : category.description;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Link className="category-card group h-full flex flex-col justify-between" to={`/categories/${category.id}`}>
                  <div>
                    {/* Dedicated Category Icon and Count Area */}
                    <div className="category-card-top flex items-center justify-between mb-3.5">
                      <span className="category-card-icon transition-transform duration-200 group-hover:scale-110">
                        <CategoryIcon name={category.icon} size={22} />
                      </span>
                      <span className="category-card-count-badge">
                        {count} {t.nav.schemes}
                      </span>
                    </div>

                    {/* Category Title - Unbroken, naturally wrapped */}
                    <h3 className="category-title text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {catName}
                    </h3>

                    {/* Short Category Description */}
                    <p className="category-desc text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-2">
                      {catDesc}
                    </p>
                  </div>

                  {/* Divider and Explore Schemes Link */}
                  <div className="category-card-footer pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>{t.explore || "Explore Schemes"}</span>
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </motion.section>

      <section className="process-section">
        <motion.div
          className="page-width home-section"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">03 / {t.how}</p>
              <h2>{t.how}</h2>
              <p>{t.howBody}</p>
            </div>
          </div>
          <div className="process-grid">
            {t.steps.map((step, index) => (
              <motion.div
                className="process-step"
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="step-number">0{index + 1}</span>
                <div className="step-icon">
                  {index === 0 ? <UsersRound size={19} /> : index === 1 ? <Compass size={19} /> : <CheckCircle2 size={19} />}
                </div>
                <h3>{step}</h3>
                <p>{t.stepBodies[index]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section
        className="page-width checker-promo bg-emerald-50/50 rounded-2xl p-6"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="checker-visual">
          <div className="checker-ring ring-one" />
          <div className="checker-ring ring-two" />
          <GraduationCap size={34} />
        </div>
        <div>
          <p className="section-kicker text-slate-600">04 / {t.nav.eligibility}</p>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">{t.checkerTitle}</h2>
          <p className="text-slate-600 mb-4">{t.checkerBody}</p>
          <div className="flex gap-4">
            <Link className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition" to="/eligibility">
              {t.startChecker}
              <ArrowRight size={16} />
            </Link>
            <Link className="px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-xl hover:bg-slate-100 transition" to="/about">
              {t.more}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>

      {recent.length > 0 && (
        <motion.section
          className="page-width home-section recent-section"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">05 / {t.recent}</p>
              <h2>{t.recent}</h2>
            </div>
            <Link className="subtle-link" to="/dashboard">
              {t.nav.dashboard}<ArrowRight size={15} />
            </Link>
          </div>
          <div className="scheme-grid">
            {recent.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </motion.section>
      )}

      <motion.section
        className="page-width faq-promo"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="section-kicker">06 / {t.faqTitle}</p>
          <h2>{t.faqTitle}</h2>
          <p>{t.faqBody}</p>
        </div>
        <Link className="button button-ghost dark" to="/faq">
          {t.readFaq}<ArrowRight size={16} />
        </Link>
      </motion.section>

      <motion.section
        className="page-width my-16"
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-8 sm:p-14 text-center shadow-xs">
          <span className="inline-block text-emerald-600 text-3xl mb-3">✦</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto mb-3">
            {t.finalTitle}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {t.finalBody}
          </p>
          <div className="flex items-center justify-center flex-wrap gap-4">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition shadow-sm"
              to="/schemes"
            >
              <span>{t.explore}</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 border border-slate-300 font-bold text-sm hover:bg-slate-50 transition shadow-xs"
              to="/about"
            >
              <span>{t.more}</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>

  </>;
}
