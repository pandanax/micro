import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {LoggerService} from "../common/provider/logger.provider";
import {Connection} from "../common/providerFactory/async.provider.factory";

describe('CatsController', () => {
    let catsController: CatsController;
    let catsService: CatsService;
    let loggerService: LoggerService;
    let connection: Connection;

    beforeEach(() => {
        catsService = new CatsService();
        catsController = new CatsController(catsService, loggerService, connection);
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result = [{id: 1}];
            jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

            expect(await catsController.findAll(5)).toBe(result);
        });
    });
});
