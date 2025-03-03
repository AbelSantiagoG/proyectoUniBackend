import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../Users/user.service';
import { LoginUserDto } from '../Users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        return this.userService.validateUser(email, password);
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userService.validateUser(loginUserDto.email, loginUserDto.password);

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
