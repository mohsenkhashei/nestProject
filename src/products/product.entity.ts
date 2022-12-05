import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { productCategory } from './product-category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => productCategory, (productCategory) => productCategory.id, {
    eager: true,
  })
  @JoinColumn()
  category: productCategory;

  @Column({
    default: 0,
  })
  isConfirmed: number;

  @ManyToOne(() => User, (user) => user.id, { eager: false })
  @JoinColumn()
  @Exclude({ toPlainOnly: true })
  userId: User;

  @UpdateDateColumn()
  updatedAt: Date;
}
