const express = require('express')
const app = express()
const querystring = require('querystring');
const schedule = require('node-schedule');
const bodyParser = require("body-parser");
const router = express.Router();
const color = ('cc2929')

require('discord-reply');
var snipe = false

const axios = require('axios');


function post(stuff) {
axios.post('https://moscagui.000webhostapp.com/DeleteTest2.php', {
        insert: stuff
    }).then(function(response) {
        console.log(response.data)
    });
}

function sendAbuserData(stuff) {
    axios.post('https://moscagui.000webhostapp.com/AbuserEndpoint.php', {
        data: stuff
    }).then(function(response) {
        console.log(response.data)
    });
}

function deleteAbuserData(url) {
    axios.post(url, {
        test: "hola"
    }).then(function(response) {
        console.log(response.data)
    });
}



function deleteAbuserData2(stuff) {
    axios.post('https://moscagui.000webhostapp.com/DeleteTest2.php', {
        delete: stuff
    }).then(function(response) {
        console.log(response.data)
    });
}


function keygen() {
    var key = "";
    var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 30; i++)
        key += random.charAt(Math.floor(Math.random() * random.length));

    return key;
}

    async function makeGetRequest() {
        let payload = {
            'key': keygen()
        };
        let res = await axios.post('http://mosca-hub.xyz/PrisonLife/keygen.php', payload);
        let data = res.data;

        const embed = new MessageEmbed()

            .setTitle("Mosca-Hub V2 Key generator")
            .setDescription('The daily key have been generated.')
            .setColor(color)
            .addField('New Key:', "```\n" + data + "\n```")
        const tgtchannel = client.channels.cache.find(channel => channel.id === "885965075846955018")
        tgtchannel.send(embed)
        console.log(data);
    }

    function regen() {
        console.log("Action executed.");
        client.channels.fetch('885965075846955018').then(channel => {
            channel.bulkDelete(5);
            makeGetRequest()
        })
    }


const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
} = require("discord.js");
const client = new Client();
const mySecret = process.env['token'];
const prefix = ('.')
const script = process.env['script'];
const comillas = process.env['comillas']

function presence() {
    client.user.setPresence({
        status: "dnd",
        activity: {
            name: "Viendo Mosquitas",
            type: "PLAYING"
        }
    });
}

client.on("ready", () => {
    console.log("Mosca-Hub Bot Launched");
    //client.guilds.cache.forEach(guild => {
 // console.log(guild.name);
 //  setInterval(function(){ 
   // regen()
//}, 1000);
//})
   
    presence();
});

var keysita = "";
var verifydebounce = false
client.on("message", async message => {


    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    //comandos
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    //

    function getUserFromMention(mention) {
        if (!mention) return;

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }

            return client.users.cache.get(mention);
        }
    }

  if (command === ('createchannel')){
    if (!message.member.hasPermission("MUTE_MEMBERS")) return
    for (let i = 0; i < 2; i++) {
    message.guild.channels.create('test',{type: 'text'})
}
  }

