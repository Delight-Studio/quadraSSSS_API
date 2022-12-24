import e from "express"
import { findBotById } from "../model/database.js"

const today = new Date()
const date = `${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`

export function addRequestAmount(botId) {
    return new Promise(( resolve ) => {
        findBotById(botId)
            .then(bot => {
                if(bot){
                    let days = bot.requestAmount
                    if (days.length == 0) { // 만약 봇의 요청량 데이터가 없다면
                        bot.requestAmount = [{ date, requestAmount : 1}] // 봇의 요청량 데이터 생성
                        resolve(true)
                    } else { // 만약 봇의 요청량 데이터가 있다면
                        let isTodayData = false
                        days.forEach(day => { // 지금까지의 봇의 요청량 데이터 중
                            if (day.date == date) { // 오늘자 데이터가 있다면
                                isTodayData = true
                                day.requestAmount++ // 요청량 1 추가
                                const updatedDay = { date, requestAmount: day.requestAmount }
                                days.pop()
                                days.push(updatedDay)
                                bot.requestAmount = days
                            }})
                        if (!isTodayData) { // 오늘자 데이터가 없다면
                            days.push({ date, requestAmount: 1 }) // 오늘자 데이터 추가
                            bot.requestAmount = days
                        }
                    }
                    bot.save()
                    resolve(true)
                } else {
                    resolve(undefined)
                }
        })
    })
}

export function updateServerAmount(botId, serverNum) {
    return new Promise(( resolve ) => {
        findBotById(botId)
        .then(bot => {
            if(bot) {
                let days = bot.serverAmount
                if (days.length == 0) { // 만약 봇의 서버 데이터가 없다면
                    bot.serverAmount = [{ date, serverAmount : serverNum}] // 봇의 서버 데이터 생성
                } else { // 만약 봇의 서버 데이터가 있다면
                    let isTodayData = false
                    days.forEach(day => { // 지금까지의 봇의 서버 데이터 중
                        if (day.date == date) { // 오늘자 데이터가 있다면
                            isTodayData = true
                            day.serverAmount += serverNum // 서버 serverNum만큼 추가
                            bot.serverAmount = days
                            const updatedDay = { date, serverAmount: day.serverAmount }
                            days.pop()
                            days.push(updatedDay)
                            bot.serverAmount = days
                        }
                    })
                    if (!isTodayData) { // 오늘자 데이터가 없다면
                        days.push({ date, serverAmount: serverNum }) // 오늘자 데이터 추가
                        bot.serverAmount = days
                    }
                }
                bot.save()
                resolve(true)
            } else {
                resolve(undefined)
            }
        })
    })
}

export function updateUserAmount(botId, userNum) {
    return new Promise(( resolve ) => {
        findBotById(botId)
            .then(bot => {
                if (bot) {
                    let days = bot.userAmount
                    if (days.length == 0) { // 만약 봇의 유저 데이터가 없다면
                        bot.userAmount = [{ date, userAmount : userNum}] // 봇의 유저 데이터 생성
                    } else { // 만약 봇의 유저 데이터가 있다면
                        let isTodayData = false
                        days.forEach(day => { // 지금까지의 봇의 유저 데이터 중
                            if (day.date == date) { // 오늘자 데이터가 있다면
                                isTodayData = true
                                day.userAmount += userNum // 유저 userNum만큼 추가
                                bot.userAmount = days
                                const updatedDay = { date, userAmount: day.userAmount }
                                days.pop()
                                days.push(updatedDay)
                                bot.userAmount = days
                            }
                        })
                        if (!isTodayData) { // 오늘자 데이터가 없다면
                            days.push({ date, userAmount: userNum }) // 오늘자 데이터 추가
                            bot.userAmount = days
                        }
                    }
                    bot.save()
                    resolve(true)
                } else {
                    resolve(undefined)
                }
        })
    })
}

export function updateHeartAmount(botId, heartNum) {
    return new Promise(( resolve ) => {
        findBotById(botId)
            .then(bot => {
                if (bot) {
                    let days = bot.heartAmount
                    if (days.length == 0) { // 만약 봇의 하트 데이터가 없다면
                        bot.heartAmount = [{ date, heartAmount : heartNum}] // 봇의 하트 데이터 생성
                    } else { // 만약 봇의 하트 데이터가 있다면
                        let isTodayData = false
                        days.forEach(day => { // 지금까지의 봇의 하트 데이터 중
                            if (day.date == date) { // 오늘자 데이터가 있다면
                                isTodayData = true
                                day.heartAmount += heartNum // 하트 heartNum만큼 추가
                                bot.heartAmount = days
                                const updatedDay = { date, heartAmount: day.heartAmount }
                                days.pop()
                                days.push(updatedDay)
                                bot.heartAmount = days
                            }
                        })
                        if (!isTodayData) { // 오늘자 데이터가 없다면
                            days.push({ date, heartAmount: heartNum }) // 오늘자 데이터 추가
                            bot.heartAmount = days
                        }
                    }
                    bot.save()
                    resolve(true)
                } else {
                    resolve(undefined)
                }
        })
    })
}

export function addDeveloper(botId, devId) {
    return new Promise(( resolve ) => {
        findBotById(botId)
            .then(bot => {
                if (bot) {
                    if(!bot.developers.includes(devId)){
                        bot.developers.push(String(devId))
                        bot.save()
                    }
                    resolve(true)
                } else {
                    resolve(undefined)
                }
        })
    })
}

export function addNotificationChannel(botId, channelId) {
    return new Promise((resolve) => {
        findBotById(botId)
            .then(bot => {
                if (bot) {
                    if(!bot.notificationChannel.includes(channelId)){
                        bot.notificationChannel.push(String(channelId))
                        bot.save()
                    }
                    resolve(true)
                } else {
                    resolve(undefined)
                }
        })
    })
}