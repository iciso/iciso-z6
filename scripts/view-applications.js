const fs = require("fs").promises
const path = require("path")

const APPLICATIONS_FILE = path.join(process.cwd(), "data", "applications.json")

async function viewApplications() {
  try {
    console.log("🕌 ICISO Volunteer Applications Report")
    console.log("=====================================\n")

    const response = await fetch("http://localhost:3000/api/applications")
    const data = await response.json()

    if (!data.success) {
      console.log("Error fetching applications:", data.message)
      return
    }

    const applications = data.applications

    if (applications.length === 0) {
      console.log("No applications found.")
      return
    }

    console.log(`Total Applications: ${applications.length}\n`)

    // Group by status
    const byStatus = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    }, {})

    console.log("📊 Status Summary:")
    Object.entries(byStatus).forEach(([status, count]) => {
      console.log(`   ${status.toUpperCase()}: ${count}`)
    })
    console.log("")

    // Group by organization
    const byOrg = applications.reduce((acc, app) => {
      acc[app.organizationName] = (acc[app.organizationName] || 0) + 1
      return acc
    }, {})

    console.log("🏢 Applications by Organization:")
    Object.entries(byOrg).forEach(([org, count]) => {
      console.log(`   ${org}: ${count} applications`)
    })
    console.log("")

    // Recent applications (last 10)
    const recent = applications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10)

    console.log("📋 Recent Applications:")
    console.log("----------------------")

    recent.forEach((app, index) => {
      const date = new Date(app.timestamp).toLocaleDateString()
      console.log(`${index + 1}. ${app.applicantName} (${app.applicantEmail})`)
      console.log(`   Organization: ${app.organizationName}`)
      console.log(`   Focus Area: ${app.focusArea}`)
      console.log(`   Duration: ${app.duration}`)
      console.log(`   Status: ${app.status.toUpperCase()}`)
      console.log(`   Applied: ${date}`)
      console.log("")
    })

    console.log("💡 To view the admin dashboard, visit: http://localhost:3000/admin")
    console.log("📧 Contact applications: icisoi.club@gmail.com")
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No applications file found. No applications have been submitted yet.")
    } else {
      console.log("Error connecting to application server. Make sure the server is running on http://localhost:3000")
      console.error("Error details:", error.message)
    }
  }
}

viewApplications()
