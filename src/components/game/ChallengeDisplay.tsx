"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface ChallengeDisplayProps {
  challenge: {
    tier: number;
    title: string;
    description: string;
    phrase: string;
  };
  currentInput: string;
}

export default function ChallengeDisplay({ challenge, currentInput }: ChallengeDisplayProps) {
  const isCorrect = challenge.phrase.startsWith(currentInput) && currentInput.length > 0;
  const isComplete = currentInput === challenge.phrase;

  let displayColor = "text-foreground";
  if (isComplete) {
    displayColor = "text-achievement-green";
  } else if (!isCorrect) {
    displayColor = "text-destructive";
  }

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline text-2xl text-accent">
            Tier {challenge.tier}: {challenge.title}
          </CardTitle>
          <div className="font-roboto-mono text-sm text-muted-foreground">
            {currentInput.length} / {challenge.phrase.length}
          </div>
        </div>
        <CardDescription className="font-body">{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-primary/20 p-4 rounded-md border border-primary/50">
          <p className="font-code text-2xl text-muted-foreground tracking-widest min-h-[3rem]">
            {challenge.phrase.split('').map((char, index) => (
              <span key={index} className={index < currentInput.length ? 'text-accent' : ''}>
                {char}
              </span>
            ))}
          </p>
          <p className={`font-code text-2xl tracking-widest min-h-[3rem] mt-2 ${displayColor}`}>
            {currentInput}
            <span className="animate-ping">_</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
