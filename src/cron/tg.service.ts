import { Ctx, Start, Update, Hears } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import {Logger} from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Context extends Scenes.SceneContext {}

@Update()
export class TelegramService extends Telegraf {
    private _ctx: Context;
    private readonly logger = new Logger(TelegramService.name);


    @Start()
    async onStart(@Ctx() ctx: Context) {
        await ctx.reply('Я буду писать если не получится достучаться до прода черного маркета. Стучусь туда раз в минуту. Спроси меня "жив?" чтоб узнать жив ли я.');
        this._ctx = ctx;
    }

    @Hears('жив?')
    async answer() {
        try {
            await this._ctx.reply('Да, все норм вроде :)');
        } catch (e) {
            this.logger.error(e);
        }
    }

    async sendText(msg: string) {
        try {
            await this._ctx.reply(msg)
        } catch (e) {
            this.logger.error(e);
        }
    }
}
