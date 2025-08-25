"use client"

import { useLanguage } from "../contexts/language-context"
import { Card, CardContent } from "./ui/card"
import { Zap, Shield, Clock, Users } from "lucide-react"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: t("fastAnalysis"),
      description: t("fastAnalysisDescription"),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("securePlatform"),
      description: t("securePlatformDescription"),
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t("access247"),
      description: t("access247Description"),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("expertSuggestions"),
      description: t("expertSuggestionsDescription"),
    },
  ]

  return (
    <section className="py-20 bg-professor-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">{t("whyCareerMatch")}</h2>
          <p className="text-xl text-professor-gray-600">Modern AI teknolojisi ile CV'nizi güçlendirin</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-professor-gray-200 bg-white/70 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-professor-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-professor-gray-900 mb-2">{feature.title}</h3>
                <p className="text-professor-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
