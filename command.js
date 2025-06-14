const fs = require('fs');
const path = require('path');

const commands = {};

const pluginsDir = path.join(__dirname, 'plugins');

fs.readdirSync(pluginsDir).forEach(file => {
  if (file.endsWith('.js')) {
    const cmdName = file.split('.')[0];
    commands[cmdName] = require(`./plugins/file`);
  );

module.exports = commands;
