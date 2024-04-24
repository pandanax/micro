import {
    Controller,
    Get,
    Post,
    Header,
    Redirect,
    Query,
    Param,
    Body,
    Put,
    Delete,
    UseFilters,
    UsePipes,
    UseGuards,
    UseInterceptors,
    HttpException,
    HttpStatus,
    ForbiddenException,
    BadRequestException,
    ParseIntPipe,
    NotFoundException,
} from '@nestjs/common';
import {CreateCatDto, createCatSchema} from './dto/create-cat.dto';
import {UpdateCatDto, updateCatSchema} from './dto/update-cat.dto';
import {CatsService} from './cats.service';
import {HttpExceptionFilter} from "../common/filters/http-exception.filter";
import {CatId} from "./interfaces/cat.interface";
import {ValidationPipe} from "./pipes/validation.pipe";
import {RolesGuard} from "../common/guard/roles.guard";
import {Role, Roles} from "../common/decorators/roles.decorator";
import {LoggingInterceptor} from "../common/interceptors/logging.interceptor";
import {Auth} from "../common/decorators/auth.decorator";

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
@UseGuards(RolesGuard)
export class CatsController {
    constructor(private catsService: CatsService) {
    }

    // создает кота имеет пользовательский хедер в ответе
    @Post()
    // @HttpCode(204)
    @Header('X-Micro', 'test')
    @UsePipes(new ValidationPipe(createCatSchema))
    @Roles([Role.admin])
    @Auth()
    @UseInterceptors(LoggingInterceptor)
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }


    // пытается найти кота при исключении обрабатывает ошибку вручную
    @Get()
    async findAll(@Query('limit', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) limit: number) {
        try {
            return this.catsService.findAll({limit});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    // находит кота
    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: CatId) {
        const cat = this.catsService.findOne(id);
        if (!cat) {
            throw new NotFoundException();
        }
        return cat;
    }

    // апдэйтит кота
    @Put(':id')
    @UsePipes(new ValidationPipe(updateCatSchema))
    update(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: CatId,
        @Body() updateCatDto: UpdateCatDto
    ) {
        const cat = this.catsService.updateOne(id, updateCatDto);
        if (!cat) {
            throw new NotFoundException();
        }
        return cat;
    }

    // удаляет кота
    @Delete(':id')
    remove(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: CatId) {
        const cat = this.catsService.deleteOne(id);
        if (!cat) {
            throw new NotFoundException();
        }
        return cat;
    }


    // BAD
    // всегда выбрасывает ошибку
    @Post('bad')
    // @UseFilters(new HttpExceptionFilter()) // фильтры можно крепить к конкретному запросу
    async createBad(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }

    // тупо выкидывает ошибку
    @Get('exception')
    exception() {
        throw new ForbiddenException();
    }

    // тоже тупо выкидывает ошибку
    @Get('bad')
    bad() {
        throw new BadRequestException('Something bad happened', {
            cause: new Error(),
            description: 'Some error description'
        })
    }

    // редиректит на нужный урл
    @Get('redirect')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return {url: 'https://docs.nestjs.com/v5/'};
        }
    }
}
