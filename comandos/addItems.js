const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')
const message = require('../messageSender/msg.js');


async function addItem(msg, cmd){

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

        const resItem = await db.query(`SELECT * FROM item WHERE id = ${itemId}`);
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


        const resCheckItem = await db.query(`SELECT * FROM penguin_item WHERE item_id = ${item.id} AND penguin_id = ${penguin.id}`);

        //Si el jugador ya tenía el item:
        if(resCheckItem.length > 0){
            message.embed(msg.channel, configuration.messages.itemExistsOnPlayer, cmd.descripcion);
            return false;
        }

        await db.query(`INSERT INTO penguin_item(penguin_id, item_id) VALUES (${penguin.id}, ${item.id})`);

        message.embed(msg.channel, configuration.messages.itemAdded
                                                                .replace('{ITEMNAME}', item.name)
                                                                .replace('{USERNAME}', username)
                                                                ,cmd.descripcion);
    }
    catch(exception){
        message.embed(msg.channel, configuration.messages.badRequest, cmd.descripcion);
    }
}

module.exports = { addItem };
