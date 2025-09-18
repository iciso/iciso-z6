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

  const handleApply = (opportunityTitle: string) => {
    const subject = `Volunteer/Internship Application - ${opportunityTitle}`
    const body = `Dear ${organization.name} Team,

Assalamu Alaikum,

I am writing to express my interest in the "${opportunityTitle}" opportunity at your organization.

Please find my details below:
- Name: [Your Full Name]
- Email: [Your Email]
- Phone: [Your Phone Number]
- Preferred Duration: [Start Date] to [End Date]
- Relevant Experience: [Brief description of relevant experience]

I am excited about the opportunity to contribute to your mission and would welcome the chance to discuss how I can support your important work.

Jazak Allah Khair for your time and consideration.

Best regards,
[Your Name]`

    const mailtoLink = `mailto:info@${organization.website.replace("https://", "").replace("http://", "")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, "_blank")
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
              Quick Apply - {organization.opportunities[0].title}
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
