import {Model} from "mongoose";

import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

import {User} from "./users.schema";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userModel.findOne({username});
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
}
