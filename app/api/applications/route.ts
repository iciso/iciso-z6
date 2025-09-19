import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

interface Application {
  id: string
  timestamp: string
  applicantName: string
  applicantEmail: string
  organizationName: string
  opportunityTitle: string
  opportunityType: "volunteer" | "internship"
  location: string
  focusArea: string
  startDate: string
  endDate: string
  duration: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
}

const applications: Application[] = []
const DATA_DIR = path.join(process.cwd(), "data")
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json")

async function ensureDataDirectory() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function loadApplicationsFromFile(): Promise<Application[]> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(APPLICATIONS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveApplicationsToFile(applications: Application[]) {
  try {
    await ensureDataDirectory()
    await fs.writeFile(APPLICATIONS_FILE, JSON.stringify(applications, null, 2))
  } catch (error) {
    console.error("[v0] Error saving applications to file:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called - POST /api/applications")

    const applicationData = await request.json()
    console.log("[v0] Received application data:", applicationData)

    const requiredFields = ["applicantName", "applicantEmail", "organizationName", "opportunityTitle"]
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        console.error(`[v0] Missing required field: ${field}`)
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const newApplication: Application = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: "pending",
      applicantName: applicationData.applicantName,
      applicantEmail: applicationData.applicantEmail,
      organizationName: applicationData.organizationName,
      opportunityTitle: applicationData.opportunityTitle,
      opportunityType: applicationData.opportunityType || "volunteer",
      location: applicationData.location || "",
      focusArea: applicationData.focusArea || "",
      startDate: applicationData.startDate || "",
      endDate: applicationData.endDate || "",
      duration: applicationData.duration || "",
    }

    console.log("[v0] Created new application object:", newApplication)

    const existingApplications = await loadApplicationsFromFile()
    existingApplications.push(newApplication)

    applications.push(newApplication)
    await saveApplicationsToFile(existingApplications)

    console.log("[v0] Application saved successfully, total count:", applications.length)
    console.log(
      `[ICISO] New application received from ${newApplication.applicantName} for ${newApplication.organizationName}`,
    )

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Thank you for your interest in volunteering.",
      applicationId: newApplication.id,
    })
  } catch (error) {
    console.error("[v0] Error processing application:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "Unknown error")
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    console.log("[v0] API route called - GET /api/applications")

    const fileApplications = await loadApplicationsFromFile()
    console.log("[v0] Applications loaded from file:", fileApplications.length)

    return NextResponse.json({
      success: true,
      applications: fileApplications,
      count: fileApplications.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching applications:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch applications" }, { status: 500 })
  }
}
