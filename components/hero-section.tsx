"use client"

import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onFindOpportunities?: () => void
}

export function HeroSection({ onFindOpportunities }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Connect with Islamic Service Organizations
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Join a global network of volunteers and interns making a difference in Islamic communities worldwide. Find
          opportunities in Quranic Studies, Dawah, and community service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8" onClick={onFindOpportunities}>
            Find Opportunities
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
            List Your Organization
          </Button>
        </div>
      </div>
    </section>
  )
}
