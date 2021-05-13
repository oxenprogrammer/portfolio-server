import { IsNotEmpty } from 'class-validator';

export class ProjectCreateDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  languages: string[];
}
