"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230225211823 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230225211823 extends migrations_1.Migration {
    async up() {
        this.addSql('create table `task` (`id` integer not null primary key autoincrement, `name` text not null, `cron` text not null, `active` integer not null, `js_code` text not null, `created_at` datetime not null, `updated_at` datetime not null);');
        this.addSql('create unique index `task_name_unique` on `task` (`name`);');
    }
}
exports.Migration20230225211823 = Migration20230225211823;
//# sourceMappingURL=Migration20230225211823.js.map