import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
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

const APPLICATIONS_DIR = path.join(process.cwd(), "data")
const APPLICATIONS_FILE = path.join(APPLICATIONS_DIR, "applications.json")

async function ensureDataDirectory() {
  if (!existsSync(APPLICATIONS_DIR)) {
    await mkdir(APPLICATIONS_DIR, { recursive: true })
  }
}

async function getApplications(): Promise<Application[]> {
  try {
    await ensureDataDirectory()
    if (!existsSync(APPLICATIONS_FILE)) {
      return []
    }
    const data = await readFile(APPLICATIONS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading applications:", error)
    return []
  }
}

async function saveApplications(applications: Application[]) {
  try {
    await ensureDataDirectory()
    await writeFile(APPLICATIONS_FILE, JSON.stringify(applications, null, 2))
  } catch (error) {
    console.error("Error saving applications:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called - POST /api/applications")

    const applicationData = await request.json()
    console.log("[v0] Received application data:", applicationData)

    const newApplication: Application = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: "pending",
      ...applicationData,
    }

    console.log("[v0] Created new application object:", newApplication)

    const applications = await getApplications()
    console.log("[v0] Current applications count:", applications.length)

    applications.push(newApplication)
    await saveApplications(applications)

    console.log("[v0] Application saved successfully, new count:", applications.length)

    console.log(
      `[ICISO] New application received from ${newApplication.applicantName} for ${newApplication.organizationName}`,
    )

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: newApplication.id,
    })
  } catch (error) {
    console.error("[v0] Error processing application:", error)
    return NextResponse.json({ success: false, message: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const applications = await getApplications()
    return NextResponse.json({ success: true, applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch applications" }, { status: 500 })
  }
}
