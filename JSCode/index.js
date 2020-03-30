// set up
const Discord = require('discord.js');
const client = new Discord.Client();
var insectesN = require('./insectesN.json');
var poissonsN = require('./poissonsN.json');
//TODO: traiter, eventuellement, plus de filtres (sans ordre)
var listeCommandes = ["!insectes nord","!poissons nord","!aide"];
const nomMois = ["Janvier", "Février" ,"Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// log le tag du bot quand il est pret
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Traitement des commandes
client.on('message', msg => {
    if(msg.client.user.tag==="AC_Bot#4096")
    // Vérifier le premier input de la commande
    if(msg.content.split(' ')[0]==='!insectes' || msg.content.split(' ')[0]==='!poissons')
    { // Si c'est une commande concernant les insectes ou les poissons
        if(msg.content.split(' ')[1]!='nord' && msg.content.split(' ')[1]!='sud')
        { // si le premier parametre n'est pas l'hemisphere
            msg.reply("oups, tu as oublié l'hémisphère, saisis 'sud' ou 'nord'.");
        }
        else
        { // si le premier parametre est l'hemisphere
            if (msg.content.split(' ')[1]=='nord')
            { // si l'hemisphere est le nord
                msg.reply('voici la liste des insectes disponibles actuellement : \n' + listeAnimauxNow(insectesN));
            } else if (msg.content.split(' ')[1]=='sud')
            { // si l'hemisphere est le sud
                msg.reply('voici la liste des poissons disponibles actuellement : \n' + listeAnimauxNow(poissonsN));
            }
     }
 } else if (msg.content === '!aide')
 { // si c'est une commande pour avoir de l'aide
        msg.reply('voici la liste des commandes disponibles : \n' + commandesToString());
 }
});

// Token du bot
client.login('NjkzOTU0MjUxMzQ4NTA4NzUy.XoElTQ.XiXC-gm3DefG3BloLv7OiWROI-E');

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

// lister les commandes
function commandesToString() {
    var res = "";

    for(i=0; i<listeCommandes.length; i++)
    {
        res += listeCommandes[i];
    }

    return res;
}
