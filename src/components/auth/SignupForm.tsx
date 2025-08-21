
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    
    if (!email.endsWith('@dubai.bits-pilani.ac.in')) {
      toast({
        variant: "destructive",
        title: "Invalid Domain",
        description: "Registration is restricted to @dubai.bits-pilani.ac.in email addresses.",
      });
      return;
    }

    setIsLoading(true);
    // Mock signup process
    setTimeout(() => {
      toast({
        title: "Initiation Pending",
        description: "A confirmation token has been sent to your academic email.",
      });
      setIsLoading(false);
      router.push("/login");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email" className="font-roboto-mono">Academic Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="initiate@dubai.bits-pilani.ac.in"
          required
          className="font-code"
          disabled={isLoading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password" className="font-roboto-mono">Create Password</Label>
        <Input id="password" type="password" required disabled={isLoading} />
      </div>
      <Button type="submit" className="w-full font-headline mt-2" disabled={isLoading}>
        {isLoading ? 'Performing Ritual...' : 'Sign Up'}
      </Button>
    </form>
  );
}

    