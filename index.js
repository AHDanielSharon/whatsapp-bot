import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import P from "pino"

async function startBot() {

const { state, saveCreds } = await useMultiFileAuthState("auth")

const sock = makeWASocket({
auth: state,
printQRInTerminal: true,
logger: P({ level: "silent" })
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]

if (!msg.message) return

const text = msg.message.conversation || msg.message.extendedTextMessage?.text

if (text?.toLowerCase() === "hi") {

await sock.sendMessage(msg.key.remoteJid, { text: "Hello! WhatsApp bot working." })

}

})

}

startBot()
