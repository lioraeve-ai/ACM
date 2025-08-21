
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import type { Challenge, Rule } from "@/lib/challenges";

interface ChallengeDisplayProps {
  challenge: Challenge;
  rules: (Rule & { isSatisfied: boolean })[];
  currentInput: string;
  allSatisfied: boolean;
}

export default function ChallengeDisplay({ challenge, rules, currentInput, allSatisfied }: ChallengeDisplayProps) {
  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="font-creepster text-3xl md:text-4xl text-accent">
          ACM CRYPTIC COVEN
        </CardTitle>
        <CardDescription className="font-body text-lg text-spectral-gray">
          {`Level ${challenge.tier}: ${challenge.title}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-primary/20 p-4 rounded-md border border-primary/50 mb-6 min-h-[6rem]">
          <p className={`font-code text-2xl tracking-widest break-all ${allSatisfied ? 'text-achievement-green' : 'text-foreground'}`}>
            {currentInput}
            <span className={allSatisfied ? "hidden" : "animate-ping"}>_</span>
          </p>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {rules.map((rule, index) => (
            <div key={index} className={`flex items-start gap-3 transition-colors duration-300 ${rule.isSatisfied ? 'text-achievement-green' : 'text-muted-foreground'}`}>
              <div className="flex-shrink-0 pt-1">
                {rule.isSatisfied ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <span className={`font-body text-base ${rule.isSatisfied ? 'font-semibold' : ''}`}>{rule.description}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

    