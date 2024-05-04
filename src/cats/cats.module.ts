import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {LoggerService} from "../common/provider/logger.provider";
import {asyncProviderFactory} from "../common/providerFactory/async.provider.factory";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../config/configuration";

@Module({
    imports: [ConfigModule.forRoot({
        load: [configuration],
    })],
    controllers: [CatsController],
    exports: [CatsService],
    providers: [
        CatsService,
        LoggerService,
        asyncProviderFactory,
        ConfigService,
    ],
})
export class CatsModule {}
