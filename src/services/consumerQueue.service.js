 "use strict"

 const { connectToRabbitMq, consumerQueue} = require("../dbs/init.rabbit")

 const messageService = {
    consumerToQueue: async (queueName) => {
        try{
            const { channel, connection } = await connectToRabbitMq()
            await consumerQueue(channel, queueName)
        }catch(error){
            console.error("Error consumer to Queue: ", error)
        }
    }
 }

 module.exports = messageService