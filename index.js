import linebot from 'linebot'
import dotenv from 'dotenv'
import rp from 'request-promise'
import cheerio from 'cheerio'

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN

})

const search = async (keyword) => {
  let msg = ''
  let kw = encodeURI(keyword)
  console.log(kw)
  try {
    const result = rp({
      uri: `https://cookpad.com/tw/%E6%90%9C%E5%B0%8B/${kw}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    // console.log(result)

    const $ = cheerio.load(result)
    msg = 'success'


  }
  catch (error) {
    msg = error.message
  }

  // console.log(result)
  return msg
}

bot.on('message', event => {
  let msg
  if (event.message.text.includes('搜尋')) {
    msg = await search(event.message.text.slice(3))
    //msg = encodeURI(event.message.text.slice(3))
  }/*
  else if (event.message.text.includes('食譜')) 
  { 
    msg = recipe(event.message.text.slice(3))
  }*/
  console.log(event)
  event.reply(event.message.text)
  event.reply(msg)
})

bot.listen('/', process.env.Port)
