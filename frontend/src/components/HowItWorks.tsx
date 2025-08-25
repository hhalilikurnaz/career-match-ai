"use client"

import { useLanguage } from "../contexts/language-context"
import { Card, CardContent } from "./ui/card"
import { Upload, Brain, Target, MessageSquare } from "lucide-react"

export function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: t("uploadCV"),
      description: t("uploadCVDescription"),
      step: "01",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: t("aiAnalysis"),
      description: t("aiAnalysisDescription"),
      step: "02",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t("compatibilityScore"),
      description: t("compatibilityScoreDescription"),
      step: "03",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: t("personalSuggestions"),
      description: t("personalSuggestionsDescription"),
      step: "04",
    },
  ]

  return (
    <section className="py-20 bg-professor-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">{t("howItWorks")}</h2>
          <p className="text-xl text-professor-gray-600 max-w-2xl mx-auto">{t("howItWorksSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-professor-gray-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-professor-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  <div className="mt-8 mb-6">
                    <div className="w-16 h-16 bg-professor-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-professor-blue-600">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-professor-gray-900 mb-3">{step.title}</h3>
                    <p className="text-professor-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-professor-blue-300 to-professor-blue-500 transform -translate-y-1/2 z-10">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-professor-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