if (command === ('idea')){
  var argsss = message.content.split(' ')
  var arg1 = argsss[1]

    for (var i = 2; i < argsss.length; i++) {
            arg1 = arg1 + ' ' + argsss[i]
    }

  if (message.channel.id === "905548148162826261") {
    
  if (!arg1) return message.channel.send('please specify your idea')
const embed = new MessageEmbed()
.setTitle('New Script Idea')
.setDescription(arg1)
.setFooter('Idea by '+message.author.tag)
.setColor(color)
.setTimestamp()
  
  message.channel.send(embed).then(messageReaction => {
  messageReaction.react("✅")
  messageReaction.react("❎")
})
  }

  }


  if (command === ('avatartest')){
  axios.get('http://api.roblox.com/users/1394531856').then(rr => {
  message.channel.send(rr.data['Username'])
  })
  }

  if (command === 'encrypt'){
    var arg1 = message.content.split(' ')[1]

    if (arg1){
 
axios.post('https://encrypterjs.a1break.repl.co', {
        toEncrypt: arg1
    }).then(function(response) {
        console.log(response.data)
});

    }else{
      message.channel.send('specift something to encrypt')
    }
  }

    if (command === ("argtest")) {
        const arg = message.content.split(' ')
        const arg1 = arg[1]
        const arg2 = arg[2]
        const arg3 = arg[3]

        if (arg[1]) {
            message.channel.send(arg[1])
        } else {
            message.channel.send("you didnt specified a word to repeat")
        }
    }

    console.log(message.author.tag)

    if (command === ('count')) {
        var arg = message.content.split(' ')
        var bigarg = arg[1]

        for (var i = 2; i < arg.length; i++) {
            bigarg = bigarg + ' ' + arg[i]
        }
        console.log(bigarg)
    }

    if (command === ('repeat')) {
        var arg = message.content.split(' ')
        var bigarg = arg[1]

        for (var i = 2; i < arg.length; i++) {
            bigarg = bigarg + ' ' + arg[i]
        }
        if (!bigarg) {
            message.channel.send('you didnt specified what you want me to say')
        } else {
if (bigarg.includes("@here") || bigarg.includes("@everyone")){
   return  message.channel.send('stop')
}else{
            message.channel.send(bigarg)
}
        }
    }

    if (command === ('snipelog')) {
        var arg = message.content.split(' ')
        if (!arg[1]) {
            message.channel.send('you didnt specified a boolean')
        } else {
            if (arg[1] === 'on') {
                snipe = true
                message.channel.send(snipe)
            } else {
                if (arg[1] === 'off') {
                    snipe = false
                    message.channel.send(snipe)
                }
            }
        }
    }

    if (command === ('post')) {
        var arg = message.content.split(' ')
        var bigarg = arg[1]

        for (var i = 2; i < arg.length; i++) {
            bigarg = bigarg + ' ' + arg[i]
        }

        if (!message.member.hasPermission("MUTE_MEMBERS")) {
        
            const embed = new MessageEmbed()
                .setTitle(":warning: Error")
                .setDescription('You dont have the required permissions')
                .setColor(color)
            return message.channel.send(embed);
        } else {
            if (!bigarg) {
                const embed = new MessageEmbed()
                    .setTitle(":warning: Error")
                    .setDescription('you didnt specified what you want me to post')
                    .setColor(color)
                return message.channel.send(embed);
            } else {
                post(bigarg)
                const embed = new MessageEmbed()
                    .setTitle("Mosca-Hub V2 Key Post request")
                    .setDescription('Succesfully posted')
                    .setColor(color)
                    .addField('Arguments:', "```\n" + bigarg + "\n```")
                message.channel.send(embed)
            }
        }
    }

        if (command === ('delete')) {
        var arg = message.content.split(' ')
        var bigarg = arg[1]

        for (var i = 2; i < arg.length; i++) {
            bigarg = bigarg + ' ' + arg[i]
        }

        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            const embed = new MessageEmbed()
                .setTitle(":warning: Error")
                .setDescription('You dont have the required permissions')
                .setColor(color)
            return message.channel.send(embed);
        } else {
            if (!bigarg) {
                const embed = new MessageEmbed()
                    .setTitle(":warning: Error")
                    .setDescription('you didnt specified what you want me to post')
                    .setColor(color)
                return message.channel.send(embed);
            } else {
                deleteAbuserData2(bigarg)
                const embed = new MessageEmbed()
                    .setTitle("Mosca-Hub V2 Key Post request")
                    .setDescription('Succesfully posted')
                    .setColor(color)
                    .addField('Arguments:', "```\n" + bigarg + "\n```")
                message.channel.send(embed)
            }
        }
    }


    if (command === 'mute') {
        var cont = message.content
        var arg = cont.split(' ')
        var muted_role = '864961122280538112'
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            const embed = new MessageEmbed()
                .setTitle(":warning: Error")
                .setDescription('You dont have the required permissions')
                .setColor(color)
            return message.channel.send(embed);
        } else {
            if (!arg[1]) {
                const embed = new MessageEmbed()
                    .setTitle(":warning: Error")
                    .setDescription('You did not specify who you want to mute')
                    .setColor(color)
                return message.channel.send(embed);
            } else {
                const member = message.mentions.members.first() || message.guild.members.cache.get(arg[1]);
                if (member) {
                    if (member.roles.cache.has(muted_role)) {
                        const embed = new MessageEmbed()
                            .setTitle(":warning: Error")
                            .setDescription('That member is alredy muted')
                            .setColor(color)
                        return message.channel.send(embed);
                    } else {
                        const user = getUserFromMention(arg[1]);
                        const embed = new MessageEmbed()
                            .setTitle("Someone has been muted")
                            .setDescription(`<@${member.id}> has been muted`)
                            .setColor(color)
                            .addField('Moderator:', message.author.username)
                            .setThumbnail(user.displayAvatarURL({
                                dynamic: true,
                                size: 512
                            }))
                            .setColor(color)
                        member.roles.add(muted_role)
                        message.channel.send(embed)
                    }
                }
            }
        }
    }

    if (command === 'unmute') {
        var cont = message.content
        var arg = cont.split(' ')
        var muted_role = '864961122280538112'
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            const embed = new MessageEmbed()
                .setTitle(":warning: Error")
                .setDescription('You dont have the required permissions')
                .setColor(color)
            return message.channel.send(embed);
        } else {
            if (!arg[1]) {
                const embed = new MessageEmbed()
                    .setTitle(":warning: Error")
                    .setDescription('You did not specify who you want to unmute')
                    .setColor(color)
                return message.channel.send(embed);
            } else {
                const member = message.mentions.members.first() || message.guild.members.cache.get(arg[1]);
                if (member) {
                    if (!member.roles.cache.has(muted_role)) {
                        const embed = new MessageEmbed()
                            .setTitle(":warning: Error")
                            .setDescription('That member is not muted')
                            .setColor(color)
                        return message.channel.send(embed);
                    } else {
                        const user = getUserFromMention(arg[1]);
                        const embed = new MessageEmbed()
                            .setTitle("Member unmuted")
                            .setDescription(`<@${member.id}> has been unmuted`)
                            .setColor(color)
                            .addField('Moderator:', message.author.username)
                            .setThumbnail(user.displayAvatarURL({
                                dynamic: true,
                                size: 512
                            }))
                            .setColor(color)
                        member.roles.remove(muted_role)
                        message.channel.send(embed)
                    }
                }
            }
        }
    }

    if (command === ("kick")) {
        var cont = message.content
        var arg = cont.split(' ')

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setTitle(":warning: Error")
                .setDescription('You dont have the required permissions')
                .setColor(color)
            return message.channel.send(embed);
        } else {
            if (!arg[1]) {
                const embed = new MessageEmbed()
                    .setTitle(":warning: Error")
                    .setDescription('You did not specify who you want to kick')
                    .setColor(color)
                return message.channel.send(embed);
            } else {
                const user = message.mentions.members.first() || message.guild.members.cache.get(arg[1]);
                message.channel.send("Succesfully kicked")
                user.kick()
            }
        }
    }

    if (command === ("website")) {
        message.channel.send("https://sites.google.com/view/mosca-hub/about");
    }

   if (command === ("tumama")) {
const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(2)
					.setMaxValues(3)
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
						{
							label: 'I am also an option',
							description: 'This is a description as well',
							value: 'third_option',
						},
					])
			);
    await message.channel.send(row)
    }

