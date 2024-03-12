"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const _ommand_class_1 = require("./\u0441ommand.class");
const telegraf_1 = require("telegraf");
class StartCommand extends _ommand_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.start((ctx) => {
            console.log(ctx.session);
            ctx.reply("Пройдите регистрацию", telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("Yes", "give_link"),
                telegraf_1.Markup.button.callback("No", "give_service"),
            ]));
        });
        this.bot.action("give_link", (ctx) => {
            ctx.session.courseLike = true;
            ctx.replyWithHTML('Приветствую в <b>Test.Net</b>\n\n' + 'Вот твоя ссылка:<a href="https://github.com/LifeIsCodeArt?tab=repositories">Ссылка</a>');
        });
        this.bot.action("give_service", (ctx) => {
            ctx.session.courseLike = false;
            ctx.reply('напишите нашему саппорту...');
        });
    }
}
exports.StartCommand = StartCommand;
