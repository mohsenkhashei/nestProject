import { productCategory } from '../product-category.entity';
export class UpdateProductDto {
  title: string;
  description: string;
  price: number;
  category: productCategory;
}
