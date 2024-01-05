"use strict"

const { connectToRabbitMqForTest } = require("../dbs/init.rabbit");

describe("RabbitMQ connection", () => {
    it('Should connect to successful RabbitMQ', async () => {
        const result = await connectToRabbitMqForTest()
        expect(result).toBeUndefined()
    })
})