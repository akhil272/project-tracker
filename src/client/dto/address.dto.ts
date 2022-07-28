import { IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsNumber()
  @IsOptional()
  pinCode: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  addressLine1: string;
}
