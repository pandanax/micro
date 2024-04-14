import { Controller, Get, Post, Header, Redirect, Query, Param, Body, Put, Delete } from '@nestjs/common';
import {CreateCatDto} from "./create-cat.dto";
import {ListAllEntities} from "./list-cat.dto";
import {UpdateCatDto} from "./update-cat.dto";

@Controller('cats')
export class CatsController {
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
        return {
            result: `This action has creates a "${createCatDto.name}" cat`,
        };
    }

    @Get()
    findAll(@Query() query: ListAllEntities) {
        return {result: `This action returns all cats (limit: ${query.limit} items)`};
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return {result: `This action returns a #${id} cat`};
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return {result: `This action updates a #${id} cat with age ${updateCatDto.age}`};
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return {result: `This action removes a #${id} cat`};
    }


}