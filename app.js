const { exec } = require('child_process');
const fs = require("fs");
const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");

// Auto install dependencies
exec('npm install', (err, stdout, stderr) => {
  if (err) return console.error(`❌ Install error:\nstderr`);
  console.log(`✅ Dependencies installed:{stdout}`);

  // Start PM2
  exec('pm2 start index.js --name "bot" --watch', (err, stdout, stderr) => {
    if (err) return console.error(`❌ PM2 start error:\nstderr`);
    console.log(`🚀 Bot started/restarted with PM2:{stdout}`);
  });
});

// ============ WhatsApp Bot ============

const { state, saveState } = useSingleFileAuthState("./auth.json");

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (text === "hi") {await sock.sendMessage(msg.key.remoteJid, { text: "Hello! I’m alive!" });
    }
  });
}

startBot();
