import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
// import { ObjectId } from 'mongoose';

@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.taskService.createTask(createTaskDto);
      return newTask;
    } catch (e) {
      return e;
    }
  }

  @Get()
  async getTasks() {
    try {
      const task = await this.taskService.getAllTask();
      return task;
    } catch (e) {
      return e;
    }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    try {
      const existingTask = await this.taskService.getTaskById(id);
      return existingTask;
    } catch (e) {
      return e;
    }
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    try {
      const updateTask = await this.taskService.updateTask(id, updateTaskDto);
      return updateTask;
    } catch (e) {
      return e;
    }
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    try {
      const deleteTask = await this.taskService.deleteTask(id);
      return deleteTask;
    } catch (e) {
      return e;
    }
  }
}
