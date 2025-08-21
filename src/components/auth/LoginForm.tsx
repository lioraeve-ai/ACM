"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;

    // Mock authentication
    setTimeout(() => {
      if (email === 'admin@dubai.bits-pilani.ac.in') {
        // Mock admin login
        localStorage.setItem('user', JSON.stringify({ email, isAdmin: true }));
        router.push('/admin');
      } else if (email.endsWith('@dubai.bits-pilani.ac.in')) {
         // Mock user login
        localStorage.setItem('user', JSON.stringify({ email, isAdmin: false }));
        router.push('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "This coven is exclusive to @dubai.bits-pilani.ac.in members.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email" className="font-roboto-mono">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="acolyte@dubai.bits-pilani.ac.in"
          required
          className="font-code"
          disabled={isLoading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password" className="font-roboto-mono">Password</Label>
        <Input id="password" type="password" required disabled={isLoading} />
      </div>
      <Button type="submit" className="w-full font-headline mt-2" disabled={isLoading}>
        {isLoading ? 'Authenticating...' : 'Login'}
      </Button>
    </form>
  );
}
