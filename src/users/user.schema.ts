import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  name: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
