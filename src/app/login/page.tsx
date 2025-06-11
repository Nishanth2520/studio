
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Logo } from '@/components/icons/Logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const { replace } = router; // Destructure replace

  useEffect(() => {
    if (!loading && user) {
      if (role === 'doctor') {
        replace('/doctor-dashboard');
      } else {
        replace('/dashboard');
      }
    }
  }, [user, role, loading, replace]); // Use replace in dependency array

  if (loading || (!loading && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
       <div className="mb-8">
        <Logo size={48} />
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access Saveetha AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        Built with care for your health.
      </p>
    </div>
  );
}
