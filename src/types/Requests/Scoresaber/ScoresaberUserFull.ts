export interface Badge {
  image: string;
  description: string;
}

export interface PlayerInfo {
  playerId: string;
  playerName: string;
  avatar: string;
  rank: number;
  countryRank: number;
  pp: number;
  country: string;
  role: string;
  badges: Badge[];
  history: string;
  permissions: number;
  inactive: number;
  banned: number;
}

export interface ScoreStats {
  totalScore: number;
  totalRankedScore: number;
  averageRankedAccuracy: number;
  totalPlayCount: number;
  rankedPlayCount: number;
}

export interface ScoresaberUserFull {
  playerInfo: PlayerInfo;
  scoreStats: ScoreStats;
}
