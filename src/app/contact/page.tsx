
import Header from "@/components/shared/Header";
import { Logo } from "@/components/icons/Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Contact Us
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              We're here to help. Reach out to us with any questions or inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-primary">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                  <Input id="name" placeholder="Your Name" disabled />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                  <Input type="email" id="email" placeholder="your@email.com" disabled />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">Subject</label>
                  <Input id="subject" placeholder="Inquiry Subject" disabled />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                  <Textarea id="message" placeholder="Your message..." rows={4} disabled />
                </div>
                <Button className="w-full" disabled>Send Message (Disabled)</Button>
                <p className="text-xs text-muted-foreground text-center">Contact form is for demonstration and currently disabled.</p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary text-xl">Our Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>support@saveethaai.com (Demo)</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>+1 (234) 567-8900 (Demo)</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                    <span>
                      Saveetha Medical College & Hospital,<br />
                      Thandalam, Chennai, Tamil Nadu, India (Fictional Address for Demo)
                    </span>
                  </div>
                </CardContent>
              </Card>
               <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary text-xl">Office Hours (Demo)</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                  <p>Saturday - Sunday: Closed</p>
                </CardContent>
              </Card>
            </div>
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
