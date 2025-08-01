import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateTenantDto {
 
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
    
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
    


}
