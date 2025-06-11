
"use client";

import React, { useEffect, useState, useMemo, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, CalendarDays, Clock, User, Briefcase, Star, StarHalf, Loader2, ShieldCheck, FileText, Phone, Mail, Users, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

// Define Doctor type matching the one in homepage
interface Doctor {
  id: string;
  name: string;
  age: number;
  experience: number; // years
  specialization: string;
  rating: number; // 0-5
  avatar: string;
  dataAiHint: string;
  bio?: string;
}

// Dummy doctors list (should ideally come from a shared source or API)
const DUMMY_DOCTORS: Doctor[] = [
  { id: 'doc1', name: 'Dr. Emily Carter', age: 45, experience: 15, specialization: 'Cardiology', rating: 4.5, avatar: 'https://placehold.co/100x100.png?text=EC', dataAiHint: 'doctor woman', bio: 'Dr. Carter is a renowned cardiologist with 15 years of experience in treating complex heart conditions.' },
  { id: 'doc2', name: 'Dr. Johnathan Lee', age: 52, experience: 20, specialization: 'Pediatrics', rating: 5, avatar: 'https://placehold.co/100x100.png?text=JL', dataAiHint: 'doctor man', bio: 'Dr. Lee is a highly-rated pediatrician dedicated to children\'s health and well-being.' },
  { id: 'doc3', name: 'Dr. Sarah Green', age: 38, experience: 10, specialization: 'Dermatology', rating: 4.2, avatar: 'https://placehold.co/100x100.png?text=SG', dataAiHint: 'doctor portrait', bio: 'Dr. Green specializes in dermatological conditions, offering expert care for skin health.' },
  { id: 'doc4', name: 'Dr. Michael Brown', age: 48, experience: 18, specialization: 'Cardiology', rating: 4.8, avatar: 'https://placehold.co/100x100.png?text=MB', dataAiHint: 'doctor male', bio: 'Dr. Brown is a leading cardiologist known for his patient-centric approach.' },
  { id: 'doc5', name: 'Dr. Linda White', age: 55, experience: 25, specialization: 'Cardiology', rating: 4.9, avatar: 'https://placehold.co/100x100.png?text=LW', dataAiHint: 'doctor senior', bio: 'With 25 years in cardiology, Dr. White brings extensive expertise to her practice.' },
  { id: 'doc6', name: 'Dr. Kevin Harris', age: 42, experience: 12, specialization: 'Pulmonology', rating: 4.3, avatar: 'https://placehold.co/100x100.png?text=KH', dataAiHint: 'doctor medical', bio: 'Dr. Harris focuses on respiratory illnesses and lung health.' },
  { id: 'doc7', name: 'Dr. Jessica Davis', age: 39, experience: 9, specialization: 'Pulmonology', rating: 4.0, avatar: 'https://placehold.co/100x100.png?text=JD', dataAiHint: 'doctor female', bio: 'Dr. Davis is committed to providing comprehensive pulmonology care.' },
  { id: 'doc8', name: 'Dr. Brian Wilson', age: 60, experience: 30, specialization: 'Cardiology', rating: 5, avatar: 'https://placehold.co/100x100.png?text=BW', dataAiHint: 'doctor experienced', bio: 'Dr. Wilson is a top cardiologist with three decades of experience in advanced heart care.' },
  { id: 'doc9', name: 'Dr. Olivia Martinez', age: 41, experience: 13, specialization: 'Dermatology', rating: 4.6, avatar: 'https://placehold.co/100x100.png?text=OM', dataAiHint: 'doctor skin', bio: 'Dr. Martinez offers expert dermatological treatments and cosmetic procedures.' },
  { id: 'doc10', name: 'Dr. David Rodriguez', age: 47, experience: 17, specialization: 'Pediatrics', rating: 4.7, avatar: 'https://placehold.co/100x100.png?text=DR', dataAiHint: 'doctor children', bio: 'Dr. Rodriguez provides compassionate pediatric care for infants, children, and adolescents.' },
  { id: 'doc11', name: 'Dr. Sophia Miller', age: 35, experience: 8, specialization: 'Cardiology', rating: 4.1, avatar: 'https://placehold.co/100x100.png?text=SM', dataAiHint: 'heart specialist', bio: 'Dr. Miller is a rising cardiologist with a focus on preventative heart health.' },
  { id: 'doc12', name: 'Dr. James Anderson', age: 50, experience: 22, specialization: 'Pulmonology', rating: 4.8, avatar: 'https://placehold.co/100x100.png?text=JA', dataAiHint: 'doctor lungs', bio: 'Dr. Anderson is a respected pulmonologist with extensive experience in lung diseases.' },
  { id: 'doc13', name: 'Dr. Ava Thomas', age: 43, experience: 14, specialization: 'Cardiology', rating: 4.3, avatar: 'https://placehold.co/100x100.png?text=AT', dataAiHint: 'professional doctor', bio: 'Dr. Thomas provides expert cardiac care with a focus on patient education.' },
  { id: 'doc14', name: 'Dr. Noah Jackson', age: 37, experience: 9, specialization: 'Pediatrics', rating: 4.4, avatar: 'https://placehold.co/100x100.png?text=NJ', dataAiHint: 'young doctor', bio: 'Dr. Jackson is a dedicated pediatrician known for his friendly approach with children.' },
  { id: 'doc15', name: 'Dr. Isabella White', age: 51, experience: 19, specialization: 'Dermatology', rating: 4.9, avatar: 'https://placehold.co/100x100.png?text=IW', dataAiHint: 'female specialist', bio: 'Dr. White is a leading dermatologist specializing in advanced skin treatments.' },
  { id: 'doc16', name: 'Dr. Lucas Harris', age: 46, experience: 16, specialization: 'Pulmonology', rating: 4.5, avatar: 'https://placehold.co/100x100.png?text=LH', dataAiHint: 'experienced male', bio: 'Dr. Harris provides comprehensive care for all types of respiratory conditions.' },
  { id: 'doc17', name: 'Dr. Mia Martin', age: 40, experience: 11, specialization: 'Pediatrics', rating: 4.6, avatar: 'https://placehold.co/100x100.png?text=MM', dataAiHint: 'kind doctor', bio: 'Dr. Martin is a compassionate pediatrician with a focus on holistic child health.' },
  { id: 'doc18', name: 'Dr. Ethan Thompson', age: 53, experience: 23, specialization: 'Dermatology', rating: 4.7, avatar: 'https://placehold.co/100x100.png?text=ET', dataAiHint: 'professional male', bio: 'Dr. Thompson is an experienced dermatologist offering a wide range of skin care services.' },
];

const StarRating = ({ rating, className }: { rating: number, className?: string }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
      {halfStar && <StarHalf key="half" className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)}
      <span className="ml-1.5 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  );
};

