
"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

// Dummy available times for a selected date
const availableTimes = ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"];

export default function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="rounded-md border shadow-sm">
        <Calendar
          mode="single"
          selected={date}
          onSelect={ (newDate) => {
            setDate(newDate);
            setSelectedTime(null); // Reset time when date changes
          }}
          className="p-0"
          // Example: disable past dates
          disabled={(day) => day < new Date(new Date().setHours(0,0,0,0))} 
        />
      </div>
      {date && (
        <div>
          <h4 className="text-md font-medium mb-2 text-center text-primary">Available Slots for {date.toLocaleDateString()}</h4>
          {availableTimes.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className="w-full justify-center"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">No slots available for this date.</p>
          )}
        </div>
      )}
      {selectedTime && date && (
         <p className="text-sm text-center text-green-600 mt-2">
          Selected: {date.toLocaleDateString()} at {selectedTime}
        </p>
      )}
    </div>
  );
}
