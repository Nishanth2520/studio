
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/shared/Header";
import { Logo } from "@/components/icons/Logo";
import Link from "next/link";
import { LifeBuoy, Mail, ChevronRight } from "lucide-react";

const faqItems = [
  {
    question: "How do I use the AI Symptom Helper?",
    answer:
      "To use the AI Symptom Helper, navigate to the dashboard (if logged in) or the homepage. You'll find a chat interface. Simply type your symptoms into the chat window. Our AI will analyze your input and provide information and potential insights. Please remember, this tool is for informational purposes only and does not constitute a medical diagnosis. Always consult a healthcare professional for medical advice.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment in two main ways: \n1. From the Homepage: Click the 'Find a Doctor' button, select a specialization, choose a doctor from the recommendations, and then click 'Book Appointment'. \n2. From your Dashboard (for logged-in users): Click the 'Book an Appointment' button. \nIn both cases, you'll be guided to a page where you select an available date and time, fill in patient details, provide a reason for your visit, and confirm the booking. Currently, bookings are for demonstration purposes.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we take your privacy and data security very seriously. We are committed to protecting your personal and health information using industry-standard security measures and encryption protocols. For more detailed information, please review our <a href='/privacy-policy' class='underline text-primary hover:text-primary/80'>Privacy Policy</a>.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "If you forget your password, you can use the password reset functionality on the login page. Look for a 'Forgot Password?' link or option. If you encounter any issues, please reach out to our support team through the contact information provided on our <a href='/contact' class='underline text-primary hover:text-primary/80'>Contact Us</a> page.",
  },
  {
    question: "How can I update my account information?",
    answer:
      "Currently, account information updates (like email or display name) are managed through your Firebase authentication provider. For specific app-related preferences or profile details (once implemented), you would typically find these settings in an 'Account Settings' or 'Profile' section after logging in. This feature is under development.",
  },
  {
    question: "Are the doctors on this platform verified?",
    answer:
      "The doctor profiles and appointment system are currently for demonstration purposes. In a live production environment, all medical professionals listed would undergo a verification process to ensure they are licensed and qualified.",
  },
  {
    question: "What types of consultations are available?",
    answer:
      "When booking an appointment, you can typically choose from In-Person, Video Consultation, or Phone Consultation, depending on the doctor's availability and the nature of the medical service. This selection is part of the booking process.",
  },
];

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Help & Frequently Asked Questions
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Find answers to common questions about Saveetha AI.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-background p-6 rounded-lg shadow-xl">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-background p-8 rounded-lg shadow-xl">
            <Mail className="h-12 w-16 text-primary mx-auto mb-3" />
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              If you couldn't find the answer you were looking for, please
              don't hesitate to reach out to our support team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Contact Support <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <footer className="py-8 border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <Logo size={24} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saveetha AI. Your health, intelligently managed.
          </p>
        </div>
      </footer>
    </div>
  );
}
