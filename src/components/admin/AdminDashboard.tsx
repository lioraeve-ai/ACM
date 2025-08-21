"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

const mockUsers = [
  { id: '1', email: 'sorcerer@dubai.bits-pilani.ac.in', score: 13370, challenges: 10, status: 'Active' },
  { id: '2', email: 'mage@dubai.bits-pilani.ac.in', score: 9800, challenges: 8, status: 'Active' },
  { id: '3', email: 'acolyte@dubai.bits-pilani.ac.in', score: 4500, challenges: 5, status: 'Active' },
  { id: '4', email: 'initiate@dubai.bits-pilani.ac.in', score: 1200, challenges: 2, status: 'Probation' },
  { id: '5', email: 'banned@example.com', score: 0, challenges: 0, status: 'Banned' },
];


export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

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

  if (!isAdmin) {
    return null;
  }

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="font-roboto-mono">Coven Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-roboto-mono">
              <TableHead>Email</TableHead>
              <TableHead className="text-right">High Score</TableHead>
              <TableHead className="text-right">Challenges</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-code">
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right font-roboto-mono text-accent">{user.score.toLocaleString()}</TableCell>
                <TableCell className="text-right font-roboto-mono">{user.challenges}</TableCell>
                <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={user.status === 'Active' ? 'bg-achievement-green' : ''}>{user.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
