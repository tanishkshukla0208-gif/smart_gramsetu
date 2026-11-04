import { useEffect } from "react";
import { useLocation } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function AppLayout({ children }) {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]);
  return (
    <div className="app-shell">
      <div className="ambient-background">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
        <div className="blob blob4"></div>
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
