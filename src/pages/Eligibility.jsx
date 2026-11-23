import { Check, ChevronLeft, ChevronRight, LoaderCircle, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { evaluateEligibility, getSchemes } from "../services/schemeService.js";

const initial = { ageRange: "", region: "", occupation: "", income: "" };

export default function Eligibility() {
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  const [answers, setAnswers] = useState(initial);
  const [step, setStep] = useState(0);
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState(null);

  const questions = [
    {
      key: "ageRange",
      title: t.eligibility.age,
      options: [
        ["under18", t.eligibility.under18],
        ["age18_25", t.eligibility.age18_25],
        ["age26_45", t.eligibility.age26_45],
        ["age46_60", t.eligibility.age46_60],
        ["over60", t.eligibility.over60],
      ],
    },
    {
      key: "region",
      title: t.eligibility.region,
      options: [
        ["any", t.eligibility.any],
        ["north", t.eligibility.north || "Northern region"],
        ["south", t.eligibility.south || "Southern region"],
        ["east", t.eligibility.east || "Eastern region"],
        ["west", t.eligibility.west || "Western region"],
      ],
    },
    {
      key: "occupation",
      title: t.eligibility.occupation,
      options: [
        ["student", t.eligibility.student],
        ["farmer", t.eligibility.farmer],
        ["worker", t.eligibility.worker],
        ["entrepreneur", t.eligibility.entrepreneur],
        ["other", t.eligibility.other],
      ],
    },
    {
      key: "income",
      title: t.eligibility.income,
      options: [
        ["low", t.eligibility.low],
        ["middle", t.eligibility.middle],
        ["higher", t.eligibility.higher],
      ],
    },
  ];

  const current = questions[step];
  const canContinue = Boolean(answers[current.key]);
  const matches = useMemo(() => results || [], [results]);

  const update = (value) =>
    setAnswers((currentAnswers) => ({ ...currentAnswers, [current.key]: value }));

  const submit = () => {
    setCalculating(true);
    window.setTimeout(() => {
      setResults(evaluateEligibility(getSchemes(), answers));
      setCalculating(false);
    }, 650);
  };

  const reset = () => {
    setAnswers(initial);
    setStep(0);
    setResults(null);
    setCalculating(false);
  };

  if (results) {
    return (
      <section className="page-width eligibility-page results-page py-10">
        <div className="results-intro text-center mb-10">
          <span className="result-orbit inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm mb-4">
            <Sparkles size={28} />
          </span>
          <p className="eyebrow inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-emerald-700 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {t.nav.eligibility}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {t.results}
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.authority}
          </p>
        </div>

        <div className="result-summary flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {matches.length}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {isHi ? "योजनाएं आपकी पृष्ठभूमि के अनुकूल हैं" : "matching schemes found for your profile"}
            </span>
          </div>
          <button
            className="button button-ghost inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold transition-colors"
            type="button"
            onClick={reset}
          >
            <RotateCcw size={15} />
            {t.restart}
          </button>
        </div>

        {matches.length ? (
          <div className="result-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map(({ scheme, status }) => (
              <div className="result-item flex flex-col relative" key={scheme.id}>
                <div className="match-status mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 w-fit">
                  <Check size={14} className="text-emerald-700" />
                  <span>{status === "potential" ? t.potential : t.possible}</span>
                </div>
                <SchemeCard scheme={scheme} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state p-12 text-center bg-white rounded-3xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-2">{t.noResults}</h2>
            <p className="text-slate-600 mb-6">{t.noResultsBody}</p>
            <button className="button button-primary" type="button" onClick={reset}>
              {t.restart}
            </button>
          </div>
        )}

        <div className="authority-note flex items-center justify-center gap-2 text-xs text-slate-500 mt-10">
          <ShieldCheck size={17} className="text-amber-600 shrink-0" />
          <span>{t.authority}</span>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow={t.nav.eligibility} title={t.eligibility.title} body={t.eligibility.body}>
        <div className="privacy-note inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full mt-3">
          <ShieldCheck size={15} className="text-emerald-600" />
          {t.eligibility.privacy}
        </div>
      </PageHeader>

      <section className="page-width eligibility-page pb-20">
        <div className="eligibility-shell bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="progress-header flex items-center gap-4 mb-6 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            <span>{t.eligibility.progress(step + 1, questions.length)}</span>
            <div className="progress-track flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
              <span
                className="block h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Panel */}
          <div className="question-panel py-6 text-center">
            <span className="question-index inline-block text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              Step 0{step + 1} of 0{questions.length}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight max-w-xl mx-auto mb-8">
              {current.title}
            </h2>

            <div className="option-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
              {current.options.map(([value, label]) => {
                const isSelected = answers[current.key] === value;
                return (
                  <button
                    className={`option-card flex items-center justify-between gap-3 p-4 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-1 ring-emerald-500"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                    type="button"
                    key={value}
                    onClick={() => update(value)}
                  >
                    <span className="leading-snug">{label}</span>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="question-actions flex items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-100">
            {step > 0 ? (
              <button
                className="button button-ghost inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold transition-colors"
                type="button"
                onClick={() => setStep((value) => value - 1)}
              >
                <ChevronLeft size={16} />
                {t.previous}
              </button>
            ) : (
              <span />
            )}

            {step < questions.length - 1 ? (
              <button
                className="button button-primary inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold transition-colors shadow-xs"
                type="button"
                disabled={!canContinue}
                onClick={() => setStep((value) => value + 1)}
              >
                {t.continue}
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className="button button-glow inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold transition-all shadow-md shadow-emerald-700/20"
                type="button"
                disabled={!canContinue || calculating}
                onClick={submit}
              >
                {calculating ? (
                  <>
                    <LoaderCircle size={16} className="spin animate-spin" />
                    {t.calculate}
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    {t.calculate}
                  </>
                )}
              </button>
            )}
          </div>

          <div className="eligibility-disclaimer flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3.5 rounded-xl mt-6 border border-slate-100">
            <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
              i
            </span>
            <p className="m-0 leading-relaxed">{t.sampleLong}</p>
          </div>
        </div>
      </section>
    </>
  );
}
