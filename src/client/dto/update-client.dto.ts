import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
