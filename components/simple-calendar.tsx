"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"

interface SimpleCalendarProps {
  onDateChange: (start: Date | null, end: Date | null) => void
  startDate?: Date | null
  endDate?: Date | null
}

export function SimpleCalendar({ onDateChange, startDate: propStartDate, endDate: propEndDate }: SimpleCalendarProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(propStartDate || undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(propEndDate || undefined)
  const [isSelectingEnd, setIsSelectingEnd] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (!startDate || isSelectingEnd) {
      if (!startDate) {
        setStartDate(date)
        setIsSelectingEnd(true)
        onDateChange(date, null)
      } else {
        if (date >= startDate) {
          setEndDate(date)
          setIsSelectingEnd(false)
          onDateChange(startDate, date)
        } else {
          // If selected date is before start date, make it the new start date
          setStartDate(date)
          setEndDate(undefined)
          onDateChange(date, null)
        }
      }
    } else {
      // If start date is selected and we're not selecting end, reset
      setStartDate(date)
      setEndDate(undefined)
      setIsSelectingEnd(true)
      onDateChange(date, null)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {!startDate ? "Select your start date" : !endDate ? "Select your end date" : "Dates selected"}
            </span>
          </div>

          <Calendar
            mode="single"
            selected={isSelectingEnd ? endDate : startDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />

          {startDate && endDate && (
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">Start: {formatDate(startDate)}</Badge>
              <Badge variant="secondary">End: {formatDate(endDate)}</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
