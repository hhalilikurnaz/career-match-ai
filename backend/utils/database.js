const mongoose = require("mongoose")

// Database connection with retry logic
const connectWithRetry = () => {
  console.log("MongoDB connection with retry")
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    .then(() => {
      console.log("MongoDB is connected")
    })
    .catch((err) => {
      console.log("MongoDB connection unsuccessful, retry after 5 seconds.", err)
      setTimeout(connectWithRetry, 5000)
    })
}

// Graceful shutdown
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through " + msg)
    callback()
  })
}

// Connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to " + process.env.MONGODB_URI)
})

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err)
})

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected")
})

// Process termination events
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2")
  })
})

process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0)
  })
})

process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0)
  })
})

module.exports = {
  connectWithRetry,
  gracefulShutdown,
}
