import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TENANT_SCHEMA_PREFIX } from './orm.config';
import {
  getTenantDataSource,
  syncDataSource,
} from './tenancy/tenant.data-source';

const logger = new Logger('main');

(async () => {
  const app = await NestFactory.create(AppModule);

  const manager = app.get(EntityManager);
  await syncTenantSchemas(manager);

  await app.listen(3000);
})();

async function syncTenantSchemas(manager: EntityManager) {
  logger.debug(`Synchronizing tenant schemas`);
  const schemas = await manager.query(`
      select schema_name
      from information_schema.schemata
      where schema_name like '${TENANT_SCHEMA_PREFIX}%'
  `);

  for (const row of schemas) {
    const schema: string = row.schema_name;
    const tenantId = parseInt(schema.replace(TENANT_SCHEMA_PREFIX, ''), 10);

    logger.debug(`Synchronizing tenant ${tenantId}`);
    const dataSource = await getTenantDataSource(tenantId);
    await syncDataSource(dataSource);
  }
}
