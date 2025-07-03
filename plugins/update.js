const { exec } = require('child_process');

module.exports = {
  name: 'update',
  async execute(client, message) {
    const jid = message.key.remoteJid;

    await client.sendMessage(jid, { text: '🔄 Fetching latest updates from GitHub...' });

    exec('git pull https://github.com/LMK360/LMK-AGENT002-MD-BOT/plugins.git', (err, stdout, stderr) => {
      if (err) {
        return client.sendMessage(jid, {
          text: `❌ Update failed:\nstderr`
        );
      

      client.sendMessage(jid, 
        text: `✅ Update complete!{stdout}\n\n🔁 Reload the bot or restart it to apply changes.`,
        footer: '🧠 LMK-AI Updater',
        templateButtons: [{
          urlButton: {
            displayText: '🔔 View Channel',
            url: 'https://whatsapp.com/channel/0029Vb5pEJW4inokD0IZiQ41'
          }
        }],
        headerType: 1
      });
    });
  }
};
