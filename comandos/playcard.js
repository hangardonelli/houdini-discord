const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')


async function obtenerPlaycard(msg, cmd){
    let usuario = msg.content.split(' ')[1];
    const rows = await db.query(`SELECT * FROM PENGUIN where username = lower('${usuario}')`);

    try{
    if(rows.length > 0){
        const friends = await db.query(`SELECT COUNT(*) FROM buddy_list bl INNER JOIN penguin p ON p.id = bl.penguin_id WHERE username = lower('${usuario}')`);
        const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const registrationDate = rows[0].registration_date.toLocaleDateString('es-AR', dateOptions)
        const playcardEmbed = new MessageEmbed()
        .setColor(configuration.color)
        .setTitle(configuration.name)
        .setDescription('Esta es la información del pingüino')
        .addFields(
            { name: 'Nombre', value: rows[0].nickname },
            { name: 'Id', value: '' + rows[0].id, inline: true },
            { name: 'Mail', value: rows[0].email, inline: true },
            { name: 'Registro', value: registrationDate},
            { name: 'Amigos', value: friends[0].count, inline: true},
        )
        .addField('Monedas', '' + rows[0].coins, true)
        .setTimestamp()
    
    msg.channel.send({ embeds: [playcardEmbed] });
    }
}
catch(exception){}
}

module.exports = { obtenerPlaycard };


