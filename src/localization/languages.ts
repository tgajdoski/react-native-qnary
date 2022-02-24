import en from "./locales/locale-en.json";
import es from "./locales/locale-es.json";
import it from "./locales/locale-it.json";
import ja from "./locales/locale-ja.json";

const languages = [
  {
    key: "en",
    name: "English",
    getResources: () => en
  },
  {
    key: "es",
    name: "Español",
    getResources: () => es
  },
  {
    key: "ja",
    name: "日本語",
    getResources: () => ja
  },
  {
    key: "it",
    name: "Italiano",
    getResources: () => it
  }
];

export default languages;
