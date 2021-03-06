'use strict';
var snoowrap = require('snoowrap');
var CONST_VALUES = require('./const.js');

// global variable for turnips
var infoMax = "";
var lastPost = "";
// number of users launching !notifme at the same time
var parallelUsers = -1;
var tabMsg = [];
var tabPrix = [];
var tabTemps = [];

function infoNavets(channelID) {
  CONST_VALUES.client.channels.fetch(channelID)
    .then(channel => {
    channel.messages.fetch()
    .then(messages => {
      infoMax = traiteMessageNavets(messages);
    })
    .catch(console.error);
    })
    .catch(console.error);
    return infoMax;
}



function getNewPostsActurnips(msg, time, price, stop) {
  if (!stop) {
    // new user using !notifme
    if (tabMsg !== undefined && tabMsg.length != 0 ) {
      for (let i = 0; i < tabMsg.length; i++) {
        if (msg.author === tabMsg[i].author) {
          msg.reply("tu as déjà un notifme en cours. Attends son expiration ou fais !notifme stop pour l'arrêter manuellement.");
          return;
        }
      }
    }
    var pluriel = (time/60000 > 1) ? "s" : "";
    msg.reply('ton alerte a été lancée pour ' + time/60000 + ' minute' + pluriel + ' avec un prix minimum de ' + price + ', fais attention à tes messages privés !');
    parallelUsers++;
    tabMsg.push(msg);
    tabPrix.push(price);
    tabTemps.push(time);
    var dateNow = new Date().getTime();
    CONST_VALUES.r.getSubreddit('acturnips').getNew({limit : 1, skipReplies : true}).map(post => post.title).then(function(titles) {
      lastPost = titles[0];
    });
  }
  var interval = setInterval(function() {
    if (new Date().getTime() - dateNow > time) {
      // a user has finished
      clearInterval(interval);
      parallelUsers--;
      var indiceUser = tabTemps.indexOf(time);
      // remove user and price and notify user
      var tempsUser = tabTemps.splice(indiceUser, 1)[0] / 60000;
      var userToNotify = tabMsg.splice(indiceUser, 1)[0];
      var prixUser = tabPrix.splice(indiceUser, 1)[0];
      var pluriel = (tempsUser > 1) ? "s" : "";
      userToNotify.author.send("Les " + tempsUser + " minute" + pluriel + " sont écoulées, n'hésites pas à relancer la commande si tu n'as pas trouvé ce que tu voulais !");
      return;
    }
    if (stop) {
      clearInterval(interval);
      if (tabMsg !== undefined && tabMsg.length != 0 ) {
        for (let i = 0; i < tabMsg.length; i++) {
          if (msg.author === tabMsg[i].author) {
            var tempsUser = tabTemps.splice(i, 1)[0] / 60000;
            var userToNotify = tabMsg.splice(i, 1)[0];
            var prixUser = tabPrix.splice(i, 1)[0];
            msg.reply("ton notifme en cours a été arrêté.");
            return;
          }
        }
      }
      msg.reply("tu n'as aucun notifme en cours.");
      return;
    }
    //console.log(msg.author.tag);
    CONST_VALUES.r.getSubreddit('acturnips').getNew({limit : 1, skipReplies : true}).then(titles => notifyUsers(titles, price));
  }, 3000);
}

function notifyUsers(titles) {
  if (lastPost !== titles[0].title) {
    if (titles[0].title.toLowerCase().includes(' buying ') && titles[0].title.toLowerCase().includes('[sw]') && !titles[0].title.toLowerCase().includes(' selling ')) {
      for (let i = 0; i < tabMsg.length; i++) {
        var priceReddit = titles[0].title.match(/(\s|^)\d+(\s|$)/g);
        if (tabPrix[i] != 0 && priceReddit >= tabPrix[i]) {
          tabMsg[i].author.send("Salut, un nouveau post reddit est disponible à : " + titles[0].url);
        }
      }
    }
  }
  lastPost = titles[0].title;
  //console.log(lastPost + ' // ' + parallelUsers + ' // ' + tabPrix + ' // ' + tabTemps +  ' // ' + tabMsg);
}

function traiteMessageNavets(mess) {
  let tabMess = mess.array();
  let prixNavetMax = parseInt('-1');
  let prixNavet = 0;
  let indiceMax = 0;
  for (i = 0; i < tabMess.length; i++) {
    if (navetActuel(tabMess[i].createdTimestamp)) {
      prixNavet = parseInt(tabMess[i].content.match(/(\s|^)\d+(\s|$)/g));
      if (prixNavet > prixNavetMax) {
        prixNavetMax = prixNavet;
        indiceMax = i;
      }
    }
  }
  if (prixNavetMax == -1) {
    // Space after -1 is important
    return "-1 ";
  } else {
    return prixNavetMax + ' chez ' + tabMess[indiceMax].author.username + '#' + tabMess[indiceMax].author.discriminator;
  }
}

function navetActuel(time) {
  var date = new Date(time);
  var dateActu = new Date();
  if (date.getFullYear() === dateActu.getFullYear() && date.getMonth() === dateActu.getMonth() && date.getDay() === dateActu.getDay()) {
    if (dateActu.getHours() < 12 && date.getHours() < 12 && dateActu.getHours() >= 6 && date.getHours() >= 6) {
      return true;
    } else if ((dateActu.getHours() >= 12 && date.getHours() >= 12) && (dateActu.getHours() < 22 && date.getHours() < 22)) {
      return true;
    } else {
      return false;
    }
  }
}

function navetsInfo(msg) {
  if (infoMax.includes('-1 ')) {
    msg.reply("il n'y a pas d'infos sur les navets actuellement");
  } else {
    msg.reply("le prix du navet le plus haut est " + infoMax);
  }
}

function findNavetChannelID(ServerID) {
  for (let c of CONST_VALUES.client.guilds.cache) {
    // c[0] is guild ID
    if (parseInt(c[0]) == parseInt(ServerID)) {
      for (let names of c[1].channels.cache) {
        if (names[1].name.includes('navet')) {
          return names[1].id;
        }
      }
      return -1;
    }
  }
}

// function getNewPostsActurnips() {
//   CONST_VALUES.http.get('https://www.reddit.com/r/acturnips/new.json?limit=1', (resp) => {
//   let data = '';
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });
//
//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     for (c of JSON.parse(data).data.children) {
//     lastPost = c.data.title + ' : ' + c.data.url;
//     return lastPost;
//     }
//   });
//
// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });
//
// console.log('Dernier : ' + lastPost);
// }

module.exports = {infoNavets, navetsInfo, findNavetChannelID, getNewPostsActurnips};
