"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, CalendarIcon, Clock, MapPin, Mail } from "lucide-react"
import type { Organization, Opportunity } from "@/lib/data"

interface CalendarSelectionProps {
  opportunity: Opportunity
  organization: Organization
  onBack: () => void
  onClose: () => void
  onApply?: (opportunityTitle: string) => void
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

  const handleApplyWithEmail = () => {
    if (!startDate || !endDate) return

    const subject = `${opportunity.type === "volunteer" ? "Volunteer" : "Internship"} Application - ${opportunity.title}`
    const body = `Assalamu Alaikum wa Rahmatullahi wa Barakatuh,

Dear ${organization.name} Team,

I hope this message finds you in the best of health and Iman. I am writing to express my sincere interest in the "${opportunity.title}" ${opportunity.type} opportunity at your esteemed organization.

APPLICATION DETAILS:
• Position: ${opportunity.title}
• Type: ${opportunity.type === "volunteer" ? "Volunteer Position" : "Internship Program"}
• Preferred Start Date: ${formatDate(startDate)}
• Preferred End Date: ${formatDate(endDate)}
• Duration: ${calculateDuration()}
• Location Preference: ${opportunity.remote ? "Remote" : "On-site"}

PERSONAL INFORMATION:
• Full Name: [Please enter your full name]
• Email: [Please enter your email address]
• Phone: [Please enter your phone number]
• Location: [Please enter your current location]

MOTIVATION & QUALIFICATIONS:
I am deeply motivated to contribute to your organization's mission and believe this ${opportunity.type} opportunity aligns perfectly with my goals of serving the Muslim community. 

[Please describe your relevant experience, skills, and motivation for applying to this specific opportunity]

AVAILABILITY:
I am available for the full duration mentioned above and can commit to the responsibilities outlined in the opportunity description.

I would be honored to discuss my application further and am available for an interview at your convenience. Thank you for considering my application and for the important work your organization does for our community.

Jazak Allah Khair for your time and consideration.

Barakallahu feeki/feeka,
[Your Name]

---
This application was submitted through the ICISO Volunteer Matching Platform.
Organization: ${organization.name}
Website: ${organization.website}`

    const emailAddress = "icisoi.club@gmail.com"
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Open email client
    window.open(mailtoLink, "_blank")

    // Close modal after sending
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Opportunities
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Your {opportunity.type === "volunteer" ? "Volunteer" : "Internship"} Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Opportunity Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant={opportunity.type === "volunteer" ? "default" : "secondary"}>{opportunity.type}</Badge>
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

              {(startDate || endDate) && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
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

            <div>
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
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="flex-1" onClick={handleApplyWithEmail} disabled={!startDate || !endDate}>
              <Mail className="mr-2 h-4 w-4" />
              Send Application Email
            </Button>
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
