"use client";
import { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/editorial-content";
const LanguageContext = createContext<{
  language: Locale;
  setLanguage: (language: Locale) => void;
} | null>(null);
export function LanguageProvider({
  children,
  language,
}: {
  children: React.ReactNode;
  language: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();
  function setLanguage(next: Locale) {
    const path = pathname.replace(/^\/ja(?=\/|$)/, "") || "/";
    router.push(localizedPath(next, path) + window.location.hash);
  }
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required");
  return context;
}
