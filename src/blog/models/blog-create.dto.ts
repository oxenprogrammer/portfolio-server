import { IsNotEmpty } from 'class-validator';

export class blogCreateDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;
}
