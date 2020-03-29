const Discord = require('discord.js');
const client = new Discord.Client();
var insectesN = require('./insectesN.json');
var poissonsN = require('./poissonsN.json');
var listeCommandes = '!insectes nord\n!poissons nord';
var date = new Date();
var month = date.getMonth();
const nomMois = ["Janvier", "Février" ,"Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(monthToString(month));
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
    if (liste[i].période === "Toute l'année") {
      animaux += "Nom: " + liste[i].nom + "\n";
      animaux += "Période: " + liste[i].période + "\n";
      animaux += "Heure: " + liste[i].heure + "\n";
      animaux += "Lieu: " + liste[i].lieu + "\n";
      animaux += "Prix: " + liste[i].prix + " clochettes \n";
      animaux += "\n";
    }
  }
  return animaux;
}

function monthToString(month) {
  return nomMois[month];
}
