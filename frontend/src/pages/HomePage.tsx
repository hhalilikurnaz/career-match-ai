"use client"

import { useAuth } from "../contexts/auth-context"
import { useLanguage } from "../contexts/language-context"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { HowItWorks } from "../components/HowItWorks"
import { Features } from "../components/Features"
import { Stats } from "../components/Stats"
import { FAQ } from "../components/FAQ"
import { CVAnalysisImportance } from "../components/CVAnalysisImportance"
import { Brain, FileText, Target, Zap, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleTryNow = () => {
    if (isAuthenticated) {
      navigate("/enhance")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen bg-professor-gray-100">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center relative">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-professor-blue-200 rounded-full opacity-20 animate-bounce"></div>
          <div
            className="absolute top-20 right-20 w-16 h-16 bg-professor-gold-200 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-10 left-20 w-12 h-12 bg-professor-blue-300 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="flex justify-center mb-8">
            <div className="relative p-6 bg-professor-blue-700 rounded-full shadow-2xl animate-pulse">
              <Brain className="h-16 w-16 text-white" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-8 w-8 text-professor-gold-400 animate-spin" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-professor-gray-900 mb-6 bg-gradient-to-r from-professor-blue-700 via-professor-blue-800 to-professor-blue-900 bg-clip-text text-transparent animate-fade-in">
            {t("homeTitle")}
          </h1>

          <p className="text-xl md:text-2xl text-professor-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("homeSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={handleTryNow}
              size="lg"
              className="text-lg px-10 py-6 bg-professor-blue-700 hover:bg-professor-blue-800 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <Zap className="mr-2 h-6 w-6" />
              {t("tryNow")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 text-professor-gray-600">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-professor-blue-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-professor-blue-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-professor-blue-800 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm">15,000+ kullanıcı güveniyor</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-professor-gray-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-professor-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-professor-gray-900">{t("uploadCV")}</h3>
                <p className="text-professor-gray-600 leading-relaxed">CV'nizi yükleyin ve AI ile analiz ettirin</p>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-professor-gray-200 bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-professor-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-professor-gray-900">{t("showCompatibility")}</h3>
                <p className="text-professor-gray-600 leading-relaxed">İş ilanları ile uyumluluk analizi yapın</p>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-professor-gray-200 bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-professor-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-professor-gray-900">{t("assistant")}</h3>
                <p className="text-professor-gray-600 leading-relaxed">Kişiselleştirilmiş geliştirme önerileri alın</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <Stats />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <Features />

      {/* CV Analysis Importance Section */}
      <CVAnalysisImportance />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-professor-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Kariyerinizi Bugün Güçlendirin</h2>
          <p className="text-xl text-professor-blue-100 mb-8">
            Binlerce kişi CareerMatchAI ile dream job'larını buldu. Sıra sizde!
          </p>
          <Button
            onClick={handleTryNow}
            size="lg"
            className="text-lg px-10 py-6 bg-professor-gold-600 hover:bg-professor-gold-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Zap className="mr-2 h-6 w-6" />
            Ücretsiz Başla
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
