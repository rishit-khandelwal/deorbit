import { Message } from "discord.js";

export default function kick(msg: Message, args: string[]) {
  let canKick = false;
  msg.guild.member(msg.author).roles.cache.forEach((v) => {
    canKick = canKick || v.permissions.has(0x0000000002);
  });

  if (canKick) {
    let mentions = msg.mentions.members.array();
    mentions.forEach((member) => {
      member.kick();
    });
  }
}
