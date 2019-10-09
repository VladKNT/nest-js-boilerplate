import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { TokenService } from './services/token.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { RefreshToken } from '../../database/models/refresh-token.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRY },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtService, TokenService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
