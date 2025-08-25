const mongoose = require("mongoose")

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CV",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["cv_analysis", "job_compatibility", "improvement_suggestions"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    results: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    metadata: {
      aiModel: {
        type: String,
        default: null,
      },
      processingTime: {
        type: Number, // in milliseconds
        default: null,
      },
      version: {
        type: String,
        default: "1.0",
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
        default: null,
      },
    },
    error: {
      message: {
        type: String,
        default: null,
      },
      code: {
        type: String,
        default: null,
      },
      stack: {
        type: String,
        default: null,
      },
    },
    jobPostingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Compound indexes
analysisSchema.index({ userId: 1, cvId: 1, type: 1 })
analysisSchema.index({ status: 1, createdAt: -1 })
analysisSchema.index({ type: 1, createdAt: -1 })

module.exports = mongoose.model("Analysis", analysisSchema)
