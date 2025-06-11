
import Header from "@/components/shared/Header";
import { Logo } from "@/components/icons/Logo";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Privacy Policy
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="bg-background p-8 rounded-lg shadow-xl text-left space-y-4 text-muted-foreground">
            <h2 className="text-xl font-semibold text-primary">1. Introduction</h2>
            <p>Welcome to Saveetha AI. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. This policy is for demonstration purposes.</p>
            
            <h2 className="text-xl font-semibold text-primary">2. Information We Collect (Placeholder)</h2>
            <p>We may collect personal identification information (Name, email address, phone number, etc.) and health-related information you provide through the AI Symptom Helper or when booking appointments.</p>

            <h2 className="text-xl font-semibold text-primary">3. How We Use Your Information (Placeholder)</h2>
            <p>To provide and maintain our service, to notify you about changes, to allow participation in interactive features, to provide customer support, and for data analysis to improve our service.</p>

            <h2 className="text-xl font-semibold text-primary">4. Data Security (Placeholder)</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
            
            <h2 className="text-xl font-semibold text-primary">5. Changes to This Privacy Policy (Placeholder)</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <h2 className="text-xl font-semibold text-primary">6. Contact Us (Placeholder)</h2>
            <p>If you have any questions about this Privacy Policy, please <a href="/contact" className="underline text-primary hover:text-primary/80">contact us</a>.</p>
            <p className="mt-6 text-sm italic">Note: This is a template privacy policy for demonstration purposes only and should not be considered legally binding. Consult with a legal professional to create a comprehensive policy for a live application.</p>
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
