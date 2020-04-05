'use strict';
var snoowrap = require('snoowrap');
var CONST_VALUES = require('./const.js');

// global variable for turnips
var infoMax = "";
var lastPost = "";

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



function getNewPostsActurnips(msg, time) {
  var dateNow = new Date().getTime();
  CONST_VALUES.r.getSubreddit('acturnips').getNew({limit : 1, skipReplies : true}).map(post => post.title).then(function(titles) {
    lastPost = titles[0];
    console.log(lastPost);
  });
  var interval = setInterval(function() {
    if (new Date().getTime() - dateNow > time) {
      clearInterval(interval);
      return;
    }
    CONST_VALUES.r.getSubreddit('acturnips').getNew({limit : 1, skipReplies : true}).then(titles => notifyUser(titles, msg));
  }, 3000);
}

function notifyUser(titles, msg) {
  if (lastPost !== titles[0].title) {
    if (titles[0].title.includes(' buying ')) {
      msg.author.send("Salut, un nouveau post reddit est disponible à : " + titles[0].url);
    }
  }
  lastPost = titles[0].title;
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
