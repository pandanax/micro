import {Injectable} from "@nestjs/common";

@Injectable()
export class LoggerService {
    constructor() {
    }

    log(...args) {
        console.info(new Date(), ...args)
    }
}