if (command === ("verify")) {
if (message.channel.type === 'dm'){

}else{
message.lineReplyNoMention(`Check your dm's`)
}

const msg = await message.author.send(`Hello ${message.author.username}, to get verified just give me your roblox username`);
const filter = collected => collected.author.id === message.author.id;
const collected = await msg.channel.awaitMessages(filter, {
    max: 1,
    time: 30000,
}).catch(() => {
    message.author.send('Timeout');
});

const newmsg = await collected.first().content 

axios.get('https://api.roblox.com/users/get-by-username?username=' + newmsg).then(respons => {
  if(respons.data['Username']){
    var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 30; i++)
    keysita += random.charAt(Math.floor(Math.random() * random.length));
  
  msg.channel.send(`Ok, now to verify that it is you, put this key in your profile` +'`\n' + keysita + '\n`')
  
  verifydebounce = true
  }else{
    msg.channel.send('Error, invalid username')
  }
});
//message.author.send('Done !');
}

if (message.content === 'update'){
  //if (debounce === null) return
  if (message.channel.type === 'dm') {
   if (verifydebounce === true){
    verifydebounce = false
   // var args = message.content.split(" ")
   // var arg1 = args[1]

   }
  }

}

    if (command === ("delete")) {
        deleteAbuserData('https://moscagui.000webhostapp.com/DeleteTest.php')
    }

      
  if (command === ('rules')){
    const embed1 = new MessageEmbed()
    .setColor(color)
    .setImage("https://cdn.discordapp.com/attachments/896535198882218014/899355497835139143/Diseno_sin_titulo.gif")
    const embed2 = new MessageEmbed()
    .setColor(color)
    .setTitle("These are the rules from our server")
    .setDescription(`
    ** ➡  if you dont want to be penalized then follow the respective rules.**

・Be respetful with other members
・Dont share other invite links
・Dont talk other scripts that not are partnershiped
・NSFW is not allowed outside <#852725862574063616>
・No flood outside <#868679897290264596>
`)
.setFooter("The penalty types are mute, kick, ban, and permanent script blacklist.")
 message.channel.send(embed1)
message.channel.send(embed2)
  }


    if (command === ("imagesnipe")){
       if (deletedUrl === null){
           const embed = new MessageEmbed()
                .setTitle("Image Snipe")
                .setDescription(`:warning: Error, There's no image to snipe!`)
                .setColor(color)
            return message.channel.send(embed);
        }else{

          const embed = new MessageEmbed()
        .setTitle("Image Deleted")
        .setColor(color)
        .setColor(color)
        .setTimestamp()
        .setFooter(deletedAuthor.tag, deletedAuthor.avatarURL())
        .setTimestamp()
        .setImage(deletedUrl)
        message.channel.send(embed)
        }
    }

    if (command === ("snipe")) {
        if (deletedMsg === null) {
            const embed = new MessageEmbed()
                .setTitle("Message Snipe")
                .setDescription(`:warning: Error, There's nothing to snipe!`)
                .setColor(color)
            return message.channel.send(embed);
        } else {

            const embed = new MessageEmbed()
                .setTitle("Message Deleted")
                .setColor(color)
                .addField("Content", deletedMsg)
                .setColor(color)
                .setTimestamp()
                .setFooter(deletedAuthor.tag, deletedAuthor.avatarURL())
                .setTimestamp();
            message.channel.send(embed)
        }
    }
    if (command === ("editsnipe")) {
    const member = client.users.cache.get(message.author.id)

  var cantuse = ['qeq#2378', 'tres', 'cuatro'];
  if (cantuse.includes(member.tag)){
      return message.channel.send('para perra')
  }
        if (editedMsg === null) {
            const embed = new MessageEmbed()
                .setTitle("Message Edited")
                .setDescription(`:warning: Error, There's nothing to snipe!`)
                .setColor(color)
            return message.channel.send(embed);
        } else {

            const embed = new MessageEmbed()
                .setTitle("Message Edited")
                .setColor(color)
                .addField("Content", editedMsg)
                .setColor(color)
                .setTimestamp()
                .setFooter(editedAuthor.tag, editedAuthor.avatarURL())
                .setTimestamp();
            message.channel.send(embed)
        }
    }

    if (command == ('cmds')) {

    }

    if (command === ("keygen")) {
        if (message.member.roles.cache.has("866159617595408404")) {
            makeGetRequest();
        } else {
            const embed = new MessageEmbed()

                .setTitle("Mosca-Hub V2 Key generator")
                .setDescription(':warning: Error, you dont have the required role')
                .setColor(color)
            message.channel.send(embed);
        }
    }

    if (command === "clear") {
        async function clear() {
            message.delete();
            message.channel.bulkDelete(1);
        }
        clear();
    }

    if (command === "regentest") {
        if (message.member.roles.cache.has("866159617595408404")) {
            regen();
        } else {
            const embed = new MessageEmbed()

                .setTitle("Mosca-Hub V2 Key generator")
                .setDescription(':warning: Error, you dont have the required role')
                .setColor(color)
            message.channel.send(embed);
        }
    }

    schedule.scheduleJob('0 */12 * * *', function() {
        console.log('job runned');
        regen();
    });

    if (command === ("regenkey")) {
        if (message.member.roles.cache.has("866159617595408404")) {
            const embed = new MessageEmbed()
                .setTitle("Mosca-Hub V2 Key generator")
                .setDescription('The Script key have been regenerated.')
                .setColor(color)
                .setFooter('This command only can be runed by the owner, a dev or a mod')
            message.channel.send(embed)
            makeGetRequest();
        } else {
            const embed = new MessageEmbed()
                .setTitle("Mosca-Hub V2 Key generator")
                .setDescription(':warning: Error, you dont have the required role')
                .setColor(color)
            message.channel.send(embed);
        }
    }

    if (command === ("momazo")) {
        message.channel.send("https://cdn.discordapp.com/attachments/869131516666605598/873238691244564530/unknown.png");
    }

    if (command === ("get")) {
        if (!args[0]) {
            message.channel.send("No especificaste el link");
        } else {
            axios.get(args[0]).then(resp => {
                message.channel.send(resp.data);
            });
        }
    }

    if (command === ("abusers")) {
        axios.get('https://moscagui.000webhostapp.com/AbuserDatabase.txt').then(resp => {
            const embed = new MessageEmbed()

                .setTitle("Mosca-Hub Abusers List")
                .setColor(color)
                .addField('Current Abusers', "```\n" + resp.data + "\n```")
            message.channel.send(embed);
        });
    }

    if (command === 'avatar') {
        if (args[0]) {
            const user = getUserFromMention(args[0]);
            if (!user) {
                return message.reply('Please use a mention if you want to see someone avatar.');
            }

            const embed = new MessageEmbed()
                .setTitle(":fly: **Mosca-Hub Avatar Viewer**")
                .setDescription(`${user.username}'s avatar:`)
                .setThumbnail("https://cdn.discordapp.com/attachments/839972095861719042/872892112511860756/logo_1.png")
                .setColor(color)
                .setImage(user.displayAvatarURL({
                    dynamic: true,
                    size: 512
                }))
                .addField("Imagen Completa:", "[Click Aqui](" + user.displayAvatarURL() + ")")
                .setFooter('Solicitado por: ' + message.member.displayName, message.author.avatarURL())
                .setTimestamp();

            return message.channel.send(embed);
        }

        const embed2 = new MessageEmbed()
            .setTitle(":fly: **Mosca-Hub Avatar Viewer**")
            .setDescription(`${message.author.username}, your avatar:`)
            .setThumbnail("https://cdn.discordapp.com/attachments/839972095861719042/872892112511860756/logo_1.png")
            .setColor(color)
            .setImage(message.author.displayAvatarURL({
                dynamic: true,
                size: 512
            }))
            .addField("Imagen Completa:", "[Click Aqui](" + message.author.displayAvatarURL() + ")")
            .setFooter('Solicitado por: ' + message.member.displayName, message.author.avatarURL())
            .setTimestamp();

        return message.channel.send(embed2);

    }

    if (command === ("moscahub")) {

        const embed = new MessageEmbed()
            .setTitle(':fly: **Mosca-Hub Script | Version: 1.7**')
            .setDescription("```lua\n--[[\n  __  __                     _   _       _     \n |  \\/  | ___  ___  ___ __ _| | | |_   _| |__  \n | |\\/| |/ _ \\/ __|/ __/ _` | |_| | | | | '_ \\ \n | |  | | (_) \\__ \\ (_| (_| |  _  | |_| | |_) |\n |_|  |_|\\___/|___/\\___\\__,_|_| |_|\\__,_|_.__/ \n                                               \n--]]\n\nloadstring(game:HttpGet(\"https://moscarblxontop.000webhostapp.com/MoscaHub\",true))()\n```")
            .setColor(color)
            .addField("Have fun :wink: :yum:")
            .setThumbnail('https://cdn.discordapp.com/attachments/839972095861719042/872892112511860756/logo_1.png')
            .setFooter('Solicitado por: ' + message.member.displayName, message.author.avatarURL())
            .setTimestamp();
        message.channel.send(embed);
    }

    if (command === ("info")) {

        const embed = new MessageEmbed()
            .setTitle(':fly: **Mosca-Hub Server Info**')
            .setColor(color)
            .setDescription('Información actual del servidor | Server Actual info')
            .addField('Nombre del servidor', message.guild.name, true)
            .addField('Miembros', message.guild.memberCount, true)
            .setThumbnail('https://cdn.discordapp.com/emojis/872860496812986419.png?v=1')
            .setImage('https://cdn.discordapp.com/attachments/839972095861719042/872892112511860756/logo_1.png')
            .addField('Mosca-Hub Website', "https://sites.google.com/view/mosca-hub/about")
            .addField('Mosca-Hub Group', "https://sites.google.com/view/mosca-hub/about")
            .setFooter('Solicitado por: ' + message.member.displayName, message.author.avatarURL())
            .setTimestamp();
        message.channel.send("<@" + message.member.user.id + ">", embed);
    }
