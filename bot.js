const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();

// Render ለዌብሳይቱ የሚሰጠውን PORT ቁጥር እንዲጠቀም ማድረግ
const PORT = process.env.PORT || 3000;

// index.html ያለበትን ቦታ ለዌብሳይት (Mini App) ማዘጋጀት
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ሰርቨሩን ማስጀመር (Render ላይ Deployment Failed እንዳይል)
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});

// የቴሌግራም ቦቱን ማስጀመር 
// ማሳሰቢያ፡ በRender Environment ላይ KEY የሚለውን 'TELEGRAM_BOT_TOKEN' ካልከው ይህንን ወደ process.env.TELEGRAM_BOT_TOKEN ቀይረው።
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

// ቦቱን ማስጀመር
bot.launch().then(() => {
  console.log('✅ Bingo7 Bot Started Successfully');
});

// ቦቱ በሰላም እንዲቆም ማድረግ
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
