process.env['NTBA_FIX_350'] = 1;
const TelegramBot = require('node-telegram-bot-api');
const program = require('commander');
const pkg = require('./package.json');

const bot = new TelegramBot(process.env.TOKEN);

program
  .version(pkg.version)
  .command('send-message <message>')
  .alias('m')
  .description('Send message to Telegram Bot')
  .action(function (message) {
    bot.sendMessage(process.env.ID, message);
  });

program
  .command('send-photo <path>')
  .alias('p')
  .description(
    'Send photo to Telegram Bot. Just drag and drop it in console after p-flag'
  )
  .action(function (path) {
    bot.sendPhoto(process.env.ID, path);
    console.log('You successfully sent photo to your bot');
  });

program.parse(process.argv);
