import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from './task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    UserModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
