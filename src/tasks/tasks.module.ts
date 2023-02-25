import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './entities/task.entity';
import { SqliteMikroORM } from '@mikro-orm/sqlite/SqliteMikroORM';

@Module({
  imports: [MikroOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
