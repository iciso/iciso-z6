"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarSelection } from "@/components/calendar-selection"
import { MapPin, BookOpen, Calendar, Search } from "lucide-react"

interface GuidedSearchProps {
  onSearch: (filters: {
    location: string
    theme: string
    startDate: Date | null
    endDate: Date | null
  }) => void
}

export function GuidedSearch({ onSearch }: GuidedSearchProps) {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState("")
  const [theme, setTheme] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const locations = [
    { value: "americas", label: "Americas" },
    { value: "mena", label: "MENA (Middle East & North Africa)" },
  ]

  const themes = [
    { value: "quranic-studies", label: "📖 Quranic Studies", icon: "📖" },
    { value: "islamophobia", label: "🤝 Islamophobia", icon: "🤝" },
    { value: "dawah", label: "💬 Dawah", icon: "💬" },
    { value: "islamic-education", label: "🎓 Islamic Education", icon: "🎓" },
  ]

  const handleLocationSelect = (value: string) => {
    setLocation(value)
    setStep(2)
  }

  const handleThemeSelect = (value: string) => {
    setTheme(value)
    setStep(3)
  }

  const handleDateSelection = (start: Date | null, end: Date | null) => {
    setStartDate(start)
    setEndDate(end)
    if (start && end) {
      setStep(4)
    }
  }

  const handleSearch = () => {
    onSearch({
      location,
      theme,
      startDate,
      endDate,
    })
  }

  const resetSearch = () => {
    setStep(1)
    setLocation("")
    setTheme("")
    setStartDate(null)
    setEndDate(null)
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Find Your Perfect Opportunity</h3>
          </div>

          {/* Step Progress Indicator */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 4 && <div className={`w-12 h-0.5 mx-2 ${step > stepNum ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Location Selection */}
          {step >= 1 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium text-foreground">Step 1: Select Location</label>
              </div>
              <Select value={location} onValueChange={handleLocationSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your preferred region" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {location && (
                <Badge variant="secondary" className="w-fit">
                  Selected: {locations.find((l) => l.value === location)?.label}
                </Badge>
              )}
            </div>
          )}

          {/* Step 2: Theme Selection */}
          {step >= 2 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium text-foreground">Step 2: Select Focus Area</label>
              </div>
              <Select value={theme} onValueChange={handleThemeSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your area of interest" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((themeOption) => (
                    <SelectItem key={themeOption.value} value={themeOption.value}>
                      {themeOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {theme && (
                <Badge variant="secondary" className="w-fit">
                  Selected: {themes.find((t) => t.value === theme)?.label}
                </Badge>
              )}
            </div>
          )}

          {/* Step 3: Date Selection */}
          {step >= 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium text-foreground">Step 3: Select Duration</label>
              </div>
              <CalendarSelection onDateChange={handleDateSelection} startDate={startDate} endDate={endDate} />
              {startDate && endDate && (
                <Badge variant="secondary" className="w-fit">
                  Duration: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </Badge>
              )}
            </div>
          )}

          {/* Step 4: Search Button */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" onClick={handleSearch} disabled={!location || !theme || !startDate || !endDate}>
              {step === 4 ? "Search Opportunities" : "Complete All Steps to Search"}
            </Button>
            <Button variant="outline" onClick={resetSearch}>
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
