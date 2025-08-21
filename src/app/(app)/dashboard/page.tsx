
"use client";

import ChallengeDisplay from "@/components/game/ChallengeDisplay";
import InitialsScraper from "@/components/game/InitialsScraper";
import PlanchetteKeyboard from "@/components/game/PlanchetteKeyboard";
import Scoreboard from "@/components/game/Scoreboard";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

const rules = [
    { description: "Must include the sacred characters 'ACM'.", test: (input: string) => input.includes('ACM') },
    { description: "Must contain the mystical number '1337'.", test: (input: string) => input.includes('1337') },
    { description: "Must be at least 16 characters long.", test: (input: string) => input.length >= 16 },
    { description: "Must summon the spirit of 'GENKIT'.", test: (input: string) => input.includes('GENKIT') },
    { description: "Must end with a celestial alignment ('!*').", test: (input: string) => input.endsWith('!*') },
    { description: "The sum of all digits must be 21.", test: (input: string) => {
        const digits = input.match(/\d/g);
        if (!digits) return false;
        return digits.map(Number).reduce((a, b) => a + b, 0) === 21;
      }
    },
    { description: "Must contain a month of the year.", test: (input: string) => {
        const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        return months.some(month => input.toUpperCase().includes(month));
      }
    },
];

export default function DashboardPage() {
  const [currentInput, setCurrentInput] = useState("");
  const { toast } = useToast();

  const validatedRules = useMemo(() => {
    return rules.map(rule => ({
      ...rule,
      isSatisfied: rule.test(currentInput)
    }));
  }, [currentInput]);

  const allRulesSatisfied = useMemo(() => {
    return validatedRules.every(rule => rule.isSatisfied);
  }, [validatedRules]);


  const handleKeyPress = (key: string) => {
    if (allRulesSatisfied) return;
    if (key === "DEL") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else {
      setCurrentInput((prev) => prev + key);
    }
  };

  if (allRulesSatisfied) {
     toast({
        title: "The Coven is Pleased!",
        description: "You have mastered the cryptic incantation!",
        className: 'bg-achievement-green border-none text-white'
    });
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <ChallengeDisplay
          rules={validatedRules}
          currentInput={currentInput}
          allSatisfied={allRulesSatisfied}
        />
        <PlanchetteKeyboard onKeyPress={handleKeyPress} />
      </div>
      <div className="space-y-8">
        <Scoreboard 
            score={0}
            time={0}
            streak={0}
            multiplier={1}
        />
        <InitialsScraper />
      </div>
    </div>
  );
}
