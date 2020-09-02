import { Request, Response } from 'express';
import episodeService, { EpisodeService } from '../services/episodeService';
import cacheStorage, { CacheStorage } from '../services/cacheStorage';
import { SeriesModel } from '../models/series';
import { Episode } from '../interfaces/season';

class SeriesContoller {
  constructor(private series: EpisodeService, private cache: CacheStorage) { }

  getTopVotedEpisodes = async (req: Request, res: Response) => {
    const seriesId = parseInt(req.params.seriesId, 10);
    let name = '';
    let episodes: Episode[] = [];

    if (await this.cache.has(seriesId)) {
      const data = await this.cache.get(seriesId);

      name = data.name;
      episodes = data.episodes;
    } else {
      const data = await this.series.getTopVotedEpisodes(seriesId);
      this.cache.set(seriesId, data)

      name = data.name;
      episodes = data.episodes;
    }

    await SeriesModel.updateOne({ id: seriesId }, {
      $inc: { accessCount: 1 },
      $set: {
        id: seriesId,
        seriesName: name,
      }
    }, { upsert: true });

    res.json({
      episodes: episodes.map(({ name: episodeName, vote_average: averageVotes }) => ({
        episodeName,
        averageVotes
      }))
    })
  }

  getPopularSeries = async (req: Request, res: Response) => {
    const series = await SeriesModel.find({}, '-_id seriesName accessCount')
      .sort({ accessCount: -1 })
      .limit(5);

    res.send({
      series
    })
  }
}

export default new SeriesContoller(episodeService, cacheStorage);