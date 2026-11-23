/**
 * GramSetu Multi-lingual AI Voice Assistant Engine
 * Comprehensive conversational natural language understanding, grounded scheme search,
 * intent parsing, and rural-accessible response generation.
 */

import { getSchemes, getSchemeById, localizeScheme } from "./schemeService.js";

// Multi-lingual Greetings and Response Templates for all 13 supported languages
const LOCALIZED_STRINGS = {
  hi: {
    greeting: "नमस्ते! मैं ग्रामसेतु आवाज़ साथी हूँ। मैं आपको सरकारी योजनाओं, पात्रता, लाभ, ज़रूरी दस्तावेज़ और आवेदन प्रक्रिया की पूरी जानकारी दे सकता हूँ। आप क्या जानना चाहते हैं?",
    helpText: "आप बोलकर या लिखकर पूछ सकते हैं, जैसे: 'किसानों के लिए योजनाएं', 'पीएम-किसान में कितना पैसा मिलता है?', या 'छात्रवृत्ति कैसे मिलेगी?'",
    noMatch: "मुझे इस विषय पर सटीक योजना नहीं मिली। कृपया पुनः पूछें या 'किसान', 'छात्र', 'महिला', 'पेंशन' जैसे शब्दों का उपयोग करें।",
    clarify: "आप किस प्रकार की योजना की जानकारी चाहते हैं? नीचे दिए गए विकल्पों में से चुनें:",
    farmersFound: "किसानों के लिए प्रमुख सरकारी योजनाएं:",
    studentsFound: "छात्रों और युवाओं के लिए प्रमुख छात्रवृत्ति योजनाएं:",
    womenFound: "महिलाओं और बेटियों के लिए विशेष योजनाएं:",
    healthFound: "स्वास्थ्य एवं निःशुल्क इलाज के लिए योजनाएं:",
    housingFound: "आवास एवं पक्का मकान निर्माण योजनाएं:",
    employmentFound: "रोजगार, कौशल विकास और मजदूरी योजनाएं:",
    businessFound: "व्यवसाय, व्यापार एवं ऋण (लोन) सहायता योजनाएं:",
    pensionFound: "बुजुर्गों, विधवाओं एवं दिव्यांगों के लिए पेंशन योजनाएं:",
    eligibilityTitle: "की पात्रता शर्तें:",
    benefitsTitle: "के मुख्य लाभ एवं सहायता राशि:",
    documentsTitle: "के लिए आवश्यक दस्तावेज़:",
    applyTitle: "में आवेदन करने के चरण:",
    navSchemes: "मैं आपको 'योजनाएं खोजें' (Explore Schemes) पृष्ठ पर ले जा रहा हूँ।",
    navEligibility: "मैं आपको 'पात्रता जांच' (Eligibility Checker) पृष्ठ पर ले जा रहा हूँ।",
    navCompare: "मैं आपको 'योजना तुलना' (Compare Schemes) पृष्ठ पर ले जा रहा हूँ।",
    navDocuments: "मैं आपको 'दस्तावेज़ चेकलिस्ट' (Documents) पृष्ठ पर ले जा रहा हूँ।",
    navDashboard: "मैं आपको आपके 'डैशबोर्ड' पृष्ठ पर ले जा रहा हूँ।",
    viewDetails: "पूरा विवरण देखें",
    openPortal: "आधिकारिक पोर्टल खोलें",
  },
  en: {
    greeting: "Hello! I am GramSetu Voice Saathi. I can guide you about government schemes, eligibility criteria, financial assistance, required documents, and application steps. How may I help you today?",
    helpText: "You can ask by speaking or typing, such as: 'Schemes for farmers', 'How much money under PM-KISAN?', or 'College scholarships'.",
    noMatch: "I couldn't find a matching scheme for your query. Please rephrase or ask about 'farmers', 'students', 'women', 'housing', or 'pension'.",
    clarify: "Which category of government scheme would you like to explore? Please choose an option below:",
    farmersFound: "Key government schemes for farmers & agriculture:",
    studentsFound: "Top scholarship and education schemes for students:",
    womenFound: "Special schemes for women and girl children:",
    healthFound: "Healthcare, hospital coverage and medicine schemes:",
    housingFound: "Housing and permanent home construction schemes:",
    employmentFound: "Employment, skills training and livelihood schemes:",
    businessFound: "Business, shopkeeper and loan assistance schemes:",
    pensionFound: "Social security and pension schemes for elderly & disabled:",
    eligibilityTitle: "Eligibility Criteria for",
    benefitsTitle: "Key Benefits & Financial Assistance for",
    documentsTitle: "Required Documents for",
    applyTitle: "How to Apply for",
    navSchemes: "Navigating to the 'Explore Schemes' page.",
    navEligibility: "Navigating to the 'Eligibility Checker' page.",
    navCompare: "Navigating to the 'Compare Schemes' page.",
    navDocuments: "Navigating to the 'Documents Checklist' page.",
    navDashboard: "Navigating to your 'Dashboard' page.",
    viewDetails: "View Full Details",
    openPortal: "Open Official Portal",
  },
  bn: {
    greeting: "নমস্কার! আমি গ্রামসেতু ভয়েস সাথী। আমি আপনাকে সরকারি প্রকল্প, যোগ্যতা, আর্থিক সহায়তা, প্রয়োজনীয় নথিপত্র এবং আবেদন প্রক্রিয়া সম্পর্কে তথ্য দিতে পারি।",
    helpText: "আপনি মুখে বলে বা লিখে প্রশ্ন করতে পারেন, যেমন: 'কৃষকদের প্রকল্প', 'পিএম কিষাণে কত টাকা পাওয়া যায়?', বা 'স্কলারশিপ'।",
    noMatch: "আপনার প্রশ্নের সাথে মানানসই প্রকল্প পাওয়া যায়নি। অনুগ্রহ করে আবার বলুন বা কৃষক, ছাত্র, মহিলা বা পেনশন সম্পর্কে জিজ্ঞাসা করুন।",
    clarify: "আপনি কোন ধরণের প্রকল্পের তথ্য চান? নিচের বিকল্প থেকে নির্বাচন করুন:",
    farmersFound: "কৃষকদের জন্য গুরুত্বপূর্ণ সরকারি প্রকল্প:",
    studentsFound: "ছাত্রছাত্রীদের জন্য বৃত্তি ও শিক্ষা প্রকল্প:",
    womenFound: "মহিলা ও কন্যা শিশুদের জন্য বিশেষ প্রকল্প:",
    healthFound: "স্বাস্থ্য ও চিকিৎসা সহায়তা প্রকল্প:",
    housingFound: "আবাসন ও বাড়ি নির্মাণ প্রকল্প:",
    employmentFound: "কর্মসংস্থান ও দক্ষতা উন্নয়ন প্রকল্প:",
    businessFound: "ব্যবসা ও ঋণ সহায়তা প্রকল্প:",
    pensionFound: "বার্ধক্য ও সামাজিক সুরক্ষা পেনশন প্রকল্প:",
    eligibilityTitle: "এর যোগ্যতা শর্তাবলী:",
    benefitsTitle: "এর প্রধান সুবিধা ও আর্থিক সহায়তা:",
    documentsTitle: "এর জন্য প্রয়োজনীয় নথিপত্র:",
    applyTitle: "এ আবেদন করার ধাপসমূহ:",
    navSchemes: "আপনাকে প্রকল্প তালিকায় নিয়ে যাওয়া হচ্ছে।",
    navEligibility: "আপনাকে যোগ্যতা যাচাই পেজে নিয়ে যাওয়া হচ্ছে।",
    navCompare: "আপনাকে প্রকল্প তুলনা পেজে নিয়ে যাওয়া হচ্ছে।",
    navDocuments: "আপনাকে নথিপত্র পেজে নিয়ে যাওয়া হচ্ছে।",
    navDashboard: "আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে।",
    viewDetails: "বিস্তারিত দেখুন",
    openPortal: "অফিসিয়াল পোর্টাল খুলুন",
  },
  te: {
    greeting: "నమస్కారం! నేను గ్రామసేతు వాయిస్ సాథీని. ప్రభుత్వ పథకాలు, అర్హత, ప్రయోజనాలు, అవసరమైన పత్రాలు మరియు దరఖాస్తు విధానం గురించి మీకు సహాయం చేయగలను.",
    helpText: "మీరు మాట్లాడి లేదా టైప్ చేసి అడగవచ్చు: 'రైతుల పథకాలు', 'పీఎం కిసాన్ నిధులు', లేదా 'విద్యార్థి స్కాలర్‌షిప్‌లు'.",
    noMatch: "క్షమించండి, మీ ప్రశ్నకు సరిపోయే పథకం లభించలేదు. దయచేసి రైతు, విద్యార్థి, మహిళ లేదా పింఛను వంటి పదాలతో అడగండి.",
    clarify: "మీరు ఏ వర్గం పథకాల గురించి తెలుసుకోవాలనుకుంటున్నారు?",
    farmersFound: "రైతుల కోసం ముఖ్యమైన ప్రభుత్వ పథకాలు:",
    studentsFound: "విద్యార్థుల కోసం ఉపకార వేతనాలు (స్కాలర్‌షిప్‌లు):",
    womenFound: "మహిళలు మరియు ఆడపిల్లల కోసం పథకాలు:",
    healthFound: "ఆరోగ్యం మరియు ఉచిత వైద్య చికిత్స పథకాలు:",
    housingFound: "గృహ నిర్మాణం మరియు పక్కా ఇళ్ల పథకాలు:",
    employmentFound: "ఉపాధి మరియు నైపుణ్యాభివృద్ధి పథకాలు:",
    businessFound: "వ్యాపారం మరియు రుణ సాయం పథకాలు:",
    pensionFound: "వృద్ధులు మరియు వికలాంగుల పింఛను పథకాలు:",
    eligibilityTitle: "అర్హత నిబంధనలు:",
    benefitsTitle: "ప్రయోజనాలు మరియు సహాయం:",
    documentsTitle: "కావలసిన పత్రాలు:",
    applyTitle: "దరఖాస్తు చేసుకునే విధానం:",
    navSchemes: "పథకాల పేజీకి వెళ్తున్నారు.",
    navEligibility: "అర్హత తనిఖీ పేజీకి వెళ్తున్నారు.",
    navCompare: "పోలిక పేజీకి వెళ్తున్నారు.",
    navDocuments: "పత్రాల పేజీకి వెళ్తున్నారు.",
    navDashboard: "డాష్‌బోర్డ్‌కి వెళ్తున్నారు.",
    viewDetails: "వివరాలు చూడండి",
    openPortal: "అధికారిక పోర్టల్ తెరవండి",
  },
  ta: {
    greeting: "வணக்கம்! நான் கிராம்சேது குரல் தோழன். அரசு நலத்திட்டங்கள், தகுதி, நிதியுதவி, தேவையான ஆவணங்கள் மற்றும் விண்ணப்பிக்கும் முறை பற்றி உங்களுக்கு வழிகாட்ட முடியும்.",
    helpText: "நீங்கள் பேசியோ அல்லது தட்டச்சு செய்தோ கேட்கலாம்: 'விவசாயிகள் திட்டம்', 'மாணவர் கல்வித்தொகை', அல்லது 'பிஎம் கிசான்'.",
    noMatch: "பொருத்தமான திட்டம் கிடைக்கவில்லை. தயவுசெய்து விவசாயி, மாணவர், பெண்கள் அல்லது ஓய்வூதியம் பற்றி மீண்டும் கேளுங்கள்.",
    clarify: "நீங்கள் எந்த வகையான திட்டத்தை அறிய விரும்புகிறீர்கள்?",
    farmersFound: "விவசாயிகளுக்கான முக்கிய அரசு திட்டங்கள்:",
    studentsFound: "மாணவர்களுக்கான கல்வி உதவித்தொகை திட்டங்கள்:",
    womenFound: "பெண்களுக்கான சிறப்பு திட்டங்கள்:",
    healthFound: "மருத்துவம் மற்றும் மருத்துவக் காப்பீட்டுத் திட்டங்கள்:",
    housingFound: "வீட்டு வசதி திட்டங்கள்:",
    employmentFound: "வேலைவாய்ப்பு மற்றும் திறன் மேம்பாட்டு திட்டங்கள்:",
    businessFound: "தொழில் மற்றும் கடன் உதவி திட்டங்கள்:",
    pensionFound: "முதியோர் மற்றும் மாற்றுத்திறனாளிகள் ஓய்வூதியத் திட்டங்கள்:",
    eligibilityTitle: "திட்டத்திற்கான தகுதி வரம்புகள்:",
    benefitsTitle: "நன்மைகள் மற்றும் நிதியுதவி விவரம்:",
    documentsTitle: "தேவையான ஆவணங்கள்:",
    applyTitle: "விண்ணப்பிக்கும் வழிமுறைகள்:",
    navSchemes: "திட்டங்கள் பக்கத்திற்கு செல்கிறது.",
    navEligibility: "தகுதி சரிபார்ப்பு பக்கத்திற்கு செல்கிறது.",
    navCompare: "ஒப்பீட்டுப் பக்கத்திற்கு செல்கிறது.",
    navDocuments: "ஆவணங்கள் பக்கத்திற்கு செல்கிறது.",
    navDashboard: "டாஷ்போர்டுக்கு செல்கிறது.",
    viewDetails: "முழு விவரம் பார்க்க",
    openPortal: "அதிகாரப்பூர்வ தளம் திறக்க",
  },
  mr: {
    greeting: "नमस्कार! मी ग्रामसेतू आवाज साथी आहे. मी आपल्याला सरकारी योजना, पात्रता, मिळणारे लाभ, आवश्यक कागदपत्रे आणि अर्ज प्रक्रियेबद्दल संपूर्ण माहिती देऊ शकतो.",
    helpText: "तुम्ही बोलून किंवा लिहून विचारू शकता: 'शेतकऱ्यांसाठी योजना', 'पीएम-किसान योजनेत किती पैसे मिळतात?', किंवा 'विद्यार्थी शिष्यवृत्ती'.",
    noMatch: "माहिती सापडली नाही. कृपया शेतकरी, विद्यार्थी, महिला, पेन्शन याविषयी पुन्हा विचारा.",
    clarify: "तुम्हाला कोणत्या प्रकारच्या योजनेची माहिती हवी आहे?",
    farmersFound: "शेतकऱ्यांसाठी महत्त्वाच्या शासकीय योजना:",
    studentsFound: "विद्यार्थ्यांसाठी शिष्यवृत्ती योजना:",
    womenFound: "महिला व मुलींसाठी विशेष शासकीय योजना:",
    healthFound: "आरोग्य आणि मोफत उपचार योजना:",
    housingFound: "घरकुल व पक्के घर बांधणी योजना:",
    employmentFound: "रोजगार, कौशल्य विकास आणि मजुरी योजना:",
    businessFound: "व्यवसाय व कर्ज सहाय्य योजना:",
    pensionFound: "ज्येष्ठ नागरिक व दिव्यांगांसाठी पेन्शन योजना:",
    eligibilityTitle: "च्या पात्रता अटी:",
    benefitsTitle: "चे मुख्य लाभ व आर्थिक मदत:",
    documentsTitle: "साठी लागणारी कागदपत्रे:",
    applyTitle: "मधील अर्ज प्रक्रिया:",
    navSchemes: "योजना यादी पृष्ठावर नेत आहे.",
    navEligibility: "पात्रता तपासणी पृष्ठावर नेत आहे.",
    navCompare: "योजना तुलना पृष्ठावर नेत आहे.",
    navDocuments: "कागदपत्रे पृष्ठावर नेत आहे.",
    navDashboard: "डॅशबोर्डवर नेत आहे.",
    viewDetails: "संपूर्ण माहिती पहा",
    openPortal: "अधिकृत पोर्टल उघडा",
  },
  gu: {
    greeting: "નમસ્તે! હું ગ્રામસેતુ વૉઇસ સાથી છું. હું તમને સરકારી યોજનાઓ, પાત્રતા, સહાય રકમ, જરૂરી દસ્તાવેજો અને અરજી પ્રક્રિયા વિશે સંપૂર્ણ માહિતી આપી શકું છું.",
    helpText: "તમે બોલીને કે લખીને પૂછી શકો છો: 'ખેડૂતો માટે યોજનાઓ', 'પીએમ કિસાન સહાય', અથવા 'વિદ્યાર્થી સ્કોલરશીપ'.",
    noMatch: "કોઈ મેળ ખાતી યોજના મળી નથી. કૃપા કરીને ખેડૂત, વિદ્યાર્થી, મહિલા અથવા પેન્શન વિશે ફરી પૂછો.",
    clarify: "તમે કઈ શ્રેણીની યોજનાઓ વિશે જાણવા માંગો છો?",
    farmersFound: "ખેડૂતો માટેની મુખ્ય સરકારી યોજનાઓ:",
    studentsFound: "વિદ્યાર્થીઓ માટે સ્કોલરશીપ અને શિક્ષણ યોજનાઓ:",
    womenFound: "મહિલાઓ અને દીકરીઓ માટેની વિશેષ યોજનાઓ:",
    healthFound: "આરોગ્ય અને મફત સારવાર માટેની યોજનાઓ:",
    housingFound: "આવાસ અને પાકા મકાન નિર્માણ યોજનાઓ:",
    employmentFound: "રોજગાર અને કૌશલ્ય વિકાસ યોજનાઓ:",
    businessFound: "વેપાર અને લોન સહાય યોજનાઓ:",
    pensionFound: "વૃદ્ધો અને દિવ્યાંગો માટે પેન્શન યોજનાઓ:",
    eligibilityTitle: "માટે પાત્રતા નિયમો:",
    benefitsTitle: "ના મુખ્ય લાભ અને સહાય:",
    documentsTitle: "માટે જરૂરી દસ્તાવેજો:",
    applyTitle: "માં અરજી કરવાના પગલાં:",
    navSchemes: "યોજનાઓની યાદી ખોલી રહ્યા છીએ.",
    navEligibility: "પાત્રતા ચકાસણી પૃષ્ઠ પર લઈ જઈ રહ્યા છીએ.",
    navCompare: "યોજના સરખામણી પૃષ્ઠ પર જઈ રહ્યા છીએ.",
    navDocuments: "દસ્તાવેજ યાદી પૃષ્ઠ પર જઈ રહ્યા છીએ.",
    navDashboard: "ડેશબોર્ડ ખોલી રહ્યા છીએ.",
    viewDetails: "વિગતો જુઓ",
    openPortal: "સત્તાવાર પોર્ટલ ખોલો",
  },
  pa: {
    greeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਗ੍ਰਾਮਸੇਤੂ ਆਵਾਜ਼ ਸਾਥੀ ਹਾਂ। ਮੈਂ ਤੁਹਾਨੂੰ ਸਰਕਾਰੀ ਸਕੀਮਾਂ, ਯੋਗਤਾ, ਵਿੱਤੀ ਸਹਾਇਤਾ, ਜ਼ਰੂਰੀ ਦਸਤਾਵੇਜ਼ਾਂ ਅਤੇ ਅਰਜ਼ੀ ਪ੍ਰਕਿਰਿਆ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦੇ ਸਕਦਾ ਹਾਂ।",
    helpText: "ਤੁਸੀਂ ਬੋਲ ਕੇ ਜਾਂ ਲਿਖ ਕੇ ਪੁੱਛ ਸਕਦੇ ਹੋ, ਜਿਵੇਂ: 'ਕਿਸਾਨਾਂ ਲਈ ਸਕੀਮਾਂ', 'ਪੀਐੱਮ-ਕਿਸਾਨ ਦੇ ਪੈਸੇ', ਜਾਂ 'ਸਕਾਲਰਸ਼ਿਪ'.",
    noMatch: "ਢੁਕਵੀਂ ਸਕੀਮ ਨਹੀਂ ਮਿਲੀ। ਕਿਰਪਾ ਕਰਕੇ ਕਿਸਾਨ, ਵਿਦਿਆਰਥੀ ਜਾਂ ਔਰਤਾਂ ਬਾਰੇ ਦੁਬਾਰਾ ਪੁੱਛੋ।",
    clarify: "ਤੁਸੀਂ ਕਿਸ ਤਰ੍ਹਾਂ ਦੀ ਸਕੀਮ ਬਾਰੇ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
    farmersFound: "ਕਿਸਾਨਾਂ ਲਈ ਅਹਿਮ ਸਰਕਾਰੀ ਸਕੀਮਾਂ:",
    studentsFound: "ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਵਜ਼ੀਫ਼ਾ (ਸਕਾਲਰਸ਼ਿਪ) ਸਕੀਮਾਂ:",
    womenFound: "ਔਰਤਾਂ ਅਤੇ ਧੀਆਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਸਕੀਮਾਂ:",
    healthFound: "ਸਿਹਤ ਅਤੇ ਮੁਫ਼ਤ ਇਲਾਜ ਲਈ ਸਕੀਮਾਂ:",
    housingFound: "ਮਕਾਨ ਉਸਾਰੀ ਲਈ ਸਰਕਾਰੀ ਸਕੀਮਾਂ:",
    employmentFound: "ਰੁਜ਼ਗਾਰ ਅਤੇ ਹੁਨਰ ਵਿਕਾਸ ਸਕੀਮਾਂ:",
    businessFound: "ਕਾਰੋਬਾਰ ਅਤੇ ਕਰਜ਼ਾ ਸਹਾਇਤਾ ਸਕੀਮਾਂ:",
    pensionFound: "ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਦਿਵਿਆਂਗਾਂ ਲਈ ਪੈਨਸ਼ਨ ਸਕੀਮਾਂ:",
    eligibilityTitle: "ਲਈ ਯੋਗਤਾ ਦੀਆਂ ਸ਼ਰਤਾਂ:",
    benefitsTitle: "ਦੇ ਮੁੱਖ ਲਾਭ ਅਤੇ ਸਹਾਇਤਾ ਰਾਸ਼ੀ:",
    documentsTitle: "ਲਈ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼:",
    applyTitle: "ਲਈ ਅਰਜ਼ੀ ਦੇਣ ਦੇ ਪੜਾਅ:",
    navSchemes: "ਸਕੀਮਾਂ ਦੀ ਸੂਚੀ ਤੇ ਜਾ ਰਹੇ ਹਾਂ।",
    navEligibility: "ਯੋਗਤਾ ਜਾਂਚ ਪੰਨੇ ਤੇ ਜਾ ਰਹੇ ਹਾਂ।",
    navCompare: "ਤੁਲਨਾ ਪੰਨੇ ਤੇ ਜਾ ਰਹੇ ਹਾਂ।",
    navDocuments: "ਦਸਤਾਵੇਜ਼ ਸੂਚੀ ਤੇ ਜਾ ਰਹੇ ਹਾਂ।",
    navDashboard: "ਡੈਸ਼ਬੋਰਡ ਤੇ ਜਾ ਰਹੇ ਹਾਂ।",
    viewDetails: "ਵੇਰਵੇ ਦੇਖੋ",
    openPortal: "ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਖੋਲ੍ਹੋ",
  },
  kn: {
    greeting: "ನಮಸ್ಕಾರ! ನಾನು ಗ್ರಾಮಸೇತು ಧ್ವನಿ ಸಾಥಿ. ನಾನು ನಿಮಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಅರ್ಹತೆ, ಆರ್ಥಿಕ ನೆರವು, ಅಗತ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆಯ ಬಗ್ಗೆ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ನೀಡಬಲ್ಲೆ.",
    helpText: "ನೀವು ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ ಕೇಳಬಹುದು: 'ರೈತರ ಯೋಜನೆಗಳು', 'ಪಿಎಂ ಕಿಸಾನ್ ಹಣ', ಅಥವಾ 'ವಿದ್ಯಾರ್ಥಿವೇತನ'.",
    noMatch: "ಹೊಂದಾಣಿಕೆಯಾಗುವ ಯೋಜನೆ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ರೈತರು, ವಿದ್ಯಾರ್ಥಿಗಳು, ಮಹಿಳೆಯರು ಅಥವಾ ಪಿಂಚಣಿ ಬಗ್ಗೆ ಮರುಪ್ರಶ್ನಿಸಿ.",
    clarify: "ನೀವು ಯಾವ ವರ್ಗದ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
    farmersFound: "ರೈತರಿಗಾಗಿ ಪ್ರಮುಖ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು:",
    studentsFound: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಯೋಜನೆಗಳು:",
    womenFound: "ಮಹಿಳೆಯರು ಮತ್ತು ಹೆಣ್ಣುಮಕ್ಕಳಿಗಾಗಿ ವಿಶೇಷ ಯೋಜನೆಗಳು:",
    healthFound: "ಆರೋಗ್ಯ ಮತ್ತು ಉಚಿತ ಚಿಕಿತ್ಸಾ ಯೋಜನೆಗಳು:",
    housingFound: "ವಸತಿ ಮತ್ತು ಮನೆ ನಿರ್ಮಾಣ ಯೋಜನೆಗಳು:",
    employmentFound: "ಉದ್ಯೋಗ ಮತ್ತು ಕೌಶಲ್ಯಾಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು:",
    businessFound: "ವ್ಯಾಪಾರ ಮತ್ತು ಸಾಲ ನೆರವು ಯೋಜನೆಗಳು:",
    pensionFound: "ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ಅಂಗವಿಕಲರಿಗೆ ಪಿಂಚಣಿ ಯೋಜನೆಗಳು:",
    eligibilityTitle: "ಅರ್ಹತಾ ಮಾನದಂಡಗಳು:",
    benefitsTitle: "ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು ಮತ್ತು ನೆರವು:",
    documentsTitle: "ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು:",
    applyTitle: "ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಹಂತಗಳು:",
    navSchemes: "ಯೋಜನೆಗಳ ಪುಟಕ್ಕೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ.",
    navEligibility: "ಅರ್ಹತೆ ಪರೀಕ್ಷೆ ಪುಟಕ್ಕೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ.",
    navCompare: "ಹೋಲಿಕೆ ಪುಟಕ್ಕೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ.",
    navDocuments: "ದಾಖಲೆಗಳ ಪುಟಕ್ಕೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ.",
    navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತಿದೆ.",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    openPortal: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ",
  },
  ml: {
    greeting: "നമസ്കാരം! ഞാൻ ഗ്രാമസേതു വോയ്സ് സാഥി. സർക്കാർ പദ്ധതികൾ, യോഗ്യത, ആനുകൂല്യങ്ങൾ, ആവശ്യമായ രേഖകൾ, അപേക്ഷാ നടപടിക്രമങ്ങൾ എന്നിവയിൽ ഞാൻ നിങ്ങളെ സഹായിക്കാം.",
    helpText: "സംസാരിച്ചോ ടൈപ്പ് ചെയ്തോ ചോദിക്കാം: 'കർഷക പദ്ധതികൾ', 'പിഎം കിസാൻ തുക', അല്ലെങ്കിൽ 'വിദ്യാഭ്യാസ സ്കോളർഷിപ്പ്'.",
    noMatch: "പൊരുത്തപ്പെടുന്ന പദ്ധതികൾ ലഭ്യമല്ല. കർഷകർ, വിദ്യാർത്ഥികൾ, സ്ത്രീകൾ അല്ലെങ്കിൽ പെൻഷൻ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക.",
    clarify: "ഏത് വിഭാഗത്തിലുള്ള പദ്ധതികളെക്കുറിച്ചാണ് താങ്കൾ അറിയാൻ ആഗ്രഹിക്കുന്നത്?",
    farmersFound: "കർഷകർക്കായുള്ള പ്രധാന സർക്കാർ പദ്ധതികൾ:",
    studentsFound: "വിദ്യാർത്ഥികൾക്കുള്ള സ്കോളർഷിപ്പ് പദ്ധതികൾ:",
    womenFound: "സ്ത്രീകൾക്കും കുട്ടികൾക്കുമുള്ള പ്രത്യേക പദ്ധതികൾ:",
    healthFound: "ആരോഗ്യവും സൗജന്യ ചികിത്സാ പദ്ധതികളും:",
    housingFound: "ഭവന നിർമ്മാണ പദ്ധതികൾ:",
    employmentFound: "തൊഴിലും നൈപുണ്യ വികസന പദ്ധതികളും:",
    businessFound: "ബിസിനസ്, വായ്പാ സഹായ പദ്ധതികൾ:",
    pensionFound: "സാമൂഹിക സുരക്ഷാ പെൻഷൻ പദ്ധതികൾ:",
    eligibilityTitle: "പദ്ധതിയുടെ യോഗ്യതാ മാനദണ്ഡങ്ങൾ:",
    benefitsTitle: "പ്രധാന ആനുകൂല്യങ്ങളും ധനസഹായവും:",
    documentsTitle: "ആവശ്യമായ പ്രധാന രേഖകൾ:",
    applyTitle: "അപേക്ഷ സമർപ്പിക്കേണ്ട ഘട്ടങ്ങൾ:",
    navSchemes: "പദ്ധതികളുടെ ലിസ്റ്റിലേക്ക് പോകുന്നു.",
    navEligibility: "യോഗ്യതാ പരിശോധന പേജിലേക്ക് പോകുന്നു.",
    navCompare: "താരതമ്യ പേജിലേക്ക് പോകുന്നു.",
    navDocuments: "രേഖകളുടെ പേജിലേക്ക് പോകുന്നു.",
    navDashboard: "ഡാഷ്‌ബോർഡിലേക്ക് പോകുന്നു.",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    openPortal: "ഔദ്യോഗിക പോർട്ടൽ തുറക്കുക",
  },
  or: {
    greeting: "ନମସ୍କାର! ମୁଁ ଗ୍ରାମସେତୁ ଭଏସ ସାଥୀ। ମୁଁ ଆପଣଙ୍କୁ ସରକାରୀ ଯୋଜନା, ଯୋଗ୍ୟତା, ଆର୍ଥିକ ସହାୟତା, ଆବଶ୍ୟକୀୟ କାଗଜପତ୍ର ଏବଂ ଆବେଦନ ପ୍ରକ୍ରିୟା ବିଷୟରେ ସୂଚନା ଦେଇପାରିବି।",
    helpText: "ଆପଣ କହି କିମ୍ବା ଲେଖି ପଚାରିପାରିବେ: 'କୃଷକ ଯୋଜନା', 'ପିଏମ କିଷାନ ଟଙ୍କା', କିମ୍ବା 'ଛାତ୍ରବୃତ୍ତି'।",
    noMatch: "କୌଣସି ଯୋଜନା ମିଳିଲା ନାହିଁ। ଦୟାକରି କୃଷକ, ଛାତ୍ର କିମ୍ବା ପେନସନ ବିଷୟରେ ପଚାରନ୍ତୁ।",
    clarify: "ଆପଣ କେଉଁ ପ୍ରକାରର ଯୋଜନା ବିଷୟରେ ଜାଣିବାକୁ ଚାହାଁନ୍ତି?",
    farmersFound: "କୃଷକମାନଙ୍କ ପାଇଁ ପ୍ରମୁଖ ସରକାରୀ ଯୋଜନା:",
    studentsFound: "ଛାତ୍ରଛାତ୍ରୀମାନଙ୍କ ପାଇଁ ବୃତ୍ତି (ସ୍କଲାରସିପ୍) ଯୋଜନା:",
    womenFound: "ମହିଳା ଏବଂ ଝିଅମାନଙ୍କ ପାଇଁ ବିଶେଷ ଯୋଜନା:",
    healthFound: "ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ମାଗଣା ଚିକିତ୍ସା ସୁବିଧା ଯୋଜନା:",
    housingFound: "ଆବାସ ଏବଂ ପକ୍କା ଘର ନିର୍ମାଣ ଯୋଜନା:",
    employmentFound: "ରୋଜଗାର ଏବଂ ଦକ୍ଷତା ବିକାଶ ଯୋଜନା:",
    businessFound: "ବ୍ୟବସାୟ ଏବଂ ଋଣ ସହାୟତା ଯୋଜନା:",
    pensionFound: "ବରିଷ୍ଠ ନାଗରିକ ଏବଂ ଦିବ୍ୟାଙ୍ଗ ପେନସନ ଯୋଜନା:",
    eligibilityTitle: "ଯୋଗ୍ୟତା ସର୍ତ୍ତାବଳୀ:",
    benefitsTitle: "ମୁଖ୍ୟ ଲାଭ ଏବଂ ସହାୟତା ରାଶି:",
    documentsTitle: "ଆବଶ୍ୟକୀୟ ଦସ୍ତାବେଜ:",
    applyTitle: "ଆବେଦନ କରିବାର ପଦକ୍ଷେପ:",
    navSchemes: "ଯୋଜନା ତାଲିକା ପୃଷ୍ଠାକୁ ଯାଉଛି।",
    navEligibility: "ଯୋଗ୍ୟତା ଯାଞ୍ଚ ପୃଷ୍ଠାକୁ ଯାଉଛି।",
    navCompare: "ତୁଳନା ପୃଷ୍ଠାକୁ ଯାଉଛି।",
    navDocuments: "କାଗଜପତ୍ର ପୃଷ୍ଠାକୁ ଯାଉଛି।",
    navDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଯାଉଛି।",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    openPortal: "ଅଫିସିଆଲ୍ ପୋର୍ଟାଲ୍ ଖୋଲନ୍ତୁ",
  },
  as: {
    greeting: "নমস্কাৰ! মই গ্ৰামসেতু ভয়েচ সাথী। মই আপোনাক চৰকাৰী আঁচনি, যোগ্যতা, বিত্তীয় সাহায্য, প্ৰয়োজনীয় নথি-পত্ৰ আৰু আবেদন প্ৰক্ৰিয়া সম্পৰ্কে তথ্য প্ৰদান কৰিব পাৰোঁ।",
    helpText: "আপুনি মাত মাতি বা লিখি সুধিব পাৰে: 'কৃষকৰ আঁচনি', 'পিএম কিষাণ সাহায্য', বা 'স্কলাৰশ্বিপ'।",
    noMatch: "উপযুক্ত আঁচনি পোৱা নগ'ল। অনুগ্ৰহ কৰি কৃষক, ছাত্ৰ, মহিলা বা পেঞ্চন সম্পৰ্কে পুনৰ সোধক।",
    clarify: "আপুনি কোন শ্ৰেণীৰ আঁচনি সম্পৰ্কে জানিব বিচাৰে?",
    farmersFound: "কৃষকৰ বাবে প্ৰধান চৰকাৰী আঁচনিসমূহ:",
    studentsFound: "ছাত্ৰ-ছাত্ৰীৰ বাবে বৃত্তি আৰু শিক্ষা আঁচনি:",
    womenFound: "মহিলা আৰু কন্যা সন্তানৰ বাবে বিশেষ আঁচনি:",
    healthFound: "স্বাস্থ্য আৰু বিনামূলীয়া চিকিৎসা আঁচনি:",
    housingFound: "গৃহ নিৰ্মাণ আৰু আৱাস আঁচনি:",
    employmentFound: "কৰ্মসংস্থাপন আৰু দক্ষতা বিকাশ আঁচনি:",
    businessFound: "ব্যৱসায় আৰু ঋণ সাহায্য আঁচনি:",
    pensionFound: "বয়োজ্যেষ্ঠ আৰু দিব্যাংগ পেঞ্চন আঁচনি:",
    eligibilityTitle: "ৰ যোগ্যতাৰ চৰ্তসমূহ:",
    benefitsTitle: "ৰ মূল লাভ আৰু আৰ্থিক সাহায্য:",
    documentsTitle: "ৰ বাবে প্ৰয়োজনীয় নথি-পত্ৰ:",
    applyTitle: "ত আবেদন কৰাৰ নিয়ম:",
    navSchemes: "আঁচনিসমূহৰ পৃষ্ঠালৈ লৈ যোৱা হৈছে।",
    navEligibility: "যোগ্যতা পৰীক্ষা পৃষ্ঠালৈ লৈ যোৱা হৈছে।",
    navCompare: "তুলনা পৃষ্ঠালৈ লৈ যোৱা হৈছে।",
    navDocuments: "নথিপত্ৰ পৃষ্ঠালৈ লৈ যোৱা হৈছে।",
    navDashboard: "ডেশ্বব'ৰ্ডলৈ লৈ যোৱা হৈছে।",
    viewDetails: "বিস্তাৰিত চাওক",
    openPortal: "অফিচিয়েল প'ৰ্টেল খোলক",
  },
  ur: {
    greeting: "السلام علیکم! میں گرام سیتو وائس ساتھی ہوں۔ میں آپ کو سرکاری اسکیموں، اہلیت، مالی امداد، ضروری دستاویزات اور درخواست کے طریقہ کار کے بارے میں رہنمائی کر سکتا ہوں۔",
    helpText: "آپ بول کر یا لکھ کر پوچھ سکتے ہیں، جیسے: 'کسانوں کی اسکیمیں'، 'پی ایم کسان کی رقم'، یا 'طلباء کے لیے وظیفہ'۔",
    noMatch: "آپ کے سوال کے مطابق اسکیم نہیں ملی۔ براہ کرم کسان، طالب علم، خواتین یا پنشن کے بارے میں دوبارہ پوچھیں۔",
    clarify: "آپ کس زمرے کی اسکیم کے بارے में جاننا چاہتے ہیں؟",
    farmersFound: "کسانوں کے لیے اہم سرکاری اسکیمیں:",
    studentsFound: "طلباء کے لیے وظائف (اسکالرشپ) کی اسکیمیں:",
    womenFound: "خواتین اور بچیوں کے لیے خصوصی اسکیمیں:",
    healthFound: "صحت اور مفت علاج کے لیے اسکیمیں:",
    housingFound: "رہائش اور پکے مکانات کی تعمیراتی اسکیمیں:",
    employmentFound: "روزگار اور مہارت کی تربیت کی اسکیمیں:",
    businessFound: "کاروبار اور قرض کی فراہمی کی اسکیمیں:",
    pensionFound: "بزرگوں اور معذور افراد کے لیے پنشن اسکیمیں:",
    eligibilityTitle: "کی اہلیت کی شرائط:",
    benefitsTitle: "کے اہم فوائد اور مالی امداد:",
    documentsTitle: "کے لیے مطلوبہ دستاویزات:",
    applyTitle: "میں درخواست دینے کا طریقہ کار:",
    navSchemes: "آپ کو اسکیموں کے صفحے پر لے جایا جا رہا ہے۔",
    navEligibility: "آپ کو اہلیت جانچنے کے صفحے پر لے جایا جا رہا ہے۔",
    navCompare: "آپ کو موازنہ کے صفحے پر لے جایا جا رہا ہے۔",
    navDocuments: "آپ کو دستاویزات کے صفحے پر لے جایا جا رہا ہے۔",
    navDashboard: "آپ کو ڈیش بورڈ پر لے جایا جا رہا ہے۔",
    viewDetails: "مکمل تفصیلات دیکھیں",
    openPortal: "سرکاری پورٹل کھولیں",
  },
};

