const { consumerToQueue } = require("./src/services/consumerQueue.service")
const queueName = "test-topic"
consumerToQueue(queueName).then(()=> {
    console.log(`Message queue started: ${queueName}`)
}).catch(() => {
    console.error(`Message error: ${error}`)
})