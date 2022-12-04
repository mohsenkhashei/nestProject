import { IsOptional, IsString, IsEnum } from 'class-validator';
import { productCategory } from '../product-category.entity';

export class getProductsFilterDto {
  @IsOptional()
  // @IsEnum(productCategory)
  category?: productCategory;

  @IsOptional()
  @IsString()
  search?: string;
}
