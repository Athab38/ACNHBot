var CONST_VALUES = require('./const.js');

// global variable for turnips
var infoMax = "";

function infoNavets() {
  let info = "";
  //693798630267813950, id channel navets
  CONST_VALUES.client.channels.fetch('693798630267813950')
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

module.exports = {infoNavets, navetsInfo};
