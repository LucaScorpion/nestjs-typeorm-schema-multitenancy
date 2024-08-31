import { LRUCache } from 'lru-cache';
import { DataSource } from 'typeorm';

const lruCacheOptions: LRUCache.Options<string, DataSource, unknown> = {
  max: 50,

  dispose: async (source: DataSource) => {
    await source.destroy();
  },
};

class DataSourceManager {
  private readonly cache = new LRUCache(lruCacheOptions);

  public get(name: string): DataSource | undefined {
    return this.cache.get(name);
  }

  public set(name: string, data: DataSource): void {
    this.cache.set(name, data);
  }

  public destroy(name: string): void {
    this.cache.delete(name);
  }

  public getOrCreate(name: string, createFn: () => DataSource): DataSource {
    const existing = this.get(name);
    if (existing) {
      return existing;
    }

    const created = createFn();
    this.set(name, created);
    return created;
  }
}

export const dataSourceManager = new DataSourceManager();
