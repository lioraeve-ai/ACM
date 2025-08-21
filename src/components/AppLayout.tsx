"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Home, LayoutDashboard, LogOut, ShieldCheck, User } from "lucide-react";
import { OuroborosIcon } from "./icons/OuroborosIcon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <OuroborosIcon className="w-16 h-16 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-grid-pattern">
        <aside className="w-16 flex flex-col items-center space-y-4 py-4 bg-card/50 border-r border-border">
          <Link href="/" className="mb-4">
            <OuroborosIcon className="w-8 h-8 text-accent hover:animate-spin-slow" />
          </Link>
          <nav className="flex flex-col items-center space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/dashboard"><LayoutDashboard className="w-5 h-5" /></Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            {user.isAdmin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin"><ShieldCheck className="w-5 h-5" /></Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Admin Panel</TooltipContent>
              </Tooltip>
            )}
          </nav>
          <div className="mt-auto flex flex-col items-center space-y-2">
             <Tooltip>
                <TooltipTrigger asChild>
                    <div className="p-2 rounded-full bg-primary/20">
                        <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right">{user.email}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </TooltipProvider>
  );
}
