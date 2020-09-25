export interface Info {
  id: number;
  steam_id: string;
  username: string;
  time_registered: Date;
  allowed: number;
  privileges: number;
  usergroups: number;
  mute_endtime: Date;
  latest_activity: Date;
  country: string;
  avatar_url: string;
  userpage: string;
  online: boolean;
}

export interface ProfileBadge {
  id: number;
  name: string;
  description: string;
}

export interface Map {
  id: number;
  name: string;
}

export interface ActivityFeed {
  id: number;
  type: number;
  timestamp: Date;
  map: Map;
}

export interface Stats {
  user_id: number;
  total_score: number;
  ranked_score: number;
  overall_accuracy: number;
  overall_performance_rating: number;
  play_count: number;
  fail_count: number;
  max_combo: number;
  replays_watched: number;
  total_marv: number;
  total_perf: number;
  total_great: number;
  total_good: number;
  total_okay: number;
  total_miss: number;
  total_pauses: number;
  multiplayer_wins: number;
  multiplayer_losses: number;
  multiplayer_ties: number;
}

export interface Keys4 {
  globalRank: number;
  countryRank: number;
  multiplayerWinRank: number;
  stats: Stats;
}

export interface Keys7 {
  globalRank: number;
  countryRank: number;
  multiplayerWinRank: number;
  stats: Stats;
}

export interface User {
  info: Info;
  profile_badges: ProfileBadge[];
  activity_feed: ActivityFeed[];
  keys4: Keys4;
  keys7: Keys7;
}

export default interface QuaverUsersFull {
  status: number;
  user: User;
}
