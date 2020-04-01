const Discord = require('discord.js');
const cron = require('node-cron');
const client = new Discord.Client();
var insectesN = require('./nord/insectesN.json');
var poissonsN = require('./nord/poissonsN.json');
var insectesS = require('./sud/insectesS.json');
var poissonsS = require('./sud/poissonsS.json');
//TODO: traiter, eventuellement, plus de filtres (sans ordre)
var listeCommandes = ["!insectes nord|sud : cette commande te donnes les insectes actuellement disponibles dans l'hémisphère nord|sud ainsi que leur détails (prix, taille, localisation...)",
"!poissons nord|sud : cette commande te donnes les poissons actuellement disponibles dans l'hémisphère nord|sud ainsi que leur détails (prix, taille, localisation...)",
"!aide : cette commande t'affiches les différentes commandes disponibles",
"!details : cette commande t'affiches les détails d'un poisson ou d'un insecte en particulier (prix, taille, localisation...). Exemple : !details poisson-scorpion. Optionnel : sud après l'animal pour les détails sur l'hémisphère sud",
"!navets : cette commande t'affiches le prix le plus haut du cours du navet indiqué dans le channel #navets, pensez à compléter ce channel avec vos prix pour connaître le meilleur !"];
const nomMois = ["Janvier", "Février" ,"Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const nomJours = ["Lundi", "Mardi" ,"Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
var infoMax = "";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
  console.log(msg.content);
  // Vérifier le premier input de la commande
  if(msg.content.split(' ')[0 ]==='!insectes' || msg.content.split(' ')[0] ==='!poissons')
  { // Si c'est une commande concernant les insectes ou les poissons
    if(msg.content.split(' ')[1] != 'nord' && msg.content.split(' ')[1] != 'sud')
    { // si le premier parametre n'est pas l'hemisphere
      msg.reply("tu dois seulement écrire 'nord' ou 'sud' après cette commande");
    }
    else
    {
      if (msg.content.split(' ')[0] === '!insectes') {
        if (msg.content.split(' ')[1] === 'nord') {
          msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeInsectesNow(insectesN, 0, Math.floor(insectesN.length/3)));
          msg.reply('\n' + listeInsectesNow(insectesN, Math.floor(insectesN.length/3), Math.floor(2*insectesN.length/3)));
          msg.reply('\n' + listeInsectesNow(insectesN, Math.floor(2*insectesN.length/3), insectesN.length));
        } else if (msg.content.split(' ')[1] === 'sud') {
          msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeInsectesNow(insectesS, 0, Math.floor(insectesS.length/3)));
          msg.reply('\n' + listeInsectesNow(insectesN, Math.floor(insectesS.length/3), Math.floor(2*insectesS.length/3)));
          msg.reply('\n' + listeInsectesNow(insectesN, Math.floor(2*insectesS.length/3), insectesS.length));
        }

      } else if (msg.content.split(' ')[0] === '!poissons') {
        if (msg.content.split(' ')[1] === 'nord') {
          msg.reply('voici la liste des poissons disponibles actuellement : \n' + listePoissonsNow(poissonsN, 0, Math.floor(poissonsN.length/3)));
          msg.reply('\n' + listeInsectesNow(poissonsN, Math.floor(poissonsN.length/3), Math.floor(2*poissonsN.length/3)));
          msg.reply('\n' + listeInsectesNow(poissonsN, Math.floor(2*poissonsN.length/3), poissonsN.length));
        } else if (msg.content.split(' ')[1] === 'sud') {
          msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeInsectesNow(poissonsS, 0, Math.floor(poissonsS.length/3)));
          msg.reply('\n' + listeInsectesNow(insectesN, Math.floor(poissonsS.length/3), Math.floor(2*poissonsS.length/3)));
          msg.reply('\n' + listeInsectesNow(insectesN, Math.floor(2*poissonsS.length/3), poissonsS.length));
        }

      }
    }
  } else if (msg.content.split(' ')[0] === '!details') {
    if (!msg.content.split(' ')[1]) {
      msg.reply('tu dois préciser un animal, par exemple !details Taupe-grillon');
    } else {
      if (msg.content.slice(-4) != ' sud') {
        nomAnimal = msg.content.slice(9 , msg.content.length);
        // Garder seulement le nom de l'animal, apres l'espace
        infoAnimal = findAnimal(nomAnimal, insectesN, poissonsN);
        console.log(infoAnimal);
    } else {
      nomAnimal = msg.content.slice(0 , -4);
      nomAnimal = nomAnimal.slice(9 , msg.content.length);
      // Garder seulement le nom de l'animal, apres l'espace
      infoAnimal = findAnimal(nomAnimal, insectesS, poissonsS);
    }
      if (infoAnimal != null) {
        msg.reply("voici le détail de l'animal : \n" + infoAnimal);
      } else {
        nomAnimal = nomAnimal.toUpperCase();
        nomAnimal = nomAnimal.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var matchProche = false;
        for (i = 0; !matchProche && i < insectesN.length; i++) {
          if (levDist(nomAnimal, insectesN[i].nom.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) < 3) {
            matchProche = true;
            msg.reply("ton animal n'a pas été trouvé, voulais-tu rechercher " + insectesN[i].nom.toLowerCase() + "?");
          } else if (levDist(nomAnimal, poissonsN[i].nom.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) < 3) {
            matchProche = true;
            msg.reply("ton animal n'a pas été trouvé, voulais-tu rechercher " + poissonsN[i].nom.toLowerCase() + "?");
          }
        }
        if (!matchProche) {
          msg.reply("ton animal n'a pas été trouvé.");
        }
      }
    }
  } else if (msg.content === '!navets') {
      infoNavets();
      setTimeout(function () { trucnul(msg) }, 400);

  } else if (msg.content === '!aide') {
      msg.reply('voici la liste des commandes disponibles : \n' + commandesToString());
    }
});

