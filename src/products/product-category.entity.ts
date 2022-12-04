import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class productCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
