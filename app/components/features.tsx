'use client'

import { useLanguage } from '@/app/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Zap, Shield, Clock, Users } from 'lucide-react'

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('fastAnalysis'), // New translation key
      description: t('fastAnalysisDescription') // New translation key
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('securePlatform'), // New translation key
      description: t('securePlatformDescription') // New translation key
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('access247'), // New translation key
      description: t('access247Description') // New translation key
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('expertSuggestions'), // New translation key
      description: t('expertSuggestionsDescription') // New translation key
    }
  ]

  return (
    <section className="py-20 bg-professor-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">
            {t('whyCareerMatch')}
          </h2>
          <p className="text-xl text-professor-gray-600">
            {t('whyCareerMatchSubtitle')} {/* New translation key */}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-professor-gray-200 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-professor-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-professor-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-professor-gray-600 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
