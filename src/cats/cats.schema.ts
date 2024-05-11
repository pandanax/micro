import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

/*

import * as mongoose from 'mongoose';
import { Owner } from '../owners/schemas/owner.schema';

// inside the class definition
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
owner: Owner;

// or

@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
owner: Owner[];

*/


@Schema()
export class Cat {
    @Prop({ required: true })
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;

    /*@Prop([String])
    tags: string[];
*/
}

export const CatSchema = SchemaFactory.createForClass(Cat);
