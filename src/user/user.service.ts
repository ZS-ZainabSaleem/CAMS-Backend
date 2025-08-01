import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTO/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntity } from './Entities/user.entity';
import { TenantEntity } from 'src/tenant/Entities/tenant.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(userEntity) private userRepository: Repository<userEntity>,
                @InjectRepository(TenantEntity) private tenantRepository: Repository<TenantEntity>) {}
    async findAll() {
        const user= await this.userRepository.find();
        if (!user || user.length === 0) {
            throw new NotFoundException('No users found');
        }
        return user;
    }
    async findById(id: number) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['tenant'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async create(dto: CreateUserDto, tenantId: number) {
    // 2. Check if email already exists in this tenant
    const existingUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
        tenant: { id: tenantId } 
      },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists in this tenant');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        tenant: { id:tenantId },
    });
    console.log('User created:', user);

    return this.userRepository.save(user);
    }
    async delete(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.delete(id);
        return { message: 'User deleted successfully' };
    }
    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['tenant'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }  
}
