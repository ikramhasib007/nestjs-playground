import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import ObjectID from 'bson-objectid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) throw new NotFoundException();
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: ObjectID().toHexString(),
      ...createTaskDto,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    if (task) task = { ...task, status };
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) return task;
      return task;
    });
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
