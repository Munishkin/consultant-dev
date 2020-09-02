import seriesService, { SeriesService } from './seriesService';
import { Episode } from '../interfaces/season';

export class EpisodeService {
  constructor(private seriesApi: SeriesService) { }

  async getTopVotedEpisodes(seriesId: number, numberOfEpisodes: number = 10) {
    const series = await this.seriesApi.getSeries(seriesId);
    const seasonNumbers = series.seasons.map(season => season.season_number);

    const seasons = await Promise.all(
      seasonNumbers.map(seasonNumber => this.seriesApi.getSeason(seriesId, seasonNumber))
    );

    const episodes = seasons.reduce<Episode[]>((acc, season) => acc.concat(season.episodes), []);

    episodes.sort((a, b) => b.vote_average - a.vote_average);

    return {
      id: seriesId,
      name: series.name,
      episodes: episodes.slice(0, numberOfEpisodes)
    };
  }
}

export default new EpisodeService(seriesService);