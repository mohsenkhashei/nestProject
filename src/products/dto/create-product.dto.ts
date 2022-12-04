import { IsNotEmpty } from 'class-validator';
import { productCategory } from '../product-category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  price: number;

  category: productCategory;
}
