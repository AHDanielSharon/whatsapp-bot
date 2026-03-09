const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process"
    ]
  }
});

client.on('qr', (qr) => {
  console.log("Scan this QR code:");
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log("Bot is ready!");
});

client.on('message', async msg => {
  if (msg.body.toLowerCase() === "hi") {
    msg.reply("Hello! WhatsApp bot is working.");
  }
});

client.initialize();
