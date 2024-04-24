import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CatsModule} from "./cats/cats.module";
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import {CatsController} from "./cats/cats.controller";

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
      AppService,
      /*{
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
        useClass: LoggingInterceptor,
        // все можно подключать глобально пайпы, гварды, интерцепторы и т д
      }*/
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .exclude(
            { path: 'cats', method: RequestMethod.GET },
            // 'cats/(.*)',
        )
        .forRoutes(CatsController);
  }
}
