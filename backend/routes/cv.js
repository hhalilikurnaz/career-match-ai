const express = require("express")
const multer = require("multer")
const path = require("path")
const auth = require("../middleware/auth")
const CV = require("../models/CV")

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed"))
    }
  },
})

// Upload CV
router.post("/upload", auth, upload.single("cv"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const cv = new CV({
      userId: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
    })

    await cv.save()

    res.json({
      message: "CV uploaded successfully",
      cv: {
        id: cv._id,
        filename: cv.originalName,
        uploadDate: cv.createdAt,
      },
    })
  } catch (error) {
    console.error("CV upload error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get user's CVs
router.get("/list", auth, async (req, res) => {
  try {
    const cvs = await CV.find({ userId: req.user.id })
      .select("originalName createdAt analysisResults")
      .sort({ createdAt: -1 })

    res.json(cvs)
  } catch (error) {
    console.error("Get CVs error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
