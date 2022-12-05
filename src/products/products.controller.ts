import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getProductsFilterDto } from './dto/filter-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Product } from './product.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query() filterDto: getProductsFilterDto,
    @GetUser() user: User,
  ): Promise<Product[]> {
    return this.productsService.getProducts(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto, user);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.productsService.deleteProduct(id, user);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    console.log('Update');
    return this.productsService.updateProduct(id, updateProductDto, user);
  }
  @Get('/confirm/:id')
  confirm(@Param('id') id: number, @GetUser() user: User): Promise<Product> {
    return this.productsService.confirmUpdate(id, user);
  }
}
