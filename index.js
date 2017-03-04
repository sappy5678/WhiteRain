/**Bot Setup
 * @author: sappy5678
 */
// var express = require('express');
// var app = express();
var restify = require('restify');
var builder = require('botbuilder');
var modules = require('./modules.js');
var dialogs = require('./dialogs.js');
//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', intents);

// intents.onDefault([(session)=>{session.send("HI");}]);

intents.matches(/^\/online\?/i,[(session)=>{session.send('I am Here ^^');}]);

intents.matches(/^\/anime/i,[]);

intents.matches(/^\/test/i,[(session)=>{session.send(modules.google.test());}]);

intents.matches(/^\/google/i,[(session)=>{dialogs.google.google(session);}]);

intents.matches(/^\/cv/i,[(session)=>{dialogs.cv.cv(session);}]);
//========================================================
// Bots Library
//========================================================
bot.library(dialogs.google.createLibrary());
bot.library(dialogs.cv.createLibrary());
