import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { userRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  code: string;

  @Column({
    type: 'enum',
    enum: userRole,
    default: [userRole.ADMIN],
  })
  role: userRole;

  @UpdateDateColumn()
  updatedAt: Date;
}
