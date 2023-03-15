import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { NotFoundResponse } from "./dto/responses/not-found.dto";

@ApiTags("tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "The found records",
    type: [CreateTaskDto],
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: CreateTaskDto,
  })
  @ApiNotFoundResponse({
    description: "Task not found",
    type: NotFoundResponse,
  })
  @ApiInternalServerErrorResponse({ description: "Internal Server Error" })
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    description: "The updated record",
    type: CreateTaskDto,
  })
  @ApiNotFoundResponse({ description: "Task not found" })
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: "The deleted record",
    type: CreateTaskDto,
  })
  @ApiNotFoundResponse({ description: "Task not found" })
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }
}
