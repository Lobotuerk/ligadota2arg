let firebase = require("firebase")

firebase.initializeApp({
  serviceAccount: "./data/Liga Dota 2 Arg.json",
  databaseURL: "https://liga-dota-2-arg.firebaseio.com/"
});

let latitude;
let longitude;
let time;

let db = firebase.database()
let refLat = db.ref('lat');
let refLong = db.ref('lat');
let refTime = db.ref('lat');

refLat.on("value", function(snapshot) {
base = snapshot.val();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
