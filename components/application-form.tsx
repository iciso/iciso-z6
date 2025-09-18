"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, User, Mail, Phone, FileText } from "lucide-react"
import type { Organization, Opportunity } from "@/lib/data"

interface ApplicationFormProps {
  opportunity: Opportunity
  organization: Organization
  startDate: Date
  endDate: Date
  onBack: () => void
  onClose: () => void
}

export function ApplicationForm({
  opportunity,
  organization,
  startDate,
  endDate,
  onBack,
  onClose,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    motivation: "",
    experience: "",
    availability: "",
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateDuration = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    if (diffDays < 7) return `${diffDays} days`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`
    return `${Math.ceil(diffDays / 30)} months`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const duration = calculateDuration()
    const subject = `${opportunity.type === "volunteer" ? "Volunteer" : "Internship"} Application: ${opportunity.title}`

    const body = `Dear ${organization.name} Team,

I am writing to express my interest in the ${opportunity.title} ${opportunity.type} position at your organization.

APPLICANT INFORMATION:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}

APPLICATION DETAILS:
- Position: ${opportunity.title}
- Type: ${opportunity.type}
- Theme: ${opportunity.theme}
- Start Date: ${formatDate(startDate)}
- End Date: ${formatDate(endDate)}
- Duration: ${duration}
- Location: ${opportunity.remote ? "Remote" : "On-site"}

MOTIVATION:
${formData.motivation}

RELEVANT EXPERIENCE:
${formData.experience}

AVAILABILITY:
${formData.availability}

I am excited about the opportunity to contribute to your mission and would welcome the chance to discuss my application further.

Thank you for your consideration.

Best regards,
${formData.fullName}
${formData.email}
${formData.phone}`

    // Try to extract email from website domain
    const domain = organization.website.replace(/https?:\/\//, "").split("/")[0]
    const orgEmail = `info@${domain}`

    const mailtoLink = `mailto:${orgEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(mailtoLink, "_blank")
    onClose()
  }

  const isFormValid = formData.fullName && formData.email && formData.motivation

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Calendar
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Application Summary */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Application Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">{opportunity.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{organization.name}</p>
              <div className="flex gap-2 mb-3">
                <Badge variant={opportunity.type === "volunteer" ? "default" : "secondary"}>{opportunity.type}</Badge>
                <Badge variant="outline">{opportunity.theme}</Badge>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Start: </span>
                <span className="font-medium">{formatDate(startDate)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">End: </span>
                <span className="font-medium">{formatDate(endDate)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration: </span>
                <span className="font-medium">{calculateDuration()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Location: </span>
                <span className="font-medium">{opportunity.remote ? "Remote" : "On-site"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Complete Your Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why are you interested in this {opportunity.type}? *</Label>
              <Textarea
                id="motivation"
                placeholder="Explain your motivation and what you hope to achieve..."
                rows={4}
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Relevant Experience & Skills</Label>
              <Textarea
                id="experience"
                placeholder="Describe any relevant experience, skills, or qualifications..."
                rows={3}
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Additional Availability Information</Label>
              <Textarea
                id="availability"
                placeholder="Any specific time constraints, preferred schedule, or additional information..."
                rows={2}
                value={formData.availability}
                onChange={(e) => handleInputChange("availability", e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={handleSubmit} disabled={!isFormValid}>
                <Send className="mr-2 h-4 w-4" />
                Send Application
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              * Required fields. Your application will be sent via email to the organization.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
