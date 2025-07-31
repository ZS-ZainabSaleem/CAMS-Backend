import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'default_secret', // secret to verify token
        });
    }

    async validate(payload: any) {
        console.log('JWT payload:', payload);
        const user = await this.userService.findUserByEmail(payload.email);
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        
       return {
        id: user.id,
        email: user.email,
    };
    }
}

