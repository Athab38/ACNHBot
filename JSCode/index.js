//TODO: traiter, eventuellement, plus de filtres (sans ordre)
//Link to authorize : https://discordapp.com/api/oauth2/authorize?client_id=693829617420599338&permissions=8&scope=bot
require('dotenv').config({path:'../.env'});

// all functions and const values
var CONST_VALUES = require('./const.js');
var fct_animaux = require('./animaux.js');
var tools = require('./tools.js');
var fct_navets = require('./navets.js');
var fct_bulletin = require('./bulletin_insulaire.js');
var fct_details = require('./details.js');
var fct_image = require('./image.js');

// Token du bot
CONST_VALUES.client.login(CONST_VALUES.token);
// Print logged message if works
CONST_VALUES.client.on('ready', () => {
  console.log(`Logged in as ${CONST_VALUES.client.user.tag}!`);
 });

 // Cron job for bulletin insulaire (posts at 06:AM), you can change the time using this format:
 // 00 -> seconds, 00 -> minutes, 06 -> hours
 let jobBulletin = CONST_VALUES.cron.schedule('00 00 06 * * *', function() {
   fct_bulletin.bulletinInsulaire();
 });


// Main function
CONST_VALUES.client.on('message', msg => {
  console.log(msg.content);
  // Vérifier le premier input de la commande
  if(msg.content.split(' ')[0] === CONST_VALUES.prefix + 'insectes' || msg.content.split(' ')[0] === CONST_VALUES.prefix + 'poissons')
  { // Si c'est une commande concernant les insectes ou les poissons
    if(msg.content.split(' ')[1] != 'nord' && msg.content.split(' ')[1] != 'sud')
    { // si le premier parametre n'est pas l'hemisphere
      msg.reply("tu dois seulement écrire 'nord' ou 'sud' après cette commande");
    }
    else
    {
      if (msg.content.split(' ')[0] === CONST_VALUES.prefix + 'insectes') {
        if (msg.content.split(' ')[1] === 'nord') {
          msg.reply('voici la liste des insectes disponibles actuellement : \n' + fct_animaux.listeAnimauxNow(CONST_VALUES.insectesN, 0, Math.floor(CONST_VALUES.insectesN.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.insectesN, Math.floor(CONST_VALUES.insectesN.length/3), Math.floor(2*CONST_VALUES.insectesN.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.insectesN, Math.floor(2*CONST_VALUES.insectesN.length/3), CONST_VALUES.insectesN.length));
        } else if (msg.content.split(' ')[1] === 'sud') {
          msg.reply('voici la liste des insectes disponibles actuellement : \n' + fct_animaux.listeAnimauxNow(CONST_VALUES.insectesS, 0, Math.floor(CONST_VALUES.insectesS.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.insectesS, Math.floor(CONST_VALUES.insectesS.length/3), Math.floor(2*CONST_VALUES.insectesS.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.insectesS, Math.floor(2*CONST_VALUES.insectesS.length/3), CONST_VALUES.insectesS.length));
        }

      } else if (msg.content.split(' ')[0] === CONST_VALUES.prefix + 'poissons') {
        if (msg.content.split(' ')[1] === 'nord') {
          msg.reply('voici la liste des poissons disponibles actuellement : \n' + fct_animaux.listeAnimauxNow(CONST_VALUES.poissonsN, 0, Math.floor(CONST_VALUES.poissonsN.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.poissonsN, Math.floor(CONST_VALUES.poissonsN.length/3), Math.floor(2*CONST_VALUES.poissonsN.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.poissonsN, Math.floor(2*CONST_VALUES.poissonsN.length/3), CONST_VALUES.poissonsN.length));
        } else if (msg.content.split(' ')[1] === 'sud') {
          msg.reply('voici la liste des insectes disponibles actuellement : \n' + fct_animaux.listeAnimauxNow(CONST_VALUES.poissonsS, 0, Math.floor(CONST_VALUES.poissonsS.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.poissonsS, Math.floor(CONST_VALUES.poissonsS.length/3), Math.floor(2*CONST_VALUES.poissonsS.length/3)));
          msg.reply('\n' + fct_animaux.listeAnimauxNow(CONST_VALUES.poissonsS, Math.floor(2*CONST_VALUES.poissonsS.length/3), CONST_VALUES.poissonsS.length));
        }

      }
    }
  } else if (msg.content.split(' ')[0] === CONST_VALUES.prefix + 'details') {
    if (!msg.content.split(' ')[1]) {
      msg.reply('tu dois préciser un animal, par exemple !details Taupe-grillon');
    } else {
      let infoAnimal = "";
      if (msg.content.slice(-4) != ' sud') {
        nomAnimal = msg.content.slice(9 , msg.content.length);
        // Garder seulement le nom de l'animal, apres l'espace
        animalFound = fct_details.findAnimal(nomAnimal, CONST_VALUES.insectesN, CONST_VALUES.poissonsN);
        if (animalFound != null) {
        infoAnimal = fct_animaux.afficheAnimal(animalFound);
        }
    } else {
      nomAnimal = msg.content.slice(0 , -4);
      nomAnimal = nomAnimal.slice(9 , msg.content.length);
      // Garder seulement le nom de l'animal, apres l'espace
      animalFound = fct_details.findAnimal(nomAnimal, CONST_VALUES.insectesS, CONST_VALUES.poissonsS);
      if (animalFound != null) {
      infoAnimal = fct_animaux.afficheAnimal(animalFound);
      }
    }
      if (infoAnimal != "") {
        msg.reply("voici le détail de l'animal : \n" + infoAnimal);
      } else {
        nomAnimal = nomAnimal.toUpperCase();
        nomAnimal = nomAnimal.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var matchProche = false;
        for (i = 0; !matchProche && i < CONST_VALUES.insectesN.length; i++) {
          if (fct_details.levDist(nomAnimal, CONST_VALUES.insectesN[i].nom.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) < 3) {
            matchProche = true;
            msg.reply("ton animal n'a pas été trouvé, voulais-tu rechercher " + CONST_VALUES.insectesN[i].nom.toLowerCase() + "?");
          } else if (fct_details.levDist(nomAnimal, CONST_VALUES.poissonsN[i].nom.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) < 3) {
            matchProche = true;
            msg.reply("ton animal n'a pas été trouvé, voulais-tu rechercher " + CONST_VALUES.poissonsN[i].nom.toLowerCase() + "?");
          }
        }
        if (!matchProche) {
          msg.reply("ton animal n'a pas été trouvé.");
        }
      }
    }
  } else if (msg.content === CONST_VALUES.prefix + 'navets') {
      var channelID = fct_navets.findNavetChannelID(msg.guild.id);
      if (channelID == -1) {
        msg.reply("je n'ai pas trouvé de channel avec le mot-clé 'navet'. Crée-en un d'abord !")
      } else {
        fct_navets.infoNavets(channelID);
        setTimeout(function () { fct_navets.navetsInfo(msg) }, 400);
      }

  } else if(msg.content.split(' ')[0] === CONST_VALUES.prefix + 'image') {
    fct_image.afficheImage(msg);
  } else if (msg.content === CONST_VALUES.prefix + 'aide') {
      msg.reply('voici la liste des commandes disponibles : \n' + tools.commandesToString());
  } else if (msg.content.split(' ')[0] === CONST_VALUES.prefix + 'notifme') {
      //verify that it is an int, and not too much (10mn max)
      if (!msg.content.split(' ')[1]) {
        msg.reply('ton alerte a été lancée pour ' + CONST_VALUES.tempsReddit + ' minutes, fais attention à tes messages privés !');
        // milliseconds
        fct_navets.getNewPostsActurnips(msg, 60000 * CONST_VALUES.tempsReddit, 0);
      } else {
        if (msg.content.split(' ')[1] == parseInt(msg.content.split(' ')[1])) {
          var price = parseInt(msg.content.split(' ')[1]);
          if (price < 100 || price > 800) {
            msg.reply('le prix cherché doit être compris entre 100 et 800 !');
          } else {
              msg.reply('ton alerte a été lancée pour ' + CONST_VALUES.tempsReddit + ' minutes, avec un prix minimum de ' + price + ', fais attention à tes messages privés !');
                // milliseconds
                fct_navets.getNewPostsActurnips(msg, 60000 * CONST_VALUES.tempsReddit, price);
          }
        }
      }
    }
});
