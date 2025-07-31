import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTenantDto } from './DTO/tenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
    constructor(private readonly tenantService: TenantService) {}

    @Post()
    createTenant(@Body() createTenantDto: CreateTenantDto) {
        return this.tenantService.create(createTenantDto);
    }

    @Get()
    getAllTenants() {
        return this.tenantService.findAll();
    }

    @Get(':id')
    getTenantById(@Param('id', ParseIntPipe) id: number){
        return this.tenantService.findTenantWithUsers(id);
    }

    @Delete(':id')
    deleteTenant(@Param('id', ParseIntPipe) id: number) {
        return this.tenantService.delete(id);
    }
    @Get(':id/users')
    async getTenantUsers(@Param('id',ParseIntPipe) id: number) {
    return this.tenantService.findTenantWithUsers(id);
  }
}
