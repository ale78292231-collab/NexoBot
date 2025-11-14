import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*
let botNumber = ""; //Ejemplo: 525218138672
let owner = [
  ["50378630152", "💫 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🌐", true],
  ["51900922660", "Carlos.rv", true],
  ["50378630152", "Alex", true]
];
let owner_lid = [
  ["156852826419431", "💫 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🌐 (LID)", true],
  ["250135271469135", "carlos.rv(LID)", true]
];
let mods = [];
let suittag = ["50378630152", "51900922660"];
let prems = [];

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*
let libreria = "Baileys";
let baileys = "V 6.7.8";
let vs = "2.0.0";
let languaje = "Español";
let nameqr = "M500-ULTRA-BOT";
let sessions = "Session";
let jadi = "JadiBot";
let makiJadibts = true;

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*
let packsticker = `─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\nBot: sᴀᴋᴜɴᴀ \n\nCreador: Alex Escobarl\n\nTipo: Público\n\nUsuarios: 10927\n─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\n\n`;
let packname = `⏤͟͞ू⃪ ̸̷͢SAKUNA ULTRA BOT𑁯ᰍ`;
let author = `Stickers SakunaUltra`;
let wm = '⏤͟͞ू⃪ ̸̷͢𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 Alex Escobar l';
let titulowm = '⏤͟͞ू⃪𝗦𝗔𝗞𝗨𝗡𝗔 𝐁𖹭t͟𑁯ᰍ';
let igfg = '𝑆𝑎𝑘𝑢𝑛𝑎 𝐵𝑜𝑡 𝑀𝐷 ';
let botname = '𝚂𝙰𝙺𝚄𝙽𝙰 𝙱𝙾𝚃';
let dev = '© Powered by Alex Escobar';
let textbot = '𝑺𝒂𝒌𝒖𝒏𝒂: Alex escobar"';
let gt = '͟͞𝚂𝙰𝙺𝚄𝙽𝙰;';
let namechannel = '𝐒𝐚𝐤𝐮𝐧𝐚 𝐁𝐨𝐭 𝐂𝐡a͟𝐧n͟e͟𝐥𑁯';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*
let moneda = "yenes";

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺 𝑫𝑬 𝑺𝑨𝑲𝑲𝑼𝑵𝑨 𝑩𝑶𝑻 𝑪𝑳𝑼𝑩◞ • ❄️
let gp1 = "https://chat.whatsapp.com/ERStkGrcc3x9pScCAwi1rG?mode=wwt";                                                                     
let comunidad = "//chat.whatsapp.com/ERStkGrcc3x9pScCAwi1rG?mode=wwt"; //Grupo oficial
let channel = "https://whatsapp.com/channel/0029VbBhpX5A89MqEHNYTd2V"; //Canal Oficial                                                                 
let yt = "https://youtube.com/channel/UCfqn5r8zG5uI8H3a3lsfLCQ?si=3Y-HBolPNOgmFeoA"; //Canal De Youtube
let md = "https://github.com/ale78292231-collab/NexoBot.git"; //Github Oficial                                                              
let correo = "wazaponni@gmail.com";
let cn = "https://whatsapp.com/channel/0029VbBhpX5A89MqEHNYTd2V";

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*
let catalogo = fs.readFileSync('./src/catalogo.jpg');
let estilo = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
  },
  message: {
    orderMessage: {
      itemCount: -999999,
      status: 1,
      surface: 1,
      message: packname,
      orderTitle: 'Bang',
      thumbnail: catalogo,
      sellerJid: '0@s.whatsapp.net'
    }
  }
};
let ch = {
  ch1: '120363422395892347@newsletter',
};
let multiplier = 70;

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});
