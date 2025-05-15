
"use client"; 

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Users } from 'lucide-react';

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
          <div className="mb-8 inline-block animate-pulse" style={{ animationDuration: '2s' }}>
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
              <Link href="/login">Get Started - Login / Sign Up</Link>
            </Button>
            {/* 
            <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow">
              <Link href="/features">Learn More</Link>
            </Button> 
            */}
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary text-center mb-12 sm:mb-16">Core Features</h2>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <CardHeader className="flex-row items-center gap-4">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Bot size={32} />
                            </div>
                            <CardTitle className="text-2xl text-primary">AI Symptom Helper</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                For <strong>Users</strong>: Describe your symptoms and receive informative, AI-driven responses to understand your health better. Our chatbot provides helpful information, not medical diagnoses.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <CardHeader className="flex-row items-center gap-4">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                              <Users size={32} />
                            </div>
                            <CardTitle className="text-2xl text-primary">Doctor Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                For <strong>Doctors</strong>: A comprehensive portal to access patient details, manage inquiries, and utilize curated medical resources efficiently, streamlining your workflow.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Ready to Take Control of Your Health?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join MediConsult AI today. Whether you're seeking information or providing care, our platform is designed for you.
            </p>
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/login">Sign Up Now</Link>
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
