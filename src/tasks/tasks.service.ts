import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  async getTasks(
    { search, status }: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const query = this.repository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.repository.findOne({ where: { id, user } });
    if (!found)
      throw new NotFoundException(`Task with ID "${id}" is not found`);
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.repository.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user,
    });
    await this.repository.save(task);
    return task;
  }

  async updateTask(
    id: string,
    attrs: Partial<Task>,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    Object.assign(task, attrs);
    await this.repository.save(task);
    return task;
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.repository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.repository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" is not found`);
    }
  }
}
