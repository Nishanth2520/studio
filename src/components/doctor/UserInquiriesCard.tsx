import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareWarning } from "lucide-react";

export default function UserInquiriesCard() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">User Inquiries</CardTitle>
        <MessageSquareWarning className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          View and respond to user-submitted problems, questions, and feedback.
        </CardDescription>
        <div className="mt-4 p-4 bg-secondary rounded-md text-center text-muted-foreground">
          <p>User inquiries and reported issues will be listed here.</p>
          <p className="text-xs">(Example: A table or list of messages with status)</p>
        </div>
      </CardContent>
    </Card>
  );
}
