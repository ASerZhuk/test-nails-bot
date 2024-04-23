const TelegramBot = require('node-telegram-bot-api')
const TOKEN = process.env.TOKEN_BOT
const bot = new TelegramBot(TOKEN)

module.exports = bot
