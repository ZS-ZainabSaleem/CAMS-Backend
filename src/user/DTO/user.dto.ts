import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
export class CreateUserDto {
 
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsNumber({}, { message: 'Tenant ID must be a number' })
    @IsNotEmpty({ message: 'Tenant ID is required' })
    tenantId: number; // Optional tenant ID for multi-tenancy support

}