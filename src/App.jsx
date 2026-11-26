import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import AppLayout from "./components/AppLayout.jsx";
import { useApp } from "./context/AppContext.jsx";

// Eager primary route for instantaneous initial homepage delivery
import HomePage from "./pages/HomePage.jsx";

// Route-based code splitting for secondary pages via React.lazy
const Schemes = lazy(() => import("./pages/Schemes.jsx"));
const SchemeDetailsPage = lazy(() => import("./pages/SchemeDetailsPage.jsx"));
const Eligibility = lazy(() => import("./pages/Eligibility.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Saved = lazy(() => import("./pages/Saved.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));
const Compare = lazy(() => import("./pages/Compare.jsx"));
const Documents = lazy(() => import("./pages/Documents.jsx"));
const ApplicationGuide = lazy(() => import("./pages/ApplicationGuide.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const UserProfile = lazy(() => import("./pages/UserProfile.jsx"));
const AccountSettings = lazy(() => import("./pages/AccountSettings.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const pageMotionVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function PageFrame({ children }) {
  return (
    <motion.div
      variants={pageMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}


function RouteLoadingFallback() {
  const { language } = useApp();
  const isHi = language === "hi" || ["mr", "mai", "sa", "kok", "ne", "brx"].includes(language);
  return (
    <div 
      className="min-h-[55vh] flex flex-col items-center justify-center px-4 py-16"
      role="status"
      aria-live="polite"
      aria-label={isHi ? "सामग्री लोड हो रही है..." : "Loading page content..."}
    >
      <div className="relative flex items-center justify-center mb-5" aria-hidden="true">
        {/* Outer ambient pulsing emerald halo */}
        <div className="absolute w-16 h-16 rounded-full bg-emerald-500/15 animate-ping" />
        {/* Circular spinning ring with authentic emerald brand styling */}
        <div className="w-12 h-12 rounded-full border-3 border-emerald-100 border-t-emerald-700 animate-spin" />
        {/* Inner center core */}
        <div className="absolute w-3.5 h-3.5 rounded-full bg-emerald-700" />
      </div>
      <p className="text-sm font-semibold text-emerald-950 tracking-wide m-0">
        {isHi ? "ग्रामसेतु पृष्ठ लोड हो रहा है..." : "Loading GramSetu..."}
      </p>
      <span className="text-xs text-slate-500 mt-1 font-medium">
        {isHi ? "कृपया प्रतीक्षा करें" : "Please wait a moment"}
      </span>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <PageFrame key={location.pathname}>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/schemes/:schemeId" element={<SchemeDetailsPage />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:category" element={<CategoryPage />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/application-guide" element={<ApplicationGuide />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/account/profile" element={<UserProfile />} />
              <Route path="/account/settings" element={<AccountSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageFrame>
      </AnimatePresence>
    </AppLayout>
  );
}
