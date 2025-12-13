"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { StageCard } from "@/components/StageCard";
import { Button } from "@/components/ui/button";
import { Shuffle, Swords } from "lucide-react";

const ALL_STAGES = [
  "/stages/dk.png",
  "/stages/fox.png",
  "/stages/kirby.png",
  "/stages/link.png",
  "/stages/mario.png",
  "/stages/pikachu.png",
  "/stages/samus.png",
  "/stages/yoshi.png",
];

const PLAYERS = [
  {
    name: "{bUCKEHEAD}",
    avatar: "/avatars/me.webp",
  },
  {
    name: "PAILY",
    avatar: "/avatars/paily09.webp",
  },
  {
    name: "carlimba18",
    avatar: "/avatars/excalibur.webp",
  },
  {
    name: "AlejO",
    avatar: "/avatars/negra.webp",
  },
];

export default function Home() {
  const [stages, setStages] = useState<string[]>([]);
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const handleRandomize = () => {
    const shuffled = [...ALL_STAGES].sort(() => Math.random() - 0.5);
    setStages(shuffled);
    setSelections({}); // Reset selections on re-roll
  };

  // useEffect(() => {
  //   // Initial shuffle
  //   handleRandomize();
  // }, []);

  const handleToggleWinner = (stageUrl: string, playerName: string) => {
    setSelections((prev) => {
      const currentWinners = prev[stageUrl] || [];
      const isWinner = currentWinners.includes(playerName);

      if (isWinner) {
        // Remove winner
        return {
          ...prev,
          [stageUrl]: currentWinners.filter((w) => w !== playerName),
        };
      } else {
        // Add winner if less than 2
        if (currentWinners.length < 2) {
          return {
            ...prev,
            [stageUrl]: [...currentWinners, playerName],
          };
        }
        return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-yellow-500/30">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="mb-12 flex flex-col items-center justify-center gap-6 text-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-yellow-500/20 blur-xl" />
            <Image
              src="/Smash_64.webp"
              alt="Super Smash Bros"
              width={400}
              height={200}
              className="relative drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={handleRandomize}
              className="cursor-pointer group h-14 gap-2 border-yellow-500/50 bg-yellow-500/10 text-lg font-bold text-yellow-500 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              <Shuffle className="h-5 w-5 transition-transform group-hover:rotate-180" />
              Random
            </Button>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className="animate-in fade-in zoom-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-2 flex items-center gap-2 px-1 text-sm font-medium text-zinc-500">
                <Swords className="h-4 w-4" />
                <span>Match {index + 1}</span>
              </div>
              <StageCard
                stageUrl={stage}
                players={PLAYERS}
                winners={selections[stage] || []}
                onToggleWinner={(player) => handleToggleWinner(stage, player)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
