import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class productCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true, description: 'The Category all capital' })
  @Column()
  title: string;
}
