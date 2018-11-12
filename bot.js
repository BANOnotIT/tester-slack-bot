/**
 * Created by BANO.notIT on 12.11.18.
 */



module.exports = class Bot {

    constructor(api) {
        console.log('Bot created')

        this.api = api
    }


    async handleEvent(event) {


        switch (event.type) {

            case 'message': {


                const messageType = event.subtype || 'normal'

                switch (messageType) {
                    case 'normal': {

                        if (event.hasOwnProperty('bot_id'))
                            return
                        console.log(event)
                        console.log(`${event.user} in ${event.channel_type}: ${event.text}`)

                        if (event.text.toLowerCase().includes('kenobi'))

                            this.api
                                .sendMessage({
                                    channel: event.channel,
                                    text: 'Hi there!'
                                })
                                .then(res => {
                                    console.log(res)
                                })
                        break
                    }

                    case 'message_deleted': {
                        console.log(`Message ${event.ts} deleted`)
                    }
                }

            }
        }

    }

    async handleCall(event) {
        switch (event.type) {
            case 'url_verification': {
                return {
                    challenge: event.challenge
                }
            }

            case 'event_callback': {
                return this.handleEvent(event.event)
            }

        }
    }
}
