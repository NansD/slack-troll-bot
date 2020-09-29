const SlackBot = require('slackbots');
const giphy = require('giphy-api')();

// create a bot
const bot = new SlackBot({
  token: 'xoxb-488895620903-488687064627-wC9i7hASCu0YlnCOAUgjdsHQ', // One day this should be hidden
  name: 'Robutt',
});

bot.on('start', () => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  const params = {
    icon_emoji: ':cat:',
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  bot.postMessageToChannel('botwars', 'meow!', params);

  // define existing username instead of 'user_name'
  bot.postMessageToUser('user_name', 'meow!', params);

  // If you add a 'slackbot' property,
  // you will post to another user's slackbot channel instead of a direct message
  bot.postMessageToUser('user_name', 'meow!', { slackbot: true, icon_emoji: ':cat:' });

  // define private group instead of 'private_group', where bot exist
  bot.postMessageToGroup('private_group', 'meow!', params);

  // bot.getChannel('botwars').then(({ members }) => {
  //   members.map((member) => {
  //     bot.postMessage(member, 'Hello, world :)');
  //     return member;
  //   });
  // });
  bot.on('message', (data) => {
    if (data.text === undefined) {
      return;
    }
    // all ingoing events https://api.slack.com/rtm
    /*
    setTimeout(() => {
      giphy.random(data.text, (err, res) => {
        bot.postMessageToChannel('botwars', `${res.data.url} ${data.text} du cul`, params);
      });
    }, 3000);
    */
    console.log(data);
    if (data.text.includes('Robutt')) {
      console.log(data.text.includes('Robutt'));
      const subString = data.text.replace('Robutt', '');
      giphy.random(subString, (err, res) => {
        if (res || res.data) {
          bot.postMessageToChannel(data.channel, `${res.data.url} ${subString} du cul`, params);
        }
      });
    }
  });
});
