// "use strict" ? difficult mode

// semua functions sudah di buat sesimpel mungkin jika menemukan bug/typo dalam penulisan bisa beritahu saya di issue

// connecting WhatsApp web menggunakan Baileys https://www.github.com/adiwajshing/baileys
const {
    MessageType,
    Mimetype,
    GroupSettingChange,
    mentionedJid
} = require("@adiwajshing/baileys");

// functions node modules
const speed = require('performance-now');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require("child_process");
let path = require('path');
const translate = require('@iamtraction/google-translate');
const ffmpeg = require("fluent-ffmpeg");
const toMs = require('ms');
const fs = require("fs");
const threshold = 0.72;
const requests = require('node-fetch');
const lxa = require('./result/index');
const package = require('./package.json');
const FormData = require('form-data');
const axios = require("axios");
// functions dalam library
const simple = require('./whatsapp/connecting');
const { fetchJson, fakeText, getBuffer } = require('./library/fetcher');
const { color, bgcolor } = require('./library/color');
const {
    createExif,
    modStick,
    h2k,
    isUrl,
    isLinkyt,
    pickRandom,
    generateMessageID,
    getGroupAdmins,
    getRandom,
    kyun,
    week,
    date,
    waktu,
    tanggal,
    time,
    WIB,
    WITA,
    WIT,
    formatDate
} = require('./library/functions');

// functions

const {
    direc,
    addImage,
    addVideo,
    addStiker,
    addAudio,
    addReport
} = require('./functions/directory');


const {
    User,
    cekRegis,
    addRegister,
    addUser,
    cekUser,
    cekPoin,
    addPoin,
    delPoin,
    addLevel,
    cekLevel,
    cekBanned,
    addBanned,
    delBanned,
    cekPremium,
    addPremium,
    delPremium,
    addChatbot,
    delChatbot,
    cekChatbot,
    addAfk,
    delAfk,
    cekAfk,
    cekAfkReason,
    cekAfkTime,
    addWarn,
    delWarn,
    cekWarn,
    addBahasa,
    cekBahasa
} = require('./functions/user'); // mengubah dan mengambil data user dalam ./database/user

const {
    Group,
    addGroup,
    addOffline,
    delOffline,
    cekOffline,
    addWelcome,
    delWelcome,
    cekWelcome,
    addAntilink,
    delAntilink,
    cekAntilink,
    addBadword,
    delBadword,
    cekBadword,
    addAntidelete,
    delAntidelete,
    cekAntidelete,
    addDetect,
    delDetect,
    cekDetect,
    addViewonce,
    delViewonce,
    cekViewonce
} = require('./functions/group'); // mengubah dan mengambil data dalam ./database/group

const {
    st,
    addName,
    addAuthor,
    addPackname,
    addWm,
    addCmd
} = require('./functions/setting-bot'); // mengubah data dalam ./database/setting-bot

const {
    Wel,
    addCustomWelcome,
    getCustomWelcome,
    setCustomWelcome,
    delCustomWelcome,
    getCustomBye,
    setCustomBye,
    delCustomBye
} = require('./functions/welcome');

const { msgFilter } = require('./functions/antispam')
const { menu } = require('./functions/menu'); // tampilan menu dalam functions/menu
const { menuOA } = require('./functions/menuOA'); // tampilan menu dalam functions/menu
const { ind, eng } = require('./language/index');

// functions dalam ./functions/setting-bot
let ownerNumber = st.ownerNumber;
let isPoinawal = st.poinAwal;
let isNama = st.nama;
let isAuthor = st.author;
let isPackname = st.packname;
let isWm = st.wm;
let isTotalcmd = st.totalcommand;
// -- thumbnail
let thumb = fs.readFileSync('./temp/thumb.jpeg'); // !! jangan ganti, mau ganti ada casenya

let fakethumb = fs.readFileSync('./temp/thumbnail.jpeg'); // !! jangan ganti, mau ganti ada casenya

let baterai = {
    baterai: 0,
    cas: false
};

let Use = {
    prefix: '!',
    multi: true,
    nopref: false,
    onepref: false
};

