import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/shared/Header";

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard requiredRole="user">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
         <footer className="py-6 md:px-8 md:py-0 border-t">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Saveetha AI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </AuthGuard>
  );
}
