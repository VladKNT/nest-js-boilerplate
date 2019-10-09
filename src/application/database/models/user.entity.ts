import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Password } from '../../../lib/password/password';
import { RefreshToken } from './refresh-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32, unique: true })
  username: string;

  @Column({ length: 32, unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => RefreshToken, refreshToken => refreshToken.token)
  refreshTokens: RefreshToken[];

  @BeforeInsert()
  public async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await Password.hashPassword(this.password);
  }
}
