
"use client"; 

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import Chatbot from "@/components/user/Chatbot";
import { CalendarPlus, MessageCircleQuestion, Zap, Hospital, Users, MessageSquareHeart, Star, StarHalf, Briefcase, ShieldCheck, UserCircle2, Activity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

const SPECIALIZATIONS = Array.from(new Set(DUMMY_DOCTORS.map(doc => doc.specialization))).sort();

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


export default function HomePage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [recommendedDoctors, setRecommendedDoctors] = useState<Doctor[]>([]);
  const [isDoctorDialogClientReady, setIsDoctorDialogClientReady] = useState(false);

  // This effect ensures client-side specific logic runs after mount,
  // helping prevent hydration mismatches for components like Dialog.
  // Moved before conditional returns to respect Rules of Hooks.
  useEffect(() => {
    setIsDoctorDialogClientReady(true); 
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (role === 'doctor') {
          router.replace('/doctor-dashboard');
        } else if (role === 'user') {
          router.replace('/dashboard');
        } else {
          // This case should ideally not happen if role is set upon login.
          // If it does, redirecting to login or a role selection page might be appropriate.
          console.warn("User authenticated but role is unclear. Redirecting to login.");
          router.replace('/login');
        }
      }
      // If !user and !loading, user is not logged in, so stay on public homepage.
    }
  }, [user, role, loading, router]);

  useEffect(() => {
    if (selectedSpecialization) {
      const filtered = DUMMY_DOCTORS.filter(doc => doc.specialization === selectedSpecialization);
      // Sort by rating (desc), then by experience (desc) as a tie-breaker
      const sorted = filtered.sort((a, b) => b.rating - a.rating || b.experience - a.experience);
      setRecommendedDoctors(sorted.slice(0, 6)); // Show top 6
    } else {
      setRecommendedDoctors([]); // Clear if no specialization selected
    }
  }, [selectedSpecialization]);
  

  if (loading) { 
    // Full screen loader if auth state is still loading
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  // If user is logged in (and not loading), they should have been redirected by the useEffect above.
  // This block is a fallback, but ideally, redirection logic handles this.
  if (user && !loading) { 
      // This might indicate a brief moment before redirection, or if redirection logic fails.
      // Showing a loader here prevents brief flashing of homepage content for logged-in users.
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <LoadingSpinner />
        </div>
      );
  }
  
  // If we reach here, user is not logged in and auth is not loading, so show public homepage.
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-secondary/10 to-secondary/30">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative text-center bg-cover bg-center bg-no-repeat py-24 sm:py-32"
          style={{ backgroundImage: "url('https://media.canva.com/v2/image-resize/format:JPG/height:300/quality:92/uri:ifs%3A%2F%2FM%2F6a4d73f6-2689-4d46-a68f-21de909896a6/watermark:F/width:500?csig=AAAAAAAAAAAAAAAAAAAAAI6VpOcWlhDuYKDROAWnCgYobO-ZjsMXBGzFUkStFSvh&exp=1747490006&osig=AAAAAAAAAAAAAAAAAAAAANJvXBO_-vSefLtXNlWlfNZwYwD-DiHvAMnIm6mgpP-O&signer=media-rpc&x-canva-quality=thumbnail_large')" }}
          data-ai-hint="abstract background"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 container mx-auto px-4 animate-fade-in-up">
            <div className="mb-8 inline-block">
              <Logo size={64} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Intelligent Health, Simplified by Saveetha AI
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-100 sm:text-xl">
              Access AI-powered symptom insights and easily schedule appointments. Your health journey, managed smarter.
            </p>
          </div>
        </section>
        
        {/* Main Features Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12 sm:mb-16 animate-fade-in animation-delay-200ms">Explore Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 flex flex-col animate-fade-in animation-delay-400ms">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <MessageCircleQuestion className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">AI Symptom Helper</CardTitle>
                  <CardDescription className="text-base">
                    Get AI-driven insights on your symptoms. Fast, informative, and guiding you towards professional medical advice.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center text-center">
                   <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="shadow-md hover:bg-primary/90 mt-2">
                        <Zap className="mr-2 h-5 w-5" />
                        Ask our AI
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[650px] p-0">
                      <Chatbot />
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter className="justify-center text-center pt-4">
                  <p className="text-xs text-muted-foreground">
                    For full features and history, please <Link href="/login" className="underline text-primary hover:text-primary/80">login or create an account</Link>.
                  </p>
                </CardFooter>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 flex flex-col animate-fade-in animation-delay-600ms">
                <CardHeader className="items-center text-center">
                   <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <CalendarPlus className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Schedule a Consultation</CardTitle>
                  <CardDescription className="text-base">
                    Find specialists and book appointments based on your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center text-center">
                  {isDoctorDialogClientReady && ( // Only render Dialog on client-side
                    <Dialog onOpenChange={() => { setSelectedSpecialization(""); setRecommendedDoctors([]); }}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="shadow-md hover:bg-primary/90 mt-2">
                          <Zap className="mr-2 h-5 w-5" />
                          Find a Doctor
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-primary">Find Your Doctor</DialogTitle>
                          <DialogDescription>
                            Select a medical specialization to see our top recommended doctors.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-6">
                          <Select onValueChange={setSelectedSpecialization} value={selectedSpecialization}>
                            <SelectTrigger className="w-full sm:w-[300px] mx-auto">
                              <SelectValue placeholder="Select a Specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              {SPECIALIZATIONS.map(spec => (
                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {!selectedSpecialization && recommendedDoctors.length === 0 && (
                             <p className="text-center text-sm text-muted-foreground pt-2">
                                Please select a specialization to see doctor recommendations.
                              </p>
                          )}

                          {selectedSpecialization && recommendedDoctors.length === 0 && (
                            <div className="text-center text-muted-foreground py-6">
                              <Users className="h-12 w-12 mx-auto mb-3 text-primary/50" />
                              <p className="font-semibold">No doctors found for {selectedSpecialization}.</p>
                              <p className="text-sm">Please try another specialization or check back later.</p>
                            </div>
                          )}

                          {recommendedDoctors.length > 0 && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-center text-primary">Recommended Doctors for {selectedSpecialization}</h3>
                              <ScrollArea className="max-h-[50vh] pr-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {recommendedDoctors.map(doc => (
                                    <Card key={doc.id} className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
                                      <CardContent className="p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-grow">
                                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border shrink-0 mb-3 sm:mb-0">
                                          <AvatarImage src={doc.avatar} alt={doc.name} data-ai-hint={doc.dataAiHint} />
                                          <AvatarFallback>{doc.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 text-center sm:text-left">
                                          <CardTitle className="text-xl font-semibold text-primary mb-1">{doc.name}</CardTitle>
                                          <StarRating rating={doc.rating} className="mb-2 justify-center sm:justify-start" />
                                          <Badge variant="outline" className="mb-3">
                                            <Activity className="mr-1.5 h-3.5 w-3.5" />
                                            {doc.specialization}
                                          </Badge>
                                          <div className="text-sm text-muted-foreground space-y-1">
                                            <div className="flex items-center justify-center sm:justify-start">
                                              <UserCircle2 className="h-4 w-4 mr-2 text-primary/70" />
                                              <span>Age: {doc.age}</span>
                                            </div>
                                            <div className="flex items-center justify-center sm:justify-start">
                                              <Briefcase className="h-4 w-4 mr-2 text-primary/70" />
                                              <span>Experience: {doc.experience} years</span>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                      <CardFooter className="p-4 pt-2 mt-auto">
                                        <Button 
                                            className="w-full" 
                                            type="button" 
                                            onClick={() => {
                                                router.push(`/book-appointment?doctorId=${doc.id}`);
                                            }}
                                        >
                                            <CalendarPlus className="mr-2 h-4 w-4"/>
                                            Book Appointment
                                        </Button>
                                      </CardFooter>
                                    </Card>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          )}
                        </div>
                         <DialogFooter>
                           <DialogClose asChild>
                             <Button variant="outline">Close</Button>
                           </DialogClose>
                         </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
                <CardFooter className="justify-center text-center pt-4">
                   <p className="text-xs text-muted-foreground">
                    Registered users can access full booking management. <Link href="/login" className="underline text-primary hover:text-primary/80">Login or sign up</Link>.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        {/* About Us Placeholder Section */}
        <section className="py-12 sm:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center animate-fade-in">
             <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Hospital className="h-10 w-10 text-primary" />
              </div>
            <h2 className="text-3xl font-bold text-primary mb-6">About Saveetha AI</h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
              Saveetha AI is dedicated to revolutionizing healthcare access through intelligent technology. Our mission is to empower patients and support medical professionals with intuitive and efficient digital tools. We believe in a future where managing health is simpler and more informed.
            </p>
             <img src="https://placehold.co/800x400.png" alt="About Saveetha AI" data-ai-hint="Saveetha University" className="mx-auto rounded-lg shadow-md" />
          </div>
        </section>

        <Separator className="my-16" />
        
        {/* Testimonials Placeholder Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 text-center animate-fade-in">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <MessageSquareHeart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-6">What Our Users Say</h2>
            <div className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
              <p className="italic">"Saveetha AI made it so easy to understand my symptoms and find a doctor. A truly helpful platform!"</p>
              <p className="mt-2 text-sm font-semibold">- A. User</p>
            </div>
            <p className="text-sm text-muted-foreground">
              (More testimonials would be displayed in a sliding carousel here.)
            </p>
          </div>
        </section>
      </main>
      <footer className="py-8 border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <Logo size={24} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saveetha AI. Your health, intelligently managed.
          </p>
          <p className="text-xs text-muted-foreground">
            Disclaimer: Information provided is for general guidance and not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

