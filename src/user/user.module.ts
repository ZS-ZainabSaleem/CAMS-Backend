import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './Entities/user.entity';
import { TenantEntity } from 'src/tenant/Entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    TypeOrmModule.forFeature([TenantEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