// Default localized labels for metadata displayed across schemes in all 13 languages
const DEFAULT_LABELS = {
  hi: {
    targetBeneficiaries: "लक्षित लाभार्थी:",
    categoryLabel: "श्रेणी:",
    adminLevelLabel: "प्रशासनिक स्तर:",
    verifiedStatusLabel: "सत्यापन स्थिति:",
    financialAssistanceLabel: "वित्तीय सहायता:",
    keyBenefitsLabel: "मुख्य लाभ:",
    centralGovLabel: "केंद्र सरकार",
    stateGovLabel: "राज्य सरकार",
  },
  en: {
    targetBeneficiaries: "Target Beneficiaries:",
    categoryLabel: "Category:",
    adminLevelLabel: "Administrative Level:",
    verifiedStatusLabel: "Verification Status:",
    financialAssistanceLabel: "Financial Assistance:",
    keyBenefitsLabel: "Key Benefits:",
    centralGovLabel: "Central Government",
    stateGovLabel: "State Government",
  },
  bn: {
    targetBeneficiaries: "লক্ষ্যভুক্ত সুবিধাভোগী:",
    categoryLabel: "বিভাগ:",
    adminLevelLabel: "প্রশাসনিক স্তর:",
    verifiedStatusLabel: "যাচাইকরণ স্থিতি:",
    financialAssistanceLabel: "আর্থিক সহায়তা:",
    keyBenefitsLabel: "প্রধান সুবিধাসমূহ:",
    centralGovLabel: "কেন্দ্রীয় সরকার",
    stateGovLabel: "রাজ্য সরকার",
  },
  te: {
    targetBeneficiaries: "లబ్ధిదారులు:",
    categoryLabel: "వర్గం:",
    adminLevelLabel: "ప్రభుత్వ స్థాయి:",
    verifiedStatusLabel: "ధృవీకరణ స్థితి:",
    financialAssistanceLabel: "ఆర్థిక సహాయం:",
    keyBenefitsLabel: "ముఖ్య ప్రయోజనాలు:",
    centralGovLabel: "కేంద్ర ప్రభుత్వం",
    stateGovLabel: "రాష్ట్ర ప్రభుత్వం",
  },
  ta: {
    targetBeneficiaries: "பயனாளிகள்:",
    categoryLabel: "பிரிவு:",
    adminLevelLabel: "நிர்வாக நிலை:",
    verifiedStatusLabel: "சரிபார்ப்பு நிலை:",
    financialAssistanceLabel: "நிதியுதவி:",
    keyBenefitsLabel: "முக்கிய நன்மைகள்:",
    centralGovLabel: "மத்திய அரசு",
    stateGovLabel: "மாநில அரசு",
  },
  mr: {
    targetBeneficiaries: "लक्षित लाभार्थी:",
    categoryLabel: "श्रेणी / वर्ग:",
    adminLevelLabel: "प्रशासकीय स्तर:",
    verifiedStatusLabel: "पडताळणी स्थिती:",
    financialAssistanceLabel: "आर्थिक मदत:",
    keyBenefitsLabel: "मुख्य फायदे:",
    centralGovLabel: "केंद्र शासन",
    stateGovLabel: "राज्य शासन",
  },
  gu: {
    targetBeneficiaries: "લાભાર્થીઓ:",
    categoryLabel: "શ્રેણી:",
    adminLevelLabel: "વહીવટી સ્તર:",
    verifiedStatusLabel: "ચકાસણી સ્થિતિ:",
    financialAssistanceLabel: "નાણાકીય સહાય:",
    keyBenefitsLabel: "મુખ્ય લાભો:",
    centralGovLabel: "કેન્દ્ર સરકાર",
    stateGovLabel: "રાજ્ય સરકાર",
  },
  pa: {
    targetBeneficiaries: "ਲਾਭਪਾਤਰੀ:",
    categoryLabel: "ਸ਼੍ਰੇਣੀ:",
    adminLevelLabel: "ਪ੍ਰਸ਼ਾਸਕੀ ਪੱਧਰ:",
    verifiedStatusLabel: "ਤਸਦੀਕ ਸਥਿਤੀ:",
    financialAssistanceLabel: "ਵਿੱਤੀ ਸਹਾਇਤਾ:",
    keyBenefitsLabel: "ਮੁੱਖ ਲਾਭ:",
    centralGovLabel: "ਕੇਂਦਰ ਸਰਕਾਰ",
    stateGovLabel: "ਰਾਜ ਸਰਕਾਰ",
  },
  kn: {
    targetBeneficiaries: "ಫಲಾನುಭವಿಗಳು:",
    categoryLabel: "ವರ್ಗ:",
    adminLevelLabel: "ಆಡಳಿತ ಮಟ್ಟ:",
    verifiedStatusLabel: "ಪರಿಶೀಲನೆ ಸ್ಥಿತಿ:",
    financialAssistanceLabel: "ಆರ್ಥಿಕ ನೆರವು:",
    keyBenefitsLabel: "ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು:",
    centralGovLabel: "ಕೇಂದ್ರ ಸರ್ಕಾರ",
    stateGovLabel: "ರಾಜ್ಯ ಸರ್ಕಾರ",
  },
  ml: {
    targetBeneficiaries: "ഗുണഭോക്താക്കൾ:",
    categoryLabel: "വിഭാഗം:",
    adminLevelLabel: "ഭരണ തലം:",
    verifiedStatusLabel: "പരിശോധനാ നില:",
    financialAssistanceLabel: "ധനസഹായം:",
    keyBenefitsLabel: "പ്രധാന ആനുകൂല്യങ്ങൾ:",
    centralGovLabel: "കേന്ദ്ര സർക്കാർ",
    stateGovLabel: "സംസ്ഥാന സർക്കാർ",
  },
  or: {
    targetBeneficiaries: "ହିତାଧିକାରୀ:",
    categoryLabel: "ବିଭାଗ:",
    adminLevelLabel: "ପ୍ରଶାସନିକ ସ୍ତର:",
    verifiedStatusLabel: "ଯାଞ୍ଚ ସ୍ଥିତି:",
    financialAssistanceLabel: "ଆର୍ଥିକ ସହାୟତା:",
    keyBenefitsLabel: "ମୁଖ୍ୟ ସୁବିଧା:",
    centralGovLabel: "କେନ୍ଦ୍ର ସରକାର",
    stateGovLabel: "ରାଜ୍ୟ ସରକାର",
  },
  as: {
    targetBeneficiaries: "সুবিধাভোগী:",
    categoryLabel: "শ্ৰেণী:",
    adminLevelLabel: "প্ৰশাসনিক স্তৰ:",
    verifiedStatusLabel: "সত্যপন স্থিতি:",
    financialAssistanceLabel: "বিত্তীয় সাহায্য:",
    keyBenefitsLabel: "মূল সুবিধাসমূহ:",
    centralGovLabel: "কেন্দ্ৰীয় চৰকাৰ",
    stateGovLabel: "ৰাজ্য চৰকাৰ",
  },
  ur: {
    targetBeneficiaries: "مستفیدین:",
    categoryLabel: "زمرہ:",
    adminLevelLabel: "انتظامی سطح:",
    verifiedStatusLabel: "تصدیقی حیثیت:",
    financialAssistanceLabel: "مالی امداد:",
    keyBenefitsLabel: "اہم فوائد:",
    centralGovLabel: "مرکزی حکومت",
    stateGovLabel: "ریاستی حکومت",
  },
};

