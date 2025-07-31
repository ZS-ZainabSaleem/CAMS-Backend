import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { TenantEntity } from './Entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantEntity])
  ],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService]
})
export class TenantModule {}
