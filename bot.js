const { Telegraf } = require('telegraf');

const bot = new Telegraf('8674688097:AAEJfKxw8FLiOU73vLBft2JZM200f6MOfDE');

bot.start((ctx) => {
  ctx.reply("👋 Bingo7 Bot is running!");
});

bot.launch();

console.log("Bot started...");