export function getLocalizedStrings(lang = "hi") {
  const base = LOCALIZED_STRINGS[lang] || LOCALIZED_STRINGS.hi;
  const labels = DEFAULT_LABELS[lang] || DEFAULT_LABELS.en;
  return {
    ...labels,
    ...base,
  };
}

// Scheme ID dictionary for quick natural language matching across 13 Indian languages
const SCHEME_KEYWORDS = {
  "pm-kisan": [
    "pm-kisan", "pm kisan", "kisan samman", "kisan nidhi", "pmkisan",
    "पीएम किसान", "किसान सम्मान निधि", "पीएम-किसान", "किसान निधि",
    "পিএম কিষাণ", "పీఎం కిసాన్", "பிஎம் கிசான்", "પીએમ કિસાન", "ਪੀਐਮ ਕਿਸਾਨ",
    "शेतकरी सन्मान", "किसान सन्मान निधी",
    "ಪಿಎಂ ಕಿಸಾನ್", "ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
    "പിഎം കിസാൻ", "കിസാൻ സമ്മാൻ നിധി",
    "ପିଏମ କିଷାନ", "କିଷାନ ସମ୍ମାନ ନିଧି",
    "পিএম কিষাণ",
    "پی ایم کسان", "کسان سمان ندھی",
    "6000", "₹6,000", "6 thousand", "छह हजार", "6 હજાર"
  ],
  "national-scholarship-portal": [
    "scholarship", "nsp", "national scholarship", "student scholarship", "college scholarship", "fellowship",
    "छात्रवृत्ति", "स्कॉलरशिप", "नेशनल स्कॉलरशिप", "विद्यार्थी", "स्कॉलरशिप पोर्टल",
    "স্কলারশিপ", "స్కాలర్‌షిప్", "கல்வி உதவித்தொகை", "સ્કોલરશીપ", "ਵਜ਼ੀਫ਼ਾ",
    "शिष्यवृत्ती", "विद्यार्थी शिष्यवृत्ती",
    "ವಿದ್ಯಾರ್ಥಿವೇತನ", "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ",
    "സ്കോളർഷിപ്പ്", "വിദ്യാഭ്യാസ സ്കോളർഷിപ്പ്",
    "ଛାତ୍ରବୃତ୍ତି", "ଜାତୀୟ ଛାତ୍ରବୃତ୍ତି",
    "ছাত্ৰবৃত্তি", "ৰাষ্ট্ৰীয় স্কলাৰশ্বিপ",
    "نیشنل اسکالرشپ", "طلباء کا وظیفہ"
  ],
  "pmay-gramin": [
    "pmay", "pmay-g", "awaas", "awas", "housing", "pucca house", "gramin awas", "indra awas",
    "प्रधानमंत्री आवास", "आवास योजना", "पीएमएवाई", "पक्का मकान", "घर निर्माण",
    "আবাস যোজনা", "ఆవాస్ యోజన", "வீட்டு வசதி", "આવાસ યોજના", "ਮਕਾਨ ਸਕੀਮ",
    "घरकुल योजना", "पक्के घर",
    "ಪ್ರಧಾನಮಂತ್ರಿ ಆವಾಸ್", "ಮನೆ ಯೋಜನೆ",
    "പ്രധാനമന്ത്രി ആവാസ്", "ഭവന നിർമ്മാണ പദ്ധതി",
    "ପ୍ରଧାନମନ୍ତ୍ରୀ ଆବାସ", "ଆବାସ ଯୋଜନା", "ପକ୍କା ଘର",
    "প্ৰধানমন্ত্ৰী আৱাস", "আৱাস যোজনা",
    "پی ایم آواس", "مکان سکیم"
  ],
  "mgnrega": [
    "mgnrega", "nrega", "100 days", "job card", "rural employment", "labour card", "majdoori",
    "मनरेगा", "नरेगा", "100 दिन", "जॉब कार्ड", "मजदूरी", "रोजगार गारंटी",
    "মনরেগা", "നരേഗ", "నరేగా", "மகாத்மா காந்தி வேலைவாய்ப்பு", "ਮਨਰੇਗਾ",
    "रोजगार हमी", "100 दिवस काम",
    "ಮನರೇಗಾ", "ಉದ್ಯೋಗ ಖಾತರಿ", "100 ದಿನಗಳ ಕೆಲಸ",
    "തൊഴിലുറപ്പ്", "100 ദിനം",
    "ମନରେଗା", "100 ଦିନ କାମ",
    "মনৰেগা", "100 দিনৰ কাম",
    "منریگا", "100 دن کام", "جاب کارڈ"
  ],
  "ayushman-bharat-pmjay": [
    "ayushman", "pmjay", "pm-jay", "health card", "5 lakh", "free treatment", "golden card",
    "आयुष्मान", "आयुष्मान भारत", "पीएमजेएवाई", "गोल्डन कार्ड", "5 लाख", "मुफ्त इलाज", "स्वास्थ्य कार्ड",
    "আয়ুষ্মান ভারত", "ஆயுஷ்மான் பாரத்", "આયુષ્માન ભારત", "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ",
    "आरोग्य कार्ड", "पाच लाख",
    "ಆಯುಷ್ಮಾನ್ ಭಾರತ್", "ಆರೋಗ್ಯ ಕಾರ್ಡ್", "5 ಲಕ್ಷ",
    "ആയുഷ്മാൻ ഭാരത്", "ആരോഗ്യ കാർഡ്", "5 ലക്ഷം",
    "ଆୟୁଷ୍ମାନ ଭାରତ", "ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ", "5 ଲକ୍ଷ",
    "আয়ুষ্মান ভাৰত", "স্বাস্থ্য কাৰ্ড",
    "آیوشمان بھارت", "صحت کارڈ", "5 لاکھ"
  ],
  "pmkvy": [
    "pmkvy", "skill", "kaushal vikas", "pradhan mantri kaushal", "training certificate",
    "कौशल विकास", "पीएमकेवीवाई", "ट्रेनिंग", "हुनर", "कौशल",
    "দক্ষতা উন্নয়ন", "నైపుణ్యాభివృద్ధి", "திறன் மேம்பாடு", "કૌશલ્ય વિકાસ", "ਹੁਨਰ ਵਿਕਾਸ"
  ],
  "pm-svanidhi": [
    "svanidhi", "pm svanidhi", "street vendor", "vendor loan", "thela", "rehri", "10000",
    "स्वनिधि", "पीएम स्वनिधि", "स्ट्रीट वेंडर", "ठेला", "रेहड़ी", "पटरी",
    "স্বনিধি", "స్వనిధి", "ஸ்வநிதி", "સ્વનિધિ", "ਸਵਨਿਧੀ"
  ],
  "mudra": [
    "mudra", "mudra loan", "shishu", "kishore", "tarun", "small business loan", "msme loan",
    "मुद्रा", "मुद्रा लोन", "शिशु लोन", "व्यापार लोन", "ऋण",
    "মুদ্রা লোন", "ముద్రా రుణం", "முத்ரா கடன்", "મુદ્રા લોન", "ਮੁਦਰਾ ਲੋਨ",
    "मुद्रा कर्ज", "मुद्रा योजना",
    "ಮುದ್ರಾ ಸಾಲ", "മുദ്ര വായ്പ", "ମୁଦ୍ରା ଋଣ", "মুদ্ৰা ঋণ", "مدرا قرض"
  ],
  "nsap": [
    "nsap", "pension", "old age pension", "widow pension", "disability pension", "vridha", "divyang",
    "पेंशन", "वृद्धावस्था पेंशन", "विधवा पेंशन", "दिव्यांग पेंशन", "एनएसएपी",
    "পেনশন", "పింఛను", "ஓய்வூதியம்", "પેન્શન", "ਪੈਨਸ਼ਨ",
    "वृद्धापकाळ पेन्शन", "विधवा पेन्शन",
    "ವೃದ್ಧಾಪ್ಯ ಪಿಂಚಣಿ", "ವಿಧವಾ ಪಿಂಚಣಿ",
    "വാർദ്ധക്യ പെൻഷൻ", "വിധവാ പെൻഷൻ",
    "ବୃଦ୍ଧାବସ୍ଥା ପେନସନ", "ବିଧବା ପେନସନ",
    "বয়োজ্যেষ্ঠ পেঞ্চন", "بزرگوں کی پنشن", "بیوہ پنشن"
  ],
  "stand-up-india": [
    "stand up", "standup", "stand-up india", "sc st women loan", "women entrepreneur",
    "स्टैंड अप इंडिया", "महिला उद्यमी", "एससी एसटी लोन",
    "স্ট্যান্ড আপ ইন্ডিয়া", "స్టాండ్ అప్ ఇండియా", "ஸ்டாண்ட் அப் இந்தியா", "સ્ટેન્ડ અપ ઇન્ડિયા"
  ],
  "sukanya-samriddhi": [
    "sukanya", "sukanya samriddhi", "ssa", "girl child", "beti", "daughter savings", "post office",
    "सुकन्या", "सुकन्या समृद्धि", "बेटी", "बालिका", "डाकघर बचत",
    "সুকন্যা সমৃদ্ধি", "సుకన్య సమృద్ధి", "சுகன்யா சம்ரிதி", "સુકન્યા સમૃદ્ધિ", "ਸੁਕੰਨਿਆ ਸਮ੍ਰਿਧੀ",
    "सुकन्या समृद्धी", "ಮುಲಿಂಚಿ ಯೋಜನೆ", "ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ", "സുകന്യ സമൃദ്ധി", "ସୁକନ୍ୟା ସମୃଦ୍ଧି", "سکنیا سمردھی"
  ],
  "pm-jay-jan-aushadhi": [
    "jan aushadhi", "pmbjp", "generic medicine", "cheap medicines", "medical store",
    "जन औषधि", "सस्ती दवाइयां", "जेनेरिक दवा", "दवा केंद्र",
    "জন ঔষধি", "జన ఔషధి", "ஜன் ஔஷதி", "જન ઔષધિ", "ਜਨ ਔਸ਼ਧੀ"
  ],
};

