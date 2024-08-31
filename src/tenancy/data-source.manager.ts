import { LRUCache } from 'lru-cache';
import { DataSource } from 'typeorm';
import { MAX_TENANT_DATA_SOURCES } from '../orm.config';

const lruCacheOptions: LRUCache.Options<string, DataSource, unknown> = {
  max: MAX_TENANT_DATA_SOURCES,

  dispose: async (source: DataSource) => {
    await source.destroy();
  },
};

class DataSourceManager {
  private readonly cache = new LRUCache(lruCacheOptions);

  private get(name: string): DataSource | undefined {
    return this.cache.get(name);
  }

  private set(name: string, data: DataSource): void {
    this.cache.set(name, data);
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
