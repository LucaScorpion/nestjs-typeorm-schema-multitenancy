import { LRUCache } from 'lru-cache';
import { DataSource } from 'typeorm';
import { MAX_TENANT_DATA_SOURCES } from '../orm.config';

class DataSourceManager {
  private readonly cache = new LRUCache<string, DataSource, unknown>({
    max: MAX_TENANT_DATA_SOURCES,

    dispose: async (source: DataSource) => {
      await source.destroy();
    },
  });

  public async getOrCreate(
    name: string,
    createFn: () => Promise<DataSource>,
  ): Promise<DataSource> {
    const existing = this.cache.get(name);
    if (existing) {
      return existing;
    }

    const created = await createFn();
    this.cache.set(name, created);
    return created;
  }
}

export const dataSourceManager = new DataSourceManager();
