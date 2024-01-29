"use strict"

const { connectToRabbitMq, consumerQueue } = require("../dbs/init.rabbit")
// const log = console.log
// console.log = function(){
//     log.apply(console, [new Date()].concat(arguments))
// }
const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMq()
            await consumerQueue(channel, queueName)
        } catch (error) {
            console.error("Error consumer to Queue: ", error)
        }
    },

    // case processing
    consumerToQueueNormal: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMq()
            const notiQueue = "notificationQueueProcess"

            //1.TTL
            // setTimeout(() => {
            //     channel.consume(notiQueue, msg => {
            //         console.log("Send notification successfuly proceed", msg.content.toString())
            //         channel.ack(msg)
            //     })
            // }, 15000)

            //2. LOGIC
            channel.consume(notiQueue, msg => {
                try{
                    const numberTest = Math.random()
                    console.log("number test: ", numberTest)
                    if(numberTest < 0.8){
                        throw new Error("Error handle notification")
                    }

                    console.log("Send notification successfuly proceed", msg.content.toString())
                    channel.ack(msg)
                }catch(error){
                    // console.error("Error: ", error)
                    channel.nack(msg, false, false)
                }
            })

        } catch (error) {
            console.error(error);
        }
    },

    consumerToQueueFailed: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMq()
            const notificationExchangeDLX = "notificationExDLX" // notificationEx direct
            const notificationRoutingKeyDLX = "notificationRoutingKeyDLX" // assert
            const notiQueueHandler = "notificationQueueHotFix"

            await channel.assertExchange(notificationExchangeDLX, 'direct', {
                durable: true
            })

            const { queue } = await channel.assertQueue(notiQueueHandler, {
                exclusive: false
            })

            await channel.bindQueue(queue, notificationExchangeDLX, notificationRoutingKeyDLX)


            channel.consume(notiQueueHandler, msg => {
                console.log("this notification error proceed", msg.content.toString())
            }, {
                noAck: true
            })
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = messageService