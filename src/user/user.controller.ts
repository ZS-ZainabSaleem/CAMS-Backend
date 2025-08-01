import { Body, Controller, Delete, Get, Param, Post, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getAllUsers() {
        return await this.userService.findAll();
    }
    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return await this.userService.findById(id);
    }    

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,@Req() req
    ) {
        console.log('Creating user for tenant:', req.user.tenantId);
    return await this.userService.create(createUserDto, req.user.tenantId);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.delete(id);
    }
}
