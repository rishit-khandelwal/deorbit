import { readdirSync } from "fs";

let mods: string[] | string[][] = readdirSync("dist/commands/");
mods = mods.filter((v) => v.endsWith(".js") && v != "index.js");
mods = mods.map((v) => [
  `./commands/${v.slice(0, v.length - 3)}`,
  v.slice(0, v.length - 3),
]);

export default mods;
