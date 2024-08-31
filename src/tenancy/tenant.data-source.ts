import { DataSource } from 'typeorm';
import { TENANT_SCHEMA_PREFIX, tenantedOrmConfigFactory } from '../orm.config';
import { dataSourceManager } from './data-source.manager';
import { Logger } from '@nestjs/common';

const logger = new Logger('tenantDataSource');

export async function getTenantDataSource(
  tenantId: number,
): Promise<DataSource> {
  const schema = tenantSchemaName(tenantId);

  return dataSourceManager.getOrCreate(schema, async () => {
    logger.debug(`Creating data source for tenant ${tenantId}`);
    const source = new DataSource(tenantedOrmConfigFactory(schema));
    await source.initialize();
    return source;
  });
}

export function tenantSchemaName(tenantId: number): string {
  return `${TENANT_SCHEMA_PREFIX}${tenantId}`;
}

export async function syncDataSource(source: DataSource): Promise<void> {
  await source.synchronize();
}
