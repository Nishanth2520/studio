
import Header from "@/components/shared/Header";
import { Logo } from "@/components/icons/Logo";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Info className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-6">
            About Saveetha AI
          </h1>
          <div className="bg-background p-8 rounded-lg shadow-xl text-left space-y-4 text-lg text-muted-foreground">
            <p>
              Welcome to Saveetha AI, your innovative partner in navigating the complexities of healthcare. Our mission is to empower individuals with accessible, intelligent tools to understand their health better and connect seamlessly with medical professionals.
            </p>
            <p>
              At Saveetha AI, we leverage cutting-edge artificial intelligence to provide preliminary insights into symptoms and guide users towards appropriate care. Our platform aims to bridge the gap between patients and doctors, making healthcare more approachable and efficient.
            </p>
            <p>
              Key features include an AI-powered symptom helper for initial guidance and an intuitive appointment booking system to connect you with qualified doctors. We are committed to continuous improvement, striving to enhance the user experience and expand our services to meet your evolving health needs.
            </p>
            <p>
              This application is currently in its demonstration phase. The features related to AI responses, doctor listings, and appointment bookings are illustrative of the platform's capabilities and do not represent live medical services or advice.
            </p>
            <p className="font-semibold text-primary">
              Our Vision: To create a healthier future by making healthcare more informed, accessible, and user-centric through technology.
            </p>
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
