"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230314213026 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230314213026 extends migrations_1.Migration {
    async up() {
        this.addSql('PRAGMA foreign_keys = OFF;');
        this.addSql('CREATE TABLE `_knex_temp_alter314` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `name` text NOT NULL, `cron` text, `active` integer NOT NULL, `js_code` text NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `datetime` datetime);');
        this.addSql('INSERT INTO "_knex_temp_alter314" SELECT * FROM "task";;');
        this.addSql('DROP TABLE "task";');
        this.addSql('ALTER TABLE "_knex_temp_alter314" RENAME TO "task";');
        this.addSql('CREATE UNIQUE INDEX `task_name_unique` on `task` (`name`);');
        this.addSql('PRAGMA foreign_keys = ON;');
    }
}
exports.Migration20230314213026 = Migration20230314213026;
//# sourceMappingURL=Migration20230314213026.js.map