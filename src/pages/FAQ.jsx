import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

const faqs = [
  ["Is GramSetu an official government portal?", "No. GramSetu is a discovery and guidance demonstration. Use the linked responsible authority for the authoritative rules, forms, deadlines, and application status."],
  ["Can GramSetu tell me if I will receive a benefit?", "No. The eligibility checker surfaces potential matches from the demonstration dataset. A responsible authority makes the final decision after its own verification."],
  ["What happens to my eligibility answers?", "The demo keeps the answers in the current page session to calculate results. It does not request Aadhaar, bank details, passwords, or an exact address."],
  ["Are the scheme details always current?", "No. Government rules and application channels can change. Every record is labelled as demonstration data and should be checked at its linked official source."],
  ["Are my saved schemes synced across devices?", "No. Bookmarks and checklist progress are stored locally in this browser. They are not an account, cloud sync, or shared profile."],
  ["Can I add a language later?", "Yes. Interface strings live in the translation module and scheme records include language-specific content fields, making additional Indian languages possible."],
];

export default function FAQ() {
  const { language } = useApp(); const t = translations[language]; const [open, setOpen] = useState(0);
  return <><PageHeader eyebrow={t.faq} title={t.faqTitle} body={t.faqBody} /><section className="page-width faq-page"><div className="faq-list">{faqs.map(([question, answer], index) => <div className={open === index ? "faq-item open" : "faq-item"} key={question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span><MessageCircleQuestion size={17} />{language === "hi" && index === 0 ? "क्या GramSetu आधिकारिक सरकारी पोर्टल है?" : question}</span><ChevronDown size={17} /></button>{open === index && <p>{language === "hi" ? "GramSetu खोज और मार्गदर्शन का प्रदर्शन मंच है। आधिकारिक नियमों, फॉर्म, समय-सीमा और आवेदन स्थिति के लिए संबंधित प्राधिकरण का स्रोत देखें।" : answer}</p>}</div>)}</div></section></>;
}
