
"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: UserRole; 
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const { replace } = router; // Destructure replace

  useEffect(() => {
    if (!loading) {
      if (!user) {
        replace("/login");
      } else if (requiredRole && role !== requiredRole) {
        toast({
          title: "Access Denied",
          description: `You do not have permission to access this page as a ${role}. Required role: ${requiredRole}.`,
          variant: "destructive",
        });
        if (role === 'doctor') replace('/doctor-dashboard');
        else if (role === 'user') replace('/dashboard');
        else replace("/login");
      }
    }
  }, [user, role, loading, replace, requiredRole]); // Use replace in dependency array

  if (loading || !user || (requiredRole && role !== requiredRole && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}

const toast = (options: { title: string; description: string; variant?: "default" | "destructive" }) => {
  if (typeof window !== 'undefined' && (window as any).useToast) { 
     (window as any).useToast().toast(options);
  } else {
    console.warn("Toast function not available for AuthGuard:", options.title, options.description);
    if(options.variant === 'destructive') alert(`Error: ${options.title} - ${options.description}`);
  }
};
