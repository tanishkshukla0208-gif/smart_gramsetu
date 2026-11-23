import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";
import { getCategories, getSchemes } from "../services/schemeService.js";

export default function Categories() {
  const { language } = useApp();
  const t = translations[language] || translations.en;
  const categories = getCategories();
  const schemes = getSchemes();

  return (
    <>
      <PageHeader eyebrow={t.nav.categories} title={t.browse} body={t.browseBody} />
      <section className="page-width category-page pb-20">
        <div className="category-explorer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => {
            const count = schemes.filter((scheme) => scheme.category.id === category.id).length;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="h-full"
              >
                <Link
                  className="large-category-card group h-full min-h-[240px] flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-400 transition-all text-left relative"
                  to={`/categories/${category.id}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="large-category-icon w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110">
                        <CategoryIcon name={category.icon} size={24} />
                      </span>
                      <span className="large-category-number text-xs font-mono font-bold text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">
                      {language === "hi" ? category.nameHi : category.name}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed m-0">
                      {language === "hi" ? category.descriptionHi : category.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs font-bold text-emerald-700">
                    <span>
                      {count} {t.nav.schemes}
                    </span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

        </div>
      </section>
    </>
  );
}
