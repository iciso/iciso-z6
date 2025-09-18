"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OrganizationGrid } from "@/components/organization-grid"
import { GuidedSearch } from "@/components/guided-search"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    themes: [] as string[],
  })
  const [showSearch, setShowSearch] = useState(false)

  const handleGuidedSearch = (searchData: {
    location: string
    theme: string
    startDate: Date | null
    endDate: Date | null
  }) => {
    // Convert guided search data to filter format
    const locationMap: { [key: string]: string } = {
      americas: "United States",
      mena: "Gambia",
    }

    const themeMap: { [key: string]: string } = {
      "quranic-studies": "quranic-studies",
      islamophobia: "islamophobia",
      dawah: "dawah",
      "islamic-education": "islamic-education",
    }

    setFilters({
      search: "",
      location: locationMap[searchData.location] || "",
      themes: searchData.theme ? [themeMap[searchData.theme]] : [],
    })
  }

  const handleFindOpportunities = () => {
    setShowSearch(true)
    // Scroll to search section
    setTimeout(() => {
      const searchElement = document.getElementById("search-section")
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onFindOpportunities={handleFindOpportunities} />
        <div className="container mx-auto px-4 py-8">
          {showSearch && (
            <div id="search-section">
              <GuidedSearch onSearch={handleGuidedSearch} />
            </div>
          )}
          <OrganizationGrid filters={filters} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
