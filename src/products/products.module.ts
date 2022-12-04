import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
import { DataSource } from 'typeorm';
import { productCategory } from './product-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository, Product, productCategory]),
  ],
  controllers: [ProductsController],
  providers: [
    // {
    //   provide: getRepositoryToken(Product),
    //   inject: [getDataSourceToken()],
    //   useFactory(dataSource: DataSource) {
    //     // Override default repository for Task with a custom one
    //     return dataSource.getRepository(Product).extend(ProductsRepository);
    //   },
    // },
    ProductsService,
  ],
})
export class ProductsModule {}
