
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface Rule {
  description: string;
  isSatisfied: boolean;
}

interface ChallengeDisplayProps {
  rules: Rule[];
  currentInput: string;
  allSatisfied: boolean;
}

export default function ChallengeDisplay({ rules, currentInput, allSatisfied }: ChallengeDisplayProps) {
  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-accent">
          The Cryptic Incantation
        </CardTitle>
        <CardDescription className="font-body">
          Your input must satisfy all of the ancient rules below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-primary/20 p-4 rounded-md border border-primary/50 mb-6">
          <p className={`font-code text-2xl tracking-widest min-h-[3rem] break-all ${allSatisfied ? 'text-achievement-green' : 'text-foreground'}`}>
            {currentInput}
            <span className={allSatisfied ? "hidden" : "animate-ping"}>_</span>
          </p>
        </div>
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <div key={index} className={`flex items-center gap-3 transition-colors duration-500 ${rule.isSatisfied ? 'text-achievement-green' : 'text-muted-foreground'}`}>
              {rule.isSatisfied ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span className={`font-body ${rule.isSatisfied ? 'font-semibold' : ''}`}>{rule.description}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
