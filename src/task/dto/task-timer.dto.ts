import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class TaskTimerDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsDateString()
  @IsOptional()
  startTime: Date;

  @IsDateString()
  @IsOptional()
  endTime: Date;
}
