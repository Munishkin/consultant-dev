import redis from 'redis';
import { promisify } from 'util';

export class CacheStorage {
  private client = redis.createClient(process.env.REDIS_URL);
  private getAsync = promisify(this.client.get).bind(this.client);
  private setAsync = promisify(this.client.set).bind(this.client);

  set(id: number, data: any) {
    return this.setAsync(id.toString(), JSON.stringify(data));
  }

  get(id: number) {
    return this.getAsync(id.toString()).then((data: any) => JSON.parse(data));
  }

  has(id: number) {
    return this.getAsync(id.toString()).then((data: any) => !!data);
  }
}

export default new CacheStorage();
