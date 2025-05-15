
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageSquareWarning, AlertCircle, User, CalendarCheck2, FileText } from "lucide-react";

const dummyInquiries = [
  { id: "INQ001", user: "User A (U012)", subject: "Persistent Headache", status: "New", date: "2024-07-28" },
  { id: "INQ002", user: "User B (U034)", subject: "Follow-up on medication", status: "Pending", date: "2024-07-27" },
  { id: "INQ003", user: "User C (U056)", subject: "Concern about test results", status: "Resolved", date: "2024-07-26" },
];

export default function UserInquiriesCard() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">User Inquiries</CardTitle>
        <MessageSquareWarning className="h-6 w-6 text-primary" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">
          View and respond to user-submitted problems, questions, and feedback.
        </CardDescription>
        
        {dummyInquiries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"><FileText className="inline-block h-4 w-4 mr-1" />ID</TableHead>
                <TableHead><User className="inline-block h-4 w-4 mr-1" />User</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead><CalendarCheck2 className="inline-block h-4 w-4 mr-1" />Date</TableHead>
                <TableHead className="text-right"><AlertCircle className="inline-block h-4 w-4 mr-1" />Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyInquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{inquiry.id}</TableCell>
                  <TableCell>{inquiry.user}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell>{inquiry.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant={
                        inquiry.status === "New" ? "destructive" : 
                        inquiry.status === "Pending" ? "secondary" : 
                        "default"
                      }
                      className={
                        inquiry.status === "Resolved" ? "bg-green-500 hover:bg-green-600 text-white" : ""
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
           <div className="mt-4 p-4 bg-secondary rounded-md text-center text-muted-foreground">
            <MessageSquareWarning size={48} className="mx-auto mb-2 text-muted-foreground/50" />
            <p>No user inquiries at the moment.</p>
            <p className="text-xs">(Inquiries will be listed in a table here)</p>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Full inquiry management will be available upon database integration.
        </p>
      </CardContent>
    </Card>
  );
}
