import { BriefcaseBusiness, GraduationCap, HandHeart, HeartPulse, House, Leaf, Sprout, Store } from "lucide-react";
const icons = { Sprout, GraduationCap, House, BriefcaseBusiness, HeartPulse, Store, HandHeart };
export default function CategoryIcon({ name, size = 24 }) { const Icon = icons[name] || Leaf; return <Icon size={size} />; }
