export interface Player {
  name: string;
  avatar: string;
}

export interface Team {
  players: Player[];
}

export interface TeamMatchup {
  teamA: Team;
  teamB: Team;
}

export interface RoundState {
  matchupIndex: number; // Current team matchup (0, 1, or 2)
  setNumber: number; // Current set within this matchup (1, 2, etc.)
  setsPerMatchup: number; // How many sets per team matchup
  teamAWins: number; // Wins for Team A in current set
  teamBWins: number; // Wins for Team B in current set
  teamASetsWon: number; // Sets won by Team A in this matchup
  teamBSetsWon: number; // Sets won by Team B in this matchup
  gamesPerSet: number; // Games to win a set (1=Bo1, 2=Bo3, 3=Bo5)
  isComplete: boolean; // Tournament finished
}

export interface MatchupResult {
  teamA: Team;
  teamB: Team;
  teamASetsWon: number;
  teamBSetsWon: number;
}

export interface GameState {
  matchups: TeamMatchup[]; // All 3 team matchups
  mapQueue: string[]; // All maps shuffled, consumed as played
  currentMaps: string[]; // Maps for current set (sliced from queue)
  round: RoundState;
  selections: Record<string, "teamA" | "teamB">; // Winner per stage
  history: MatchupResult[]; // Completed matchup results
}

/**
 * Generate all 3 unique 2v2 team matchups from 4 players.
 */
export function generateAllMatchups(players: Player[]): TeamMatchup[] {
  if (players.length !== 4) {
    throw new Error("Exactly 4 players required");
  }

  const [p1, p2, p3, p4] = players;

  return [
    { teamA: { players: [p1, p2] }, teamB: { players: [p3, p4] } },
    { teamA: { players: [p1, p3] }, teamB: { players: [p2, p4] } },
    { teamA: { players: [p1, p4] }, teamB: { players: [p2, p3] } },
  ];
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Get the maximum number of maps needed for a set
 */
export function getMaxMapsForSet(gamesPerSet: number): number {
  return gamesPerSet * 2 - 1; // Bo3 = 3, Bo5 = 5
}

/**
 * Refill map queue when it runs low
 */
export function refillMapQueue(currentQueue: string[], allMaps: string[], neededMaps: number): string[] {
  if (currentQueue.length >= neededMaps) {
    return currentQueue;
  }
  // Add shuffled maps to the queue
  return [...currentQueue, ...shuffle(allMaps)];
}
