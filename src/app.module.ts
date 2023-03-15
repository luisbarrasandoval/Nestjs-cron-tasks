import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ScheduleModule.forRoot(),  MikroOrmModule.forRoot({
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'tasks.sqlite3',
    type: 'sqlite',
    autoLoadEntities: true,
  }),TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
