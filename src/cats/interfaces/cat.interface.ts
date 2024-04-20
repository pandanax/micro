export type CatId = number;

export interface CatBase {
    name?: string;
    age?: number;
    breed?: string;
}

export interface Cat extends CatBase{
    id?: CatId;
}
