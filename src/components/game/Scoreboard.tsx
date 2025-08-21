import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Scoreboard() {
  const scoreData = {
    score: 1337,
    time: "120.5s",
    streak: 5,
    multiplier: "x2.5",
  };

  return (
    <Card className="bg-card/50 border-border text-center">
      <CardHeader>
        <CardTitle className="font-creepster text-4xl text-accent">Scoreboard</CardTitle>
      </CardHeader>
      <CardContent className="font-roboto-mono text-lg space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground">SCORE:</span>
          <span className="text-2xl font-bold text-accent">{scoreData.score}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">TIME:</span>
          <span>{scoreData.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">STREAK:</span>
          <span className="text-achievement-green">{scoreData.streak}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">MULTIPLIER:</span>
          <span className="text-challenge-orange">{scoreData.multiplier}</span>
        </div>
      </CardContent>
    </Card>
  );
}
