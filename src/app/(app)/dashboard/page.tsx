
"use client";

import ChallengeDisplay from "@/components/game/ChallengeDisplay";
import InitialsScraper from "@/components/game/InitialsScraper";
import PlanchetteKeyboard from "@/components/game/PlanchetteKeyboard";
import Scoreboard from "@/components/game/Scoreboard";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { challenges, validatePassword, Challenge } from "@/lib/challenges";
import { OuroborosIcon } from "@/components/icons/OuroborosIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PentagramIcon } from "@/components/icons/PentagramIcon";

export default function DashboardPage() {
  const [currentInput, setCurrentInput] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [validatedRules, setValidatedRules] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  
  const [gameState, setGameState] = useState<'idle' | 'running' | 'finished'>('idle');


  const currentChallenge: Challenge | undefined = challenges[currentChallengeIndex];

  const updateValidatedRules = useCallback(async () => {
    if (!currentChallenge || gameState !== 'running') return;

    setIsChecking(true);
    const results = await validatePassword(currentInput, currentChallenge.rules);
    setValidatedRules(results);
    setIsChecking(false);
  }, [currentInput, currentChallenge, gameState]);

  useEffect(() => {
    updateValidatedRules();
  }, [updateValidatedRules]);

  useEffect(() => {
    if (currentChallenge) {
      setIsLoading(false);
      setCurrentInput("");
      setAttempts(0);
      setStartTime(null);
      setEndTime(null);
      setTimeElapsed(0);
      setGameState('idle');
    }
  }, [currentChallengeIndex, currentChallenge]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'running' && startTime && !endTime) {
      timer = setInterval(() => {
        setTimeElapsed((Date.now() - startTime) / 1000);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameState, startTime, endTime]);


  const allRulesSatisfied = useMemo(() => {
    if (validatedRules.length === 0 || !currentChallenge) return false;
    const allSatisfied = validatedRules.length === currentChallenge.rules.length && validatedRules.every(rule => rule.isSatisfied);
    if (allSatisfied) {
      setGameState('finished');
    }
    return allSatisfied;
  }, [validatedRules, currentChallenge]);

  const calculateScore = useCallback(() => {
    if (!startTime || !currentChallenge || !endTime) return 0;
  
    const timeSeconds = (endTime - startTime) / 1000;
    const maxTime = 300;
  
    // The faster the user completes, the higher the multiplier.
    // Finishes in 1s -> close to 1. Finishes in 300s -> close to 0.1
    const timeBonus = Math.max(0.1, (maxTime - timeSeconds) / maxTime);
  
    // Streak bonus: 1x for no streak, 1.1x for 1, 1.2x for 2, etc. Capped at 1.5x
    const streakBonus = Math.min(1.5, 1 + streak * 0.1);
  
    let calculatedScore =
      currentChallenge.basePoints *
      currentChallenge.multiplier *
      timeBonus *
      streakBonus;
  
    // Deduct points for multiple attempts
    if (attempts > 0) {
      calculatedScore *= Math.pow(0.9, attempts);
    }
  
    return Math.floor(Math.max(10, calculatedScore));
  }, [startTime, endTime, currentChallenge, attempts, streak]);
  

  useEffect(() => {
    if (allRulesSatisfied) {
      if (!endTime) {
        setEndTime(Date.now());
        const newScore = calculateScore();
        setScore(prev => prev + newScore);
        setStreak(prev => prev + 1);
        toast({
            title: "The Coven is Pleased!",
            description: `You have mastered the cryptic incantation! Score: +${newScore}`,
            className: 'bg-achievement-green border-none text-white'
        });
      }
    }
  }, [allRulesSatisfied, toast, endTime, calculateScore]);

  const handleKeyPress = (key: string) => {
    if (allRulesSatisfied) return;
    if (key === "DEL") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else {
      setCurrentInput((prev) => prev + key);
    }
    // Increment attempts on each keypress after the first
    if(currentInput.length > 0) {
        setAttempts(prev => prev + 1);
    }
  };
  
  const handleStartChallenge = () => {
    setGameState('running');
    setStartTime(Date.now());
  }

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
       toast({
        title: "Master Sorcerer!",
        description: "You have completed all the challenges!",
        className: 'bg-accent border-none text-black'
      });
    }
  };
  
  const difficultyMultiplier = currentChallenge?.multiplier || 1;

  if (isLoading || !currentChallenge) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <OuroborosIcon className="w-16 h-16 text-accent animate-spin" />
        <p className="ml-4 font-body text-lg">Summoning the next challenge...</p>
      </div>
    );
  }
  
  if (gameState === 'idle') {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-accent/20 text-center">
                <CardHeader>
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <PentagramIcon className="w-12 h-12 text-secondary"/>
                        <CardTitle className="font-creepster text-5xl text-accent">{currentChallenge.title}</CardTitle>
                        <PentagramIcon className="w-12 h-12 text-secondary"/>
                    </div>
                    <CardDescription className="font-body text-xl text-spectral-gray">
                        {currentChallenge.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">You have 300 seconds to complete this trial. The spirits are watching.</p>
                    <Button onClick={handleStartChallenge} size="lg" className="font-headline text-lg">
                        Begin Trial
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <ChallengeDisplay
          challenge={currentChallenge}
          rules={validatedRules}
          currentInput={currentInput}
          allSatisfied={allRulesSatisfied}
        />
        {allRulesSatisfied ? (
            <div className="text-center p-8 bg-card/80 rounded-lg">
                <h2 className="font-creepster text-5xl text-achievement-green mb-4">Incantation Complete!</h2>
                <p className="font-body text-xl text-spectral-gray mb-6">You have appeased the ancient spirits.</p>
                {currentChallengeIndex < challenges.length - 1 ? (
                    <Button onClick={handleNextChallenge} size="lg" className="font-headline">
                        Advance to the Next Trial
                    </Button>
                ) : (
                    <p className="font-headline text-2xl text-accent">You are a Master Techno-Sorcerer!</p>
                )}
            </div>
        ) : (
            <PlanchetteKeyboard onKeyPress={handleKeyPress} />
        )}
      </div>
      <div className="space-y-8">
        <Scoreboard 
            score={score}
            time={timeElapsed}
            streak={streak}
            multiplier={difficultyMultiplier}
            level={currentChallenge.title}
            attempts={attempts}
        />
        <InitialsScraper />
      </div>
    </div>
  );
}