if (command === 'whois') {
    var sliced = message.content.split(' ')
    var user = sliced[1]
    var userid
    if (!user) {
        const embed = new MessageEmbed()
            .setTitle(":warning: Error")
            .setDescription('Please specify a valid roblox user.')
            .setColor(color)
            return message.channel.send(embed)
    }

            const waitingembed = new MessageEmbed()
            .setTitle("🔎 Searching user")
            .setDescription('Loading api')
            .setColor(color)

            const newembed = new MessageEmbed()
            .setTitle("> :ballot_box_with_check:  Success!")
            .setDescription('Loading Info')
            .setColor(color)

            

        axios.get('https://api.roblox.com/users/get-by-username?username=' + user).then(resp => {
            const response = resp.data
            if (response['Id']) {

  message.channel.send(waitingembed).then(m => {
  setTimeout(() => {
   m.edit(newembed)

   
  setTimeout(() => {

                axios.get('https://users.roblox.com/v1/users/' + response['Id']).then(resp => {
                    const result = resp.data
                    axios.get('https://friends.roblox.com/v1/users/' + response['Id'] + '/friends/count').then(respp => {
                        const newre = respp.data
                        axios.get(`https://api.roblox.com/users/${response['Id']}/onlinestatus/`).then(tumamita => {
                            var status = tumamita.data['LastLocation']

                            if (status === 'Offline') {
                                status = ':white_circle: | Offline'
                            }

                            if (status === 'Online') {
                                status = ':blue_circle: | Online'
                            }

                            if (status === 'Creating') {
                                status = ':orange_circle: | Roblox Studio'
                            }

                            if (status === 'Playing') {
                                status = ':green_circle: | Playing'
                            }

                            const statusresp = tumamita.data
                            axios.get('https://friends.roblox.com/v1/users/' + response['Id'] + '/followers/count').then(resppo => {
                                const follresp = resppo.data
                                const embed = new MessageEmbed()
                                    .setTitle(result['name'] + " [" + result['displayName'] + ']')
                                    .setThumbnail('https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=' + result['name'])
                                    .addField('> Display Name', "» `" + result['displayName'] + "`")
                                    .addField('> User ID', "» `" + result['id'] + "`")
                                    .addField('> Description» ', "» " + result['description'])
                                    .addField('> Friends', "» `" + newre['count'] + "`")
                                    .addField('> Followers', "» `" + follresp['count'] + "`")
                                    .addField('> Banned', "» `" + result['isBanned'] + "`")
                                    .addField('> Created At', "» `" + result['created'].split('T')[0] + "`")
                                    .addField('> Status', "» " + status + "")
                                    .addField('> Last Online', "» `" + statusresp['LastOnline'].split('T')[0] + "`")
                                    .setColor(color)
                                    .setURL('https://www.roblox.com/users/' + result['id'] + '/profile')
                                message.channel.send(embed);
                            })
                        })
                    })
                })

                   m.delete()

  }, 500) //Tiempo en milisegundos: 1s = 1000.
   
  }, 1000) //Tiempo en milisegundos: 1s = 1000.
})
            } else {

  message.lineReplyNoMention(waitingembed).then(m => {
  setTimeout(() => {

    const newembedd = new MessageEmbed()
    .setTitle(":warning: Error")
                .setDescription('Invalid Username.')
                .setColor(color)
   m.edit(newembedd)
  }, 1000) //Tiempo en milisegundos: 1s = 1000.
})
            }
        })

}

