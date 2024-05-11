import {Module} from '@nestjs/common';
import {CatsController} from './cats.controller';
import {CatsService} from './cats.service';
import {LoggerService} from "../common/provider/logger.provider";
import {asyncProviderFactory} from "../common/providerFactory/async.provider.factory";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../config/configuration";
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])
    ],
    controllers: [CatsController],
    exports: [CatsService],
    providers: [
        CatsService,
        LoggerService,
        asyncProviderFactory,
        ConfigService,
    ],
})
export class CatsModule {
}
