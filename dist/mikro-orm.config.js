"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const sqlite_1 = require("@mikro-orm/sqlite");
const migrations_1 = require("@mikro-orm/migrations");
exports.default = (0, sqlite_1.defineConfig)({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    dbName: 'tasks.sqlite3',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: true,
    loadStrategy: core_1.LoadStrategy.JOINED,
    registerRequestContext: false,
    extensions: [migrations_1.Migrator],
});
//# sourceMappingURL=mikro-orm.config.js.map