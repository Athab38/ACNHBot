var CONST_VALUES = require('./const.js');
var tools = require('./tools.js');

function bulletinInsulaire() {
  CONST_VALUES.client.login(CONST_VALUES.token);

    for (let c of CONST_VALUES.client.guilds.cache) {
      var channelID = findBulletinChannelID(c[1]);
      // clean old bulletin
      CONST_VALUES.client.channels.fetch(channelID)
        .then(channel => channel.bulkDelete(1))
        .catch(console.error);
      CONST_VALUES.client.channels.fetch(channelID)
        .then(channel => channel.send(texteBulletinInsulaire()))
        .catch(console.error);
    }

}


function texteBulletinInsulaire() {
  var txt = "";
  txt += "Bonjour à tous, nous sommes le ";
  var date = new Date();
  var j = date.getDay();
  var m = date.getMonth();
  var a = date.getFullYear();
  txt += tools.dayToString(j) + ' ';
  txt += date.getDate() + ' ';
  txt += tools.monthToString(m) + ' ';
  txt += a + ' et voici votre bulletin insulaire quotidien !\n';
  txt += "S'il te manque un de ces insectes ou poissons, dépêches-toi, c'est le dernier mois pour les attraper : \n";
  txt += "\tInsectes : \n";
  txt += "\t" + "\t" + dernierMoisInsectes();
  txt += "\tPoissons : \n";
  txt += "\t" + "\t" + dernierMoisPoissons();
  txt += "Pour ce qui est des nouveaux poissons et insectes de ce mois-ci, voici la liste : \n";
  txt += "\tInsectes : \n";
  txt += "\t" + "\t" + premierMoisInsectes();
  txt += "\tPoissons : \n";
  txt += "\t" + "\t" + premierMoisPoissons();
  return txt;
}

function dernierMoisInsectes() {
  var date = new Date();
  var lastInsectes = "";
  for (i = 0; i < CONST_VALUES.insectesN.length; i++) {
    if (CONST_VALUES.insectesN[i].période.split(', ')[1]) {
      var p1 = CONST_VALUES.insectesN[i].période.split(', ')[0];
      var p2 = CONST_VALUES.insectesN[i].période.split(', ')[1];
      if (p1.split(' - ')[1] === tools.monthToString(date.getMonth())) {
        lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
      }
      if (p2.split(' - ')[1]) {
        if (p1 !== p2 && p2.split(' - ')[1] === tools.monthToString(date.getMonth())) {
          lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
        }
      } else {
        if (p2 === tools.monthToString(date.getMonth())) {
          lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
        }
      }
    } else if (CONST_VALUES.insectesN[i].période.split(' - ')[1] === tools.monthToString(date.getMonth())) {
      lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
    }
  }
  lastInsectes = lastInsectes.substring(0, lastInsectes.length - 2);
  return lastInsectes + '\n';
}

function dernierMoisPoissons() {
  var date = new Date();
  var lastPoissons = "";
  for (i = 0; i < CONST_VALUES.poissonsN.length; i++) {
    if (CONST_VALUES.poissonsN[i].période.split(', ')[1]) {
      var p1 = CONST_VALUES.poissonsN[i].période.split(', ')[0];
      var p2 = CONST_VALUES.poissonsN[i].période.split(', ')[1];
      if (p1.split(' - ')[1] === tools.monthToString(date.getMonth())) {
        lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
      }
      if (p2.split(' - ')[1]) {
        if (p1 !== p2 && p2.split(' - ')[1] === tools.monthToString(date.getMonth())) {
          lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
        }
      } else {
        if (p2 === tools.monthToString(date.getMonth())) {
          lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
        }
      }
    } else if (CONST_VALUES.poissonsN[i].période.split(' - ')[1] === tools.monthToString(date.getMonth())) {
      lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
    }
  }
  lastPoissons = lastPoissons.substring(0, lastPoissons.length - 2);
  return lastPoissons + '\n';
}

function premierMoisInsectes() {
  var date = new Date();
  var lastInsectes = "";
  for (i = 0; i < CONST_VALUES.insectesN.length; i++) {
    if (CONST_VALUES.insectesN[i].période.split(', ')[1]) {
      var p1 = CONST_VALUES.insectesN[i].période.split(', ')[0];
      var p2 = CONST_VALUES.insectesN[i].période.split(', ')[1];
      if (p1.split(' - ')[0] === tools.monthToString(date.getMonth())) {
        lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
      }
      if (p2.split(' - ')[0]) {
        if (p1 !== p2 && p2.split(' - ')[0] === tools.monthToString(date.getMonth())) {
          lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
        }
      } else {
        if (p2 === tools.monthToString(date.getMonth())) {
          lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
        }
      }
    } else if (CONST_VALUES.insectesN[i].période.split(' - ')[0] === tools.monthToString(date.getMonth())) {
      lastInsectes += CONST_VALUES.insectesN[i].nom + ', ';
    }
  }
  lastInsectes = lastInsectes.substring(0, lastInsectes.length - 2);
  return lastInsectes + '\n';
}

function premierMoisPoissons() {
  var date = new Date();
  var lastPoissons = "";
  for (i = 0; i < CONST_VALUES.poissonsN.length; i++) {
    if (CONST_VALUES.poissonsN[i].période.split(', ')[1]) {
      var p1 = CONST_VALUES.poissonsN[i].période.split(', ')[0];
      var p2 = CONST_VALUES.poissonsN[i].période.split(', ')[1];
      if (p1.split(' - ')[0] === tools.monthToString(date.getMonth())) {
        lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
      }
      if (p2.split(' - ')[0]) {
        if (p1 !== p2 && p2.split(' - ')[0] === tools.monthToString(date.getMonth())) {
          lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
        }
      } else {
        if (p2 === tools.monthToString(date.getMonth())) {
          lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
        }
      }
    } else if (CONST_VALUES.poissonsN[i].période.split(' - ')[0] === tools.monthToString(date.getMonth())) {
      lastPoissons += CONST_VALUES.poissonsN[i].nom + ', ';
    }
  }
  lastPoissons = lastPoissons.substring(0, lastPoissons.length - 2);
  return lastPoissons + '\n';
}

function findBulletinChannelID(server) {
  for (let names of server.channels.cache) {
    if (names[1].name.includes('bulletin')) {
      return names[1].id;
    }
  }
  return -1;
}


module.exports = {bulletinInsulaire, findBulletinChannelID};
