import { ArrowRight, BookOpenCheck, CheckCircle2, Compass, GraduationCap, Languages, Search, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import AnimatedNetwork from "../components/AnimatedNetwork.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import MetricCard from "../components/MetricCard.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import VerificationBanner from "../components/VerificationBanner.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getCategories, getSchemes } from "../services/schemeService.js";

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
    <section className="hero-section"><AnimatedNetwork /><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="digital-grid" /><div className="page-width hero-content"><div className="hero-pill mb-4">
  <span className="inline-block bg-mint-100 text-mint-800 text-sm px-3 py-1 rounded-full">
    🇮🇳 National Public Welfare Discovery Portal
  </span>
</div>
<div className="hero-kicker">
  <span className="live-dot" />{t.heroEyebrow}<span className="kicker-line" />
</div>
<h1 className="text-4xl font-bold">
  Your Gateway to Government Schemes &amp; Benefits
</h1><p className="hero-copy">{t.heroBody}</p><div className="hero-search-wrap"><SearchBar value={query} onChange={setQuery} onSubmit={(value) => navigate(`/schemes${value ? `?q=${encodeURIComponent(value)}` : ""}`)} t={t} large /><div className="hero-search-hint"><span><Search size={12} />{t.searchPlaceholder}</span><kbd>⌘ K</kbd></div></div><div className="hero-actions"><Link className="button button-glow" to="/eligibility"><Sparkles size={17} />{t.discover}<ArrowRight size={16} /></Link><Link className="button button-ghost" to="/schemes">{t.explore}<ArrowRight size={16} /></Link></div><div className="hero-proof"><ShieldCheck size={15} /><span>{t.sampleLong.split(".")[0]}.</span></div></div><div className="hero-scroll"><span />Scroll to explore</div></section>
    <section className="metrics-strip page-width"><MetricCard value={schemes.length} label={t.metrics.schemes} icon={BookOpenCheck} /><MetricCard value={categories.length} label={t.metrics.categories} icon={Compass} /><MetricCard value={2} label={t.metrics.languages} icon={Languages} /><MetricCard value={savedIds.length} label={t.metrics.saved} icon={ShieldCheck} /></section>
    <main className="home-main"><VerificationBanner /><section className="page-width home-section featured-section"><div className="section-heading-row"><div><p className="section-kicker">01 / {t.featured}</p><h2>{t.featured}</h2><p>{t.featuredBody}</p></div><Link className="subtle-link" to="/schemes">{t.viewAll}<ArrowRight size={15} /></Link></div><div className="scheme-grid featured-grid">{featured.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} featured />)}</div></section>
      <section className="page-width home-section"><div className="section-heading-row"><div><p className="section-kicker">02 / {t.browse}</p><h2>{t.browse}</h2><p>{t.browseBody}</p></div><Link className="subtle-link" to="/categories">{t.viewAll}<ArrowRight size={15} /></Link></div><div className="category-grid">{categories.map((category) => <Link className="category-card" key={category.id} to={`/categories/${category.id}`}><span className="category-card-icon"><CategoryIcon name={category.icon} size={22} /></span><span><strong>{language === "hi" ? category.nameHi : category.name}</strong><small>{language === "hi" ? category.descriptionHi : category.description}</small><em>{schemes.filter((scheme) => scheme.category.id === category.id).length} {t.nav.schemes}</em></span><ArrowRight size={16} /></Link>)}</div></section>
      <section className="process-section"><div className="page-width home-section"><div className="section-heading-row"><div><p className="section-kicker">03 / {t.how}</p><h2>{t.how}</h2><p>{t.howBody}</p></div></div><div className="process-grid">{t.steps.map((step, index) => <div className="process-step" key={step}><span className="step-number">0{index + 1}</span><div className="step-icon">{index === 0 ? <UsersRound size={19} /> : index === 1 ? <Compass size={19} /> : <CheckCircle2 size={19} />}</div><h3>{step}</h3><p>{t.stepBodies[index]}</p></div>)}</div></div></section>
      <section className="page-width checker-promo bg-emerald-50/50 rounded-2xl p-6">
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
</section>
      {recent.length > 0 && <section className="page-width home-section recent-section"><div className="section-heading-row"><div><p className="section-kicker">05 / {t.recent}</p><h2>{t.recent}</h2></div><Link className="subtle-link" to="/dashboard">{t.nav.dashboard}<ArrowRight size={15} /></Link></div><div className="scheme-grid">{recent.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}</div></section>}
      <section className="page-width faq-promo"><div><p className="section-kicker">06 / {t.faqTitle}</p><h2>{t.faqTitle}</h2><p>{t.faqBody}</p></div><Link className="button button-ghost dark" to="/faq">{t.readFaq}<ArrowRight size={16} /></Link></section>
      <section className="final-cta"><div className="page-width"><span className="cta-star">✦</span><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div className="hero-actions"><Link className="button button-glow" to="/schemes">{t.explore}<ArrowRight size={16} /></Link><Link className="button button-ghost" to="/about">{t.more}</Link></div></div></section>
    </main>
  </>;
}
