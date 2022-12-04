import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getProductsFilterDto } from './dto/filter-product.dto';

import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: ProductsRepository,
  ) {}

  async getProducts(filterDto: getProductsFilterDto): Promise<Product[]> {
    const query = this.productsRepository.createQueryBuilder('product');
    const { search, category } = filterDto;
    console.log(search);
    if (category) {
      query
        .innerJoinAndSelect('product.category', 'product_category.id')
        .andWhere('product.category = :category', { category });
    }
    if (search) {
      query
        .innerJoinAndSelect('product.category', 'product_category.id')
        .andWhere(
          'LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)',
          { search: `%${search}%` },
        );
    }

    const products = await query.getMany();
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const result = await this.productsRepository.findOne({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return result;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, price, category } = createProductDto;
    const product = this.productsRepository.create({
      title,
      description,
      price,
      category,
    });

    await this.productsRepository.save(product);
    return product;
  }
  async deleteProduct(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
  }
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getProductById(id);
    const { title, description, price, category } = updateProductDto;
    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;

    await this.productsRepository.save(updateProductDto);
    return product;
  }
}
