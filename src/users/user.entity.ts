import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id!: string;

  @Column()
  name!: string;

  @Column()
  about!: string;

  @Column()
  avatar!: string;

  @Column()
  cohort!: string;
}
