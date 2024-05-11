import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {CreateCatDto} from "./dto/create-cat.dto";
import { Cat } from './cats.schema';
import {UpdateCatDto} from "./dto/update-cat.dto";

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

    create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }
    update(id: string, updateCatSchema: UpdateCatDto): Promise<Cat> {
        return  this.catModel
            .findByIdAndUpdate(id, updateCatSchema)
            .exec();
    }

    findAll(limit: number): Promise<Cat[]> {
        return this.catModel.find().limit(limit).exec();
    }

    findOne(id: string): Promise<Cat> {
        return this.catModel.findOne({ _id: id }).exec();
    }

    delete(id: string): Promise<Cat> {
        return this.catModel
            .findByIdAndDelete({ _id: id })
            .exec();
    }
}
