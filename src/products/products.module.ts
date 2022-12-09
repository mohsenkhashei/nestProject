import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
import { ConfigModule } from '@nestjs/config';
import { productCategory } from './product-category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductCategoryRepository } from './product-category.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      ProductsRepository,
      Product,
      ProductCategoryRepository,
      productCategory,
    ]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
