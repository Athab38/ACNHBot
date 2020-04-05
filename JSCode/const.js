'use strict';


// Setup consts
const token = process.env.DISCORD_TOKEN;
const Discord = require('discord.js');
const cron = require('node-cron');
const client = new Discord.Client();
const snoowrap = require('snoowrap');

// Bot's prefix, change it as you wish
const prefix = "!";

// Data consts
  // From files
  var insectesN = require('../data/insectes/insectesN.json');
  var poissonsN = require('../data/poissons/poissonsN.json');
  var insectesS = require('../data/insectes/insectesS.json');
  var poissonsS = require('../data/poissons/poissonsS.json');
  const events = require('../data/events/events.json');

  // Global consts
  const nomMois = ["Janvier", "Février" ,"Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const nomJours = ["Dimanche", "Lundi", "Mardi" ,"Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const nomChiffres = ["Premier", "Deuxième", "Troisième", "Quatrième", "Cinquième"];
  const listeCommandes = [prefix + "insectes nord|sud : cette commande te donnes les insectes actuellement disponibles dans l'hémisphère nord|sud ainsi que leur détails (prix, taille, localisation...)",
  prefix + "poissons nord|sud : cette commande te donnes les poissons actuellement disponibles dans l'hémisphère nord|sud ainsi que leur détails (prix, taille, localisation...)",
  prefix + "details : cette commande t'affiches les détails d'un poisson ou d'un insecte en particulier (prix, taille, localisation...). Exemple : !details poisson-scorpion. Optionnel : sud après l'animal pour les détails sur l'hémisphère sud",
  prefix + "navets : cette commande t'affiches le prix le plus haut du cours du navet indiqué dans le channel #navets, pensez à compléter ce channel avec vos prix pour connaître le meilleur !",
  prefix + "image : cette commande t'affiches l'image de l'animal. Exemple : !image Citrin."];

// Additional libraries
const http = require('https');
const fs = require('fs');
// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
const r = new snoowrap({
  userAgent: 'node.js:ACNHBot (by /u/Ahtab)',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN
});

module.exports = {token, Discord, cron, client, prefix, insectesN, poissonsN, insectesS, poissonsS, http, fs, nomMois, nomJours, nomChiffres, listeCommandes, events, r};
