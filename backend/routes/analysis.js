const express = require("express")
const auth = require("../middleware/auth")
const CV = require("../models/CV")

const router = express.Router()

// Analyze CV (placeholder for AI integration)
router.post("/analyze/:cvId", auth, async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.cvId, userId: req.user.id })

    if (!cv) {
      return res.status(404).json({ message: "CV not found" })
    }

    // Placeholder analysis results
    const analysisResults = {
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      strengths: ["Strong technical skills", "Good work experience", "Clear formatting"],
      improvements: ["Add more quantifiable achievements", "Include relevant keywords", "Expand on soft skills"],
      suggestions: [
        "Consider adding a professional summary",
        "Include links to portfolio or LinkedIn",
        "Use action verbs in job descriptions",
      ],
      analyzedAt: new Date(),
    }

    cv.analysisResults = analysisResults
    await cv.save()

    res.json({
      message: "CV analysis completed",
      results: analysisResults,
    })
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

module.exports = router
