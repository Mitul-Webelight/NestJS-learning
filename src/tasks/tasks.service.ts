import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private readonly tasks: Task[] = [];
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }
  async getAll(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async getByID(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto): Promise<string> {
    return this.taskModel.findByIdAndUpdate(
      {
        _id: id,
        title: updateTaskDto.title,
        description: updateTaskDto.description,
      },
      { new: true },
    );
  }

  async delete(id: ObjectId): Promise<string> {
    return this.taskModel.findByIdAndDelete({ _id: id });
  }

  async addAssignees(taskid: string, userid: string[]): Promise<string> {
    return this.taskModel.findByIdAndUpdate(
      { _id: taskid },
      { assignedTo: userid },
    );
  }

  async updateStatus(id: ObjectId, newStatus: string): Promise<string> {
    const isStatusValid = await this.validateStatusChange(id, newStatus);

    if (isStatusValid) {
      return this.taskModel.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true },
      );
    }
  }

  async getStatus(id: ObjectId): Promise<string> {
    const task = this.taskModel.findById({ _id: id });
    return (await task).status;
  }

  async validateStatusChange(
    id: ObjectId,
    newStatus: string,
  ): Promise<boolean> {
    const currentStatus = await this.getStatus(id);

    if (currentStatus === 'to do' && newStatus === 'in progress') {
      return true;
    } else if (currentStatus === 'in progress' && newStatus === 'completed') {
      return true;
    } else if (currentStatus === 'completed' && newStatus === 'in progress') {
      return false;
    } else {
      return false;
    }
  }
}
