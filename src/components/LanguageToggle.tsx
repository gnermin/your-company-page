import { useLang } from "@/i18n/LanguageContext";

const LanguageToggle = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang } = useLang();
  const base =
    "px-2 py-1 text-xs font-semibold rounded-md transition-colors";
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-lg border border-border bg-secondary/50 p-0.5 ${
        compact ? "" : ""
      }`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${base} ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("bs")}
        aria-pressed={lang === "bs"}
        className={`${base} ${
          lang === "bs"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        BS
      </button>
    </div>
  );
};

export default LanguageToggle;