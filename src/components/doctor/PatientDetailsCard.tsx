import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function PatientDetailsCard() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Patient Details</CardTitle>
        <Users className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          Access and manage patient records, medical history, and appointments.
        </CardDescription>
        <div className="mt-4 p-4 bg-secondary rounded-md text-center text-muted-foreground">
          <p>Patient data management features will be available here.</p>
          <p className="text-xs">(Example: List of patients, search functionality)</p>
        </div>
      </CardContent>
    </Card>
  );
}
