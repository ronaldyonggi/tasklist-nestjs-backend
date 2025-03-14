import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put('id')
  async update(
    @Param('id') id: string,
    @Body() task: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.update(parseInt(id), task);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.remove(parseInt(id));
  }
}
