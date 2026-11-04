import { ArrowRight, SearchX } from "lucide-react";
import { Link } from "react-router";

export default function EmptyState({ title, body, action, to = "/schemes" }) {
  return <div className="empty-state"><div className="empty-icon"><SearchX size={24} /></div><h2>{title}</h2><p>{body}</p>{action && <Link className="button button-primary" to={to}>{action}<ArrowRight size={16} /></Link>}</div>;
}
