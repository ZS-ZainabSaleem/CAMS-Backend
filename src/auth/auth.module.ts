import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import 'dotenv/config';
import { TenantModule } from 'src/tenant/tenant.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
imports: [
    UserModule,
    TenantModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