if (command === 'groupinfo'){
  var sliced = message.content.split(' ')
  var group = sliced[1]

   if (!group){
        const embed = new MessageEmbed()
                .setTitle(":warning: Error")
                .setDescription('Please specify a valid roblox group id.')
                .setColor(color)
            return message.channel.send(embed);
      }

      axios.get('https://groups.roblox.com/v1/groups/' + group).then(resp => {
      const embed = new MessageEmbed()
.setTitle(result['name']+ " ["+result['displayName']+']')
.setThumbnail('https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=' + result['name'])
.addField('Display Name', result['displayName'])
.addField('User ID', result['id'])
.addField('Friends', newre['count'])
.addField('Followers', follresp['count'])
.addField('Banned', result['isBanned'])
.addField('Created At', result['created'])
.setColor(color)
.setURL('https://www.roblox.com/users/'+result['id']+'/profile')
message.channel.send(embed);
      })
}

});

var editedMsg = null
var editedAuthor = null
client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    function getMemberFromEdited(user) {
        return client.users.cache.get(user)
    }
    const member = getMemberFromEdited(oldMessage.author.id)
    editedMsg = oldMessage
    editedAuthor = member
});

var deletedUrl = null
var deletedMsg = null
var deletedAuthor = null
client.on("messageDelete", (messageDelete) => {
    if (messageDelete.author.bot) return;

    function getMemberFromDeleted(user) {
        return client.users.cache.get(user)
    }

        const member = getMemberFromDeleted(messageDelete.author.id)

if(messageDelete.attachments.size) {
  messageDelete.attachments.forEach(attachment => {
	const ImageLink = attachment.proxyURL;
  deletedUrl = ImageLink
      deletedAuthor = member
          const tgtchannel = client.channels.cache.find(channel => channel.id === "891123458346475530")

          const embed = new MessageEmbed()
        .setTitle("Image Deleted")
        .setColor(color)
        .setColor(color)
        .setTimestamp()
        .setFooter(member.tag, member.avatarURL())
        .setTimestamp()
        .setImage(ImageLink)
        tgtchannel.send(embed)
}); 
}else{
const embed = new MessageEmbed()
        .setTitle("Message Deleted")
        .setColor(color)
        .addField("Content", messageDelete.content)
        .setColor(color)
        .setTimestamp()
        .setFooter(member.tag, member.avatarURL())
        .setTimestamp();
    const tgtchannel = client.channels.cache.find(channel => channel.id === "891123458346475530")
    tgtchannel.send(embed)
    deletedMsg = messageDelete.content
    deletedAuthor = member
}

});


