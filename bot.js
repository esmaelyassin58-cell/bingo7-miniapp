const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// index.html ዝግጁ ማድረግ
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ሰርቨር ማስጀመር
app.listen(PORT, () => {
  console.log("Server is running successfully");
});

// የቴሌግራም ቦት ማስጀመር (|| ምልክቶች ተስተካክለዋል)
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '8674688097:AAFCjfPZdyS6hMM5fT3p5t0Rrbv5aBqOwGg');

bot.start((ctx) => {
  ctx.reply(
    "Welcome to Bingo7!\n\n" +
    "/register - ምዝገባ\n" +
    "/play - ጨዋታ\n" +
    "/balance - ቀሪ ሂሳብ\n" +
    "/deposit - ገንዘብ መጨመር\n" +
    "/withdraw - ገንዘብ ማውጣት\n" +
    "/support - ድጋፍ"
  );
});

bot.command('register', (ctx) => {
  ctx.reply('ምዝገባ በቅርቡ ይጀምራል');
});

bot.command('play', (ctx) => {
  ctx.reply('ጨዋታው በቅርቡ ይከፈታል');
});

bot.command('balance', (ctx) => {
  ctx.reply('ቀሪ ሂሳብ: 0 ETB');
});

bot.command('deposit', (ctx) => {
  ctx.reply('ገንዘብ ለመጨመር የክፍያ መንገድ በቅርቡ ይታከላል');
});

bot.command('withdraw', (ctx) => {
  ctx.reply('ገንዘብ ለማውጣት በቅርቡ ይገኛል');
});

bot.command('support', (ctx) => {
  ctx.reply('ለድጋፍ: @your_support_username');
});

// ቦቱን ማስነሳት (የድሮ ግጭቶችን የሚያጠፋ ማስተካከያ ተጨምሯል)
bot.launch({
  allowedUpdates: ['message', 'callback_query'],
  dropPendingUpdates: true
}).then(() => {
  console.log('Bingo7 Bot Started Successfully');
}).catch((err) => {
  console.error('Bot error:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
