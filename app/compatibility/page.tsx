'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth-context'
import { useLanguage } from '../contexts/language-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '../components/navbar'
import { useRouter } from 'next/navigation'
import { Target, MessageCircle, CheckCircle, AlertCircle, Brain, Sparkles, TrendingUp } from 'lucide-react'

export default function CompatibilityPage() {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [showChatbot, setShowChatbot] = useState(false)

  const analysisSteps = [
    { tr: 'CV dosyanız okunuyor...', en: 'Reading your CV...' },
    { tr: 'İş ilanı analiz ediliyor...', en: 'Analyzing job posting...' },
    { tr: 'Anahtar kelimeler karşılaştırılıyor...', en: 'Comparing keywords...' },
    { tr: 'Uyumluluk skoru hesaplanıyor...', en: 'Calculating compatibility score...' },
    { tr: 'Sonuçlar hazırlanıyor...', en: 'Preparing results...' }
  ]

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Simulate AI analysis with steps
    const stepInterval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepInterval)
          // Start score animation
          setTimeout(() => {
            setLoading(false)
            animateScore()
            // Show chatbot after score animation
            setTimeout(() => setShowChatbot(true), 2000)
          }, 1000)
          return prev
        }
      })
    }, 800)

    return () => clearInterval(stepInterval)
  }, [isAuthenticated, router])

  const animateScore = () => {
    const targetScore = 76
    const duration = 2000
    const steps = 60
    const increment = targetScore / steps
    let currentStep = 0

    const scoreInterval = setInterval(() => {
      currentStep++
      setScore(Math.min(Math.floor(increment * currentStep), targetScore))

      if (currentStep >= steps) {
        clearInterval(scoreInterval)
      }
    }, duration / steps)
  }

  const handleAssistantClick = () => {
    router.push('/assistant')
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-professor-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-professor-gray-200 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-4 border-professor-blue-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-professor-blue-600 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-4 bg-professor-blue-700 rounded-full flex items-center justify-center">
                      <Brain className="h-8 w-8 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-8 w-8 text-professor-gold-500 animate-spin" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-professor-gray-800">
                    {t('analyzing')}
                  </h2>
                  <p className="text-lg text-professor-blue-600 font-medium animate-pulse">
                    {analysisSteps[analysisStep].tr}
                  </p>
                  <Progress value={(analysisStep + 1) * 20} className="w-full max-w-md mx-auto bg-professor-gray-200 [&>*]:bg-professor-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-professor-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Score Card */}
        <Card className="mb-8 border-professor-gray-200 shadow-2xl bg-white/90 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center bg-professor-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center gap-3 text-3xl">
              <Target className="h-10 w-10" />
              {t('compatibility')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="text-8xl font-bold bg-gradient-to-r from-professor-blue-600 via-professor-blue-700 to-professor-blue-800 bg-clip-text text-transparent mb-4 animate-pulse-glow">
                  {score}%
                </div>
                <div className="absolute -top-4 -right-4">
                  <TrendingUp className="h-12 w-12 text-green-500 animate-bounce" />
                </div>
              </div>
              <p className="text-2xl text-professor-gray-700 mb-6 font-medium">
                {t('compatibilityScore').replace('{score}', score.toString())}
              </p>
              <Progress value={score} className="w-full max-w-2xl mx-auto h-4 mb-6 bg-professor-gray-200 [&>*]:bg-professor-blue-600" />

              <div className="bg-professor-blue-50 rounded-xl p-6 mb-8">
                <p className="text-professor-gray-700 text-lg leading-relaxed">
                  {t('analysisComplete')}
                </p>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover-lift shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-500 rounded-full">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-800 mb-3 text-lg">{t('strengths')}</h4>
                      <ul className="text-green-700 space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Güçlü teknik beceri eşleşmesi (%85)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>İlgili iş deneyimi mevcut</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Eğitim gereksinimleri karşılanıyor</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Anahtar kelime uyumu yüksek</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-professor-gold-200 bg-gradient-to-br from-professor-gold-50 to-professor-gold-100 hover-lift shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-professor-gold-500 rounded-full">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-professor-gold-800 mb-3 text-lg">{t('improvements')}</h4>
                      <ul className="text-professor-gold-700 space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-professor-gold-500 rounded-full"></div>
                          <span>Bazı önemli sertifikalar eksik</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-professor-gold-500 rounded-full"></div>
                          <span>Başarılar daha iyi vurgulanabilir</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-professor-gold-500 rounded-full"></div>
                          <span>Özet bölümü güçlendirilebilir</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-professor-gold-500 rounded-full"></div>
                          <span>Proje detayları artırılabilir</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Chat Bubble */}
        {showChatbot && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <div className="relative group">
              {/* Chat Bubble */}
              <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-6 max-w-sm transform transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 border border-professor-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-professor-blue-700 rounded-full">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-professor-gray-800 mb-2">AI Asistanınız</h4>
                    <p className="text-professor-gray-600 text-sm mb-3">
                      {t('improveQuestion')}
                    </p>
                    <Button 
                      onClick={handleAssistantClick}
                      size="sm"
                      className="bg-professor-blue-700 hover:bg-professor-blue-800 text-white shadow-sm"
                    >
                      Önerileri Gör
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-0 right-6 transform translate-y-full">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              </div>
              
              {/* Avatar Button */}
              <Button
                onClick={handleAssistantClick}
                className="rounded-full p-4 bg-professor-blue-700 hover:bg-professor-blue-800 shadow-2xl animate-float hover:scale-110 transition-all duration-300"
                size="lg"
              >
                <MessageCircle className="h-8 w-8" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
