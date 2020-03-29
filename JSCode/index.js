const Discord = require('discord.js');
const client = new Discord.Client();
var insectesN = require('./insectesN.json');
var poissonsN = require('./poissonsN.json');
var listeCommandes = '!insectes nord\n!poissons nord';
const nomMois = ["Janvier", "Février" ,"Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
 if (msg.content === '!insectes nord') {
   msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeAnimauxNow(insectesN));
 } else if (msg.content === '!poissons nord') {
   msg.reply('voici la liste des poissons disponibles actuellement : \n' + listeAnimauxNow(poissonsN));
 } else if (msg.content === '!aide') {
    msg.reply('voici la liste des commandes disponibles : \n' + listeCommandes);
 }
});

client.login('NjkzODI5NjE3NDIwNTk5MzM4.XoCxhA.PeMxCsTF7wldYrTPrQ75VzanSY4');

function listeAnimauxNow(liste) {
  var animaux = "";
  for (i = 0; i < liste.length; i++) {
    if (liste[i].période === "Toute l'année" || isActualM(liste[i].période)) {
      if (isActualH(liste[i].heure)) {
        animaux += "Nom: " + liste[i].nom + "\n";
        animaux += "Période: " + liste[i].période + "\n";
        animaux += "Heure: " + liste[i].heure + "\n";
        animaux += "Lieu: " + liste[i].lieu + "\n";
        animaux += "Prix: " + liste[i].prix + " clochettes \n";
        animaux += "\n";
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
