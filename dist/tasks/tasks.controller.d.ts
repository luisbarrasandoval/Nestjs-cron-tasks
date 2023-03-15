import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("./entities/task.entity").Task>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("./entities/task.entity").Task, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/task.entity").Task, never>>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/task.entity").Task, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/task.entity").Task, never>>;
}
