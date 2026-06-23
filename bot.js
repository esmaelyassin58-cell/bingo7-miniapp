const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// የሪንደር አፕሊኬሽን ሊንክ
const RENDER_URL = 'https://bingo7-miniapp.onrender.com';

// index.html ዝግጁ ማድረግ
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// የቴሌግራም ቦት ማስጀመር
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '8674688097:AAEJfKxw8FLiOU73vLBft2JZM200f6MOfDE');

// ቴሌግራም መልእክቶችን ወደ ሪንደር የሚልክበት ሚስጥራዊ መንገድ (Webhook Middleware)
app.use(bot.webhookCallback('/secret-path'));

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

bot.command('register', (ctx) => { ctx.reply('ምዝገባ በቅርቡ ይጀምራል'); });
bot.command('play', (ctx) => { ctx.reply('ጨዋታው በቅርቡ ይከፈታል'); });
bot.command('balance', (ctx) => { ctx.reply('ቀሪ ሂሳብ: 0 ETB'); });
bot.command('deposit', (ctx) => { ctx.reply('ገንዘብ ለመጨመር የክፍያ መንገድ በቅርቡ ይታከላል'); });
bot.command('withdraw', (ctx) => { ctx.reply('ገንዘብ ለማውጣት በቅርቡ ይገኛል'); });
bot.command('support', (ctx) => { ctx.reply('ለድጋፍ: @your_support_username'); });

// ሰርቨሩን ማስነሳት እና ዌብሁኩን ማገናኘት
app.listen(PORT, async () => {
  console.log(Server is running on port ${PORT});
  try {
    // የድሮውን ግንኙነት አጥፍቶ አዲሱን መንገድ ይዘረጋል
    await bot.telegram.setWebhook(${RENDER_URL}/secret-path, {
      drop_pending_updates: true
    });
    console.log('✅ Webhook Set Successfully! Old server blocked.');
  } catch (err) {
    console.error('Webhook set error:', err);
  }
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
