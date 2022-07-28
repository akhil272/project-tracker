import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto {
  @IsString()
  name: string;
}
