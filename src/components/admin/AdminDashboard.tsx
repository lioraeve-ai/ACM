
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Ban, Trash2, UserCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const mockUsers = [
  { id: '1', email: 'sorcerer@dubai.bits-pilani.ac.in', score: 13370, challenges: 10, status: 'Active', attempts: [ {level: 1, count: 5}, {level: 2, count: 12} ] },
  { id: '2', email: 'mage@dubai.bits-pilani.ac.in', score: 9800, challenges: 8, status: 'Active', attempts: [ {level: 1, count: 2}, {level: 2, count: 8} ] },
  { id: '3', email: 'acolyte@dubai.bits-pilani.ac.in', score: 4500, challenges: 5, status: 'Active', attempts: [ {level: 1, count: 1} ] },
  { id: '4', email: 'initiate@dubai.bits-pilani.ac.in', score: 1200, challenges: 2, status: 'Probation', attempts: [ {level: 1, count: 25} ] },
  { id: '5', email: 'banned@example.com', score: 0, challenges: 0, status: 'Banned', attempts: [] },
];

type User = (typeof mockUsers)[0];


export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isAdmin) {
        setIsAdmin(true);
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleToggleBan = (userToUpdate: User) => {
    setUsers(users.map(user => 
      user.id === userToUpdate.id 
        ? { ...user, status: user.status === 'Banned' ? 'Active' : 'Banned' }
        : user
    ));
  };
  
  const handleDeleteAttempt = (userToUpdate: User, level: number) => {
     setUsers(users.map(user => 
      user.id === userToUpdate.id 
        ? { ...user, attempts: user.attempts.filter(a => a.level !== level) }
        : user
    ));
  };


  if (!isAdmin) {
    return null;
  }

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="font-roboto-mono">Coven Members</CardTitle>
        <CardDescription>Manage players and view their progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-roboto-mono">
              <TableHead>Email</TableHead>
              <TableHead className="text-right">High Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-code">
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="text-right font-roboto-mono text-accent">{user.score.toLocaleString()}</TableCell>
                <TableCell>
                    <Badge 
                      variant={user.status === 'Active' ? 'default' : user.status === 'Probation' ? 'secondary' : 'destructive'} 
                      className={user.status === 'Active' ? 'bg-achievement-green' : user.status === 'Probation' ? 'bg-challenge-orange' : ''}
                    >
                      {user.status}
                    </Badge>
                </TableCell>
                 <TableCell>
                  <div className="flex flex-col gap-1">
                    {user.attempts.map(attempt => (
                      <div key={attempt.level} className="flex items-center gap-2 text-xs">
                        <span>Lvl {attempt.level}: {attempt.count}</span>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive/50 hover:text-destructive">
                              <Trash2 size={12} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the attempt history for Level {attempt.level} for {user.email}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteAttempt(user, attempt.level)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={user.status === 'Banned' ? "outline" : "destructive"} size="sm">
                          {user.status === 'Banned' ? <UserCheck className="mr-2" /> : <Ban className="mr-2" />}
                          {user.status === 'Banned' ? 'Unban' : 'Ban'}
                        </Button>
                      </AlertDialogTrigger>
                       <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to {user.status === 'Banned' ? 'unban' : 'ban'} {user.email}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleToggleBan(user)}>
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
