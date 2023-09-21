import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectId } from 'mongoose';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { LocalAuthGuard } from 'src/users/auth/local-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getTasks(@Res() res): Promise<string> {
    try {
      const allTask = await this.taskService.getAll();
      return res.status(HttpStatus.OK).json(allTask);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('/:id')
  async getTaskByID(@Param('id') id: string, @Res() res): Promise<string> {
    try {
      const getTask = await this.taskService.getByID(id);
      return res.status(HttpStatus.OK).json(getTask);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Res() res,
  ): Promise<string> {
    try {
      const addTask = await this.taskService.create(createTaskDto);
      return res.status(HttpStatus.CREATED).json(addTask);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res,
  ): Promise<string> {
    try {
      const updateTask = await this.taskService.update(id, updateTaskDto);
      return res.status(HttpStatus.OK).json(updateTask);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: ObjectId, @Res() res): Promise<string> {
    try {
      const deleteTask = await this.taskService.delete(id);
      return res.status(HttpStatus.OK).json(deleteTask);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Patch('/:id/status')
  async updateStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: ObjectId,
    @Res() res,
  ): Promise<string> {
    try {
      const updateTaskStatus = await this.taskService.updateStatus(
        id,
        updateTaskStatusDto.newStatus,
      );
      return res.status(HttpStatus.OK).json(updateTaskStatus);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
