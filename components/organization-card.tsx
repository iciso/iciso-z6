"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Globe, Calendar, Users, Mail } from "lucide-react"
import type { Organization } from "@/lib/data"
import { OpportunityModal } from "@/components/opportunity-modal"

interface OrganizationCardProps {
  organization: Organization
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleApply = async (
    opportunityTitle: string,
    applicantData?: {
      name: string
      email: string
      startDate: string
      endDate: string
      duration: string
    },
  ) => {
    if (!applicantData) {
      // If no applicant data provided, open modal for detailed application
      setIsModalOpen(true)
      return
    }

    try {
      const applicationData = {
        applicantName: applicantData.name,
        applicantEmail: applicantData.email,
        organizationName: organization.name,
        opportunityTitle: opportunityTitle,
        opportunityType: organization.opportunities.find((opp) => opp.title === opportunityTitle)?.type || "volunteer",
        location: organization.location,
        focusArea: organization.themes.join(", "),
        startDate: applicantData.startDate,
        endDate: applicantData.endDate,
        duration: applicantData.duration,
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })

      const result = await response.json()

      if (result.success) {
        alert(
          `Alhamdulillah! Your application has been submitted successfully. Application ID: ${result.applicationId}`,
        )
      } else {
        alert("Sorry, there was an error submitting your application. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Sorry, there was an error submitting your application. Please try again.")
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image src={organization.image || "/placeholder.svg"} alt={organization.name} fill className="object-cover" />
        </div>

        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{organization.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {organization.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Est. {organization.established}
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-3">{organization.description}</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {organization.themes.map((theme) => (
                  <Badge key={theme} variant="secondary" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {organization.opportunities.length} opportunities
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="space-y-2">
          <Button className="w-full" size="lg" onClick={() => setIsModalOpen(true)}>
            View Opportunities
          </Button>
          {organization.opportunities.length > 0 && (
            <Button
              variant="outline"
              className="w-full bg-transparent"
              size="sm"
              onClick={() => handleApply(organization.opportunities[0].title)}
            >
              <Mail className="h-4 w-4 mr-2" />
              Apply - {organization.opportunities[0].title}
            </Button>
          )}
        </CardFooter>
      </Card>

      <OpportunityModal
        organization={organization}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />
    </>
  )
}
