
import Link from "next/link";
import Chatbot from "@/components/user/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

// Removed UserDashboardPageProps interface and searchParams from props
export default function UserDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Your Health Companion</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome! Use our AI Symptom Helper or book an appointment.
        </p>
      </div>
      
      <div className="mb-8 flex justify-center">
        <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
          <Link href="/dashboard/book-appointment">
            <CalendarPlus className="mr-2 h-5 w-5" />
            Book an Appointment
          </Link>
        </Button>
      </div>

      <div className="flex justify-center">
        <Chatbot />
      </div>

      <Card className="mt-12 bg-secondary/70 border-primary/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-primary">Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base text-foreground/80">
            The information provided by the AI Symptom Helper is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or received from the AI Symptom Helper.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
