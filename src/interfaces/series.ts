interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface Series {
  id: number;
  number_of_episodes: number;
  number_of_seasons: number;
  name: string;
  seasons: Season[];
}