// Token du bot
client.login('NjkzODI5NjE3NDIwNTk5MzM4.XoDb0A.giPfY0oShei-ws4yJS4ZuKqTito');

function trucnul(msg) {
  if (infoMax.includes('-1 ')) {
    msg.reply("il n'y a pas d'infos sur les navets actuellement");
  } else {
    msg.reply("le prix du navet le plus haut est " + infoMax);
  }
}

function listeInsectesNow(liste, start, end) {
  var animaux = "";
  for (i = start; i < end; i++) {
    if (liste[i].période === "Toute l'année" || isActualM(liste[i].période)) {
      if (liste[i].heure === "Toute la journée" || isActualH(liste[i].heure)) {
        animaux += afficheInsecte(liste[i]);
      }
    }
  }
  return animaux;
}

function listePoissonsNow(liste, start, end) {
  var animaux = "";
  for (i = start; i < end; i++) {
    if (liste[i].période === "Toute l'année" || isActualM(liste[i].période)) {
      if (liste[i].heure === "Toute la journée" || isActualH(liste[i].heure)) {
        animaux += affichePoisson(liste[i]);
      }
    }
  }
  return animaux;
}

function monthToInt(mois) {
  return nomMois.indexOf(mois);
}

function monthToString(mois) {
  return nomMois[mois];
}

function dayToString(day) {
  return nomJours[day-1];
}

function isActualM(periode) {
  if (periode.split(', ')[1]) {
    return isActualM(periode.split(', ')[0]) || isActualM(periode.split(', ')[1]);
  }
  var debutM = periode.split(' - ')[0];
  if (!periode.split(' - ')[1]) {
    return actuelM == debutM;
  }
  var finM = periode.split(' - ')[1];
  debutM = monthToInt(debutM);
  finM = monthToInt(finM);
  var date = new Date();
  var actuelM = date.getMonth();
  if (debutM <= finM) {
    return debutM <= actuelM && actuelM <= finM;
  } else {
    return actuelM <= finM || debutM <= actuelM;
  }
}

function isActualH(heure) {
    var debutH = heure.split(' - ')[0];
    debutH = debutH.slice(0, -1);
    var finH = heure.split(' - ')[1];
    finH = finH.slice(0, -1);
    var date = new Date();
    var actuelH = date.getHours();
    debutH = parseInt(debutH);
    finH = parseInt(finH);
    actuelH = parseInt(actuelH);
    if (debutH < finH) {
      return debutH <= actuelH && actuelH < finH;
    } else {
      if (debutH <= actuelH && actuelH <= 23) {
        return debutH <= actuelH && actuelH > finH;
      } else {
        return debutH > actuelH && actuelH < finH;
      }
    }
}

