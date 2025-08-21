import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-accent/20">
      <CardHeader>
        <CardTitle className="font-creepster text-4xl text-accent">Join the Ritual</CardTitle>
        <CardDescription className="font-body">
          Only members of the ACM BITS Pilani, Dubai chapter may proceed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter className="text-sm">
        <p className="text-muted-foreground">
          Already a member?{' '}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
