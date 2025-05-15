"use client"; // This must be a client component to use hooks

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

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
          // User is authenticated but role is not set or invalid
          // This case should ideally be handled, e.g., redirect to a role selection page or logout
          console.warn("User authenticated but role is unclear. Redirecting to login.");
          router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [user, role, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LoadingSpinner />
    </div>
  );
}
