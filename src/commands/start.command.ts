import {Command} from "./сommand.class";
import {Markup, Telegraf, Input} from "telegraf";
import {IBotContext} from "../context/context.interface";

export  class StartCommand extends Command{
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((ctx)=>{
          console.log(ctx.session);
          ctx.reply(
              "Пройдите регистрацию",
              Markup.inlineKeyboard([
              Markup.button.callback("Yes", "give_link"),
              Markup.button.callback("No", "give_service"),
          ]))
        })

        this.bot.action("give_link", (ctx) =>{
            ctx.session.courseLike = true;
            ctx.replyWithHTML('Приветствую в <b>Test.Net</b>\n\n' + 'Вот твоя ссылка:<a href="https://github.com/LifeIsCodeArt?tab=repositories">Ссылка</a>')
        })

        this.bot.action("give_service", (ctx) =>{
            ctx.session.courseLike = false;
            ctx.reply('напишите нашему саппорту...')
        })
    }
}