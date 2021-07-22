import { Message } from "discord.js";

export default function kick(msg: Message, args: string[]) {
  let canBan = false;
  msg.guild.member(msg.author).roles.cache.forEach((v) => {
    canBan = canBan || v.permissions.has(0x0000000002);
  });

  if (canBan) {
    let mentions = msg.mentions.members.array();

    let duration = args[args.length - 1];

    try {
      let dur = parseInt(duration);
      mentions.forEach((member) => {
        member.ban({
          days: dur,
        });
      });
    } catch {
      msg.channel.send("bad duration :");
    }
  }
}
