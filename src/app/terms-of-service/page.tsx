
import Header from "@/components/shared/Header";
import { Logo } from "@/components/icons/Logo";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Terms of Service
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="bg-background p-8 rounded-lg shadow-xl text-left space-y-4 text-muted-foreground">
            <h2 className="text-xl font-semibold text-primary">1. Agreement to Terms (Placeholder)</h2>
            <p>By accessing or using Saveetha AI, you agree to be bound by these Terms of Service. These terms are for demonstration purposes.</p>
            
            <h2 className="text-xl font-semibold text-primary">2. Use of Service (Placeholder)</h2>
            <p>Saveetha AI provides an AI symptom helper and appointment booking functionalities. These services are for informational and demonstration purposes only and do not constitute medical advice.</p>

            <h2 className="text-xl font-semibold text-primary">3. User Accounts (Placeholder)</h2>
            <p>You may be required to create an account to access certain features. You are responsible for safeguarding your password and for all activities that occur under your account.</p>

            <h2 className="text-xl font-semibold text-primary">4. Disclaimer of Warranties (Placeholder)</h2>
            <p>The service is provided on an "AS IS" and "AS AVAILABLE" basis. Saveetha AI makes no warranties, expressed or implied, regarding the operation or availability of the service.</p>
            
            <h2 className="text-xl font-semibold text-primary">5. Limitation of Liability (Placeholder)</h2>
            <p>In no event shall Saveetha AI be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

            <h2 className="text-xl font-semibold text-primary">6. Changes to Terms (Placeholder)</h2>
            <p>We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.</p>

             <h2 className="text-xl font-semibold text-primary">7. Contact Us (Placeholder)</h2>
            <p>If you have any questions about these Terms, please <a href="/contact" className="underline text-primary hover:text-primary/80">contact us</a>.</p>
            <p className="mt-6 text-sm italic">Note: This is a template Terms of Service for demonstration purposes only and should not be considered legally binding. Consult with a legal professional to create comprehensive terms for a live application.</p>
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
