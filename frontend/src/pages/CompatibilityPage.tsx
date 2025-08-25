"use client"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cvService } from "../services/cvService"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Alert, AlertDescription } from "../components/ui/alert"
import { ArrowLeft, CheckCircle, AlertTriangle, Lightbulb, Loader2 } from "lucide-react"

interface AnalysisResults {
  score: number
  strengths: string[]
  improvements: string[]
  suggestions: string[]
  analyzedAt: string
}

export default function CompatibilityPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get data from navigation state or fetch from API
  const cvId = location.state?.cvId
  const initialResults = location.state?.analysisResults

  useEffect(() => {
    if (initialResults) {
      setAnalysisResults(initialResults)
      setLoading(false)
    } else if (cvId) {
      fetchAnalysisResults()
    } else {
      setError("CV analiz sonuçları bulunamadı.")
      setLoading(false)
    }
  }, [cvId, initialResults])

  const fetchAnalysisResults = async () => {
    try {
      const results = await cvService.getAnalysisResults(cvId)
      setAnalysisResults(results)
    } catch (error: any) {
      setError(error.response?.data?.message || "Analiz sonuçları alınırken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-professor-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-professor-blue-700" />
          <p className="text-professor-gray-600">Analiz sonuçları yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-professor-gray-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={() => navigate("/enhance")} className="w-full mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analysisResults) {
    return (
      <div className="min-h-screen bg-professor-gray-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-professor-gray-600 mb-4">Analiz sonuçları bulunamadı.</p>
            <Button onClick={() => navigate("/enhance")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Yeni Analiz Yap
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="min-h-screen bg-professor-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/enhance")}
            className="mb-4 border-professor-gray-300 text-professor-gray-700 hover:bg-professor-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>
        </div>

        {/* Score Card */}
        <Card className={`mb-8 border-2 ${getScoreBackground(analysisResults.score)}`}>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="mb-6">
              <div className={`text-6xl font-bold ${getScoreColor(analysisResults.score)} mb-2`}>
                {analysisResults.score}%
              </div>
              <h2 className="text-2xl font-semibold text-professor-gray-900 mb-4">
                CV'n bu seviyede optimize edilmiş!
              </h2>
              <Progress value={analysisResults.score} className="w-full max-w-md mx-auto h-3" />
            </div>
            <p className="text-professor-gray-600 max-w-2xl mx-auto">
              Yüklediğiniz CV analiz edildi. Bu oran teknik yeterlilikler, anahtar kelimeler ve deneyim bazında
              hesaplandı.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Güçlü Yönler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResults.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800 text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Improvements */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Geliştirilebilir Alanlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResults.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-800 text-sm">{improvement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions */}
        <Card className="border-professor-blue-200 bg-professor-blue-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-professor-blue-800">
              <Lightbulb className="h-5 w-5" />
              AI Önerileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-professor-blue-200"
                >
                  <Lightbulb className="h-5 w-5 text-professor-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-professor-blue-900 font-medium text-sm mb-1">Öneri {index + 1}</p>
                    <p className="text-professor-blue-800 text-sm">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/assistant")}
            size="lg"
            className="bg-professor-blue-700 hover:bg-professor-blue-800 text-white"
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            AI Asistanı ile Konuş
          </Button>
          <Button
            onClick={() => navigate("/enhance")}
            variant="outline"
            size="lg"
            className="border-professor-gray-300 text-professor-gray-700 hover:bg-professor-gray-100"
          >
            Yeni Analiz Yap
          </Button>
        </div>

        {/* Analysis Date */}
        <div className="text-center mt-8">
          <p className="text-sm text-professor-gray-500">
            Analiz Tarihi: {new Date(analysisResults.analyzedAt).toLocaleDateString("tr-TR")}
          </p>
        </div>
      </div>
    </div>
  )
}
