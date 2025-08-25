import api from "./api"

export interface CVUploadResponse {
  message: string
  cv: {
    id: string
    filename: string
    uploadDate: string
  }
}

export interface CVAnalysisResponse {
  message: string
  results: {
    score: number
    strengths: string[]
    improvements: string[]
    suggestions: string[]
    analyzedAt: string
  }
}

export interface CVListResponse {
  id: string
  originalName: string
  createdAt: string
  analysisResults?: {
    overallScore: number
    analyzedAt: string
  }
}

export const cvService = {
  async uploadCV(file: File): Promise<CVUploadResponse> {
    const formData = new FormData()
    formData.append("cv", file)

    const response = await api.post("/cv/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  async getUserCVs(): Promise<CVListResponse[]> {
    const response = await api.get("/cv/list")
    return response.data
  },

  async analyzeCV(cvId: string): Promise<CVAnalysisResponse> {
    const response = await api.post(`/analysis/analyze/${cvId}`)
    return response.data
  },

  async getAnalysisResults(cvId: string) {
    const response = await api.get(`/analysis/results/${cvId}`)
    return response.data
  },
}
