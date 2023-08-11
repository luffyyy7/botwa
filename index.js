//@AzissImutt

//𝗢𝗣𝗘𝗡 𝗝𝗔𝗦𝗔
//› Jasa install Website panel 
//› Jasa penambahan fitur
//› jasa fix Script yang eror 
//› Jasa Pembuatan Script private
//script

//𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡 
//› Script bot Create panel v4 
//› Script Bot Campuran 
//› Script Save otomatis 
//› Script bot create panel, fitur Deposit 
// Sedia panel run bot

//[ Untuk Script yang saya jual, ini buatan saya sendiri,
// jadi jikalau ada yang eror maka 100% akan di bantu Sampai script nya benar2 Bekerja. ]

//______________________________
//berminat Chat:
//08950848326xx


"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./lib/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/addlist');


// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");

// Database
const setting = JSON.parse(fs.readFileSync('./setting.json'));
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(ramz, msg, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6285791220179@s.whatsapp.net","6285806240904@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = ramz.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await ramz.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isWelcome = isGroup ? welcome.includes(from) : false

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = ramz.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = ramz.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}

const reply = (teks) => {ramz.sendMessage(from, { text: teks }, { quoted: msg })}

//Antilink
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || budy.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await ramz.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
ramz.groupParticipantsUpdate(from, [sender], "remove")
}
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
ramz.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
ramz.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return ramz.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}


