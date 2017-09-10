let Dota2 = require('dota2');
let Discord = require("discord.js");
let Steam = require('steam');
let fs = require('fs');
let path = require('path');
let CONFIG = JSON.parse(fs.readFileSync(path.join('data', 'config.json')));
let mode = 0
let name = 'gametest'
let disc = new Discord.Client();
disc.login(CONFIG.token3);
disc.on("ready", function(msg) {
channel = disc.channels.get(CONFIG.chid1)
})

let bot1 = new Steam.SteamClient();
let botUser1 = new Steam.SteamUser(bot1);
let botFriends1 = new Steam.SteamFriends(bot1);
let dota1 = new Dota2.Dota2Client(bot1, true);

bot1.connect();
console.log('Bot1 Iniciado')
bot1.on('connected', function() {
  botUser1.logOn({
    account_name: CONFIG.username1,
    password: CONFIG.password1
  });
});

bot1.on('error', function() {
  console.log('Bot1 has been logged off of the Steam network.');
  console.log(error)
//  cluster.worker.kill()
process.exit()
})

bot1.on('logOnResponse', function() {
  //logger.log('Bot 1' + DICT.SYSTEM.system_loggedin);
  botFriends1.setPersonaState(Steam.EPersonaState.Online);
  botFriends1.setPersonaName(CONFIG.displayName1);
  dota1.launch();
  dota1.on('ready', function() {
    console.log('Bot 1 Seteado');
  }
)
});

dota1.on('practiceLobbyUpdate', function(lobby) {
  console.log(lobby)})

  disc.on("message", function(msg) {
    if (msg === '') {
      return;
    }
    let original = msg.content
    let message = original.toLowerCase();
    let asd = message.split(" ");

switch(asd[0]){
  case 'create':
  dota1.createPracticeLobby({"game_name": name,
  "game_mode": 2,
"server_region": 14,
  "allow_cheats": false,
  "fill_with_bots": false,
  "allow_spectating": true,
 "allchat": false
})
break
case 'quit':
dota1.leavePracticeLobby();
dota1.abandonCurrentGame()
break

case 'inv':
dota1.inviteToLobby('76561198029065152')
break

case 'mode':
mode = asd[1]
console.log('mode = ' + asd[1])
break
}
})
