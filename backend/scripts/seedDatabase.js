const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("../models/User")
const JobPosting = require("../models/JobPosting")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected for seeding")
  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1)
  }
}

const seedUsers = async () => {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10)
    const admin = new User({
      name: "Admin User",
      email: "admin@careermatchai.com",
      password: adminPassword,
      role: "admin",
      isEmailVerified: true,
    })

    // Create test user
    const userPassword = await bcrypt.hash("user123", 10)
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: userPassword,
      role: "user",
      isEmailVerified: true,
    })

    await User.deleteMany({}) // Clear existing users
    await admin.save()
    await testUser.save()

    console.log("Users seeded successfully")
  } catch (error) {
    console.error("Error seeding users:", error)
  }
}

const seedJobPostings = async () => {
  try {
    const sampleJobs = [
      {
        title: "Frontend Developer",
        company: {
          name: "TechCorp",
          website: "https://techcorp.com",
          size: "medium",
        },
        description: "We are looking for a skilled Frontend Developer to join our team...",
        requirements: ["3+ years React experience", "TypeScript knowledge", "CSS/SCSS proficiency"],
        responsibilities: ["Develop user interfaces", "Collaborate with design team", "Optimize performance"],
        skills: {
          required: ["React", "JavaScript", "HTML", "CSS"],
          preferred: ["TypeScript", "Next.js", "Tailwind CSS"],
          technologies: ["Git", "Webpack", "Jest"],
        },
        location: {
          city: "Istanbul",
          country: "Turkey",
          remote: true,
          hybrid: true,
        },
        employment: {
          type: "full-time",
          level: "mid",
        },
        salary: {
          min: 15000,
          max: 25000,
          currency: "TRY",
          period: "monthly",
        },
        benefits: ["Health insurance", "Flexible hours", "Remote work"],
        status: "active",
        featured: true,
      },
      {
        title: "Backend Developer",
        company: {
          name: "StartupXYZ",
          website: "https://startupxyz.com",
          size: "startup",
        },
        description: "Join our growing startup as a Backend Developer...",
        requirements: ["Node.js experience", "Database design", "API development"],
        responsibilities: ["Build scalable APIs", "Database optimization", "System architecture"],
        skills: {
          required: ["Node.js", "MongoDB", "Express.js"],
          preferred: ["AWS", "Docker", "Microservices"],
          technologies: ["Git", "Redis", "Nginx"],
        },
        location: {
          city: "Ankara",
          country: "Turkey",
          remote: false,
          hybrid: true,
        },
        employment: {
          type: "full-time",
          level: "senior",
        },
        salary: {
          min: 20000,
          max: 35000,
          currency: "TRY",
          period: "monthly",
        },
        benefits: ["Stock options", "Learning budget", "Team events"],
        status: "active",
        featured: false,
      },
    ]

    await JobPosting.deleteMany({}) // Clear existing jobs
    await JobPosting.insertMany(sampleJobs)

    console.log("Job postings seeded successfully")
  } catch (error) {
    console.error("Error seeding job postings:", error)
  }
}

const seedDatabase = async () => {
  await connectDB()
  await seedUsers()
  await seedJobPostings()
  await mongoose.connection.close()
  console.log("Database seeding completed")
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
}

module.exports = { seedDatabase }
