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
  txt += "S'il vous manque un de ces insectes ou poissons, dépêchez-vous, c'est le dernier mois pour les attraper : \n";
  txt += "\tInsectes : \n";
  txt += "\t" + "\t" + dernierMoisInsectes();
  txt += "\tPoissons : \n";
  txt += "\t" + "\t" + dernierMoisPoissons();
  txt += "Pour ce qui est des nouveaux poissons et insectes de ce mois-ci, voici la liste : \n";
  txt += "\tInsectes : \n";
  txt += "\t" + "\t" + premierMoisInsectes();
  txt += "\tPoissons : \n";
  txt += "\t" + "\t" + premierMoisPoissons();
  txt += currentEvents();
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

function currentEvents() {
  var date = new Date();
  var events = "Et voici la liste des événements d'aujourd'hui : \n";
  var found = false;
  for (i = 0; i < CONST_VALUES.events.length; i++) {
    if (date.getDate() + ' ' + tools.monthToString(date.getMonth()).toLowerCase() == CONST_VALUES.events[i].période) {
      events += "\t" + CONST_VALUES.events[i].nom + "\n";
      found = true;

  // events from date to date
  } else if (CONST_VALUES.events[i].période.includes(' au ')) {
      var start = CONST_VALUES.events[i].période.split(' au ')[0];
      var end = CONST_VALUES.events[i].période.split(' au ')[1];
      var endMonth = end.split(' ')[1];
      var endDay = end.split(' ')[0];
      var startDay = start.split(' ')[0];
      startDay = parseInt(startDay.match(/^\d+/g));
      endDay = parseInt(endDay.match(/^\d+/g));
      // start month == end month
      if (!start.split(' ')[1]) {
        // same month
        if (endMonth == tools.monthToString(date.getMonth()).toLowerCase()) {
          // day is good
          if (startDay <= date.getDay() && endDay >= date.getDay()) {
            events += "\t" + CONST_VALUES.events[i].nom + "\n";
          }
        }
      } else {
        var startMonth = start.split(' ')[1];
        startMonth = startMonth.charAt(0).toUpperCase() + startMonth.slice(1);
        endMonth = endMonth.charAt(0).toUpperCase() + endMonth.slice(1);
        console.log(endMonth);
        if (tools.monthToInt(startMonth) < date.getMonth() && tools.monthToInt(endMonth) > date.getMonth()) {
          events += "\t" + CONST_VALUES.events[i].nom + "\n";
          found = true;
        } else if (tools.monthToInt(startMonth) == date.getMonth()) {
          if (startDay <= date.getDate()) {
            events += "\t" + CONST_VALUES.events[i].nom + "\n";
            found = true;
          }
        } else if (tools.monthToInt(endMonth) == date.getMonth()) {
          if (endDay >= date.getDate()) {
            events += "\t" + CONST_VALUES.events[i].nom + "\n";
            found = true;
          }
        }
      }
    } else if (CONST_VALUES.events[i].période == tools.monthToString(date.getMonth())) {
      events += "\t" + CONST_VALUES.events[i].nom + "\n";
      found = true;
    } else if (CONST_VALUES.events[i].période.includes('Premier ') || CONST_VALUES.events[i].période.includes('Deuxième ') || CONST_VALUES.events[i].période.includes('Troisème ') || CONST_VALUES.events[i].période.includes('Quatrième ') || CONST_VALUES.events[i].période.includes('Cinquième ')) {
      // ((?:a|b)c) captures either ac or bc, so here " de " or " d'"
      var tabMois = CONST_VALUES.events[i].période.split(/\sd(?:e\s|\')/)[1];
      // ((?:a|b)c) captures either ac or bc, so here ", " or " et "
      tabMois = tabMois.split(/(?:,|\set)\s/);
      if (tabMois.includes(tools.monthToString(date.getMonth()).toLowerCase())) {
        var occurence = tools.chiffreToInt(CONST_VALUES.events[i].période.split(' ')[0]);
        var jourInt = CONST_VALUES.events[i].période.split(' ')[1];
        jourInt = jourInt.charAt(0).toUpperCase() + jourInt.slice(1);
        jourInt = tools.dayToInt(jourInt);
        // if day of the event is the same day as today
        if (jourInt === date.getDay()) {
          // we need to check if the occurence matches
          var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          var jourActu = date.getDay();
          var diff = jourActu - firstDay.getDay();
          // get first day of the month
          firstDay = new Date(date.getFullYear(), date.getMonth(), 1 + diff);
          //console.log(tools.dayToString(firstDay.getDay()) + ' jour numero : '  + firstDay.getDate());
          var jourOccu = firstDay.getDate();
          for (let i = 0; i < occurence; i++) {
            jourOccu += 7;
          }
          if (jourOccu == date.getDate()) {
            events += "\t" + CONST_VALUES.events[i].nom + "\n";
            found = true;
          }
        }
      }
    }
  }
  if (found)  {
    return events;
  } else {
    return "";
  }
}

function findBulletinChannelID(server) {
  for (let names of server.channels.cache) {
    if (names[1].name.includes('bulletin')) {
      return names[1].id;
    }
  }
  return -1;
}


module.exports = {bulletinInsulaire, findBulletinChannelID, currentEvents};
