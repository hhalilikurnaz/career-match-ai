'use client'

import React, { createContext, useContext } from 'react'

type Language = 'tr' // Only Turkish is supported now

interface LanguageContextType {
  language: Language
  t: (key: string) => string
}

const translations = {
  tr: {
    // Navigation
    home: 'Ana Sayfa',
    login: 'Giriş',
    logout: 'Çıkış',
    enhance: "CV'ni AI ile Güçlendir",
    compatibility: 'Uyumluluk Sonuçları',
    assistant: 'Sanal Asistan',
    
    // Home Page
    homeTitle: "CV'ni AI ile Güçlendir",
    homeSubtitle: "CV'ni yükle, yapay zeka ile analiz ettir, geliştirme önerileri al!",
    tryNow: 'Şimdi Deneyin',
    howItWorks: 'Nasıl Çalışır?',
    whyCareerMatch: 'Neden CareerMatchAI?',
    faq: 'Sıkça Sorulan Sorular',
    testimonials: 'Kullanıcı Yorumları', // Kept for potential future use, but not rendered
    uploadCVDescription: 'CV\'nizi ve hedeflediğiniz iş ilanını platforma yükleyin',
    aiAnalysis: 'AI Analizi',
    aiAnalysisDescription: 'Yapay zeka CV\'nizi iş ilanıyla karşılaştırır ve uyumluluk skorunu hesaplar',
    compatibilityScoreDescription: 'Detaylı analiz sonuçlarını ve güçlü/zayıf yönlerinizi görün',
    personalSuggestions: 'Kişisel Öneriler',
    personalSuggestionsDescription: 'AI asistanından kişiselleştirilmiş geliştirme önerileri alın',
    howItWorksSubtitle: 'Sadece 4 adımda CV\'nizi profesyonel seviyeye taşıyın',
    faqSubtitle: 'En çok merak edilen sorular ve cevapları',
    testimonialsSubtitle: 'Kullanıcılarımız CareerMatchAI hakkında ne düşünüyor?', // Kept for potential future use
    
    // Login Page
    username: 'Kullanıcı Adı',
    password: 'Şifre',
    loginButton: 'Giriş Yap',
    invalidCredentials: 'Bilgiler geçersiz',
    demoCredentials: 'Demo Hesap Bilgileri',
    
    // Enhancement Page
    welcomeMessage: "Hoş geldin! CV'ni güçlendirmende sana yardımcı olacağım.",
    uploadCV: "CV'ni Yükle",
    uploadJobPost: 'İlanı Yükle',
    showCompatibility: 'Uyumluluğu Göster',
    cvUploaded: 'CV yüklendi',
    jobUploaded: 'İlan yüklendi',
    enterJobLink: 'İş ilanı linkini girin',
    orUploadFile: 'veya dosya yükleyin',
    assistantGuidanceCV: 'İlk olarak CV’ni eklemelisin!',
    assistantGuidanceJob: 'Şimdi de iş ilanını eklemelisin!',
    
    // Compatibility Page
    compatibilityScore: "CV'n bu ilana %{score} uyumlu!",
    analysisComplete: "Yüklediğiniz belgeler analiz edildi. Bu oran teknik yeterlilikler, anahtar kelimeler ve deneyim bazında hesaplandı.",
    improveQuestion: 'Daha iyi hale getirmek ister misin? Sana önerilerim var!',
    analyzing: 'CV\'n analiz ediliyor...',
    strengths: 'Güçlü Yönler',
    improvements: 'Geliştirilebilir Alanlar',
    
    // Assistant Page
    assistantWelcome: "CV'ni inceledim, işte geliştirmek için önerilerim:",
    suggestion1: 'Özet Bölümü Ekle',
    suggestion2: 'Başarıları Sayılarla Destekle',
    suggestion3: 'Anahtar Kelimeleri Optimize Et',
    updateCV: "CV'yi Güncelle",
    rerunCompatibility: 'Uyumluluğu Tekrar Göster',
    askAnything: 'CV geliştirme hakkında bir şey sor...',
    cvUpdateFeatureComingSoon: 'CV güncelleme özelliği yakında eklenecek!',
    
    // Common
    back: 'Geri',
    next: 'İleri',
    loading: 'Yükleniyor...',
    error: 'Hata oluştu',
    success: 'Başarılı',
    close: 'Kapat',
    continue: 'Devam Et',
    
    // Features Section
    fastAnalysis: 'Hızlı Analiz',
    fastAnalysisDescription: 'Saniyeler içinde CV analizi ve uyumluluk skoru',
    securePlatform: 'Güvenli Platform',
    securePlatformDescription: 'Verileriniz güvenli şekilde işlenir ve korunur',
    access247: '7/24 Erişim',
    access247Description: 'İstediğiniz zaman CV\'nizi geliştirin',
    expertSuggestions: 'Uzman Öneriler',
    expertSuggestionsDescription: 'İK uzmanları tarafından geliştirilen AI önerileri',

    // Stats Section
    careerMatchAINumbers: 'Rakamlarla CareerMatchAI',
    activeUsers: 'Aktif Kullanıcı',
    cvsAnalyzed: 'Analiz Edilen CV',
    successfulMatches: 'Başarılı Eşleşme',
    successRate: 'Başarı Oranı',

    // FAQ Section
    faq1Question: 'CareerMatchAI nasıl çalışır?',
    faq1Answer: 'Platformumuza CV\'nizi ve ilgilendiğiniz iş ilanını yüklersiniz. Yapay zeka algoritmalarımız, CV\'nizi ilanın gereksinimleriyle karşılaştırarak detaylı bir uyumluluk analizi yapar ve size özel geliştirme önerileri sunar.',
    faq2Question: 'Hangi dosya formatlarını destekliyorsunuz?',
    faq2Answer: 'PDF, DOC ve DOCX formatındaki CV dosyalarını ve PDF, DOC, DOCX, TXT formatındaki iş ilanı dosyalarını destekliyoruz. Ayrıca iş ilanı linki de girebilirsiniz.',
    faq3Question: 'Verilerim güvende mi?',
    faq3Answer: 'Evet, verilerinizin güvenliği bizim için en önemli önceliktir. Tüm verileriniz şifrelenmiş sunucularda saklanır ve gizlilik politikalarımıza uygun olarak işlenir.',
    faq4Question: 'AI asistanı ne kadar doğru öneriler sunuyor?',
    faq4Answer: 'AI asistanımız, binlerce başarılı CV ve iş ilanı verisiyle eğitilmiş gelişmiş makine öğrenimi modelleri kullanır. Bu sayede size en doğru ve kişiselleştirilmiş önerileri sunar.',

    // CV Analysis Importance Section
    cvAnalysisImportanceTitle: 'CV Analizinin Önemi',
    cvAnalysisImportanceSubtitle: 'Günümüz rekabetçi iş piyasasında öne çıkmak için CV analizinin kritik rolü',
    atsCompatibilityTitle: 'ATS Uyumluluğu',
    atsCompatibilityDescription: 'Başvuru Takip Sistemleri (ATS) tarafından taranabilen ve işverenlerin dikkatini çeken bir CV oluşturun.',
    personalizedFeedbackTitle: 'Kişiselleştirilmiş Geri Bildirim',
    personalizedFeedbackDescription: 'AI destekli analizle CV\'nizin güçlü ve geliştirilebilir yönlerini keşfedin, size özel öneriler alın.',
    careerAdvancementTitle: 'Kariyer Gelişimi',
    careerAdvancementDescription: 'CV\'nizi optimize ederek hayalinizdeki işe bir adım daha yaklaşın ve kariyer hedeflerinize ulaşın.',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language: Language = 'tr' // Hardcoded to Turkish

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
