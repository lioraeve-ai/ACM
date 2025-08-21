import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-accent/20">
      <CardHeader>
        <CardTitle className="font-creepster text-4xl text-accent">Enter the Coven</CardTitle>
        <CardDescription className="font-body">
          Authenticate your credentials to continue your arcane journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="text-sm">
        <p className="text-muted-foreground">
          New to the ritual?{' '}
          <Link href="/signup" className="font-medium text-accent hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
