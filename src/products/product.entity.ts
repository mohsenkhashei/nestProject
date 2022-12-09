import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty({ enum: [productCategory] })
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
