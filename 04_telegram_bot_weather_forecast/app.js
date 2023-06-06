const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const formatResp = require('./formatResp');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  if (msg.text === '/start') {
    await bot.sendMessage(
      msg.chat.id,
      'Hello, please choose where you want to check the weather',
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: 'Forecast in Kyiv' }]],
        },
      }
    );
  } else if (msg.text === 'Forecast in Kyiv') {
    await bot.sendMessage(
      msg.chat.id,
      'Please select which time frame you are interested in',
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [
              { text: 'At intervals of 3 hours' },
              { text: 'At intervals of 6 hours' },
            ],
          ],
        },
      }
    );
  } else if (msg.text === 'At intervals of 3 hours') {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?id=703448&cnt=40&appid=${process.env.WEATHER_API}`
      );
      const result = formatResp(data.list);
      result.unshift('Here your 3-hour-interval forecast in Kyiv\n\n');
      bot.sendMessage(msg.chat.id, result.join(''));
    } catch (error) {
      console.log(error);
    }
  } else if (msg.text === 'At intervals of 6 hours') {
    try {
      let { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?id=703448&cnt=40&appid=${process.env.WEATHER_API}`
      );
      data.list = data.list.filter((item, index) => index % 2 === 0);
      const result = formatResp(data.list);
      result.unshift('Here your 6-hour-interval forecast in Kyiv\n\n');
      bot.sendMessage(msg.chat.id, result.join(''));
    } catch (error) {
      console.log(error);
    }
  }
});
