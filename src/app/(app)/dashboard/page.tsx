
"use client";

import ChallengeDisplay from "@/components/game/ChallengeDisplay";
import InitialsScraper from "@/components/game/InitialsScraper";
import PlanchetteKeyboard from "@/components/game/PlanchetteKeyboard";
import Scoreboard from "@/components/game/Scoreboard";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

const challenges = [
    { tier: 1, title: "The First Cipher", description: "Transcribe the arcane phrase to proceed.", phrase: "ACM DUBAI", basePoints: 1000, multiplier: 1 },
    { tier: 1, title: "Whispers of the Machine", description: "The spirits whisper a new incantation.", phrase: "GENKIT AI", basePoints: 1200, multiplier: 1 },
    { tier: 2, title: "Algorithmic Incantation", description: "A more complex sequence is required.", phrase: "MYSTICAL PLANCHETTE", basePoints: 2000, multiplier: 1.5 },
    { tier: 2, title: "The Sorcerer's Code", description: "Unlock the next level of power.", phrase: "HAPTIC NECROMANCY", basePoints: 2200, multiplier: 1.5 },
    { tier: 3, title: "Grandmaster's Gambit", description: "The ultimate test of a digital mage.", phrase: "CRYPTIC COVEN", basePoints: 3000, multiplier: 2 },
];

export default function DashboardPage() {
  const [currentInput, setCurrentInput] = useState("");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const { toast } = useToast();

  const currentChallenge = challenges[challengeIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime) {
      timer = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const advanceChallenge = useCallback(() => {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex(prev => prev + 1);
      setCurrentInput("");
      setStartTime(Date.now());
    } else {
      // Game over
      setStartTime(null);
      toast({ title: "Congratulations!", description: "You have completed all challenges!" });
    }
  }, [challengeIndex, toast]);

  const handleCorrectCompletion = useCallback(() => {
    const completionTime = time / 1000;
    const streakBonus = 1 + streak * 0.1;
    const points = Math.round(currentChallenge.basePoints * (300 / (completionTime + 10)) * currentChallenge.multiplier * streakBonus);
    
    setScore(prev => prev + points);
    setStreak(prev => prev + 1);

    toast({
        title: "Success!",
        description: `You earned ${points} points.`,
        className: 'bg-achievement-green border-none text-white'
    });

    advanceChallenge();
  }, [time, streak, currentChallenge, advanceChallenge, toast]);

  const handleIncorrectSubmission = () => {
    toast({
        variant: "destructive",
        title: "A Misstep!",
        description: "Your streak has been broken.",
    });
    setStreak(0);
    if(navigator.vibrate) navigator.vibrate(200);
  };


  useEffect(() => {
    if (currentInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (currentInput.length > 0 && !currentChallenge.phrase.startsWith(currentInput)) {
      handleIncorrectSubmission();
      setCurrentInput(prev => prev.slice(0, -1));
    }
    
    if (currentInput === currentChallenge.phrase) {
        handleCorrectCompletion();
    }
  }, [currentInput, currentChallenge.phrase, handleCorrectCompletion, startTime]);

  const handleKeyPress = (key: string) => {
    if (key === "DEL") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else {
      setCurrentInput((prev) => prev + key);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <ChallengeDisplay
          challenge={currentChallenge}
          currentInput={currentInput}
        />
        <PlanchetteKeyboard onKeyPress={handleKeyPress} />
      </div>
      <div className="space-y-8">
        <Scoreboard 
            score={score}
            time={time / 1000}
            streak={streak}
            multiplier={currentChallenge.multiplier}
        />
        <InitialsScraper />
      </div>
    </div>
  );
}

