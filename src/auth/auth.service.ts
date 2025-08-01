import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TenantService } from '../tenant/tenant.service';
import { promises } from 'dns';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly tenantService: TenantService
    ) {}

    async validateLogin(email: string, password: string): Promise<any> {
    // if email belongs to a tenant
        const tenant = await this.tenantService.findByEmail(email);
        if (tenant) {
            const isPasswordValid = await bcrypt.compare(password, tenant.password);
            if (!isPasswordValid) throw new UnauthorizedException('Invalid tenant credentials');

            return { type: 'tenant', tenant };
        }

    //if email belongs to a user
        const user = await this.userService.findUserByEmail(email);
        console.log('User found:', user);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid user credentials');

        return { type: 'user', user };
    }

    async login(result: any) {
    // If TENANT login
    if (result.type === 'tenant') {
        const tenant = result.tenant;

        const tenantWithUsers = await this.tenantService.findTenantWithUsers(tenant.id);

        const payload = {
        email: tenant.email,
        sub: tenant.id,
        role:tenant.role,
        tenantId: tenant.id,
        };

        return {
        access_token: this.jwtService.sign(payload),
        data: {
            tenantId: tenantWithUsers.id,
            tenantName: tenantWithUsers.name,
            users: tenantWithUsers.users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            })),
        },
        };
    }

    // If USER login
    const user = result.user;

    const payload = {
        email: user.email,
        sub: user.id,
        role:user.role,
        tenantId: user.tenant.id,
    };

    return {
        access_token: this.jwtService.sign(payload),
        data: {
        id: user.id,
        name: user.name,
        role: user.role,
        tenantId: user.tenant.id,
        },
    };
    }
}
