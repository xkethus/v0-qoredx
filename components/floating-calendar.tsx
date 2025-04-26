"use client"

import { CalendarDays } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"

export function FloatingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal border-purple-900/50 text-purple-300 hover:bg-purple-900/20",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-black/90 border-purple-900/50 p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} className="border-0 rounded-md bg-black/50" />
      </PopoverContent>
    </Popover>
  )
}
