import axios from 'axios'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let userData = global.db.data.users[userId] || {}
    let exp = userData.exp || 0
    let coin = userData.coin || 0
    let level = userData.level || 0
    let role = userData.role || 'Sin Rango'
    let name = await conn.getName(userId)

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.keys(global.plugins).length

    let fechaObj = new Date()
    let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })
    
    let videos = [
      'https://files.catbox.moe/smr0dk.mp4,
      'https://files.catbox.moe/rudf7m.mp4',
      'https://files.catbox.moe/xmzvcg.mp4',
      'https://files.catbox.moe/ll5v7d.mp4',
      'https://files.catbox.moe/m8z6mv.mp4',
      'https://files.catbox.moe/5lljnm.mp4',
      'https://files.catbox.moe/mb7grh.mp4'
    ]
    let video = videos[Math.floor(Math.random() * videos.length)]

const emojis = {
  'main': '👹', 'tools': '🩸', 'audio': '🎧', 'group': '⚔️',
  'owner': '👑', 'fun': '🔥', 'info': '📕', 'internet': '🌐',
  'downloads': '📥', 'admin': '⚠️', 'anime': '💮', 'nsfw': '⛔',
  'search': '🔎', 'sticker': '🧿', 'game': '🎲', 'premium': '💎', 'bot': '🤖'
}

let grupos = {}
for (let plugin of Object.values(global.plugins || {})) {
  if (!plugin.help || !plugin.tags) continue
  for (let tag of plugin.tags) {
    if (!grupos[tag]) grupos[tag] = []
    for (let help of plugin.help) {
      if (/^\$|^=>|^>/.test(help)) continue
      grupos[tag].push(`${usedPrefix}${help}`)
    }
  }
}

for (let tag in grupos) {
  grupos[tag].sort((a, b) => a.localeCompare(b))
}

const secciones = Object.entries(grupos).map(([tag, cmds]) => {
  const emoji = emojis[tag] || '🔱'
  return `╭━━⚡〔 ${emoji} ${tag.toUpperCase()} 〕⚡━━⬣\n`
   + cmds.map(cmd => `┃ 🜸 ${cmd}`).join('\n') 
   + `\n╰━━🩸〔 👁️ 〕🩸━━⬣`
}).join('\n\n')

let menuText = `
      🜂 𝕽𝖞𝖔𝖒𝖊𝖓 𝕾𝖚𝖐𝖚𝖓𝖆 🜂
        𝕾𝖚𝖐𝖚𝖓𝖆 - 𝕭𝖔𝖙 👹
      🜄 𝐊𝐢𝐧𝐠 𝐨𝐟 𝐂𝐮𝐫𝐬𝐞𝐬 🜄
⊱ ────── {.⋅ 🜸 ⋅.} ────── ⊰

👹 ${ucapan()} @${userId.split('@')[0]} ⚔️

╭── 🜁「 𝐃𝐀𝐓𝐎𝐒 𝐔𝐒𝐄𝐑 」──
│
│ 🩸 𝐔𝐬𝐞𝐫: ${name}
│ 🩸 𝐍𝐢𝐯𝐞𝐥: ${level}
│ 🩸 𝐄𝐱𝐩: ${exp}
│ 🩸 𝐑𝐚𝐧𝐠𝐨: 𝕮𝖔𝖓𝖙𝖆𝖒𝖎𝖓𝖆𝖉𝖔
╰─────────────────⚔️

╭── 👹「 𝐈𝐍𝐅𝐎 𝐁𝐎𝐓 」──
│
│  👑 𝖂𝖎𝖟𝖆𝖗𝖉: wa.me/${suittag}
│  🤖 𝕾𝖚𝖐𝖚𝖓𝖆𝖇𝖔𝖙: ${(conn.user.jid == global.conn.user.jid ? '👹 𝕺𝖋𝖎𝖈𝖎𝖆𝖑' : '⚔️ 𝕾𝖚𝖇 𝕭𝖔𝖙')}
│  📕 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬: ${totalCommands}
│  🔥 𝐔𝐬𝐞𝐫𝐬: ${totalreg}
│  ⏳ 𝐑𝐮𝐧𝐭𝐢𝐦𝐞: ${uptime}
╰─────────────────🩸

╭── ⚡「 𝐓𝐈𝐄𝐌𝐏𝐎 」──
│
│ ⌛ 𝐇𝐨𝐫𝐚 𝐏𝐞𝐫𝐮: ${hora}
│ 📅 𝐅𝐞𝐜𝐡𝐚: ${fecha}
│ 🌤️ 𝐃𝐢𝐚: ${dia}
╰─────────────────👹

🜂 𝕾𝖊𝖗 𝖍𝖚𝖒𝖆𝖓𝖔… 𝖊𝖘 𝖉𝖊𝖇𝖎𝖑. 🜂  
🩸 𝕾𝖔𝖑𝖔 𝖑𝖆 𝕸𝖆𝖑𝖉𝖎𝖈𝖎𝖔𝖓 𝖊𝖘 𝖊𝖙𝖊𝖗𝖓𝖆. 👁️  

✨ 𝕾𝖚𝖐𝖚𝖓𝖆 - 𝕭𝖔𝖙 ✨  
© 2024 - 2025 𝐊𝐢𝐧𝐠 𝐨𝐟 𝐂𝐮𝐫𝐬𝐞𝐬

${secciones}
`.trim()

await m.react('👹')
await conn.sendMessage(m.chat, { video: { url: video }, caption: menuText, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: botname, body: dev, thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true
export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  let res = "𝑩𝒖𝒆𝒏𝒂𝒔 𝒏𝒐𝒄𝒉𝒆𝒔 🌙"
  if (time >= 5 && time < 12) res = "𝑩𝒖𝒆𝒏𝒐𝒔 𝒅𝒊𝒂𝒔 ☀️"
  else if (time >= 12 && time < 18) res = "𝑩𝒖𝒆𝒏𝒂𝒔 𝒕𝒂𝒓𝒅𝒆𝒔 🌤️"
  else if (time >= 18) res = "𝑩𝒖𝒆𝒏𝒂𝒔 𝒏𝒐𝒄𝒉𝒆𝒔 🌙"
  return res
}