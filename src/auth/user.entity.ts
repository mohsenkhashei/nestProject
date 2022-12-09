import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @Column({ nullable: true })
  username: string;

  @ApiProperty()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  code: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: userRole,
    default: [userRole.ADMIN],
  })
  role: userRole;

  @UpdateDateColumn()
  updatedAt: Date;
}
