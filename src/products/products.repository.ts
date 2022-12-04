import { Repository } from 'typeorm';
import { Product } from './product.entity';

export class ProductsRepository extends Repository<Product> {}
