
# discord-to-telegram

Simple discord bot that catches messages and then outputs them into a desired telegram channel

# config.json
```json
{
    "DISCORD_SELFBOT_TOKEN": "This must be a USER ACCOUNT's token and not a BOT token",
    "TELEGRAM_BOT_TOKEN": "The token of the telegram bot you have made to send messages",
    "TELEGRAM_CHANNEL_ID": "The output channel ID you want messages sent to",
    "WHITELISTED_CHANNELS": ["This is an array of discord channel id's you want the bot to catch messages in"]
}
```