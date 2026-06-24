const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// የሪንደር አፕሊኬሽን ሊንክ (ሚኒ አፑ የሚከፈትበት ዋና አድራሻ)
const RENDER_URL = 'https://bingo7-miniapp.onrender.com';

// 1. የሚኒ አፑን የፊት ገጽ (HTML/CSS/JS) ዝግጁ ማድረግ
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ሰርቨር ማስጀመር
app.listen(PORT, () => {
  console.log(Server is running successfully on port ${PORT});
});

// 2. የቴሌግራም ቦት መዋቅር
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '8674688097:AAFCjfPZdyS6hMM5fT3p5t0Rrbv5aBqOwGg');

// ተጠቃሚው /start ሲል የሚኒ አፑን መክፈቻ ቁልፍ (Web App Button) ያሳየዋል
bot.start((ctx) => {
  ctx.reply(
    "Welcome to Bingo7!\n\nእንኳን ወደ ቢንጎ 7 ጨዋታ በደህና መጡ። ጨዋታውን ለመጀመር ከታች ያለውን 'Play Bingo' የሚለውን ቁልፍ ይጫኑ።",
    Markup.inlineKeyboard([
      [Markup.button.webApp('Play Bingo 🎮', RENDER_URL)]
    ])
  );
});

// ተጠቃሚው /play ሲልም በተመሳሳይ ሚኒ አፑን ይከፍትለታል
bot.command('play', (ctx) => {
  ctx.reply(
    "ጨዋታውን ለመጀመር ከታች ያለውን ቁልፍ ይጫኑ፡",
    Markup.inlineKeyboard([
      [Markup.button.webApp('Open Mini App 🚀', RENDER_URL)]
    ])
  );
});

// ሌሎች መደበኛ የቦት ትዕዛዞች
bot.command('register', (ctx) => { ctx.reply('ምዝገባ በቅርቡ ይጀምራል'); });
bot.command('balance', (ctx) => { ctx.reply('ቀሪ ሂሳብ: 0 ETB'); });
bot.command('deposit', (ctx) => { ctx.reply('ገንዘብ ለመጨመር የክፍያ መንገድ በቅርቡ ይታከላል'); });
bot.command('withdraw', (ctx) => { ctx.reply('ገንዘብ ለማውጣት በቅርቡ ይገኛል'); });
bot.command('support', (ctx) => { ctx.reply('ለድጋፍ: @your_support_username'); });

// 3. ቦቱን በ Long Polling ማስነሳት (የድሮ ግጭቶችን እያጠፋ ይነሳል)
bot.launch({
  allowedUpdates: ['message', 'callback_query'],
  dropPendingUpdates: true
}).then(() => {
  console.log('Bingo7 Bot Started Successfully via Polling');
}).catch((err) => {
  console.error('Bot error:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
