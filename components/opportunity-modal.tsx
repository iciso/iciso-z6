"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react"
import type { Organization, Opportunity } from "@/lib/data"
import { CalendarSelection } from "@/components/calendar-selection"

interface OpportunityModalProps {
  organization: Organization
  isOpen: boolean
  onClose: () => void
}

export function OpportunityModal({ organization, isOpen, onClose }: OpportunityModalProps) {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)

  const handleSelectOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setShowCalendar(true)
  }

  const handleBackToList = () => {
    setShowCalendar(false)
    setSelectedOpportunity(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {showCalendar && selectedOpportunity
              ? `Apply for ${selectedOpportunity.title}`
              : `Opportunities at ${organization.name}`}
          </DialogTitle>
        </DialogHeader>

        {!showCalendar ? (
          <div className="space-y-6">
            <div className="text-muted-foreground">
              <p>{organization.description}</p>
            </div>

            <div className="grid gap-4">
              {organization.opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant={opportunity.type === "volunteer" ? "default" : "secondary"}>
                            {opportunity.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {opportunity.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {opportunity.remote ? "Remote" : "On-site"}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{opportunity.theme}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-4">{opportunity.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Requirements</h4>
                        <ul className="space-y-1">
                          {opportunity.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {opportunity.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <Button className="w-full" onClick={() => handleSelectOpportunity(opportunity)}>
                      Apply for this {opportunity.type}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          selectedOpportunity && (
            <CalendarSelection
              opportunity={selectedOpportunity}
              organization={organization}
              onBack={handleBackToList}
              onClose={onClose}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  )
}
