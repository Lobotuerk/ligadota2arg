'use strict';
var cluster = require('cluster');
var BigNumber = require('bignumber.js');
let Dota2 = require('dota2');
let Discord = require("discord.js");
let fs = require('fs');
let path = require('path');
let base = [];
let ready = false;
let Steam = require('steam');
let logger = require('./core/logger.js');
let firebase = require("firebase");
require('events').EventEmitter.prototype._maxListeners = 100;
let queue = 0;
let botInUse1 = false;
let botInUse2 = false;
let botInUse3 = false;
let botInUse4 = false;
let flip = 0
let k = 25;
let points = 0
let inLobby = false;
let players = [];
let xplayer = [];
let radiant = [];
let dire = [];
let direval = 0;
let radiantval = 0;
let direplayers = [];
let radiantplayers = [];
let playersbot1 = [];
let playersbot2 = [];
let playersbot3 = [];
let playersbot4 = [];
let server = 10
let channel;
let lobbyp;
let toplist = true;
let top = [];
let antiafk = false;
let CONFIG = JSON.parse(fs.readFileSync(path.join('data', 'config.json')));
let DICT = JSON.parse(fs.readFileSync(path.join('dict', CONFIG.dictionary)));
let ingame = [];
let bot1ready = false;
let bot2ready = false;
let bot3ready = false;
let bot4ready = false;
let account = 0;
let timer;
let timerq;
let timerc;
let games = [];
let playerslobby = [];
let match1 = [];
let match2 = [];
let match3 = [];
let match4 = [];

