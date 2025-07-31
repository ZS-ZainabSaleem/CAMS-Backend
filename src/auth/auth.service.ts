import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        //console.log('User found:', user);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            //console.log('Password valid:', isPasswordValid);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return {message: 'Login successful', user};
        }
        throw new UnauthorizedException('Invalid credentials');


    }
    async login(user: any): Promise<any> {
        console.log('User to login:', user);
        const payload = { email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
