import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Trophy, Skull } from "lucide-react";
import { Player } from "@/types/game";

interface StageCardProps {
  stageUrl: string;
  teamA: Player[];
  teamB: Player[];
  winner: "teamA" | "teamB" | null;
  onSelectWinner: (winner: "teamA" | "teamB") => void;
  disabled?: boolean;
}

export function StageCard({ stageUrl, teamA, teamB, winner, onSelectWinner, disabled = false }: StageCardProps) {
  const isTeamAWinner = winner === "teamA";
  const isTeamBWinner = winner === "teamB";

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
        <div className="relative grid grid-cols-2 gap-3">
          {/* VS divider */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 px-2 py-1 text-xs font-bold text-zinc-400 z-10">
            VS
          </div>

          {/* Team A */}
          <button
            onClick={() => !disabled && onSelectWinner("teamA")}
            disabled={disabled && !isTeamAWinner}
            className={cn(
              "group relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all",
              isTeamAWinner
                ? "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20"
                : isTeamBWinner
                ? "cursor-not-allowed border-red-900/30 bg-red-900/10 opacity-50"
                : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800",
              disabled && !isTeamAWinner && "cursor-not-allowed"
            )}
          >
            {/* Team avatars */}
            <div className="flex -space-x-2">
              {teamA.map((player) => (
                <Avatar key={player.name} className="h-10 w-10 border-2 border-zinc-900">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>

            {/* Team names */}
            <div className="flex flex-col items-center text-center">
              <span
                className={cn(
                  "text-xs font-bold leading-tight",
                  isTeamAWinner ? "text-yellow-500" : isTeamBWinner ? "text-red-400" : "text-zinc-200"
                )}
              >
                {teamA.map((p) => p.name).join(" & ")}
              </span>
            </div>

            {/* Winner badge */}
            {isTeamAWinner && (
              <Badge variant="outline" className="h-5 border-yellow-500/50 px-1.5 text-[10px] text-yellow-500">
                <Trophy className="mr-1 h-3 w-3" />
                Winner
              </Badge>
            )}
            {isTeamBWinner && (
              <Badge variant="outline" className="h-5 border-red-900/50 px-1.5 text-[10px] text-red-400">
                <Skull className="mr-1 h-3 w-3" />
                Loser
              </Badge>
            )}

            {/* Winner glow */}
            {isTeamAWinner && (
              <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            )}
          </button>

          {/* Team B */}
          <button
            onClick={() => !disabled && onSelectWinner("teamB")}
            disabled={disabled && !isTeamBWinner}
            className={cn(
              "group relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all",
              isTeamBWinner
                ? "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20"
                : isTeamAWinner
                ? "cursor-not-allowed border-red-900/30 bg-red-900/10 opacity-50"
                : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800",
              disabled && !isTeamBWinner && "cursor-not-allowed"
            )}
          >
            {/* Team avatars */}
            <div className="flex -space-x-2">
              {teamB.map((player) => (
                <Avatar key={player.name} className="h-10 w-10 border-2 border-zinc-900">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>

            {/* Team names */}
            <div className="flex flex-col items-center text-center">
              <span
                className={cn(
                  "text-xs font-bold leading-tight",
                  isTeamBWinner ? "text-yellow-500" : isTeamAWinner ? "text-red-400" : "text-zinc-200"
                )}
              >
                {teamB.map((p) => p.name).join(" & ")}
              </span>
            </div>

            {/* Winner badge */}
            {isTeamBWinner && (
              <Badge variant="outline" className="h-5 border-yellow-500/50 px-1.5 text-[10px] text-yellow-500">
                <Trophy className="mr-1 h-3 w-3" />
                Winner
              </Badge>
            )}
            {isTeamAWinner && (
              <Badge variant="outline" className="h-5 border-red-900/50 px-1.5 text-[10px] text-red-400">
                <Skull className="mr-1 h-3 w-3" />
                Loser
              </Badge>
            )}

            {/* Winner glow */}
            {isTeamBWinner && (
              <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
