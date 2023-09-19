import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'OPEN' })
  status: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  assignedTo: User[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
