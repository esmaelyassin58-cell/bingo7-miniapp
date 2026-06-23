const { Telegraf } = require('telegraf');

const bot = new Telegraf('8674688097:AAEJfKxw8FLiOU73vLBft2JZM200f6MOfDE');

bot.start((ctx) => {
  ctx.reply("👋 Bingo7 Bot is running!");
});

bot.launch();

console.log("Bot started...");
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
🎉 እንኳን ወደ Bingo7 በደህና መጡ!

/register - ምዝገባ
/play - ጨዋታ
/balance - ቀሪ ሂሳብ
/deposit - ገንዘብ መጨመር
/withdraw - ገንዘብ ማውጣት
/support - ድጋፍ
);
});

bot.command('register', (ctx) => {
  ctx.reply('📝 ምዝገባ በቅርቡ ይጀምራል');
});

bot.command('play', (ctx) => {
  ctx.reply('🎮 ጨዋታው በቅርቡ ይከፈታል');
});

bot.command('balance', (ctx) => {
  ctx.reply('💰 ቀሪ ሂሳብ: 0 ETB');
});

bot.command('deposit', (ctx) => {
  ctx.reply('💵 ገንዘብ ለመጨመር የክፍያ መንገድ በቅርቡ ይታከላል');
});

bot.command('withdraw', (ctx) => {
  ctx.reply('💸 ገንዘብ ለማውጣት በቅርቡ ይገኛል');
});

bot.command('support', (ctx) => {
  ctx.reply('☎️ ለድጋፍ: @your_support_username');
});

bot.launch();

console.log('✅ Bingo7 Bot Started');
