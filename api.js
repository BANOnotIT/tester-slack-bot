/**
 * Created by BANO.notIT on 12.11.18.
 */


const
    request = require('request-promise-native')

module.exports = class API {


    constructor(token, apiBase = 'https://slack.com/api/') {
        this.token = token
        this.apiBase = apiBase
    }


    async search(text) {
        const methodURL = this.apiBase + 'search.messages'


        return request.post({
            url: methodURL
            , form: {
                token: this.token
                , query: text
            }
        })

    }

    async deleteMessage({channel, ts}) {
        const methodURL = this.apiBase + 'chat.delete'


        return request.post({
            url: methodURL
            , form: {
                token: this.token
                , as_user: true
                , channel
                , ts
            }
        })
    }

    async sendMessage({channel, text}) {

        const methodURL = this.apiBase + 'chat.postMessage'


        return request.post({
            url: methodURL
            , form: {
                token: this.token
                , as_user: true
                , channel
                , text
            }
        })
    }
}
