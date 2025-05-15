
// This is a new public page for booking appointments.
// It mirrors src/app/dashboard/book-appointment/page.tsx but is accessible without login.
"use client";

import Header from "@/components/shared/Header";
import DoctorSelection from "@/components/user/booking/DoctorSelection";
import AppointmentCalendar from "@/components/user/booking/AppointmentCalendar";
import BookingForm from "@/components/user/booking/BookingForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Logo } from "@/components/icons/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicBookAppointmentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/10">
        <div className="container mx-auto py-10 px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary">Book an Appointment</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Find a doctor and schedule your consultation.
            </p>
          </div>

          <Alert variant="default" className="mb-8 bg-accent/50 border-accent text-accent-foreground">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="font-semibold">Demonstration System</AlertTitle>
            <AlertDescription>
              This appointment booking system is currently a demonstration. Full functionality including real-time availability and booking confirmation will be implemented soon. For full features, please <Link href="/login" className="underline hover:text-primary/80">login or create an account</Link>.
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
            <p className="text-muted-foreground mb-4">
              Once you've completed all steps, your appointment request will be submitted (as part of this demo).
            </p>
            <Button asChild size="lg">
                <Link href="/login">Login or Sign Up for Full Features</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="py-8 border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <Logo size={24} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MediConsult AI. Your health, intelligently managed.
          </p>
          <p className="text-xs text-muted-foreground">
            This is a demonstration. Always consult with a qualified healthcare professional for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
