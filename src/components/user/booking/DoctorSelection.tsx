
"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, ShieldCheck } from "lucide-react";

const dummyDoctors = [
  { id: "doc1", name: "Dr. Emily Carter", specialization: "Cardiology", avatar: "https://placehold.co/100x100.png?text=EC", dataAiHint: "doctor woman" },
  { id: "doc2", name: "Dr. Johnathan Lee", specialization: "Pediatrics", avatar: "https://placehold.co/100x100.png?text=JL", dataAiHint: "doctor man" },
  { id: "doc3", name: "Dr. Sarah Green", specialization: "Dermatology", avatar: "https://placehold.co/100x100.png?text=SG", dataAiHint: "doctor portrait" },
];

export default function DoctorSelection() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {dummyDoctors.map((doctor) => (
        <Card 
          key={doctor.id} 
          className={`transition-all duration-200 ease-in-out hover:shadow-md ${selectedDoctorId === doctor.id ? 'ring-2 ring-primary' : 'border-border'}`}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint={doctor.dataAiHint} />
              <AvatarFallback>{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-md text-primary">{doctor.name}</h4>
              <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
            </div>
            <Button 
              variant={selectedDoctorId === doctor.id ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedDoctorId(doctor.id)}
            >
              {selectedDoctorId === doctor.id ? <UserCheck className="mr-2 h-4 w-4" /> : <ShieldCheck className="mr-2 h-4 w-4" /> }
              {selectedDoctorId === doctor.id ? "Selected" : "Select"}
            </Button>
          </CardContent>
        </Card>
      ))}
      {selectedDoctorId && (
        <p className="text-sm text-center text-green-600 mt-2">
          Selected: {dummyDoctors.find(doc => doc.id === selectedDoctorId)?.name}
        </p>
      )}
       {!dummyDoctors.length && <p className="text-sm text-muted-foreground text-center py-4">No doctors available at the moment.</p>}
    </div>
  );
}
