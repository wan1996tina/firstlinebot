import linebot from 'linebot'
import dotenv from 'dotenv'

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN

})

bot.on('message', event => {
  console.log(event)
  event.reply(event.message.text)
})

bot.listen('/', process.env.Port)
