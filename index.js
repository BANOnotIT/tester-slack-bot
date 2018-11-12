const
    express = require('express')
    , bodyParser = require('body-parser')
    , Bot = require('./bot')
    , Api = require('./api')

const
    app = express()
    , api = new Api(process.env.TOKEN)
    , bot = new Bot(api)


console.log(`Token used: ${process.env.TOKEN}`)

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('hello world'))

app.post('/bot-handler', async (req, res) => {

    const result = await bot.handleCall(req.body, {res})


    res.send(result)

})


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
