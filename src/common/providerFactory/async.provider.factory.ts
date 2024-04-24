import {LoggerService} from "../provider/logger.provider";

export type Connection = {
    connected: boolean;
}
export const asyncProviderFactory = {
    provide: 'ASYNC_CONNECTION',
    useFactory: async (logger: LoggerService) => {
        return Promise.resolve({connected: true}).then(r => {
            logger.log('asyncProviderFactory initialized')
            return r;
        });
    },
    inject: [LoggerService] // можем юзать другие провайдеры тут
}
