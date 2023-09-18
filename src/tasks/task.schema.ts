import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './task-status.enums';

@Schema({ versionKey: false })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  status: TaskStatus.DONE;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
