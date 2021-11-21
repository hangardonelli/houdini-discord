const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')
const message = require('../messageSender/msg.js');


async function addFurniture(msg, cmd){

 try{
        let partes = msg.content.split(' ');
        if(partes.length < 3){
            message.embed(configuration.messages.badRequest, cmd.descripcion);
            return false;
        }
        const itemId = partes[1];
        
        partes.shift();
        partes.shift();
        
        const username = partes.join(' ').trim();

        const resItem = await db.query(`SELECT * FROM furniture WHERE id = ${itemId}`);
        const resPenguin = await db.query(`SELECT * FROM penguin WHERE username = lower('${username}')`);
        
        //Si no encuentra el item solicitado:
        if(resItem.length < 1){
            message.embed(msg.channel, configuration.messages.itemNotfound.replace('{ITEMID}', itemId), cmd.descripcion);
            return false;
        }

        //Si no encuentra al pingüino solicitado:
        if(resPenguin.length < 1){
            message.embed(msg.channel, configuration.messages.penguinNotFound, cmd.descripcion);
            return false;
        }


    
        const item = resItem[0];
        const penguin = resPenguin[0];


        const resCheckItem = await db.query(`SELECT * FROM penguin_furniture WHERE furniture_id = ${item.id} AND penguin_id = ${penguin.id}`);

        //Si el jugador ya tenía el item:
        if(resCheckItem.length > 0){
            await db.query(`UPDATE penguin_furniture SET quantity = quantity + 1 WHERE penguin_id = ${penguin.id} AND furniture_id = ${item.id}`);
        }
        else{
            await db.query(`INSERT INTO  penguin_furniture(penguin_id, furniture_id, quantity) VALUES (${penguin.id}, ${item.id}, 1)`);
        }
       

        message.embed(msg.channel, configuration.messages.itemAdded
                                                                .replace('{ITEMNAME}', item.name)
                                                                .replace('{USERNAME}', username)
                                                                ,cmd.descripcion);
        }
    catch(exception){
        message.embed(msg.channel, configuration.messages.badRequest, cmd.descripcion);
    }
 
}

module.exports = { addFurniture };
