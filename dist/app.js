"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("./config/config.service");
const telegraf_1 = require("telegraf");
const LocalSession = require("telegraf-session-local");
const start_command_1 = require("./commands/start.command");
class Bot {
    constructor(configService) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get("TOKEN"));
        this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
    }
    init() {
        this.commands = [new start_command_1.StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}
const bot = new Bot(new config_service_1.ConfigService());
bot.init();
