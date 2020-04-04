var CONST_VALUES = require('./const.js');

// lister les commandes
function commandesToString() {
  var res = "";

  for(let i = 0; i < CONST_VALUES.listeCommandes.length; i++) {
    res += CONST_VALUES.listeCommandes[i] + '\n';
  }
  return res;
}

function monthToInt(mois) {
  return CONST_VALUES.nomMois.indexOf(mois);
}

function monthToString(mois) {
  return CONST_VALUES.nomMois[mois];
}

function dayToString(day) {
  return CONST_VALUES.nomJours[day];
}

function dayToInt(day) {
return CONST_VALUES.nomJours.indexOf(day);
}

function chiffreToInt(chiffre) {
  return CONST_VALUES.nomChiffres.indexOf(chiffre)
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

module.exports = {commandesToString, monthToInt, monthToString, dayToString, dayToInt, chiffreToInt, isActualH, isActualM};
