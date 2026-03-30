import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column()
  name!: string;

  @Column()
  link!: string;

  @ManyToOne(() => User)
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable()
  likes!: User[];

  @CreateDateColumn()
  createdAt!: Date;
}
