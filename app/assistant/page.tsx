'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/auth-context'
import { useLanguage } from '../contexts/language-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navbar } from '../components/navbar'
import { Assistant3D } from '../components/3d-assistant'
import { useRouter } from 'next/navigation'
import { Bot, Send, FileEdit, RotateCcw, CheckCircle, Lightbulb, Target, Zap, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function AssistantPage() {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentSuggestionIndex, setSuggestionIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Start conversation with typing effect
    setTimeout(() => {
      addBotMessage(t('assistantWelcome'))
    }, 1000)

    // Add suggestions one by one
    setTimeout(() => {
      showSuggestions()
    }, 3000)
  }, [isAuthenticated, router, t])

  const suggestions = [
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: t('suggestion1'),
      detail: 'CV\'nizin başına güçlü bir özet bölümü ekleyin. Bu, işverenlerin ilk gördüğü kısım olacak.',
      priority: 'high'
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: t('suggestion2'),
      detail: 'Başarılarınızı sayılarla destekleyin. Örneğin: "Satışları %30 artırdım" gibi.',
      priority: 'high'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: t('suggestion3'),
      detail: 'İş ilanındaki anahtar kelimeleri CV\'nizde daha fazla kullanın.',
      priority: 'medium'
    }
  ]

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const showSuggestions = () => {
    const showNextSuggestion = (index: number) => {
      if (index < suggestions.length) {
        setTimeout(() => {
          setSuggestionIndex(index + 1)
          if (index < suggestions.length - 1) {
            showNextSuggestion(index + 1)
          }
        }, 800)
      }
    }
    showNextSuggestion(0)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate bot response
    const responses = [
      'Harika soru! Bu konuda size yardımcı olabilirim.',
      'Bu önerim tam da bu konuyla ilgili. Daha detaylı açıklayabilirim.',
      'CV\'nizde bu değişikliği yaparsanız, uyumluluk skorunuz artacaktır.'
    ]

    setTimeout(() => {
      addBotMessage(responses[Math.floor(Math.random() * responses.length)])
    }, 1000)
  }

  const handleUpdateCV = () => {
    alert(t('cvUpdateFeatureComingSoon')) // New translation key
  }

  const handleRerunCompatibility = () => {
    router.push('/compatibility')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-professor-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8 h-[calc(100vh-12rem)]">
          {/* 3D Assistant Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full border-professor-gray-200 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-professor-blue-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  {t('assistant')}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 h-[calc(100%-5rem)]">
                <div className="h-2/3 relative">
                  <Assistant3D speaking={isTyping} />

                  {/* Status indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-professor-gray-700">
                      Aktif
                    </span>
                  </div>
                </div>

                {/* Assistant Info */}
                <div className="h-1/3 p-6 bg-professor-blue-50">
                  <h3 className="font-bold text-lg text-professor-gray-800 mb-2">AI Asistanınız</h3>
                  <p className="text-professor-gray-600 text-sm mb-4">
                    CV'nizi analiz ettim ve size özel öneriler hazırladım. Sorularınızı bekliyorum!
                  </p>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdateCV}
                      className="flex-1 bg-professor-gold-600 hover:bg-professor-gold-700 text-white shadow-md"
                      size="sm"
                    >
                      <FileEdit className="h-4 w-4 mr-2" />
                      {t('updateCV')}
                    </Button>

                    <Button
                      onClick={handleRerunCompatibility}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-professor-blue-300 text-professor-blue-700 hover:bg-professor-blue-100"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {t('rerunCompatibility')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat and Suggestions Panel */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Suggestions */}
            <Card className="border-professor-gray-200 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-professor-blue-700 text-white rounded-t-lg">
                <CardTitle>AI Önerileri</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {suggestions.slice(0, currentSuggestionIndex).map((suggestion, index) => (
                    <Card
                      key={index}
                      className={`border-l-4 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 ${
                        suggestion.priority === 'high'
                          ? 'border-l-red-500 bg-red-50'
                          : 'border-l-professor-gold-500 bg-professor-gold-50'
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${
                            suggestion.priority === 'high'
                              ? 'bg-red-500 text-white'
                              : 'bg-professor-gold-500 text-white'
                          }`}>
                            {suggestion.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-professor-gray-800">
                                {suggestion.title}
                              </h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                suggestion.priority === 'high'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-professor-gold-100 text-professor-gold-800'
                              }`}>
                                {suggestion.priority === 'high' ? 'Yüksek' : 'Orta'} Öncelik
                              </span>
                            </div>
                            <p className="text-professor-gray-600 text-sm leading-relaxed">
                              {suggestion.detail}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="flex-1 border-professor-gray-200 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-professor-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Sohbet
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 h-80 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                          message.isBot
                            ? 'bg-professor-blue-100 text-professor-blue-900'
                            : 'bg-professor-gray-100 text-professor-gray-900'
                        }`}
                      >
                        {message.isBot && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-4 w-4 text-professor-blue-600" />
                            <span className="text-xs font-semibold text-professor-gray-700">AI Asistan</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-professor-blue-100 p-3 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-professor-blue-600" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-professor-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-professor-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-professor-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-professor-gray-200 bg-professor-gray-50 rounded-b-lg">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={t('askAnything')}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border-2 border-professor-gray-200 focus:border-professor-blue-500 rounded-full px-4 py-2"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-professor-blue-700 hover:bg-professor-blue-800 text-white rounded-full p-2 shadow-md"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
