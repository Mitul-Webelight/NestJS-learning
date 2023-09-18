import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enums';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  status: TaskStatus.OPEN;
}
