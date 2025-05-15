
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Send } from 'lucide-react';

const bookingSchema = z.object({
  patientName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  reasonForVisit: z.string().min(10, { message: "Please provide a brief reason (min 10 characters)." }),
  contactNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patientName: "", // Populate from auth user if available
      reasonForVisit: "",
      contactNumber: "",
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log("Booking data:", data);
    // In a real app, this would submit to a backend/Firestore
    toast({
      title: "Booking Request Submitted (Demo)",
      description: "Your appointment request has been noted. This is a demo and no actual booking was made.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="e.g., +1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reasonForVisit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <Textarea placeholder="Briefly describe your reason for consultation..." {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : <> <Send className="mr-2 h-4 w-4" /> Request Appointment (Demo)</>}
        </Button>
      </form>
    </Form>
  );
}
