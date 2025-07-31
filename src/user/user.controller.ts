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

    @Post()
    async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto); 
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.delete(id);
    }
}
