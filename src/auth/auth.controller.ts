import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request, UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {SignInDto} from "./dto/sign-in.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto ) {
        let ret;
        try {
            ret = await this.authService.signIn(signInDto);
        } catch (e) {
            throw e;
        }
        if (!ret.access_token) {
            throw new UnauthorizedException();
        }
        return ret;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async signUp(@Body() createUserDto: CreateUserDto) {
        let createdUser;
        try {
            createdUser = await this.authService.signUp(createUserDto);
        }
        catch (e) {
            throw e;
        }
        if (!createdUser) {
            throw new BadRequestException();
        }
        return createdUser;
    }

    @Get('profile')
    async getProfile(@Request() req) {
        const user = req.user;
        if (!user.username) {
            throw new BadRequestException();
        }
        return user;
    }
}
