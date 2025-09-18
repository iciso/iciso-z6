"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CalendarIcon, Clock, MapPin, Send, User } from "lucide-react"
import type { Organization, Opportunity } from "@/lib/data"

interface CalendarSelectionProps {
  opportunity: Opportunity
  organization: Organization
  onBack: () => void
  onClose: () => void
  onApply?: (
    opportunityTitle: string,
    applicantData?: {
      name: string
      email: string
      startDate: string
      endDate: string
      duration: string
    },
  ) => void
  startDate?: Date | null
  endDate?: Date | null
  onDateChange?: (start: Date | null, end: Date | null) => void
}

export function CalendarSelection({
  opportunity,
  organization,
  onBack,
  onClose,
  onApply,
  startDate: propStartDate,
  endDate: propEndDate,
  onDateChange,
}: CalendarSelectionProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(propStartDate || undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(propEndDate || undefined)
  const [isSelectingEnd, setIsSelectingEnd] = useState(false)

  const [applicantName, setApplicantName] = useState("")
  const [applicantEmail, setApplicantEmail] = useState("")
  const [motivation, setMotivation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (!startDate || isSelectingEnd) {
      if (!startDate) {
        setStartDate(date)
        setIsSelectingEnd(true)
        onDateChange?.(date, null)
      } else {
        if (date >= startDate) {
          setEndDate(date)
          setIsSelectingEnd(false)
          onDateChange?.(startDate, date)
        } else {
          // If selected date is before start date, make it the new start date
          setStartDate(date)
          setEndDate(undefined)
          onDateChange?.(date, null)
        }
      }
    } else {
      // If start date is selected and we're not selecting end, reset
      setStartDate(date)
      setEndDate(undefined)
      setIsSelectingEnd(true)
      onDateChange?.(date, null)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateDuration = () => {
    if (!startDate || !endDate) return null
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    if (diffDays < 7) return `${diffDays} days`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`
    return `${Math.ceil(diffDays / 30)} months`
  }

  const handleSubmitApplication = async () => {
    if (!startDate || !endDate || !applicantName || !applicantEmail) return

    setIsSubmitting(true)

    try {
      const applicationData = {
        name: applicantName,
        email: applicantEmail,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        duration: calculateDuration() || "",
      }

      if (onApply) {
        await onApply(opportunity.title, applicationData)
        onClose()
      }
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = startDate && endDate && applicantName.trim() && applicantEmail.trim()

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Opportunities
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Your {opportunity.type === "volunteer" ? "Volunteer" : "Internship"} Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Opportunity Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={opportunity.type === "volunteer" ? "default" : "secondary"}>
                      {opportunity.type}
                    </Badge>
                    <Badge variant="outline">{opportunity.theme}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Suggested duration: {opportunity.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {opportunity.remote ? "Remote" : "On-site"}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {!startDate
                    ? "Select your start date"
                    : !endDate
                      ? "Select your end date"
                      : "Adjust your dates if needed"}
                </p>
              </div>

              <Calendar
                mode="single"
                selected={isSelectingEnd ? endDate : startDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />

              {(startDate || endDate) && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Selected Period</h4>
                  <div className="space-y-2 text-sm">
                    {startDate && (
                      <div>
                        <span className="text-muted-foreground">Start: </span>
                        <span className="font-medium">{formatDate(startDate)}</span>
                      </div>
                    )}
                    {endDate && (
                      <div>
                        <span className="text-muted-foreground">End: </span>
                        <span className="font-medium">{formatDate(endDate)}</span>
                      </div>
                    )}
                    {startDate && endDate && (
                      <div>
                        <span className="text-muted-foreground">Duration: </span>
                        <span className="font-medium">{calculateDuration()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Application Form Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="motivation">Motivation & Experience (Optional)</Label>
                <Textarea
                  id="motivation"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Tell us why you're interested in this opportunity and any relevant experience..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h4 className="font-medium text-emerald-900 mb-2">Application Summary</h4>
                <div className="space-y-1 text-sm text-emerald-800">
                  <div>
                    <strong>Organization:</strong> {organization.name}
                  </div>
                  <div>
                    <strong>Position:</strong> {opportunity.title}
                  </div>
                  <div>
                    <strong>Type:</strong> {opportunity.type}
                  </div>
                  {startDate && endDate && (
                    <div>
                      <strong>Duration:</strong> {calculateDuration()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={handleSubmitApplication} disabled={!isFormValid || isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
                <Button variant="outline" onClick={onBack}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
