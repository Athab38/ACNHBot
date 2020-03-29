const Discord = require('discord.js');
const client = new Discord.Client();
var insectesN = require('./insectesN.json');
var poissonsN = require('./poissonsN.json');
var listeCommandes = 'test';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(insectesN);
 });

client.on('message', msg => {
 if (msg.content === '!insectes nord') {
   msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeAnimaux(insectesN));
 } else if (msg.content === '!poissons nord') {
   msg.reply('voici la liste des poissons disponibles actuellement : \n' + listeAnimaux(poissonsN));
 } else if (msg.content === '!aide') {
    msg.reply(listeCommandes);
 }
});

client.login('NjkzODI5NjE3NDIwNTk5MzM4.XoCxhA.PeMxCsTF7wldYrTPrQ75VzanSY4');

function listeAnimaux(liste) {
  var animaux = "";
  for (i = 0; i < liste.length; i++) {
    animaux += "Nom: " + liste[i].nom + "\n";
    animaux += "Période: " + liste[i].période + "\n";
    animaux += "Heure: " + liste[i].heure + "\n";
    animaux += "Lieu: " + liste[i].lieu + "\n";
    animaux += "Prix: " + liste[i].prix + " clochettes \n";
    animaux += "\n";
  }
  return animaux;
}
