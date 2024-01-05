"use strict"

const amqp = require("amqplib")

const connectToRabbitMq = async () => {
    try{
        const connection = await amqp.connect('amqp://guest:12345@localhost')
        if(!connection) throw new Error("Connection rabbit mq failed");

        const channel = await connection.createChannel()

        return { channel, connection}
    }catch(error){

    }
}

const connectToRabbitMqForTest = async () => {
    try{
        const { channel, connection } = await connectToRabbitMq();
        //Publish message to a queue
        const queue =  "test-queue"
        const message = "Hello, Ngo Tien Thien"
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));

        //close the connection
        await connection.close()
    }catch(error){
        console.error('Error connecting with RabbitMQ', error);
    }
}

module.exports = {
    connectToRabbitMq,
    connectToRabbitMqForTest
}