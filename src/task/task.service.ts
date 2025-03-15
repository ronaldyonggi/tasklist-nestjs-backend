import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  /**
   *  Create a new task, takes in a createTaskDto
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskDto); // Create first
    return this.taskRepository.save(newTask); // Then save to DB
  }

  /**
   * Update an existing task, takes in an updateTaskDto
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    // Efficiently merge the changes from updateTaskDto into the existing task entity
    Object.assign(task, updateTaskDto); 
    return this.taskRepository.save(task); // Then save to DB
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
