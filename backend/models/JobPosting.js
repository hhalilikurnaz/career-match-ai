const mongoose = require("mongoose")

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [200, "Job title cannot exceed 200 characters"],
    },
    company: {
      name: {
        type: String,
        required: [true, "Company name is required"],
        trim: true,
        maxlength: [100, "Company name cannot exceed 100 characters"],
      },
      logo: {
        type: String,
        default: null,
      },
      website: {
        type: String,
        default: null,
      },
      size: {
        type: String,
        enum: ["startup", "small", "medium", "large", "enterprise"],
        default: null,
      },
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      maxlength: [5000, "Job description cannot exceed 5000 characters"],
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: {
      required: [String],
      preferred: [String],
      technologies: [String],
    },
    location: {
      city: String,
      country: String,
      remote: {
        type: Boolean,
        default: false,
      },
      hybrid: {
        type: Boolean,
        default: false,
      },
    },
    employment: {
      type: {
        type: String,
        enum: ["full-time", "part-time", "contract", "internship", "freelance"],
        required: true,
      },
      level: {
        type: String,
        enum: ["entry", "junior", "mid", "senior", "lead", "executive"],
        required: true,
      },
    },
    salary: {
      min: {
        type: Number,
        default: null,
      },
      max: {
        type: Number,
        default: null,
      },
      currency: {
        type: String,
        enum: ["TRY", "USD", "EUR", "GBP"],
        default: "TRY",
      },
      period: {
        type: String,
        enum: ["hourly", "monthly", "yearly"],
        default: "monthly",
      },
    },
    benefits: [String],
    applicationDeadline: {
      type: Date,
      default: null,
    },
    applicationUrl: {
      type: String,
      default: null,
    },
    contactEmail: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    applications: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    source: {
      type: String,
      enum: ["manual", "scraped", "api"],
      default: "manual",
    },
    externalId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for search and filtering
jobPostingSchema.index({ title: "text", "company.name": "text", description: "text" })
jobPostingSchema.index({ "employment.type": 1, "employment.level": 1 })
jobPostingSchema.index({ "location.city": 1, "location.country": 1 })
jobPostingSchema.index({ status: 1, featured: -1, createdAt: -1 })
jobPostingSchema.index({ "skills.required": 1 })
jobPostingSchema.index({ applicationDeadline: 1 })

module.exports = mongoose.model("JobPosting", jobPostingSchema)
