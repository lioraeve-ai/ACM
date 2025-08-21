
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PlanchetteIcon } from "@/components/icons/PlanchetteIcon";

interface PlanchetteKeyboardProps {
  onKeyPress: (key: string) => void;
}

const numKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const keysQWERTY = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L",
  "Z", "X", "C", "V", "B", "N", "M",
];
const symbolKeys = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", ";", ":", ",", ".", "<", ">", "/", "?", "~"];


export default function PlanchetteKeyboard({ onKeyPress }: PlanchetteKeyboardProps) {
  const [planchettePos, setPlanchettePos] = useState({ top: 0, left: 0, opacity: 0 });
  const keyRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const allKeys = [...numKeys, ...keysQWERTY, ...symbolKeys, " ", "DEL"];

  const movePlanchette = (key: string) => {
    const keyElement = keyRefs.current[key];
    if (keyElement && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const keyRect = keyElement.getBoundingClientRect();
      setPlanchettePos({
        top: keyRect.top - containerRect.top + keyRect.height / 2,
        left: keyRect.left - containerRect.left + keyRect.width / 2,
        opacity: 1,
      });
    }
  };

  const handleKeyPress = (key: string) => {
    onKeyPress(key);
    movePlanchette(key);
    // Haptic Necromancy: Soft whisper for letter selection
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    // Initial position
    movePlanchette("A");
  }, []);

  const KeyButton = ({ value, className = "" }: { value: string, className?: string }) => (
    <button
      ref={(el) => (keyRefs.current[value] = el)}
      onClick={() => handleKeyPress(value)}
      className={cn(
        "font-creepster text-2xl h-14 w-full rounded-md flex items-center justify-center",
        "bg-primary/20 hover:bg-primary/40 text-spectral-gray border border-primary/50",
        "transition-all duration-200 active:scale-90 active:bg-accent active:text-accent-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
    >
      {value}
    </button>
  );

  return (
    <div ref={containerRef} className="relative bg-card/50 p-4 rounded-lg border border-border shadow-lg">
      <PlanchetteIcon
        className="absolute w-12 h-12 text-accent transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out pointer-events-none z-10"
        style={planchettePos}
      />
      <div className="space-y-2">
        <div className="grid grid-cols-10 gap-2">
          {numKeys.map((key) => <KeyButton key={key} value={key} />)}
        </div>
        <div className="grid grid-cols-10 gap-2">
          {keysQWERTY.slice(0, 10).map((key) => <KeyButton key={key} value={key} />)}
        </div>
        <div className="grid grid-cols-10 gap-2">
            <div className="col-span-1"/>
            {keysQWERTY.slice(10, 19).map((key) => <KeyButton key={key} value={key} />)}
            <div className="col-span-1"/>
        </div>
        <div className="grid grid-cols-10 gap-2">
            <div className="col-span-2"/>
            {keysQWERTY.slice(19).map((key) => <KeyButton key={key} value={key} />)}
            <div className="col-span-2"/>
        </div>
         <div className="grid grid-cols-10 gap-2">
          {symbolKeys.slice(0, 10).map((key) => <KeyButton key={key} value={key} />)}
        </div>
        <div className="grid grid-cols-10 gap-2">
          {symbolKeys.slice(10, 20).map((key) => <KeyButton key={key} value={key} />)}
        </div>
         <div className="grid grid-cols-10 gap-2">
            <div className="col-span-2"/>
            {symbolKeys.slice(20).map((key) => <KeyButton key={key} value={key} />)}
            <div className="col-span-2"/>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2">
            <button ref={(el) => (keyRefs.current[" "] = el)} onClick={() => handleKeyPress(" ")} className="font-roboto-mono h-14 rounded-md bg-primary/20 hover:bg-primary/40 text-spectral-gray border border-primary/50 col-span-2">
              SPACE
            </button>
            <button ref={(el) => (keyRefs.current["DEL"] = el)} onClick={() => handleKeyPress("DEL")} className="font-roboto-mono h-14 rounded-md bg-destructive/50 hover:bg-destructive/80 text-spectral-gray border border-destructive/50 col-span-2">
              DELETE
            </button>
        </div>
      </div>
    </div>
  );
}
