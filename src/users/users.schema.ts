import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Role} from "../roles/roles.types";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;


    @Prop({ required: true, enum: Role })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
