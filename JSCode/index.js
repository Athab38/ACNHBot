const Discord = require('discord.js');
const client = new Discord.Client();
var insectesN = require('./insectesN.json');
var poissonsN = require('./poissonsN.json');
//TODO: traiter, eventuellement, plus de filtres (sans ordre)
var listeCommandes = ["!insectes nord","!poissons nord","!aide"];
const nomMois = ["Janvier", "Février" ,"Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
  console.log(msg.content);
  if (msg.content === '!insectes nord') {
     msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeInsectesNow(insectesN));
  } else if (msg.content === '!poissons nord') {
     msg.reply('voici la liste des poissons disponibles actuellement : \n' + listePoissonsNow(poissonsN));
  } else if (msg.content.split(' ')[0] === '!details') {
    // Garder seulement le nom de l'animal, apres l'espace
    nomAnimal = msg.content.slice(9 , msg.content.length);
    infoAnimal = findAnimal(nomAnimal);
    console.log(infoAnimal);
    if (infoAnimal != null) {
      msg.reply("voici le détail de l'animal : \n" + infoAnimal);
    } else {
      msg.reply("ton animal n'a pas été trouvé.");
    }
  } else if (msg.content === '!aide') {
    msg.reply('voici la liste des commandes disponibles : \n' + listeCommandes);
  }
});

client.login('NjkzOTU0MjUxMzQ4NTA4NzUy.XoElTQ.XiXC-gm3DefG3BloLv7OiWROI-E');

function listeInsectesNow(liste) {
  var animaux = "";
  for (i = 0; i < liste.length; i++) {
    if (liste[i].période === "Toute l'année" || isActualM(liste[i].période)) {
      if (isActualH(liste[i].heure)) {
        animaux += afficheInsecte(liste[i]);
      }
    }
  }
  return animaux;
}

function listePoissonsNow(liste) {
  var animaux = "";
  for (i = 0; i < liste.length; i++) {
    if (liste[i].période === "Toute l'année" || isActualM(liste[i].période)) {
      if (isActualH(liste[i].heure)) {
        animaux += affichePoisson(liste[i]);
      }
    }
  }
  return animaux;
}

function monthToInt(mois) {
  return nomMois.indexOf(mois);
}

function isActualM(periode) {
  var debutM = periode.split(' - ')[0];
  var finM = periode.split(' - ')[1];
  debutM = monthToInt(debutM);
  finM = monthToInt(finM);
  var date = new Date();
  var actuelM = date.getMonth();
  return debutM <= actuelM && actuelM <= finM;
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

function findAnimal(nomAnimal) {
  var found = false;
  for (i = 0; !found && i < insectesN.length; i++) {
    if (!found && insectesN[i].nom === nomAnimal) {
      found = true;
      return afficheInsecte(insectesN[i]);
    }
    if (!found && poissonsN[i].nom === nomAnimal) {
      found = true;
      return affichePoisson(poissonsN[i]);
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
