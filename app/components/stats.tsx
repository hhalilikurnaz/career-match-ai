'use client'

import { useLanguage } from '@/app/contexts/language-context'
import { useEffect, useState } from 'react'

export function Stats() {
  const { t } = useLanguage()
  const [counts, setCounts] = useState({ users: 0, cvs: 0, matches: 0, success: 0 })

  const finalCounts = {
    users: 15420,
    cvs: 28350,
    matches: 45680,
    success: 89
  }

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = {
      users: finalCounts.users / steps,
      cvs: finalCounts.cvs / steps,
      matches: finalCounts.matches / steps,
      success: finalCounts.success / steps
    }

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setCounts({
        users: Math.min(Math.floor(increment.users * currentStep), finalCounts.users),
        cvs: Math.min(Math.floor(increment.cvs * currentStep), finalCounts.cvs),
        matches: Math.min(Math.floor(increment.matches * currentStep), finalCounts.matches),
        success: Math.min(Math.floor(increment.success * currentStep), finalCounts.success)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      number: counts.users.toLocaleString(),
      label: t('activeUsers') // New translation key
    },
    {
      number: counts.cvs.toLocaleString(),
      label: t('cvsAnalyzed') // New translation key
    },
    {
      number: counts.matches.toLocaleString(),
      label: t('successfulMatches') // New translation key
    },
    {
      number: `${counts.success}%`,
      label: t('successRate') // New translation key
    }
  ]

  return (
    <section className="py-20 bg-professor-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('careerMatchAINumbers')} {/* New translation key */}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-professor-blue-100 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
