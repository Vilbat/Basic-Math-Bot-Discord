const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzIzMjA4NjM5OTgwMTA5OTE2.XuuSmg.CnSPjBGX0mU6S_B7ghQDQITqzTU';

bot.on('ready', () => {
    console.log("is online")
})

let engaged = []
let engagedOperation = []
let engagedNumbers = []

bot.on("message", msg => {
    if (msg.content.includes('!math')) {
        if (!engaged.includes(msg.author)) {
            msg.reply("Add(a), or multiply(m)");
            //msg.reply(msg.author.toString())
            engaged.push(msg.author)
            console.log(engaged.toString())
        } else {
            msg.reply("Math is already in progress")
        }
    } else if ((msg.content.includes('!a') || msg.content.includes('!m')) && engaged.includes(msg.author)) {
        const index = engaged.indexOf(msg.author)
        console.log(engagedNumbers[engaged.indexOf(msg.author)])
        //msg.reply(index.toString())
        var insert;
        if (msg.content.includes('!a')) {
            insert = 0
        } else {
            insert = 1
        }
        engagedOperation.splice(index, 0, insert)
        msg.reply("Write numbers")
        console.log(engagedOperation[engaged.indexOf(msg.author)])
    } else if (engaged.includes(msg.author) && msg.content.includes('!') && engagedOperation[engaged.indexOf(msg.author)] != undefined) {
        if (engagedNumbers[engaged.indexOf(msg.author)] == undefined) {
            engagedNumbers.splice(engaged.indexOf(msg.author), 0, [])
        }
        engagedNumbers[engaged.indexOf(msg.author)].push(parseInt(msg.content.substr(1)))
        console.log(engagedNumbers)
        console.log(engagedNumbers[0].length)
        if (engagedNumbers[engaged.indexOf(msg.author)].length >= 2) {
            console.log("numbers finished")
            if(engagedOperation[engaged.indexOf(msg.author)] == 0) {
                msg.reply(engagedNumbers[engaged.indexOf(msg.author)][0] + engagedNumbers[engaged.indexOf(msg.author)][1])
            } else {
                msg.reply(engagedNumbers[engaged.indexOf(msg.author)][0] * engagedNumbers[engaged.indexOf(msg.author)][1])
            }
            const indexPos = engaged.indexOf(msg.author)
            engagedNumbers.splice(indexPos, 1)
            engaged.splice(indexPos, 1)
            engagedOperation.splice(indexPos, 1)
        }
    }
})

bot.login(token);