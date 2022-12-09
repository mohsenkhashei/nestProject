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
import { Product } from './product.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Roles } from 'src/auth/roles.decorators';
import { userRole } from 'src/auth/user-role.enum';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { productCategory } from './product-category.entity';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
@UseGuards(JwtGuard, RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiTags('Products Category')
  @ApiOperation({ summary: 'Create Product Category' })
  @ApiCreatedResponse({ type: productCategory })
  @Roles(userRole.USER)
  @Post('/category')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<productCategory> {
    return this.productsService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Getting All Products or with filter/category' })
  @ApiOkResponse({ type: Product, isArray: true })
  @Get()
  getProducts(
    @Query() filterDto: getProductsFilterDto,
    @GetUser() user: User,
  ): Promise<Product[]> {
    return this.productsService.getProducts(filterDto, user);
  }

  @ApiOperation({ summary: 'Get Specific Product' })
  @ApiOkResponse({ type: Product })
  @ApiResponse({ status: 404, description: `Product with ID: id not found` })
  @Get('/:id')
  getProductById(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

  @ApiOperation({ summary: 'Create Product' })
  @ApiCreatedResponse({ type: Product })
  @Roles(userRole.USER)
  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto, user);
  }

  @ApiOperation({ summary: 'Deleting Specific Product' })
  @ApiOkResponse({ description: 'response will be empty' })
  @ApiResponse({ status: 404, description: `Product with ID: id not found` })
  @Delete('/:id')
  deleteProduct(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.productsService.deleteProduct(id, user);
  }

  @ApiOperation({ summary: 'Update Specific Product' })
  @ApiOkResponse({ type: Product })
  @Patch('/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto, user);
  }

  @ApiOperation({
    summary: 'Confirm Specific Product Allowed By SUPPORT/ADMIN role',
  })
  @ApiOkResponse({ type: Product })
  @ApiResponse({ status: 404, description: `Product with ID: id not found` })
  @Roles(userRole.SUPPORT, userRole.ADMIN)
  @Get('/confirm/:id')
  confirm(@Param('id') id: number): Promise<Product> {
    return this.productsService.confirmUpdate(id);
  }
}
