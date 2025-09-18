"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OrganizationGrid } from "@/components/organization-grid"
import { SearchFilters } from "@/components/search-filters"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    themes: [] as string[],
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <SearchFilters onFiltersChange={setFilters} />
          <OrganizationGrid filters={filters} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
