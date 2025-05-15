
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
import { CalendarPlus } from 'lucide-react';
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
      // If !user, we don't redirect. The public page content will be shown.
    }
  }, [user, role, loading, router]);

  if (loading) { 
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  if (user && !loading) { // If user is logged in but redirection hasn't happened yet
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <LoadingSpinner />
        </div>
      );
  }

  // If !user and !loading, render the public homepage
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-secondary/30">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="mb-8 inline-block"> {/* Removed animate-pulse for static logo presentation */}
            <Logo size={64} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Welcome to MediConsult AI
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Your intelligent health companion. Get insights on symptoms or manage patient interactions, all powered by cutting-edge AI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/login">Login / Sign Up</Link>
            </Button>
          </div>
        </section>
        
        <section id="symptom-checker" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary text-center mb-12 sm:mb-16">AI Symptom Helper</h2>
                <div className="flex justify-center">
                    <Chatbot />
                </div>
                 <p className="mt-8 text-center text-sm text-muted-foreground">
                    For more personalized features and to save your history, please <Link href="/login" className="underline text-primary hover:text-primary/80">login or create an account</Link>.
                </p>
            </div>
        </section>

        <Separator className="my-8 md:my-12" />

        <section id="book-appointment" className="py-16 sm:py-24 bg-secondary/20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-primary mb-6">Schedule a Consultation</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Ready to speak with a professional? Book an appointment through our demonstration system.
                </p>
                <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
                  <Link href="/book-appointment">
                    <CalendarPlus className="mr-2 h-5 w-5" />
                    Book an Appointment (Demo)
                  </Link>
                </Button>
                 <p className="mt-8 text-center text-sm text-muted-foreground">
                    Full booking confirmation and management are available for registered users. <Link href="/login" className="underline text-primary hover:text-primary/80">Login or sign up</Link> to access.
                </p>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Ready to Take Control of Your Health?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join MediConsult AI today. Whether you're seeking information or providing care, our platform is designed for you.
            </p>
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/login">Sign Up or Login Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="py-8 border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <Logo size={24} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MediConsult AI. Your health, intelligently managed.
          </p>
          <p className="text-xs text-muted-foreground">
            Disclaimer: Information provided is for general guidance and not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
