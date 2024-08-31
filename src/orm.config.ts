import * as path from 'node:path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const PUBLIC_SCHEMA = 'public';

export const TENANT_SCHEMA_PREFIX = 'tenant_';

export const MAX_TENANT_DATA_SOURCES = 2;

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
  };
}