/**
 * Check if the input contains navigation intent across 13 languages
 */
function detectNavigationIntent(normalizedQuery) {
  const q = normalizedQuery;

  // Schemes List / Explore
  if (
    q.includes("explore") || q.includes("all scheme") || q.includes("योजनाएं") || q.includes("योजना सूची") ||
    q.includes("పథకాలు") || q.includes("প্রকল্প") || q.includes("திட்டங்கள்") || q.includes("योजनांची यादी") ||
    q.includes("યોજનાઓ") || q.includes("ਸਕੀਮਾਂ") || q.includes("ಸ್ಕೀಮ್‌ಗಳು") || q.includes("പദ്ധതികൾ") ||
    q.includes("ଯୋଜନା") || q.includes("আঁচনি") || q.includes("اسکیمیں")
  ) {
    return { type: "NAVIGATE", route: "/schemes", key: "navSchemes" };
  }

  // Eligibility Checker
  if (
    q.includes("eligibility") || q.includes("checker") || q.includes("check eligibility") ||
    q.includes("पात्रता") || q.includes("पात्रता जांच") || q.includes("যোগ্যতা") ||
    q.includes("అర్హత") || q.includes("தகுதி") || q.includes("पात्रता तपासणी") ||
    q.includes("યોગ્યતા") || q.includes("ਯੋਗਤਾ ਜਾਂਚ") || q.includes("ಅರ್ಹತೆ ಪರಿಶೀಲನೆ") ||
    q.includes("യോഗ്യതാ പരിശോധന") || q.includes("ଯୋଗ୍ୟତା ଯାଞ୍ଚ") || q.includes("اہلیت جانچ")
  ) {
    return { type: "NAVIGATE", route: "/eligibility", key: "navEligibility" };
  }

  // Compare Schemes
  if (
    q.includes("compare") || q.includes("तुलना") || q.includes("তুলনা") || q.includes("ஒப்பீடு") ||
    q.includes("పోలిక") || q.includes("तुलना करा") || q.includes("સરખામણી") || q.includes("ਤੁਲਨਾ") ||
    q.includes("ಹೋಲಿಕೆ") || q.includes("താരതമ്യം") || q.includes("ତୁଳନା") || q.includes("موازنہ")
  ) {
    return { type: "NAVIGATE", route: "/compare", key: "navCompare" };
  }

  // Documents Checklist
  if (
    q.includes("document") || q.includes("checklist") || q.includes("दस्तावेज़ सूची") ||
    q.includes("দস্তাवेज़") || q.includes("নথিপত্র তালিকা") || q.includes("சான்றிதழ் பட்டியல்") ||
    q.includes("పత్రాల జాబితా") || q.includes("कागदपत्रे यादी") || q.includes("દસ્તાવેજ યાદી") ||
    q.includes("ਦਸਤਾਵੇਜ਼ ਸੂਚੀ") || q.includes("ದಾಖಲೆಗಳ ಪಟ್ಟಿ") || q.includes("രേഖകളുടെ പട്ടിക") ||
    q.includes("ଦସ୍ତାବେଜ ତାଲିକା") || q.includes("دستاویزات کی فہرست")
  ) {
    return { type: "NAVIGATE", route: "/documents", key: "navDocuments" };
  }

  // Dashboard
  if (
    q.includes("dashboard") || q.includes("my schemes") || q.includes("saved") ||
    q.includes("डैशबोर्ड") || q.includes("నా పథకాలు") || q.includes("சேமிக்கப்பட்டவை") ||
    q.includes("माझे डॅशबोर्ड") || q.includes("ਮੇਰਾ ਡੈਸ਼ਬੋਰਡ") || q.includes("ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್") ||
    q.includes("എന്റെ ഡാഷ്‌ബോർഡ്") || q.includes("ଡ୍ୟାସବୋର୍ଡ") || q.includes("میرا ڈیش بورڈ")
  ) {
    return { type: "NAVIGATE", route: "/dashboard", key: "navDashboard" };
  }

  return null;
}

