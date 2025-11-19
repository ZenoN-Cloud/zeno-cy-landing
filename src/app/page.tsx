import { LanguageProvider } from "@/context/LanguageContext";
import { ClientPage } from "@/components/ClientPage";

export default function Home() {
  return (
    <LanguageProvider>
      <ClientPage />
    </LanguageProvider>
  );
}
