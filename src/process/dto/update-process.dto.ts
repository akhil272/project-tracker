import { IsOptional, IsString } from 'class-validator';

export class UpdateProcessDto {
  @IsOptional()
  @IsString()
  name: string;
}
