/**
 * Created by BANO.notIT on 12.11.18.
 */



module.exports = class Bot {

    constructor(api) {
        console.log('Bot created')

        this.api = api
        this.inDialogWith = []
    }


    async handleEvent(event) {


        switch (event.type) {

            case 'message': {


                const messageType = event.subtype || 'normal'

                switch (messageType) {
                    case 'message_changed': {
                        return this.handleEvent(
                            Object.assign({
                                channel: event.channel
                            }
                            , event.message
                            )
                            )
                    }

                    case 'normal': {

                        if (event.hasOwnProperty('bot_id')) {
                            return
                        }
                        console.log(event)
                        console.log(`${event.user} in ${event.channel_type}: ${event.text}`)

                        if (
                            event.text.toLowerCase().includes('who the hell are you') && 
                                !this.inDialogWith.includes(event.user)
                        ) {
			    this.inDialogWith.push(event.user)

                            this.api
                                .sendMessage({
                                    channel: event.channel
                                    , text: 'You know. You all know exactly who I am. Say my name.'
                                })
                                .then(res => {
                                    console.log(res)
                                })
                        } else if (
                            event.text.toLowerCase().includes('heizenberg') && 
                                this.inDialogWith.includes(event.user)
                        ) {
			   const i = this.inDialogWith.indexOf(this.user)
			   this.inDialogWith.splice(i, 1)

			   this.api
			       .sendMessage({
			           channel: event.channel
				   , text: 'You\'re goddamn right!'
			       })
                        } else if (this.inDialogWith.includes(event.user)) {

                            this.api
                                .sendMessage({
                                    channel: event.channel
                                    , text: 'No, you know my name. I\'m the cook. I\'m the man who killed Gus Fring. Now. Say my name.'
                                })

                        }
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
