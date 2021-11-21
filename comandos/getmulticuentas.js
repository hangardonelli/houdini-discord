const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')
const message = require('../messageSender/msg.js');

async function obtenerMulticuentas(msg, cmd){

    let partes = msg.content.split(' ');
    try{
        
        let usuario = msg.content.replace(partes[0] + ' ', '');
     
        const resMulticuentas = await db.query(`SELECT * FROM  getMulticuentas('${usuario}');`);
      
       
        if(resMulticuentas.length < 1){
            msg.channel.send(configuration.messages.penguinNotFound);
            return false;
        }
        
        let multicuentasEncontradas = "";
        for(let i = 0; i < resMulticuentas.length; i++){
            multicuentasEncontradas = multicuentasEncontradas + resMulticuentas[i]._nickname + ` (${resMulticuentas[i]._penguin_id}) ` + "\n";
        }

        message.embed(msg.channel, `Las multicuentas encontradas son: \n ` + multicuentasEncontradas, cmd.descripcion);
    }
    catch(exception){
      
        msg.channel.send(configuration.messages.badRequest);
    }
}
module.exports = { obtenerMulticuentas };