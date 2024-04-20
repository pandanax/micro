import { Injectable } from '@nestjs/common';
import {Cat, CatId} from './interfaces/cat.interface';
import {ListCat} from "./interfaces/list-cat.interface";
import {CreateCatDto} from "./dto/create-cat.dto";
import {UpdateCatDto} from "./dto/update-cat.dto";

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];
    private index: number = 1;

    create(cat: CreateCatDto): Cat {
        const newCat = {
            ...cat,
            id: this.index++,
        };
        this.cats.push(newCat);
        return newCat;
    }

    findAll({limit}: ListCat): Cat[] {
        return this.cats.filter((_, i) => i < Number(limit));
    }

    findOne(catId: CatId): Cat {
        return this.cats.find(({id}) => id === catId );
    }

    updateOne(catId: CatId, catData: UpdateCatDto): Cat | null {
        const index = this.cats.findIndex(({id}) => id === catId );
        if (index > -1) {
            Object.assign(this.cats[index], catData);
            return this.cats[index];
        }
        return null;
    }

    deleteOne(catId: CatId): Cat | null {
        const index = this.cats.findIndex(({id}) => id === catId );
        if (index > -1) {
            const dCats = this.cats.splice(index, 1);
            return dCats.at(0);
        }
        return null;
    }
}
