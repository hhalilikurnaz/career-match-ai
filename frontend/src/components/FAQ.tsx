"use client"

import { useLanguage } from "../contexts/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export function FAQ() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer"),
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer"),
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer"),
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer"),
    },
  ]

  return (
    <section className="py-20 bg-professor-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">{t("faq")}</h2>
          <p className="text-xl text-professor-gray-600">{t("faqSubtitle")}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-professor-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-professor-gray-900 hover:text-professor-blue-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-professor-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
