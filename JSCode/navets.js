var CONST_VALUES = require('./const.js');

// global variable for turnips
var infoMax = "";

function infoNavets(channelID) {
  CONST_VALUES.client.channels.fetch(channelID)
    .then(channel => {
    channel.messages.fetch()
    .then(messages => {
      infoMax = traiteMessageNavets(messages);
      console.log(infoMax);
    })
    .catch(console.error);
    })
    .catch(console.error);
    return infoMax;
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
  return prixNavetMax + ' chez ' + tabMess[indiceMax].author.username + '#' + tabMess[indiceMax].author.discriminator;
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

module.exports = {infoNavets, navetsInfo, findNavetChannelID};
