
import DoctorSelection from "@/components/user/booking/DoctorSelection";
import AppointmentCalendar from "@/components/user/booking/AppointmentCalendar";
import BookingForm from "@/components/user/booking/BookingForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function BookAppointmentPage() {
  // In a real app, state would manage selected doctor, date, time, etc.
  // const [selectedDoctor, setSelectedDoctor] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Book an Appointment</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find a doctor and schedule your consultation.
        </p>
      </div>

      <Alert variant="default" className="mb-8 bg-accent/50 border-accent text-accent-foreground">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="font-semibold">Work in Progress</AlertTitle>
        <AlertDescription>
          This appointment booking system is currently a demonstration. Full functionality including real-time availability and booking confirmation will be implemented soon.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary">1. Select a Doctor</CardTitle>
              <CardDescription>Choose from available specialists.</CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorSelection />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary">2. Pick Date & Time</CardTitle>
              <CardDescription>Select a convenient slot.</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentCalendar />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary">3. Your Details</CardTitle>
              <CardDescription>Confirm your information.</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm />
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="text-center">
        <p className="text-muted-foreground">
          Once you've completed all steps, your appointment request will be submitted.
        </p>
        {/* Add a submit button here later that becomes active when all steps are done */}
      </div>
    </div>
  );
}
