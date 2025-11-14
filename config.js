import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 525218138672

//*──ׄ✰─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner = [
  ['50378630152', '💫 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🌐', true],
  ['51900922660', `Carlos.rv, true],
  ['50378630152', 'Alex', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner_lid = [
  ['156852826419431', '💫 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🌐 (LID)', true],
  ['250135271469135', 'carlos.rv(LID)', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['50378630152', '51900922660`] 
global.prems = []

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = 'M500-ULTRA-BOT'
global.sessions = 'Session'
global.jadi = 'JadiBot'
global.makiJadibts = true

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.packsticker = `─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\nBot: sᴀᴋᴜɴᴀ \n\nCreador: Alex Escobarl\n\nTipo: Público\n\nUsuarios: 10927\n─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\n\n`
global.packname = `⏤͟͞ू⃪  ̸̷͢SAKUNA ULTRA BOT𑁯ᰍ`
global.author = `Stickers SakunaUltra`;
global.wm = '⏤͟͞ू⃪  ̸̷͢𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 Alex Escobar l';
global.titulowm = '⏤͟͞ू⃪𝗦𝗔𝗞𝗨𝗡𝗔 𝐁𖹭t͟𑁯ᰍ';
global.igfg = '𝑆𝑎𝑘𝑢𝑛𝑎 𝐵𝑜𝑡 𝑀𝐷 '
global.botname = '𝚂𝙰𝙺𝚄𝙽𝙰 𝙱𝙾𝚃'
global.dev = '© Powered by Alex Escobar'
global.textbot = '𝑺𝒂𝒌𝒖𝒏𝒂: Alex escobar"'
global.gt = '͟͞𝚂𝙰𝙺𝚄𝙽𝙰;
global.namechannel = '𝐒𝐚𝐤𝐮𝐧𝐚 𝐁𝐨𝐭 𝐂𝐡a͟𝐧n͟e͟𝐥𑁯'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.moneda = 'yenes'

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺 𝑫𝑬 𝑺𝑨𝑲𝑼𝑵𝑨 𝑩𝑶𝑻 𝑪𝑳𝑼𝑩◞ • ❄️
global.gp1 = 'https://chat.whatsapp.com/ERStkGrcc3x9pScCAwi1rG?mode=wwt' //Grupo oficial 
global.comunidad = 'https://chat.whatsapp.com/Gcp9AYJiSb56bNolg63KvD'//
global.channel = 'https://whatsapp.com/channel/0029VbBhpX5A89MqEHNYTd2V' //Canal Oficial
global.yt = 'https://youtube.com/channel/UCfqn5r8zG5uI8H3a3lsfLCQ?si=3Y-HBolPNOgmFeoA' //Canal De Youtube
global.md = 'https://github.com/ale78292231-collab/NexoBot.git' //Github Oficial
global.correo = 'wazaponni@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbBhpX5A89MqEHNYTd2V';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363422395892347@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
