import { ArrowRight, Bookmark, ChartNoAxesCombined, Clock3, Compass, GitCompareArrows, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import PageHeader from "../components/PageHeader.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getSchemes } from "../services/schemeService.js";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Dashboard() {
  const { language, savedIds, recentIds, compareIds } = useApp();
  const t = translations[language];
  const schemes = getSchemes();
  const recent = recentIds.map((id) => schemes.find((scheme) => scheme.id === id)).filter(Boolean).slice(0, 3);
  const saved = savedIds.map((id) => schemes.find((scheme) => scheme.id === id)).filter(Boolean).slice(0, 3);
  const chartData = [
    { name: "Mon", value: 1 },
    { name: "Tue", value: Math.max(1, recentIds.length - 1) },
    { name: "Wed", value: Math.max(1, savedIds.length) },
    { name: "Thu", value: Math.max(1, compareIds.length) },
    { name: "Today", value: Math.max(1, savedIds.length + recentIds.length) }
  ];

  return (
    <>
      <PageHeader eyebrow={t.nav.dashboard} title={t.dashboardTitle} body={t.dashboardBody} />
      <section className="page-width dashboard-page">
        <motion.div
          className="dashboard-welcome"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="section-kicker">{t.welcome}</span>
            <h2>{savedIds.length ? `${savedIds.length} ${t.savedCount.toLocaleLowerCase()}` : t.emptySaved}</h2>
            <p>{t.sampleLong}</p>
          </div>
          <Link className="button button-glow" to="/eligibility">
            <Sparkles size={16} />{t.startChecker}<ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="dashboard-stats">
          <Stat icon={Bookmark} value={savedIds.length} label={t.savedCount} to="/saved" delay={0.05} />
          <Stat icon={Clock3} value={recentIds.length} label={t.recentCount} to="/dashboard" delay={0.12} />
          <Stat icon={GitCompareArrows} value={compareIds.length} label={t.nav.compare} to="/compare" delay={0.19} />
          <Stat icon={ChartNoAxesCombined} value={schemes.length} label={t.matchCount} to="/schemes" delay={0.26} />
        </div>

        <div className="dashboard-grid">
          <section className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">{t.eligibilityProgress}</span>
                <h2>{t.nav.dashboard}</h2>
              </div>
              <span className="chart-badge">Local view</span>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#39d9ff" stopOpacity={0.42} />
                      <stop offset="100%" stopColor="#39d9ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#8ca1b4", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#101f35", border: "1px solid #28445d", borderRadius: 10, color: "#fff" }} />
                  <Area type="monotone" dataKey="value" stroke="#39d9ff" fill="url(#activityGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="chart-note">This chart reflects local actions on this device, not population analytics.</p>
          </section>

          <section className="panel quick-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">{t.quickActions}</span>
                <h2>{t.nav.eligibility}</h2>
              </div>
            </div>
            <Link className="quick-action" to="/eligibility">
              <span><Sparkles size={17} /></span>
              <div><strong>{t.startChecker}</strong><small>{t.checkerBody}</small></div>
              <ArrowRight size={16} />
            </Link>
            <Link className="quick-action" to="/categories">
              <span><Compass size={17} /></span>
              <div><strong>{t.browse}</strong><small>{t.browseBody}</small></div>
              <ArrowRight size={16} />
            </Link>
            <Link className="quick-action" to="/documents">
              <span><Bookmark size={17} /></span>
              <div><strong>{t.nav.documents}</strong><small>{t.applicationGuide}</small></div>
              <ArrowRight size={16} />
            </Link>
          </section>
        </div>

        {recent.length ? (
          <section className="dashboard-section">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">{t.recent}</p>
                <h2>{t.recent}</h2>
              </div>
            </div>
            <div className="scheme-grid">
              {recent.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}
            </div>
          </section>
        ) : (
          <section className="dashboard-section">
            <EmptyState title={t.emptyRecent} body={t.emptyRecentBody} action={t.openExplorer} />
          </section>
        )}

        {saved.length > 0 && (
          <section className="dashboard-section">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">{t.savedCount}</p>
                <h2>{t.savedCount}</h2>
              </div>
              <Link className="subtle-link" to="/saved">
                {t.viewAll}<ArrowRight size={15} />
              </Link>
            </div>
            <div className="scheme-grid">
              {saved.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}
            </div>
          </section>
        )}
      </section>
    </>
  );
}

function Stat({ icon: Icon, value, label, to, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const duration = 1000;
    let frameId;
    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * ease));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="dashboard-stat-wrapper"
    >
      <Link className="dashboard-stat" to={to}>
        <span><Icon size={18} /></span>
        <strong>{count}</strong>
        <small>{label}</small>
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

