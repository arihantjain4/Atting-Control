const Discord = require("discord.js");
const fs = require("fs");
const { Server } = require("http");
const { type } = require("os");
const { time } = require("console");
const prefix = "~";
const bot = new Discord.Client();
const token = "NzUwMzc1NTA4NDIzODY4NDc3.X05npg.9FU9OaJB8y_4xbKxe6ZLR-73iDA";
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

	if (err) {

		console.error(err);
	}

	let jsFiles = files.filter(f => f.split(".").pop() === "js");

	if (jsFiles.length <= 0) {

		console.error("No commands found.");
		return;

	}

	console.log("Loading Commands...");

	jsFiles.forEach((f, i) => {

		let props = require(`./commands/${f}`);
		bot.commands.set(props.help.name, props);

	});
});

bot.on("ready", async () => {
	console.log(`Atting Control Is Now Activated`);

	//Only works if bot is in the guild
	/*var server = bot.guilds.get("733411960556617821");
	console.log(server.name);*/
	
	//Bot Status
	bot.user.setActivity(`With Servers`);

	try {

		//Generates a invite link in the console...
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);

	} catch(e) {

		console.log(e.stack);

	}
});

bot.on("message", async message => { 
	if (message.author.bot) {

        return;

    }

	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	let args = messageArray.slice(1);

	let cmd = bot.commands.get(command.slice(prefix.length));

	if (cmd) {

		cmd.run(bot, message, args);

	}
	let filtereveryone = msg => {
		if (msg.mentions.everyone){
			return message.mentions.everyone && msg.author == message.author;
		}
		
	}
	if (message.mentions.everyone){
		message.channel.awaitMessages(filtereveryone, {time: 86400000, maxMatches: 3}).then(collected => {
			message.reply("You are mentioning everyone too much!");
		});
		message.channel.awaitMessages(filtereveryone, {time: 86400000, maxMatches: 5}).then(collected => {
			const mentioneveryonespammer = message.member;
			mentioneveryonespammer.kick();
			
		})
	}
	
	let filterdirect = msg1 => {
		if (msg1.mentions.users.first()){
			return message.mentions.users && msg1.author == message.author;
		}
	}
	if (message.mentions.users.first()){
		message.channel.awaitMessages(filterdirect, {time: 86400000, maxMatches: 20}).then(collected =>{
			message.reply(`You are mentioning ${msg1.mentions.users.first().tag} to much!`);
		});
		message.channel.awaitMessages(filterdirect, {time: 86400000, maxMatches: 25}).then(collected => {
			const mentiondirectspammer = message.member;
			mentiondirectspammer.kick();
		})
		
	}
	
	
});

bot.login(token);
