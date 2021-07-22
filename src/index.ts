import * as Discord from "discord.js";
import * as dotenv from "dotenv";

import mods from "./commands";

let actions = {};

mods.forEach((mod) => {
  actions[mod[1]] = require(mod[0]).default;
});

dotenv.config();

let client: Discord.Client = new Discord.Client();

const onready = () => {
  console.log("Ready!");
};

const prefix = "do-";

client.once("ready", onready);

let lastMessage = {};
let scores = {};

client.on("message", async (msg: Discord.Message) => {
  if (msg.author.bot) return;
  let args = msg.content.split(" ");

  if (!lastMessage[msg.author.id]) {
    lastMessage[msg.author.id] = Math.floor(Date.now() / 1000);
  }

  if (lastMessage[msg.author.id] - Math.floor(Date.now() / 1000) < -5) {
    if (scores[msg.author.id]) {
      scores[msg.author.id] += 1;
    } else {
      scores[msg.author.id] = 1;
    }
    lastMessage[msg.author.id] = Math.floor(Date.now() / 1000);
  }

  if (msg.content.startsWith(prefix)) {
    let command = args[0].slice(prefix.length);
    args = args.slice(1);

    if (command == "score") {
      msg.channel.send(
        `${msg.author.username} your score is ${scores[msg.author.id] ?? 0}`
      );
    } else {
      let action = actions[command];
      if (action) {
        action(msg, args);
      }
    }
  }
});

client.login(process.env.TOKEN);
