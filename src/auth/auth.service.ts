import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {SignInDto} from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    private async _encrypt(password: string) {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.findByUsername(signInDto.username);

        const isMatch = await bcrypt.compare(signInDto.password, user?.password);

        if (!isMatch) {
            return {
                access_token: null,
            }
        }
        // @ts-ignore
        const payload = { username: user.username, role: user.role, _id: user._id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        const password = await this._encrypt(createUserDto.password);
        const user = await this.usersService.create({
            username: createUserDto.username,
            role: createUserDto.role,
            password,
        });
        return {
            // @ts-ignore
            _id: user._id,
            username: user.username,
            role: user.role,
        }
    }

}
