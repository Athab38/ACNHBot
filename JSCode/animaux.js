var CONST_VALUES = require('./const.js');
var tools = require('./tools.js');

function listeAnimauxNow(liste, start, end) {
  var animaux = "";
  for (i = start; i < end; i++) {
    if (liste[i].période === "Toute l'année" || tools.isActualM(liste[i].période)) {
      if (liste[i].heure === "Toute la journée" || tools.isActualH(liste[i].heure)) {
        animaux += afficheAnimal(liste[i]);
      }
    }
  }
  return animaux;
}

function afficheAnimal(animalJSON) {
  var animal = "";
  animal += "Nom: " + animalJSON.nom + "\n";
  animal += "Période: " + animalJSON.période + "\n";
  animal += "Heure: " + animalJSON.heure + "\n";
  animal += "Lieu: " + animalJSON.lieu + "\n";
  animal += "Prix: " + animalJSON.prix + " clochettes \n";
  if (animalJSON.taille) {
        animal += "Taille: " + animalJSON.taille + "\n";
  }
  if (animalJSON.rareté) {
    animal += "Rareté: " + animalJSON.rareté + "\n";
  }
  animal += "\n";
  return animal;
}

module.exports = {listeAnimauxNow, afficheAnimal};
