import {Injectable, NestMiddleware, Logger} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {
        if (process.env.NODE_ENV === 'development') {
            this.logger.debug(`Запрос url ${req.url}`);
            if (req.method !== 'GET' && Object.keys(req.body).length) {
                this.logger.debug(`Запрос body ${JSON.stringify(req.body)}`);
            }
        }
        next();
    }
}
