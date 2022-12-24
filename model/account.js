import { createBot } from "./database.js";

export function registerBot(botId, ownerId) {
    try {
        const botModel = createBot()
        botModel.botId = String(botId)
        botModel.owner = String(ownerId)
        botModel.developers = [String(ownerId)]
        botModel.notificationChannel = []
        botModel.requestAmount = []
        botModel.serverAmount = []
        botModel.userAmount = []
        botModel.heartAmount = []
        botModel.save()
    } catch (error) {
        console.log(error)
    }
}