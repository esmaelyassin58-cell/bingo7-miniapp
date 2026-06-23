[24/06/2026 00:28] Baba 3: {
  "name": "bingo7-miniapp",
  "version": "1.0.0",
  "description": "Telegram Bot and Mini App",
  "main": "bot.js",
  "scripts": {
    "start": "node bot.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "telegraf": "^4.16.3"
  }
}
[24/06/2026 00:42] Baba 3: const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// index.html ለሚኒ አፑ ዝግጁ ማድረግ
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// የዌብ ሰርቨር ማስጀመር (Render እንዳይዘጋብን)
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});

// የቴሌግራም ቦት ማስጀመር
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '8674688097:AAEJfKxw8FLiOU73vLBft2JZM200f6MOfDE');

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

// ቦቱን ማስነሳት
bot.launch().then(() => {
  console.log('✅ Bingo7 Bot Started Successfully');
}).catch((err) => {
  console.error('Bot launch failed:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
