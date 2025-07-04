//===================REQUIRED MODULES=======================
const {
  default: makeWASocket,
  useSingleFileAuthState,
  DisconnectReason,
  Boom
} = require('@whiskeysockets/baileys');

const fs = require('fs');
const path = require('path');
const express = require("express");
const File = require("megajs").File;
const config = require("./config");

//===================SESSION-AUTH============================
const sessionPath = path.resolve(__dirname, 'sessions', 'creds.json');
const { state, saveState } = useSingleFileAuthState(sessionPath);

async function loadSessionFromMega() {
  if (!fs.existsSync(sessionPath)) {
    if (!config.SESSION_ID) {
      console.log('❌ Please add your SESSION_ID to config.js');
      process.exit(1);
    }

    const sessData = config.SESSION_ID.replace("IK~", '');
    const file = File.fromURL(`https://mega.nz/file/${sessData}`);

    try {
      console.log('🔄 Downloading session from Mega...');
      const data = await new Promise((resolve, reject) => {
        file.download((err, data) => {
          if (err) reject(err);
          
      const data = await new Promise((resolve, reject) => {
  file.download((err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

fs.mkdirSync(path.dirname(sessionPath), { recursive: true });
fs.writeFileSync(sessionPath, data);
      console.log("✅ Session downloaded successfully!");
     catch (e) 
      console.error('❌ Failed to download session:', e);
      process.exit(1);
    

//===================START EXPRESS SERVER=====================
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Bot is Running...'));
app.listen(port, () => console.log(`🌐 Server listening on port{port}`));

//===================START BOT==============================
async function startBot() {
  await loadSessionFromMega();

  const client = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  client.ev.on('creds.update', saveState);

  client.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== 401;
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ Bot connected!');

      //=================WELCOME MESSAGE===========================
      const welcome = {
        text: `🎉 *Bot Activated!*\n\n🔗 *Channel:* https://whatsapp.com/channel/0029Vb9ssBR9Bb63aJcFcl3Q'\n📦 *Repo:* https://github.com/LMK360/LMK-AGENT002-MD-BOT
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃      🤖 Welcome to WhatsBot!         ┃
┃--------------------------------------┃
┃*BEST MULTI-DEVICE BOT*
┃ 📺 YouTube Channel: youtube.com/@yourchannel
┃ 🌐 Website: yourwebsite.com
┃✅ You’ve chosen the BEST WhatsApp bot! 🎉
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`,
        contextInfo: {
          externalAdReply: {
            title: "LMK-AGENT002 BOT",
            body: "Your powerful WhatsApp assistant",
            thumbnailUrl: "https://example.com/image.jpg", 
            sourceUrl: "https://github.com/YourUser/YourRepo",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      };
      client.sendMessage(`${config.OWNER_NUMBER}@s.whatsapp.net`, welcome);
    }
  });

  //=================MESSAGE HANDLER===========================
  client.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (text === "!ping") {
      client.sendMessage(msg.key.remoteJid, { text: "🏓 Pong!" });
    }
  });
          }
    startBot();
