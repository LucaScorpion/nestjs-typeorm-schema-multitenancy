# NestJS schema-based multitenancy

A schema-based multitenancy setup for [NestJS](https://nestjs.com)
with [TypeORM](https://typeorm.io).

## Quick start

```shell
# Start PostgreSQL
docker compose up -d

# Install dependencies
npm i

# Start the application
npm start
```

## API scripts

The [bin](bin) folder contains a couple of helper scripts, which make API calls.

## Tweaks

Changing the max number of connections Postgres will accept can be done in the [docker-compose.yml](docker-compose.yml).
All TypeORM configuration is located in [src/orm.config.ts](src/orm.config.ts).
The data source manager and request limiter also read from this configuration.
