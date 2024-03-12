import {ConfigService} from "./config/config.service";
import {IConfigService} from "./config/config.interface";
import { Telegraf,  } from "telegraf";
import LocalSession = require('telegraf-session-local')
import {IBotContext} from "./context/context.interface";
import {Command} from "./commands/сommand.class";
import {StartCommand} from "./commands/start.command";



class Bot {
    bot: Telegraf<IBotContext>
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    this.bot.use(new LocalSession({database: "sessions.json"}).middleware())
    }

    init() {
        this.commands = [new StartCommand(this.bot)]
        for(const command of this.commands){
            command.handle()
        }
        this.bot.launch()
    }

}

const bot = new Bot(new ConfigService());
bot.init()