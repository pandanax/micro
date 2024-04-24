import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const now = Date.now();
        // или вот пример трансформации данных
        // return next.handle().pipe(map(data => ({ data })))
        /* или общий отлов ошибок
            return next
            .handle()
            .pipe(
                catchError(err => throwError(() => new BadGatewayException())),
            );
        */
        //     return next.handle(); - это ничего не делать
        return next
            .handle()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }
}
