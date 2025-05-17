
"use client"; 

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import Chatbot from "@/components/user/Chatbot";
import { CalendarPlus, MessageCircleQuestion, Zap, Hospital, Users, MessageSquareHeart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (role === 'doctor') {
          router.replace('/doctor-dashboard');
        } else if (role === 'user') {
          router.replace('/dashboard');
        } else {
          console.warn("User authenticated but role is unclear. Redirecting to login.");
          router.replace('/login');
        }
      }
    }
  }, [user, role, loading, router]);

  if (loading) { 
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  if (user && !loading) { 
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <LoadingSpinner />
        </div>
      );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-secondary/10 to-secondary/30">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative text-center bg-cover bg-center bg-no-repeat py-24 sm:py-32"
          style={{ backgroundImage: "url('https://media.canva.com/v2/image-resize/format:JPG/height:300/quality:92/uri:ifs%3A%2F%2FM%2F6a4d73f6-2689-4d46-a68f-21de909896a6/watermark:F/width:500?csig=AAAAAAAAAAAAAAAAAAAAAI6VpOcWlhDuYKDROAWnCgYobO-ZjsMXBGzFUkStFSvh&exp=1747490006&osig=AAAAAAAAAAAAAAAAAAAAANJvXBO_-vSefLtXNlWlfNZwYwD-DiHvAMnIm6mgpP-O&signer=media-rpc&x-canva-quality=thumbnail_large')" }}
          data-ai-hint="blue texture"
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
                    Easily find and book appointments with healthcare professionals using our demonstration booking system.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center text-center">
                  <Button asChild size="lg" className="shadow-md hover:bg-primary/90 mt-2">
                    <Link href="/book-appointment">
                      <Zap className="mr-2 h-5 w-5" />
                      Book Now (Demo)
                    </Link>
                  </Button>
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
            {/* Image Carousel for About Us would go here in a more advanced version */}
             <img src="https://placehold.co/800x400.png" alt="About Saveetha AI" data-ai-hint="hospital team" className="mx-auto rounded-lg shadow-md" />
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

