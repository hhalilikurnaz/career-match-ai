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
    overallScore: number
    sections: {
      personalInfo: {
        score: number
        feedback: string[]
        suggestions: string[]
      }
      experience: {
        score: number
        feedback: string[]
        suggestions: string[]
      }
      education: {
        score: number
        feedback: string[]
        suggestions: string[]
      }
      skills: {
        score: number
        feedback: string[]
        suggestions: string[]
      }
      formatting: {
        score: number
        feedback: string[]
        suggestions: string[]
      }
    }
    strengths: string[]
    improvements: string[]
    keywords: string[]
    missingKeywords: string[]
    analyzedAt: string
    aiModel: string
  }
  processingTime?: string
}

export interface JobCompatibilityResponse {
  message: string
  results: {
    compatibilityScore: number
    matchingSkills: string[]
    missingSkills: string[]
    recommendations: string[]
    detailedAnalysis: string
  }
}

export interface ImprovementSuggestionsResponse {
  message: string
  suggestions: {
    prioritySuggestions: string[]
    contentSuggestions: string[]
    formattingSuggestions: string[]
    keywordSuggestions: string[]
    overallRecommendation: string
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

  async analyzeJobCompatibility(
    cvId: string,
    jobDescription: string,
    jobTitle?: string,
  ): Promise<JobCompatibilityResponse> {
    const response = await api.post(`/analysis/job-compatibility/${cvId}`, {
      jobDescription,
      jobTitle,
    })
    return response.data
  },

  async getImprovementSuggestions(cvId: string, targetRole?: string): Promise<ImprovementSuggestionsResponse> {
    const response = await api.post(`/analysis/improve/${cvId}`, {
      targetRole,
    })
    return response.data
  },
}
