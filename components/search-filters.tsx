"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Filter } from "lucide-react"
import { themes } from "@/lib/data"

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    search: string
    location: string
    themes: string[]
  }) => void
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [search, setSearch] = useState("")

  const toggleTheme = (themeId: string) => {
    const newThemes = selectedThemes.includes(themeId)
      ? selectedThemes.filter((id) => id !== themeId)
      : [...selectedThemes, themeId]

    setSelectedThemes(newThemes)
    onFiltersChange({ search, location, themes: newThemes })
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
    onFiltersChange({ search, location: value, themes: selectedThemes })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFiltersChange({ search: value, location, themes: selectedThemes })
  }

  const clearFilters = () => {
    setSelectedThemes([])
    setLocation("")
    setSearch("")
    onFiltersChange({ search: "", location: "", themes: [] })
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Find Your Perfect Opportunity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter city, country, or 'Remote'"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search organizations or opportunities..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Focus Areas</label>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Badge
                  key={theme.id}
                  variant={selectedThemes.includes(theme.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => toggleTheme(theme.id)}
                >
                  <span className="mr-1">{theme.icon}</span>
                  {theme.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="flex-1">Search Opportunities</Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
