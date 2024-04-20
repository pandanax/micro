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
  HttpException,
  HttpStatus,
  ForbiddenException,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import {HttpExceptionFilter} from "../common/http/exception/http-exception.filter";

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('redirect')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  @Post()
  // @HttpCode(204)
  @Header('X-Micro', 'test')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return {
      result: `This action has creates a "${createCatDto.name}" cat`,
    };
  }

  @Post('bad')
  @UseFilters(new HttpExceptionFilter())
  async createBad(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Get()
  async findAll(@Query() query: ListAllEntities) {
    try {
      return this.catsService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get('exception')
  exception() {
    throw new ForbiddenException();
  }

  @Get('bad')
  bad() {
    throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { result: `This action returns a #${id} cat` };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return {
      result: `This action updates a #${id} cat with age ${updateCatDto.age}`,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { result: `This action removes a #${id} cat` };
  }
}
