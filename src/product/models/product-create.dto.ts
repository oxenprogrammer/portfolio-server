import { IsNotEmpty } from 'class-validator';

export class ProductCreateDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  price: string;
}
