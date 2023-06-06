const Discord = require('discord.js');
const supabase = require('./supabaseClient');

'https://discordapp.com/api/webhooks/1080884989886992424/twnz4_X0jdxtUmZV_RTAkDiRyDIVONHqP_0ra4QuTemKhBzLIjrK6h5jyyjmuI61S1UN'

const sendmess = async (message) => {
    const webhookurl = message.webhook.split("/");
    const WEBHOOK_ID = webhookurl[5];
    const WEBHOOK_TOKEN = webhookurl[6];
  const hook = new Discord.WebhookClient({id: WEBHOOK_ID, token: WEBHOOK_TOKEN})
  await hook.send(message.message);
};

const saveDiscord = async (session, mess, time, wh, res) => {
  try {
      const { data, error } = await supabase
          .from('timer_discord')
          .select('time, message, webhook')
          .eq('id', session.user.id);
      if (error) {
          throw error
      }
      if (data.length !== 0) {
          const { error } = await supabase
              .from('timer_discord')
              .update({ time: [...data[0].time, time], message: [...data[0].message, mess], webhook: [...data[0].webhook, wh]})
              .eq('id', session.user.id);
          if (error) {
              throw error
          }
          res.sendStatus(200);
      } else {
          const { error } = await supabase
              .from('timer_discord')
              .insert([{ id: session.user.id, time: [time], message: [mess], webhook: [wh] }]);
          if (error) {
              throw error
          }
          res.sendStatus(200);
      }
  } catch (error) {
      console.error(error);
      res.send({error: error.message, status: 400})
  }
}

module.exports = {sendmess, saveDiscord};