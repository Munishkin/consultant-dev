import axios from 'axios';
import { BASE_URL } from '../constants';

export class RequestService {
  private client = axios.create();

  constructor(private baseUrl: string) { }

  get<T = any>(path: string) {
    return this.client
      .get<T>(`${this.baseUrl}/${path}?api_key=${process.env.API_KEY}`)
      .then(res => res.data);
  }
}

export default new RequestService(BASE_URL);