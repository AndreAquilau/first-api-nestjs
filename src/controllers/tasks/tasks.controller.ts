import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  // localhost:3000/tasks
  @Get()
  async getAll(): Promise<Task[]> {
    const tasks = await this.taskService.getAll();
    return tasks;
  }
  // localhost:3000/tasks/1
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Task> {
    const task = await this.taskService.getById(id);
    return task;
  }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    const response = await this.taskService.create(task);
    return task;
  }

  @Put(':id')
  async update(@Param() id: number, @Body() task: Task): Promise<Task> {
    task.id = id;
    const response = await this.taskService.update(task);

    return task;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.taskService.delete(id);
  }
}
