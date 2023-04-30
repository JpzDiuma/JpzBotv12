const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');
const colors = require('colors')
require('discord-inline-reply')

const config = require('./config.json');

const client = new Discord.Client({ disableEveryone: true });

// Handler de comandos
fs.readdir('./src/commands', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let eventName = file.substring(0, file.indexOf('.js'))
  })
})

// HANDLER EVENTS
fs.readdir('./src/events', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let eventName = file.substring(0, file.indexOf('.js'))
    let eventModule = require(path.join(__dirname, './src/events', eventName))
    client.on(eventName, eventModule.bind(null, client))
  })
})
client.on('ready', () => {
  console.log('Estou online');
  var tabela = [
      {
          name: config.atividade,
          type: 'PLAYING'  
      },
  ];

function setStatus() {
      var altstatus = tabela[Math.floor(Math.random() * tabela.length)];
      client.user.setActivity(altstatus);
  }
  setStatus('online');
  setInterval(() => setStatus(), 5000);
});
client.login(config.token)


client.on("guildMemberAdd", async (member) => {

  let cargo = member.guild.roles.cache.get(config.welcomecargo);  // Procurando cargo no servidor.

  if (!cargo) return console.log(`O cargo configurado no script, não existe no servidor ${member.guild.name}.`); // Verificando se o cargo existe.

  try {
      member.roles.add(cargo.id) // Enviando o cargo para o usuário.
  } catch (e) {
      console.log("Autorole:\n"+e) // Enviando erros ao console.
  }

})