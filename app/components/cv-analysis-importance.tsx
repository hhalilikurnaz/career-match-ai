'use client'

import { useLanguage } from '@/app/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Lightbulb, Search, TrendingUp } from 'lucide-react'

export function CVAnalysisImportance() {
  const { t } = useLanguage()

  const points = [
    {
      icon: <Search className="h-6 w-6" />,
      title: t('atsCompatibilityTitle'),
      description: t('atsCompatibilityDescription'),
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: t('personalizedFeedbackTitle'),
      description: t('personalizedFeedbackDescription'),
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('careerAdvancementTitle'),
      description: t('careerAdvancementDescription'),
    },
  ]

  return (
    <section className="py-20 bg-professor-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">
            {t('cvAnalysisImportanceTitle')}
          </h2>
          <p className="text-xl text-professor-gray-600 max-w-2xl mx-auto">
            {t('cvAnalysisImportanceSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-professor-gray-200 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-professor-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {point.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-professor-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-professor-gray-600 text-sm">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
