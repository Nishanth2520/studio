import PatientDetailsCard from "@/components/doctor/PatientDetailsCard";
import UserInquiriesCard from "@/components/doctor/UserInquiriesCard";
import MedicalResourcesCard from "@/components/doctor/MedicalResourcesCard";
import { Separator } from "@/components/ui/separator";

export default function DoctorDashboardPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Doctor Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome, Doctor. Access patient information, inquiries, and resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PatientDetailsCard />
        </div>
        <div className="lg:col-span-1 row-span-1 md:row-span-2">
           <MedicalResourcesCard />
        </div>
        <div className="lg:col-span-2">
          <UserInquiriesCard />
        </div>
      </div>
      
      <Separator className="my-12" />

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary">Quick Actions</h2>
        <p className="text-muted-foreground mb-4">Future quick action links or tools can be placed here.</p>
        {/* Placeholder for future quick actions */}
        <div className="flex justify-center gap-4">
            <div className="h-20 w-40 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground shadow-md">Action 1</div>
            <div className="h-20 w-40 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground shadow-md">Action 2</div>
            <div className="h-20 w-40 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground shadow-md">Action 3</div>
        </div>
      </div>
    </div>
  );
}