function findAnimal(nomAnimal, insecte, poisson) {
  var found = false;
  nomAnimal = nomAnimal.toUpperCase();
  nomAnimal = nomAnimal.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (i = 0; !found && i < insecte.length; i++) {
    if (!found && (insecte[i].nom.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) === nomAnimal) {
      found = true;
      return afficheInsecte(insecte[i]);
    }
    if (!found && poisson[i].nom.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === nomAnimal) {
      found = true;
      return affichePoisson(poisson[i]);
    }
  }
  return null;
}

function afficheInsecte(animalJSON) {
  var animal = "";
  animal += "Nom: " + animalJSON.nom + "\n";
  animal += "Période: " + animalJSON.période + "\n";
  animal += "Heure: " + animalJSON.heure + "\n";
  animal += "Lieu: " + animalJSON.lieu + "\n";
  animal += "Prix: " + animalJSON.prix + " clochettes \n";
  animal += "\n";
  return animal;
}

function affichePoisson(animalJSON) {
  var animal = "";
  animal += "Nom: " + animalJSON.nom + "\n";
  animal += "Période: " + animalJSON.période + "\n";
  animal += "Heure: " + animalJSON.heure + "\n";
  animal += "Lieu: " + animalJSON.lieu + "\n";
  animal += "Prix: " + animalJSON.prix + " clochettes \n";
  animal += "Taille: " + animalJSON.taille + "\n";
  animal += "\n";
  return animal;
}

// lister les commandes
function commandesToString() {
  var res = "";

  for(i=0; i<listeCommandes.length; i++)
  {
    res += listeCommandes[i] + '\n';
  }

  return res;
}

//se lance à 6h du matin tous les jours
let jobBulletin = cron.schedule('00 20 09 * * *', function() {
  bulletinInsulaire();
});

function bulletinInsulaire() {
  client.login('NjkzODI5NjE3NDIwNTk5MzM4.XoDb0A.giPfY0oShei-ws4yJS4ZuKqTito');
  // channel bulletin-insulaire
  // nettoyer l'ancien bulletin bulletinInsulaire
  client.channels.fetch('694146170527940618')
    .then(channel => channel.bulkDelete(1))
    .catch(console.error);
  client.channels.fetch('694146170527940618')
    .then(channel => channel.send(texteBulletinInsulaire()))
    .catch(console.error);
}

function texteBulletinInsulaire() {
  var txt = "";
  txt += "Bonjour à tous, nous sommes le ";
  var date = new Date();
  var j = date.getDay();
  var m = date.getMonth();
  var a = date.getFullYear();
  txt += dayToString(j) + ' ';
  txt += date.getDate() + ' ';
  txt += monthToString(m) + ' ';
  txt += a + ' et voici votre bulletin insulaire quotidien !\n';
  txt += "S'il te manque un de ces insectes ou poissons, dépêches-toi, c'est le dernier mois pour les attraper : \n";
  txt += "\tInsectes : \n";
  txt += "\t" + "\t" + dernierMoisInsectes();
  txt += "\tPoissons : \n";
  txt += "\t" + "\t" + dernierMoisPoissons();
  txt += "Pour ce qui est des nouveaux poissons et insectes de ce mois-ci, voici la liste : \n"
  txt += "\tInsectes : \n";
  txt += "\t" + "\t" + premierMoisInsectes();
  txt += "\tPoissons : \n";
  txt += "\t" + "\t" + premierMoisPoissons();

  console.log(txt);
  return txt;
}

function dernierMoisInsectes() {
  var date = new Date();
  var lastInsectes = "";
  for (i = 0; i < insectesN.length; i++) {
    if (insectesN[i].période.split(', ')[1]) {
      var p1 = insectesN[i].période.split(', ')[0];
      var p2 = insectesN[i].période.split(', ')[1];
      if (p1.split(' - ')[1] === monthToString(date.getMonth())) {
        lastInsectes += insectesN[i].nom + ', ';
      }
      if (p2.split(' - ')[1]) {
        if (p1 !== p2 && p2.split(' - ')[1] === monthToString(date.getMonth())) {
          lastInsectes += insectesN[i].nom + ', ';
        }
      } else {
        if (p2 === monthToString(date.getMonth())) {
          lastInsectes += insectesN[i].nom + ', ';
        }
      }
    } else if (insectesN[i].période.split(' - ')[1] === monthToString(date.getMonth())) {
      lastInsectes += insectesN[i].nom + ', ';
    }
  }
  lastInsectes = lastInsectes.substring(0, lastInsectes.length - 2);
  return lastInsectes + '\n';
}

