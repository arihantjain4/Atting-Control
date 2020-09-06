const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {
        // Start stuff
        
        //End Stuff
        message.delete(1000);
        if (message){
            
        }

    } catch(e) {

        console.log(e.stack);

    }
}

module.exports.help = {

    name: "noise",
    desc: "Play a noise"

}
