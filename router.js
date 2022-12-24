import express from 'express';
import { registerBot } from './model/account.js';
import { findBotById, findBots } from './model/database.js';
import { addDeveloper, addNotificationChannel, addRequestAmount, updateHeartAmount, updateServerAmount, updateUserAmount } from './controller/update.js';

const router = express.Router()


router.get('/', (req, res, next) => {
    res.status(200).json({ message: "QuadraSSSS | Safe Security Statistics Solution"})
})

router.get('/botData/:botId', (req, res, next) => {
    const botId = req.params.botId
    findBotById(botId)
        .then((bot) => {
            if (bot) {
                res.status(200).json(JSON.stringify(bot))
            } else {
                res.status(404).json({ message: "Bot undefined" })
            }
    })
})

router.get('/bots', (req, res, next) => {
    findBots()
        .then(bots => {
            if (bots) {
                res.status(200).json(JSON.stringify(bots))
            } else {
                res.status(404).json({ message: "Error Found" })
            }
    })
})

router.post('/register/:botId/:ownerId', (req, res, next) => { // 봇 등록
    const botId = req.params.botId
    const ownerId = req.params.ownerId 
    registerBot(botId, ownerId)
    res.sendStatus(201)
})

router.put('/addRequestAmount/:botId', (req, res, next) => {
    const botId = req.params.botId
    addRequestAmount(botId)
        .then(result => {
            if (result) {
                res.status(200).json({ message: "Request Amount Updated" })
            } else {
                res.status(404).json({ message: "Bot undefined" })
            }
    })
})

router.put('/updateServerAmount/:botId/:serverNum', (req, res, next) => {
    const botId = req.params.botId
    const serverNum = req.params.serverNum
    updateServerAmount(botId, serverNum)
        .then(result => {
            if (result) {
                res.status(200).json({ message: "Server amount List Updated" })
            } else {
                res.status(404).json({ message: "Bot undefined" })
            }
    })
})

router.put('/updateUserAmount/:botId/:userNum', (req, res, next) => {
    const botId = req.params.botId
    const userNum = req.params.userNum
    updateUserAmount(botId, userNum)
        .then(result => {
            if (result) {
                res.status(200).json({ message: "User amount List Updated" })
            } else {
                res.status(404).json({ message: "Bot undefined" })
            }
    })
})

router.put('/updateHeartAmount/:botId/:heartNum', (req, res, next) => {
    const botId = req.params.botId
    const heartNum = req.params.heartNum
    updateHeartAmount(botId, heartNum)
        .then(result => {
            if (result) {
                res.status(200).json({ message: "Heart amount List Updated" })
            } else {
                res.status(404).json({ message: "Bot undefined" })
            }
    })
})


router.put('/addDeveloper/:botId/:devId', (req, res, next) => {
    const botId = req.params.botId
    const devId = req.params.devId
    addDeveloper(botId, devId)
        .then(result => {
            if (result) {
                res.status(200).json({ message: "Developer List Updated" })
            } else {
                res.status(404).json({ message: "Bot undefined" })
            }
    })
})

router.put('/addNotificationChannel/:botId/:channelId', (req, res, next) => {
    const botId = req.params.botId
    const channelId = req.params.channelId
    addNotificationChannel(botId, channelId)
        .then(result => {
            if (result) {
                res.status(200).json({ message: "Notification Channel List Updated" })
            } else {
                res.status(404).json({ message: "Bot undefined" })
            }
    })
})


export default router;