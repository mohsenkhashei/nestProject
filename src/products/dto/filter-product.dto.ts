import { IsOptional, IsString } from 'class-validator';
import { productCategory } from '../product-category.entity';

export class getProductsFilterDto {
  @IsOptional()
  category?: productCategory;

  @IsOptional()
  @IsString()
  search?: string;
}
