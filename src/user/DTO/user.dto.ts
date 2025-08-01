import { IsEmail, IsNotEmpty, IsNumber, Matches, MinLength } from 'class-validator';
export class CreateUserDto {
 
    @IsNotEmpty({ message: 'Name is required' })
    @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only letters and spaces' })
    @MinLength(2, { message: 'Name must be at least 2 characters' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

}