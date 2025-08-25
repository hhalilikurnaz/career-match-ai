const mongoose = require("mongoose")

const userSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    deviceInfo: {
      userAgent: String,
      ip: String,
      browser: String,
      os: String,
      device: String,
    },
    location: {
      country: String,
      city: String,
      timezone: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
userSessionSchema.index({ userId: 1, isActive: 1 })
userSessionSchema.index({ token: 1 })
userSessionSchema.index({ expiresAt: 1 })

module.exports = mongoose.model("UserSession", userSessionSchema)
