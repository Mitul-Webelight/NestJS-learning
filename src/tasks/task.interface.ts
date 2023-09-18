import { Document } from 'mongoose';
import { TaskStatus } from './task-status.enums';

export interface ITask extends Document {
  readonly title: string;
  readonly description: string;
  readonly status: TaskStatus;
}
