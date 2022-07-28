import { IsNumber, IsString } from 'class-validator';

export class CreateProcessDto {
  @IsString()
  name: string;

  @IsNumber()
  projectId: number;
}
