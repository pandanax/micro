import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {CatsController} from './cats.controller';
import {CatsService} from './cats.service';
import { Cat, CatSchema } from './cats.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])
    ],
    controllers: [CatsController],
    exports: [CatsService],
    providers: [
        CatsService,
    ],
})
export class CatsModule {
}
