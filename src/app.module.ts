import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';

const ormoptions:TypeOrmModuleOptions={
  type: 'mysql',
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD ,
  // driver: 'mysql2',
  synchronize: true,
  autoLoadEntities: true,
  database: process.env.DB_NAME ,
  
}
@Module({ 
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormoptions),
    UserModule,
    TenantModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
