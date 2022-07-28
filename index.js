const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config/config.json')

require('colors')
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, //es para algo mas adelante :) //Ö
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    ],
})
async function presence () {
    client.user.setActivity(
        `Prefix: ${config.prefix} | **!!help**`,
        { type: "WATCHING" },
        { status: "dnd" }
      );
    console.log("Presence activated!")
};

client.on("ready", () => {
    

    presence();
})
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function requerirhandlers(){
    ["command", "events"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch(e){
            console.warn(e)
        }
    })
}
requerirhandlers();



client.on("message", (message) => {

   
    

})

client.login(config.token).catch(() => console.log(`-[X]- NO HAS ESPECIFICADO UN TOKEN VALIDO -[X]-`.red))