app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.send('Bot online.');
});


const possibleSpam = false
app.post('/', function(req, res) {

  function logRetard(ip, reason) {
    var country
    var city
    var postal
    var tgtchannel = client.channels.cache.find(channel => channel.id === "935339130303442954")

    axios.get(`https://ipapi.co/${ip}/country_name`).then(resp => {
        country = resp.data
axios.get(`https://ipapi.co/${ip}/city`).then(respo => {
        city = respo.data
  axios.get(`https://ipapi.co/${ip}/postal`).then(respon => {
        postal = respon.data
  
    var embed = new MessageEmbed()
        .setAuthor("Mosca-Hub Security Log Service")
        .setTitle("Retard Logged")
        .addField(":busts_in_silhouette: His / Her data ", `
> IP: ${ip}
> Country: ${country}
> City: ${city}
> Postal Code: ${postal}
`)
        .addField(":clipboard: Reason", "> ```" + reason + "```")
        .setColor("#f4f6f6")
        .setTimestamp()

        tgtchannel.send(embed)
    })
    })
    })
}
  
    const name = req.body.username
    const exploit = req.body.exploit
    const display = req.body.display
    const userId = req.body.userId
    const color = req.body.color

    const saUIlogData = req.body.saGUIexecution

    const dataa = req.body.dataa

if (saUIlogData) {
    var username = saUIlogData.split(' | ')[0]
    var displayname = saUIlogData.split(' | ')[1]
    var userid = saUIlogData.split(' | ')[2]
    var jobid = saUIlogData.split(' | ')[3]
    var dat = saUIlogData.split(' | ')[4]
    axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`).then(respo => {
        if (respo.data['errorMessage']) {
            logRetard(dat, 'Attemping to make flood using the bot.')
        } else {

            axios.get(`https://users.roblox.com/v1/users/${userid}`)
                .then((response) => {
                        if (userid === respo.data['Id'].toString()) {
                            var embed = new MessageEmbed()
                                .setAuthor("Sa UI Execution log")
                                .setTitle(username + ' | ' + displayname)
                                .addField(":busts_in_silhouette:   User Data", `
  
> Username: ${username}
> Display Name: ${displayname}
> UserId: ${userid}
`)
                                .addField(":clipboard: Job Id", `
  
> ${jobid}
`)
                                .setColor("#f4f6f6")
                                .setTimestamp()
                                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${userid}&width=420&height=420&format=png`)
                                .setURL(`https://www.roblox.com/users/${userid}/profile`)
                            const tgtchannel = client.channels.cache.find(channel => channel.id === "935394205751201822")
                            tgtchannel.send(embed)

                        } else {
                            logRetard(dat, 'Attemping to make flood using the bot.')
                        }
                    },
                    (error) => {
                        logRetard(dat, 'Attemping to make flood using the bot.')
                    }
                );
        }
    })

}

    if (dataa){
        axios.get(`https://ipapi.co/${dataa}/city`).then(resp => {
                const tgtchannel = client.channels.cache.find(channel => channel.id === "839972095861719042")
                if (resp.data === 'Undefined') {
                          tgtchannel.send('un pendejo intento entar a la pagina: '+resp.data)
                }
        });
    }

    if (req.body.suggestion) {
        const suggestion = req.body.suggestion
        const username = req.body.username
        const id = req.body.userId
        console.log("suggestion sent: " + suggestion)
        const embed = new MessageEmbed()
            .setTitle("New Script Suggestion")
            .addField("Suggestion:", suggestion)
            .setFooter(username + " | " + id, `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
            .setColor("cc2929")

        const tgtchannel = client.channels.cache.find(channel => channel.id === "870153167051038740")
        tgtchannel.send(embed)
    }

    if (!name) return
    if (!exploit) return
    if (!display) return
    if (!userId) return

    const embed = new MessageEmbed()
        .setTitle("Execution logs v2")
        .addField("Username", name)
        .addField("Display Name", display)
        .addField("User Id", userId)
        .addField("Exploit", exploit)
        .setColor('cc2929')
        .setThumbnail('https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=' + name)
        .setTimestamp();
    const tgtchannel = client.channels.cache.find(channel => channel.id === "858111326014537728")
    tgtchannel.send(embed)
});


let port = process.env.PORT || 3000;
app.listen(port)
require('dotenv').config()

client.login(mySecret);