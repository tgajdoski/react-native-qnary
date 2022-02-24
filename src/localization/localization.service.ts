import i18n from "./i18n";
import languages from "./languages";

class LocalizationService {
  getCurrentLanguage = () => {
    const filtered = languages.filter(
      language => language.key === i18n.language
    );

    if (filtered.length > 0) {
      return filtered[0];
    }

    return null;
  };

  setCurrentLanguage = language => {
    if (language === undefined || language === null) {
      return;
    }

    const { key } = language;
    if (key === undefined || key === null) {
      return;
    }

    i18n.changeLanguage(key);
  };
}

const localizationService = new LocalizationService();
export default localizationService;
