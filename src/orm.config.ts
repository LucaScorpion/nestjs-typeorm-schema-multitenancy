import * as path from 'node:path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Logger } from '@nestjs/common';

export const PUBLIC_SCHEMA = 'public';
export const TENANT_SCHEMA_PREFIX = 'tenant_';

const MAX_CONNECTIONS = 3;
const MAX_PUBLIC_CONNECTIONS = Math.max(1, Math.floor(MAX_CONNECTIONS * 0.1));
const MAX_TENANTED_CONNECTIONS = MAX_CONNECTIONS - MAX_PUBLIC_CONNECTIONS;
const MAX_CONNECTIONS_PER_TENANT = 1;
export const MAX_TENANT_DATA_SOURCES = Math.floor(
  MAX_TENANTED_CONNECTIONS / MAX_CONNECTIONS_PER_TENANT,
);

const logger = new Logger('ormConfig');
logger.debug(`Max connections: ${MAX_CONNECTIONS}`);
logger.debug(`Max public connections: ${MAX_PUBLIC_CONNECTIONS}`);
logger.debug(`Max tenanted connections: ${MAX_TENANTED_CONNECTIONS}`);
logger.debug(`Max connections per tenant: ${MAX_CONNECTIONS_PER_TENANT}`);
logger.debug(`Max tenanted data sources: ${MAX_TENANT_DATA_SOURCES}`);

export function publicOrmConfigFactory(): PostgresConnectionOptions {
  return {
    type: 'postgres',
    host: 'localhost',
    database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    schema: PUBLIC_SCHEMA,
    synchronize: true,
    entities: [path.join(__dirname, 'public/**/*.entity.{ts,js}')],
    migrations: [path.join(__dirname, 'migrations/public/*.{ts,js}')],
    extra: {
      max: MAX_PUBLIC_CONNECTIONS,
    },
  };
}

export function tenantedOrmConfigFactory(
  schema: string,
): PostgresConnectionOptions {
  return {
    ...publicOrmConfigFactory(),
    schema,
    entities: [path.join(__dirname, '**/*.entity.{ts,js}')],
    migrations: [path.join(__dirname, 'migrations/tenanted/*.{ts,js}')],
    extra: {
      max: MAX_CONNECTIONS_PER_TENANT,
    },
  };
}
