import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 32, unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  public async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
