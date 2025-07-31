import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './DTO/tenant.dto';
import { TenantEntity } from './Entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TenantService {
    constructor(@InjectRepository(TenantEntity) private tenantRepository: Repository<TenantEntity>) {}
    async create(createTenantDto: CreateTenantDto) {
        const tenant = this.tenantRepository.save(createTenantDto);
        if(!tenant) {
            throw new InternalServerErrorException('Tenant creation failed');
        }
        return tenant;
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
}
