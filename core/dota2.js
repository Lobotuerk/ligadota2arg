'use strict';

let logger = require('./logger.js');
let dota2 = require('dota2');
let inGame = false;
let steam = require("steam");
let util = require("util");
let fs = require("fs");
let crypto = require("crypto");
let inLobby = false


/*exports.init = function(bot) {

return;
},*/

exports.command = function(source, input, original) {

  let command = input[1];
  if (actions.hasOwnProperty(command)) {
    actions[command](source, input, original);
    return;
  } else {
    return;
  }
};

let actions = {

launch: function() {
  if (!inGame) {
    Dota2.launch();
    inGame = true;
    logger.log("Iniciando Dota2")

    Dota2.on('ready', function() {
      logger.log('Dota2 is ready to do things.');
    });
  };
},

gg: function() {
  if (inGame) {
    Dota2.exit();
    inGame = false;
  };
},





cLobby: function(source, input, original) {
  let name = input[2]
  let password = input[3]
    if (inGame) {
        if (!inLobby) {
    Dota2.createPracticeLobby({password},
                                {"game_name": name,
                              "server_region": 10,
                               "game_mode": 2,
                                "allow_cheats": false,
                                "fill_with_bots": false,
                                "allow_spectating": true,
                                 "pass_key": password,
                                "radiant_series_wins": 0,
                                "dire_series_wins": 0,
                               "allchat": false
                             },{});
 inLobby = True;
 logger.log("Lobby Created");
  }
}
},

eLobby: function() {
  Dota2.leavePracticeLobby(function(err, body){
         console.log(JSON.stringify(body))});
},

}
/*
exports.onExit = function() {
  if (inGame) {
    Dota2.leavePracticeLobby(function(err, body){
           console.log(JSON.stringify(body))});
    Dota2.exit();
    inGame = false;

};
}
*/
