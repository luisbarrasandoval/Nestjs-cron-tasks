"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230314211543 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230314211543 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table `task` add column `datetime` datetime not null;');
    }
}
exports.Migration20230314211543 = Migration20230314211543;
//# sourceMappingURL=Migration20230314211543.js.map