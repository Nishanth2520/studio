
import Header from "@/components/shared/Header";
import { Logo } from "@/components/icons/Logo";
import { CalendarX2 } from "lucide-react";

export default function CancellationPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <CalendarX2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Cancellation Policy
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="bg-background p-8 rounded-lg shadow-xl text-left space-y-4 text-muted-foreground">
            <h2 className="text-xl font-semibold text-primary">1. General Policy (Placeholder)</h2>
            <p>This Cancellation Policy outlines the terms for cancelling appointments made through the Saveetha AI platform. This policy is for demonstration purposes.</p>
            
            <h2 className="text-xl font-semibold text-primary">2. How to Cancel (Placeholder)</h2>
            <p>Appointments can be cancelled through your user dashboard or by contacting the clinic/doctor directly. Specific instructions may vary.</p>

            <h2 className="text-xl font-semibold text-primary">3. Cancellation Timeframes & Fees (Placeholder)</h2>
            <p>Cancellations made at least 24 hours in advance of the scheduled appointment time will typically not incur a fee. Cancellations made less than 24 hours in advance, or no-shows, may be subject to a cancellation fee as determined by the individual healthcare provider or clinic.</p>

            <h2 className="text-xl font-semibold text-primary">4. Rescheduling (Placeholder)</h2>
            <p>If you need to reschedule, please do so as early as possible. Rescheduling options will be available through the platform or by contacting the provider.</p>
            
            <h2 className="text-xl font-semibold text-primary">5. Provider Cancellations (Placeholder)</h2>
            <p>In the rare event that a healthcare provider needs to cancel or reschedule an appointment, you will be notified as soon as possible, and efforts will be made to arrange an alternative time.</p>

            <h2 className="text-xl font-semibold text-primary">6. Contact (Placeholder)</h2>
            <p>For questions regarding this Cancellation Policy or specific appointment cancellations, please refer to the contact information provided by the clinic or <a href="/contact" className="underline text-primary hover:text-primary/80">contact us</a> for general platform inquiries.</p>
            <p className="mt-6 text-sm italic">Note: This is a template cancellation policy for demonstration purposes only. Actual policies will vary by healthcare provider.</p>
          </div>
        </div>
      </main>
      <footer className="py-8 border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <Logo size={24} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saveetha AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
