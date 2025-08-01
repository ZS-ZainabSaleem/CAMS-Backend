import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './DTO/tenant.dto';
import { TenantEntity } from './Entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TenantService {
    constructor(@InjectRepository(TenantEntity) private tenantRepository: Repository<TenantEntity>) {}
    async create(createTenantDto: CreateTenantDto) {
        // Check if tenant with the same email already exists
        const existingTenant = await this.tenantRepository.findOne({ where: { email: createTenantDto.email } });
        if (existingTenant) {
            throw new ConflictException('Email already exists in this tenant');
        }
        const hashedPassword = await bcrypt.hash(createTenantDto.password, 10);
        const user = this.tenantRepository.create({
            name: createTenantDto.name,
            email: createTenantDto.email,
            password: hashedPassword,
        });
        return this.tenantRepository.save(user);
    }
    async findAll() {
        const tenants = await this.tenantRepository.find();
        if (!tenants || tenants.length === 0) {
            throw new InternalServerErrorException('No tenants found');
        }
        return tenants;
    }   
    async findOne(id: number) {
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant) {
            throw new InternalServerErrorException('Tenant not found');
        }
        return tenant;
    }
    async delete(id: number) {
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant) {
            throw new InternalServerErrorException('Tenant not found');
        }
        await this.tenantRepository.delete(id);
        return { message: 'Tenant deleted successfully' };
    }
    async findTenantWithUsers(id: number) {
        const tenant=await this.tenantRepository.findOne({
            where: { id },
            relations: ['users'], 
        });
        if (!tenant) {
            throw new NotFoundException('Tenant not found');
        }
        return tenant;
    }

    async findById(id: number) {
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant) {
            throw new InternalServerErrorException('Tenant not found');
        }
        return tenant;
    }
    async findByEmail(email: string) {
        const tenant = await this.tenantRepository.findOne({ where: { email } });

        return tenant;
    }
}