/**
 * Detect which scheme is directly mentioned in the user query
 */
function detectSpecificScheme(normalizedQuery) {
  for (const [schemeId, keywords] of Object.entries(SCHEME_KEYWORDS)) {
    for (const kw of keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        return schemeId;
      }
    }
  }
  return null;
}

/**
 * Detect category intent (farming, education, women, health, etc.)
 * Uses inflected root stems across all 13 Indian languages
 */
function detectCategoryIntent(normalizedQuery) {
  const q = normalizedQuery;

  // Farmers / Agriculture (covers singular, plural, and oblique case markers in 13 languages)
  if (
    q.includes("farmer") || q.includes("kisan") || q.includes("farming") || q.includes("agriculture") || q.includes("crop") ||
    q.includes("किसान") || q.includes("खेती") || q.includes("फसल") || q.includes("कृषि") ||
    q.includes("কৃষক") || q.includes("কৃষি") || q.includes("চাষ") || q.includes("খেতি") ||
    q.includes("రైతు") || q.includes("వ్యవసాయ") ||
    q.includes("விவசாய") || q.includes("பயிர்") || q.includes("வேளாண்") ||
    q.includes("शेतक") || q.includes("शेती") || q.includes("पीक") ||
    q.includes("ખેડૂત") || q.includes("ખેતી") || q.includes("પાક") ||
    q.includes("ਕਿਸਾਨ") || q.includes("ਖੇਤੀ") || q.includes("ਫ਼ਸਲ") ||
    q.includes("ರೈತ") || q.includes("ಕೃಷಿ") || q.includes("ಬೆಳೆ") ||
    q.includes("കർഷക") || q.includes("കൃഷി") || q.includes("വിള") ||
    q.includes("କୃଷକ") || q.includes("ଚାଷ") ||
    q.includes("کسان") || q.includes("زراعت") || q.includes("کھیتی")
  ) {
    return "agriculture";
  }

  // Students / Education / Scholarships
  if (
    q.includes("student") || q.includes("scholarship") || q.includes("college") || q.includes("school") || q.includes("study") || q.includes("education") ||
    q.includes("छात्र") || q.includes("छात्रवृत्ति") || q.includes("पढ़ाई") || q.includes("कॉलेज") || q.includes("स्कूल") || q.includes("शिक्षा") ||
    q.includes("ছাত্র") || q.includes("বৃত্তি") || q.includes("শিক্ষা") || q.includes("ছাত্ৰ") || q.includes("স্কলাৰশ্বিপ") ||
    q.includes("విద్యార్థి") || q.includes("స్కాలర్‌షిప్") || q.includes("చదువు") || q.includes("విద్య") ||
    q.includes("மாணவர்") || q.includes("கல்வி") || q.includes("உதவித்தொகை") || q.includes("பள்ளி") ||
    q.includes("विद्यार्थी") || q.includes("शिष्यवृत्ती") || q.includes("शिक्षण") ||
    q.includes("વિદ્યાર્થી") || q.includes("શિષ્યવૃત્તિ") || q.includes("અભ્યાસ") ||
    q.includes("ਵਿਦਿਆਰਥੀ") || q.includes("ਵਜ਼ੀਫ਼ਾ") || q.includes("ਪੜ੍ਹਾਈ") ||
    q.includes("ವಿದ್ಯಾರ್ಥಿ") || q.includes("ವಿದ್ಯಾರ್ಥಿವೇತನ") || q.includes("ಶಿಕ್ಷಣ") ||
    q.includes("വിദ്യാർത്ഥി") || q.includes("സ്കോളർഷിപ്പ്") || q.includes("പഠനം") ||
    q.includes("ଛାତ୍ର") || q.includes("ବୃତ୍ତି") || q.includes("ଶିକ୍ଷା") ||
    q.includes("طالب علم") || q.includes("وظیفہ") || q.includes("تعلیم")
  ) {
    return "education";
  }

  // Women / Daughters / Girl child / Maternity
  if (
    q.includes("women") || q.includes("woman") || q.includes("girl") || q.includes("daughter") || q.includes("female") || q.includes("maternity") ||
    q.includes("महिला") || q.includes("बेटी") || q.includes("लड़की") || q.includes("औरत") || q.includes("माता") || q.includes("कन्या") ||
    q.includes("মহিলা") || q.includes("মেয়ে") || q.includes("কন্যা") || q.includes("নারী") || q.includes("ছোৱালী") ||
    q.includes("మహిళ") || q.includes("స్త్రీ") || q.includes("కూతురు") || q.includes("అమ్మాయి") ||
    q.includes("பெண்கள்") || q.includes("பெண்") || q.includes("மகள்") || q.includes("தாய்") ||
    q.includes("स्त्री") || q.includes("मुलगी") || q.includes("लेक") ||
    q.includes("દીકરી") || q.includes("કન્યા") ||
    q.includes("ਔਰਤ") || q.includes("ਧੀ") || q.includes("ਕੁੜੀ") ||
    q.includes("ಮಹಿಳೆ") || q.includes("ಹೆಣ್ಣು") || q.includes("ಮಗಳು") ||
    q.includes("വനിത") || q.includes("പെൺകുട്ടി") ||
    q.includes("ଝିଅ") ||
    q.includes("خواتین") || q.includes("عورت") || q.includes("بیٹی") || q.includes("بچی")
  ) {
    return "women";
  }

  // Health / Medical / Treatment / Medicine
  if (
    q.includes("health") || q.includes("medical") || q.includes("hospital") || q.includes("treatment") || q.includes("medicine") || q.includes("disease") ||
    q.includes("स्वास्थ्य") || q.includes("इलाज") || q.includes("अस्पताल") || q.includes("दवा") || q.includes("बीमारी") || q.includes("चिकित्सा") ||
    q.includes("স্বাস্থ্য") || q.includes("চিকিৎসা") || q.includes("হাসপাতাল") || q.includes("ওষুধ") || q.includes("হাস্পতাল") || q.includes("ঔষধ") ||
    q.includes("ఆరోగ్య") || q.includes("వైద్య") || q.includes("ఆసుపత్రి") || q.includes("మందులు") ||
    q.includes("மருத்துவ") || q.includes("சுகாதார") || q.includes("மருத்துவமனை") || q.includes("மருந்து") ||
    q.includes("आरोग्य") || q.includes("उपचार") || q.includes("दवाखाना") || q.includes("औषध") ||
    q.includes("આરોગ્ય") || q.includes("સારવાર") || q.includes("હોસ્પિટલ") ||
    q.includes("ਸਿਹਤ") || q.includes("ਦਵਾਈ") ||
    q.includes("ಆರೋಗ್ಯ") || q.includes("ಚಿಕಿತ್ಸೆ") || q.includes("ಆಸ್ಪತ್ರೆ") || q.includes("ಔಷಧಿ") ||
    q.includes("ആരോഗ്യ") || q.includes("ചികിത്സ") || q.includes("ആശുപത്രി") || q.includes("മരുന്ന്") ||
    q.includes("ସ୍ୱାସ୍ଥ୍ୟ") || q.includes("ଡାକ୍ତରଖାନା") || q.includes("ଔଷଧ") ||
    q.includes("صحت") || q.includes("علاج") || q.includes("ہسپتال")
  ) {
    return "health";
  }

  // Housing / PMAY / Shelter
  if (
    q.includes("house") || q.includes("housing") || q.includes("home") || q.includes("pucca") || q.includes("shelter") ||
    q.includes("आवास") || q.includes("घर") || q.includes("मकान") || q.includes("छत") ||
    q.includes("বাড়ি") || q.includes("গৃহ") || q.includes("আবাসন") || q.includes("ঘৰ") || q.includes("আৱাস") ||
    q.includes("ఇల్లు") || q.includes("గృహ") || q.includes("నివాసం") ||
    q.includes("வீடு") || q.includes("குடியிருப்பு") ||
    q.includes("घरकुल") ||
    q.includes("ਘਰ") || q.includes("ਰਿਹਾਇਸ਼") ||
    q.includes("ಮನೆ") || q.includes("ವಸತಿ") ||
    q.includes("ഭവനം") || q.includes("പാർപ്പിടം") ||
    q.includes("ବାସଗୃହ") ||
    q.includes("مکان") || q.includes("رہائش")
  ) {
    return "housing";
  }

  // Employment / Jobs / Skills / Labour
  if (
    q.includes("job") || q.includes("employment") || q.includes("work") || q.includes("skill") || q.includes("labour") || q.includes("wages") ||
    q.includes("रोजगार") || q.includes("काम") || q.includes("नौकरी") || q.includes("मजदूरी") || q.includes("कौशल") ||
    q.includes("চাকরি") || q.includes("কর্মসংস্থান") || q.includes("কাজ") || q.includes("মজুরি") || q.includes("চাকৰি") ||
    q.includes("ఉపాధి") || q.includes("ఉద్యోగం") || q.includes("పని") || q.includes("నైపుణ్యం") || q.includes("కూలీ") ||
    q.includes("வேலை") || q.includes("வேலைவாய்ப்பு") || q.includes("திறன்") || q.includes("கூலி") ||
    q.includes("नोकरी") || q.includes("कौशल्य") || q.includes("मजुरी") ||
    q.includes("રોજગાર") || q.includes("કૌશલ્ય") || q.includes("મજૂરી") ||
    q.includes("ਰੁਜ਼ਗਾਰ") || q.includes("ਹੁਨਰ") || q.includes("ਮਜ਼ਦੂਰੀ") ||
    q.includes("ಉದ್ಯೋಗ") || q.includes("ಕೆಲಸ") || q.includes("ಕೌಶಲ್ಯ") ||
    q.includes("തൊഴിൽ") || q.includes("ജോലി") ||
    q.includes("ନିଯୁକ୍ତି") || q.includes("ଦକ୍ଷତା") || q.includes("ମଜୁରି") ||
    q.includes("ملازمت") || q.includes("نوکری") || q.includes("روزگار") || q.includes("مہارت")
  ) {
    return "employment";
  }

  // Business / Loan / Vendor / MSME
  if (
    q.includes("business") || q.includes("loan") || q.includes("credit") || q.includes("vendor") || q.includes("shop") || q.includes("startup") ||
    q.includes("व्यापार") || q.includes("व्यवसाय") || q.includes("लोन") || q.includes("कर्ज") || q.includes("दुकान") || q.includes("ऋण") ||
    q.includes("ব্যবসা") || q.includes("ঋণ") || q.includes("দোকান") || q.includes("ব্যৱসায়") ||
    q.includes("వ్యాపారం") || q.includes("రుణం") || q.includes("దుకాణం") ||
    q.includes("தொழில்") || q.includes("கடன்") || q.includes("வியாபாரம்") ||
    q.includes("उद्योग") ||
    q.includes("ધંધો") || q.includes("વેપાર") || q.includes("ધિરાણ") ||
    q.includes("ਵਪਾਰ") || q.includes("ਕਰਜ਼ਾ") ||
    q.includes("ಸಾಲ") || q.includes("ಉದ್ಯಮ") ||
    q.includes("ബിസിനസ്") || q.includes("വായ്പ") ||
    q.includes("ବ୍ୟବସାୟ") || q.includes("ଋଣ") ||
    q.includes("کاروبار") || q.includes("قرض")
  ) {
    return "business";
  }

  // Pension / Elderly / Disability
  if (
    q.includes("pension") || q.includes("elderly") || q.includes("old age") || q.includes("widow") || q.includes("disabled") ||
    q.includes("पेंशन") || q.includes("बुजुर्ग") || q.includes("वृद्धा") || q.includes("विधवा") || q.includes("दिव्यांग") ||
    q.includes("পেনশন") || q.includes("বয়স্ক") || q.includes("প্রতিবন্ধী") || q.includes("পেঞ্চন") || q.includes("বয়োজ্যেষ্ঠ") ||
    q.includes("పింఛను") || q.includes("వృద్ధులు") || q.includes("వితంతు") || q.includes("దివ్యాంగులు") ||
    q.includes("ஓய்வூதியம்") || q.includes("முதியோர்") || q.includes("விதவை") || q.includes("மாற்றுத்திறனாளி") ||
    q.includes("पेन्शन") || q.includes("निवृत्तीवेतन") || q.includes("वृद्ध") ||
    q.includes("વૃદ્ધ") ||
    q.includes("ਬਜ਼ੁਰਗ") || q.includes("ਦਿਵਿਆਂਗ") ||
    q.includes("ಪಿಂಚಣಿ") || q.includes("ವೃದ್ಧಾಪ್ಯ") || q.includes("ವಿಧವೆ") || q.includes("ಅಂಗವಿಕಲ") ||
    q.includes("പെൻഷൻ") || q.includes("വാർദ്ധക്യം") || q.includes("ഭിന്നശേഷಿ") ||
    q.includes("ପେନସନ") || q.includes("ବୃଦ୍ଧ") || q.includes("ବିଧବା") ||
    q.includes("پنشن") || q.includes("بزرگ") || q.includes("بیوہ") || q.includes("معذور")
  ) {
    return "pension";
  }

  return null;
}

