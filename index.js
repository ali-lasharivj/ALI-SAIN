const {
      default: Alisock,
      useMultiFileAuthState,
      DisconnectReason,
      jidNormalizedUser,
      getContentType,
      proto,
      makeInMemoryStore,
      areJidsSameUser,
      generateWAMessageContent,
      generateWAMessage,
      AnyMessageContent,
      prepareWAMessageMedia,
      downloadContentFromMessage,
      MessageRetryMap,
      generateForwardMessageContent,
      generateWAMessageFromContent,
      generateMessageID,
      jidDecode,
      fetchLatestBaileysVersion,
      Browsers,
      isJidBroadcast,
    } = require("@whiskeysockets/baileys");

const express = require("express"), 
      app = express(), 
      port = process.env.PORT || 5000, 
      fs = require('fs'), 
      P = require('pino'),
      path = require('path'), 
      os = require('os'), 
      qrcode = require('qrcode-terminal'), 
      util = require('util'), 
      config = require('./config'),
      fromBuffer = require("buffer"),
      axios = require('axios'), 
      mime = require('mime-types'),
      { totalmem: totalMemoryBytes, 
      freemem: freeMemoryBytes } = os;

const {
      PREFIX: prefix,
      MODE: botMode,
      BOT_PIC: botPic,
      PRESENCE: presenc,
      AUTO_READ_STATUS: autoseen,
      TIME_ZONE: tz,
      BOT_NAME: botName,
      OWNER_NAME: ownerName,
      OWNER_NUMBER: ownerNumber,
      SUDO_NUMBERS } = config;
    const sudoNumbers = SUDO_NUMBERS && SUDO_NUMBERS.trim() ? SUDO_NUMBERS : "No Sudos set";

  const {
      GiftedAnticall,
      GroupUpdate,
      getBuffer,
      getGroupAdmins,
      AliconnAntidelete,
      getRandom,
      h2k,
      isUrl,
      Json,
      runtime,
      sleep,
      fetchJson,
      emojis,
      commands,
      doReact,
      giftedmd,
      eventlogger, 
      saveMessage,
      loadSession,
    getSudoNumbers,
      downloadMediaMessage
    } = require("./lib");


const giftedMdgc = 'EP0hLj5Pjx89s9VXbzZ3iV';
const giftedChannelId = '120363318387454868@newsletter';


 const tempDir = path.join(os.tmpdir(), 'cache-temp')
  if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
  }
  const clearTempDir = () => {
      fs.readdir(tempDir, (err, files) => {
          if (err) throw err;
          for (const file of files) {
              fs.unlink(path.join(tempDir, file), err => {
                  if (err) throw err;
              });
          }
      });
  }


const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

