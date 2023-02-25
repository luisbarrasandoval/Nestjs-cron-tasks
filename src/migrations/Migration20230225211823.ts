import { Migration } from '@mikro-orm/migrations';

export class Migration20230225211823 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `task` (`id` integer not null primary key autoincrement, `name` text not null, `cron` text not null, `active` integer not null, `js_code` text not null, `created_at` datetime not null, `updated_at` datetime not null);');
    this.addSql('create unique index `task_name_unique` on `task` (`name`);');
  }

}
