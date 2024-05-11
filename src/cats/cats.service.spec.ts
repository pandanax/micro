import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CatsService } from './cats.service';
import { Cat } from './cats.schema';

const mockCat = {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
};

describe('CatsService', () => {
    let service: CatsService;
    let model: Model<Cat>;

    const catsArray = [
        {
            name: 'Cat #1',
            breed: 'Breed #1',
            age: 4,
        },
        {
            name: 'Cat #2',
            breed: 'Breed #2',
            age: 2,
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CatsService,
                {
                    provide: getModelToken('Cat'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockCat),
                        constructor: jest.fn().mockResolvedValue(mockCat),
                        find: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CatsService>(CatsService);
        model = module.get<Model<Cat>>(getModelToken('Cat'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all cats', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            limit: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValueOnce(catsArray),
            }),
        } as any);
        const cats = await service.findAll(3);
        expect(cats).toEqual(catsArray);
    });

});
