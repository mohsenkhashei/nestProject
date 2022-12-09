import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { productCategory } from '../product-category.entity';

export class getProductsFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  category?: productCategory;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
