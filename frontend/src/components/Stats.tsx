"use client"

import { useLanguage } from "../contexts/language-context"

export function Stats() {
  const { t } = useLanguage()

  const stats = [
    { number: "15,000+", label: t("activeUsers") },
    { number: "50,000+", label: t("cvsAnalyzed") },
    { number: "12,000+", label: t("successfulMatches") },
    { number: "94%", label: t("successRate") },
  ]

  return (
    <section className="py-20 bg-professor-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("careerMatchAINumbers")}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-professor-gold-400 mb-2">{stat.number}</div>
              <div className="text-lg text-professor-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
