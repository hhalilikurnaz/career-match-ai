'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth-context'
import { useLanguage } from '../contexts/language-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Navbar } from '../components/navbar'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Briefcase, Bot, Link, CheckCircle, Target } from 'lucide-react'

export default function EnhancePage() {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jobFile, setJobFile] = useState<File | null>(null)
  const [jobLink, setJobLink] = useState('')
  const [jobInputType, setJobInputType] = useState<'file' | 'link'>('file')
  const [assistantMessage, setAssistantMessage] = useState(t('assistantGuidanceCV'))
  const [isTyping, setIsTyping] = useState(true)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Typing animation effect for assistant message
  useEffect(() => {
    const messageToType = cvFile ? (jobFile || jobLink ? t('welcomeMessage') : t('assistantGuidanceJob')) : t('assistantGuidanceCV');
    
    if (isTyping && typedText.length < messageToType.length) {
      const timeout = setTimeout(() => {
        setTypedText(messageToType.slice(0, typedText.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else if (typedText.length === messageToType.length) {
      setIsTyping(false)
    }
  }, [typedText, cvFile, jobFile, jobLink, isTyping, t])

  useEffect(() => {
    setTypedText(''); // Reset typed text when dependencies change
    setIsTyping(true);
  }, [cvFile, jobFile, jobLink]);


  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCvFile(file)
    }
  }

  const handleJobUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setJobFile(file)
      setJobLink('')
    }
  }

  const handleJobLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobLink(e.target.value)
    if (e.target.value) {
      setJobFile(null)
    }
  }

  const handleShowCompatibility = () => {
    if (cvFile && (jobFile || jobLink)) {
      // Store files/data in localStorage for demo purposes
      localStorage.setItem('cvFileName', cvFile.name)
      if (jobFile) {
        localStorage.setItem('jobFileName', jobFile.name)
        localStorage.setItem('jobType', 'file')
      } else {
        localStorage.setItem('jobLink', jobLink)
        localStorage.setItem('jobType', 'link')
      }
      router.push('/compatibility')
    }
  }

  const canProceed = cvFile && (jobFile || jobLink.trim())

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-professor-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* AI Assistant Welcome Message */}
        <Card className="mb-8 border-professor-blue-200 bg-professor-blue-50 animate-fade-in shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-professor-blue-700 rounded-full animate-pulse-glow">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-professor-blue-800">AI Asistanınız</h3>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                <p className="text-professor-blue-800 font-medium text-lg">
                  {typedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* CV Upload */}
          <Card className="hover-lift transition-all duration-500 hover:shadow-2xl group border-professor-gray-200">
            <CardHeader className="bg-professor-blue-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                {t('uploadCV')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label htmlFor="cv-upload" className="cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    cvFile 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-professor-gray-300 hover:border-professor-blue-400 hover:bg-professor-blue-50 group-hover:border-professor-blue-500'
                  }`}>
                    {cvFile ? (
                      <div className="space-y-3">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                        <p className="text-green-700 font-medium">{cvFile.name}</p>
                        <p className="text-sm text-green-600">{t('cvUploaded')}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-12 w-12 text-professor-gray-400 mx-auto group-hover:text-professor-blue-500 transition-colors" />
                        <p className="text-professor-gray-600 group-hover:text-professor-blue-600">
                          CV dosyanızı buraya sürükleyin veya tıklayın
                        </p>
                        <p className="text-sm text-professor-gray-500">PDF, DOC, DOCX</p>
                      </div>
                    )}
                  </div>
                </Label>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Job Post Upload/Link */}
          <Card className="hover-lift transition-all duration-500 hover:shadow-2xl group border-professor-gray-200">
            <CardHeader className="bg-professor-gold-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                {t('uploadJobPost')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={jobInputType} onValueChange={(value) => setJobInputType(value as 'file' | 'link')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-professor-gray-100">
                  <TabsTrigger value="file" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-professor-gray-900">
                    <Upload className="h-4 w-4" />
                    Dosya
                  </TabsTrigger>
                  <TabsTrigger value="link" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-professor-gray-900">
                    <Link className="h-4 w-4" />
                    Link
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="file" className="space-y-4">
                  <Label htmlFor="job-upload" className="cursor-pointer">
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      jobFile 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-professor-gray-300 hover:border-professor-gold-400 hover:bg-professor-gold-50 group-hover:border-professor-gold-500'
                    }`}>
                      {jobFile ? (
                        <div className="space-y-3">
                          <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                          <p className="text-green-700 font-medium">{jobFile.name}</p>
                          <p className="text-sm text-green-600">{t('jobUploaded')}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="h-12 w-12 text-professor-gray-400 mx-auto group-hover:text-professor-gold-500 transition-colors" />
                          <p className="text-professor-gray-600 group-hover:text-professor-gold-600">
                            İş ilanı dosyasını buraya sürükleyin
                          </p>
                          <p className="text-sm text-professor-gray-500">PDF, DOC, DOCX, TXT</p>
                        </div>
                      )}
                    </div>
                  </Label>
                  <Input
                    id="job-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleJobUpload}
                    className="hidden"
                  />
                </TabsContent>
                
                <TabsContent value="link" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="job-link" className="text-professor-gray-700">{t('enterJobLink')}</Label>
                    <Input
                      id="job-link"
                      type="url"
                      placeholder="https://example.com/job-posting"
                      value={jobLink}
                      onChange={handleJobLinkChange}
                      className="text-base border-professor-gray-300 focus:border-professor-gold-500"
                    />
                    {jobLink && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                          Link kaydedildi: {jobLink}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Show Compatibility Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={handleShowCompatibility}
            disabled={!canProceed}
            size="lg"
            className={`px-12 py-6 text-lg font-semibold rounded-full transition-all duration-300 ${
              canProceed 
                ? 'bg-professor-blue-700 hover:bg-professor-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-glow' 
                : 'bg-professor-gray-300 text-professor-gray-600 cursor-not-allowed'
            }`}
          >
            <Target className="mr-3 h-6 w-6" />
            {t('showCompatibility')}
            {canProceed && <span className="ml-2">✨</span>}
          </Button>
          
          {!canProceed && (
            <p className="mt-4 text-professor-gray-500 text-sm">
              Devam etmek için CV ve iş ilanı yüklemeniz gerekiyor
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
