import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {LoggerService} from "../common/provider/logger.provider";
import {asyncProviderFactory} from "../common/providerFactory/async.provider.factory";

@Module({
    controllers: [CatsController],
    exports: [CatsService],
    providers: [
        CatsService,
        LoggerService,
        asyncProviderFactory
    ],
})
export class CatsModule {}