/**
 * Detect sub-intent (eligibility, benefits, documents, how to apply) across 13 languages
 */
function detectSubIntent(normalizedQuery) {
  const q = normalizedQuery;

  // Documents
  if (
    q.includes("document") || q.includes("paper") || q.includes("certificate") || q.includes("proof") ||
    q.includes("दस्तावेज़") || q.includes("कागजात") || q.includes("प्रमाण पत्र") || q.includes("आधार") ||
    q.includes("নথিপত্র") || q.includes("কাগজ") || q.includes("নথি-পত্ৰ") ||
    q.includes("పత్రాలు") || q.includes("సర్టిఫికేట్") ||
    q.includes("ஆவணங்கள்") || q.includes("சான்றிதழ்") ||
    q.includes("कागदपत्रे") || q.includes("दाखला") ||
    q.includes("દસ્તાવેજ") || q.includes("કાગળ") ||
    q.includes("ਦਸਤਾਵੇਜ਼") || q.includes("ਸਬੂਤ") ||
    q.includes("ದಾಖಲೆ") || q.includes("ದಾಖಲಾತಿ") ||
    q.includes("രേഖകൾ") ||
    q.includes("ଦଲିଲ") || q.includes("କାଗଜପତ୍ର") || q.includes("ଦସ୍ତାବେଜ") ||
    q.includes("دستاویزات") || q.includes("ثبوت")
  ) {
    return "DOCUMENTS";
  }

  // How to apply / Process
  if (
    q.includes("apply") || q.includes("application") || q.includes("register") || q.includes("process") || q.includes("steps") || q.includes("where to go") ||
    q.includes("आवेदन") || q.includes("फॉर्म") || q.includes("रजिस्ट्रेशन") || q.includes("कैसे भरें") || q.includes("कहाँ जाएं") ||
    q.includes("আবেদন") || q.includes("পদ্ধতি") || q.includes("কীভাবে") ||
    q.includes("దరఖాస్తు") || q.includes("ఎలా") ||
    q.includes("விண்ணப்ப") || q.includes("பதிவு") || q.includes("எப்படி") ||
    q.includes("अर्ज") || q.includes("नोंदणी") ||
    q.includes("અરજી") || q.includes("નોંધણી") ||
    q.includes("ਅਰਜ਼ੀ") || q.includes("ਰਜਿਸਟ੍ਰੇਸ਼ਨ") ||
    q.includes("ಅರ್ಜಿ") || q.includes("ನೋಂದಣಿ") ||
    q.includes("അപേക്ഷ") ||
    q.includes("ଆବେଦନ") || q.includes("ପଞ୍ଜୀକରଣ") ||
    q.includes("درخواست") || q.includes("رجسٹریشن")
  ) {
    return "HOW_TO_APPLY";
  }

  // Benefits / Money / Amount
  if (
    q.includes("benefit") || q.includes("money") || q.includes("amount") || q.includes("rupee") || q.includes("financial") || q.includes("paisa") ||
    q.includes("लाभ") || q.includes("पैसा") || q.includes("रुपये") || q.includes("राशि") || q.includes("सहायता राशि") || q.includes("कितना मिलता") ||
    q.includes("সুবিধা") || q.includes("টাকা") || q.includes("সাহায্য") ||
    q.includes("ప్రయోజనం") || q.includes("డబ్బు") || q.includes("సహాయం") ||
    q.includes("நன்மை") || q.includes("பணம்") || q.includes("உதவித்தொகை") ||
    q.includes("फायदे") || q.includes("रक्कम") || q.includes("मदत") ||
    q.includes("સહાય") || q.includes("રૂપિયા") ||
    q.includes("ਸਹਾਇਤਾ") ||
    q.includes("ಪ್ರಯೋಜನ") || q.includes("ಹಣ") || q.includes("ಮೊತ್ತ") ||
    q.includes("ആനുകൂല്യം") ||
    q.includes("ଟଙ୍କା") || q.includes("ସହାୟତା") ||
    q.includes("টকা") ||
    q.includes("فائدہ") || q.includes("امداد")
  ) {
    return "BENEFITS";
  }

  // Eligibility
  if (
    q.includes("eligible") || q.includes("eligibility") || q.includes("qualify") || q.includes("who can") || q.includes("criteria") ||
    q.includes("पात्र") || q.includes("पात्रता") || q.includes("किसे मिलेगा") || q.includes("नियम") || q.includes("शर्तें") ||
    q.includes("যোগ্যতা") || q.includes("শর্তাবলী") ||
    q.includes("అర్హత") || q.includes("నిబంధనలు") ||
    q.includes("தகுதி") || q.includes("விதிகள்") ||
    q.includes("अटी") ||
    q.includes("શરતો") ||
    q.includes("ਯੋਗਤਾ") || q.includes("ਸ਼ਰਤਾਂ") ||
    q.includes("ಅರ್ಹತೆ") || q.includes("ನಿಯಮಗಳು") ||
    q.includes("അർഹത") ||
    q.includes("ଯୋଗ୍ୟତା") ||
    q.includes("اہلیت") || q.includes("شرائط")
  ) {
    return "ELIGIBILITY";
  }

  return "OVERVIEW";
}

