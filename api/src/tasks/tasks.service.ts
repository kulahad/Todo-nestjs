import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(task: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async updateTask(updateTask: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(updateTask);
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
