import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import AppLayout from "./components/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Schemes from "./pages/Schemes.jsx";
import SchemeDetailsPage from "./pages/SchemeDetailsPage.jsx";
import Eligibility from "./pages/Eligibility.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Saved from "./pages/Saved.jsx";
import Categories from "./pages/Categories.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Compare from "./pages/Compare.jsx";
import Documents from "./pages/Documents.jsx";
import ApplicationGuide from "./pages/ApplicationGuide.jsx";
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQ.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import NotFound from "./pages/NotFound.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";

function PageFrame({ children }) {
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>{children}</motion.div>;
}

export default function App() {
  const location = useLocation();
  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <PageFrame key={location.pathname}>
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
            <Route path="/faq" element={<FAQ />} />
                        <Route path="/account/profile" element={<UserProfile />} />
            <Route path="/account/settings" element={<AccountSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageFrame>
      </AnimatePresence>
    </AppLayout>
  );
}