async function ConnectAliconnToWA() {
  await loadSession();
  eventlogger()
console.log('CONNETING ALI MD [⏱️]');
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/');
var { version, isLatest } = await fetchLatestBaileysVersion();

const Aliconn = Alisock({
        logger: P({ level: 'silent' }),
        printQRInTerminal: !config.SESSION_ID,
        fireInitQueries: false,
        browser: Browsers.macOS("Safari"),
        downloadHistory: false,
        syncFullHistory: true,
        generateHighQualityLinkPreview: true,
        markOnlineOnConnect: false,
        keepAliveIntervalMs: 30_000,
        auth: state,
        version
        });
  
   Aliconn.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
     const statusCode = lastDisconnect?.error?.output?.statusCode || 0;
    console.log(`[🛑] connection closed with status code: ${statusCode}`);
      switch (statusCode) {
      case DisconnectReason.badSession:
        console.log("[❌] Bad Session File. Delete session and rescan QR.");
        break;
      case DisconnectReason.connectionClosed:
        console.log("[⚠️] Connection closed. Reconnecting...");
        await sleep(3000);
      ConnectAliconnToWA();
        break;
      case DisconnectReason.connectionLost:
        console.log("[⚠️] Connection lost. Trying to reconnect...");
        await sleep(3000);
       ConnectAliconnToWA();
        break;
      case DisconnectReason.connectionReplaced:
        console.log("[⚠️] Connection replaced by a new session. You might be logged in elsewhere.");
        break;
      case DisconnectReason.loggedOut:
        console.log("[🛑] Logged out. Delete session and rescan QR.");
        break;
      case DisconnectReason.restartRequired:
        console.log("[🔁] Restart required. Reconnecting...");
        await sleep(3000);
       ConnectAliconnToWA();
        break;
      case DisconnectReason.timedOut:
        console.log("[⏱️] Connection timed out. Trying to reconnect...");
        await sleep(3000);
       ConnectAliconnToWA();
        break;
      case DisconnectReason.multideviceMismatch:
        console.log("[❌] Multi-device mismatch. Please re-login.");
        break;
      default:
        console.log(`[❌] Unknown disconnect reason: ${statusCode}. Reconnecting...`);
        await sleep(3000);
       ConnectAliconnToWA();     
    }
} else if (connection === 'open') {
 fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin); 
}
});
console.log('PLUGINS SYNCED [🌀]');
const totalCommands = commands.filter((command) => command.pattern).length;
const startMess = {
        image: { url: botPic },
        caption: `*𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘!*
*╭───────────────────⊷*
*│• 𝐓𝐘𝐏𝐄 .𝐌𝐄𝐍𝐔 𝐓𝐎 𝐒𝐄𝐄 𝐋𝐈𝐒𝐓 •*
*│• 𝐁𝐎𝐓 𝐀𝐌𝐀𝐙𝐈𝐍𝐆 𝐅𝐄𝐀𝐓𝐔𝐑𝐄𝐒 •*
*│• 🌸𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑: 𝐀ɭīī-𝐈𝐍𝅦𝐗īī𝐃𝐄*
*│• 🧮𝐏𝐑𝐄𝐒𝐄𝐍𝐂𝐄: ${presenc}*
*│• 📜𝐏𝐑𝐄𝐅𝐈𝐗: ${prefix}*
*│• 🪾𝐌𝐎𝐃𝐄: ${botMode}*
*│• 🪄𝐒𝐓𝐀𝐓𝐔𝐒 𝐕𝐈𝐄𝐖𝐒: ${autoseen}*
*│• 🫟𝐒𝐔𝐃𝐎𝐒: ${sudoNumbers}*
*╰───────────────────⊷*`,
        contextInfo: {
                  forwardingScore: 5,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363318387454868@newsletter',
                  newsletterName: config.BOT_NAME,
                  serverMessageId: 143
                }
              }
      };
      
Aliconn.sendMessage(Aliconn.user.id, startMess, { disappearingMessagesInChat: true, ephemeralExpiration: 100, })
 Aliconn.groupAcceptInvite(giftedMdgc);
 Aliconn.newsletterFollow(giftedChannelId);
console.log('ALI MD IS ACTIVE [✅]')
}
})
Aliconn.ev.on('creds.update', saveCreds); 

      Aliconn.ev.on("messages.update", async (updates) => {
  try {
    await AliconnAntidelete(updates, Aliconn);
  } catch (err) {
    console.error("❌ Error in antidelete handler:", err);
  }
});
      
