import { LoadStrategy } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/sqlite';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  dbName: 'tasks.sqlite3',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator],
});
