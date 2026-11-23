/**
 * Gram Setu — Official 22 Scheduled Indian Languages + English
 * Complete metadata including native script names, script classification and text direction.
 */
export const INDIAN_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", script: "Latin", dir: "ltr", region: "All India" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari", dir: "ltr", region: "Northern & Central India" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", script: "Bengali", dir: "ltr", region: "West Bengal & Tripura" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", script: "Telugu", dir: "ltr", region: "Andhra Pradesh & Telangana" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", script: "Devanagari", dir: "ltr", region: "Maharashtra & Goa" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil", dir: "ltr", region: "Tamil Nadu & Puducherry" },
  { code: "ur", name: "Urdu", nativeName: "اردو", script: "Perso-Arabic", dir: "rtl", region: "National / Jammu & Kashmir / UP" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", script: "Gujarati", dir: "ltr", region: "Gujarat & UTs" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", script: "Kannada", dir: "ltr", region: "Karnataka" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", script: "Odia", dir: "ltr", region: "Odisha" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", script: "Malayalam", dir: "ltr", region: "Kerala & Lakshadweep" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", script: "Gurmukhi", dir: "ltr", region: "Punjab & Haryana" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", script: "Bengali-Assamese", dir: "ltr", region: "Assam" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली", script: "Devanagari", dir: "ltr", region: "Bihar & Jharkhand" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", script: "Devanagari", dir: "ltr", region: "Classical Heritage" },
  { code: "ks", name: "Kashmiri", nativeName: "कॉशुर / کٲشُر", script: "Perso-Arabic", dir: "rtl", region: "Jammu & Kashmir" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी", script: "Devanagari", dir: "ltr", region: "Goa & Coastal Karnataka" },
  { code: "mni", name: "Manipuri", nativeName: "মৈতৈলোন্ (Meitei)", script: "Bengali / Meitei Mayek", dir: "ltr", region: "Manipur" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", script: "Devanagari", dir: "ltr", region: "Sikkim & West Bengal" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي / सिन्धी", script: "Perso-Arabic", dir: "rtl", region: "National Heritage" },
  { code: "brx", name: "Bodo", nativeName: "बर'", script: "Devanagari", dir: "ltr", region: "Bodoland / Assam" },
  { code: "sat", name: "Santali", nativeName: "संथाली / ᱥᱟᱱᱛᱟᱲᱤ", script: "Ol Chiki / Devanagari", dir: "ltr", region: "Jharkhand & Odisha" },
];

export function getLanguageByCode(code) {
  return INDIAN_LANGUAGES.find((lang) => lang.code === code) || INDIAN_LANGUAGES[0];
}

export function isRtlLanguage(code) {
  const lang = getLanguageByCode(code);
  return lang.dir === "rtl";
}
