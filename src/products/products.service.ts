import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getProductsFilterDto } from './dto/filter-product.dto';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from 'src/auth/user.entity';
import { userRole } from 'src/auth/user-role.enum';
import { Logger } from '@nestjs/common';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: ProductsRepository,
  ) {}
  private logger = new Logger('Product Service');

  async getProducts(
    filterDto: getProductsFilterDto,
    user: User,
  ): Promise<Product[]> {
    const query = this.productsRepository.createQueryBuilder('product');
    const { search, category } = filterDto;

    if (user.role === 'admin' || user.role === 'support') {
      if (category) {
        query
          .innerJoinAndSelect('product.category', 'product_category.id')
          .andWhere('product.category = :category', { category });
      }
      if (search) {
        query
          .innerJoinAndSelect('product.category', 'product_category.id')
          .andWhere(
            '(LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
            { search: `%${search}%` },
          );
      }
    }
    if (user.role === 'user') {
      if (category) {
        query
          .innerJoinAndSelect('product.category', 'product_category.id')
          .andWhere('product.category = :category', { category })
          .andWhere('product.userId = :user', { user: user.id });
      }
      if (search) {
        query
          .innerJoinAndSelect('product.category', 'product_category.id')
          .andWhere(
            'LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)',
            { search: `%${search}%` },
          )
          .andWhere('product.userId = :user', { user: user.id });
      }
    }

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(error);
      `Failed to get product for user ${
        user.username
      }. Filters: ${JSON.stringify(filterDto)}`;
      throw new InternalServerErrorException();
    }
  }

  async getProductById(id: number, user: User): Promise<Product> {
    let result: Product;
    if (user.role === 'user') {
      result = await this.productsRepository.findOne({
        where: { id: id, userId: user },
      });
    } else if (user.role === 'admin' || user.role === 'support') {
      result = await this.productsRepository.findOne({
        where: { id: id },
      });
    }
    if (!result) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    } else {
      return result;
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { title, description, price, category } = createProductDto;
    if (user.role == userRole.USER) {
      const product = this.productsRepository.create({
        title,
        description,
        price,
        category,
        userId: user,
        isConfirmed: 0,
      });

      await this.productsRepository.save(product);
      return product;
    } else {
      throw new ForbiddenException('you are not allowed to create product');
    }
  }

  async deleteProduct(id: number, user: User): Promise<void> {
    let result;
    if (user.role === 'admin' || user.role === 'support') {
      result = await this.productsRepository.delete(id);
    } else {
      const found = await this.productsRepository.findOne({
        where: { id: id, userId: user, isConfirmed: 0 },
      });
      if (found) {
        result = await this.productsRepository.delete(id);
      } else {
        throw new NotFoundException(`Product with ID: ${id} not found`);
      }
    }
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
  }
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<Product> {
    const { title, description, price, category } = updateProductDto;
    const product = await this.getProductById(id, user);
    if (user.role === userRole.USER && product.isConfirmed === 0) {
      product.title = title;
      product.description = description;
      product.price = price;
      product.category = category;
      await this.productsRepository.save(product);
      return product;
    } else {
      throw new ForbiddenException(
        `You are not allowed to do this operations because you are not the owner or your product is confirmed`,
      );
    }
  }

  async confirmUpdate(id: number, user: User): Promise<Product> {
    if (user.role == userRole.SUPPORT) {
      const result = await this.productsRepository.findOne({
        where: { id: id },
      });
      console.log(result);

      if (result) {
        result.isConfirmed = 1;
        await this.productsRepository.save(result);
        return result;
      } else {
        throw new NotFoundException(`product with ID: ${id} not found`);
      }
    }
  }
}
