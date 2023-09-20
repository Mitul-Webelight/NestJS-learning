import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectId } from 'mongoose';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.schema';
import { LocalAuthGuard } from 'src/users/auth/local-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getTasks() {
    return this.taskService.getAll();
  }

  @UseGuards(LocalAuthGuard)
  @Get('/:id')
  async getTaskByID(@Param('id') id: string) {
    return this.taskService.getByID(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(LocalAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: ObjectId) {
    return this.taskService.delete(id);
  }

  @UseGuards(LocalAuthGuard)
  @Patch('/:id/status')
  async updateStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: ObjectId,
  ): Promise<Task> {
    return await this.taskService.updateStatus(
      id,
      updateTaskStatusDto.newStatus,
    );
  }
}
