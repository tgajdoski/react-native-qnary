import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import languages from "./languages";

const resources = {};
languages.forEach(language => {
  resources[language.key] = language.getResources();
});

// creating a language detection plugin using
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: "languageDetector",
  async: true, // flags below detection to be async
  detect: callback => callback("en"),
  // Localization.getCurrentLocaleAsync().then(lng => {
  //     console.log('detected=============================', lng.replace('_', '-'));
  //     callback(lng.replace('_', '-'));
  // });

  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: "en",

    resources,

    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    },

    // react i18next special options (optional)
    react: {
      wait: true,
      bindStore: false,
      nsMode: "default"
    }
  });

export default i18n;
