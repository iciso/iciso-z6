"use client"

import { useMemo } from "react"
import { organizations } from "@/lib/data"
import { OrganizationCard } from "@/components/organization-card"
import { Search } from "lucide-react" // Fixed import to use lucide-react instead of non-existent icons file

interface OrganizationGridProps {
  filters: {
    search: string
    location: string
    themes: string[]
  }
}

export function OrganizationGrid({ filters }: OrganizationGridProps) {
  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          org.name.toLowerCase().includes(searchLower) ||
          org.description.toLowerCase().includes(searchLower) ||
          org.opportunities.some(
            (opp) =>
              opp.title.toLowerCase().includes(searchLower) || opp.description.toLowerCase().includes(searchLower),
          )
        if (!matchesSearch) return false
      }

      // Location filter
      if (filters.location) {
        const locationLower = filters.location.toLowerCase()
        const matchesLocation =
          org.location.toLowerCase().includes(locationLower) ||
          (locationLower === "remote" && org.opportunities.some((opp) => opp.remote))
        if (!matchesLocation) return false
      }

      // Theme filter
      if (filters.themes.length > 0) {
        const hasMatchingTheme = filters.themes.some((filterTheme) =>
          org.themes.some(
            (orgTheme) =>
              orgTheme.toLowerCase().replace(/\s+/g, "-") === filterTheme ||
              orgTheme.toLowerCase() === filterTheme.replace(/-/g, " "),
          ),
        )
        if (!hasMatchingTheme) return false
      }

      return true
    })
  }, [filters])

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {filters.search || filters.location || filters.themes.length > 0
            ? "Search Results"
            : "Featured Organizations"}
        </h2>
        <p className="text-muted-foreground">
          {filteredOrgs.length} organization{filteredOrgs.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {filteredOrgs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No organizations found</h3>
            <p>Try adjusting your search criteria or browse all organizations.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrgs.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      )}
    </section>
  )
}