let antiq = false;
let number = 0;
let challengep = [];
let challenge = false;
let antic = false;
let radiantchallenge = [];
let direchallenge = [];

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {




let disc = new Discord.Client();

disc.login(CONFIG.token2);

disc.on("ready", function(msg) {
channel = disc.channels.get(CONFIG.chid3)
})

let bot1 = new Steam.SteamClient();
let botUser1 = new Steam.SteamUser(bot1);
let botFriends1 = new Steam.SteamFriends(bot1);
let dota1 = new Dota2.Dota2Client(bot1, true);
let bot2 = new Steam.SteamClient();
let botUser2 = new Steam.SteamUser(bot2);
let botFriends2 = new Steam.SteamFriends(bot2);
let dota2 = new Dota2.Dota2Client(bot2, true);
let bot3 = new Steam.SteamClient();
let botUser3 = new Steam.SteamUser(bot3);
let botFriends3 = new Steam.SteamFriends(bot3);
let dota3 = new Dota2.Dota2Client(bot3, true);
let bot4 = new Steam.SteamClient();
let botUser4 = new Steam.SteamUser(bot4);
let botFriends4 = new Steam.SteamFriends(bot4);
let dota4 = new Dota2.Dota2Client(bot4, true);

logger.log('Attempting Steam login...');

bot1.connect();
console.log('Bot1 Iniciado')
bot1.on('connected', function() {
  botUser1.logOn({
    account_name: CONFIG.username8,
    password: CONFIG.password8
  });
});

bot2.connect();
console.log('Bot2 Iniciado')
bot2.on('connected', function() {
  botUser2.logOn({
    account_name: CONFIG.username9,
    password: CONFIG.password9
  });
});

bot3.connect();
console.log('Bot3 Iniciado')
bot3.on('connected', function() {
  botUser3.logOn({
    account_name: CONFIG.username10,
    password: CONFIG.password10
  });
});

bot4.connect();
console.log('Bot4 Iniciado')
bot4.on('connected', function() {
  botUser4.logOn({
    account_name: CONFIG.username11,
    password: CONFIG.password11
  });
});

bot1.on('error', function() {
  logger.error('Bot1 has been logged off of the Steam network.');
//  cluster.worker.kill()
shutdown()

});
bot2.on('error', function() {
  logger.error('Bot2 has been logged off of the Steam network.');
//  cluster.worker.kill()
shutdown()
});
bot3.on('error', function() {
  logger.error('Bot3 has been logged off of the Steam network.');
//  cluster.worker.kill()
shutdown()
});
bot4.on('error', function() {
  logger.error('Bot4 has been logged off of the Steam network.');
  //cluster.worker.kill()
shutdown()
});


  firebase.initializeApp({
    serviceAccount: "./data/Liga Dota 2 Arg.json",
    databaseURL: "https://liga-dota-2-arg.firebaseio.com/"
  });

let db = firebase.database()
let ref = db.ref();

ref.on("value", function(snapshot) {
base = snapshot.val();
ready = true;
toplist = false;
account = Object.keys(base.usersE).length;
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});



bot1.on('logOnResponse', function() {
  //logger.log('Bot 1' + DICT.SYSTEM.system_loggedin);
  botFriends1.setPersonaState(Steam.EPersonaState.Online);
  botFriends1.setPersonaName(CONFIG.displayName1);
  dota1.launch();
  dota1.on('ready', function() {
    logger.log('Bot 1 Seteado');
    bot1ready = true;
    if (bot1ready == true && bot2ready == true && bot3ready == true && bot4ready == true && toplist == false){
      account = 0
      for (var key in base.usersE) {
          account = Object.keys(base.usersE).length
          if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
          }
          top.sort(function(a, b){return b.mmr - a.mmr});
          toplist = true;

      channel.sendMessage('Bot Ready, v.' + CONFIG.version)
    }
  });
});

bot2.on('logOnResponse', function() {
  //logger.log('Bot 2' + DICT.SYSTEM.system_loggedin);
  botFriends2.setPersonaState(Steam.EPersonaState.Online);
  botFriends2.setPersonaName(CONFIG.displayName2);
   dota2.launch();
   dota2.on('ready', function() {
      logger.log('Bot 2 Seteado');
      bot2ready = true;
      if (bot1ready == true && bot2ready == true && bot3ready == true && bot4ready == true && toplist == false){
        account = 0
        for (var key in base.usersE) {
            account = Object.keys(base.usersE).length
            if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
            }
            top.sort(function(a, b){return b.mmr - a.mmr});
            toplist = true;

        channel.sendMessage('Bot Ready, v.' + CONFIG.version)
      }
    });
});

bot3.on('logOnResponse', function() {
  //logger.log('Bot 3' + DICT.SYSTEM.system_loggedin);
  botFriends3.setPersonaState(Steam.EPersonaState.Online);
  botFriends3.setPersonaName(CONFIG.displayName3);
  dota3.launch();
  dota3.on('ready', function() {
    logger.log('Bot 3 Seteado');
    bot3ready = true;
    if (bot1ready == true && bot2ready == true && bot3ready == true && bot4ready == true && toplist == false){
      account = 0
      for (var key in base.usersE) {
          account = Object.keys(base.usersE).length
          if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
          }
          top.sort(function(a, b){return b.mmr - a.mmr});
          toplist = true;

      channel.sendMessage('Bot Ready, v.' + CONFIG.version)
    }
  });
});

bot4.on('logOnResponse', function() {
  //logger.log('Bot 3' + DICT.SYSTEM.system_loggedin);
  botFriends4.setPersonaState(Steam.EPersonaState.Online);
  botFriends4.setPersonaName(CONFIG.displayName4);
  dota4.launch();
  dota4.on('ready', function() {
    logger.log('Bot 4 Seteado');
    bot4ready = true;
    if (bot1ready == true && bot2ready == true && bot3ready == true && bot4ready == true && toplist == false){
      account = 0
      for (var key in base.usersE) {
          account = Object.keys(base.usersE).length
          if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
          }
          top.sort(function(a, b){return b.mmr - a.mmr});
          toplist = true;

      channel.sendMessage('Bot Ready, v.' + CONFIG.version)
    }
  });
});








dota1.on('practiceLobbyUpdate', function(lobby) {
  if (lobby.state == 2 && match1.id != lobby.server_id){
  match1.id = lobby.server_id
  let ref3 = db.ref('matchs/'+ match1.number)
  ref3.set({matchid: match1.id})
     inLobby = false
  }

if (inLobby == true){
time(dota1);
playerslobby = [];
lobbyp = lobby.members;
let lobbyready = 0;
for (var i = 1; i < lobbyp.length; i++){
  if (contains(playersbot1.dire, lobbyp[i].id.low) >= 0){
if (lobbyp[i].team === 0){
  dota1.practiceLobbyKickFromTeam(lobbyp[i].id.low)
}
else if (lobbyp[i].team === 1){
  lobbyready = lobbyready + 1
  let index = contains(playersbot1.dire, lobbyp[i].id.low)
  playerslobby.push(playersbot1.dire[index])
}

  }
  else if (contains(playersbot1.radiant, lobbyp[i].id.low) >= 0){
  if (lobbyp[i].team === 1){
    dota1.practiceLobbyKickFromTeam(lobbyp[i].id.low)
  }
  else if (lobbyp[i].team === 0){
    lobbyready = lobbyready + 1
    let index = contains(playersbot1.radiant, lobbyp[i].id.low)
      playerslobby.push(playersbot1.radiant[index])
  }
  }
  else{
    dota1.practiceLobbyKick(lobbyp[i].id.low);
  }


 if (i == 10 && lobbyready == 10){
/*
let flip =   Math.floor((Math.random() * 1.9) + 1);
if (flip === 1){
  dota1.flipLobbyTeams();
}
*/

for (var o = 0; o < 5; o++){
  if (contains(ingame, playersbot1.dire[o].name) < 0){
     ingame.push(playersbot1.dire[o])
  }
  if (contains(ingame, playersbot1.radiant[o].name) < 0){
   ingame.push(playersbot1.radiant[o])
  }
}

clearTimeout(timer);

   antiafk = false;
     dota1.launchPracticeLobby();

      botInUse1 = true
continue;
 }
 else{
   continue
 }

}

}

  else {
    if (lobby.state == 3){
      if (lobby.match_outcome == 2){
        //radiant wins
        for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot1.radiant[o].id)
let nmmr = playersbot1.radiant[o].mmr + (Math.floor(((playersbot1.radiant[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  wins: base.usersE[playersbot1.radiant[o].id].wins + 1,
  matchs: base.usersE[playersbot1.radiant[o].id].matchs + 1
});
};
for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot1.dire[o].id)
let nmmr = playersbot1.dire[o].mmr - (Math.floor(((playersbot1.dire[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot1.dire[o].id].matchs + 1
});
        };
        let ref3 = db.ref('matchs/'+ match1.number)
        ref3.set({matchid: match1.id,
                radiant: playersbot1.radiant,
                dire: playersbot1.dire,
                winner: 'radiant'})
        channel.sendMessage('Game ' + match1.number +' terminado\n' +
        'Resultado: Radiant Wins\n'+
         'Replay ID ' + match1.id )
        dota1.leavePracticeLobby();
               botInUse1 = false
      }

    else if (lobby.match_outcome == 3){
        //dire wins
        for (var o = 0; o < 5; o++){
  let ref2 = db.ref('usersE/'+ playersbot1.dire[o].id)
  let nmmr = playersbot1.dire[o].mmr + (Math.floor(((playersbot1.dire[o].xp)*k)) + points)
  ref2.update({
    mmr: nmmr,
    wins: base.usersE[playersbot1.dire[o].id].wins + 1,
    matchs: base.usersE[playersbot1.dire[o].id].matchs + 1
});
}
  for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot1.radiant[o].id)
let nmmr = playersbot1.radiant[o].mmr - (Math.floor(((playersbot1.radiant[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot1.radiant[o].id].matchs + 1
});
      }
let ref3 = db.ref('matchs/'+ match1.number)
ref3.set({matchid: match1.id,
        radiant: playersbot1.radiant,
        dire: playersbot1.dire,
        winner: 'dire'})
      channel.sendMessage('Game ' + match1.number +' terminado\n' +
      'Resultado: Dire Wins\n'+
       'Replay ID ' + match1.id)
       dota1.leavePracticeLobby();
             botInUse1 = false
    }
    for (var x = 0; x < 5; x++){
      let index = contains(ingame, playersbot1.dire[x].name)
      ingame.splice(index,1)
      let index2 = contains(ingame, playersbot1.radiant[x].name)
      ingame.splice(index2,1)
}
  }
}
});

dota2.on('practiceLobbyUpdate', function(lobby) {
  if (lobby.state == 2 && match2.id != lobby.server_id){
  match2.id = lobby.server_id
  let ref3 = db.ref('matchs/'+ match2.number)
  ref3.set({matchid: match2.id})
   inLobby = false
}

if (inLobby == true){
time(dota2);
lobbyp = lobby.members;
let lobbyready = 0;
for (var i = 1; i < lobbyp.length; i++){
  if (contains(playersbot2.dire, lobbyp[i].id.low) >= 0){
if (lobbyp[i].team === 0){
  dota2.practiceLobbyKickFromTeam(lobbyp[i].id.low)
}
else if (lobbyp[i].team === 1){
  lobbyready = lobbyready + 1
  let index = contains(playersbot2.dire, lobbyp[i].id.low)
  playerslobby.push(playersbot2.dire[index])
}

  }
  else if (contains(playersbot2.radiant, lobbyp[i].id.low) >= 0){
  if (lobbyp[i].team === 1){
    dota2.practiceLobbyKickFromTeam(lobbyp[i].id.low)
  }
  else if (lobbyp[i].team === 0){
    lobbyready = lobbyready + 1
    let index = contains(playersbot2.radiant, lobbyp[i].id.low)
      playerslobby.push(playersbot2.radiant[index])
  }
  }
  else{
    dota2.practiceLobbyKick(lobbyp[i].id.low);
  }


 if (i == 10 && lobbyready == 10){
/*
let flip =   Math.floor((Math.random() * 1.9) + 1);
if (flip === 1){
  dota1.flipLobbyTeams();
}
*/

for (var o = 0; o < 5; o++){
  if (contains(ingame, playersbot2.dire[o].name) < 0){
     ingame.push(playersbot2.dire[o])
  }
  if (contains(ingame, playersbot2.radiant[o].name) < 0){
   ingame.push(playersbot2.radiant[o])
  }
}
clearTimeout(timer);

      antiafk = false;
     dota2.launchPracticeLobby();

      botInUse2 = true
continue;
 }
 else{
   continue
 }

}

}

  else {
    if (lobby.state == 3){
      if (lobby.match_outcome == 2){
        //radiant wins
        for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot2.radiant[o].id)
let nmmr = playersbot2.radiant[o].mmr + (Math.floor(((playersbot2.radiant[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  wins: base.usersE[playersbot2.radiant[o].id].wins + 1,
  matchs: base.usersE[playersbot2.radiant[o].id].matchs + 1
});
};
for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot2.dire[o].id)
let nmmr = playersbot2.dire[o].mmr - (Math.floor(((playersbot2.dire[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot2.dire[o].id].matchs + 1
});
        };
        let ref3 = db.ref('matchs/'+ match2.number)
        ref3.set({matchid: match2.id,
                radiant: playersbot2.radiant,
                dire: playersbot2.dire,
                winner: 'radiant'})
        channel.sendMessage('Game ' + match2.number +' terminado\n' +
        'Resultado: Radiant Wins\n'+
         'Replay ID ' + match2.id)
         dota2.leavePracticeLobby();
               botInUse2 = false
      }

    else if (lobby.match_outcome == 3){
        //dire wins
        for (var o = 0; o < 5; o++){
  let ref2 = db.ref('usersE/'+ playersbot2.dire[o].id)
  let nmmr = playersbot2.dire[o].mmr + (Math.floor(((playersbot2.dire[o].xp)*k)) + points)
  ref2.update({
    mmr: nmmr,
    wins: base.usersE[playersbot2.dire[o].id].wins + 1,
    matchs: base.usersE[playersbot2.dire[o].id].matchs + 1
});
}
  for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot2.radiant[o].id)
let nmmr = playersbot2.radiant[o].mmr - (Math.floor(((playersbot2.radiant[o].xp+1)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot2.radiant[o].id].matchs + 1
});
      }
      let ref3 = db.ref('matchs/'+ match2.number)
      ref3.set({matchid: match2.id,
              radiant: playersbot2.radiant,
              dire: playersbot2.dire,
              winner: 'dire'})
      channel.sendMessage('Game ' + match2.number +' terminado\n' +
      'Resultado: Dire Wins\n'+
       'Replay ID ' + match2.id)
      dota2.leavePracticeLobby();
             botInUse2 = false
    }
    else {
      return
    }
    for (var x = 0; x < 5; x++){
      let index = contains(ingame, playersbot2.dire[x].name)
      ingame.splice(index,1)
      let index2 = contains(ingame, playersbot2.radiant[x].name)
      ingame.splice(index2,1)
  }


  }
}
});

dota3.on('practiceLobbyUpdate', function(lobby) {
  if (lobby.state == 2 && match3.id != lobby.server_id){
  match3.id = lobby.server_id
  let ref3 = db.ref('matchs/'+ match3.number)
  ref3.set({matchid: match3.id})
   inLobby = false
}

if (inLobby == true){
time(dota3);
lobbyp = lobby.members;
let lobbyready = 0;
for (var i = 1; i < lobbyp.length; i++){
  if (contains(playersbot3.dire, lobbyp[i].id.low) >= 0){
if (lobbyp[i].team === 0){
  dota3.practiceLobbyKickFromTeam(lobbyp[i].id.low)
}
else if (lobbyp[i].team === 1){
  lobbyready = lobbyready + 1
  let index = contains(playersbot3.dire, lobbyp[i].id.low)
  playerslobby.push(playersbot3.dire[index])
}

  }
  else if (contains(playersbot3.radiant, lobbyp[i].id.low) >= 0){
  if (lobbyp[i].team === 1){
    dota3.practiceLobbyKickFromTeam(lobbyp[i].id.low)
  }
  else if (lobbyp[i].team === 0){
    lobbyready = lobbyready + 1
    let index = contains(playersbot3.radiant, lobbyp[i].id.low)
      playerslobby.push(playersbot3.radiant[index])
  }
  }
  else{
    dota3.practiceLobbyKick(lobbyp[i].id.low);
  }


 if (i == 10 && lobbyready == 10){
/*
let flip =   Math.floor((Math.random() * 1.9) + 1);
if (flip === 1){
  dota1.flipLobbyTeams();
}
*/

for (var o = 0; o < 5; o++){
  if (contains(ingame, playersbot3.dire[o].name) < 0){
     ingame.push(playersbot3.dire[o])
  }
  if (contains(ingame, playersbot3.radiant[o].name) < 0){
   ingame.push(playersbot3.radiant[o])
  }
}

clearTimeout(timer);
      antiafk = false;
     dota3.launchPracticeLobby();

      botInUse3 = true
continue;
 }
 else{
   continue
 }

}

}

  else {
    if (lobby.state == 3){
      if (lobby.match_outcome == 2){
        //radiant wins
        for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot3.radiant[o].id)
let nmmr = playersbot3.radiant[o].mmr + (Math.floor(((playersbot3.radiant[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  wins: base.usersE[playersbot3.radiant[o].id].wins + 1,
  matchs: base.usersE[playersbot3.radiant[o].id].matchs + 1
});
};
for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot3.dire[o].id)
let nmmr = playersbot3.dire[o].mmr - (Math.floor(((playersbot3.dire[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot3.dire[o].id].matchs + 1
});
        };
        let ref3 = db.ref('matchs/'+ match3.number)
        ref3.set({matchid: match3.id,
                radiant: playersbot3.radiant,
                dire: playersbot3.dire,
                winner: 'radiant'})
        channel.sendMessage('Game ' + match3.number +' terminado\n' +
        'Resultado: Radiant Wins\n'+
         'Replay ID ' + match3.id)
        dota3.leavePracticeLobby();
               botInUse3 = false
      }

    else if (lobby.match_outcome == 3){
        //dire wins
        for (var o = 0; o < 5; o++){
  let ref2 = db.ref('usersE/'+ playersbot3.dire[o].id)
  let nmmr = playersbot3.dire[o].mmr + (Math.floor(((playersbot3.dire[o].xp)*k)) + points)
  ref2.update({
    mmr: nmmr,
    wins: base.usersE[playersbot3.dire[o].id].wins + 1,
    matchs: base.usersE[playersbot3.dire[o].id].matchs + 1
});
}
  for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot3.radiant[o].id)
let nmmr = playersbot3.radiant[o].mmr - (Math.floor(((playersbot3.radiant[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot3.radiant[o].id].matchs + 1
});
      }
      let ref3 = db.ref('matchs/'+ match3.number)
      ref3.set({matchid: match3.id,
              radiant: playersbot3.radiant,
              dire: playersbot3.dire,
              winner: 'dire'})
      channel.sendMessage('Game ' + match3.number +' terminado\n' +
      'Resultado: Dire Wins\n'+
       'Replay ID ' + match3.id)
      dota3.leavePracticeLobby();
             botInUse3 = false
    }
    else {
      return
    }
      for (var x = 0; x < 5; x++){
        let index = contains(ingame, playersbot3.dire[x].name)
        ingame.splice(index,1)
        let index2 = contains(ingame, playersbot3.radiant[x].name)
        ingame.splice(index2,1)
    }


  }
}
});

dota4.on('practiceLobbyUpdate', function(lobby) {
  if (lobby.state == 2 && match4.id != lobby.server_id){
  match4.id = lobby.server_id
  let ref3 = db.ref('matchs/'+ match4.number)
  ref3.set({matchid: match4.id})
     inLobby = false
  }

if (inLobby == true){
time(dota4);
playerslobby = [];
lobbyp = lobby.members;
let lobbyready = 0;
for (var i = 1; i < lobbyp.length; i++){
  if (contains(playersbot4.dire, lobbyp[i].id.low) >= 0){
if (lobbyp[i].team === 0){
  dota4.practiceLobbyKickFromTeam(lobbyp[i].id.low)
}
else if (lobbyp[i].team === 1){
  lobbyready = lobbyready + 1
  let index = contains(playersbot4.dire, lobbyp[i].id.low)
  playerslobby.push(playersbot4.dire[index])
}

  }
  else if (contains(playersbot4.radiant, lobbyp[i].id.low) >= 0){
  if (lobbyp[i].team === 1){
    dota4.practiceLobbyKickFromTeam(lobbyp[i].id.low)
  }
  else if (lobbyp[i].team === 0){
    lobbyready = lobbyready + 1
    let index = contains(playersbot4.radiant, lobbyp[i].id.low)
      playerslobby.push(playersbot4.radiant[index])
  }
  }
  else{
    dota4.practiceLobbyKick(lobbyp[i].id.low);
  }


 if (i == 10 && lobbyready == 10){
/*
let flip =   Math.floor((Math.random() * 1.9) + 1);
if (flip === 1){
  dota4.flipLobbyTeams();
}
*/

for (var o = 0; o < 5; o++){
  if (contains(ingame, playersbot4.dire[o].name) < 0){
     ingame.push(playersbot4.dire[o])
  }
  if (contains(ingame, playersbot4.radiant[o].name) < 0){
   ingame.push(playersbot4.radiant[o])
  }
}

clearTimeout(timer);

   antiafk = false;
     dota4.launchPracticeLobby();

      botInUse4 = true
continue;
 }
 else{
   continue
 }

}

}

  else {
    if (lobby.state == 3){
      if (lobby.match_outcome == 2){
        //radiant wins
        for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot4.radiant[o].id)
let nmmr = playersbot4.radiant[o].mmr + (Math.floor(((playersbot4.radiant[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  wins: base.usersE[playersbot4.radiant[o].id].wins + 1,
  matchs: base.usersE[playersbot4.radiant[o].id].matchs + 1
});
};
for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot4.dire[o].id)
let nmmr = playersbot4.dire[o].mmr - (Math.floor(((playersbot4.dire[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot4.dire[o].id].matchs + 1
});
        };
        let ref3 = db.ref('matchs/'+ match4.number)
        ref3.set({matchid: match4.id,
                radiant: playersbot4.radiant,
                dire: playersbot4.dire,
                winner: 'radiant'})
        channel.sendMessage('Game ' + match4.number +' terminado\n' +
        'Resultado: Radiant Wins\n'+
         'Replay ID ' + match4.id )
        dota4.leavePracticeLobby();
               botInUse4 = false
      }

    else if (lobby.match_outcome == 3){
        //dire wins
        for (var o = 0; o < 5; o++){
  let ref2 = db.ref('usersE/'+ playersbot4.dire[o].id)
  let nmmr = playersbot4.dire[o].mmr + (Math.floor(((playersbot4.dire[o].xp)*k)) + points)
  ref2.update({
    mmr: nmmr,
    wins: base.usersE[playersbot4.dire[o].id].wins + 1,
    matchs: base.usersE[playersbot4.dire[o].id].matchs + 1
});
}
  for (var o = 0; o < 5; o++){
let ref2 = db.ref('usersE/'+ playersbot4.radiant[o].id)
let nmmr = playersbot4.radiant[o].mmr - (Math.floor(((playersbot4.radiant[o].xp)*k)) + points)
ref2.update({
  mmr: nmmr,
  matchs: base.usersE[playersbot4.radiant[o].id].matchs + 1
});
      }
let ref3 = db.ref('matchs/'+ match4.number)
ref3.set({matchid: match4.id,
        radiant: playersbot4.radiant,
        dire: playersbot4.dire,
        winner: 'dire'})
      channel.sendMessage('Game ' + match4.number +' terminado\n' +
      'Resultado: Dire Wins\n'+
       'Replay ID ' + match4.id)
       dota4.leavePracticeLobby();
             botInUse4 = false
    }
    for (var x = 0; x < 5; x++){
      let index = contains(ingame, playersbot4.dire[x].name)
      ingame.splice(index,1)
      let index2 = contains(ingame, playersbot4.radiant[x].name)
      ingame.splice(index2,1)
}
  }
}
});







//
disc.on("message", function(msg) {
  // If the message is blank, do nothing (blank messages are received from 'is typing').
  if (msg === '') {
    return;
  }
  let original = msg.content;
  let message = original.toLowerCase();
  let user = msg.author;
  let fromUser = user.id;

  if (fromUser === '294907553450688523') {
    return;
  }
  let activa = message.split("");
  let asd = message.split("");
  asd.splice(0,1)
  let input = asd.join('')
  input = input.split(' ')

  if (activa[0] === '.') {
    //  msg.delete()
    if (ready === true){
      if (input[0] == 'help'){
        channel.sendMessage(DICT.help_message)
      return
    }

    if (input[0] == 'reg'){
      if (typeof(base.usersE[fromUser]) != 'undefined') {
      msg.reply('Vos ya estas registrado picaron')
      return
    }
      else{

        if (input[1]){
          let index = iov(base.vouchs, input[1])
          if (index >= 0){
          if (input[1].length == 17){
        let ref = db.ref('usersE/'+ fromUser)
      activa.splice(0,23)
        let nickname = user.username
        ref.set({mmr: 2000,
                name: input[1],
                nick: nickname,
                level: 1,
                matchs: 0,
                wins: 0})
                channel.sendMessage( nickname +
                  ' Acaba de ser registrado en la Dota 2 In-House League')
        let ref2 = db.ref('usersE/amount')
        ref2.set({
          number: account
        })
                return
              }
              else{
                msg.reply('El SteamID no esta de la forma correcta,'
                + ' fijate el pin de arriba para mas informacion')
                return
              }
            }
            else {
              msg.reply('No estas voucheado, anda a http://argentinad2l.uphero.com y pedi un vouch.')
              return
            }
        }
        else{
          msg.reply('Te falto algo, acordate que es .reg SteamID')
          return
        }

      }
    }

        if (typeof(base.usersE[fromUser]) == 'undefined') {
        msg.reply('No estas registrado en la Dota 2 In-House League')
      return
      }

  switch(input[0])
  {

    case 'games':
    if (botInUse1 == false && botInUse2 == false && botInUse3 == false
    && botInUse4 == false){
      channel.sendMessage('Actualmente no hay games hosteados')
      break
    }
    else {
    if (botInUse1 == true){
   channel.sendMessage('Game ' + match1.number +': \n' + 'Radiant: ' + get(playersbot1.radiant) + '\n'
     + 'Dire: ' + get(playersbot1.dire) + '\n' + 'Dota2MatchID: ' + match1.id)
    }
    if (botInUse2 == true){
      channel.sendMessage('Game ' + match2.number +': \n' + 'Radiant: ' + get(playersbot2.radiant) + '\n'
     + 'Dire: ' + get(playersbot2.dire) + '\n' + 'Dota2MatchID: ' + match2.id )
    }
    if (botInUse3 == true){
      channel.sendMessage('Game ' + match3.number +': \n' + 'Radiant: ' + get(playersbot3.radiant) + '\n'
     + 'Dire: ' + get(playersbot3.dire) + '\n' + 'Dota2MatchID: ' + match3.id )
    }
    if (botInUse4 == true){
      channel.sendMessage('Game ' + match4.number +': \n' + 'Radiant: ' + get(playersbot4.radiant) + '\n'
     + 'Dire: ' + get(playersbot4.dire) + '\n' + 'Dota2MatchID: ' + match4.id )
    }

    break
    }

    case 'lobby':
    if (inLobby == true){
       if(typeof(radiantplayers[0]) != 'undefined'){
      channel.sendMessage('Team Radiant: ' + get(radiantplayers) + '\n' + 'Team Dire: ' + get(direplayers))
      break
    }
    else {
      channel.sendMessage('Team Radiant: ' + get(radiantchallenge) + '\n' + 'Team Dire: ' + get(direchallenge))
      break
    }
    }
    else {
      channel.sendMessage('Actualmente no hay lobby creado')
      break
    }


    case 'elobby':
    if (base.usersE[fromUser].level >= 3) {
      dota1.leavePracticeLobby();
      dota2.leavePracticeLobby();
      dota3.leavePracticeLobby();
      dota4.leavePracticeLobby();
      break;

  }
  else
  {
      msg.reply(DICT.ERRORS.err_not_admin);
    break;
  }


  case 'me':
  if (typeof(base.usersE[fromUser]) == 'undefined') {
    msg.reply('No estas registrado en la Dota 2 In-House League')
  break
  }
  else{
  msg.reply('Tenes actualmente ' + base.usersE[fromUser].mmr + ' puntos de mmr y ' + ((base.usersE[fromUser].wins / base.usersE[fromUser].matchs) * 100 ) +
   '% de winrate en ' + base.usersE[fromUser].matchs + ' partidas.')
  break
  }

  case 'clobby':
  if (base.usersE[fromUser].level >= 3) {
    if (input[0]/* && input[1] && input[2]*/) {
    /*dota4.createPracticeLobby('',
                                {"game_name": input[1],
                              "server_region": server,
                               "game_mode": 2,
                                "allow_cheats": false,
                                "fill_with_bots": false,
                                "allow_spectating": true,
                               "allchat": false
                             });
    logger.log("Lobby Creado");
    dota4.joinPracticeLobbyTeam(2, 4);*/
    dota1.launchPracticeLobby()
    dota2.launchPracticeLobby()
    dota3.launchPracticeLobby()
    break;
    }
    else {
      msg.reply("Especifique Nombre y Contraseña del lobby");
      break;
    }
}
else
{
    msg.reply(DICT.ERRORS.err_not_admin);
  break;
}

case 'noobs':
if (toplist != true){
top = [];
for (var key in base.usersE) {
    if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
    }
    top.sort(function(a, b){return b.mmr - a.mmr});
    toplist = true;

}
account = Object.keys(base.usersE).length - 2
channel.sendMessage('Tabla de posiciones Dota 2 In-House League: \n'+
'Pos. ' + (account-9) +': ' + top[account-9].nick + ' ' + '(' + top[account-9].mmr + ')\n' +
'Pos. ' + (account-8) +': ' + top[account-8].nick + ' ' + '(' + top[account-8].mmr + ')\n' +
'Pos. ' + (account-7) +': ' + top[account-7].nick + ' ' + '(' + top[account-7].mmr + ')\n' +
'Pos. ' + (account-6) +': ' + top[account-6].nick + ' ' + '(' + top[account-6].mmr + ')\n' +
'Pos. ' + (account-5) +': ' + top[account-5].nick + ' ' + '(' + top[account-5].mmr + ')\n' +
'Pos. ' + (account-4) +': ' + top[account-4].nick + ' ' + '(' + top[account-4].mmr + ')\n' +
'Pos. ' + (account-3) +': ' + top[account-3].nick + ' ' + '(' + top[account-3].mmr + ')\n' +
'Pos. ' + (account-2) +': ' + top[account-2].nick + ' ' + '(' + top[account-2].mmr + ')\n' +
'Pos. ' + (account-1) +': ' + top[account-1].nick + ' ' + '(' + top[account-1].mmr + ')\n' +
'Pos. ' + (account) +': ' + top[account].nick + ' ' + '(' + top[account].mmr + ')')
break
Object.keys(base.usersE).length

case 'top':
if (toplist != true){
top = [];
for (var key in base.usersE) {
    if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
    }
    top.sort(function(a, b){return b.mmr - a.mmr});
    toplist = true;

}
channel.sendMessage('Tabla de posiciones Dota 2 In-House League: \n'+
'Pos. 1: ' + top[0].nick + ' ' + '(' + top[0].mmr + ')\n' +
'Pos. 2: ' + top[1].nick + ' ' + '(' + top[1].mmr + ')\n' +
'Pos. 3: ' + top[2].nick + ' ' + '(' + top[2].mmr + ')\n' +
'Pos. 4: ' + top[3].nick + ' ' + '(' + top[3].mmr + ')\n' +
'Pos. 5: ' + top[4].nick + ' ' + '(' + top[4].mmr + ')\n' +
'Pos. 6: ' + top[5].nick + ' ' + '(' + top[5].mmr + ')\n' +
'Pos. 7: ' + top[6].nick + ' ' + '(' + top[6].mmr + ')\n' +
'Pos. 8: ' + top[7].nick + ' ' + '(' + top[7].mmr + ')\n' +
'Pos. 9: ' + top[8].nick + ' ' + '(' + top[8].mmr + ')\n' +
'Pos. 10: ' + top[9].nick + ' ' + '(' + top[9].mmr + ')')
break

case 'obs':
if (base.usersE[fromUser].level >= 2) {
  /*for (var key in base.usersE) {
    if (typeof(base.usersE[key].level) == 'undefined'){
      let refx = db.ref('usersE/'+ key)
      refx.update({level: 1})
    }
    else {
      continue
    }

  }*/
  if (input[1] == 1){
      dota1.inviteToLobby(base.usersE[fromUser].name)
  }
  if (input[1] == 2){
      dota2.inviteToLobby(base.usersE[fromUser].name)
  }
  if (input[1] == 3){
      dota3.inviteToLobby(base.usersE[fromUser].name)
  }
  if (input[1] == 4){
      dota4.inviteToLobby(base.usersE[fromUser].name)
}
break
}
else
{
  channel.sendMessage(DICT.ERRORS.err_not_admin);
break;
}

case 'patch':
if (base.usersE[fromUser].level >= 3) {
  //cluster.worker.kill()
  shutdown()
break
}
else
{
  channel.sendMessage(DICT.ERRORS.err_not_admin);
break;
};

case 'server':
if (base.usersE[fromUser].level >= 3) {
  if (input[1] == 'sa'){
    server = 10
    channel.sendMessage('Servidor configurado en South America')
  }
  if (input[1] == 'chile'){
    server = 14
    channel.sendMessage('Servidor configurado en Chile')
  }
break
}
else
{
  channel.sendMessage(DICT.ERRORS.err_not_admin);
break;
};

case 'cancel':
if (base.usersE[fromUser].level >= 2){
  challenge = false
  challengep = [];
  radiantchallenge = [];
  direchallenge = [];
  break
}
if (typeof(challengep[0]) != 'undefined' && typeof(challengep[1]) != 'undefined'){
if (base.usersE[fromUser].nick == challengep[0].nick || base.usersE[fromUser].nick == challengep[1].nick){
  challenge = false
  challengep = [];
  direchallenge = []
  radiantchallenge = [];
  break
}
break
}
break

case 'challenge':
if (challenge == false){
  if (input[1]){
    if (input[1].toLowerCase() == base.usersE[fromUser].nick.toLowerCase()){
      break
    }
    activa.splice(0,11)
      let nickname = activa.join('')
      let i = iob(top,nickname)
      if (i >= 0){
        let acen = new BigNumber(base.usersE[fromUser].name).minus('76561197960265728')
        acen = acen.toNumber()
        acen = acen + ''
        challengep.push({id: fromUser, mmr: base.usersE[fromUser].mmr,
           nick: base.usersE[fromUser].nick, name: acen, invite: base.usersE[fromUser].name, xp: 1})
        challengep.push({nick: nickname})
        challenge = true
        ctime()
        channel.sendMessage('El usuario ' + base.usersE[fromUser].nick + ' ha retado a ' +
      nickname + ' a un challenge')
      break
      }
      else{
        msg.reply('El usuario ' + nickname + ' no existe')
        break
      }
  }
  else{
    msg.reply('Te falto algo, acordate que es .challenge nickdeloponente')
    break
  }

}
else{
  msg.reply('Actualmente hay un challenge abierto, espera que termine o unete al pool')
  break
}


case 'accept':
if (challenge == true){
  if (challengep[1].nick.toLowerCase() == base.usersE[fromUser].nick.toLowerCase() && typeof(challengep[1].mmr) == 'undefined'){
          clearTimeout(timerc);
          ctime();
    flip =   Math.floor((Math.random() * 1.99) + 1);
    let acen = new BigNumber(base.usersE[fromUser].name).minus('76561197960265728')
    acen = acen.toNumber()
    acen = acen + ''
    channel.sendMessage('El usuario ' + challengep[1].nick + ' acepto el challenge de ' +
  challengep[0].nick + ', aquellos que quieran jugar pueden entrar con .join')
if (flip == 1){
  channel.sendMessage('Empieza pickeando players el jugador ' + challengep[0].nick )
}
if (flip == 2){
  channel.sendMessage('Empieza pickeando players el jugador ' + challengep[1].nick )
}
  challengep[1].id = fromUser
  challengep[1].mmr =  base.usersE[fromUser].mmr
  challengep[1].name =  acen
  challengep[1].invite = base.usersE[fromUser].name
  challengep[1].xp = 1
  radiantchallenge.push(challengep[0])
  direchallenge.push(challengep[1])
  break
  }
  else {
    msg.reply('El challenge no fue hecho hacia vos')
    break
  }

}
else {
  msg.reply('Actualmente no hay ningun challenge para aceptar')
  break
}

case 'join':
case 'pool':
if (challenge == true){
  if (base.usersE[fromUser].nick == challengep[0].nick){
    if (challengep.length >= 2){
      channel.sendMessage('Pool : \n' + poolp(challengep))
      break
    }
    else{
      msg.reply('Todavia no hay suficientes players en el pool')
      break
    }
  }

  else if (base.usersE[fromUser].nick == challengep[1].nick){
    if (challengep.length >= 2){
      channel.sendMessage('Pool : \n' + poolp(challengep))
      break
    }
    else{
      msg.reply('Todavia no hay suficientes players en el pool')
      break
    }
  }
  else {

    if (ioa(challengep, fromUser) >= 0 || ioa(radiantchallenge, fromUser) >= 0 || ioa(direchallenge, fromUser) >= 0){
      //msg.reply('Vos ya estas en cola')
      break
    }
    let acen = new BigNumber(base.usersE[fromUser].name).minus('76561197960265728')
    acen = acen.toNumber()
    acen = acen + ''
    challengep.push({id: fromUser, mmr: base.usersE[fromUser].mmr,
       nick: base.usersE[fromUser].nick, name: acen, invite: base.usersE[fromUser].name, xp: 1})
       break
  }
}
else{
  msg.reply('No hay challenge al cual entrar')
  break
}

case 'pick':
if (inLobby == true){
  msg.reply('Se esta por mandar un lobby, espera que se mande para seguir con el challenge')
  break
}
if (challenge != true){
  break
}
if (botInUse1 === true && botInUse2 === true && botInUse3 === true
&& botInUse4 === true){
  channel.sendMessage('Actualmente no hay bots, espera que un game termine')
  break
}
if (input[1]){
  clearTimeout(timerc);
  ctime();
activa.splice(0,6)
  let nickname = activa.join('')
if (challengep[0].id == fromUser){


  if (radiantchallenge.length == 5){
    msg.reply('Vos ya elegiste 4 jugadores')
    break
  }

  if (flip == 1){


if (radiantchallenge.length > (direchallenge.length)){
  channel.sendMessage('Todavia no es tu turno de elegir')
  break
}
else {
      let index = iob(challengep, nickname)
    if (index >= 0){
      channel.sendMessage('El jugador ' + challengep[index].nick + ' fue elegido por ' + base.usersE[fromUser].nick)

      radiantchallenge.push(challengep[index])
      let index2 = contains(challengep, challengep[index].name)
      challengep.splice(index2,1)
      channel.sendMessage('El team radiant es: ' + get(radiantchallenge))

    }
    else{
      msg.reply('No hay player en el pool con ese nombre, revisa bien')
      break
    }
  }
  }

  if (flip == 2){


if (radiantchallenge.length == (direchallenge.length)){
  channel.sendMessage('Todavia no es tu turno de elegir')
}
else {
      let index = iob(challengep, nickname)
    if (index >= 0){
      channel.sendMessage('El jugador ' + challengep[index].nick + ' fue elegido por ' + base.usersE[fromUser].nick)

      radiantchallenge.push(challengep[index])
      let index2 = contains(challengep, challengep[index].name)
      challengep.splice(index2,1)
      channel.sendMessage('El team radiant es: ' + get(radiantchallenge))


    }
    else{
      msg.reply('No hay player en el pool con ese nombre, revisa bien')
      break
    }
  }
  }



}
if (challengep[1].id == fromUser){
  if (direchallenge.length == 5){
    msg.reply('Vos ya elegiste 4 jugadores')
    break
  }
  if (flip == 1){


if (radiantchallenge.length == (direchallenge.length)){
  channel.sendMessage('Todavia no es tu turno de elegir')
  break
}
else {
  let index = iob(challengep, nickname)
  if (index >= 0){
    channel.sendMessage('El jugador ' + challengep[index].nick + ' fue elegido por ' + base.usersE[fromUser].nick)
    direchallenge.push(challengep[index])
    let index2 = contains(challengep, challengep[index].name)
    challengep.splice(index2,1)
    channel.sendMessage('El team dire es: ' + get(direchallenge))
  }
  else{
    msg.reply('No hay player en el pool con ese nombre, revisa bien')
    break
  }
  }
  }

  if (flip == 2){


if (radiantchallenge.length > (direchallenge.length)){
  channel.sendMessage('Todavia no es tu turno de elegir')
}
else {
  let index = iob(challengep, nickname)
  if (index >= 0){
    channel.sendMessage('El jugador ' + challengep[index].nick + ' fue elegido por '
    + base.usersE[fromUser].nick)
    direchallenge.push(challengep[index])
    let index2 = contains(challengep, challengep[index].name)
    challengep.splice(index2,1)
    channel.sendMessage('El team dire es: ' + get(direchallenge))

  }
  else{
    msg.reply('No hay player en el pool con ese nombre, revisa bien')
    break
  }
  }
  }
}

if (direchallenge.length == 5 && radiantchallenge.length == 5){
  channel.sendMessage('@here Lobby creado: \n' +
'El team radiant es: ' + get(radiantchallenge) + '\n' +
'El team dire es: ' + get(direchallenge))
   number = Object.keys(base.matchs).length

     clearTimeout(timerc);
  if (botInUse1 == false){
    dota1.leavePracticeLobby();
let gamename = 'In-HouseChallenge' + number
    dota1.createPracticeLobby('',{"game_name": gamename,
                              "server_region": server,
                               "game_mode": 2,
                                "allow_cheats": false,
                                "fill_with_bots": false,
                                "allow_spectating": true,
                               "allchat": false
                             });
    logger.log("Lobby Creado");
      dota1.joinPracticeLobbyTeam(2, 4);
for (var o = 0; o < direchallenge.length; o++){
  dota1.inviteToLobby(direchallenge[o].invite)
}
for (var o = 0; o < radiantchallenge.length; o++){
  dota1.inviteToLobby(radiantchallenge[o].invite)
}
 match1.number = number
  playersbot1.dire = direchallenge;
  playersbot1.radiant = radiantchallenge;
  challengep = [];
  challenge = false
  direchallenge = [];
  radiantchallenge = [];
  inLobby = true
  break;
}

if (botInUse2 == false){
  dota2.leavePracticeLobby();
let gamename = 'In-HouseLeague' + number
    dota2.createPracticeLobby('',{"game_name": gamename,
                          "server_region": server,
                           "game_mode": 2,
                            "allow_cheats": false,
                            "fill_with_bots": false,
                            "allow_spectating": true,
                           "allchat": false
                         });
logger.log("Lobby Creado");
    dota2.joinPracticeLobbyTeam(2, 4);
for (var o = 0; o < direchallenge.length; o++){
  dota2.inviteToLobby(direchallenge[o].invite)
}
for (var o = 0; o < radiantchallenge.length; o++){
  dota2.inviteToLobby(radiantchallenge[o].invite)
}
playersbot2.dire = direchallenge;
playersbot2.radiant = radiantchallenge;
match2.number = number
challengep = [];
challenge = false
direchallenge = [];
radiantchallenge = [];
inLobby = true
break;
}

if (botInUse3 == false){
  dota3.leavePracticeLobby();
let gamename = 'In-HouseLeague' + number
    dota3.createPracticeLobby('',{"game_name": gamename,
                          "server_region": server,
                           "game_mode": 2,
                            "allow_cheats": false,
                            "fill_with_bots": false,
                            "allow_spectating": true,
                           "allchat": false
                         });
logger.log("Lobby Creado");
dota3.joinPracticeLobbyTeam(2, 4);

for (var o = 0; o < direchallenge.length; o++){
  dota3.inviteToLobby(direchallenge[o].invite)
}
for (var o = 0; o < radiantchallenge.length; o++){
  dota3.inviteToLobby(radiantchallenge[o].invite)
}
challengep = [];
challenge = false
direchallenge = [];
radiantchallenge = [];
inLobby = true
playersbot3.dire = direchallenge;
playersbot3.radiant = radiantchallenge;
match3.number = number
break;
}

if (botInUse4 == false){
  dota4.leavePracticeLobby();
let gamename = 'In-HouseChallenge' + number
  dota4.createPracticeLobby('',{"game_name": gamename,
                            "server_region": server,
                             "game_mode": 2,
                              "allow_cheats": false,
                              "fill_with_bots": false,
                              "allow_spectating": true,
                             "allchat": false
                           });
  logger.log("Lobby Creado");
    dota4.joinPracticeLobbyTeam(2, 4);
for (var o = 0; o < direchallenge.length; o++){
dota4.inviteToLobby(direchallenge[o].invite)
}
for (var o = 0; o < radiantchallenge.length; o++){
dota4.inviteToLobby(radiantchallenge[o].invite)
}
match4.number = number
playersbot4.dire = direchallenge;
playersbot4.radiant = radiantchallenge;
challengep = [];
challenge = false
direchallenge = [];
radiantchallenge = [];
inLobby = true
break;
}

}
break
}


else{
  msg.reply('Te falto el nick del player que queres pickear')
  break
}

case 'up':
if (base.usersE[fromUser].level >= 3) {
if (toplist != true){
top = [];
for (var key in base.usersE) {
    if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
    }
    top.sort(function(a, b){return b.mmr - a.mmr});
    toplist = true;
}
activa.splice(0,4)
let nickname = activa.join('')
let indexn = iob(top, nickname)
if (indexn > -1) {
  let ref2 = db.ref('usersE/'+ top[indexn].id)
  let nmmr = top[indexn].mmr + 25
  ref2.update({
  mmr: nmmr,
  matchs: top[indexn].matchs + 1,
  wins: top[indexn].wins + 1
  });

channel.sendMessage('El usuario ' + top[indexn].nick + ' gano 25 puntos, ahora tiene ' + nmmr +
' puntos de mmr')
top = false
break
}
else{
  if (input[1]){
    channel.sendMessage('El usuario ' + nickname + ' no existe')
  }
else {
   msg.reply('Te falto algo, acordate que es .check nick')
}
break
}
}
else
{
  channel.sendMessage(DICT.ERRORS.err_not_admin);
break;
}

case 'down':
if (base.usersE[fromUser].level >= 3) {
if (toplist != true){
top = [];
for (var key in base.usersE) {
    if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
    }
    top.sort(function(a, b){return b.mmr - a.mmr});
    toplist = true;
}
activa.splice(0,6)
let nickname = activa.join('')
let indexn = iob(top, nickname)
if (indexn > -1) {
  let ref2 = db.ref('usersE/'+ top[indexn].id)
  let nmmr = top[indexn].mmr - 25
  ref2.update({
    mmr: nmmr,
    matchs: top[indexn].matchs + 1
  });

channel.sendMessage('El usuario ' + top[indexn].nick + ' perdio 25 puntos, ahora tiene ' + nmmr +
' puntos de mmr')
  top = false
break
}
else{
  if (input[1]){
    channel.sendMessage('El usuario ' + nickname + ' no existe')
  }
else {
   msg.reply('Te falto algo, acordate que es .check nick')
}
break
}
}
else
{
  channel.sendMessage(DICT.ERRORS.err_not_admin);
break;
}

case 'check':
if (toplist != true){
top = [];
for (var key in base.usersE) {
    if (typeof(base.usersE[key].mmr) != 'undefined'){
      top.push({mmr: base.usersE[key].mmr, nick: base.usersE[key].nick, id: key, wins: base.usersE[key].wins, matchs: base.usersE[key].matchs});
}
    }
    top.sort(function(a, b){return b.mmr - a.mmr});
    toplist = true;
}
activa.splice(0,7)
let nickname = activa.join('')
let indexn = iob(top, nickname)
if (indexn > -1) {
channel.sendMessage('El usuario ' + top[indexn].nick + ' tiene ' + top[indexn].mmr +
' puntos de mmr y ' + ((top[indexn].wins / top[indexn].matchs) * 100 ) + '% de winrate en ' + top[indexn].matchs + ' partidas.')
break
}
else{
  if (input[1]){

    channel.sendMessage('El usuario ' + nickname + ' no existe')
  }
else {
   msg.reply('Te falto algo, acordate que es .check nick')
}
break
}

case 'unreg':
if (base.usersE[fromUser].level >= 3) {
  let ref3 = db.ref('matchs/0')
  ref3.set({matchid: "inicio"})

  for (var key in base.usersE) {
    if (typeof(base.usersE[key].mmr) != 2000){
      let refx = db.ref('usersE/'+ key)
      refx.update({mmr: 2000})
    }
    else {
      continue
    }

  }
  channel.sendMessage('Se resetearon los mmr')
break



}
else
{
  channel.sendMessage(DICT.ERRORS.err_not_admin);
break;
};

case 'vouch':
if (base.usersE[fromUser].level >= 2) {
if (input[1]){
  activa.splice(0,7)
  let nickname = activa.join('')
  let ref = db.ref('vouchs')
  ref.push({
    id: nickname
  })
  channel.sendMessage('Se agrego la cuenta: ' + nickname + ' como usuario voucheado.')
  break
}
else {
  channel.sendMessage('Te falto el nick')
  break
}
  }



else
{
  channel.sendMessage(DICT.ERRORS.err_not_admin);
break;
};

case 'reg':
if (typeof(base.usersE[fromUser]) != 'undefined') {
msg.reply('Vos ya estas registrado picaron')
break
}
else{

  if (input[1]){
    if (input[1].length == 17){

  let ref = db.ref('usersE/'+ fromUser)
activa.splice(0,23)
  let nickname = activa.join('')
  ref.set({mmr: 2000,
          name: input[1],
          nick: nickname,
          level: 1,
          matchs: 0,
          wins: 0})
          channel.sendMessage( nickname +
            ' Acaba de ser registrado en la Dota 2 In-House League')
          break
        }
        else{
          msg.reply('El SteamID no esta de la forma correcta,'
          + ' fijate el pin de arriba para mas informacion')
          break
        }
  }
  else{
    msg.reply('Te falto algo, acordate que es .reg SteamID Nick')
    break
  }

}

case 'inq':
case 'inqueue':
if (inLobby == true){
  channel.sendMessage('En este momento la cola esta off, hay un lobby hosteado')
  break
}
if (players.length > 0){
  let b = get(players)
  channel.sendMessage('En este momento hay ' + players.length + ' jugador(es): ( ' + b
  + ') en queue para jugar')
  break
}
else{
 channel.sendMessage('En este momento no hay jugadores en queue para jugar')
 break
}



case 'leave':
if (inLobby == true){
  break
}
if (ioa(players, fromUser) >= 0){
let index = ioa(players, fromUser)
if (index > -1) {
    players.splice(index, 1);
    queue = queue - 1
    channel.sendMessage('Hay ' + queue + ' persona(s) listas para jugar');

}
break
}
else {
  channel.sendMessage('Vos no estabas en queue para jugar')
  break
}

case 'q':
case 'sign':
if (typeof(base.usersE[fromUser]) == 'undefined') {
  msg.reply('no estas registrado en la Dota 2 In-House League')
break
}
if (inLobby === true){
  channel.sendMessage('Actualmente hay un lobby hosteado, espera a que el game se mande')
  break
}
if (botInUse1 === true && botInUse2 === true && botInUse3 === true
&& botInUse4 === true){
  channel.sendMessage('Actualmente no hay bots, espera que un game termine')
  break
}


  if (queue < 10)
  {

    if (ioa(ingame, fromUser) >= 0){
          msg.reply('Vos estas ingame, no podes entrar en la cola')
          break
        }
    else if (ioa(players, fromUser) >= 0){
      //msg.reply('Vos ya estas en cola')
      break
    }

    else{
      clearTimeout(timerq);
      qtime();
let acen = new BigNumber(base.usersE[fromUser].name).minus('76561197960265728')
acen = acen.toNumber()
acen = acen + ''
    queue = queue + 1
    players.push({id: fromUser, mmr: base.usersE[fromUser].mmr,
       nick: base.usersE[fromUser].nick, name: acen, invite: base.usersE[fromUser].name});
    channel.sendMessage('Hay ' + queue + ' persona(s) listas para jugar');

  }
  }
 if (queue == 10){
   inLobby = true
   antiq = false
   clearTimeout(timerq);
 number = Object.keys(base.matchs).length
    channel.sendMessage('Creando Lobby numero ' + number + '...')


players.sort(function(a, b){return b.mmr - a.mmr});

for (var j = 0; j < players.length; j++){

 //xplayer[j] = primex(players[j].mmr, players[0].mmr, players[9].mmr);
xplayer[j] = 1


     if ((direval <= radiantval || radiantplayers.length == 5)&& direplayers.length != 5 ){
       dire.push(players[j].mmr);
       direplayers.push({nick:players[j].nick, xp: xplayer[j], id: players[j].id, name: players[j].name,
          mmr: players[j].mmr, invite: players[j].invite});
     }
     else if ((direval > radiantval || direplayers.length == 5) && radiantplayers.length != 5){
       radiant.push(players[j].mmr);
       radiantplayers.push({nick:players[j].nick, xp: xplayer[j], id: players[j].id, name: players[j].name,
         mmr: players[j].mmr, invite: players[j].invite});
     }
     direval = dire.reduce(add,0)
     radiantval = radiant.reduce(add,0)
}
channel.sendMessage('@here Lobby creado\n' + 'Team radiant = (C) ' + get(radiantplayers) + '\n' + 'Team dire = (C) ' + get(direplayers))




    if (botInUse1 == false){
  let gamename = 'In-HouseLeague' + number
      dota1.createPracticeLobby('',{"game_name": gamename,
                                "server_region": server,
                                 "game_mode": 2,
                                  "allow_cheats": false,
                                  "fill_with_bots": false,
                                  "allow_spectating": true,
                                 "allchat": false
                               });
      logger.log("Lobby Creado");
        dota1.joinPracticeLobbyTeam(2, 4);
  for (var o = 0; o < players.length; o++){
    dota1.inviteToLobby(players[o].invite)
  }
   match1.number = number
    playersbot1.dire = direplayers;
    playersbot1.radiant = radiantplayers;
    players = [];
    xplayer = [];
    radiant = [];
    dire = [];
    lobbyp = [];
    direval = 0;
    radiantval = 0;
    direplayers = [];
    radiantplayers = [];
    queue = 0;
    inLobby = true;
    break;
}

if (botInUse2 == false){
  let gamename = 'In-HouseLeague' + number
      dota2.createPracticeLobby('',{"game_name": gamename,
                            "server_region": server,
                             "game_mode": 2,
                              "allow_cheats": false,
                              "fill_with_bots": false,
                              "allow_spectating": true,
                             "allchat": false
                           });
  logger.log("Lobby Creado");
      dota2.joinPracticeLobbyTeam(2, 4);
inLobby = true;
for (var o = 0; o < players.length; o++){
  dota2.inviteToLobby(players[o].invite)
}
playersbot2.dire = direplayers;
playersbot2.radiant = radiantplayers;
 match2.number = number
 players = [];
 xplayer = [];
 radiant = [];
 dire = [];
 lobbyp = [];
 direval = 0;
 radiantval = 0;
 direplayers = [];
 radiantplayers = [];
 queue = 0;
break;
}

if (botInUse3 == false){
  let gamename = 'In-HouseLeague' + number
      dota3.createPracticeLobby('',{"game_name": gamename,
                            "server_region": server,
                             "game_mode": 2,
                              "allow_cheats": false,
                              "fill_with_bots": false,
                              "allow_spectating": true,
                             "allchat": false
                           });
  logger.log("Lobby Creado");
  dota3.joinPracticeLobbyTeam(2, 4);

for (var o = 0; o < players.length; o++){
  dota3.inviteToLobby(players[o].invite)
}
playersbot3.dire = direplayers;
playersbot3.radiant = radiantplayers;
 match3.number = number
 players = [];
 xplayer = [];
 radiant = [];
 dire = [];
 lobbyp = [];
 direval = 0;
 radiantval = 0;
 direplayers = [];
 radiantplayers = [];
 queue = 0;
break;
}

if (botInUse4 == false){
let gamename = 'In-HouseLeague' + number
  dota4.createPracticeLobby('',{"game_name": gamename,
                            "server_region": server,
                             "game_mode": 2,
                              "allow_cheats": false,
                              "fill_with_bots": false,
                              "allow_spectating": true,
                             "allchat": false
                           });
  logger.log("Lobby Creado");
    dota4.joinPracticeLobbyTeam(2, 4);
for (var o = 0; o < players.length; o++){
dota4.inviteToLobby(players[o].invite)
}
match4.number = number
playersbot4.dire = direplayers;
playersbot4.radiant = radiantplayers;
players = [];
xplayer = [];
radiant = [];
dire = [];
lobbyp = [];
direval = 0;
radiantval = 0;
direplayers = [];
radiantplayers = [];
queue = 0;
inLobby = true;
break;
}

  }
}


/*  else {
    channel.sendMessage(randomResponse());
    return;
  }*/


}
else{
  channel.sendMessage('El bot todavia no esta listo, espera unos segundos')
  return
}
}
else {
  return
};
});

function ctime(){
  if (antic != true){
  timerc = setTimeout(function(){
      cafk();
  }, 600000);
  antic = true
  }
}

function cafk(){
  challenge = false
  challengep = [];
  channel.sendMessage('Pasaron mas de 10 mins desde que inicio el challenge, el mismo se dara por cancelado..')
antic = false
}

function qtime(){
  if (antiq != true){
  timerq = setTimeout(function(){
      qafk();
  }, 1800000);
  antiq = true
  }
}

function qafk(){
  queue = 0;
  players = [];
  channel.sendMessage('Pasaron mas de 30 mins desde el ultimo sign, eliminando la queue...')
antiq = false
}

function time(b){
if (antiafk != true){
timer = setTimeout(function(){
    afk(b);
}, 180000);
antiafk = true
}
}

function afk(b){
    players = [];
  for (var x = 0; x < playerslobby.length; x++){
players.push(playerslobby[x])
  }
    for (var i = 1; i < lobbyp.length; i++){
    b.practiceLobbyKick(lobbyp[i].id.low)

  }

    b.leavePracticeLobby();
    queue = players.length
    channel.sendMessage('El lobby se cancelo porque alguien fallo en aceptar, volviendo a la cola de emparejamiento')
    qtime()
    xplayer = [];
    radiant = [];
    dire = [];
    lobbyp = [];
    direval = 0;
    radiantval = 0;
    direplayers = [];
    radiantplayers = [];
    antiafk = false
    inLobby = false
}
}





function randomResponse() {
  let responses = DICT.random_responses;
  return responses[Math.floor(Math.random() * responses.length)];
}


function shutdown() {
  logger.log('Shutting down Jankbot...');
  process.exit();
  bot1ready = false;
  bot2ready = false;
  bot3ready = false;
  bot4ready = false;

}

function primex(x, max, min)
{
  let xx = (x - min) / (max - min)
  return xx
}

function add(a, b) {
    return a + b;
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].name == obj) {

            return i;
        }
    }
    return -1;
}





function ioa(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].id === obj) {
            return i;
        }
    }
    return -1;
}

function iob(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].nick.toLowerCase() === obj) {
            return i;
        }
    }
    return -1;
}

function iov(a, obj) {
    for (var key in a) {
        if (a[key].id === obj) {
            return 1;
        }
    }
    return -1;
}


function get(a){
  let name = [];
  for(var i = 0; i < a.length; i++){
    name.push(a[i].nick + ' ')
  }
  return name
}

function poolp(a){
  let name = [];
  for(var i = 2; i < a.length; i++){
    name.push(a[i].nick + ' ' + '(' + a[i].mmr + ') ')
  }
  return name
}




// Help text.
function help(isAdmin) {
  let resp = '\n';
  if (helpInfo === '') {
    resp += DICT.help_message + '\n\n';
  } else {
    resp += helpInfo + '\n\n';
  }




  // Core commands.
  for (let cmd in DICT.CMDS) {
    if (typeof cmd === 'string') {
      resp += cmd + ' - ' + DICT.CMD_HELP[cmd] + '\n';
    }
  }

  return resp;
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
