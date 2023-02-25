import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/sqlite';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {  SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task as TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: EntityRepository<TaskEntity>,
    private schedulerRegistry: SchedulerRegistry,
    private readonly em: EntityManager
  ) {
    const tasks = em.fork().find(TaskEntity, {});
    tasks.then((items) => {
      logger.log(`Found ${items.length} tasks`);
      items.forEach((item) => {
        logger.log(`Adding job ${item.name} - ${item.active}`);
         this.addJob(item);        
      });
    });
  }


  async create(createTaskDto: CreateTaskDto) {
    const exists = await this.taskRepository.findOne({
      name: createTaskDto.name
    });

    if (exists) {
      throw new HttpException('Already exists', HttpStatus.CONFLICT);
    }

    const item = this.taskRepository.create(createTaskDto);
    this.addJob(createTaskDto);
    this.taskRepository.persistAndFlush(item);
    return item
  }

  addJob(task: CreateTaskDto) {
    const job = new CronJob(task.cron, () => {
      logger.log(`Running cron job ${task.name}`);
      eval(task.jsCode);
    });

    this.schedulerRegistry.addCronJob(task.name, job);
    if (task.active) {
      job.start();
    }
  }


  findAll() {
    return this.taskRepository.findAll();
  }

  async findOne(id: number) {
    const item = await this.taskRepository.findOne(id);
    if (!item) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const item = await this.taskRepository.findOne(id);
    if (!item) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const exists = await this.taskRepository.findOne({
      name: updateTaskDto.name
    });

    if (exists && exists.id !== id) {
      throw new HttpException('Already exists', HttpStatus.CONFLICT);
    }

    const job = this.schedulerRegistry.getCronJob(item.name);
    job.stop();

   const newJob = {
    ...item,
    ...updateTaskDto
   }
    this.addJob(newJob);

    this.taskRepository.assign(item, updateTaskDto);
    await this.taskRepository.flush();
    return item;
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    const job = this.schedulerRegistry.getCronJob(item.name);
    if (job) {
      job.stop();
    }
    
    const deleted = this.taskRepository.nativeDelete({
      id
    });
    if (!deleted) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return item
  }
}
