module.exports = {
  name: "ping",
  description: "Checks bot speed and status",
  async execute(client, message, args) {
    const responseTime = new Date().getTime() - message.messageTimestamp * 1000;

    const msg = {
      text: `┏━━━━━━━━━━━━━━━┓
┃    🏓 PING     ┃
┗━━━━━━━━━━━━━━━┛

✅ *Status:* Online
⚡ *Speed:* responseTime ms
🤖 *Bot:*{process.env.BOT_NAME || 'WhatsBot'}
_Use .menu to see all commands._`,
      footer: 'Click below to visit our WhatsApp Channel 👇',
      templateButtons: [
        {
          urlButton: {
            displayText: '🔔 View Channel',
            url: 'https://whatsapp.com/channel/0029Vb9ssBR9Bb63aJcFcl3Q'
          }
        }
      ],
      headerType: 1
    };

    await client.sendMessage(message.key.remoteJid, msg);
  }
};
