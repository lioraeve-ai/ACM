
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
  const [timeElapsed, setTimeElapsed] = useState(0);

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
      setTimeElapsed(0);
    }
  }, [currentChallengeIndex, currentChallenge]);
  
  useEffect(() => {
    if (startTime && !endTime) {
      const timer = setInterval(() => {
        setTimeElapsed((Date.now() - startTime) / 1000);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [startTime, endTime]);


  const allRulesSatisfied = useMemo(() => {
    if (validatedRules.length === 0 || !currentChallenge) return false;
    return validatedRules.length === currentChallenge.rules.length && validatedRules.every(rule => rule.isSatisfied);
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
    if (startTime === null) {
      setStartTime(Date.now());
    }
    // Increment attempts on each keypress after the first
    if(currentInput.length > 0) {
        setAttempts(prev => prev + 1);
    }
  };

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
