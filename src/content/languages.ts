export type LanguageOption = {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
};

export const languageOptions: LanguageOption[] = [
  { code: "cy", label: "Kypriaka", nativeLabel: "Κυπριακά", flag: "🇨🇾" },
  { code: "el", label: "Greek", nativeLabel: "Ελληνικά", flag: "🇬🇷" },
  { code: "de", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪" },
  { code: "nl", label: "Dutch", nativeLabel: "Nederlands", flag: "🇳🇱" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português", flag: "🇵🇹" },
  { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", flag: "🇷🇺" },
  { code: "cs", label: "Czech", nativeLabel: "Čeština", flag: "🇨🇿" },
];

