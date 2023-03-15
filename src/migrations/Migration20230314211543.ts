import { Migration } from '@mikro-orm/migrations';

export class Migration20230314211543 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `task` add column `datetime` datetime not null;');
  }

}
