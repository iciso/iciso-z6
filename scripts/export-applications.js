const fs = require("fs").promises
const path = require("path")

const APPLICATIONS_FILE = path.join(process.cwd(), "data", "applications.json")

async function exportApplications() {
  try {
    const response = await fetch("http://localhost:3000/api/applications")
    const data = await response.json()

    if (!data.success) {
      console.log("Error fetching applications:", data.message)
      return
    }

    const applications = data.applications

    if (applications.length === 0) {
      console.log("No applications to export.")
      return
    }

    // Create CSV content
    const headers = [
      "ID",
      "Timestamp",
      "Applicant Name",
      "Email",
      "Organization",
      "Opportunity",
      "Type",
      "Location",
      "Focus Area",
      "Start Date",
      "End Date",
      "Duration",
      "Status",
    ]

    const csvContent = [
      headers.join(","),
      ...applications.map((app) =>
        [
          app.id,
          app.timestamp,
          `"${app.applicantName}"`,
          app.applicantEmail,
          `"${app.organizationName}"`,
          `"${app.opportunityTitle}"`,
          app.opportunityType,
          `"${app.location}"`,
          `"${app.focusArea}"`,
          app.startDate,
          app.endDate,
          `"${app.duration}"`,
          app.status,
        ].join(","),
      ),
    ].join("\n")

    const exportsDir = path.join(process.cwd(), "exports")
    try {
      await fs.mkdir(exportsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Save CSV file
    const csvFile = path.join(exportsDir, `applications-export-${Date.now()}.csv`)
    await fs.writeFile(csvFile, csvContent)

    console.log("🕌 ICISO Applications Export Complete")
    console.log("====================================")
    console.log(`📁 Exported ${applications.length} applications to: ${csvFile}`)
    console.log("📧 Send this file to: icisoi.club@gmail.com")
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No applications file found.")
    } else {
      console.log("Error connecting to application server. Make sure the server is running on http://localhost:3000")
      console.error("Error details:", error.message)
    }
  }
}

exportApplications()
