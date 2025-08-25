"use client"

import { useLanguage } from "../contexts/language-context"
import { Card, CardContent } from "./ui/card"
import { CheckCircle, Target, TrendingUp } from "lucide-react"

export function CVAnalysisImportance() {
  const { t } = useLanguage()

  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: t("atsCompatibilityTitle"),
      description: t("atsCompatibilityDescription"),
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t("personalizedFeedbackTitle"),
      description: t("personalizedFeedbackDescription"),
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t("careerAdvancementTitle"),
      description: t("careerAdvancementDescription"),
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">
            {t("cvAnalysisImportanceTitle")}
          </h2>
          <p className="text-xl text-professor-gray-600 max-w-3xl mx-auto">{t("cvAnalysisImportanceSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-professor-gray-200 bg-professor-gray-50/50"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-professor-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-professor-blue-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-professor-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-professor-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
