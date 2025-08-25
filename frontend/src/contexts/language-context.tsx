"use client"

import type React from "react"
import { createContext, useContext } from "react"

type Language = "tr" // Only Turkish is supported now

interface LanguageContextType {
  language: Language
  t: (key: string) => string
}

const translations = {
  tr: {
    // Navigation
    home: "Ana Sayfa",
    login: "Giriş",
    logout: "Çıkış",
    enhance: "CV'ni AI ile Güçlendir",
    compatibility: "Uyumluluk Sonuçları",
    assistant: "Sanal Asistan",

    // Home Page
    homeTitle: "CV'ni AI ile Güçlendir",
    homeSubtitle: "CV'ni yükle, yapay zeka ile analiz ettir, geliştirme önerileri al!",
    tryNow: "Şimdi Deneyin",
    howItWorks: "Nasıl Çalışır?",
    whyCareerMatch: "Neden CareerMatchAI?",
    faq: "Sıkça Sorulan Sorular",
    testimonials: "Kullanıcı Yorumları",
    uploadCVDescription: "CV'nizi ve hedeflediğiniz iş ilanını platforma yükleyin",
    aiAnalysis: "AI Analizi",
    aiAnalysisDescription: "Yapay zeka CV'nizi iş ilanıyla karşılaştırır ve uyumluluk skorunu hesaplar",
    compatibilityScoreDescription: "Detaylı analiz sonuçlarını ve güçlü/zayıf yönlerinizi görün",
    personalSuggestions: "Kişisel Öneriler",
    personalSuggestionsDescription: "AI asistanından kişiselleştirilmiş geliştirme önerileri alın",
    howItWorksSubtitle: "Sadece 4 adımda CV'nizi profesyonel seviyeye taşıyın",
    faqSubtitle: "En çok merak edilen sorular ve cevapları",
    testimonialsSubtitle: "Kullanıcılarımız CareerMatchAI hakkında ne düşünüyor?",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language: Language = "tr" // Hardcoded to Turkish

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return <LanguageContext.Provider value={{ language, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