const bookingFormSchema = z.object({
  appointmentDate: z.date({ required_error: "Please select a date." }),
  appointmentTime: z.string().min(1, "Please select a time slot."),
  patientName: z.string().min(2, "Full name must be at least 2 characters."),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format. Use YYYY-MM-DD." })
                   .refine((val) => new Date(val) < new Date(), { message: "Date of birth must be in the past." }),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"], { required_error: "Please select a gender." }),
  email: z.string().email("Invalid email address."),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format."),
  consultationType: z.enum(["in-person", "video", "phone"], { required_error: "Please select consultation type." }),
  reasonForVisit: z.string().min(10, "Reason must be at least 10 characters.").max(500, "Reason must be 500 characters or less."),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and privacy policy." }),
  agreeToReminders: z.boolean().optional(),
  // Optional insurance fields
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Dummy available times
const DUMMY_TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];


export default function PublicBookAppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user: authUser, loading: authLoading } = useAuth();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingDoctor, setIsLoadingDoctor] = useState(true);
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      patientName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: undefined,
      consultationType: undefined,
      reasonForVisit: "",
      agreeToTerms: false,
      agreeToReminders: false,
      insuranceProvider: "",
      policyNumber: "",
    },
  });

  // Memoize doctorIdFromSearch to potentially stabilize dependencies for the useEffect below
  const doctorIdFromSearch = useMemo(() => searchParams.get('doctorId'), [searchParams]);

  useEffect(() => {
    // Use the memoized doctorIdFromSearch
    if (doctorIdFromSearch) {
      const doctor = DUMMY_DOCTORS.find(d => d.id === doctorIdFromSearch);
      if (doctor) {
        setSelectedDoctor(doctor);
      } else {
        toast({ title: "Error", description: "Doctor not found.", variant: "destructive" });
        router.push('/'); 
      }
    } else {
        toast({ title: "Error", description: "No doctor selected.", variant: "destructive" });
        router.push('/'); 
    }
    setIsLoadingDoctor(false);
  }, [doctorIdFromSearch, router]); // Removed DUMMY_DOCTORS and toast from deps as they are stable or setters

  useEffect(() => {
    if (authUser && !form.getValues("patientName")) {
      form.setValue("patientName", authUser.displayName || "");
      form.setValue("email", authUser.email || "");
    }
  }, [authUser, form]);

  useEffect(() => {
    // Simulate fetching available times when a date is selected
    const selectedDate = form.watch("appointmentDate");
    if (selectedDate) {
      // In a real app, you'd fetch this from a backend
      setAvailableTimes(DUMMY_TIMES); 
    } else {
      setAvailableTimes([]);
    }
  }, [form, form.watch("appointmentDate")]);


  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking Submitted:", data);
    toast({
      title: "Appointment Requested (Demo)",
      description: `Your request for ${selectedDoctor?.name} on ${format(data.appointmentDate, "PPP")} at ${data.appointmentTime} is submitted.`,
    });
    // router.push('/booking-confirmation'); // Or some confirmation page
    form.reset(); 
  };

  if (isLoadingDoctor || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner size={64} />
      </div>
    );
  }

  if (!selectedDoctor) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-secondary/10 py-10">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-semibold text-destructive">Doctor Not Found</h1>
            <p className="text-muted-foreground">The selected doctor could not be found. Please try again.</p>
            <Button onClick={() => router.push('/')} className="mt-4">Go to Homepage</Button>
          </div>
        </main>
      </div>
    );
  }

  const ProgressIndicator = ({ currentStep }: { currentStep: number }) => {
    const steps = ["Doctor", "Date & Time", "Your Details", "Confirm"];
    return (
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 my-4 text-xs sm:text-sm">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className={cn(
              "flex flex-col items-center",
              index < currentStep ? "text-primary" : "text-muted-foreground",
              index === currentStep -1 ? "font-semibold" : ""
            )}>
              <div className={cn(
                "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2",
                index < currentStep ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground",
                 index === currentStep -1 ? "border-primary scale-110" : ""
              )}>
                {index < currentStep -1 ? <ShieldCheck size={16}/> : index + 1}
              </div>
              <span className="mt-1 hidden sm:block">{step}</span>
            </div>
            {index < steps.length - 1 && <ChevronRight className="text-muted-foreground opacity-50 hidden sm:block" />}
          </React.Fragment>
        ))}
      </div>
    );
  };


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background via-secondary/10 to-secondary/30 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {/* Header Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-primary">
                Book Appointment with {selectedDoctor.name}
              </CardTitle>
              <CardDescription className="text-md sm:text-lg">{selectedDoctor.specialization}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-primary">
                <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} data-ai-hint={selectedDoctor.dataAiHint} />
                <AvatarFallback>{selectedDoctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <StarRating rating={selectedDoctor.rating} />
                <p className="text-sm text-muted-foreground mt-1">
                  <Briefcase className="inline h-4 w-4 mr-1" /> {selectedDoctor.experience} years experience
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <User className="inline h-4 w-4 mr-1" /> Age: {selectedDoctor.age}
                </p>
                {selectedDoctor.bio && <p className="mt-2 text-sm text-foreground/80 italic">{selectedDoctor.bio}</p>}
              </div>
            </CardContent>
          </Card>
          
          <ProgressIndicator currentStep={2} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Date & Time Selection Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center"><CalendarDays className="mr-2 text-primary"/>Select Date & Time</CardTitle>
                  <CardDescription>Choose a preferred date and time for your consultation.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <FormLabel className="mb-2 text-center">Select Date</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              form.setValue("appointmentTime", ""); // Reset time on date change
                            }}
                            disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() -1 )) || day > new Date(new Date().setDate(new Date().getDate() + 30))} // Example: next 30 days
                            initialFocus
                            className="rounded-md border"
                          />
                        </FormControl>
                        <FormMessage className="mt-2 text-center" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="appointmentTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-2 text-center md:text-left">Available Time Slots (PST)</FormLabel>
                         <FormControl>
                            <div> {/* This div is the direct child of FormControl */}
                              {form.getValues("appointmentDate") && availableTimes.length > 0 ? (
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                  {availableTimes.map(time => (
                                    <Button
                                      key={time}
                                      type="button"
                                      variant={field.value === time ? "default" : "outline"}
                                      onClick={() => field.onChange(time)}
                                      className="w-full"
                                    >
                                      <Clock className="mr-2 h-4 w-4" /> {time}
                                    </Button>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground text-center md:text-left">
                                  {form.getValues("appointmentDate") ? "No slots available for this date." : "Please select a date to see available times."}
                                </p>
                              )}
                            </div>
                         </FormControl>
                        <FormMessage className="mt-2 text-center md:text-left" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Patient Information Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center"><Users className="mr-2 text-primary"/>Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <FormField control={form.control} name="patientName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel><Mail className="inline h-4 w-4 mr-1" />Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel><Phone className="inline h-4 w-4 mr-1" />Phone Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="+1234567890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {/* Optional Insurance */}
                   <FormField control={form.control} name="insuranceProvider" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Provider (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g., HealthNet" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="policyNumber" render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Policy Number (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g., HN123456789" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Reason for Visit Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center"><FileText className="mr-2 text-primary"/>Reason for Visit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="consultationType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Type</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select consultation type" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="in-person">In-Person Consultation</SelectItem>
                          <SelectItem value="video">Video Consultation</SelectItem>
                          <SelectItem value="phone">Phone Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="reasonForVisit" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptoms or Reason for Visit</FormLabel>
                      <FormControl><Textarea placeholder="Please describe your symptoms or the reason for your visit..." {...field} rows={5} /></FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground text-right">{form.watch("reasonForVisit")?.length || 0}/500 characters</p>
                    </FormItem>
                  )} />
                  <FormItem>
                     <FormLabel className="text-sm font-medium">Attachments (Optional)</FormLabel>
                     <Input type="file" disabled  className="text-sm file:mr-2 file:text-primary file:font-semibold file:rounded-full file:border-0 file:bg-primary/10 hover:file:bg-primary/20"/>
                     <FormDescription className="text-xs">Upload medical reports, lab results, or images. (Feature coming soon)</FormDescription>
                  </FormItem>
                </CardContent>
              </Card>

              {/* Consent Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center"><ShieldCheck className="mr-2 text-primary"/>Consent & Confirmations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the Saveetha AI <a href="/privacy-policy" target="_blank" className="underline text-primary hover:text-primary/80">Privacy Policy</a> and <a href="/terms-of-service" target="_blank" className="underline text-primary hover:text-primary/80">Terms of Service</a>.</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="agreeToReminders" render={({ field }) => (
                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>I consent to receive appointment reminders via email/SMS.</FormLabel>
                    </FormItem>
                  )} />
                  <p className="text-xs text-muted-foreground">
                    Please review our <a href="/cancellation-policy" target="_blank" className="underline text-primary hover:text-primary/80">Cancellation Policy</a>.
                  </p>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting || !form.formState.isValid}>
                  {form.formState.isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  Confirm & Book Appointment (Demo)
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <footer className="py-8 border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <Logo size={24} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saveetha AI. Your health, intelligently managed.
          </p>
        </div>
      </footer>
    </div>
  );
}
