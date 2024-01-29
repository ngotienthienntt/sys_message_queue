const { consumerToQueue, consumerToQueueFailed, consumerToQueueNormal } = require("./src/services/consumerQueue.service")
const queueName = "test-topic"
// consumerToQueue(queueName).then(()=> {
//     console.log(`Message queue started: ${queueName}`)
// }).catch(() => {
//     console.error(`Message error: ${error}`)
// })

consumerToQueueFailed(queueName).then(()=> {
    console.log(`Message queue started consumerToQueueFailed: ${queueName}`)
}).catch(() => {
    console.error(`Message error: ${error}`)
})



consumerToQueueNormal(queueName).then(()=> {
    console.log(`Message queue started consumerToQueueNormal: ${queueName}`)
}).catch(() => {
    console.error(`Message error: ${error}`)
})
