"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const sqlite_1 = require("@mikro-orm/sqlite");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
const task_entity_1 = require("./entities/task.entity");
let TasksService = class TasksService {
    constructor(taskRepository, schedulerRegistry, em) {
        this.taskRepository = taskRepository;
        this.schedulerRegistry = schedulerRegistry;
        this.em = em;
        const tasks = em.fork().find(task_entity_1.Task, {});
        tasks.then((items) => {
            nestjs_1.logger.log(`Found ${items.length} tasks`);
            items.forEach((item) => {
                nestjs_1.logger.log(`Adding job ${item.name} - ${item.active}`);
                this.addJob(item);
            });
        });
    }
    async create(createTaskDto) {
        const exists = await this.taskRepository.findOne({
            name: createTaskDto.name,
        });
        if (exists) {
            throw new common_1.HttpException("Already exists", common_1.HttpStatus.CONFLICT);
        }
        const item = this.taskRepository.create(createTaskDto);
        this.addJob(createTaskDto);
        this.taskRepository.persistAndFlush(item);
        return item;
    }
    addJob(task) {
        if (task.cron) {
            this.addJobCron(task);
        }
        else {
            this.addJobDate(task);
        }
    }
    addJobDate(task) {
        const timeoutMS = new Date(task.datetime).getTime() - new Date().getTime();
        if (!task.active) {
            return;
        }
        if (timeoutMS < 0 || isNaN(timeoutMS)) {
            nestjs_1.logger.warn(`Invalid timeout for job ${task.name}`);
        }
        const timeout = setTimeout(() => {
            nestjs_1.logger.log(`Running job ${task.name}`);
            eval(task.jsCode);
            this.schedulerRegistry.deleteTimeout(task.name);
            this.em
                .fork()
                .nativeUpdate(task_entity_1.Task, { name: task.name }, { active: false });
        }, timeoutMS);
        this.schedulerRegistry.addTimeout(task.name, timeout);
    }
    addJobCron(task) {
        const job = new cron_1.CronJob(task.cron, () => {
            nestjs_1.logger.log(`Running cron job ${task.name}`);
            eval(task.jsCode);
        });
        this.schedulerRegistry.deleteCronJob(task.name);
        this.schedulerRegistry.addCronJob(task.name, job);
        if (task.active) {
            job.start();
        }
    }
    findAll() {
        return this.taskRepository.findAll();
    }
    async findOne(id) {
        const item = await this.taskRepository.findOne(id);
        if (!item) {
            throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
        }
        return item;
    }
    async update(id, updateTaskDto) {
        const item = await this.taskRepository.findOne(id);
        if (!item) {
            throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
        }
        const exists = await this.taskRepository.findOne({
            name: updateTaskDto.name,
        });
        if (exists && exists.id !== id) {
            throw new common_1.HttpException("Already exists", common_1.HttpStatus.CONFLICT);
        }
        let job;
        if (item.cron) {
            job = this.schedulerRegistry.getCronJob(item.name);
            job.stop();
        }
        else {
            job = this.schedulerRegistry.getTimeout(item.name);
            clearTimeout(job);
        }
        const newJob = Object.assign(Object.assign(Object.assign({}, item), updateTaskDto), { name: updateTaskDto.name + Math.random().toString(36).substring(7) });
        this.addJob(newJob);
        this.taskRepository.assign(item, updateTaskDto);
        await this.taskRepository.flush();
        return item;
    }
    async updateByName(name, updateTaskDto) {
        const item = await this.taskRepository.findOne({
            name,
        });
        if (!item) {
            throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
        }
        const id = item.id;
        return this.update(id, updateTaskDto);
    }
    async removeByName(name) {
        const item = await this.taskRepository.findOne({
            name,
        });
        if (!item) {
            throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
        }
        const id = item.id;
        return this.remove(id);
    }
    async remove(id) {
        const item = await this.findOne(id);
        if (item.cron && item.active) {
            const job = this.schedulerRegistry.getCronJob(item.name);
            job.stop();
        }
        else if (item.active) {
            const job = this.schedulerRegistry.getTimeout(item.name);
            clearTimeout(job);
        }
        const deleted = this.taskRepository.nativeDelete({
            id,
        });
        if (!deleted) {
            throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
        }
        return item;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [sqlite_1.EntityRepository,
        schedule_1.SchedulerRegistry,
        sqlite_1.EntityManager])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map