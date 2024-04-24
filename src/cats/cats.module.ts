import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {LoggerService} from "../common/provider/logger.provider";

@Module({
    controllers: [CatsController],
    providers: [CatsService, LoggerService],
    exports: [CatsService]
})
export class CatsModule {}
