var TelegramBot = require('node-telegram-bot-api');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var token = '247186133:AAEXYHUcM1L9MHxhyRMpTo8ggTe8c3piTI8';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);

bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});

bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;

    if (messageText === '/say') {
        sendMessageByBot(messageChatId, 'Hello World!');
    }

    console.log(msg);
});

//Checking Privatbank balance 
bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;

    if (messageText === '/bal') {
        var http = new XMLHttpRequest();
        var url = "https://api.privatbank.ua/p24api/balance";
        var body = '<?xml version="1.0" encoding="UTF-8"?><request version="1.0"><merchant><id>121153</id><signature>cca3e82dab117b7475f0f5df64411760cb4945e1</signature></merchant><data><oper>cmt</oper><wait>0</wait><test>0</test><payment id=""><prop name="cardnum" value="4149497859710842" /><prop name="country" value="UA" /></payment></data></request>';
        http.open("POST", url, false);
        http.send(body);
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
            }
        }
        sendMessageByBot(messageChatId, http.responseText);
    }

    console.log(msg);
});


function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a cute bot!' });
}