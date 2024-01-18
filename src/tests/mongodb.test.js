"use strict"

const mongoose = require("mongoose")
const connectString = "mongodb://localhost:27017/dbDev"

const TestSchema = new mongoose.Schema({ name: String})
const Test = mongoose.model("Test", TestSchema)

describe("Mongoose connection", () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(connectString)
    })

    afterAll(async () => {
        await connection.disconnect();
    })

    it("should connect to mongo",() => {
        expect(mongoose.connection.readyState).toBe(1);
    })

    it("show save a document to database", async () => {
        const user = new Test({name: "Thien"})
        user.save();
        expect(user.isNew).toBe(true);
    })


    it("show find a document to database", async () => {
        const user = await Test.findOne({name: "Thien Ngo"})
        expect(user).toBeDefined();
        expect(user.name).toBe("Thien Ngo");
    })
})
