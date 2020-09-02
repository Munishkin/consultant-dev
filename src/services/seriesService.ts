import requestService, { RequestService } from './requestService';
import { Series } from '../interfaces/series';
import { Season } from '../interfaces/season';

export class SeriesService {
  constructor(private api: RequestService) { }

  getSeries(seriesId: number) {
    return this.api.get<Series>(`tv/${seriesId}`)
  }

  getSeason(seriesId: number, seasonId: number) {
    return this.api.get<Season>(`tv/${seriesId}/season/${seasonId}`)
  }
}

export default new SeriesService(requestService);