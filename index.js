// Corrección principal: Se definen las variables global.sessions y global.jadi
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import {createRequire} from 'module'
import {fileURLToPath, pathToFileURL} from 'url'
import {platform} from 'process'
import * as ws from 'ws'
import fs, {readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch} from 'fs'
import yargs from 'yargs';
import {spawn} from 'child_process'
import lodash from 'lodash'
import { blackJadiBot } from './plugins/jadibot-serbot.js'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import {tmpdir} from 'os'
import {format} from 'util'
import boxen from 'boxen'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import path, { join, dirname } from 'path'
import {Boom} from '@hapi/boom'
import {makeWASocket, protoType, serialize} from './lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import {mongoDB, mongoDBV2} from './lib/mongoDB.js'
import store from './lib/store.js'
const {proto} = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const {DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser} = await import('@whiskeysockets/baileys')
import readline, { createInterface } from 'readline'
import NodeCache from 'node-cache'
const {CONNECTING} = ws
const {chain} = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

// Definimos rutas GLOBALS por defecto
global.sessions = 'sessions'; // Carpeta por default para sesión principal
global.jadi = 'blackJadiBot'; // Carpeta por default para subbots/jadibots

let { say } = cfonts
console.log(chalk.bold.redBright(`\nSakuna Bot MD\n`))
say('💫 SakunaBot - MD 🔥', { font: 'block', align: 'center', colors: ['redBright'] })
say(`© Powered by Alex Escobar`, { font: 'console', align: 'center', colors: ['blueBright'] })

protoType()
serialize()
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString(); };
global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) };
global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');
global.timestamp = {start: new Date}
const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#/!.]')
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('./database.json'))
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) { return new Promise((resolve) => setInterval(async function() { if (!global.db.READ) { clearInterval(this) resolve(global.db.data == null ? global.loadDatabase() : global.db.data); }}, 1 * 1000)) }
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = { users: {}, chats: {}, stats: {}, msgs: {}, sticker: {}, settings: {}, ...(global.db.data || {}), }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

// Aseguramos que la carpeta sessions exista antes de usar Baileys
if (!existsSync(join(__dirname, global.sessions))) { mkdirSync(join(__dirname, global.sessions), { recursive: true }) }

// Solución principal: el path SIEMPRE será string definido
const {state, saveState, saveCreds} = await useMultiFileAuthState(join(__dirname, global.sessions))
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion();

let phoneNumber = global.botNumber
const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const colores = chalk.bgMagenta.white
const opcionQR = chalk.bold.green
const opcionTexto = chalk.bold.cyan
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))
let opcion
let nameqr = 'Makima' // Valor default si lo usas en browser

if (methodCodeQR) { opcion = '1' }
if (!methodCodeQR && !methodCode && !fs.existsSync(join(__dirname, global.sessions, 'creds.json'))) {
  do {
    opcion = await question(colores('⌨ Selecciona una opción:\n') + opcionQR('1. Con código QR\n') + opcionTexto('2. Con código de texto de 8 dígitos\n--> '))
    if (!/^[1-2]$/.test(opcion)) { console.log(chalk.bold.redBright(`✞ No se permiten numeros que no sean 1 o 2, tampoco letras o símbolos especiales.`)) }
  } while (opcion !== '1' && opcion !== '2' || fs.existsSync(join(__dirname, global.sessions, 'creds.json')))
}

console.info = () => {}
console.debug = () => {}
const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
  mobile: MethodMobile,
  browser: opcion == '1' ? [`${nameqr}`, 'Edge', '20.0.04'] : methodCodeQR ? [`${nameqr}`, 'Edge', '20.0.04'] : ['Ubuntu', 'Edge', '110.0.1587.56'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async (clave) => {
    let jid = jidNormalizedUser(clave.remoteJid)
    let msg = await store.loadMessage(jid, clave.id)
    return msg?.message || ""
  },
  msgRetryCounterCache,
  msgRetryCounterMap,
  defaultQueryTimeoutMs: undefined,
  version,
}

global.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(join(__dirname, global.sessions, 'creds.json'))) {
  if (opcion === '2' || methodCode) {
    opcion = '2'
    if (!conn.authState.creds.registered) {
      let addNumber
      if (!!phoneNumber) {
        addNumber = phoneNumber.replace(/[^0-9]/g, '')
      } else {
        do {
          phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`💎 Por favor, Ingrese el número de WhatsApp.\n${chalk.bold.yellowBright(`💎 Ejemplo: 52554×××××××`)}\n${chalk.bold.magentaBright('---> ')}`)))
          phoneNumber = phoneNumber.replace(/\D/g,'')
          if (!phoneNumber.startsWith('+')) {
            phoneNumber = `+${phoneNumber}`
          }
        } while (!await isValidPhoneNumber(phoneNumber))
        rl.close()
        addNumber = phoneNumber.replace(/\D/g, '')
        setTimeout(async () => {
          let codeBot = await conn.requestPairingCode(addNumber)
          codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
          console.log(chalk.bold.white(chalk.bgMagenta(`💎 CÓDIGO DE VINCULACIÓN 💎`)), chalk.bold.white(chalk.white(codeBot)))
        }, 3000)
      }
    }
  }
}

// Función isValidPhoneNumber
