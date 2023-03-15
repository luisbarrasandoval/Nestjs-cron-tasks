import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Task {
  @PrimaryKey()
  id: number;

  @Property({
    unique: true,
  })
  name: string;

  @Property({
    nullable: true,
  })
  cron: string;

  @Property({
    nullable: true,
  })
  datetime: Date;

  @Property()
  active: boolean;

  @Property()
  jsCode: string;

  @Property({ onCreate: () => new Date(), type: 'date' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), type: 'date' })
  updatedAt = new Date();
}

