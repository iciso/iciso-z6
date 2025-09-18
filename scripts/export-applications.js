const fs = require("fs").promises
const path = require("path")

const APPLICATIONS_FILE = path.join(process.cwd(), "data", "applications.json")

async function exportApplications() {
  try {
    const data = await fs.readFile(APPLICATIONS_FILE, "utf-8")
    const applications = JSON.parse(data)

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

    // Save CSV file
    const csvFile = path.join(process.cwd(), "data", `applications-export-${Date.now()}.csv`)
    await fs.writeFile(csvFile, csvContent)

    console.log("🕌 ICISO Applications Export Complete")
    console.log("====================================")
    console.log(`📁 Exported ${applications.length} applications to: ${csvFile}`)
    console.log("📧 Send this file to: icisoi.club@gmail.com")
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No applications file found.")
    } else {
      console.error("Error exporting applications:", error.message)
    }
  }
}

exportApplications()
