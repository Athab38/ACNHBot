# ACBot
An Animal Crossing New Horizons bot for Discord

# Installation
You need to add the bot to your server following this link :
Link to authorize : https://discordapp.com/api/oauth2/authorize?client_id=693829617420599338&permissions=8&scope=bot

# Usage 
Type in your Discord chat "!aide" to display all the available functions. 

# Develop
You need to create a Discord bot following this link : https://discordapp.com/developers/applications by adding a new application and create a new bot. 
Then retrieve and fill its token in a .env file like following :

DISCORD_TOKEN = token

To launch the bot : 
apt install npm
npm install -g nodemon
cd ACBot/JSCode/
nodemon --inspect .\index.js

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
