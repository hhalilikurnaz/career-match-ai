import api from "./api"

export interface JobPosting {
  id: string
  title: string
  company: {
    name: string
    logo?: string
  }
  description: string
  requirements: string[]
  skills: {
    required: string[]
    preferred: string[]
  }
  location: {
    city: string
    country: string
    remote: boolean
  }
  employment: {
    type: string
    level: string
  }
  salary?: {
    min: number
    max: number
    currency: string
  }
}

export interface JobCompatibilityResult {
  jobId: string
  compatibilityScore: number
  matchingSkills: string[]
  missingSkills: string[]
  recommendations: string[]
}

export const jobService = {
  async getJobPostings(page = 1, limit = 10): Promise<{ jobs: JobPosting[]; total: number }> {
    const response = await api.get(`/jobs?page=${page}&limit=${limit}`)
    return response.data
  },

  async getJobById(jobId: string): Promise<JobPosting> {
    const response = await api.get(`/jobs/${jobId}`)
    return response.data
  },

  async analyzeJobCompatibility(cvId: string, jobId: string): Promise<JobCompatibilityResult> {
    const response = await api.post("/analysis/job-compatibility", {
      cvId,
      jobId,
    })
    return response.data
  },

  async searchJobs(query: string, filters?: any): Promise<JobPosting[]> {
    const response = await api.get("/jobs/search", {
      params: { q: query, ...filters },
    })
    return response.data
  },
}