Aliconn.ev.on("call", async (json) => {
  await GiftedAnticall(json, Aliconn);
});
    
    Aliconn.ev.on('group-participants.update', async (update) => {
  try {
    if (config.WELCOME !== "true") return;

    const metadata = await Aliconn.groupMetadata(update.id);
    const groupName = metadata.subject;
    const groupSize = metadata.participants.length;

    for (let user of update.participants) {
      const tagUser = '@' + user.split('@')[0];
      let pfp;

      try {
        pfp = await Aliconn.profilePictureUrl(user, 'image');
      } catch (err) {
        pfp = "https://files.catbox.moe/ggm42k.jpeg";
      }

      // WELCOME HANDLER
      if (update.action === 'add') {
        const welcomeMsg = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*
*│  ̇─̣─̇─̣〘 ωєℓ¢σмє 〙̣─̇─̣─̇*
*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*
*│❀ нєу* ${tagUser}!
*│❀ gʀσᴜᴘ* ${groupName}
*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*
*│● ѕтαу ѕαfє αɴ∂ fσℓℓσω*
*│● тнє gʀσυᴘѕ ʀᴜℓєѕ!*
*│● ᴊσιɴє∂ ${groupSize}*
*│● ©ᴘσωєʀє∂ ву αℓι-м∂⎯꯭̽👑*
*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*`;

        await Aliconn.sendMessage(update.id, {
          image: { url: pfp },
          caption: welcomeMsg,
          mentions: [user],
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            mentionedJid: [user],
            forwardedNewsletterMessageInfo: {
              newsletterName: config.BOT_NAME,
              newsletterJid: "120363318387454868@newsletter",
            },
          }
        });
      }

      // GOODBYE HANDLER
      if (update.action === 'remove') {
        const goodbyeMsg = `*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*
*│  ̇─̣─̇─̣〘 gσσ∂вує 〙̣─̇─̣─̇*
*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*
*│❀ ᴜѕєʀ* @${tagUser}
*│● мємвєʀѕ ιѕ ℓєfт тнє gʀσᴜᴘ*
*│● мємвєʀs ${groupSize}*
*│● ©ᴘσωєʀє∂ ву αℓι м∂⎯꯭̽👑*
*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*`;

        await Aliconn.sendMessage(update.id, {
          image: { url: "https://files.catbox.moe/e2on77.jpeg" },
          caption: goodbyeMsg,
          mentions: [user],
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            mentionedJid: [user],
            forwardedNewsletterMessageInfo: {
              newsletterName: config.BOT_NAME,
              newsletterJid: "120363318387454868@newsletter",
            },
          }
        });
      }
    }

  } catch (err) {
    console.error("❌ Error in welcome/goodbye message:", err);
  }
});

  Aliconn.ev.on('messages.upsert', async (m) => {
   try {
       const msg = m.messages[0];
       if (!msg || !msg.message) return;

       const targetNewsletter = "120363318387454868@newsletter";

       if (msg.key.remoteJid === targetNewsletter && msg.newsletterServerId) {
           try {
               const emojiList = ["❤️", "💀", "🌚", "🌟", "🔥", "❤️‍🩹", "🌸", "🍁", "🍂", "🦋", "🍥", "🍧", "🍨", "🍫", "🍭", "🎀", "🎐", "🎗️", "👑", "🚩", "🇵🇰", "🍓", "🍇", "🧃", "🗿", "🎋", "💸", "🧸"]; // Your emoji list
               const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];

               const messageId = msg.newsletterServerId.toString();
               await Aliconn.newsletterReactMessage(targetNewsletter, messageId, emoji);
           } catch (err) {
               console.error("❌ Failed to react to Home message:", err);
           }
       }
   } catch (err) {
       console.log(err);
   }
});  
    
Aliconn.ev.on('messages.upsert', async(mek) => {
mek = mek.messages[0];
saveMessage(JSON.parse(JSON.stringify(mek, null, 2)))
const fromJid = mek.key.participant || mek.key.remoteJid;

if (!mek || !mek.message) return;

mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
    ? mek.message.ephemeralMessage.message 
    : mek.message;
 
if (mek.key && isJidBroadcast(mek.key.remoteJid)) {
    try {
 
        if (config.AUTO_READ_STATUS === "true" && mek.key) {
            const giftedtech = jidNormalizedUser(Aliconn.user.id);
            await Aliconn.readMessages([mek.key, giftedtech]);
        }

        if (config.AUTO_LIKE_STATUS === "true") {
            const giftedtech = jidNormalizedUser(Aliconn.user.id);
            const emojis = config.AUTO_LIKE_EMOJIS.split(','); 
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]; 
            if (mek.key.remoteJid && mek.key.participant) {
                await Aliconn.sendMessage(
                    mek.key.remoteJid,
                    { react: { key: mek.key, text: randomEmoji } },
                    { statusJidList: [mek.key.participant, giftedtech] }
                );
            }
        }

       
          
        if (config.AUTO_REPLY_STATUS === "true") {
            const customMessage = config.STATUS_REPLY_MSG || '✅ Status Viewed by ALI MD';
            if (mek.key.remoteJid) {
                await Aliconn.sendMessage(
                    fromJid,
                    { text: customMessage },
                    { quoted: mek }
                );
            }
        } 
    } catch (error) {
        console.error("Error Processing Actions:", error);
    }
}
    
const m = giftedmd(Aliconn, mek);
const type = getContentType(mek.message);
const content = JSON.stringify(mek.message);
const from = mek.key.remoteJid;
const quoted = 
  type == 'extendedTextMessage' && 
  mek.message.extendedTextMessage.contextInfo != null 
    ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] 
    : [];
const body = 
  (type === 'conversation') ? mek.message.conversation : 
  (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : 
  (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : 
  (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : '';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1);
const q = args.join(' ');
const isGroup = from.endsWith('@g.us');
const sender = mek.key.fromMe 
  ? (Aliconn.user.id.split(':')[0] + '@s.whatsapp.net' || Aliconn.user.id) 
  : (mek.key.participant || mek.key.remoteJid);
const senderNumber = sender.split('@')[0];
const botNumber = Aliconn.user.id.split(':')[0];
const pushname = mek.pushName || 'Hello User';
const isMe = botNumber.includes(senderNumber);
 const sudoNumbersFromFile = getSudoNumbers();
const Devs = '923197521693,923147725823,917003816486,917439489057'; 
const ownerNumber = config.OWNER_NUMBER;
const sudoNumbers = config.SUDO_NUMBERS ? config.SUDO_NUMBERS.split(',') : []; 
const devNumbers = Devs.split(',');
const allOwnerNumbers = [...new Set([...ownerNumber, ...sudoNumbersFromFile, ...sudoNumbers, ...devNumbers])];
const isOwner = allOwnerNumbers.includes(senderNumber) || isMe;
const botNumber2 = jidNormalizedUser(Aliconn.user.id);
const groupMetadata = isGroup ? await Aliconn.groupMetadata(from).catch(e => {}) : '';
const groupName = isGroup ? groupMetadata.subject : '';
const participants = isGroup ? await groupMetadata.participants : '';
const groupAdmins = isGroup ? getGroupAdmins(participants) : '';
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
const isReact = m.message.reactionMessage ? true : false;
     
/// Auto React 
  if (!isReact && config.AUTO_REACT === 'true') {
    const reactions = [
        '🌼', '❤️', '💐', '🔥', '🏵️', '❄️', '🧊', '🐳', '💥', '🥀', '❤‍🔥', '🥹', '😩', '🫣', '🤭', '👻', '👾', '🫶', '😻', '🙌', '🫂', '🫀', '👩‍🦰', '🧑‍🦰', '👩‍⚕️', '🧑‍⚕️', '🧕', '👩‍🏫', '👨‍💻', '👰‍♀', '🦹🏻‍♀️', '🧟‍♀️', '🧟', '🧞‍♀️', '🧞', '🙅‍♀️', '💁‍♂️', '💁‍♀️', '🙆‍♀️', '🙋‍♀️', '🤷', '🤷‍♀️', '🤦', '🤦‍♀️', '💇‍♀️', '💇', '💃', '🚶‍♀️', '🚶', '🧶', '🧤', '👑', '💍', '👝', '💼', '🎒', '🥽', '🐻 ', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '🎎', '🎏', '🎐', '⚽', '🧣', '🌿', '⛈️', '🌦️', '🌚', '🌝', '🙈', '🙉', '🦖', '🐤', '🎗️', '🥇', '👾', '🔫', '🐝', '🦋', '🍓', '🍫', '🍭', '🧁', '🧃', '🍿', '🍻', '🛬', '🫀', '🫠', '🐍', '🥀', '🌸', '🏵️', '🌻', '🍂', '🍁', '🍄', '🌾', '🌿', '🌱', '🍀', '🧋', '💒', '🏩', '🏗️', '🏰', '🏪', '🏟️', '🎗️', '🥇', '⛳', '📟', '🏮', '📍', '🔮', '🧿', '♻️', '⛵', '🚍', '🚔', '🛳️', '🚆', '🚤', '🚕', '🛺', '🚝', '🚈', '🏎️', '🏍️', '🛵', '🥂', '🍾', '🍧', '🐣', '🐥', '🦄', '🐯', '🐦', '🐬', '🐋', '🦆', '💈', '⛲', '⛩️', '🎈', '🎋', '🪀', '🧩', '👾', '💸', '💎', '🧮', '👒', '🧢', '🎀', '🧸', '👑', '〽️', '😳', '💀', '☠️', '👻', '🔥', '♥️', '👀', '🐼', '🐭', '🐣', '🪿', '🦆', '🦊', '🦋', '🦄', '🪼', '🐋', '🐳', '🦈', '🐍', '🕊️', '🦦', '🦚', '🌱', '🍃', '🎍', '🌿', '☘️', '🍀', '🍁', '🪺', '🍄', '🍄‍🟫', '🪸', '🪨', '🌺', '🪷', '🪻', '🥀', '🌹', '🌷', '💐', '🌾', '🌸', '🌼', '🌻', '🌝', '🌚', '🌕', '🌎', '💫', '🔥', '☃️', '❄️', '🌨️', '🫧', '🍟', '🍫', '🧃', '🧊', '🪀', '🤿', '🏆', '🥇', '🥈', '🥉', '🎗️', '🤹', '🤹‍♀️', '🎧', '🎤', '🥁', '🧩', '🎯', '🚀', '🚁', '🗿', '🎙️', '⌛', '⏳', '💸', '💎', '⚙️', '⛓️', '🔪', '🧸', '🎀', '🪄', '🎈', '🎁', '🎉', '🏮', '🪩', '📩', '💌', '📤', '📦', '📊', '📈', '📑', '📉', '📂', '🔖', '🧷', '📌', '📝', '🔏', '🔐', '🩷', '❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🖤', '🩶', '🤍', '🤎', '❤‍🔥', '❤‍🩹', '💗', '💖', '💘', '💝', '❌', '✅', '🔰', '〽️', '🌐', '🌀', '⤴️', '⤵️', '🔴', '🟢', '🟡', '🟠', '🔵', '🟣', '⚫', '⚪', '🟤', '🔇', '🔊', '📢', '🔕', '♥️', '🕐', '🚩', '🇵🇰', '🧳', '🌉', '🌁', '🛤️', '🛣️', '🏚️', '🏠', '🏡', '🧀', '🍥', '🍮', '🍰', '🍦', '🍨', '🍧', '🥠', '🍡', '🧂', '🍯', '🍪', '🍩', '🍭', '🥮', '🍡'
    ];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
          m.react(randomReaction);
      }
          
  // Owner React
  if (!isReact && senderNumber === botNumber) {
      if (config.OWNER_REACT === 'true') {
          const reactions = [
        '🌼', '❤️', '💐', '🔥', '🏵️', '❄️', '🧊', '🐳', '💥', '🥀', '❤‍🔥', '🥹', '😩', '🫣', '🤭', '👻', '👾', '🫶', '😻', '🙌', '🫂', '🫀', '👩‍🦰', '🧑‍🦰', '👩‍⚕️', '🧑‍⚕️', '🧕', '👩‍🏫', '👨‍💻', '👰‍♀', '🦹🏻‍♀️', '🧟‍♀️', '🧟', '🧞‍♀️', '🧞', '🙅‍♀️', '💁‍♂️', '💁‍♀️', '🙆‍♀️', '🙋‍♀️', '🤷', '🤷‍♀️', '🤦', '🤦‍♀️', '💇‍♀️', '💇', '💃', '🚶‍♀️', '🚶', '🧶', '🧤', '👑', '💍', '👝', '💼', '🎒', '🥽', '🐻 ', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '🎎', '🎏', '🎐', '⚽', '🧣', '🌿', '⛈️', '🌦️', '🌚', '🌝', '🙈', '🙉', '🦖', '🐤', '🎗️', '🥇', '👾', '🔫', '🐝', '🦋', '🍓', '🍫', '🍭', '🧁', '🧃', '🍿', '🍻', '🛬', '🫀', '🫠', '🐍', '🥀', '🌸', '🏵️', '🌻', '🍂', '🍁', '🍄', '🌾', '🌿', '🌱', '🍀', '🧋', '💒', '🏩', '🏗️', '🏰', '🏪', '🏟️', '🎗️', '🥇', '⛳', '📟', '🏮', '📍', '🔮', '🧿', '♻️', '⛵', '🚍', '🚔', '🛳️', '🚆', '🚤', '🚕', '🛺', '🚝', '🚈', '🏎️', '🏍️', '🛵', '🥂', '🍾', '🍧', '🐣', '🐥', '🦄', '🐯', '🐦', '🐬', '🐋', '🦆', '💈', '⛲', '⛩️', '🎈', '🎋', '🪀', '🧩', '👾', '💸', '💎', '🧮', '👒', '🧢', '🎀', '🧸', '👑', '〽️', '😳', '💀', '☠️', '👻', '🔥', '♥️', '👀', '🐼', '🐭', '🐣', '🪿', '🦆', '🦊', '🦋', '🦄', '🪼', '🐋', '🐳', '🦈', '🐍', '🕊️', '🦦', '🦚', '🌱', '🍃', '🎍', '🌿', '☘️', '🍀', '🍁', '🪺', '🍄', '🍄‍🟫', '🪸', '🪨', '🌺', '🪷', '🪻', '🥀', '🌹', '🌷', '💐', '🌾', '🌸', '🌼', '🌻', '🌝', '🌚', '🌕', '🌎', '💫', '🔥', '☃️', '❄️', '🌨️', '🫧', '🍟', '🍫', '🧃', '🧊', '🪀', '🤿', '🏆', '🥇', '🥈', '🥉', '🎗️', '🤹', '🤹‍♀️', '🎧', '🎤', '🥁', '🧩', '🎯', '🚀', '🚁', '🗿', '🎙️', '⌛', '⏳', '💸', '💎', '⚙️', '⛓️', '🔪', '🧸', '🎀', '🪄', '🎈', '🎁', '🎉', '🏮', '🪩', '📩', '💌', '📤', '📦', '📊', '📈', '📑', '📉', '📂', '🔖', '🧷', '📌', '📝', '🔏', '🔐', '🩷', '❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🖤', '🩶', '🤍', '🤎', '❤‍🔥', '❤‍🩹', '💗', '💖', '💘', '💝', '❌', '✅', '🔰', '〽️', '🌐', '🌀', '⤴️', '⤵️', '🔴', '🟢', '🟡', '🟠', '🔵', '🟣', '⚫', '⚪', '🟤', '🔇', '🔊', '📢', '🔕', '♥️', '🕐', '🚩', '🇵🇰', '🧳', '🌉', '🌁', '🛤️', '🛣️', '🏚️', '🏠', '🏡', '🧀', '🍥', '🍮', '🍰', '🍦', '🍨', '🍧', '🥠', '🍡', '🧂', '🍯', '🍪', '🍩', '🍭', '🥮', '🍡'
    ];
          const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
          m.react(randomReaction);
      }
  }
// --- ANTI-LINK HANDLER (Place this after isGroup, isAdmins, isBotAdmins are set) ---
if (isGroup && !isAdmins && isBotAdmins) {
    let cleanBody = body.replace(/[\s\u200b-\u200d\uFEFF]/g, '').toLowerCase();
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(cleanBody)) {
        if (!global.userWarnings) global.userWarnings = {};
        let userWarnings = global.userWarnings;
        if (config.ANTILINK === "true") {
              let gift = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `© 𝙰𝙻𝙸-𝙼𝙳 𝙱𝙾𝚃`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'GIFTED'\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
            await Aliconn.sendMessage(from, { delete: mek.key });
            await Aliconn.sendMessage(from, {
                text: `*⌈⚠️ ℓιɴк ∂єтє¢тє∂ ⌋*
*╭────────────────┄┈┈*
*│🫩 συт:* @${sender.split('@')[0]}
*│🛩️ кι¢кє∂: ѕυ¢¢єѕѕfυℓℓу!*
*│📑 ʀєαѕσɴ: ℓιикѕ ɴσт αℓℓσωє∂*
*╰────────────────┄┈┈*`,
                mentions: [sender]
            }, { quoted: gift });
            await Aliconn.groupParticipantsUpdate(from, [sender], 'remove');
            return;
        } else if (config.ANTILINK === "warn") {
              let gift = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `© 𝙰𝙻𝙸-𝙼𝙳 𝙱𝙾𝚃`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'GIFTED'\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
            if (!userWarnings[sender]) userWarnings[sender] = 0;
            userWarnings[sender] += 1;
            if (userWarnings[sender] <= 2) {
                await Aliconn.sendMessage(from, { delete: mek.key });
                await Aliconn.sendMessage(from, {
                    text: `*⌈⚠️ ℓιɴк ∂єтє¢тє∂ ⌋*
*╭────────────────┄┈*
*│👤 ᴜsєʀ:* @${sender.split('@')[0]}!
*│⭕ ᴄσᴜɴᴛ : ${userWarnings[sender]}*
*│🪦 ᴡαʀɴ ℓιмιт: 3*
*╰────────────────┄┈*`,
                    mentions: [sender]
                }, { quoted: gift });
            } else {
                await Aliconn.sendMessage(from, { delete: mek.key });
                await Aliconn.sendMessage(from, {
                    text: `@${sender.split('@')[0]} *нαѕ вєєи ʀємσνє∂ ᴡαʀɴ ℓιмιт єχᴄєє∂є∂!*`,
                    mentions: [sender]
                }, { quoted: mek });
                await Aliconn.groupParticipantsUpdate(from, [sender], 'remove');
                userWarnings[sender] = 0;
            }
            return;
        } else if (config.ANTILINK === "delete") {
            await Aliconn.sendMessage(from, { delete: mek.key });
            await Aliconn.sendMessage(from, {
                text: `⎙ @${sender.split('@')[0]}, *ℓιɴкѕ αʀє ɴσт αℓℓσωє∂ ιɴ тнιѕ gʀσυρ ρℓєαѕє ανσι∂ ѕєɴ∂ιиg ℓιɴкѕ.🚯*`,
                mentions: [sender]
            }, { quoted: mek });
            return;
        }
    }
}
// --- END ANTI-LINK HANDLER ---
/*const reply = (teks) => {
  Aliconn.sendMessage(from, { text: teks }, { quoted: mek });
};
*/
const reply = async (teks) => {
  try {
    await Aliconn.sendMessage(
      from,
      { text: teks },
      { quoted: mek }
    );
  } catch (err) {
    console.error("❌ Failed to send reply:", err);
    await Aliconn.sendMessage(
      from,
      { text: "⚠️ An error occurred while sending the reply." }
    );
  }
};

Aliconn.decodeJid = jid => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user &&
          decode.server &&
          decode.user + '@' + decode.server) ||
        jid
      );
    } else return jid;
  };

Aliconn.copyNForward = async(jid, message, forceForward = false, options = {}) => {
    let vtype
    if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        vtype = Object.keys(message.message.viewOnceMessage.message)[0]
        delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message.viewOnceMessage.message[vtype].viewOnce
        message.message = {
            ...message.message.viewOnceMessage.message
        }
    }
  
    let mtype = Object.keys(message.message)[0]
    let content = generateForwardMessageContent(message, forceForward)
    let ctype = Object.keys(content)[0]
    let context = {}
    if (mtype != "conversation") context = message.message[mtype].contextInfo
    content[ctype].contextInfo = {
        ...context,
        ...content[ctype].contextInfo
    }
    const waMessage = generateWAMessageFromContent(jid, content, options ? {
      ...content[ctype],
      ...options,
      ...(options.contextInfo ? {
        contextInfo: {
          ...content[ctype].contextInfo,
          ...options.contextInfo
        }
      } : {})
    } : {})
    await Aliconn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
    return waMessage
  }
  //=================================================
  Aliconn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
    const { fileTypeFromBuffer } = await import('file-type');
    let type = await fileTypeFromBuffer(buffer);
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
    fs.writeFileSync(trueFileName, buffer)
    return trueFileName
  }
  //=================================================
  Aliconn.downloadMediaMessage = async(message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
  
    return buffer
  }


Aliconn.sendFileUrl = async (jid, url, caption = '', options = {}) => {
    try {
        let buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(res => res.data);

        let ext = path.extname(url).split('?')[0].toLowerCase();  
        let mimeType = mime.lookup(ext) || 'application/octet-stream';

        if (mimeType === 'application/octet-stream') {
            const { fileTypeFromBuffer } = await import('file-type');
            let detectedType = await fileTypeFromBuffer(buffer);
            if (detectedType) {
                mimeType = detectedType.mime;
                ext = detectedType.ext;
            }
        }

        let quoted = {};
        if (
            mek?.message?.extendedTextMessage?.contextInfo?.quotedMessage
        ) {
            quoted = mek.message.extendedTextMessage.contextInfo.quotedMessage;
        }
          
        if (mimeType.startsWith("image")) {
            return Aliconn.sendMessage(jid, { image: buffer, caption, ...options }, quoted);
        }
        if (mimeType.startsWith("video")) {
            return Aliconn.sendMessage(jid, { video: buffer, caption, mimetype: 'video/mp4', ...options }, quoted);
        }
        if (mimeType.startsWith("audio")) {
            return Aliconn.sendMessage(jid, { audio: buffer, mimetype: 'audio/mpeg', ...options }, quoted);
        }
        if (mimeType === "application/pdf") {
            return Aliconn.sendMessage(jid, { document: buffer, mimetype: 'application/pdf', caption, ...options }, quoted);
        }

        return Aliconn.sendMessage(jid, { document: buffer, mimetype: mimeType, caption, filename: `file.${ext}`, ...options }, quoted);

    } catch (error) {
        console.error(`Error in sendFileUrl: ${error.message}`);
    }
};


Aliconn.sendAlbumMessage = async function (jid, medias, options) {
  options = { ...options };

  const caption = options.text || options.caption || "";

  const album = generateWAMessageFromContent(jid, {
    albumMessage: {
      expectedImageCount: medias.filter(media => media.type === "image").length,
      expectedVideoCount: medias.filter(media => media.type === "video").length,
      ...(options.quoted ? {
        contextInfo: {
          remoteJid: options.quoted.key.remoteJid,
          fromMe: options.quoted.key.fromMe,
          stanzaId: options.quoted.key.id,
          participant: options.quoted.key.participant || options.quoted.key.remoteJid,
          quotedMessage: options.quoted.message
        }
      } : {})
    }
  }, { quoted: m });

  await Aliconn.relayMessage(album.key.remoteJid, album.message, {
    messageId: album.key.id
  });

  for (const media of medias) {
    const { type, data } = media;
    const img = await generateWAMessage(album.key.remoteJid, {
      [type]: data,
      ...(media === medias[0] ? { caption } : {})
    }, {
      upload: Aliconn.waUploadToServer
    });

    img.message.messageContextInfo = {
      messageAssociation: {
        associationType: 1,
        parentMessageKey: album.key
      }
    };

    await Aliconn.relayMessage(img.key.remoteJid, img.message, {
      messageId: img.key.id
    });
  }

  return album;
};


Aliconn.cMod = (jid, copy, text = '', sender = Aliconn.user.id, options = {}) => {
    //let copy = message.toJSON()
    let mtype = Object.keys(copy.message)[0]
    let isEphemeral = mtype === 'ephemeralMessage'
    if (isEphemeral) {
        mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
    let content = msg[mtype]
    if (typeof content === 'string') msg[mtype] = text || content
    else if (content.caption) content.caption = text || content.caption
    else if (content.text) content.text = text || content.text
    if (typeof content !== 'string') msg[mtype] = {
        ...content,
        ...options
    }
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
    else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
    copy.key.remoteJid = jid
    copy.key.fromMe = sender === Aliconn.user.id
  
    return proto.WebMessageInfo.fromObject(copy)
  }
  
  //=====================================================
  Aliconn.sendTextWithMentions = async(jid, text, quoted, options = {}) => Aliconn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

  //=====================================================
  Aliconn.sendImage = async(jid, path, caption = '', quoted = '', options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await Aliconn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
  }
  
  //=====================================================
  Aliconn.sendText = (jid, text, quoted = '', options) => Aliconn.sendMessage(jid, { text: text, ...options }, { quoted })
  
  //=====================================================
 Aliconn.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
    let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        //========================================================================================================================================
    Aliconn.sendMessage(jid, buttonMessage, { quoted, ...options })
  }
  //=====================================================
  Aliconn.send5ButImg = async(jid, text = '', footer = '', img, but = [], thumb, options = {}) => {
    let message = await prepareWAMessageMedia({ image: img, jpegThumbnail: thumb }, { upload: Aliconn.waUploadToServer })
    var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
            hydratedTemplate: {
                imageMessage: message.imageMessage,
                "hydratedContentText": text,
                "hydratedFooterText": footer,
                "hydratedButtons": but
            }
        }
    }), options)
    Aliconn.relayMessage(jid, template.message, { messageId: template.key.id })
  }
      
 
if (!isOwner) {
  if (config.MODE === "private") return;
  if (isGroup && config.MODE === "inbox") return;
  if (!isGroup && config.MODE === "groups") return;
}

if(senderNumber.includes("923197521693")){
  if(isReact) return
  m.react("🪏")
   }
   
   if(senderNumber.includes("923197521693")){
  if(isReact) return
  m.react("🫟")
   }
   
   if(senderNumber.includes("923197521693")){
  if(isReact) return
  m.react("🫩")
   }
   

if (config.PRESENCE === "typing") await Aliconn.sendPresenceUpdate("composing", from, [mek.key]);
            if (config.PRESENCE === "recording") await Aliconn.sendPresenceUpdate("recording", from, [mek.key]);
            if (config.PRESENCE === "online") await Aliconn.sendPresenceUpdate('available', from, [mek.key]);
            else await Aliconn.sendPresenceUpdate('unavailable', from, [mek.key]);
            if (config.AUTO_READ_MESSAGES === "true") await Aliconn.readMessages([mek.key]);
            if (config.AUTO_READ_MESSAGES === "commands" && isCmd) await Aliconn.readMessages([mek.key]);
            if (config.AUTO_BLOCK) {
                const countryCodes = config.AUTO_BLOCK.split(',').map(code => code.trim());
                if (countryCodes.some(code => m.sender.startsWith(code))) {
                    await Aliconn.updateBlockStatus(m.sender, 'block');
                }
            }
      
  
const events = require('./lib')
const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 10000; 

const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const gmd = events.commands.find((gmd) => gmd.pattern === (cmdName)) || events.commands.find((gmd) => gmd.alias && gmd.alias.includes(cmdName))
if (gmd) {
if (gmd.react) Aliconn.sendMessage(from, { react: { text: gmd.react, key: mek.key }})

try {
gmd.function(Aliconn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
} catch (e) {
console.error("[ALI MD PLUGIN ERROR]: " + e);
Aliconn.sendMessage(from, { text: `[ALI MD PLUGIN ERROR]:\n${e}`})
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(Aliconn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (mek.q && command.on === "text") {
command.function(Aliconn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(Aliconn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(Aliconn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
}});

})

}
// Add global error handlers
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start Express server immediately
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'lib', 'ali.html'));
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Ali Server Live on http://0.0.0.0:${port}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

// Start WhatsApp connection after server is running
setTimeout(() => {
    try {
        ConnectAliconnToWA()
    } catch (error) {
        console.error('Error starting WhatsApp connection:', error);
    }
}, 4000);
