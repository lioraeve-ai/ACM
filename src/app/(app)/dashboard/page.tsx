
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

export default function DashboardPage() {
  const [currentInput, setCurrentInput] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [validatedRules, setValidatedRules] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentChallenge: Challenge | undefined = challenges[currentChallengeIndex];

  const updateValidatedRules = useCallback(async () => {
    if (!currentChallenge) return;

    setIsChecking(true);
    const results = await validatePassword(currentInput, currentChallenge.rules);
    setValidatedRules(results);
    setIsChecking(false);
  }, [currentInput, currentChallenge]);

  useEffect(() => {
    updateValidatedRules();
  }, [updateValidatedRules]);

  useEffect(() => {
    if (currentChallenge) {
      setIsLoading(false);
      setCurrentInput("");
      setAttempts(0);
      setStartTime(Date.now());
      setEndTime(null);
    }
  }, [currentChallengeIndex, currentChallenge]);

  const allRulesSatisfied = useMemo(() => {
    if (validatedRules.length === 0) return false;
    return validatedRules.every(rule => rule.isSatisfied);
  }, [validatedRules]);

  const calculateScore = () => {
    if (!startTime || !currentChallenge) return 0;
    const end = endTime || Date.now();
    const timeSeconds = (end - startTime) / 1000;
    const maxTime = 300; // 5 minutes

    const timeMultiplier = Math.max(0.1, (maxTime - timeSeconds) / maxTime);
    const completionRatio = validatedRules.filter(r => r.isSatisfied).length / currentChallenge.rules.length;
    const attemptPenalty = Math.max(0, (attempts - 1) * 10);
    
    const finalScore = Math.max(10, 
      (currentChallenge.basePoints * timeMultiplier * completionRatio) - attemptPenalty
    );
    
    return Math.floor(finalScore);
  };

  useEffect(() => {
    if (allRulesSatisfied) {
      if (!endTime) {
          setEndTime(Date.now());
          const newScore = calculateScore();
          setScore(prev => prev + newScore);
          setStreak(prev => prev + 1);
          toast({
            title: "The Coven is Pleased!",
            description: "You have mastered the cryptic incantation!",
            className: 'bg-achievement-green border-none text-white'
          });
      }
    }
  }, [allRulesSatisfied, toast, endTime]);

  const handleKeyPress = (key: string) => {
    if (allRulesSatisfied) return;
    if (key === "DEL") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else {
      setCurrentInput((prev) => prev + key);
    }
    if (startTime === null) {
      setStartTime(Date.now());
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    }
  };
  
  const timeElapsed = startTime && !endTime ? (Date.now() - startTime) / 1000 : 0;
  const difficultyMultiplier = currentChallenge?.multiplier || 1;

  if (isLoading || !currentChallenge) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <OuroborosIcon className="w-16 h-16 text-accent animate-spin" />
        <p className="ml-4 font-body text-lg">Summoning the next challenge...</p>
      </div>
    );
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

    