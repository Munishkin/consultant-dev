export interface Episode {
  air_date: string
  episode_number: number;
  name: string
  overview: string
  id: number;
  season_number: number
  vote_average: number
  vote_count: number
}

export interface Season {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  season_number: number;
}