const translations = {
  en: {
    welcome: "Welcome Back 👋",
    subtitle: "Discover the best AI tools."
  },
  hi: {
    welcome: "वापस स्वागत है 👋",
    subtitle: "सर्वश्रेष्ठ AI टूल्स खोजें।"
  }
};

const selector = document.getElementById("languageSelector");

function applyLanguage(lang) {
  const welcome = document.getElementById("welcomeText");
  const subtitle = document.getElementById("subtitleText");

  if (welcome) welcome.textContent = translations[lang].welcome;
  if (subtitle) subtitle.textContent = translations[lang].subtitle;
}

if (selector) {
  selector.addEventListener("change", () => {
    const lang = selector.value;
    localStorage.setItem("language", lang);
    applyLanguage(lang);
  });

  const savedLang = localStorage.getItem("language") || "en";
  selector.value = savedLang;
  applyLanguage(savedLang);
}
