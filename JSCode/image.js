var CONST_VALUES = require('./const.js');
var tools = require('./tools.js');
var fct_details = require('./details.js');

function afficheImage(msg) {
  nomAnimal = msg.content.slice(7 , msg.content.length);
  nomAnimal = nomAnimal.toLowerCase();
  nomAnimal = nomAnimal.charAt(0).toUpperCase() + nomAnimal.slice(1);
  // doesn't matter if north or south files
  infoAnimal = fct_details.findAnimal(nomAnimal, CONST_VALUES.insectesN, CONST_VALUES.poissonsN);
  if (infoAnimal != null) {
    nomAnimal = infoAnimal.nom;
    if(CONST_VALUES.fs.existsSync("../data/insectes/img/"+nomAnimal+".png")) {
      const attachment = new CONST_VALUES.Discord.MessageAttachment("../data/insectes/img/"+nomAnimal+".png");
      // Send the attachment in the message channel with a content
      msg.channel.send(`${msg.author}, voici ton animal :`, attachment);
    } else {
      const attachment = new CONST_VALUES.Discord.MessageAttachment("../data/poissons/img/"+nomAnimal+".png");
      // Send the attachment in the message channel with a content
      msg.channel.send(`${msg.author}, voici ton animal :`, attachment);
    }
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

module.exports = {afficheImage};
