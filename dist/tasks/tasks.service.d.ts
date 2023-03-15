import { EntityRepository, EntityManager } from "@mikro-orm/sqlite";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task as TaskEntity } from "./entities/task.entity";
export declare class TasksService {
    private readonly taskRepository;
    private schedulerRegistry;
    private readonly em;
    constructor(taskRepository: EntityRepository<TaskEntity>, schedulerRegistry: SchedulerRegistry, em: EntityManager);
    create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    addJob(task: CreateTaskDto): void;
    addJobDate(task: CreateTaskDto): void;
    addJobCron(task: CreateTaskDto): void;
    findAll(): Promise<import("@mikro-orm/core").Loaded<TaskEntity, never>[]>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<TaskEntity, never>>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<import("@mikro-orm/core").Loaded<TaskEntity, never>>;
    updateByName(name: string, updateTaskDto: UpdateTaskDto): Promise<import("@mikro-orm/core").Loaded<TaskEntity, never>>;
    removeByName(name: string): Promise<import("@mikro-orm/core").Loaded<TaskEntity, never>>;
    remove(id: number): Promise<import("@mikro-orm/core").Loaded<TaskEntity, never>>;
}
