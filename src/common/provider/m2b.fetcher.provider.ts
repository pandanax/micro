import {Injectable} from "@nestjs/common";
import {HttpService} from '@nestjs/axios';
import {AxiosResponse} from 'axios';

@Injectable()
export class M2bFetcherService {
    constructor(private readonly httpService: HttpService) {}

    fetchPing(): Promise<AxiosResponse> {
        if (process.env.PING_URL) {
            return this.httpService.axiosRef.get(process.env.PING_URL);
        }
    }
}
