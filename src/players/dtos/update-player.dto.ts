import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdatePlayerDto {

  @IsNotEmpty()
  readonly cellphone: string;

  @IsNotEmpty()
  readonly name: string;
}
