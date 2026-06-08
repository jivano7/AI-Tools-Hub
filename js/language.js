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

                            const selector =
                            document.getElementById("languageSelector");

                            function applyLanguage(lang){

                                document.getElementById("welcomeText").textContent =
                                    translations[lang].welcome;

                                        document.getElementById("subtitleText").textContent =
                                            translations[lang].subtitle;
                                            }

                                            selector.addEventListener("change", () => {

                                                const lang = selector.value;

                                                    localStorage.setItem(
                                                            "language",
                                                                    lang
                                                                        );

                                                                            applyLanguage(lang);

                                                                            });

                                                                            const savedLang =
                                                                            localStorage.getItem("language")
                                                                            || "en";

                                                                            selector.value = savedLang;

                                                                            applyLanguage(savedLang);