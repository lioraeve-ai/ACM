"use client";

import ChallengeDisplay from "@/components/game/ChallengeDisplay";
import InitialsScraper from "@/components/game/InitialsScraper";
import PlanchetteKeyboard from "@/components/game/PlanchetteKeyboard";
import Scoreboard from "@/components/game/Scoreboard";
import { useState } from "react";

export default function DashboardPage() {
  const [currentInput, setCurrentInput] = useState("");

  const handleKeyPress = (key: string) => {
    if (key === "DEL") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (key === " ") {
      setCurrentInput((prev) => prev + " ");
    } else {
      setCurrentInput((prev) => prev + key);
    }
  };

  const currentChallenge = {
    tier: 1,
    title: "The Enigma of the First Ones",
    description: "Transcribe the arcane phrase to proceed. Precision is paramount.",
    phrase: "ACM DUBAI ROCKS",
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
        <Scoreboard />
        <InitialsScraper />
      </div>
    </div>
  );
}
