import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ITask } from './task.interface';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async getAllTask(): Promise<ITask[]> {
    const task = await this.taskModel.find();
    return task;
  }

  async getTaskById(id: ObjectId): Promise<ITask> {
    const existingTask = await this.taskModel.findById(id).exec();
    if (!existingTask) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return existingTask;
  }

  async updateTask(id: ObjectId): Promise<ITask> {
    const existingTask = await this.taskModel
      .findByIdAndUpdate(id, {}, { new: true })
      .exec();
    if (!existingTask) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return existingTask;
  }

  async deleteTask(id: ObjectId): Promise<void> {
    const deleteTask = await this.taskModel.findByIdAndDelete(id);
    if (!deleteTask) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    deleteTask;
  }
}
