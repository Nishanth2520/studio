
import Chatbot from "@/components/user/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Page components in Next.js App Router can receive searchParams as a prop.
// It's important to handle them correctly if used.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
interface UserDashboardPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function UserDashboardPage({ searchParams }: UserDashboardPageProps) {
  // If you were to use searchParams, access specific keys directly:
  // const exampleQuery = searchParams?.example;
  // console.log('Example query:', exampleQuery);

  // Avoid patterns like Object.keys(searchParams) or {...searchParams} directly in Server Components
  // as searchParams is a special read-only object.

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Your Health Companion</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome! Use our AI Symptom Helper to get information based on your symptoms.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Chatbot />
      </div>

      <Card className="mt-12 bg-secondary border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            The information provided by the AI Symptom Helper is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or received from the AI Symptom Helper.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