module.exports = client = async(client, mek) => {
        try {
            if (!mek.hasNewMessage) return;
            mek = mek.messages.all()[0];
            if (!mek.message) return;
            if (mek.key.fromMe) return; // hapus untuk pengguna self bot namun akan error pada fitur game
            if (mek.key && mek.key.remoteJid == 'status@broadcast') return;
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            let m = simple.smsg(client, mek);
            global.prefix;
            global.blocked;
            const content = JSON.stringify(mek.message);
            const from = mek.key.remoteJid;
            const type = Object.keys(mek.message)[0];
            const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType;
            const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = client.user.phone;
            //--
            const cmd =
                type === 'conversation' && mek.message.conversation ? mek.message.conversation :
                type === 'imageMessage' && mek.message.imageMessage.caption ? mek.message.imageMessage.caption :
                type === 'videoMessage' && mek.message.videoMessage.caption ? mek.message.videoMessage.caption :
                type === 'extendedTextMessage' && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text :
                type === 'buttonsResponseMessage' && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''.slice(1).trim().split(/ +/).shift().toLowerCase();

            if (Use.multi) {
                var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓=|~xzZ+×_*!#,|÷?;:%^&./\\©^]/gi) : '-';
            } else if (Use.nopref) {
                prefix = '';
            } else if (Use.onepref) {
                prefix = Use.prefix;
            }

            const body =
                type === 'conversation' && mek.message.conversation.startsWith(prefix) ? mek.message.conversation :
                type === 'imageMessage' && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption :
                type === 'videoMessage' && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption :
                type === 'extendedTextMessage' && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text :
                type === 'buttonsResponseMessage' && mek.message[type].selectedButtonId.startsWith(prefix) ? mek.message[type].selectedButtonId : '';

            const budy =
                type === 'conversation' ? mek.message.conversation :
                type === 'extendedTextMessage' ? mek.message.extendedTextMessage.text :
                type === 'imageMessage' ? mek.message.imageMessage.caption :
                type === 'videoMessage' ? mek.message.videoMessage.caption :
                type === 'stickerMessage' ? 'Sticker' :
                type === 'audioMessage' ? 'Audio' : '';
            const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
            const args = body.trim().split(/ +/).slice(1);
            const more = String.fromCharCode(8206);
            const readMore = more.repeat(4000);
            const value = args.join(' ');
            const isCmd = body.startsWith(prefix);
            const totalchat = await client.chats.all();
            const botNumber = client.user.jid;

            //-- Group Metadata
            const isGroup = from.endsWith('@g.us');
            const sender = isGroup ? mek.participant : mek.key.remoteJid;
            const groupMetadata = isGroup ? await client.groupMetadata(from) : '';
            const groupName = isGroup ? groupMetadata.subject : '';
            const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupId = isGroup ? groupMetadata.jid : '';
            const groupMembers = isGroup ? groupMetadata.participants : '';
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
            const isOwner = ownerNumber.includes(sender) || false;
            const isBotAdmins = groupAdmins.includes(botNumber) || false;
            const isAdmins = groupAdmins.includes(sender) || false;
            let siapa = mek.quoted ? mek.quoted.sender : mek.mentionedJid && mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.fromMe ? client.user.jid : mek.sender;
            let dia = mek.quoted ? mek.quoted.sender : mek.mentionedJid && mek.mentionedJid[0] ? mek.mentionedJid[0] : false;
            const pushname = client.getName(siapa);
            const about = (await client.getStatus(sender).catch(console.error) || {}).status || ''


            // cek Informasi user
            let isPoin = cekPoin(sender);
            let isLevel = cekLevel(sender);
            let isPremium = cekPremium(sender);
            let isChatbot = cekChatbot(sender);
            let isBanned = cekBanned(sender);
            let isAfk = cekAfk(sender);
            let isAfkTime = cekAfkTime(sender);
            let isAfkReason = cekAfkReason(sender);
            let isOffline = cekOffline(from);
            let isWelcome = cekWelcome(from);
            let isAntidelete = cekAntidelete(from);
            let isAntilink = cekAntilink(from);
            let isDetect = cekDetect(from);
            let isRegister = cekRegis(sender);
            let isViewonce = cekViewonce(from);
            let msg = cekBahasa(sender);

            // -- bahasa
            if (msg === "indonesia") {
                msg = ind;
            } else if (msg === "english") {
                msg = eng;
            } else {
                msg = ind;
            }

            /** Ucapan waktu menurut Timezone 
             * Saying time according to Timezone
             */
            if (time < "24:59:00") {
                ucapanWaktu = msg.night;
            }
            if (time < "18:00:00") {
                ucapanWaktu = msg.evening;
            }
            if (time < "15:00:00") {
                ucapanWaktu = msg.day;
            }
            if (time < "11:00:00") {
                ucapanWaktu = msg.morning;
            }
            if (time < "05:00:00") {
                ucapanWaktu = msg.night;
            }

            if (Use.multi) {
                modepref = 'Multi Prefix'
            } else if (Use.nopref) {
                modepref = 'No Prefix'
            } else if (Use.onepref) {
                modepref = 'Prefix ' + Use.prefix
            }

            // functions penyebutan user premium
            if (isPremium) {
                prem = "Yes";
            } else {
                prem = "No";
            }

            // -- baterai
            client.on('CB:action,,battery', json => {
                const a = json[2][0][1].value;
                const b = json[2][0][1].live;
                baterai.baterai = a;
                baterai.cas = b;
            });

            // detected quoted 
            const isMedia = type === "imageMessage" || type === "videoMessage";
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
            const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
            const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
            const isQuotedextendedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage');


            // console log command ketika dalam private chat
            if (!isGroup && isCmd) {
                console.log("‣", bgcolor('Command On PRIVATE CHAT', 'magenta'));
                console.log(" From :", color(pushname, "yellow"), "Tanggal :", bgcolor(tanggal, 'grey'));
                console.log(" Command :", color(command.toUpperCase(), "orange"), "MessageType :", bgcolor(type, "orange"));
            }

            // console log command ketika dalam group
            if (isGroup && isCmd) {
                console.log("‣", bgcolor('Command On', 'magenta'), "GROUP", color(groupName, "orange"));
                console.log(" From :", color(pushname, "yellow"), "Tanggal :", bgcolor(tanggal, 'grey'));
                console.log(" Command :", color(command.toUpperCase(), "orange"), "MessageType :", bgcolor(type, "orange"));
            }

            // console log pesan tanpa command
            if (!isCmd && !mek.key.fromMe && !mek.isBaileys) {
                console.log("‣", bgcolor('Message', 'magenta'));
                console.log(" From :", color(pushname, "yellow"), "Tanggal :", bgcolor(tanggal, 'grey'));
                console.log(" Message :", color(budy, "orange"), "MessageType :", bgcolor(type, "orange"));
            }

            /**
            // Anti spam yang ikut ikutan nyepam :v
                if (isCmd && msgFilter.isFiltered(from)) {
                     return m.reply('jangan spam')
                                }
                if (isCmd && !isOwner) msgFilter.addFilter(from)
            */

            let infoMSG = JSON.parse(fs.readFileSync('./database/msg.data.json'))
            infoMSG.push(JSON.parse(JSON.stringify(mek)))
            fs.writeFileSync('./database/msg.data.json', JSON.stringify(infoMSG, null, 2))
            const urutan_pesan = infoMSG.length
            if (urutan_pesan === 5000) {
                infoMSG.splice(0, 4300)
                fs.writeFileSync('./database/msg.data.json', JSON.stringify(infoMSG, null, 2))
            }


            // auto respon
            lexa = ['@' + client.user.jid.split('@')[0]]
            for (var L of lexa) {
                if (!mek.isBaileys && budy.match(L)) {
                    lari = fs.readFileSync('./database/media/sticker/lari.webp')
                        //return client.sendMessage(from, lari, sticker, {quoted: mek})
                    capt = 'Hai @' + sender.split('@')[0] + ' Saya disini'
                    return client.send2ButtonLoc(from, thumb, capt, 'Klik button untuk menampilkan menu dan informasi', 'Menu', prefix + 'menu', 'Informasi', prefix + 'informasi', false, {
                        contextInfo: {
                            mentionedJid: client.parseMention(capt),
                        },
                    });
                }
            }

            if (budy) addUser(sender); // menambah informasi user kedalam database
            if (isGroup && budy) addGroup(from); // menambah informasi group kedalam database
            if (isCmd) addCmd() // menambah jumlah total command ketika user menggunakan command
            if (isCmd) addPoin(sender); // menambah poin user ketika menggunakan command
            if (isGroup && budy) addCustomWelcome(from) // push costume welcome
            if (isGroup && budy && isAfk) { //cek Players afk
                await delAfk(sender)
                return m.reply(msg.offAfk)
            }


            // menambahkan poin ke level dan di akumulasikan untuk menaikkan level
            const Amount = isPoinawal * (Math.pow(2, isLevel) - 1)
            if (Amount <= isPoin) {
                await addLevel(sender) // akumulasi poin untuk menaikkan level
            }

            // khusus command ketika status offline dalam group menyala
            switch (command) {

                case 'offline': // ketik offline menyala bot tidak akan membalas perintah apapun dalam group tertentu
                    if (!isGroup) return m.reply(msg.group)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (isOffline === true) {
                        return m.reply('Bot offline')
                    }
                    await addOffline(from)
                    m.reply(msg.offline)
                    break

                case 'online':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (isOffline === false) {
                        return m.reply('Bot online')
                    }
                    await delOffline(from)
                    m.reply(msg.online)
                    break
                default:
            }


            if (isGroup && isOffline === true) return; // ketik offline menyala bot tidak akan membalas perintah apapun dalam group tertentu
            if (isBanned) return; // user dengan status banned tidak akan bisa menggunakan command

            switch (command) {

                case 'restart': // restart bot !!
                    if (!isOwner) return m.reply(msg.owner)
                    m.reply('Restart bot, proses membutuhkan waktu kurang dari 1 menit, silahkan tunggu')
                    try {
                        process.send('reset')
                    } catch (e) {
                        m.reply('hmmmm')
                    }
                    break

                case 'ping':
                    const timestamp = speed();
                    const latensi = speed() - timestamp
                    m.reply(`Speed : ${latensi.toFixed(3)} Second`)
                    break
                    //-- Rapiin dikit:v -hns
                case 'menu':
                case 'help':
                    m.reply(msg.wait)

                    capt = `Hi ${pushname} ${ucapanWaktu}
    
*Level akun* : ${isLevel}
*Total Poin* : ${isPoin}
*Premium* : ${prem}
*Tanggal* : ${tanggal}
*Mode* : ${modepref}
*Runtime* : ${kyun(process.uptime())}
`
                    capt += readMore
                    if (!isAdmins && !isOwner) {
                        capt += menu(prefix)
                    } else {
                        capt += menu(prefix)
                        capt += menuOA(prefix)
                    }
                    client.send2ButtonLoc(from, thumb, capt, 'Total hit : ' + isTotalcmd + '\nTotal User : ' + User.length + '\n' + isWm, 'INFORMASI', prefix + 'informasi', 'OWNER', prefix + 'owner')
                    break

                case 'bahasa':
                    if (!value) return m.reply(msg.Pbahasa)
                    if (value.toLowerCase() === "indonesia") {
                        await addBahasa(sender, "indonesia")
                        m.reply("Bahasa Indonesia terpilih\nSekarang bot akan membalas pesanmu dengan bahasa Indonesia")
                    } else if (value.toLowerCase() === "english") {
                        await addBahasa(sender, "english")
                        m.reply("Selected English\nNow the bot will reply to your message in English")
                    } else {
                        m.reply(msg.nobahasa)
                    }
                    break;

                case 'owner':
                case 'author':
                    number = '6281234603337@s.whatsapp.net'
                    capt = `Nomor : @${number.split('@')[0]}\n`
                    capt += 'Instagram : https://www.instagram.com/anzhen35'
                    await client.fakeLink(from, capt, thumb, 'Click in here', 'https://www.instagram.com/anzhen35', mek)
                        /* client.sendContact(from, '6281234603337', 'owner', {
key: {
  fromMe: false,
  participant: `0@s.whatsapp.net`, ...(from ? 
{ remoteJid: from } : {}) 
        },
message: { 
"extendedTextMessage": {
         "text":"Nih owner ku"
                }
              }})*/
                    break

                case 'info':
                case 'informasi':
                    const unread = await client.loadAllUnreadMessages();
                    i = []
                    giid = []
                    for (mem of totalchat) {
                        i.push(mem.jid)
                    }
                    for (id of i) {
                        if (id && id.includes('g.us')) {
                            giid.push(id)
                        }
                    }
                    uptime = process.uptime()
                    teks = `*INFORMASI*
- Nama : ${client.user.name}
- Versi Bot : ${package.version}
- Author: ${package.author}
- Speed : ${process.uptime()}
- Runtime : ${kyun(uptime)}

*WHATSAPP*
- Kontak : ${Object.keys(client.contacts).length}
- Total pesan : ${totalchat.length}
- Personal Chat : ${totalchat.length - giid.length}
- Total group : ${giid.length}
- Pesan belum dibaca : ${unread.length}
- Versi Wa : ${client.user.phone.wa_version}

*DEVICE*
- Baterai : ${baterai.baterai}%
- Charge : ${baterai.cas === 'true' ? 'Charging' : 'Not charging'}
- Device : ${device_manufacturer}
- Versi OS : ${os_version}
- Versi Device : ${device_model}
- RAM : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
- Browser : *${client.browserDescription[1]}*
- Versi Browser : *${client.browserDescription[2]}*

*OWNER*
- Instagram : https://www.instagram.com/anzhen35
- WhatsApp : wa.me/6281234603337

*SCRIPT*
- Git : ${package.homepage}
- License : ${package.license}`
                    client.fakeLink(from, teks, thumb, tanggal, 'https://www.instagram.com/anzhen35', mek)
                    break

                case 'say':
                    if (!value) return m.reply(msg.notext)
                    client.sendMessage(from, value, text)
                    break

                case 'afk':
                    if (!isGroup) return m.reply(msg.group)
                    tgl = week + ", " + time
                    reason = value ? msg.with + value : ''
                    if (args.length > 10) return m.reply('No')
                    await addAfk(sender, tgl, reason)
                    m.reply(msg.onAfk(reason))
                    break

                case 'upsw':
                    if (!isOwner) return m.reply(msg.owner)
                    const colors = [
                        0xff26c4dc, 0xff792138,
                        0xff8b6990, 0xfff0b330,
                        0xffae8774, 0xff5696ff,
                        0xffff7b6b, 0xff57c9ff,
                        0xff243640, 0xffb6b327,
                        0xffc69fcc, 0xff54c265,
                        0xff6e257e, 0xffc1a03f,
                        0xff90a841, 0xff7acba5,
                        0xff8294ca, 0xffa62c71,
                        0xffff8a8c, 0xff7e90a3,
                        0xff74676a
                    ]
                    let _m = Promise.resolve({ key: { id: '' } })
                    if (!m.quoted && !value) m.reply('reply pesan atau sebagai argumen')
                    if (m.quoted && m.quoted.mtype !== 'conversation' && !value) _m = m.quoted.forward('status@broadcast')
                    if (m.quoted && m.quoted.mtype === 'conversation' && !value) _m = client.sendMessage('status@broadcast', {
                        text: m.quoted.text,
                        textArgb: 0xffffffff,
                        backgroundArgb: pickRandom(colors)
                    }, 'extendedTextMessage')
                    if (!m.quoted && value) _m = client.sendMessage('status@broadcast', {
                        value,
                        textArgb: 0xffffffff,
                        backgroundArgb: pickRandom(colors)
                    }, 'extendedTextMessage')
                    if (m.quoted && value) _m = client.forwardMessage('status@broadcast', await m.quoted.cMod('status@broadcast', value))
                    m.reply((await _m).key.id)
                    break

                case 'del':
                case 'delete':
                case 'd':
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    try {
                        pesan = {
                            id: mek.message.extendedTextMessage.contextInfo.stanzaId,
                            remoteJid: from,
                            fromMe: true
                        }
                        client.deleteMessage(from, pesan)
                    } catch (e) {
                        m.reply('Reply bot message')
                    }
                    break

                case 'report':
                case 'bug':
                    if (!value) return m.reply(msg.notext)
                    await addReport(sender, value)
                    capt = 'Report from @' + sender.split('@')[0]
                    capt += '\n' + value
                    m.reply(msg.done + '\n' + capt)
                    break

                case 'listreport':
                    if (!isOwner) return m.reply(msg.owner)
                    report = '*LIST REPORT*'
                    for (var R of direc.report) {
                        report += `\n\nId : @` + R.id.split('@')[0]
                        report += `\nReport : ` + R.report
                    }
                    m.reply(report)
                    break

                case 'listmedia':
                    listimg = direc.image
                    listvid = direc.video
                    listaud = direc.audio
                    liststik = direc.sticker
                    teks = msg.liston + '\n'
                    teks += '╭─⊷❲ *IMAGE* ❳\n'
                    for (v of listimg) {
                        teks += `├  ${v}\n`
                    }
                    teks += '╰────────\n'
                    teks += '╭─⊷❲ *VIDEO* ❳\n'
                    for (x of listvid) {
                        teks += `├  ${x}\n`
                    }
                    teks += '╰────────\n'
                    teks += '╭─⊷❲ *AUDIO* ❳\n'
                    for (y of listaud) {
                        teks += `├  ${y}\n`
                    }
                    teks += '╰────────\n'
                    teks += '╭─⊷❲ *STICKER* ❳\n'
                    for (z of liststik) {
                        teks += `├  ${z}\n`
                    }
                    teks += '╰────────\n'
                    teks += msg.getlist
                    m.reply(teks.trim())
                    break

                case 'addimg':
                    if (!value) return m.reply(msg.notext)
                    if (isMedia || isQuotedImage) {
                        for (i of direc.image) {
                            if (i === value.toLowerCase()) return m.reply(msg.packon)
                        }
                        q = m.quoted ? m.quoted : m
                        let img = await q.download()
                        fs.writeFileSync(`./database/media/image/${value.toLowerCase()}.jpeg`, img)
                        m.reply(msg.done)
                        await addImage(value.toLowerCase())
                    } else {
                        m.reply(msg.replyImg)
                    }
                    break

                case 'getimg':
                    try {
                        mage = fs.readFileSync(`./database/media/image/${value.toLowerCase()}.jpeg`)
                        client.sendMessage(from, mage, image, { quoted: mek, caption: 'Result : database image', thumbnail: fakethumb })
                    } catch {
                        m.reply(msg.packoff)
                    }
                    break

                case 'addvid':
                    if (!value) return m.reply(msg.notext)
                    if (isMedia || isQuotedVideo) {
                        for (i of direc.video) {
                            if (i === value.toLowerCase()) return m.reply(msg.packon)
                        }
                        q = m.quoted ? m.quoted : m
                        vid = await q.download()
                        fs.writeFileSync(`./database/media/video/${value.toLowerCase()}.mp4`, vid)
                        m.reply(msg.done)
                        await addVideo(value.toLowerCase())
                    } else {
                        m.reply(msg.replyVid)
                    }
                    break

                case 'getvid':
                    try {
                        vid = fs.readFileSync(`./database/media/video/${value.toLowerCase()}.mp4`)
                        client.sendMessage(from, vid, video, { quoted: mek, caption: 'Result : database video' })
                    } catch {
                        m.reply(msg.packoff)
                    }
                    break

                case 'addstik':
                    if (!isQuotedSticker) return m.reply(msg.replyStic)
                    if (!value) return m.reply(msg.notext)
                    for (i of direc.sticker) {
                        if (i === value.toLowerCase()) return m.reply(msg.packon)
                    }
                    q = m.quoted ? m.quoted : m
                    let stic = await q.download()
                    fs.writeFileSync(`./database/media/sticker/${value.toLowerCase()}.webp`, stic)
                    m.reply(msg.done)
                    await addStiker(value.toLowerCase())
                    break

                case 'getstik':
                    try {
                        tik = fs.readFileSync(`./database/media/sticker/${value.toLowerCase()}.webp`)
                        client.sendMessage(from, tik, sticker, { quoted: mek })
                    } catch {
                        m.reply(msg.packoff)
                    }
                    break

                case 'setfakethumb':
                    if (!isOwner) return m.reply(msg.owner)
                    if (isMedia || isQuotedImage) {
                        q = m.quoted ? m.quoted : m
                        thumb = await q.download()
                        fs.writeFileSync(`./temp/thumbnail.jpeg`, thumb)
                        m.reply(msg.done)
                    } else {
                        m.reply(msg.replyImg)
                    }
                    break

                case 'setthumb':
                case 'setthumb':
                    if (!isOwner) return m.reply(msg.owner)
                    if (isMedia || isQuotedImage) {
                        q = m.quoted ? m.quoted : m
                        thumb = await q.download()
                        fs.writeFileSync(`./temp/thumb.jpeg`, thumb)
                        m.reply(msg.done)
                    } else {
                        m.reply(msg.replyImg)
                    }
                    break

                case 'fakethumb':
                    if (isMedia || isQuotedImage) {
                        q = m.quoted ? m.quoted : m
                        hasil = await q.download()
                        client.sendMessage(from, hasil, image, { quoted: mek, caption: msg.done, thumbnail: fakethumb })
                    } else {
                        m.reply(msg.replyImg)
                    }
                    break

                case 'tr':
                case 'translate':
                    if (!value) return m.reply(msg.notext)
                    to = args[0]
                    bahasa = {
                        id: 'indonesia',
                        en: 'english',
                    }
                    var lang = to || 'id'
                    if (!bahasa[lang]) return m.reply('Language not supported : ' + lang);
                    if (!m.quoted) {
                        word = value.split(lang)[1]
                    } else if (m.quoted) {
                        word = m.quoted.text
                    }
                    await translate(word, { to: lang }).then(res => {
                        capt = 'Translate ' + bahasa[to].toUpperCase()
                        capt += '\nResult : ' + res.text
                        return m.reply(capt)
                    }).catch(err => {
                        return m.reply('Error')
                    })
                    break

                case 'covid':
                    covid = await lxa.covid()
                    capt = '*INFORMASI COVID INDONESIA*\n'
                    capt += 'Positif : ' + covid.indo.indoP
                    capt += '\nMeninggal : ' + covid.indo.indoM
                    capt += '\nSembuh : ' + covid.indo.indoS
                    capt += '\nLast Update : ' + covid.indo.indoU
                    capt += '\n\n*INFORMASI COVID GLOBAL*'
                    capt += '\nJumlah : ' + covid.global.negara + ' Negara'
                    capt += '\nPositif : ' + covid.global.positif
                    capt += '\nMeninggal : ' + covid.global.meninggal
                    capt += '\nLast Update : ' + covid.global.update
                    m.reply(capt)
                    break

                case 'hidetag':
                case 'notif':
                    if (!isOwner && !isAdmins) return m.reply(msg.admin)
                    if (!isGroup) return m.reply(msg.group);
                    if (!m.quoted) {
                        tag = value
                    } else if (m.quoted) {
                        tag = m.quoted.text
                    } else {
                        tag = ''
                    }
                    group = await client.groupMetadata(from);
                    mention = groupMembers.map(u => u.jid)
                    var optionshidetag = {
                        text: tag,
                        contextInfo: { mentionedJid: mention },
                        quoted: mek,
                    };
                    client.sendMessage(from, optionshidetag, text);
                    break;

                case 'tagall':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    mention = groupMembers.map(u => u.jid)
                    m.reply('Tag all Member\n' + mention.map((v, i) => i + 1 + '. @' + v.replace(/@.+/, '')).join `\n`, null, {
                        contextInfo: { mentionedJid: mention }
                    })
                    break

                case 'join':
                    if (!isOwner) return
                    if (!value) return
                    join = value.split('https://chat.whatsapp.com/')[1]
                    await client.acceptInvite(join).then((res) => {
                        client.sendMessage(res.gid, `Hai 👋🏻\n@${sender.split("@")[0]} Mengundang ku untuk masuk ke dalam Group`, text, { contextInfo: { mentionedJid: [sender] } })
                        m.reply(`Succses Join Group!`)
                    }).catch((err) => m.reply("‣ " + jsonformat(err)))
                    break

                case 'link':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    code = await client.groupInviteCode(from)
                    link = 'https://chat.whatsapp.com/' + code
                    m.reply(link)
                    break

                case 'profile':
                    //if(!siapa) return m.reply(msg.notag)
                    if (!isGroup) return m.reply(msg.group)
                    try {
                        ppimg = await client.getProfilePicture(siapa);
                    } catch {
                        ppimg = 'https://telegra.ph/file/7c0b1068736040b515d81.jpg';
                    }
                    Prema = cekPremium(siapa) ? 'Yes' : 'No'
                    capt = '*PROFILE*\n\n'
                    capt += '*Nomor* : ' + siapa.split('@')[0]
                    capt += '\n*Nama* : ' + pushname
                    capt += '\n*Bio* : ' + about
                    capt += '\n*Premium* : ' + Prema
                    capt += '\n*Bahasa* : ' + cekBahasa(siapa)
                    capt += '\n*Level* : ' + cekLevel(siapa)
                    capt += '\n*Poin* : ' + cekPoin(siapa)
                    capt += '\n*Warning* : ' + cekWarn(siapa)
                    client.adReply(from, capt, text, 'Profile from database', tanggal, thumb, '', mek)
                    break

                case 'grouplist':
                    if (!isOwner) return m.reply(msg.owner)
                    capt = totalchat.filter(z => z.jid.endsWith('g.us')).map((z, i) => `*${i + 1}.* ${client.getName(z.jid)}\nId : ${z.jid}\nStatus : ${z.read_only ? 'Left' : 'Joined'}`).join `\n\n`
                    m.reply(capt)
                    break

                case "inspect":
                    if (!isOwner) return m.reply(msg.owner)
                    try {
                        if (!value) return m.reply(msg.nolink('Whatsapp'));
                        url = value.split("https://chat.whatsapp.com/")[1];
                        if (!url) return m.reply('Link invalid')
                        mem = [];
                        let { id, owner, subject, subjectOwner, desc, descId, participants, size, descOwner, descTime, creation, } = await client.query({ json: ["query", "invite", url], expect200: true, });
                        fotoProf = await client.getProfilePicture(id);
                        buff = await getBuffer(fotoProf)
                        capt = '*Id* : ' + id
                        capt += owner ? '\n*Owner* : @' + owner.split('@')[0] : '\n*Owner* : -'
                        capt += '\n*Nama* : ' + subject
                        capt += '\n*Dibuat* : ' + formatDate(creation * 1000)
                        capt += '\n*Jumlah Member* : ' + size
                        capt += desc ? '\n*Deskripsi* : ' + desc : '\n*Deskripsi* : -'
                        capt += '\n*Id Deskripsi* : ' + descId
                        capt += descOwner ? '\n*Deskripsi diubah oleh* : @' + descOwner.split("@")[0] : '\n*Deskripsi diubah oleh* : -'
                        capt += descTime ? '\n*Tanggal* : ' + formatDate(descTime * 1000) : '\n*Tanggal* : -'
                        capt += '\n\n*Kontak tersimpan* : \n'
                        for (let y of participants) {
                            capt += '- @' + y.id.split("@")[0]
                            capt += '\n'
                            mem.push(y.id.replace(/@c.us/g, "@s.whatsapp.net"));
                        }
                        mem.push(owner ? owner.replace(/@c.us/g, "@s.whatsapp.net") : '-');
                        mem.push(descOwner ? descOwner.replace(/@c.us/g, "@s.whatsapp.net") : '-');
                        client.sendMessage(from, buff, image, {
                            caption: capt,
                            quoted: mek,
                            contextInfo: { mentionedJid: mem },
                        });
                    } catch {
                        m.reply("Link invalid");
                    }
                    break

                case 'infogroup':
                case 'infogc':
                    if (!isGroup) return m.reply(msg.group)
                    try {
                        ppimg = await client.getProfilePicture(from);
                    } catch {
                        ppimg = 'https://telegra.ph/file/7c0b1068736040b515d81.jpg';
                    }
                    isAntilink = isAntilink ? 'Yes' : 'No'
                    isAntidelete = isAntidelete ? 'Yes' : 'No'
                    isDetect = isDetect ? 'Yes' : 'No'
                    isWelcome = isWelcome ? 'Yes' : 'No'
                    isViewonce = isViewonce ? 'Yes' : 'No'
                    creation = moment(groupMetadata.creation * 1000).tz('Asia/Jakarta').format(`DD-MM-YYYY`)
                    ownergc = groupMetadata.owner.split('@')[0]
                    capt = 'GROUP INFORMATIONS\n\n'
                    capt += '*Nama* : ' + groupName
                    capt += '\n*Di buat pada* : ' + creation
                    capt += '\n*Owner* : @' + ownergc
                    capt += '\n*Total Admin* : ' + groupAdmins.length
                    capt += '\n*Total Member* : ' + groupMembers.length
                    capt += '\n\nGROUP SETTING'
                    capt += '\n*Antilink* : ' + isAntilink
                    capt += '\n*Antidelete* : ' + isAntidelete
                    capt += '\n*Antiviewonce* : ' + isViewonce
                    capt += '\n*Detected* : ' + isDetect
                    capt += '\n*Welcome* : ' + isWelcome
                    capt += '\n\n*Deskripsi* : ' + groupDesc
                    client.adReply(from, capt, text, groupName, tanggal, thumb, '')
                    break


                case 'revoke':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    await client.revokeInvite(from)
                    m.reply(msg.done)
                    break

                case 'warn':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isOwner && !isAdmins) return m.reply(msg.admin)
                    if (!dia) return m.reply(msg.notag)
                    await addWarn(dia)
                    warn = cekWarn(dia)
                    if (warn === 3) {
                        client.groupRemove(from, [dia]).catch((e) => { console.log(`*ERROR:* ${e}`) })
                        await delWarn(sender, 3)
                        return m.reply(msg.bye)
                    }
                    m.reply(msg.addwarn)
                    break

                case 'delwarn':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isOwner && !isAdmins) return m.reply(msg.admin)
                    if (!dia) return m.reply(msg.notag)
                    warn = cekWarn(dia)
                    if (warn === 0) {
                        return m.reply(msg.nowarn)
                    }
                    await delWarn(dia, 1)
                    m.reply(msg.delwarn)
                    break

                case 'cekwarn':
                    warn = cekWarn(siapa)
                    m.reply(msg.cekwarn(warn))
                    break

                case 'addpremium':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isOwner) return m.reply(msg.owner)
                    prem = cekPremium(dia)
                    if (prem === true) {
                        return m.reply(msg.isprem)
                    }
                    await addPremium(dia)
                    m.reply(msg.done)
                    break

                case 'delpremium':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isOwner) return m.reply(msg.owner)
                    prem = cekPremium(dia)
                    if (prem === false) {
                        return m.reply(msg.noprem)
                    }
                    await delPremium(dia)
                    m.reply(msg.done)
                    break

                case 'banned':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isOwner) return m.reply(msg.owner)
                    ban = cekBanned(dia)
                    if (ban === true) {
                        return m.reply(msg.ban)
                    }
                    await addBanned(dia)
                    m.reply(msg.done)
                    break

                case 'unbanned':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isOwner) return m.reply(msg.owner)
                    ban = cekBanned(dia)
                    if (ban === false) {
                        return m.reply(msg.noban)
                    }
                    await delBanned(dia)
                    m.reply(msg.done)
                    break

                case 'open':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                        // allow everyone to send Message
                    await client.groupSettingChange(from, GroupSettingChange.messageSend, false)
                    m.reply(msg.open)
                    break

                case 'close':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                        // only allow admins to send messages
                    await client.groupSettingChange(from, GroupSettingChange.messageSend, true)
                    m.reply(msg.close)
                    break

                case 'setname':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (!value) return m.reply(msg.notext)
                    await client.groupUpdateSubject(from, value)
                    m.reply(msg.name(value))
                    break

                case 'setppgc':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (isMedia || isQuotedImage) {
                        q = m.quoted ? m.quoted : m
                        let img = await q.download()
                        await client.updateProfilePicture(from, img)
                    } else {
                        m.reply(msg.replyImg)
                    }
                    break

                case 'setppbot':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (isMedia || isQuotedImage) {
                        q = m.quoted ? m.quoted : m
                        let img = await q.download()
                        id = client.user.jid
                        await client.updateProfilePicture(from, img)
                    } else {
                        m.reply(msg.replyImg)
                    }
                    break

                case 'setdesk':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (!value) return m.reply(msg.notext)
                    await client.groupUpdateDescription(from, value)
                    m.reply(msg.desk(value))
                    break

                case 'kick':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isOwner) return m.reply(msg.owner)
                    if (!dia) return m.reply(msg.notag)
                        //if(dia === isAdmins) return m.reply(msg.isadmin)
                    anu = "@" + dia.split('@')[0]
                    capt = msg.kick(anu)
                    m.reply(capt, null, {
                        contextInfo: {
                            mentionedJid: client.parseMention(capt),
                        },
                    });
                    await client.groupRemove(from, [dia])
                    break

                case 'add':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isOwner) return m.reply(msg.owner)
                        //if(!dia) return m.reply(msg.notag)
                    user = value.replace(/[^0-9]/g, '') + "@s.whatsapp.net"
                    try {
                        response = await client.groupAdd(from, [user])
                        v = response.participants[0]
                        invit = (Object.values(v))
                        if (invit[0].code == 409) return m.reply(msg.onwa)
                        else if (invit[0].code == 403) {
                            capt = msg.sendlink + "@" + user.split('@')[0]
                            m.reply(capt, null, {
                                contextInfo: {
                                    mentionedJid: client.parseMention(capt),
                                },
                            });
                            client.sendGroupV4Invite(from, user, invit[0].invite_code, invit[0].invite_code_exp, groupMetadata.subject, `Invite you, to join a group`)
                        }
                    } catch (e) {
                        m.reply(msg.nonum)
                    }
                    break

                case 'undang':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!value) return m.reply(msg.nonum)
                    users = value.replace(/[^0-9]/g, '') + "@s.whatsapp.net"
                    ini = await client.groupInviteCode(from)
                    link = 'https://chat.whatsapp.com/' + ini
                    client.sendMessage(users, "@" + sender.split("@")[0] + "\nMengundang mu untuk masuk kedalam group\n" + link, text, {
                        contextInfo: {
                            mentionedJid: [sender],
                        }
                    })
                    m.reply(msg.done)
                    break

                case 'promote':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (!dia) return m.reply(msg.notag)
                        // id & people to make admin (will throw error if it fails)
                    await client.groupMakeAdmin(from, [dia])
                    anu = "@" + dia.split('@')[0]
                    capt = msg.promote(anu)
                    m.reply(capt, null, {
                        contextInfo: {
                            mentionedJid: client.parseMention(capt),
                        },
                    });
                    break

                case 'demote':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isBotAdmins) return m.reply(msg.botadmin)
                    if (!isAdmins && !isOwner) return m.reply(msg.admin)
                    if (!dia) return m.reply(msg.notag)
                        // id & people to make admin (will throw error if it fails)
                    await client.groupDemoteAdmin(from, [dia]) //demote admins
                    anu = "@" + dia.split('@')[0]
                    capt = msg.demote(anu)
                    m.reply(capt, null, {
                        contextInfo: {
                            mentionedJid: client.parseMention(capt),
                        },
                    });
                    break

                case 'voting':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isAdmins) return m.reply(msg.admin)
                    if (!value) return m.reply(msg.notext)
                    client.vote = client.vote ? client.vote : {}
                    if (from in client.vote) {
                        await m.reply(msg.main('Voting'))
                        return false
                    }
                    caption = `*VOTING*

Reason : ${value}

${prefix}vote untuk vote
${prefix}devote untuk devote`
                    client.vote[from] = [
                        await client.send2Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'Devote', false, {
                            contextInfo: {
                                mentionedJid: client.parseMention(caption)
                            }
                        }), [],
                        [],
                        value,
                    ]
                    break

                case 'hapusvote':
                case 'delvote':
                    if (!isGroup) return m.reply(msg.group)
                    if (!isAdmins) return m.reply(msg.admin)
                    if (!(from in client.vote)) {
                        await m.reply(msg.nomain('Voting'))
                        return false
                    }
                    delete client.vote[from]
                    m.reply(msg.hapus('Voting'))
                    break

                case 'vote':
                    if (!isGroup) return m.reply(msg.group)
                    if (!(from in client.vote)) {
                        m.reply(msg.nomain('Voting'))
                        return false
                    }
                    vote = client.vote[from][1]
                    devote = client.vote[from][2]
                    inVote = vote.includes(sender)
                    inDevote = devote.includes(sender)
                    if (inVote) return m.reply(msg.inmain('Voting'))
                    if (inDevote) return m.reply(msg.inmain('Voting'))
                    vote.push(sender)
                    listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                caption = `*VOTING*

REASON : ${client.vote[from][3]}

VOTE : ${vote.length}
${listVote}

DEVOTE : ${devote.length}
${listDevote}`.trim()
                await client.send3Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'devote', 'Cek Voting', prefix + 'cekvote', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
                break

            case 'devote':
                if (!isGroup) return m.reply(msg.group)
                if (!(from in client.vote)) {
                    m.reply(msg.nomain('Voting'))
                    return false
                }
                vote = client.vote[from][1]
                devote = client.vote[from][2]
                inVote = vote.includes(sender)
                inDevote = devote.includes(sender)
                if (inVote) return m.reply(msg.inmain('Voting'))
                if (inDevote) return m.reply(msg.inmain('Voting'))
                devote.push(sender)
                listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                caption = `*VOTING*

            REASON : ${client.vote[from][3]}

            VOTE : ${vote.length}
            ${listVote}

            DEVOTE : ${devote.length}
            ${listDevote}`.trim()
                await client.send3Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'devote', 'Cek Voting', prefix + 'cekvote', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
                break


            case 'cekvote':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins) return m.reply(msg.admin)
                if (!(from in client.vote)) {
                    await m.reply(msg.nomain('Voting'))
                    throw false
                }
                vote = client.vote[from][1]
                devote = client.vote[from][2]
                listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                caption = `*RESULT VOTING*

            REASON : ${client.vote[from][3]}

            VOTE : ${vote.length}
            ${listVote}

            Devote : ${devote.length}
            ${listDevote}`.trim()
                await client.send3Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'devote', 'Hapus Voting', prefix + 'delvote', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
                break

            case 'absenstart':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins) return m.reply(msg.admin)
                client.absen = client.absen ? client.absen : {}
                if (from in client.absen) {
                    await m.reply(msg.main('Absen'))
                    return false
                }
                mention = groupMembers.map(u => u.jid)
                client.absen[from] = [
                    await client.send2Button(from, `Absen dimulai`, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', false, {
                        contextInfo: {
                            mentionedJid: mention
                        }
                    }),
                    [],
                    [],
                ]
                break

            case 'hapusabsen':
            case 'delabsen':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins) return m.reply(msg.admin)
                if (!(from in client.absen)) {
                    await m.reply(msg.nomain('Absensi'))
                    throw false
                }
                delete client.absen[from]
                m.reply(msg.hapus('Absensi'))
                break

            case 'izin':
                if (!isGroup) return m.reply(msg.group)
                if (!(from in client.absen)) {
                    m.reply(msg.nomain('Absensi'))
                    return false
                }
                absen = client.absen[from][1]
                izin = client.absen[from][2]
                inAbsen = absen.includes(sender)
                inIzin = izin.includes(sender)
                if (inAbsen) return m.reply(msg.inmain('Absen'))
                if (inIzin) return m.reply(msg.inmain('Absen'))
                izin.push(sender)
                listAbsen = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                listIzin = izin.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                caption = `
            Tanggal: ${tanggal}

            Daftar Absen
            Total: ${absen.length}
            ${listAbsen}

            Daftar Izin
            Total: ${izin.length}
            ${listIzin}`.trim()
                await client.send3Button(from, caption, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', 'Cek Absen', prefix + 'cekabsen', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
                break

            case 'absen':
                if (!isGroup) return m.reply(msg.group)
                if (!(from in client.absen)) {
                    m.reply(msg.nomain('Absensi'))
                    return false
                }
                absen = client.absen[from][1]
                izin = client.absen[from][2]
                inAbsen = absen.includes(sender)
                inIzin = izin.includes(sender)
                if (inAbsen) return m.reply(msg.inmain('Absen'))
                if (inIzin) return m.reply(msg.inmain('Absen'))
                absen.push(sender)
                listAbsen = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                listIzin = izin.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                caption = `
            Tanggal: ${tanggal}

            Daftar Absen
            Total: ${absen.length}
            ${listAbsen}

            Daftar Izin
            Total: ${izin.length}
            ${listIzin}`.trim()
                await client.send3Button(from, caption, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', 'Cek Absen', prefix + 'cekabsen', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
                break

            case 'cekabsen':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins) return m.reply(msg.admin)
                if (!(from in client.absen)) {
                    await m.reply(msg.nomain('Absensi'))
                    throw false
                }
                absen = client.absen[from][1]
                izin = client.absen[from][2]
                listAbsen = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                listIzin = izin.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
                caption = `
            Tanggal: ${tanggal}

            Daftar Absen
            Total: ${absen.length}
            ${listAbsen}

            Daftar Izin
            Total: ${izin.length}
            ${listIzin}`.trim()
                await client.send3Button(from, caption, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', 'Hapus Absen', prefix + 'hapusabsen', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
                break

            case 'welcome':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                if (!isBotAdmins) return m.reply(msg.botadmin)
                if (!value) return m.reply(msg.OnorOff)
                if (value.toLowerCase() === "on") {
                    if (isWelcome === true) return m.reply(msg.Thison(command.toUpperCase()))
                    await addWelcome(from)
                    m.reply(msg.On(command.toUpperCase()))
                } else if (value.toLowerCase() === "off") {
                    if (isWelcome === false) return m.reply(msg.Thisoff(command.toUpperCase()))
                    await delWelcome(from)
                    m.reply(msg.Off(command.toUpperCase()))
                } else {
                    m.reply(msg.OnorOff)
                }
                break

            case 'antidelete':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                if (!isBotAdmins) return m.reply(msg.botadmin)
                if (!value) return m.reply(msg.OnorOff)
                if (value.toLowerCase() === "on") {
                    if (isAntidelete === true) return m.reply(msg.Thison(command.toUpperCase()))
                    await addAntidelete(from)
                    m.reply(msg.On(command.toUpperCase()))
                } else if (value.toLowerCase() === "off") {
                    if (isAntidelete === false) return m.reply(msg.Thisoff(command.toUpperCase()))
                    await delAntidelete(from)
                    m.reply(msg.Off(command.toUpperCase()))
                } else {
                    m.reply(msg.OnorOff)
                }
                break

            case 'detect':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                if (!isBotAdmins) return m.reply(msg.botadmin)
                if (!value) return m.reply(msg.OnorOff)
                if (value.toLowerCase() === "on") {
                    if (isDetect === true) return m.reply(msg.Thison(command.toUpperCase()))
                    await addDetect(from)
                    m.reply(msg.On(command.toUpperCase()))
                } else if (value.toLowerCase() === "off") {
                    if (isDetect === false) return m.reply(msg.Thisoff(command.toUpperCase()))
                    await delDetect(from)
                    m.reply(msg.Off(command.toUpperCase()))
                } else {
                    m.reply(msg.OnorOff)
                }
                break

            case 'antilink':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                if (!isBotAdmins) return m.reply(msg.botadmin)
                if (!value) return m.reply(msg.OnorOff)
                if (value.toLowerCase() === "on") {
                    if (isAntilink === true) return m.reply(msg.Thison(command.toUpperCase()))
                    await addAntilink(from)
                    m.reply(msg.On(command.toUpperCase()))
                } else if (value.toLowerCase() === "off") {
                    if (isAntilink === false) return m.reply(msg.Thisoff(command.toUpperCase()))
                    await delAntilink(from)
                    m.reply(msg.Off(command.toUpperCase()))
                } else {
                    m.reply(msg.OnorOff)
                }
                break

            case 'antiviewonce':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                if (!isBotAdmins) return m.reply(msg.botadmin)
                if (!value) return m.reply(msg.OnorOff)
                if (value.toLowerCase() === "on") {
                    if (isViewonce === true) return m.reply(msg.Thison(command.toUpperCase()))
                    await addViewonce(from)
                    m.reply(msg.On(command.toUpperCase()))
                } else if (value.toLowerCase() === "off") {
                    if (isViewonce === false) return m.reply(msg.Thisoff(command.toUpperCase()))
                    await delViewonce(from)
                    m.reply(msg.Off(command.toUpperCase()))
                } else {
                    m.reply(msg.OnorOff)
                }
                break

            case 'chatbot': // atur sesukamu
                // if(!isPremium) return m.reply(msg.premium)
                // if(isGroup) return m.reply(msg.private)
                if (!value) return m.reply(msg.OnorOff)
                if (value.toLowerCase() === "on") {
                    if (isChatbot === true) return m.reply('Chatbot On')
                    await addChatbot(sender)
                    m.reply(msg.done)
                } else if (value.toLowerCase() === "off") {
                    if (isChatbot === false) return m.reply('Chatbot off')
                    await delChatbot(sender)
                    m.reply(msg.done)
                } else {
                    m.reply(msg.OnorOff)
                }
                break

            case 'q':
                if (!m.quoted) return m.reply(msg.reply)
                let qse = client.serializeM(await m.getQuotedObj())
                if (!qse.quoted) return m.reply(msg.noreply)
                await qse.quoted.copyNForward(from, true)
                break

            case 'mode':
                if (!isOwner) return m.reply(msg.owner)
                capt = 'USE MODE *ONEPREF*, *NOPREF*, *MULTI*'
                client.send3Button(from, capt, 'Choose what you want', 'One Prefix', prefix + 'onepref', 'No Prefix', prefix + 'nopref', 'Multi Prefix', prefix + 'multi')
                break

            case 'multi':
            case 'onepref':
            case 'nopref':
                if (!isOwner) return m.reply(msg.owner)
                //if (!value) return m.reply(msg.notext)
                if (command === 'multi') {
                    if (Use.multi) return m.reply(msg.Thison(command.toUpperCase()))
                    Use.multi = true
                    Use.nopref = false
                    Use.onepref = false
                    m.reply(msg.done)
                } else if (command === 'nopref') {
                    if (Use.nopref) return m.reply(msg.Thison(command.toUpperCase()))
                    Use.multi = false
                    Use.onepref = false
                    Use.nopref = true
                    m.reply(msg.done)
                } else if (command === 'onepref') {
                    if (Use.onepref) return m.reply(msg.Thison(command.toUpperCase()))
                    Use.multi = false
                    Use.nopref = false
                    Use.onepref = true
                    m.reply(msg.done + ' Prefix ' + Use.prefix)
                }
                break

            case 'delwelcome':
            case 'delbye':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.owner)
                if (command.includes('welcome')) {
                    await delCustomWelcome(from)
                    m.reply(msg.default('WELCOME'))
                } else if (command.includes('bye')) {
                    await delCustomBye(from)
                    m.reply(msg.default('BYE'))
                }
                break

            case 'setwelcome':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                fungsi = `
            @tag = @${sender.split('@')[0]}
            @nama = ${pushname}
            @about = ${about}
            @tanggal = ${tanggal}
            @group = ${groupName}`
                if (!value) return m.reply(msg.setwel(fungsi))
                await setCustomWelcome(from, value)
                m.reply(msg.setweldone(value, fungsi))
                break

            case 'setbye':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                fungsi = `
            @tag = @${sender.split('@')[0]}
            @nama = ${pushname}
            @about = ${about}
            @tanggal = ${tanggal}
            @group = ${groupName}`
                if (!value) return m.reply(msg.setbye(fungsi))
                await setCustomBye(from, value)
                m.reply(msg.setbyedone(value, fungsi))
                break

            case 'simulasi':
                if (!isGroup) return m.reply(msg.group)
                if (!isAdmins && !isOwner) return m.reply(msg.admin)
                if (!value) return m.reply('List Simulasi\n\n- Welcome\n-Bye')
                welc = getCustomWelcome(from)
                bye = getCustomBye(from)
                tag = '@' + sender.split('@')[0]
                if (value.toLowerCase() === 'welcome') {
                    capt = welc.replace('@tag', tag).replace('@nama', pushname).replace('@about', about).replace('@tanggal', tanggal).replace('@group', groupName)
                    client.adReply(from, capt, text, 'Selamat datang member baru', 'Member ke ' + groupMembers.length + ' Group ' + groupName, thumb, '');
                } else if (value.toLowerCase() === 'bye') {
                    capt = bye.replace('@tag', tag).replace('@nama', pushname).replace('@about', about).replace('@tanggal', tanggal).replace('@group', groupName)
                    m.reply(capt)
                } else {
                    m.reply('List Simulasi\n\n- Welcome\n- Bye')
                }
                break

            default:

                if (budy.startsWith('$')) {
                    if (!mek.key.fromMe && !isOwner) return;
                    qur = budy.slice(2);
                    exec(qur, (err, stdout) => {
                        if (err) return m.reply(`‣  ${err}`);
                        if (stdout) {
                            m.reply(stdout)
                        }
                    });
                }

                if (budy.startsWith('>')) {
                    if (!mek.key.fromMe && !isOwner) return;
                    try {
                        client.sendMessage(from, "‣ " + JSON.stringify(eval(budy.slice(2)), null, '\t'), text, { quoted: mek });
                    } catch (err) {
                        e = String(err);
                        m.reply("‣ " + e);
                    }
                }
        }

        let isLink = 'https://chat.whatsapp.com/'
        if (budy.match(isLink) && isAntilink === true) {
            if (isAdmins) return
            if (!isBotAdmins) return
            code = await client.groupInviteCode(from)
            if (budy.match(isLink + code)) {
                return !0
            } else {
                m.reply(msg.antilink)
                await addWarn(sender)
                m.reply(msg.addwarn)
                cek = await cekWarn(sender)
                if (cek === 3) {
                    await client.groupRemove(from, [sender])
                    await delWarn(sender, 3)
                }
            }
        }


        // user afk
        let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
        for (let jid of jids) {
            let isOnAfk = cekAfk(jid);
            let isOnAfkTime = cekAfkTime(jid);
            let isOnAfkReason = cekAfkReason(jid);
            if (isOnAfk && isGroup) {
                return m.reply(msg.inAfk(isOnAfkReason, isOnAfkTime))
            }
        }


        /**
         * url 1 = https://api.simsimi.net/v2/?text=${budy}&lc=id&cf=false
         * url 2 = https://api-sv2.simsimi.net/v2/?text=${budy}&lc=id&cf=false 
         * chatbot // atur sesukamu su pilih salah satu kalo eror
        */

        if (!isCmd && isChatbot === true) {
            // if(!mek.isBaileys) return
            // if(isGroup) return
            // if(!isPremium) return
            if (m.mtype == 'stickerMessage') return
            result = await fetchJson(`https://api.simsimi.net/v2/?text=${budy}&lc=id`, { method: 'get' })
            m.reply(result.success.replace('simsimi', 'Lexa').replace('Simsimi', 'lexa').replace('simi', 'Lexa').replace('Simi', 'Lexa').replace('sim', 'Lexa'))
        }

        // antiview once
        if (m.mtype == 'viewOnceMessage' && isViewonce === true) {
            msg = { ...mek }
            msg.message = mek.message.viewOnceMessage.message
            msg.message[Object.keys(msg.message)[0]].viewOnce = false
            m.reply('ViewOnce detected!')
            client.copyNForward(from, msg)
        }


    } catch (e) {
        console.log(bgcolor('‣ Alert :', 'red'), e);
    }
};

/**
 * End of proyek WhatsApp bot using baileys
 *
 * Thank to
 - https://github.com/MhankBarBar/weabot
 - https://github.com/Nurutomo/wabot-aq
 - All owner bot
*/