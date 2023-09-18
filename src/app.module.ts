import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/task.module';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Task-Manager'),
  ],
})
export class AppModule {}
