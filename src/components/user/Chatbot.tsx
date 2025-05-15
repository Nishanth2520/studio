
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { symptomResponse } from "@/ai/flows/symptom-response";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Send, Loader2, Stethoscope } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Sore Throat",
  "Runny Nose",
  "Dizziness",
  "Stomach Pain",
  "Muscle Ache",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async (e?: FormEvent, symptomText?: string) => {
    if (e) e.preventDefault();
    const currentInput = symptomText || input;
    if (!currentInput.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: currentInput, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    if (!symptomText) setInput(""); // Clear input if it wasn't from a symptom click
    setIsLoading(true);

    try {
      const aiResponse = await symptomResponse({ symptoms: currentInput });
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: aiResponse.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot AI error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error trying to process your request. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        title: "Chatbot Error",
        description: "Could not get response from AI. Please check your connection or AI setup.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSymptomClick = (symptom: string) => {
    setInput(symptom);
    // Optionally, auto-send or focus input
    // handleSendMessage(undefined, symptom); 
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot size={24} /> AI Symptom Helper
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                <Stethoscope size={48} className="mb-3 text-primary" />
                <p className="font-semibold text-lg mb-1">Hello! How are you feeling today?</p>
                <p className="text-sm mb-3">Describe your symptoms, or select from common ones below.</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {commonSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent transition-colors px-3 py-1 text-sm"
                      onClick={() => handleSymptomClick(symptom)}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs mt-2 p-2 border border-dashed rounded-md bg-secondary/50">
                  Disclaimer: I am an AI assistant and cannot provide medical diagnoses. Please consult a healthcare professional for medical advice.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : ""
                }`}
              >
                {msg.sender === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                 {msg.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary"><User size={18}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-[70%] rounded-lg px-4 py-2 bg-accent text-accent-foreground shadow-sm">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                 </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18}/>}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
