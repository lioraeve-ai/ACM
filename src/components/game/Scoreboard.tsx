
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ScoreboardProps {
  score: number;
  time: number;
  streak: number;
  multiplier: number;
  level: string;
  attempts: number;
}

export default function Scoreboard({ score, time, streak, multiplier, level, attempts }: ScoreboardProps) {
  return (
    <Card className="bg-card/50 border-border text-center">
      <CardHeader>
        <CardTitle className="font-creepster text-4xl text-accent">Scoreboard</CardTitle>
      </CardHeader>
      <CardContent className="font-roboto-mono text-lg space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground">SCORE:</span>
          <span className="text-2xl font-bold text-accent">{score.toLocaleString()}</span>
        </div>
         <div className="flex justify-between">
          <span className="text-muted-foreground">LEVEL:</span>
          <span className="text-base text-secondary truncate">{level}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">TIME:</span>
          <span>{time.toFixed(1)}s / 300s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">STREAK:</span>
          <span className="text-achievement-green">{streak}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">MULTIPLIER:</span>
          <span className="text-challenge-orange">x{multiplier.toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">ATTEMPTS:</span>
          <span className="text-destructive">{attempts}</span>
        </div>
      </CardContent>
    </Card>
  );
}

    