const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Created By ${setting.ownerName}\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${setting.botName},;;;\nFN:Halo ${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: setting.thumb }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
	case 'help':
	case 'menu':{
		const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${setting.ownerName}`
var ramex = `./SCRIPT BY RAMAA GNNZ`
	let menu = `━━━━━[ ${setting.botName} ]━━━━━


┏━━━『 𝘿𝘼𝙏𝘼 𝘽𝙊𝙏 』━━━━━◧
┃
┣» ᴄʀᴇᴀᴛᴏʀ : @${setting.kontakOwner}
┣» ʙᴏᴛ ɴᴀᴍᴇ : ${setting.botName}
┣» ᴏᴡɴᴇʀ ɴᴀᴍᴇ : ${setting.ownerName} 
┣» ʀᴜɴɴɪɴɢ : ᴘᴀɴᴇʟ
┃
┗━━━━━━━━━━━━━━━━━━◧
┏━━━━『 𝙇𝙞𝙨𝙩 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .mainmenu
┣» .ownermenu
┣» .grupmenu
┣» .sosmed
┣» .testimoni 
┃
┣» .listproduk
┣» .kalkulator
┣» .script
┣» .owner
┣» .donasi
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {
text: menu, 
mentions: [setting.ownerNumber, sender]},
 {quoted: fkontak})
 ramz.sendMessage(from, {audio: {url: `./gambar/suara.mp3`}, mimetype:'audio/mpeg', ptt:true})
}
break
case 'mainmenu':{
	let menu = `
┏━━━━『 𝙈𝙖𝙞𝙣 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .produk
┣» .listproduk
┣» .donasi
┣» .ping
┣» .test
┣» .pembayaran 
┣» .bayar
┣» .script
┣» .s
┣» .sticker 
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'grupmenu':{
	let menu = `
┏━━━━『 𝙂𝙧𝙤𝙪𝙥 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .hidetag
┣» .group open
┣» .group close 
┣» .antilink on
┣» .antilink off
┣» .welcome on
┣» .welcome off
┣» .kick 
┣» .proses
┣» .done
┃
┣» .addlist
┣» .dellist
┣» .list (work)
┣» .shop
┣» .hapuslist
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'ownermenu':{
	let menu = `
┏━━━━『 𝙊𝙬𝙣𝙚𝙧 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .join
┣» .sendbyr 62xxx
┣» .block 62xxx 
┣» .unblock 62xxx
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'kalkulator':{
	let menu = `
┏━━━━『 Kalkulator 』━━━━◧
┃
┣» .tambah
┣» .kali
┣» .bagi
┣» .kurang
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'testemoni':
case 'testimoni':{
	let menu = `
┏━━━『 TESTIMONI 』━━━━◧
┃
┣» .testi1
┣» .testi2
┣» .testi3
┣» .testi4
┣» .testi5
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'sosmed':{
	let menu = `
┏━━━『 SOSIAL MEDIA 』━━━◧
┃
┣» .ig
┣» .yt
┣» .gc
┣» .youtube
┣» .Instagram 
┣» .groupadmin
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'sticker': case 's': case 'stiker':{
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage('image', `./gambar/${tanggal}.jpg`)
reply(mess.wait)
ramz.sendImageAsSticker(from, media, msg, { packname: `${setting.namaStore}`, author: `Store Bot`})
} else if (isVideo || isQuotedVideo) {
let media = await downloadAndSaveMediaMessage('video', `./sticker/${tanggal}.mp4`)
reply(mess.wait)
ramz.sendVideoAsSticker(from, media, msg, { packname: `${setting.namaStore}`, author: `Store Bot`})
} else {
reply(`Kirim/reply gambar/vidio dengan caption *${prefix+command}*`)
}
}
break
case 'listproduk':
case 'produk':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${setting.ownerName}`
let tampilan_nya = `Hallo Kak..👋
Saya adalah Bot store yang bisa membantu anda

Berikut List produk Kami yah kak🙏,
Jangan Lupa untuk order 👍
${strip_ny}
${prefix}freefire
${prefix}mobilelegend
`
ramz.sendMessage(from,
{text: tampilan_nya,
mentions:[setting.ownerNumber, sender]})
}
break
case 'owner':{
var owner_Nya = setting.ownerNumber
sendContact(from, owner_Nya, setting.ownerName, msg)
reply('*Itu kak nomor owner ku, Chat aja gk usah malu😆*')
}
break
case 'yt':
case 'youtube':
	ramz.sendMessage(from, 
{text: `Jangan Lupa Subscriber yah kak😉🙏
*Link* : ${setting.linkyt}`},
{quoted: msg})
break
case 'ig':
case 'instagram':
	ramz.sendMessage(from, {text: `Admin Kurang ngurus ig uyy Jadi subscribe aja YouTube admin\n\nLink \n${setting.linkig}`},
{quoted: msg})
break
case 'gc':
case 'groupadmin':
	ramz.sendMessage(from, 
{text: `*Group  ${setting.ownerName}*\n
Group1 : ${setting.linkgc1}
Group2 : ${setting.linkgc2}`},
{quoted: msg})
break
case 'donasi': case 'donate':{
let tekssss = `───「  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* ${setting.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Saweria :* ${setting.sawer}
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`
ramz.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: msg})
}
break
case 'sendbyr':{
	if (!isOwner) return reply(mess.OnlyOwner)
	if (!q) return reply('*Contoh:*\n.add 628xxx')
	var number = q.replace(/[^0-9]/gi, '')+'@s.whatsapp.net'
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${setting.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

_Pembayaran ini Telah di kirim oleh Admin_
_Melalui bot ini🙏_


OK, thanks udah order di *${setting.namaStore}*
`
ramz.sendMessage(number, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: msg})
reply (`Suksess Owner ku tercinta 😘🙏`)
}
break
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await ramz.groupAcceptInvite(ini_urrrl).then((res) => reply(`Berhasil Join ke grup...`)).catch((err) => reply(`Eror.. Munkin bot telah di kick Dari grup tersebut`))
}
break
case 'payment':
case 'pembayaran':
case 'bayar':{
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${setting.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

OK, thanks udah order di *${setting.botName}*
`
ramz.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: msg})
}
break
case 'testi1':{
let tekssss = `𝗛𝗮𝗹𝗹𝗼 𝗸𝗮𝗸👋🏻
Gambar di atas adalah testimoni Dari ${setting.namaStore}

Untuk Nominal transaksi bisa cek di atas ya kak..

Yang pasti ${setting.namaStore} adalah store paling amanah dan terpercaya✨

(Testimoni ke 1)
`
ramz.sendMessage(from, { image: fs.readFileSync(`./testimoni/testimoni_1.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: fkontak})
}
break
case 'testi2':{
let tekssss = `𝗛𝗮𝗹𝗹𝗼 𝗸𝗮𝗸👋🏻
Gambar di atas adalah testimoni Dari ${setting.namaStore}

Untuk Nominal transaksi bisa cek di atas ya kak..

Yang pasti ${setting.namaStore} adalah store paling amanah dan terpercaya✨

(Testimoni ke 2)
`
ramz.sendMessage(from, { image: fs.readFileSync(`./testimoni/testimoni_2.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: fkontak})
}
break
case 'testi3':{
let tekssss = `𝗛𝗮𝗹𝗹𝗼 𝗸𝗮𝗸👋🏻
Gambar di atas adalah testimoni Dari ${setting.namaStore}

Untuk Nominal transaksi bisa cek di atas ya kak..

Yang pasti ${setting.namaStore} adalah store paling amanah dan terpercaya✨

(Testimoni ke 3)
`
ramz.sendMessage(from, { image: fs.readFileSync(`./testimoni/testimoni_3.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: fkontak})
}
break
case 'testi4':{
let tekssss = `𝗛𝗮𝗹𝗹𝗼 𝗸𝗮𝗸👋🏻
Gambar di atas adalah testimoni Dari ${setting.namaStore}

Untuk Nominal transaksi bisa cek di atas ya kak..

Yang pasti ${setting.namaStore} adalah store paling amanah dan terpercaya✨

(Testimoni ke 4)
`
ramz.sendMessage(from, { image: fs.readFileSync(`./testimoni/testimoni_4.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: fkontak})
}
break
case 'testi5':{
let tekssss = `𝗛𝗮𝗹𝗹𝗼 𝗸𝗮𝗸👋🏻
Gambar di atas adalah testimoni Dari ${setting.namaStore}

Untuk Nominal transaksi bisa cek di atas ya kak..

Yang pasti ${setting.namaStore} adalah store paling amanah dan terpercaya✨

(Testimoni ke 5)
`
ramz.sendMessage(from, { image: fs.readFileSync(`./testimoni/testimoni_5.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: fkontak})
}
break
case 'ml':
case 'mobilelegend':{
let teq =`List Top Up *Mobile legend*

*Starlight member* 145k

*Star light plus* 305k

*List Top up Mobile legend*

28 Diamond (26 + 2 Bonus) Rp 8k

44 Diamond (40 + 4 Bonus) Rp 13k

56 Diamond (51 + 5 bonus) Rp17k

86 Diamond (78 + 8 Bonus) Rp 22k

172 Diamond (156 + 16 Bonus) Rp 42k

257 Diamond (234 + 23 Bonus) Rp 62k

429 Diamond (390 + 39 Bonus) Rp 100k

514 Diamond (468 + 46 Bonus) Rp119k

600 Diamond (546 + 54 Bonus) Rp138k

706 Diamond (625 + 81 Bonus) Rp159k

878 Diamond (781 + 97 Bonus) Rp195k


Untuk list lain nya bisa bertanya🥰

Jika setuju untuk membeli ketik *#proses* untuk memproses Transaksi`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUYðŸ›’' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'ff':
case 'freefire':{
let teq =`*FREE FIRE*

List Top up *free fire*
70dm 10k
140dm 20k
210dm 28k
355dm 45k
720dm 86
1000dm 120k
List lain nya tinggal tanya🥰


Jika setuju untuk membeli ketik *#proses* untuk memproses Transaksi`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'chips':
case 'chipsdomino':{
let teq =`
*LIST CHIP KUNING HIGS DOMINO VIA ID*
100M🪙6.500
200M🪙13.000
300M🪙19.500
400M🪙26.500
500M🪙32.500
600M🪙39.000
700M🪙45.500
800M🪙52.500
900M🪙58.500
1B     🪙63.000
5B     🪙315.000
10B   🪙630.000
*Chip ungu 1B Rp68.000*

*Proses 1-10menit*
*-salah penulis ID GK komplain*
*-proses = no cancel*
⚠️ TERIMA BONGKAR CHAT ADMIN ⚠️


Jika setuju untuk membeli ketik *proses chips*`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'proses':{
let tek = (`「 *TRANSAKSI PENDING* 」\n\n\`\`\`🎀 PRODUK : ${q}\n📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya🙏*\n*Atau Chat : Wa.me//${setting.kontakOwner}*`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
ramz.sendMessage(from,
{text: tek})
ramz.sendMessage(`${setting.ownerNumber}`, {text: `*👋HALLO OWNER KU, ADA YANG ORDER PRODUK ${q} NIH*\n\n*DARI* : ${sender.split('@')[0]}`})
}
break
case 'done':{
let tek = (`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *${setting.namaStore}*\nNext Order ya🙏`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE THENKS👍' }, type: 1 },
]
ramz.sendMessage(from,
{text: tek})
}
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
ramz.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'group':
case 'grup':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
ramz.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
ramz.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
ramz.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
ramz.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'welcome':{
if (!isGroup) return reply('Khusus Group!') 
if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Mau ngapain?, Fitur ini khusus admin")
if (!args[0]) return reply('*Kirim Format*\n\n.welcome on\n.welcome off')
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcome.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
var posi = welcome.indexOf(from)
welcome.splice(posi, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
reply('Sukses Unblock Nomor')
}
break
case 'shop':
case 'list':
(function(_0x15a845,_0x55dd4a){function _0x5df7d2(_0xc635cc,_0x1c7d3a,_0x5e5b44,_0x41a660){return _0x2664(_0xc635cc- -0x111,_0x5e5b44);}function _0x343f82(_0x39e641,_0x2bb3ce,_0x11e957,_0x2e6b2a){return _0x2664(_0x39e641-0x2f1,_0x2e6b2a);}const _0x74541e=_0x15a845();while(!![]){try{const _0x2a01c3=parseInt(_0x5df7d2(-0x59,-0x5b,-0x66,-0x5a))/(-0x14e3*0x1+0x3*0x851+-0x1*0x40f)+-parseInt(_0x343f82(0x396,0x38b,0x390,0x385))/(0x7a9+0x830+0x5*-0x32b)+-parseInt(_0x343f82(0x3a4,0x397,0x3ad,0x3b5))/(0x5*0x771+-0xde2+-0x1750)*(parseInt(_0x343f82(0x395,0x389,0x38d,0x388))/(0xc99+-0xac2+-0x1d3))+parseInt(_0x343f82(0x3ac,0x39f,0x3bc,0x398))/(-0x5*0x31b+-0x215e+0x1*0x30ea)*(parseInt(_0x343f82(0x3ae,0x3a3,0x3bd,0x3ab))/(0x212e*-0x1+-0x1*-0x259f+-0x46b))+-parseInt(_0x343f82(0x3a0,0x3ad,0x38e,0x392))/(-0x9d1+0x1*-0x68d+0x1065)*(-parseInt(_0x5df7d2(-0x76,-0x79,-0x85,-0x63))/(0x1d0+-0x13d0+-0x8*-0x241))+parseInt(_0x343f82(0x39b,0x3a8,0x392,0x389))/(0x10af+-0x457*0x8+-0x6*-0x303)+-parseInt(_0x5df7d2(-0x6e,-0x5b,-0x76,-0x5c))/(0x139*0x17+-0x217b+0x2*0x2b3);if(_0x2a01c3===_0x55dd4a)break;else _0x74541e['push'](_0x74541e['shift']());}catch(_0x449a8a){_0x74541e['push'](_0x74541e['shift']());}}}(_0x4ac4,0xa8650+-0x3aec2+0x56b3));const _0x1ce65=(function(){function _0x106194(_0x1b1f07,_0x1aaaf3,_0x3b93c7,_0x2eb656){return _0x2664(_0x1b1f07-0x365,_0x1aaaf3);}const _0xbfcf2={};function _0x12fbc7(_0x190fec,_0x37bc6a,_0x8161ac,_0x1ff0da){return _0x2664(_0x37bc6a-0x54,_0x190fec);}_0xbfcf2['FvwDE']=function(_0xfc6709,_0x4be1f5){return _0xfc6709===_0x4be1f5;},_0xbfcf2[_0x106194(0x421,0x41e,0x418,0x41b)]=_0x12fbc7(0xf9,0x106,0xf7,0x107);const _0x2bfbf0=_0xbfcf2;let _0x9d8e76=!![];return function(_0x238490,_0x59236e){const _0x2e889a=_0x9d8e76?function(){function _0x5e59c0(_0x1c261b,_0x2ed5b9,_0x101ad8,_0x3ab7d6){return _0x2664(_0x2ed5b9-0x338,_0x101ad8);}function _0x1444ac(_0x2129d9,_0xc49dfc,_0x171df1,_0x49f60f){return _0x2664(_0xc49dfc-0x34e,_0x49f60f);}if(_0x2bfbf0[_0x5e59c0(0x3e6,0x3ed,0x3f1,0x3f6)](_0x2bfbf0[_0x1444ac(0x41c,0x40a,0x402,0x414)],_0x5e59c0(0x3f3,0x3ea,0x3e5,0x3f5))){if(_0x59236e){const _0x1637b2=_0x59236e[_0x5e59c0(0x3f7,0x3ee,0x3da,0x3e2)](_0x238490,arguments);return _0x59236e=null,_0x1637b2;}}else{const _0x587593=_0x57abac[_0x1444ac(0x418,0x404,0x401,0x408)](_0x455323,arguments);return _0x2519d9=null,_0x587593;}}:function(){};return _0x9d8e76=![],_0x2e889a;};}()),_0x45f719=_0x1ce65(this,function(){function _0x5f4708(_0x53db87,_0x24a38f,_0x19123f,_0x139bd8){return _0x2664(_0x19123f- -0x13e,_0x139bd8);}function _0xf73b7a(_0x3ef505,_0xe74118,_0x31e80f,_0x23883a){return _0x2664(_0x31e80f-0xf6,_0x23883a);}return _0x45f719[_0x5f4708(-0x93,-0xa7,-0x95,-0x98)]()[_0x5f4708(-0x8d,-0x9b,-0x87,-0x7c)]('(((.+)+)+)'+'+$')[_0xf73b7a(0x1ab,0x18d,0x19f,0x1af)]()[_0xf73b7a(0x1be,0x19e,0x1b0,0x1ad)+'r'](_0x45f719)['search'](_0x5f4708(-0x94,-0x81,-0x8e,-0x7b)+'+$');});_0x45f719();if(!isGroup)return reply(mess[_0x73923d(-0xda,-0xdb,-0xe2,-0xe1)]);if(db_respon_list[_0x73923d(-0xe0,-0xce,-0xf1,-0xe4)]===-0xd79+0x1991+-0x408*0x3)return reply(_0x73923d(-0xe4,-0xe0,-0xd0,-0xd9)+_0x73923d(-0xed,-0xe8,-0xf9,-0xdd)+_0x73923d(-0xd2,-0xe1,-0xc4,-0xbf)+_0x73923d(-0xf1,-0xec,-0x103,-0xff));if(!isAlreadyResponListGroup(from,db_respon_list))return reply(_0x73923d(-0xe4,-0xd1,-0xec,-0xde)+'list\x20messa'+_0x73923d(-0xec,-0xf7,-0xf6,-0xf9)+_0x78090c(-0x133,-0x146,-0x129,-0x13a)+'\x20group\x20ini');var arr_rows=[];for(let x of db_respon_list){if(x['id']===from){const _0x4fbe5c={};_0x4fbe5c[_0x73923d(-0xde,-0xea,-0xf0,-0xe0)]=x['key'],_0x4fbe5c[_0x78090c(-0x12a,-0x135,-0x12c,-0x130)]=x[_0x73923d(-0xd7,-0xe9,-0xe3,-0xdd)],arr_rows[_0x78090c(-0x138,-0x14b,-0x128,-0x131)](_0x4fbe5c);}}let tekny='Hai\x20@'+sender['split']('@')[0xd64+0x5d4*-0x2+-0x1bc]+(_0x73923d(-0xea,-0xfe,-0xe8,-0xe3)+'ist\x20item\x20y'+_0x73923d(-0xf4,-0xf8,-0xf5,-0xfa)+'ia\x20di\x20grou'+_0x78090c(-0x137,-0x125,-0x127,-0x140)+_0x73923d(-0xeb,-0xf5,-0xe7,-0xf3)+_0x73923d(-0xdf,-0xed,-0xdd,-0xd4)+_0x78090c(-0x13a,-0x148,-0x144,-0x132)+_0x78090c(-0x128,-0x12a,-0x13a,-0x11f)+_0x78090c(-0x134,-0x12c,-0x142,-0x13a));for(let i of arr_rows){tekny+=_0x73923d(-0xdd,-0xee,-0xcb,-0xf0)+i[_0x78090c(-0x123,-0x135,-0x12d,-0x113)]+'\x0a\x0a';}function _0x78090c(_0x5640bc,_0x3f4e73,_0x989108,_0x200e82){return _0x2664(_0x5640bc- -0x1d0,_0x3f4e73);}const _0x5e009e={};_0x5e009e['text']=tekny;var listMsg=_0x5e009e;function _0x4ac4(){const _0x27f815=['9GJEzmI','key','FvwDE','apply','search','677853KGyDEt','ge\x20di\x20data','constructo','32070NnRXaM','HDFPe','660iLeqyE','oduk\x20yang\x20','ang\x20tersed','push','p\x20ini!\x0a\x0aSi','base','1376deNoSm','!\x0a\x0a','rdaftar\x20di','list\x20messa','ge\x20yang\x20te','lahkan\x20ket','\x0aBerikut\x20l','sendMessag','15568550dWCrGs','62516uTrypg','633606QJsreQ','rowId','Belum\x20ada\x20','diinginkan','toString','3670281FXgpoF','length','ik\x20nama\x20pr','title','Produk\x20:\x20','24416aFNZnC','(((.+)+)+)','OnlyGrup','fHDuq'];_0x4ac4=function(){return _0x27f815;};return _0x4ac4();}function _0x73923d(_0x2ecdbc,_0x26a6f0,_0x34b44f,_0x2ada21){return _0x2664(_0x2ecdbc- -0x18b,_0x2ada21);}function _0x2664(_0x51b13a,_0xa76681){const _0x5a9f15=_0x4ac4();return _0x2664=function(_0x3257c4,_0x380974){_0x3257c4=_0x3257c4-(0x1e95+-0x9fd*0x1+-0x2*0xa01);let _0x2b6b61=_0x5a9f15[_0x3257c4];return _0x2b6b61;},_0x2664(_0x51b13a,_0xa76681);}ramz[_0x73923d(-0xe9,-0xdf,-0xeb,-0xf3)+'e'](from,listMsg);
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break
case 'dellist':{
function _0x3b3dd3(_0x302b8c,_0x264c1d,_0x514554,_0x42d43d){return _0x1c1a(_0x302b8c-0x32c,_0x514554);}(function(_0x395e62,_0x5ca165){const _0x2a7285=_0x395e62();function _0x401cc9(_0x42c090,_0x440fa6,_0x1324c9,_0x3d2d4d){return _0x1c1a(_0x42c090-0xb1,_0x440fa6);}function _0x40fa1b(_0x2a4f22,_0x2f2cd8,_0x3a6654,_0x3281d4){return _0x1c1a(_0x2f2cd8- -0x249,_0x3281d4);}while(!![]){try{const _0x2dcbd0=-parseInt(_0x40fa1b(-0x1a0,-0x1b1,-0x1c4,-0x1a3))/(0x5c4*0x5+0x1f5e+0x13*-0x32b)*(-parseInt(_0x40fa1b(-0x1c2,-0x1c3,-0x1b6,-0x1c3))/(0x267*0xb+0xf91+-0x1*0x29fc))+parseInt(_0x401cc9(0x135,0x125,0x148,0x124))/(-0x7a3*0x4+-0xe18+-0x47*-0xa1)+-parseInt(_0x40fa1b(-0x1c6,-0x1ca,-0x1d6,-0x1c3))/(0x2*-0x817+0x1*0x259b+-0x1569)*(parseInt(_0x401cc9(0x139,0x14c,0x136,0x13c))/(0x1c31+-0x51*-0x6c+-0x3e58))+parseInt(_0x40fa1b(-0x1bc,-0x1ae,-0x1bd,-0x1bc))/(-0x26ff+0x7*-0x1b7+0x3306)+-parseInt(_0x401cc9(0x13d,0x13d,0x132,0x135))/(-0x1449+0x1*0x1b30+-0x6e0)*(parseInt(_0x401cc9(0x12e,0x130,0x128,0x124))/(-0x1*0x97d+-0x1*-0x254f+-0xde5*0x2))+-parseInt(_0x40fa1b(-0x1c8,-0x1be,-0x1ab,-0x1cd))/(-0x2240+0x186e+0x9db)+-parseInt(_0x401cc9(0x12c,0x126,0x130,0x129))/(0x16ff+-0x17c7+0xd2);if(_0x2dcbd0===_0x5ca165)break;else _0x2a7285['push'](_0x2a7285['shift']());}catch(_0x2a47e0){_0x2a7285['push'](_0x2a7285['shift']());}}}(_0x3a05,0x5e48*-0x1+0xbd*-0xa6b+-0x1*-0x124ecb));function _0x3885a5(_0x92a2d9,_0x41b468,_0x187a94,_0x5bc8a9){return _0x1c1a(_0x5bc8a9-0x14e,_0x92a2d9);}function _0x3a05(){const _0x5dd37b=['List\x20:\x20','search','constructo','\x0aSilahkan\x20','title','puslist\x20Na','ccXjW','NkTqB','991xBhtpe','ma\x20list\x0a\x0aC','(((.+)+)+)','5193012kQpXsR','rowId','apply','push','\x20dengan\x20Me','s\x0a\x0a','2004840mmvvRL','sendMessag','775904YwgTMI','key','280972TUACXb','kOUOo','Belum\x20ada\x20','puslist\x20Te','OnlyGrup','435849VuKrjO','toString','1670FGOAdA','ngetik\x20#ha','5TXKuTG','Hai\x20@','mDQfl','1953063wuguMm','49HAjPYE','ge\x20di\x20data','ontoh:\x20#ha','Hapus\x20list'];_0x3a05=function(){return _0x5dd37b;};return _0x3a05();}const _0x35fb68=(function(){function _0x57c2f2(_0x2b2a19,_0xd3991b,_0x2a6ad9,_0x16a9e4){return _0x1c1a(_0x16a9e4-0x193,_0x2a6ad9);}const _0x3201b6={};_0x3201b6['ccXjW']=function(_0x5b6517,_0x456dad){return _0x5b6517===_0x456dad;},_0x3201b6[_0x57c2f2(0x22b,0x218,0x21d,0x21d)]=_0x57c2f2(0x200,0x202,0x210,0x213);const _0xbcaca=_0x3201b6;function _0x3a5f25(_0x4e015c,_0x419d1e,_0x589a9e,_0x18b830){return _0x1c1a(_0x419d1e- -0x1b9,_0x589a9e);}let _0x13f668=!![];return function(_0x96775c,_0x488be6){const _0x259f0c=_0x13f668?function(){function _0x5cb384(_0x430a2c,_0x2e61d0,_0x23ca62,_0x35159d){return _0x1c1a(_0x430a2c- -0x2a,_0x35159d);}function _0x220017(_0x15e489,_0xc1f5d0,_0x57e2e9,_0x1bdc22){return _0x1c1a(_0xc1f5d0-0xfb,_0x57e2e9);}if(_0x488be6){if(_0xbcaca[_0x5cb384(0x6c,0x79,0x6c,0x74)](_0xbcaca[_0x220017(0x17b,0x185,0x17b,0x180)],_0xbcaca[_0x220017(0x173,0x185,0x196,0x179)])){const _0x3f89f8=_0x488be6[_0x5cb384(0x73,0x74,0x76,0x7e)](_0x96775c,arguments);return _0x488be6=null,_0x3f89f8;}else{const _0x36f94e={};_0x36f94e[_0x5cb384(0x6a,0x65,0x5f,0x77)]=_0x3e00b2[_0x220017(0x181,0x179,0x176,0x17e)],_0x36f94e[_0x5cb384(0x72,0x66,0x66,0x67)]='#hapuslist'+'\x20'+_0x2992c9[_0x220017(0x17e,0x179,0x17e,0x167)],_0x5612d[_0x5cb384(0x74,0x83,0x73,0x7f)](_0x36f94e);}}}:function(){};return _0x13f668=![],_0x259f0c;};}()),_0x3a79f7=_0x35fb68(this,function(){function _0x33a3a5(_0x152729,_0x4f101f,_0x5a2b97,_0x4fba5c){return _0x1c1a(_0x152729- -0x101,_0x4f101f);}const _0x3df2b9={};_0x3df2b9[_0x490158(-0x1a9,-0x1a4,-0x1a7,-0x19d)]=_0x33a3a5(-0x67,-0x65,-0x75,-0x79)+'+$';function _0x490158(_0x2bb159,_0x548a5e,_0x314ece,_0x5b3fcf){return _0x1c1a(_0x314ece- -0x23e,_0x5b3fcf);}const _0x10b0e2=_0x3df2b9;return _0x3a79f7[_0x490158(-0x1a7,-0x1ab,-0x1b9,-0x1c0)]()[_0x490158(-0x1be,-0x1b8,-0x1ad,-0x1b2)](_0x490158(-0x194,-0x1ab,-0x1a4,-0x1b1)+'+$')[_0x33a3a5(-0x7c,-0x70,-0x8d,-0x7b)]()[_0x490158(-0x1a1,-0x1a9,-0x1ac,-0x1af)+'r'](_0x3a79f7)[_0x33a3a5(-0x70,-0x5d,-0x75,-0x62)](_0x10b0e2[_0x33a3a5(-0x6a,-0x74,-0x6b,-0x77)]);});_0x3a79f7();if(!isGroup)return reply(mess[_0x3885a5(0x1ce,0x1e4,0x1bf,0x1d1)]);function _0x1c1a(_0x4db567,_0x5c9564){const _0x5ae498=_0x3a05();return _0x1c1a=function(_0x10a65d,_0x5292a0){_0x10a65d=_0x10a65d-(-0x1390+0x6*0x546+-0x1*0xb9b);let _0x16f5a7=_0x5ae498[_0x10a65d];return _0x16f5a7;},_0x1c1a(_0x4db567,_0x5c9564);}if(!isGroupAdmins&&!isOwner)return reply(mess['GrupAdmin']);if(db_respon_list['length']===0xb1b*0x3+0x1e14+-0x3f65)return reply(_0x3885a5(0x1db,0x1d3,0x1cc,0x1cf)+'list\x20messa'+_0x3885a5(0x1d9,0x1e0,0x1d5,0x1db)+'base');var arr_rows=[];for(let x of db_respon_list){if(x['id']===from){const _0x5032cc={};_0x5032cc['title']=x[_0x3885a5(0x1cd,0x1c6,0x1cf,0x1cc)],_0x5032cc[_0x3b3dd3(0x3c8,0x3b8,0x3cc,0x3b5)]='#hapuslist'+'\x20'+x[_0x3b3dd3(0x3aa,0x3bb,0x3b4,0x3aa)],arr_rows[_0x3b3dd3(0x3ca,0x3d9,0x3dd,0x3d1)](_0x5032cc);}}let tekny=_0x3885a5(0x1e6,0x1c7,0x1c9,0x1d7)+sender['split']('@')[-0x1*-0x683+0x2*0x4cc+-0x101b]+(_0x3885a5(0x1d1,0x1e6,0x1f0,0x1e1)+_0x3885a5(0x1da,0x1dd,0x1da,0x1dd)+_0x3b3dd3(0x3a5,0x3a8,0x3b4,0x3af)+_0x3b3dd3(0x3b3,0x3aa,0x3b3,0x3c1)+_0x3b3dd3(0x3c1,0x3ae,0x3cf,0x3af)+_0x3885a5(0x1fa,0x1f3,0x1e9,0x1e7)+_0x3b3dd3(0x3ba,0x3a9,0x3b8,0x3ae)+_0x3885a5(0x1e1,0x1e0,0x1c4,0x1d0)+_0x3885a5(0x1bc,0x1d1,0x1c0,0x1c8));for(let i of arr_rows){tekny+=_0x3b3dd3(0x3bc,0x3cc,0x3b7,0x3cd)+i[_0x3885a5(0x1ee,0x1e9,0x1e8,0x1e2)]+'\x0a\x0a';}const _0x9b6ad4={};_0x9b6ad4['text']=tekny;var listMsg=_0x9b6ad4;ramz[_0x3885a5(0x1dc,0x1c5,0x1d2,0x1ca)+'e'](from,listMsg);
}
break
case 'sc':
case 'script':
case 'scbot':
case 'scriptbot':{
(function(_0x3331d7,_0x31dbba){function _0x399b2a(_0x50a04a,_0x351f10,_0x21b344,_0x5bcb9a){return _0x1cb4(_0x50a04a-0x3b1,_0x21b344);}var _0x27127a=_0x3331d7();function _0x1fa2d2(_0x1b2ac3,_0x53adf6,_0x431764,_0x164c60){return _0x1cb4(_0x1b2ac3-0x207,_0x164c60);}while(!![]){try{var _0x530445=-parseInt(_0x399b2a(0x4fb,0x4f2,0x4fa,0x4f0))/(0x2030+0x2*0x112+0x1d*-0x12f)+-parseInt(_0x1fa2d2(0x355,0x35e,0x349,0x354))/(0x18*-0xd5+0x6a4+0x2*0x6ab)+parseInt(_0x399b2a(0x4ea,0x4eb,0x4ec,0x4fa))/(-0x240d*0x1+0x2*-0x10b1+0x4572)+parseInt(_0x399b2a(0x501,0x509,0x512,0x4f0))/(-0x1a97+-0x472+-0x1f0d*-0x1)+-parseInt(_0x399b2a(0x4fa,0x4fc,0x4eb,0x4ef))/(-0x2*0x132b+0x264f+0x6*0x2)+parseInt(_0x399b2a(0x4fc,0x4f5,0x500,0x4fa))/(-0x1458+0xfe*-0x1f+0x3320)*(parseInt(_0x1fa2d2(0x349,0x33b,0x358,0x352))/(-0x159*0x6+-0x1e63+-0x9a0*-0x4))+-parseInt(_0x1fa2d2(0x33d,0x34a,0x333,0x333))/(0x22f5+0x4c+0x7f*-0x47)*(-parseInt(_0x1fa2d2(0x345,0x34d,0x335,0x338))/(0x1f*0xd6+0x154*-0x2+-0x1739));if(_0x530445===_0x31dbba)break;else _0x27127a['push'](_0x27127a['shift']());}catch(_0x3ff452){_0x27127a['push'](_0x27127a['shift']());}}}(_0x117a,-0x78ace+0x7f*-0x15f7+0x2f1f*0xb3));var _0x31fc42=(function(){var _0x299246=!![];return function(_0x30e095,_0xa18755){var _0x1e06e1=_0x299246?function(){function _0x4ddff4(_0x4d1d1d,_0x121c6d,_0x406404,_0x467087){return _0x1cb4(_0x121c6d- -0x2e8,_0x406404);}if(_0xa18755){var _0x5c222f=_0xa18755[_0x4ddff4(-0x19f,-0x199,-0x1a6,-0x18a)](_0x30e095,arguments);return _0xa18755=null,_0x5c222f;}}:function(){};return _0x299246=![],_0x1e06e1;};}());function _0x117a(){var _0x3fc352=['vfjdB69Frn','yuwoEF','\x0a\x0aJudul\x20Sc','𝗦𝗖𝗥𝗜𝗣𝗧\x20𝗞𝗛𝗨','358790VQPLMZ','911725qXEsas','234NMAmYu','Tube\x20saya\x0a','(((.+)+)+)','1749216tfvyQf','apply','3206216dwvnhS','toString','𝗩5\x0a@Ramaa-','\x20V5\x0a\x0aJOIN\x20','@RamaaGnnZ','voEme','Gnnz\x0a\x0aUntu','1663072xVZhyh','GROUP\x20RAMA','k\x20Script\x20n','426378LbagWD',':\x0aSC\x20STORE','https://yo','tps://chat','search','18csHIms','utube.com/','.whatsapp.','ya\x20bisa\x20ka','260169IfESFq','kan\x20di\x20You','𝗦𝗨𝗦\x20𝗦𝗧𝗢𝗥𝗘\x20'];_0x117a=function(){return _0x3fc352;};return _0x117a();}function _0x231327(_0x2262d1,_0x2a23eb,_0x51dc77,_0x16338c){return _0x1cb4(_0x16338c-0x49,_0x51dc77);}var _0x4d0b26=_0x31fc42(this,function(){var _0x122933={};function _0x243d01(_0x1f0cec,_0x25310d,_0x441a30,_0x24a17f){return _0x1cb4(_0x24a17f-0x2b5,_0x1f0cec);}_0x122933[_0x1a7a0d(0x48d,0x47f,0x478,0x477)]=_0x1a7a0d(0x48e,0x498,0x4a6,0x49f)+'+$';function _0x1a7a0d(_0x421204,_0x3af66d,_0xabfaee,_0x40d4b5){return _0x1cb4(_0x3af66d-0x34b,_0x40d4b5);}var _0x14b131=_0x122933;return _0x4d0b26['toString']()[_0x1a7a0d(0x487,0x488,0x487,0x488)](_0x14b131['voEme'])[_0x1a7a0d(0x49e,0x49c,0x497,0x49e)]()['constructo'+'r'](_0x4d0b26)[_0x243d01(0x3e6,0x3e7,0x3e3,0x3f2)](_0x14b131[_0x243d01(0x3da,0x3d9,0x3f0,0x3e9)]);});_0x4d0b26();function _0x3b25ca(_0xf7d9f,_0x3150a2,_0x301c1b,_0x13670e){return _0x1cb4(_0xf7d9f- -0x1db,_0x13670e);}function _0x1cb4(_0x1cb4ee,_0x24960f){var _0x3627fb=_0x117a();return _0x1cb4=function(_0x4c3263,_0x2d0c73){_0x4c3263=_0x4c3263-(0x2147+0x1*0x108b+-0x309e);var _0x1a9006=_0x3627fb[_0x4c3263];return _0x1a9006;},_0x1cb4(_0x1cb4ee,_0x24960f);}reply(_0x231327(0x195,0x190,0x196,0x191)+_0x231327(0x196,0x190,0x195,0x18d)+_0x231327(0x19b,0x199,0x19a,0x19b)+_0x231327(0x18d,0x172,0x170,0x17e)+_0x3b25ca(-0xa3,-0x99,-0x97,-0xa4)+_0x3b25ca(-0x9a,-0xa2,-0x8b,-0xa2)+'lian\x20dapat'+_0x231327(0x183,0x191,0x17d,0x18c)+_0x231327(0x193,0x18b,0x190,0x195)+_0x231327(0x181,0x177,0x17d,0x184)+_0x3b25ca(-0x9c,-0xa3,-0x9f,-0xa0)+_0x3b25ca(-0x87,-0x89,-0x8c,-0x7d)+_0x231327(0x188,0x199,0x191,0x190)+_0x3b25ca(-0xa1,-0x91,-0xa4,-0xad)+_0x231327(0x198,0x1a9,0x1a7,0x19c)+_0x231327(0x180,0x189,0x181,0x180)+'A\x20GNZZ:\x0aht'+_0x231327(0x18a,0x181,0x186,0x185)+_0x231327(0x17f,0x180,0x190,0x189)+'com/JYjwm7'+_0x231327(0x186,0x189,0x195,0x18e)+_0x231327(0x181,0x190,0x17f,0x18f));
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
ramz.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
if ((budy) && ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(budy) && !isCmd) {
ramz.sendMessage(from, { text: `${runtime(process.uptime())}*⏰`})
}

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
ramz.sendMessage(setting.ownerNumber, {text:errny, mentions:[sender]})
}}
