'use client'

import { useLanguage } from '@/app/contexts/language-context'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'

export function FAQ() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer'),
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer'),
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer'),
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer'),
    },
  ]

  return (
    <section className="py-20 bg-professor-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">
            {t('faq')}
          </h2>
          <p className="text-xl text-professor-gray-600">
            {t('faqSubtitle')}
          </p>
        </div>

        <Card className="border-professor-gray-200 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-professor-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6" />
              {t('faq')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-professor-gray-200">
                  <AccordionTrigger className="text-lg font-semibold text-professor-gray-800 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-professor-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
