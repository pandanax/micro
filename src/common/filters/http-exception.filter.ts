import {ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name);
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        this.logger.debug(`Ответ Ошибка Url ${request.url}`)
        this.logger.debug(`Ответ Ошибка Message ${exception.message}`)

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                body: request.body,
                message: exception.message
            });
    }
}
