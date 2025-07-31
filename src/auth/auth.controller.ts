import { Body, Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TenantService } from 'src/tenant/tenant.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly tenantService: TenantService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user=await this.authService.validateUser(body.email, body.password); 
        return this.authService.login(user);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Req() req) {
        const user = req.user;

        // Example: Check user.role or related tenant info
        if (user.role === 'tenant') {
        const tenant = await this.tenantService.findById(user.id);
        return {
            tenant,
        };
        }
        return {
        user,
        };
    }
}

