const Discord = require('discord.js');
const client = new Discord.Client();
var insectesN = require('./insectesN.json');
var poissonsN = require('./poissonsN.json');
//TODO: traiter, eventuellement, plus de filtres (sans ordre)
var listeCommandes = ["!insectes nord","!poissons nord","!aide", "!details"];
const nomMois = ["Janvier", "Février" ,"Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
  console.log(msg.content);
  // Vérifier le premier input de la commande
  if(msg.content.split(' ')[0]==='!insectes' || msg.content.split(' ')[0]==='!poissons')
  { // Si c'est une commande concernant les insectes ou les poissons
    if(msg.content.split(' ')[1]!='nord' && msg.content.split(' ')[1]!='sud')
    { // si le premier parametre n'est pas l'hemisphere
      msg.reply("tu as oublié l'hémisphère, saisis 'sud' ou 'nord' après ta commande.");
    }
    else
    {
      if (msg.content.split(' ')[0] === '!insectes') {
        msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeInsectesNow(insectesN, 0, insectesN.length/2));
        msg.reply('\n' + listeInsectesNow(insectesN, insectesN.length/2, insectesN.length));
      } else if (msg.content.split(' ')[0] === '!poissons') {
        msg.reply('voici la liste des poissons disponibles actuellement : \n' + listePoissonsNow(poissonsN, 0, poissonsN.length/2));
        msg.reply('\n' + listeInsectesNow(poissonsN, poissonsN.length/2, poissonsN.length));

      }
    }
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

// Token du bot
client.login('NjkzODI5NjE3NDIwNTk5MzM4.XoDb0A.giPfY0oShei-ws4yJS4ZuKqTito');

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

// lister les commandes
function commandesToString() {
  var res = "";

  for(i=0; i<listeCommandes.length; i++)
  {
    res += listeCommandes[i];
  }

  return res;
}
