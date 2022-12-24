import { createConnection, Schema } from "mongoose";

const botConnection = createConnection(`mongodb+srv://teamQbit:${process.env.DB_PASSWORD}@quadrassss.dni22cp.mongodb.net/?retryWrites=true&w=majority`)

const botSchema = new Schema({
    botId: String,
    owner: String,
    developers: Array,
    notificationChannel: Array,
    requestAmount: Array,
    serverAmount: Array,
    userAmount: Array,
    heartAmount: Array
})

const Bot = botConnection.model("Bot", botSchema)

export function createBot() {
    return new Bot()
}

export function findBotById(botId) {
    return new Promise((resolve, reject) => {
        Bot.findOne({ botId })
        .then(bot => {
                resolve(bot) ?? reject(undefined)
        })
    })
}

export function findBots() {
    return new Promise((resolve, reject) => {
        Bot.find((err, bots) => {
            if (err) {
                reject(err)
            } else {
                resolve(bots)
            }
        })
    })
}