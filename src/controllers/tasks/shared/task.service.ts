import { Injectable } from '@nestjs/common';
import { Task } from './task';

@Injectable()
export class TaskService {
  tasks: Task[] = [
    { id: 1, description: 'Tarefa1', completed: false },
    { id: 2, description: 'Tarefa2', completed: false },
    { id: 3, description: 'Tarefa3', completed: false },
    { id: 4, description: 'Tarefa4', completed: false },
    { id: 5, description: 'Tarefa5', completed: false },
    { id: 6, description: 'Tarefa6', completed: false },
    { id: 7, description: 'Tarefa7', completed: false },
    { id: 8, description: 'Tarefa8', completed: false },
    { id: 9, description: 'Tarefa9', completed: false },
    { id: 10, description: 'Tarefa10', completed: false },
  ];

  getAll() {
    return this.tasks;
  }
  getById(id: number) {
    const task = this.tasks.find((value) => value.id == id);

    return task;
  }
  create(task: Task) {
    let lastId = 0;
    if (this.tasks.length > 0) {
      lastId = this.tasks[this.tasks.length - 1].id;
    }
    task.id = lastId + 1;

    this.tasks.push(task);

    return task;
  }
  update(task: Task) {
    const taskArray = this.getById(task.id);
    if (taskArray) {
      taskArray.completed = task.completed;
      taskArray.description = task.description;
    }
    return taskArray;
  }
  delete(id: number) {
    const taskArray = this.getById(id);
    if (taskArray) {
      const index = this.tasks.findIndex((value) => value.id === id);
      this.tasks.slice(index, 1);
      return true;
    }
    return false;
  }
}
