import { IsNotEmpty } from 'class-validator';

export class BlogCreateDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;
}