function dernierMoisPoissons() {
  var date = new Date();
  var lastPoissons = "";
  for (i = 0; i < poissonsN.length; i++) {
    if (poissonsN[i].période.split(', ')[1]) {
      var p1 = poissonsN[i].période.split(', ')[0];
      var p2 = poissonsN[i].période.split(', ')[1];
      if (p1.split(' - ')[1] === monthToString(date.getMonth())) {
        lastPoissons += poissonsN[i].nom + ', ';
      }
      if (p2.split(' - ')[1]) {
        if (p1 !== p2 && p2.split(' - ')[1] === monthToString(date.getMonth())) {
          lastPoissons += poissonsN[i].nom + ', ';
        }
      } else {
        if (p2 === monthToString(date.getMonth())) {
          lastPoissons += poissonsN[i].nom + ', ';
        }
      }
    } else if (poissonsN[i].période.split(' - ')[1] === monthToString(date.getMonth())) {
      lastPoissons += poissonsN[i].nom + ', ';
    }
  }
  lastPoissons = lastPoissons.substring(0, lastPoissons.length - 2);
  return lastPoissons + '\n';
}

function premierMoisInsectes() {
  var date = new Date();
  var lastInsectes = "";
  for (i = 0; i < insectesN.length; i++) {
    if (insectesN[i].période.split(', ')[1]) {
      var p1 = insectesN[i].période.split(', ')[0];
      var p2 = insectesN[i].période.split(', ')[1];
      if (p1.split(' - ')[0] === monthToString(date.getMonth())) {
        lastInsectes += insectesN[i].nom + ', ';
      }
      if (p2.split(' - ')[0]) {
        if (p1 !== p2 && p2.split(' - ')[0] === monthToString(date.getMonth())) {
          lastInsectes += insectesN[i].nom + ', ';
        }
      } else {
        if (p2 === monthToString(date.getMonth())) {
          lastInsectes += insectesN[i].nom + ', ';
        }
      }
    } else if (insectesN[i].période.split(' - ')[0] === monthToString(date.getMonth())) {
      lastInsectes += insectesN[i].nom + ', ';
    }
  }
  lastInsectes = lastInsectes.substring(0, lastInsectes.length - 2);
  return lastInsectes + '\n';
}

function premierMoisPoissons() {
  var date = new Date();
  var lastPoissons = "";
  for (i = 0; i < poissonsN.length; i++) {
    if (poissonsN[i].période.split(', ')[1]) {
      var p1 = poissonsN[i].période.split(', ')[0];
      var p2 = poissonsN[i].période.split(', ')[1];
      if (p1.split(' - ')[0] === monthToString(date.getMonth())) {
        lastPoissons += poissonsN[i].nom + ', ';
      }
      if (p2.split(' - ')[0]) {
        if (p1 !== p2 && p2.split(' - ')[0] === monthToString(date.getMonth())) {
          lastPoissons += poissonsN[i].nom + ', ';
        }
      } else {
        if (p2 === monthToString(date.getMonth())) {
          lastPoissons += poissonsN[i].nom + ', ';
        }
      }
    } else if (poissonsN[i].période.split(' - ')[0] === monthToString(date.getMonth())) {
      lastPoissons += poissonsN[i].nom + ', ';
    }
  }
  lastPoissons = lastPoissons.substring(0, lastPoissons.length - 2);
  return lastPoissons + '\n';
}

function infoNavets() {
  let info = "";
  //693798630267813950, id channel navets
  client.channels.fetch('693798630267813950')
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
  console.log('maxi '+prixNavetMax);
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
// found on http://jsfiddle.net/DoDSoftware/SWX77/39/, compute the difference bewteen two strings
function levDist(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    // Step 7
    return d[n][m];
}