// Localized prompt suggestion chips for all 13 supported languages
const LOCALIZED_SUGGESTIONS = {
  greetings: {
    hi: ["किसानों के लिए योजनाएं", "छात्रवृत्ति कैसे मिलेगी?", "पीएम-किसान में कितना पैसा मिलता है?"],
    en: ["Schemes for farmers", "Scholarships for students", "PM-KISAN benefits"],
    bn: ["কৃষকদের জন্য প্রকল্প", "ছাত্রবৃত্তি কিভাবে পাব?", "পিএম কিষাণ অনুদান"],
    te: ["రైతులకు పథకాలు", "స్కాలర్‌షిప్ ఎలా పొందాలి?", "పీఎం కిసాన్ నిధులు"],
    ta: ["விவசாயிகளுக்கான திட்டங்கள்", "கல்வி உதவித்தொகை எப்படி பெறுவது?", "பிஎம் கிசான் உதவித்தொகை"],
    mr: ["शेतकऱ्यांसाठी योजना", "शिष्यवृत्ती कशी मिळेल?", "पीएम-किसान निधी"],
    gu: ["ખેડૂતો માટે યોજનાઓ", "સ્કોલરશીપ કેવી રીતે મળે?", "પીએમ કિસાન સહાય"],
    pa: ["ਕਿਸਾਨਾਂ ਲਈ ਸਕੀਮਾਂ", "ਵਜ਼ੀਫ਼ਾ ਕਿਵੇਂ ਮਿਲੇਗਾ?", "ਪੀਐਮ ਕਿਸਾਨ ਸਹਾਇਤਾ"],
    kn: ["ರೈತರಿಗಾಗಿ ಯೋಜನೆಗಳು", "ವಿದ್ಯಾರ್ಥಿವೇತನ ಹೇಗೆ ಪಡೆಯುವುದು?", "ಪಿಎಂ ಕಿಸಾನ್ ನೆರವು"],
    ml: ["കർഷകർക്കുള്ള പദ്ധതികൾ", "സ്കോളർഷിപ്പ് എങ്ങനെ ലഭിക്കും?", "പിഎം കിസാൻ ആനുകൂല്യം"],
    or: ["କୃଷକମାନଙ୍କ ପାଇଁ ଯୋଜନା", "ଛାତ୍ରବୃତ୍ତି କିପରି ମିଳିବ?", "ପିଏମ କିଷାନ ସହାୟତା"],
    as: ["কৃষকৰ বাবে আঁচনি", "স্কলাৰশ্বিপ কেনেকৈ পাব?", "পিএম কিষাণ সাহায্য"],
    ur: ["کسانوں کے لیے اسکیمیں", "وظیفہ کیسے ملے گا؟", "پی ایم کسان کی رقم"],
  },
  navigation: {
    hi: ["पात्रता जांचें", "दस्तावेज़ सूची", "सभी योजनाएं खोजें"],
    en: ["Check Eligibility", "Documents Checklist", "Explore Schemes"],
    bn: ["যোগ্যতা যাচাই", "নথিপত্র তালিকা", "সকল প্রকল্প"],
    te: ["అర్హత తనిఖీ", "పత్రాల జాబితా", "అన్ని పథకాలు"],
    ta: ["தகுதி சரிபார்ப்பு", "ஆவணங்கள் பட்டியல்", "அனைத்து திட்டங்கள்"],
    mr: ["पात्रता तपासा", "कागदपत्रे यादी", "सर्व योजना शोधा"],
    gu: ["પાત્રતા ચકાસો", "દસ્તાવેજ યાદી", "બધી યોજનાઓ"],
    pa: ["ਯੋਗਤਾ ਦੀ ਜਾਂਚ", "ਦਸਤਾਵੇਜ਼ ਸੂਚੀ", "ਸਾਰੀਆਂ ਸਕੀਮਾਂ"],
    kn: ["ಅರ್ಹತೆ ಪರೀಕ್ಷೆ", "ದಾಖಲೆಗಳ ಪಟ್ಟಿ", "ಎಲ್ಲಾ ಯೋಜನೆಗಳು"],
    ml: ["യോഗ്യതാ പരിശോധന", "രേഖകളുടെ പട്ടിക", "എല്ലാ പദ്ധതികളും"],
    or: ["ଯୋଗ୍ୟତା ଯାଞ୍ଚ", "ଦସ୍ତାବେଜ ତାଲିକା", "ସମସ୍ତ ଯୋଜନା"],
    as: ["যোগ্যতা পৰীক্ষা", "নথি-পত্ৰ তালিকা", "সকলো আঁচনি"],
    ur: ["اہلیت جانچیں", "دستاویزات کی فہرست", "تمام اسکیمیں"],
  },
  agriculture: {
    hi: ["पीएम-किसान में कितना पैसा मिलता है?", "पीएम-किसान के दस्तावेज"],
    en: ["PM-KISAN benefits amount", "PM-KISAN documents"],
    bn: ["পিএম কিষাণে কত টাকা পাওয়া যায়?", "পিএম কিষাণ নথিপত্র"],
    te: ["పీఎం కిసాన్ ఎంత డబ్బు ఇస్తారు?", "పీఎం కిసాన్ పత్రాలు"],
    ta: ["பிஎம் கிசான் நிதி உதவி எவ்வளவு?", "பிஎம் கிசான் ஆவணங்கள்"],
    mr: ["पीएम-किसान योजनेत किती पैसे मिळतात?", "पीएम-किसान कागदपत्रे"],
    gu: ["પીએમ કિસાનમાં કેટલા પૈસા મળે છે?", "પીએમ કિસાન દસ્તાવેજો"],
    pa: ["ਪੀਐਮ ਕਿਸਾਨ ਦੇ ਕਿੰਨੇ ਪੈਸੇ ਮਿਲਦੇ ਹਨ?", "ਪੀਐਮ ਕਿਸਾਨ ਦਸਤਾਵੇਜ਼"],
    kn: ["ಪಿಎಂ ಕಿಸಾನ್‌ನಲ್ಲಿ ಎಷ್ಟು ಹಣ ಸಿಗುತ್ತದೆ?", "ಪಿಎಂ ಕಿಸಾನ್ ದಾಖಲೆಗಳು"],
    ml: ["പിഎം കിസാനിൽ എത്ര തുക ലഭിക്കും?", "പിഎം കിസാൻ രേഖകൾ"],
    or: ["ପିଏମ କିଷାନରେ କେତେ ଟଙ୍କା ମିଳେ?", "ପିଏମ କିଷାନ ଦଲିଲ"],
    as: ["পিএম কিষাণত কিমান টকা পায়?", "পিএম কিষাণৰ নথি-পত্ৰ"],
    ur: ["پی ایم کسان میں کتنے پیسے ملتے ہیں؟", "پی ایم کسان کے دستاویزات"],
  },
  education: {
    hi: ["स्कॉलरशिप के लिए पात्रता क्या है?", "स्कॉलरशिप के दस्तावेज"],
    en: ["Scholarship eligibility", "Scholarship documents"],
    bn: ["স্কলারশিপের যোগ্যতা কি?", "স্কলারশিপের নথিপত্র"],
    te: ["స్కాలర్‌షిప్ అర్హత ఏమిటి?", "స్కాలర్‌షిప్ పత్రాలు"],
    ta: ["கல்வி உதவித்தொகை தகுதி என்ன?", "உதவித்தொகை ஆவணங்கள்"],
    mr: ["शिष्यवृत्तीसाठी पात्रता काय आहे?", "शिष्यवृत्ती कागदपत्रे"],
    gu: ["સ્કોલરશીપ માટે પાત્રતા શું છે?", "સ્કોલરશીપ દસ્તાવેજો"],
    pa: ["ਵਜ਼ੀਫ਼ੇ ਲਈ ਯੋਗਤਾ ਕੀ ਹੈ?", "ਵਜ਼ੀਫ਼ਾ ਦਸਤਾਵੇਜ਼"],
    kn: ["ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಹತೆ ಏನು?", "ವಿದ್ಯಾರ್ಥಿವೇತನ ದಾಖಲೆಗಳು"],
    ml: ["സ്കോളർഷിപ്പിനുള്ള യോഗ്യത എന്താണ്?", "സ്കോളർഷിപ്പ് രേഖകൾ"],
    or: ["ଛାତ୍ରବୃତ୍ତି ପାଇଁ ଯୋଗ୍ୟତା କଣ?", "ଛାତ୍ରବୃତ୍ତି କାଗଜପତ୍ର"],
    as: ["স্কলাৰশ্বিপৰ যোগ্যতা কি?", "স্কলাৰশ্বিপৰ নথি-পত্ৰ"],
    ur: ["وظیفے کی اہلیت کیا ہے؟", "وظیفے کے دستاویزات"],
  },
  women: {
    hi: ["सुकन्या समृद्धि के लाभ", "स्टैंड-अप इंडिया लोन"],
    en: ["Sukanya Samriddhi benefits", "Stand-Up India loan"],
    bn: ["সুকন্যা সমৃদ্ধি প্রকল্পের সুবিধা", "স্ট্যান্ড-আপ ইন্ডিয়া লোন"],
    te: ["సుకన్య సమృద్ధి ప్రయోజనాలు", "స్టాండ్-అప్ ఇండియా రుణం"],
    ta: ["சுகன்யா சம்ரிதி நன்மைகள்", "ஸ்டாண்ட் அப் இந்தியா கடன்"],
    mr: ["सुकन्या समृद्धी योजनेचे लाभ", "स्टँड-अप इंडिया कर्ज"],
    gu: ["સુકન્યા સમૃદ્ધિના લાભો", "સ્ટેન્ડ-અપ ઇન્ડિયા લોન"],
    pa: ["ਸੁਕੰਨਿਆ ਸਮ੍ਰਿਧੀ ਦੇ ਲਾਭ", "ਸਟੈਂਡ-ਅੱਪ ਇੰਡੀਆ ਕਰਜ਼ਾ"],
    kn: ["ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಪ್ರಯೋಜನಗಳು", "ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ಇಂಡಿಯಾ ಸಾಲ"],
    ml: ["സുകന്യ സമൃദ്ധി ആനുകൂല്യങ്ങൾ", "സ്റ്റാൻഡ്-അപ്പ് ഇന്ത്യ വായ്പ"],
    or: ["ସୁକନ୍ୟା ସମୃଦ୍ଧିର ଲାଭ", "ଷ୍ଟାଣ୍ଡ-ଅପ୍ ଇଣ୍ଡିଆ ଋଣ"],
    as: ["সুকন্যা সমৃদ্ধিৰ লাভ", "ষ্টেণ্ড-আপ ইণ্ডিয়া ঋণ"],
    ur: ["سکنیا سمردھی کے فوائد", "اسٹینڈ اپ انڈیا قرض"],
  },
  health: {
    hi: ["आयुष्मान भारत में 5 लाख का लाभ", "सस्ती दवाइयां कहाँ मिलेंगी?"],
    en: ["Ayushman 5 Lakh benefit", "Where to find generic medicine?"],
    bn: ["আয়ুষ্মান ভারতে ৫ লাখের সুবিধা", "সুলভ মূল্যের ওষুধ কোথায় পাব?"],
    te: ["ఆయుష్మాన్ భారత్ 5 లక్షల లబ్ధి", "చౌక మందులు ఎక్కడ దొరుకుతాయి?"],
    ta: ["ஆயுஷ்மான் பாரத் 5 லட்சம் நன்மை", "மலிவு விலை மருந்துகள் எங்கே?"],
    mr: ["आयुष्मान भारत 5 लाख उपचार", "स्वस्त औषधे कुठे मिळतील?"],
    gu: ["આયુષ્માન ભારત 5 લાખ સહાય", "સસ્તી દવાઓ ક્યાં મળશે?"],
    pa: ["ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ 5 ਲੱਖ ਲਾਭ", "ਸਸਤੀਆਂ ਦਵਾਈਆਂ ਕਿੱਥੇ ਮਿਲਣਗੀਆਂ?"],
    kn: ["ಆಯುಷ್ಮಾನ್ ಭಾರತ್ 5 ಲಕ್ಷ ನೆರವು", "ಅಗ್ಗದ ಔಷಧಿಗಳು ಎಲ್ಲಿ ಸಿಗುತ್ತವೆ?"],
    ml: ["ആയുഷ്മാൻ ഭാരത് 5 ലക്ഷം ആനുകൂല്യം", "കുറഞ്ഞ നിരക്കിലുള്ള മരുന്നുകൾ എവിടെ ലഭിക്കും?"],
    or: ["ଆୟୁଷ୍ମାନ ଭାରତ 5 ଲକ୍ଷ ସୁବିଧା", "ଶସ୍ତା ଔଷଧ କେଉଁଠି ମିଳିବ?"],
    as: ["আয়ুষ্মান ভাৰত ৫ লাখৰ সাহায্য", "সুলভ ঔষধ ক'ত পোৱা যাব?"],
    ur: ["آیوشمان بھارت 5 لاکھ فائدہ", "سستی دوائیں کہاں ملیں گی؟"],
  },
  housing: {
    hi: ["पीएम आवास योजना में कितने पैसे मिलते हैं?", "पीएम आवास की पात्रता"],
    en: ["PMAY-G financial aid amount", "PMAY-G eligibility criteria"],
    bn: ["আবাস যোজনায় কত টাকা পাওয়া যায়?", "আবাস যোজনার যোগ্যতা"],
    te: ["ఆవాస్ యోజన ఎంత సహాయం ఇస్తారు?", "ఆవాస్ యోజన అర్హత"],
    ta: ["வீட்டு வசதி திட்டம் உதவித்தொகை எவ்வளவு?", "வீட்டு வசதி திட்ட தகுதி"],
    mr: ["घरकुल योजनेत किती अनुदान मिळते?", "आवास योजनेची पात्रता"],
    gu: ["આવાસ યોજનામાં કેટલી સહાય મળે છે?", "આવાસ યોજનાની પાત્રતા"],
    pa: ["ਮਕਾਨ ਸਕੀਮ ਦੇ ਕਿੰਨੇ ਪੈਸੇ ਮਿਲਦੇ ਹਨ?", "ਆਵਾਸ ਸਕੀਮ ਦੀ ਯੋਗਤਾ"],
    kn: ["ಆವಾಸ್ ಯೋಜನೆಯಲ್ಲಿ ಎಷ್ಟು ನೆರವು ಸಿಗುತ್ತದೆ?", "ಆವಾಸ್ ಯೋಜನೆ ಅರ್ಹತೆ"],
    ml: ["ഭവന പദ്ധതിയിൽ എത്ര തുക ലഭിക്കും?", "ഭവന പദ്ധതി യോഗ്യത"],
    or: ["ଆବାସ ଯୋଜନାରେ କେତେ ସହାୟତା ମିଳେ?", "ଆବାସ ଯୋଜନା ଯୋଗ୍ୟତା"],
    as: ["আৱাস যোজনাত কিমান সাহায্য পায়?", "আৱাস যোজনাৰ যোগ্যতা"],
    ur: ["آواس یوجنا میں کتنی رقم ملتی ہے؟", "آواس یوجنا کی اہلیت"],
  },
  business: {
    hi: ["मुद्रा लोन कैसे लें?", "स्ट्रीट वेंडर लोन"],
    en: ["How to get MUDRA loan?", "Street vendor loan"],
    bn: ["মুদ্রা লোন কিভাবে পাব?", "স্ট্রিট ভেন্ডর লোন"],
    te: ["ముద్రా రుణం ఎలా పొందాలి?", "వీధి వ్యాపారుల రుణం"],
    ta: ["முத்ரா கடன் பெறுவது எப்படி?", "தெருவோர வியாபாரிகள் கடன்"],
    mr: ["मुद्रा कर्ज कसे घ्यावे?", "फेरीवाला कर्ज योजना"],
    gu: ["મુદ્રા લોન કેવી રીતે મેળવવી?", "સ્ટ્રીટ વેન્ડર લોન"],
    pa: ["ਮੁਦਰਾ ਕਰਜ਼ਾ ਕਿਵੇਂ ਲਈਏ?", "ਸਟਰੀਟ ਵੈਂਡਰ ਕਰਜ਼ਾ"],
    kn: ["ಮುದ್ರಾ ಸಾಲ ಪಡೆಯುವುದು ಹೇಗೆ?", "ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿ ಸಾಲ"],
    ml: ["മുദ്ര വായ്പ എങ്ങനെ ലഭിക്കും?", "തെരുവ് കച്ചവട വായ്പ"],
    or: ["ମୁଦ୍ରା ଋଣ କିପରି ପାଇବେ?", "ଷ୍ଟ୍ରିଟ୍ ଭେଣ୍ଡର ଋଣ"],
    as: ["মুদ্ৰা ঋণ কেনেকৈ ল'ব?", "ষ্ট্ৰীট ভেণ্ডৰ ঋণ"],
    ur: ["مدرا قرض کیسے حاصل کریں؟", "اسٹریٹ وینڈر قرض"],
  },
  pension: {
    hi: ["वृद्धावस्था पेंशन की पात्रता", "विधवा पेंशन के दस्तावेज"],
    en: ["Old age pension rules", "Widow pension documents"],
    bn: ["বার্ধক্য পেনশনের নিয়ম", "বিধবা পেনশন নথিপত্র"],
    te: ["వృద్ధాప్య పింఛను నిబంధనలు", "వితంతు పింఛను పత్రాలు"],
    ta: ["முதியோர் ஓய்வூதிய விதிகள்", "விதவை ஓய்வூதிய ஆவணங்கள்"],
    mr: ["वृद्धापकाळ पेन्शन अटी", "विधवा पेन्शन कागदपत्रे"],
    gu: ["વૃદ્ધ પેન્શન નિયમો", "વિધવા પેન્શન દસ્તાવેજો"],
    pa: ["ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ ਨਿਯਮ", "ਵਿਧਵਾ ਪੈਨਸ਼ਨ ਦਸਤਾਵੇਜ਼"],
    kn: ["ವೃದ್ಧಾಪ್ಯ ಪಿಂಚಣಿ ನಿಯಮಗಳು", "ವಿಧವಾ ಪಿಂಚಣಿ ದಾಖಲೆಗಳು"],
    ml: ["വാർദ്ധക്യ പെൻഷൻ മാനദണ്ഡങ്ങൾ", "വിധവാ പെൻഷൻ രേഖകൾ"],
    or: ["ବାର୍ଦ୍ଧକ୍ୟ ପେନସନ ନିୟମ", "ବିଧବା ପେନସନ ଦସ୍ତାବେଜ"],
    as: ["বয়োজ্যেষ্ঠ পেঞ্চন নিয়ম", "বিধৱা পেঞ্চনৰ নথি-পত্ৰ"],
    ur: ["اولڈ ایج پنشن کے قوانین", "بیوہ پنشن کے دستاویزات"],
  },
  employment: {
    hi: ["मनरेगा जॉब कार्ड कैसे बनेगा?", "कौशल विकास ट्रेनिंग"],
    en: ["MGNREGA job card rules", "Skill training certificate"],
    bn: ["মনরেগা জব কার্ড কিভাবে তৈরি করবেন?", "দক্ষতা প্রশিক্ষণ শংসাপত্র"],
    te: ["ఉపాధి హామీ జాబ్ కార్డు ఎలా పొందాలి?", "నైపుణ్య శిక్షణ ధృవీకరణ"],
    ta: ["வேலைவாய்ப்பு அட்டை பெறுவது எப்படி?", "திறன் பயிற்சி சான்றிதழ்"],
    mr: ["मनरेगा जॉब कार्ड कसे मिळवावे?", "कौशल्य विकास प्रशिक्षण"],
    gu: ["મનરેગા જોબ કાર્ડ કેવી રીતે કઢાવવું?", "કૌશલ્ય વિકાસ તાલીમ"],
    pa: ["ਮਨਰੇਗਾ ਜੌਬ ਕਾਰਡ ਕਿਵੇਂ ਬਣੇਗਾ?", "ਹੁਨਰ ਵਿਕਾਸ ਸਿਖਲਾਈ"],
    kn: ["ಮನರೇಗಾ ಜಾಬ್ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?", "ಕೌಶಲ್ಯ ತರಬೇತಿ ಪ್ರಮಾಣಪತ್ರ"],
    ml: ["തൊഴിലുറപ്പ് കാർഡ് എങ്ങനെ എടുക്കാം?", "നൈപുണ്യ പരിശീലനം"],
    or: ["ମନରେଗା ଜବ୍ କାର୍ଡ କିପରି କରିବେ?", "ଦକ୍ଷତା ତାଲିମ ପ୍ରମାଣପତ୍ର"],
    as: ["মনৰেগা জব কাৰ্ড কেনেকৈ বনাব?", "দক্ষতা প্ৰশিক্ষণ"],
    ur: ["منریگا جاب کارڈ کیسے بنے گا؟", "مہارت کی تربیت کا سرٹیفکیٹ"],
  },
  fallback: {
    hi: ["किसान योजनाएं", "छात्रवृत्ति योजनाएं", "महिला योजनाएं", "आयुष्मान भारत"],
    en: ["Farming Schemes", "Scholarships", "Women Schemes", "Ayushman Bharat"],
    bn: ["কৃষি প্রকল্প", "বৃত্তি প্রকল্প", "মহিলা প্রকল্প", "আয়ুষ্মান ভারত"],
    te: ["రైతు పథకాలు", "స్కాలర్‌షిప్‌లు", "మహిళా పథకాలు", "ఆయుష్మాన్ భారత్"],
    ta: ["விவசாய திட்டங்கள்", "கல்வி உதவித்தொகை", "பெண்கள் திட்டங்கள்", "ஆயுஷ்மான் பாரத்"],
    mr: ["शेतकरी योजना", "शिष्यवृत्ती योजना", "महिला योजना", "आयुष्मान भारत"],
    gu: ["ખેડૂત યોજનાઓ", "સ્કોલરશીપ", "મહિલા યોજનાઓ", "આયુષ્માન ભારત"],
    pa: ["ਕਿਸਾਨ ਸਕੀਮਾਂ", "ਵਜ਼ੀਫ਼ਾ ਸਕੀਮਾਂ", "ਔਰਤਾਂ ਦੀਆਂ ਸਕੀਮਾਂ", "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ"],
    kn: ["ರೈತ ಯೋಜನೆಗಳು", "ವಿದ್ಯಾರ್ಥಿವೇತನ", "ಮಹಿಳಾ ಯೋಜನೆಗಳು", "ಆಯುಷ್ಮಾನ್ ಭಾರತ್"],
    ml: ["കർഷക പദ്ധതികൾ", "സ്കോളർഷിപ്പുകൾ", "വനിതാ പദ്ധതികൾ", "ആയുഷ്മാൻ ഭാരത്"],
    or: ["କୃଷକ ଯୋଜନା", "ଛାତ୍ରବୃତ୍ତି ଯୋଜନା", "ମହିଳା ଯୋଜନା", "ଆୟୁଷ୍ମାନ ଭାରତ"],
    as: ["কৃষি আঁচনি", "বৃত্তি আঁচনি", "মহিলা আঁচনি", "আয়ুষ্মান ভাৰত"],
    ur: ["کسان اسکیمیں", "اسکالرشپ اسکیمیں", "خواتین کی اسکیمیں", "آیوشمان بھارت"],
  },
};

