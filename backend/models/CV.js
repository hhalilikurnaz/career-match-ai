const mongoose = require("mongoose")

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: [true, "Original filename is required"],
      trim: true,
    },
    filename: {
      type: String,
      required: [true, "Filename is required"],
      unique: true,
    },
    filePath: {
      type: String,
      required: [true, "File path is required"],
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"],
      max: [5 * 1024 * 1024, "File size cannot exceed 5MB"],
    },
    mimeType: {
      type: String,
      required: true,
      enum: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    },
    extractedText: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "analyzed", "error"],
      default: "uploaded",
    },
    analysisResults: {
      overallScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },
      sections: {
        personalInfo: {
          score: { type: Number, min: 0, max: 100 },
          feedback: [String],
          suggestions: [String],
        },
        experience: {
          score: { type: Number, min: 0, max: 100 },
          feedback: [String],
          suggestions: [String],
        },
        education: {
          score: { type: Number, min: 0, max: 100 },
          feedback: [String],
          suggestions: [String],
        },
        skills: {
          score: { type: Number, min: 0, max: 100 },
          feedback: [String],
          suggestions: [String],
        },
        formatting: {
          score: { type: Number, min: 0, max: 100 },
          feedback: [String],
          suggestions: [String],
        },
      },
      strengths: [String],
      improvements: [String],
      keywords: [String],
      missingKeywords: [String],
      analyzedAt: {
        type: Date,
        default: null,
      },
      aiModel: {
        type: String,
        default: null,
      },
    },
    jobCompatibility: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "JobPosting",
        },
        compatibilityScore: {
          type: Number,
          min: 0,
          max: 100,
        },
        matchingSkills: [String],
        missingSkills: [String],
        recommendations: [String],
        analyzedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    notes: {
      type: String,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better performance
cvSchema.index({ userId: 1, createdAt: -1 })
cvSchema.index({ status: 1 })
cvSchema.index({ "analysisResults.overallScore": -1 })

// Virtual for file URL
cvSchema.virtual("fileUrl").get(function () {
  return `/api/cv/download/${this._id}`
})

module.exports = mongoose.model("CV", cvSchema)
