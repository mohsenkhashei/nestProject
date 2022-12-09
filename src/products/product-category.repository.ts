import { Repository } from 'typeorm';
import { productCategory } from './product-category.entity';

export class ProductCategoryRepository extends Repository<productCategory> {}
