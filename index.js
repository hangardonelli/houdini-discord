const { Client, Intents } = require('discord.js');
const configuration = require('./config.json');
const {comandos} = require('./commands.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });



client.once('ready', () => {
    console.log('maggy atr funcionado rey 😎!'); 
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return false; 
  
    console.log(`Mensaje de: ${message.author.username}: ${message.content}`);
    let cmd = comandos.find(c => message.content.split(' ').length > 0 
                                && c.nombre == message.content.substr(1).split(' ')[0] 
                                && message.content.startsWith(configuration.prefix) 
                            );
    
    if(cmd != undefined && !configuration.filter.some(f => message.content.toLowerCase().includes(f))){
       if(cmd.roles == undefined || cmd.roles.length == 0){
        console.log(cmd.accion(message, cmd));
       }
       else{
         for(let i = 0; i < cmd.roles.length; i++){
             console.log(cmd.roles[i]);
            if(message.member.roles.cache.some(r => r.id == cmd.roles[i])){
                console.log(cmd.accion(message, cmd));
                break;
               }
         }
       }
    }
   
  });
  
 
client.login(configuration.token);