const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const NodeCache = require('node-cache');

const myCache = new NodeCache();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  if (msg.text === '/start') {
    await bot.sendMessage(
      msg.chat.id,
      'Hello, please choose which exchange rate you are interested in',
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: 'USD' }, { text: 'EUR' }]],
        },
      }
    );
  } else if (msg.text === 'USD') {
    await getAndCacheRates();

    const { rateBuyUSD, rateSellUSD } = myCache.get('monoUSD');
    const { USD, buyUSD, saleUSD } = myCache.get('privatUSD');
    bot.sendMessage(
      msg.chat.id,
      `*PrivatBank*\n\nUAH -> ${USD}\nBuy: ${buyUSD}\nSale: ${saleUSD}\n\n*MonoBank*\n\nUAH -> USD\nBuy: ${rateBuyUSD}\nSale: ${rateSellUSD}`,
      {
        parse_mode: 'Markdown',
      }
    );
  } else if (msg.text === 'EUR') {
    await getAndCacheRates();

    const { rateBuyEUR, rateSellEUR } = myCache.get('monoEUR');
    const { EUR, buyEUR, saleEUR } = myCache.get('privatEUR');
    bot.sendMessage(
      msg.chat.id,
      `*PrivatBank*\n\nUAH -> ${EUR}\nBuy: ${buyEUR}\nSale: ${saleEUR}\n\n*MonoBank*\n\nUAH -> EUR\nBuy: ${rateBuyEUR}\nSale: ${rateSellEUR}`,
      {
        parse_mode: 'Markdown',
      }
    );
  }
});

const getAndCacheRates = async () => {
  try {
    const { data: privatData } = await axios.get(
      'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
    );
    const { data: monoData } = await axios.get(
      'https://api.monobank.ua/bank/currency'
    );
    const { ccy: EUR, buy: buyEUR, sale: saleEUR } = privatData[0];
    const { ccy: USD, buy: buyUSD, sale: saleUSD } = privatData[1];
    const { rateBuy: rateBuyUSD, rateSell: rateSellUSD } = monoData[0];
    const { rateBuy: rateBuyEUR, rateSell: rateSellEUR } = monoData[1];

    myCache.set('monoUSD', { rateBuyUSD, rateSellUSD });
    myCache.set('privatUSD', { USD, buyUSD, saleUSD });
    myCache.set('monoEUR', { rateBuyEUR, rateSellEUR });
    myCache.set('privatEUR', { EUR, buyEUR, saleEUR });
  } catch (error) {}
};
