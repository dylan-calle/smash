import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Trophy, Skull } from "lucide-react";

interface Player {
  name: string;
  avatar: string;
}

interface StageCardProps {
  stageUrl: string;
  players: Player[];
  winners: string[];
  onToggleWinner: (playerName: string) => void;
}

export function StageCard({ stageUrl, players, winners, onToggleWinner }: StageCardProps) {
  const isGameFinished = winners.length === 2;

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-zinc-700">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={stageUrl}
          alt="Stage"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {players.map((player) => {
            const isWinner = winners.includes(player.name);
            const isLoser = isGameFinished && !isWinner;

            return (
              <button
                key={player.name}
                title={player.name}
                onClick={() => {
                  if (!isGameFinished || isWinner) {
                    onToggleWinner(player.name);
                  }
                }}
                className={cn(
                  "group relative flex items-center justify-center gap-3 rounded-lg border p-2 transition-all",
                  isWinner
                    ? "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20"
                    : isLoser
                    ? "cursor-not-allowed border-red-900/30 bg-red-900/10 opacity-50"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800"
                )}
              >
                <Avatar className="h-10 w-10 border border-zinc-700">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span
                    className={cn(
                      "hidden 2xl:block text-xs font-bold",
                      isWinner ? "text-yellow-500" : isLoser ? "text-red-400" : "text-zinc-200"
                    )}
                  >
                    {player.name}
                  </span>
                  {isWinner && (
                    <Badge variant="outline" className="h-5 border-yellow-500/50 px-1.5 text-[10px] text-yellow-500">
                      <Trophy className="mr-1 h-3 w-3" />
                      <span className="hidden 2xl:block">Winner</span>
                    </Badge>
                  )}
                  {isLoser && (
                    <Badge variant="outline" className="h-5 border-red-900/50 px-1.5 text-[10px] text-red-400">
                      <Skull className="mr-1 h-3 w-3" />
                      <span className="hidden 2xl:block">Loser</span>
                    </Badge>
                  )}
                </div>
                {isWinner && (
                  <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
