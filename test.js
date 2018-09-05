var steam = require("steam"),
    dota2 = require("dota2"),
    steamClient = new steam.SteamClient(),
    steamUser = new steam.SteamUser(steamClient),
    steamFriends = new steam.SteamFriends(steamClient),
    Dota2 = new dota2.Dota2Client(steamClient, true),
    fs = require("fs");

    steamClient.connect();
    console.log('Bot1 Iniciado')
    steamUser.on('connected', function() {
      steamClient.logOn({
        account_name: "InLeArg2",
        password: "ligadota2"
      });
    });



    steamClient.on('logOnResponse', function() {
      console.log('Bot 1' + DICT.SYSTEM.system_loggedin);
      steamFriends.setPersonaState(Steam.EPersonaState.Online);
      Dota2.launch();
      Dota2.on('ready', function() {
        console.log('Bot 1 Seteado');
});
    });
