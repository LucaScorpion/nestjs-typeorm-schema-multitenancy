import * as path from 'node:path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const PUBLIC_SCHEMA = 'public';

export const TENANT_SCHEMA_PREFIX = 'tenant_';

const MAX_CONNECTIONS = 2;

export const MAX_TENANT_DATA_SOURCES = Math.floor(MAX_CONNECTIONS * 0.9);

const MAX_PUBLIC_CONNECTIONS = MAX_CONNECTIONS - MAX_TENANT_DATA_SOURCES;

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
      max: 1,
    },
  };
}