function getLocalizedSuggestions(categoryKey, langCode) {
  const cat = LOCALIZED_SUGGESTIONS[categoryKey];
  if (!cat) return [];
  return cat[langCode] || cat.hi || cat.en || [];
}

/**
 * Main conversational NLP parsing and response generator
 * @param {string} rawQuery - The voice recognized text or typed message
 * @param {string} langCode - Language code ('hi', 'en', 'bn', etc.)
 * @returns {Promise<{ text: string, speechText: string, actions: Array, route?: string, suggestions: Array }>}
 */
export async function processVoiceAssistantQuery(rawQuery, langCode = "hi") {
  const query = (rawQuery || "").trim();
  const normalized = query.toLowerCase();
  const strings = getLocalizedStrings(langCode);
  const schemes = getSchemes();

  // 1. Handle Greetings / Empty Queries
  if (!query || normalized === "hello" || normalized === "hi" || normalized === "नमस्ते" || normalized === "help" || normalized === "मदद") {
    return {
      text: `### ${strings.greeting}\n\n${strings.helpText}`,
      speechText: strings.greeting,
      actions: [
        { label: strings.viewDetails, route: "/schemes" },
        { label: "Check Eligibility", route: "/eligibility" },
      ],
      suggestions: getLocalizedSuggestions("greetings", langCode),
    };
  }

  // 2. Handle Direct Website Feature Navigation (only when no specific scheme or category is requested)
  const navIntent = detectNavigationIntent(normalized);
  if (navIntent && !detectSpecificScheme(normalized) && !detectCategoryIntent(normalized)) {
    const navMessage = strings[navIntent.key] || strings.navSchemes;
    return {
      text: `${navMessage}\n\n[${strings.viewDetails} →](${navIntent.route})`,
      speechText: navMessage,
      route: navIntent.route,
      actions: [
        { label: "Open Page", route: navIntent.route },
        { label: "Explore Schemes", route: "/schemes" },
      ],
      suggestions: getLocalizedSuggestions("navigation", langCode),
    };
  }

  // 3. Handle Specific Scheme Inquiry
  const specificSchemeId = detectSpecificScheme(normalized);
  if (specificSchemeId) {
    const rawScheme = getSchemeById(specificSchemeId);
    if (rawScheme) {
      const scheme = localizeScheme(rawScheme, langCode);
      const subIntent = detectSubIntent(normalized);

      // (A) Scheme Eligibility
      if (subIntent === "ELIGIBILITY") {
        const eligibilityItems = scheme.displayEligibility || [];
        const text = `### ${scheme.displayName} ${strings.eligibilityTitle}\n\n` +
          eligibilityItems.map((item, i) => `${i + 1}. **${item}**`).join("\n") +
          `\n\n**${strings.targetBeneficiaries || "Beneficiaries:"}** ${scheme.displayBeneficiaries?.join(", ") || "Eligible citizens"}`;

        const speechText = `${scheme.displayName} ${strings.eligibilityTitle} ` +
          eligibilityItems.slice(0, 3).join(". ");

        return {
          text,
          speechText,
          actions: [
            { label: strings.viewDetails, route: `/schemes/${scheme.id}` },
            { label: strings.openPortal, url: scheme.officialUrl },
          ],
          suggestions: [
            strings.benefitsTitle ? `${scheme.displayName} ${strings.benefitsTitle}` : "Financial Benefits",
            strings.documentsTitle ? `${scheme.displayName} ${strings.documentsTitle}` : "Required Documents",
            strings.applyTitle ? `${scheme.displayName} ${strings.applyTitle}` : "How to Apply",
          ],
        };
      }

      // (B) Scheme Benefits / Money
      if (subIntent === "BENEFITS") {
        const finHelp = scheme.displayFinancialAssistance || [];
        const keyBenefits = scheme.displayBenefits || [];

        const text = `### ${scheme.displayName} ${strings.benefitsTitle}\n\n` +
          (finHelp.length > 0 ? `**${strings.financialAssistanceLabel || "Financial Assistance:"}**\n${finHelp.map(f => `• ${f}`).join("\n")}\n\n` : "") +
          `**${strings.keyBenefitsLabel || "Key Benefits:"}**\n${keyBenefits.slice(0, 3).map(b => `• ${b}`).join("\n")}`;

        const speechText = `${scheme.displayName}: ` +
          (finHelp[0] || keyBenefits[0] || scheme.displayDescription);

        return {
          text,
          speechText,
          actions: [
            { label: strings.viewDetails, route: `/schemes/${scheme.id}` },
            { label: strings.openPortal, url: scheme.officialUrl },
          ],
          suggestions: [
            strings.eligibilityTitle ? `${scheme.displayName} ${strings.eligibilityTitle}` : "Eligibility",
            strings.documentsTitle ? `${scheme.displayName} ${strings.documentsTitle}` : "Documents",
            strings.applyTitle ? `${scheme.displayName} ${strings.applyTitle}` : "How to Apply",
          ],
        };
      }

      // (C) Required Documents
      if (subIntent === "DOCUMENTS") {
        const docs = scheme.displayDocuments || [];
        const text = `### ${scheme.displayName} ${strings.documentsTitle}\n\n` +
          docs.map((d, i) => `${i + 1}. **${d}**`).join("\n");

        const speechText = `${scheme.displayName} ${strings.documentsTitle}: ` + docs.slice(0, 4).join(", ");

        return {
          text,
          speechText,
          actions: [
            { label: strings.viewDetails, route: `/schemes/${scheme.id}` },
            { label: strings.navDocuments || "Document Checklist", route: "/documents" },
          ],
          suggestions: [
            strings.applyTitle ? `${scheme.displayName} ${strings.applyTitle}` : "How to Apply",
            strings.eligibilityTitle ? `${scheme.displayName} ${strings.eligibilityTitle}` : "Eligibility",
          ],
        };
      }

      // (D) How to Apply / Application Steps
      if (subIntent === "HOW_TO_APPLY") {
        const steps = scheme.displaySteps || [];
        const text = `### ${scheme.displayName} ${strings.applyTitle}\n\n` +
          steps.map((s, i) => `${i + 1}. ${s}`).join("\n") +
          `\n\n**${strings.openPortal || "Official Portal"}:** [${scheme.verificationStatus}](${scheme.officialUrl})`;

        const speechText = `${scheme.displayName} ${strings.applyTitle}: ` + steps.slice(0, 2).join(". ");

        return {
          text,
          speechText,
          actions: [
            { label: strings.viewDetails, route: `/schemes/${scheme.id}` },
            { label: strings.openPortal, url: scheme.officialUrl },
          ],
          suggestions: [
            strings.documentsTitle ? `${scheme.displayName} ${strings.documentsTitle}` : "Documents",
            strings.eligibilityTitle ? `${scheme.displayName} ${strings.eligibilityTitle}` : "Eligibility",
          ],
        };
      }

      // (E) General Overview of Scheme
      const text = `### ${scheme.displayName}\n\n` +
        `${scheme.displayDescription}\n\n` +
        `• **${strings.categoryLabel || "Category:"}** ${scheme.displayCategory}\n` +
        `• **${strings.adminLevelLabel || "Level:"}** ${scheme.level === "central" ? (strings.centralGovLabel || "Central Government") : (strings.stateGovLabel || "State Government")}\n` +
        `• **${strings.verifiedStatusLabel || "Verification Status:"}** ${scheme.verificationStatus}`;

      const speechText = `${scheme.displayName}: ${scheme.displayDescription}`;

      return {
        text,
        speechText,
        actions: [
          { label: strings.viewDetails, route: `/schemes/${scheme.id}` },
          { label: strings.openPortal, url: scheme.officialUrl },
        ],
        suggestions: [
          strings.benefitsTitle ? `${scheme.displayName} ${strings.benefitsTitle}` : "Financial Benefits",
          strings.eligibilityTitle ? `${scheme.displayName} ${strings.eligibilityTitle}` : "Eligibility",
          strings.documentsTitle ? `${scheme.displayName} ${strings.documentsTitle}` : "Required Documents",
        ],
      };

    }
  }

  // 4. Handle Category Intents (Farmers, Students, Women, Health, Housing, Business, etc.)
  const categoryIntent = detectCategoryIntent(normalized);

  if (categoryIntent === "agriculture") {
    const farmingSchemes = schemes.filter(s => s.category.id === "agriculture" || s.id === "pm-kisan");
    const localizedFarming = farmingSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.farmersFound}\n\n` +
      localizedFarming.map(s => `• **${s.displayName}**: ${s.displayFinancialAssistance?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.farmersFound} ` + localizedFarming.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "PM-KISAN Samman Nidhi", route: "/schemes/pm-kisan" },
        { label: "Explore All Farming Schemes", route: "/categories/agriculture" },
      ],
      suggestions: getLocalizedSuggestions("agriculture", langCode),
    };
  }

  if (categoryIntent === "education") {
    const studentSchemes = schemes.filter(s => s.category.id === "education" || s.id === "national-scholarship-portal");
    const localized = studentSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.studentsFound}\n\n` +
      localized.map(s => `• **${s.displayName}**: ${s.displayFinancialAssistance?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.studentsFound} ` + localized.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "National Scholarship Portal", route: "/schemes/national-scholarship-portal" },
        { label: "All Education Schemes", route: "/categories/education" },
      ],
      suggestions: getLocalizedSuggestions("education", langCode),
    };
  }

  if (categoryIntent === "women") {
    const womenSchemes = schemes.filter(s => s.id === "sukanya-samriddhi" || s.id === "stand-up-india" || s.beneficiaries.includes("Women"));
    const localized = womenSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.womenFound}\n\n` +
      localized.map(s => `• **${s.displayName}**: ${s.displayFinancialAssistance?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.womenFound} ` + localized.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "Sukanya Samriddhi Yojana", route: "/schemes/sukanya-samriddhi" },
        { label: "Stand-Up India Scheme", route: "/schemes/stand-up-india" },
      ],
      suggestions: getLocalizedSuggestions("women", langCode),
    };
  }

  if (categoryIntent === "health") {
    const healthSchemes = schemes.filter(s => s.category.id === "health" || s.id === "ayushman-bharat-pmjay" || s.id === "pm-jay-jan-aushadhi");
    const localized = healthSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.healthFound}\n\n` +
      localized.map(s => `• **${s.displayName}**: ${s.displayBenefits?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.healthFound} ` + localized.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "Ayushman Bharat PM-JAY", route: "/schemes/ayushman-bharat-pmjay" },
        { label: "Jan Aushadhi PMBJP", route: "/schemes/pm-jay-jan-aushadhi" },
      ],
      suggestions: getLocalizedSuggestions("health", langCode),
    };
  }

  if (categoryIntent === "housing") {
    const housingSchemes = schemes.filter(s => s.id === "pmay-gramin");
    const localized = housingSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.housingFound}\n\n` +
      localized.map(s => `• **${s.displayName}**: ${s.displayFinancialAssistance?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.housingFound} ` + localized.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "PMAY Gramin Details", route: "/schemes/pmay-gramin" },
        { label: "Housing Category", route: "/categories/housing" },
      ],
      suggestions: getLocalizedSuggestions("housing", langCode),
    };
  }

  if (categoryIntent === "business") {
    const businessSchemes = schemes.filter(s => s.id === "mudra" || s.id === "pm-svanidhi" || s.category.id === "enterprise");
    const localized = businessSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.businessFound}\n\n` +
      localized.map(s => `• **${s.displayName}**: ${s.displayFinancialAssistance?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.businessFound} ` + localized.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "Pradhan Mantri MUDRA Yojana", route: "/schemes/mudra" },
        { label: "PM SVANidhi Vendor Loan", route: "/schemes/pm-svanidhi" },
      ],
      suggestions: getLocalizedSuggestions("business", langCode),
    };
  }

  if (categoryIntent === "pension") {
    const pensionSchemes = schemes.filter(s => s.id === "nsap");
    const localized = pensionSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.pensionFound}\n\n` +
      localized.map(s => `• **${s.displayName}**: ${s.displayFinancialAssistance?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.pensionFound} ` + localized.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "National Social Assistance (NSAP)", route: "/schemes/nsap" },
        { label: "Check Pension Eligibility", route: "/eligibility" },
      ],
      suggestions: getLocalizedSuggestions("pension", langCode),
    };
  }

  if (categoryIntent === "employment") {
    const empSchemes = schemes.filter(s => s.id === "mgnrega" || s.id === "pmkvy");
    const localized = empSchemes.map(s => localizeScheme(s, langCode));

    const text = `### ${strings.employmentFound}\n\n` +
      localized.map(s => `• **${s.displayName}**: ${s.displayFinancialAssistance?.[0] || s.displayDescription}`).join("\n\n");

    const speechText = `${strings.employmentFound} ` + localized.map(s => s.displayName).join(", ");

    return {
      text,
      speechText,
      actions: [
        { label: "MGNREGA 100 Days Work", route: "/schemes/mgnrega" },
        { label: "PM Kaushal Vikas Yojana", route: "/schemes/pmkvy" },
      ],
      suggestions: getLocalizedSuggestions("employment", langCode),
    };
  }

  // 5. Fallback: Search keywords across dataset
  const searchResults = schemes.filter(s => {
    const hay = [s.name, s.nameHi, s.description, s.descriptionHi, ...s.keywords].join(" ").toLowerCase();
    return hay.includes(normalized);
  });

  if (searchResults.length > 0) {
    const topScheme = localizeScheme(searchResults[0], langCode);
    const text = `### ${topScheme.displayName}\n\n${topScheme.displayDescription}\n\n` +
      (topScheme.displayFinancialAssistance?.[0] ? `**${strings.financialAssistanceLabel || "Financial Assistance:"}** ${topScheme.displayFinancialAssistance[0]}\n` : "");

    return {
      text,
      speechText: `${topScheme.displayName}: ${topScheme.displayDescription}`,
      actions: [
        { label: strings.viewDetails, route: `/schemes/${topScheme.id}` },
        { label: "Explore Schemes", route: "/schemes" },
      ],
      suggestions: [
        strings.eligibilityTitle ? `${topScheme.displayName} ${strings.eligibilityTitle}` : "Eligibility",
        strings.documentsTitle ? `${topScheme.displayName} ${strings.documentsTitle}` : "Required Documents",
      ],
    };
  }

  // 6. Clarification / No Match
  return {
    text: `### ${strings.noMatch}\n\n${strings.clarify}`,
    speechText: strings.noMatch,
    actions: [
      { label: "Explore Schemes", route: "/schemes" },
      { label: "Check Eligibility", route: "/eligibility" },
    ],
    suggestions: getLocalizedSuggestions("fallback", langCode),
  };
}
