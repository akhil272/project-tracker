import { IsString } from 'class-validator';

export class CreateProcessDto {
  @IsString()
  name: string;
}
