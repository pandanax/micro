import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // const request = context.switchToHttp().getRequest();
        // const user = request.user; // isAuth лежит в юзере
        // проверяем на аторизацию
        console.log('AuthGuard OK');
        return true;
    }
}
