const { Client } = require("discord.js-selfbot-v13");
const TelegramBot = require("node-telegram-bot-api");
const {
    WHITELISTED_CHANNELS,
    DISCORD_SELFBOT_TOKEN,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHANNEL_ID,
} = require("./config.json");

const client = new Client({ checkUpdate: false });
const telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN);

client.on("messageCreate", (msg) => {
    const { channelId } = msg;
    if (!WHITELISTED_CHANNELS.includes(channelId)) return;

    const channel = client.channels.cache.get(channelId);
    const data = {
        channelName: channel.name,
        author: {
            isBot: msg.author.bot,
            username: msg.author.username,
        },
        content: msg.content,
        embeds: msg.embeds,
        attachments: msg.attachments.map((attachment) => `${attachment.attachment}`),
    };

    const botTag = data.author.isBot ? " (BOT)" : "";
    let message = `⚠️ ${data.channelName} ⚠️\nAuthor: ${data.author.username}${botTag}\n\n`;

    if (data.content) {
        message += `Content:\n${data.content}\n\n`;
    }

    if (data.attachments.length > 0) {
        message += `Attachment URL's: ${data.attachments.join("\n\n")}\n\n`;
    }

    if (data.embeds.length > 0) {
        let embedsString = "EMBEDS:\n";
        for (const embed of data.embeds) {
            const { title, description, url, image, fields } = embed;

            if (title) {
                embedsString += `Title: ${title}\n`;
            }
            if (description) {
                embedsString += `Description: ${description}\n`;
            }
            if (url) {
                embedsString += `Url: ${url}\n`;
            }
            if (image) {
                embedsString += `Image: ${image.url}\n`;
            }
            if (fields?.length > 0) {
                embedsString += "Fields:\n";
                fields.forEach(({ name, value }) => {
                    embedsString += `${name}: ${value}\n`;
                });
                embedsString += "\n";
            }
        }
        message += embedsString;
    }

    telegramBot.sendMessage(TELEGRAM_CHANNEL_ID, message);
});

client.on("ready", () => {
    console.log(`${client.user.username} is ready!`);
});

client.login(DISCORD_SELFBOT_TOKEN);
