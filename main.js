"use strict";
const { default: makeWASocket, DisconnectReason, useSingleFileAuthState, makeInMemoryStore, downloadContentFromMessage, jidDecode, generateForwardMessageContent, generateWAMessageFromContent } = require("@adiwajshing/baileys")
const fs = require("fs");
const chalk = require('chalk')
const logg = require('pino')
const { serialize, fetchJson, sleep, getBuffer } = require("./lib/myfunc");
const { nocache, uncache } = require('./lib/chache.js');
const { groupResponse_Welcome, groupResponse_Remove, groupResponse_Promote, groupResponse_Demote } = require('./lib/group.js')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/Upload_Url')

let setting = JSON.parse(fs.readFileSync('./setting.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

const memory = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
const ramz = makeWASocket({
printQRInTerminal: true,
logger: logg({ level: 'fatal' }),
browser: ['Ramaa Gnnz','Safari','1.0.0'],
auth: state
})
memory.bind(ramz.ev)

ramz.ev.on('messages.upsert', async m => {
var msg = m.messages[0]
if (!m.messages) return;
if (msg.key && msg.key.remoteJid == "status@broadcast") return
msg = serialize(ramz, msg)
msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
require('./index')(ramz, msg, m, setting, memory)
})

ramz.ev.on('creds.update', () => saveState)

console.log(chalk.yellow(`${chalk.red('[ Made By Ramaa GnnZ ]')}\n\n${chalk.italic.magenta(`SV RAMAA GNZZ\nNomor: 085791220179\nSebut Nama👆,`)}\n\n\n${chalk.red(`ADMIN SEDIA`)}\n${chalk.white(`-PANEL RUN BOT\n-SCRIT CREATE PANEL\n-SCRIPT MD\n-THEMES PANEL\n`)}`))
 

ramz.reply = (from, content, msg) => ramz.sendMessage(from, { text: content }, { quoted: msg })

ramz.ev.on('connection.update', (update) => {
console.log('Connection update:', update)
if (update.connection === 'open') 
console.log("Connected with " + ramz.user.id)
else if (update.connection === 'close')
connectToWhatsApp()
})

ramz.ev.on('group-participants.update', async (update) =>{
groupResponse_Demote(ramz, update)
groupResponse_Promote(ramz, update)
groupResponse_Welcome(ramz, update)
groupResponse_Remove(ramz, update)
console.log(update)
})

ramz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await ramz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

ramz.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

ramz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await ramz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

ramz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await ramz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

return ramz
}
connectToWhatsApp()
.catch(err => console.log(err))
