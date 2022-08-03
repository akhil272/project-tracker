import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  processId: number;

  @IsNumber()
  @IsPositive()
  projectId: number;

  @IsDateString()
  @IsOptional()
  startTime: Date;

  @IsDateString()
  @IsOptional()
  endTime: Date;

  @IsOptional()
  @IsString()
  comments: string;
}
