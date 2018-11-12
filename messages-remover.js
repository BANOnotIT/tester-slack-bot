const
    Api = require('./api')
    , messages = require('./asdf.json')


const api = new Api(process.env.TOKEN)

module.exports = (channel) => {


    // console.log(await api.search('Hi there!'))
    messages.forEach((ts, i) =>
        setTimeout(async () => {
            console.log(`Deleting ${ts} ... `)
            const result = await api.deleteMessage({ts, channel})
            console.log(`Deleted ${ts} with result ${result}`)
        }, i * 1500)
    )
}
