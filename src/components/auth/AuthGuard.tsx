"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: UserRole; // Make role optional, if not provided, just checks auth
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (requiredRole && role !== requiredRole) {
        // If role is required and doesn't match, redirect
        // This could be to a generic dashboard or login, or an unauthorized page
        toast({
          title: "Access Denied",
          description: `You do not have permission to access this page as a ${role}. Required role: ${requiredRole}.`,
          variant: "destructive",
        });
        // Redirect to their appropriate dashboard or login
        if (role === 'doctor') router.replace('/doctor-dashboard');
        else if (role === 'user') router.replace('/dashboard');
        else router.replace("/login");
      }
    }
  }, [user, role, loading, router, requiredRole]);

  if (loading || !user || (requiredRole && role !== requiredRole && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}

// Helper function for toast, as it might not be available in this scope if not imported
// This is a simplified version. Ideally, use the global toast from useToast
const toast = (options: { title: string; description: string; variant?: "default" | "destructive" }) => {
  if (typeof window !== 'undefined' && (window as any).useToast) { // Basic check
     (window as any).useToast().toast(options);
  } else {
    console.warn("Toast function not available for AuthGuard:", options.title, options.description);
    // As a fallback, you could alert or log, but UI feedback is better.
    // This suggests a potential refactor or ensuring toast context is available.
    if(options.variant === 'destructive') alert(`Error: ${options.title} - ${options.description}`);
  }
};
