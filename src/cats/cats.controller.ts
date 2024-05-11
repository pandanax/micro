import {
    Controller,
    Get,
    Post,
    Delete,
    Query,
    Body,
    UseFilters,
    UseGuards,
    Param,
    Put,
    HttpStatus,
    NotFoundException,
    InternalServerErrorException,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateCatDto} from './dto/create-cat.dto';
import {CatsService} from './cats.service';
import {HttpExceptionFilter} from "../common/filters/http-exception.filter";
import {RolesGuard} from "../common/guard/roles.guard";
import { Cat } from './cats.schema';
import {UpdateCatDto} from "./dto/update-cat.dto";

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
@UseGuards(RolesGuard)

export class CatsController {

    constructor(
        private catsService: CatsService,
    ) {
    }

    // создает кота имеет пользовательский хедер в ответе
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }

    // пытается найти кота при исключении обрабатывает ошибку вручную
    @Get()
    async findAll(@Query('limit', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) limit: number) {
        let cats = [];
        try {
            cats = await this.catsService.findAll(limit);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!cats || !cats.length) {
            throw new NotFoundException();
        }
        return cats;
    }

    // находит кота
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat> {
        let cat;
        try {
            cat = await this.catsService.findOne(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!cat) {
            throw new NotFoundException();
        }
        return cat;
    }

    // удалить кота
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Cat> {
        let deletedCat;
        try {
            deletedCat = await this.catsService.delete(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!deletedCat) {
            throw new NotFoundException();
        }
        return deletedCat;
    }


    // апдэйтит кота
    @Put(':id')
    //@UsePipes(new ValidationPipe(updateCatSchema))
    async update(
        @Param('id') id: string,
        @Body() updateCatDto: UpdateCatDto
    ) {
        const cat = await this.catsService.update(id, updateCatDto);
        if (!cat) {
            throw new NotFoundException();
        }
        return cat;
    }

}
