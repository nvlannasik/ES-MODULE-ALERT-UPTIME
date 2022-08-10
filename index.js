"use strict";
require("dotenv").config();
const cron = require("node-cron");
const TelegramBot = require("node-telegram-bot-api");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);
const chatId = process.env.TELEGRAM_CHAT_ID;

var itung = 0;

const task = cron.schedule("* * * * *", () => {
  run().catch(console.log);
});

async function run() {
  const count = await client.count({
    index: process.env.ELASTIC_INDEX,
    body: {
      query: {
        match_all: {},
      },
    },
  });

  const getQuery = await client.search({
    index: process.env.ELASTIC_INDEX,
    body: {
      query: {
        match_all: {},
      },
    },
    size: count.count,
    sort: [{ timestamp: {} }],
  });
  // itung = count.count;
  if (itung != count.count || itung > count.count) {
    bot.sendMessage(
      chatId,
      `[WARNING] CPU USAGE DARI SERVICE ${getQuery.hits.hits
        .slice(-1)
        .map((item) => item._source.alert_id)} MENCAPAI ${getQuery.hits.hits
        .slice(-1)
        .map((item) => item._source.value)}%`
    );
    console.log("kirim pesan");
  } else {
    console.log("nothing");
  }
  itung = count.count;
  // const lastItem = getQuery.hits.hits
  //   .map((item) => item._source.value)
  //   .slice(-1);
  // console.log(lastItem);
}

task.start();
run().catch(console.log);
