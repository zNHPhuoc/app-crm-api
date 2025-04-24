import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    example: 'email@okvip.com',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  email: string;

  @ApiProperty({
    example: '***********',
  })
  @Length(1, 100)
  @IsNotEmpty()
  password: string;
}
