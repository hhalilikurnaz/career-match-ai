"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"
import { useLanguage } from "../contexts/language-context"
import {
  cvService,
  type CVAnalysisResponse,
  type JobCompatibilityResponse,
  type ImprovementSuggestionsResponse,
} from "../services/cvService"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Upload, FileText, CheckCircle, Loader2, AlertCircle, Brain, Target, Lightbulb } from "lucide-react"

export default function EnhancePage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isJobAnalyzing, setIsJobAnalyzing] = useState(false)
  const [isImprovementAnalyzing, setIsImprovementAnalyzing] = useState(false)
  const [uploadedCvId, setUploadedCvId] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<CVAnalysisResponse["results"] | null>(null)
  const [jobCompatibilityResults, setJobCompatibilityResults] = useState<JobCompatibilityResponse["results"] | null>(
    null,
  )
  const [improvementSuggestions, setImprovementSuggestions] = useState<
    ImprovementSuggestionsResponse["suggestions"] | null
  >(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        setError("Sadece PDF, DOC ve DOCX dosyaları desteklenmektedir.")
        return
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Dosya boyutu 5MB'dan küçük olmalıdır.")
        return
      }

      setCvFile(file)
      setError(null)
    }
  }

  const handleJobUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setJobDescription(file.name) // Placeholder for actual job description extraction
    }
  }

  const handleUploadCV = async () => {
    if (!cvFile) {
      setError("Lütfen bir CV dosyası seçin.")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const response = await cvService.uploadCV(cvFile)
      setUploadedCvId(response.cv.id)
      setSuccess("CV başarıyla yüklendi!")
    } catch (error: any) {
      setError(error.response?.data?.message || "CV yüklenirken bir hata oluştu.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedCvId) {
      setError("Önce CV'nizi yüklemelisiniz.")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await cvService.analyzeCV(uploadedCvId)
      setAnalysisResults(response.results)
      setSuccess(`CV analizi tamamlandı! (${response.processingTime || "N/A"})`)
    } catch (error: any) {
      setError(error.response?.data?.message || "CV analizi sırasında bir hata oluştu.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleJobCompatibilityAnalysis = async () => {
    if (!uploadedCvId || !jobDescription.trim()) {
      setError("CV yüklü olmalı ve iş tanımı girilmelidir.")
      return
    }

    setIsJobAnalyzing(true)
    setError(null)

    try {
      const response = await cvService.analyzeJobCompatibility(uploadedCvId, jobDescription)
      setJobCompatibilityResults(response.results)
      setSuccess("İş uyumluluğu analizi tamamlandı!")
    } catch (error: any) {
      setError(error.response?.data?.message || "İş uyumluluğu analizi sırasında bir hata oluştu.")
    } finally {
      setIsJobAnalyzing(false)
    }
  }

  const handleImprovementSuggestions = async () => {
    if (!uploadedCvId) {
      setError("Önce CV'nizi yüklemelisiniz.")
      return
    }

    setIsImprovementAnalyzing(true)
    setError(null)

    try {
      const response = await cvService.getImprovementSuggestions(uploadedCvId, targetRole || undefined)
      setImprovementSuggestions(response.suggestions)
      setSuccess("Geliştirme önerileri oluşturuldu!")
    } catch (error: any) {
      setError(error.response?.data?.message || "Geliştirme önerileri oluşturulurken bir hata oluştu.")
    } finally {
      setIsImprovementAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-professor-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-professor-gray-900 mb-4">Hoş geldin, {user?.name}!</h1>
          <p className="text-xl text-professor-gray-600">AI destekli CV analizi ile kariyerini güçlendir.</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* CV Upload */}
          <Card className="border-professor-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-professor-gray-900">
                <FileText className="h-5 w-5" />
                {t("uploadCV")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="cv-upload" className="text-professor-gray-700">
                  CV Dosyanızı Seçin (PDF, DOC, DOCX - Max 5MB)
                </Label>
                <div className="relative">
                  <Input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvUpload}
                    className="border-professor-gray-300 focus:border-professor-blue-500"
                  />
                  {cvFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      {cvFile.name}
                    </div>
                  )}
                </div>

                {cvFile && !uploadedCvId && (
                  <Button
                    onClick={handleUploadCV}
                    disabled={isUploading}
                    className="w-full bg-professor-blue-700 hover:bg-professor-blue-800"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        CV'yi Yükle
                      </>
                    )}
                  </Button>
                )}

                {uploadedCvId && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">CV başarıyla yüklendi!</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-professor-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-professor-gray-900">
                <Target className="h-5 w-5" />
                İş Uyumluluğu Analizi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="job-description" className="text-professor-gray-700">
                    İş Tanımı
                  </Label>
                  <Textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="İş ilanının detaylarını buraya yapıştırın..."
                    className="min-h-[120px] border-professor-gray-300 focus:border-professor-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="target-role" className="text-professor-gray-700">
                    Hedef Pozisyon (Opsiyonel)
                  </Label>
                  <Input
                    id="target-role"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="Örn: Frontend Developer, Product Manager"
                    className="border-professor-gray-300 focus:border-professor-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={handleAnalyze}
            disabled={!uploadedCvId || isAnalyzing}
            className="bg-professor-blue-700 hover:bg-professor-blue-800 text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analiz Ediliyor...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                AI CV Analizi
              </>
            )}
          </Button>

          <Button
            onClick={handleJobCompatibilityAnalysis}
            disabled={!uploadedCvId || !jobDescription.trim() || isJobAnalyzing}
            variant="outline"
            className="border-professor-blue-700 text-professor-blue-700 hover:bg-professor-blue-50 bg-transparent"
          >
            {isJobAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analiz Ediliyor...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                İş Uyumluluğu
              </>
            )}
          </Button>

          <Button
            onClick={handleImprovementSuggestions}
            disabled={!uploadedCvId || isImprovementAnalyzing}
            variant="outline"
            className="border-professor-green-700 text-professor-green-700 hover:bg-professor-green-50 bg-transparent"
          >
            {isImprovementAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Oluşturuluyor...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Geliştirme Önerileri
              </>
            )}
          </Button>
        </div>

        {analysisResults && (
          <Card className="mb-8 border-professor-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-professor-blue-900">
                <Brain className="h-5 w-5" />
                AI CV Analizi Sonuçları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-professor-blue-700 mb-2">
                    {analysisResults.overallScore}/100
                  </div>
                  <p className="text-professor-gray-600">Genel CV Puanı</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-professor-green-700 mb-2">Güçlü Yönler</h4>
                    <ul className="space-y-1">
                      {analysisResults.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-professor-green-600 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-professor-orange-700 mb-2">Geliştirilmesi Gerekenler</h4>
                    <ul className="space-y-1">
                      {analysisResults.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-professor-orange-600 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-professor-gray-700 mb-2">Anahtar Kelimeler</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-professor-blue-100 text-professor-blue-800">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {jobCompatibilityResults && (
          <Card className="mb-8 border-professor-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-professor-green-900">
                <Target className="h-5 w-5" />
                İş Uyumluluğu Analizi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-professor-green-700 mb-2">
                    {jobCompatibilityResults.compatibilityScore}%
                  </div>
                  <p className="text-professor-gray-600">Uyumluluk Oranı</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-professor-green-700 mb-2">Eşleşen Yetenekler</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobCompatibilityResults.matchingSkills.map((skill, index) => (
                        <Badge key={index} className="bg-professor-green-100 text-professor-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-professor-red-700 mb-2">Eksik Yetenekler</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobCompatibilityResults.missingSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="bg-professor-red-100 text-professor-red-800"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-professor-gray-700 mb-2">Öneriler</h4>
                  <ul className="space-y-2">
                    {jobCompatibilityResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Lightbulb className="h-4 w-4 text-professor-yellow-600 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {improvementSuggestions && (
          <Card className="mb-8 border-professor-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-professor-purple-900">
                <Lightbulb className="h-5 w-5" />
                Geliştirme Önerileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-professor-red-700 mb-3">Öncelikli Öneriler</h4>
                  <ul className="space-y-2">
                    {improvementSuggestions.prioritySuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-professor-red-600 mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-professor-blue-700 mb-3">İçerik Önerileri</h4>
                    <ul className="space-y-1">
                      {improvementSuggestions.contentSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <FileText className="h-4 w-4 text-professor-blue-600 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-professor-green-700 mb-3">Format Önerileri</h4>
                    <ul className="space-y-1">
                      {improvementSuggestions.formattingSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-professor-green-600 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-professor-purple-50 rounded-lg">
                  <h4 className="font-semibold text-professor-purple-800 mb-2">Genel Öneri</h4>
                  <p className="text-professor-purple-700 text-sm">{improvementSuggestions.overallRecommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assistant Guidance */}
        <div className="text-center">
          <Card className="border-professor-blue-200 bg-professor-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-professor-blue-700 rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-professor-blue-800">
                {!cvFile
                  ? "İlk olarak CV'ni seçmelisin!"
                  : !uploadedCvId
                    ? "Şimdi CV'ni yükle!"
                    : "Harika! AI analizi ile CV'ni güçlendirebiliriz."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
