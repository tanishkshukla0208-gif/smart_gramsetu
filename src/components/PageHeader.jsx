import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export default function PageHeader({ eyebrow, title, body, back = false, children }) {
  const { language } = useApp(); const t = translations[language];
  return <section className="page-header page-width">{back && <Link className="back-link" to="/schemes"><ArrowLeft size={15} />{t.back}</Link>}<p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1>{body && <p>{body}</p>}{children}</section>;
}
