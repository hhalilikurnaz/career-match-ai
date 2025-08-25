const express = require("express")
const auth = require("../middleware/auth")
const CV = require("../models/CV")
const Analysis = require("../models/Analysis")
const aiService = require("../services/aiService")

const router = express.Router()

// Analyze CV (placeholder for AI integration)
router.post("/analyze/:cvId", auth, async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.cvId, userId: req.user.id })

    if (!cv) {
      return res.status(404).json({ message: "CV not found" })
    }

    // Update CV status to processing
    cv.status = "processing"
    await cv.save()

    // Create analysis record
    const analysis = new Analysis({
      userId: req.user.id,
      cvId: cv._id,
      type: "cv_analysis",
      status: "processing",
    })
    await analysis.save()

    try {
      // Extract text from CV if not already extracted
      if (!cv.extractedText) {
        console.log("[v0] Extracting text from CV file...")
        cv.extractedText = await aiService.extractTextFromFile(cv.filePath, cv.mimeType)
        await cv.save()
      }

      // Analyze CV with AI
      console.log("[v0] Starting AI analysis...")
      const startTime = Date.now()
      const analysisResults = await aiService.analyzeCVWithAI(cv.extractedText)
      const processingTime = Date.now() - startTime

      // Update CV with analysis results
      cv.analysisResults = analysisResults
      cv.status = "analyzed"
      await cv.save()

      // Update analysis record
      analysis.status = "completed"
      analysis.results = analysisResults
      analysis.metadata = {
        aiModel: "gpt-4",
        processingTime,
        version: "1.0",
        confidence: 0.85,
      }
      await analysis.save()

      console.log("[v0] AI analysis completed successfully")

      res.json({
        message: "CV analysis completed",
        results: analysisResults,
        processingTime: `${processingTime}ms`,
      })
    } catch (aiError) {
      console.error("[v0] AI analysis failed:", aiError)

      // Update status to error
      cv.status = "error"
      await cv.save()

      analysis.status = "failed"
      analysis.error = {
        message: aiError.message,
        code: "AI_ANALYSIS_ERROR",
      }
      await analysis.save()

      res.status(500).json({
        message: "AI analysis failed",
        error: aiError.message,
      })
    }
  } catch (error) {
    console.error("CV analysis error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get analysis results
router.get("/results/:cvId", auth, async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.cvId, userId: req.user.id })

    if (!cv) {
      return res.status(404).json({ message: "CV not found" })
    }

    if (!cv.analysisResults) {
      return res.status(404).json({ message: "No analysis results found" })
    }

    res.json(cv.analysisResults)
  } catch (error) {
    console.error("Get analysis results error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/job-compatibility/:cvId", auth, async (req, res) => {
  try {
    const { jobDescription, jobTitle } = req.body

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" })
    }

    const cv = await CV.findOne({ _id: req.params.cvId, userId: req.user.id })

    if (!cv) {
      return res.status(404).json({ message: "CV not found" })
    }

    // Extract text if not available
    if (!cv.extractedText) {
      cv.extractedText = await aiService.extractTextFromFile(cv.filePath, cv.mimeType)
      await cv.save()
    }

    // Analyze job compatibility
    const compatibilityResult = await aiService.analyzeJobCompatibility(cv.extractedText, jobDescription)

    // Add to CV's job compatibility array
    cv.jobCompatibility.push({
      compatibilityScore: compatibilityResult.compatibilityScore,
      matchingSkills: compatibilityResult.matchingSkills,
      missingSkills: compatibilityResult.missingSkills,
      recommendations: compatibilityResult.recommendations,
      analyzedAt: new Date(),
    })
    await cv.save()

    res.json({
      message: "Job compatibility analysis completed",
      results: compatibilityResult,
    })
  } catch (error) {
    console.error("Job compatibility analysis error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/improve/:cvId", auth, async (req, res) => {
  try {
    const { targetRole } = req.body

    const cv = await CV.findOne({ _id: req.params.cvId, userId: req.user.id })

    if (!cv) {
      return res.status(404).json({ message: "CV not found" })
    }

    // Extract text if not available
    if (!cv.extractedText) {
      cv.extractedText = await aiService.extractTextFromFile(cv.filePath, cv.mimeType)
      await cv.save()
    }

    // Generate improvement suggestions
    const suggestions = await aiService.generateImprovementSuggestions(cv.extractedText, targetRole)

    res.json({
      message: "Improvement suggestions generated",
      suggestions,
    })
  } catch (error) {
    console.error("Improvement suggestions error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
