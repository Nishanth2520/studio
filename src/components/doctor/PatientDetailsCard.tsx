
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, CalendarDays, UserCircle } from "lucide-react";

const dummyPatients = [
  { id: "P001", name: "John Doe", lastVisit: "2024-07-15", avatarText: "JD", avatarSrc: "https://placehold.co/100x100.png?text=JD", dataAiHint: "man portrait" },
  { id: "P002", name: "Jane Smith", lastVisit: "2024-07-20", avatarText: "JS", avatarSrc: "https://placehold.co/100x100.png?text=JS", dataAiHint: "woman portrait" },
  { id: "P003", name: "Alice Brown", lastVisit: "2024-07-22", avatarText: "AB", avatarSrc: "https://placehold.co/100x100.png?text=AB", dataAiHint: "person face" },
];

export default function PatientDetailsCard() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Patient Details</CardTitle>
        <Users className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">
          Access and manage patient records, medical history, and appointments.
        </CardDescription>
        
        {dummyPatients.length > 0 ? (
          <div className="space-y-4">
            {dummyPatients.map((patient) => (
              <div key={patient.id} className="flex items-center p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={patient.avatarSrc} alt={patient.name} data-ai-hint={patient.dataAiHint} />
                  <AvatarFallback>{patient.avatarText}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-primary">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {patient.id}</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  Last Visit: {patient.lastVisit}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 p-4 bg-secondary rounded-md text-center text-muted-foreground">
            <UserCircle size={48} className="mx-auto mb-2 text-muted-foreground/50" />
            <p>No patient data available currently.</p>
            <p className="text-xs">(Patient list and search will appear here)</p>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Full patient data management features will be available upon database integration.
        </p>
      </CardContent>
    </Card>
  );
}
