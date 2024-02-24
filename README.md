## Card states

If you're not playing anything, it will just show your status:

<p><img height="150px" alt="Card Default" src="https://files.catbox.moe/fhaua6.png" /></p>

If you're offline, it will look something like this:

<p><img height="150px" alt="Card Offline" src="https://files.catbox.moe/cviufc.png" /></p>

If you're listening to some tunes on Spotify, it will show what you're listening to:

<p><img height="150px" alt="Card with Spotify" src="https://files.catbox.moe/xd5nqp.png" /></p>

## Card Url Parameters
Example url
```
&bg=0b1622&txtColor=9fadbd&detailColor=677b94&fg=192231&borderRadius=6&fgopacity=0.9&logo=1&wide=1&
```
`theme` Changes your banner theme. (0-2)<br>
Example: theme=1

`hideoffline`
 Hides banner when you offline. <br>
Example: hideoffline=1

`hideplaying`
 Hides playing text. <br>
Example: hideplaying=1

`bg`
 Banner background color.<br>
Example: bg=#fff

`fg`
 Banner foreground color.<br>
Example: fg=#fff

`txtColor`
 Banner text color.<br>
Example: txt=#fff)

`detailColor`
 Banner detail text color.<br>
(Example: detailColor=#fff)

`border`
 Banner border.<br>
(Example: border=1

`borderColor`
 Banner border color.<br>
Example: borderColor=#fff

`borderRadius`
 Smooth banner corners.<br>
Example: borderRadius=10

`hidebg`
 Hides your custom background image.<br>
Example: hidebg=1

`bgm`<br>
 (Theme 1)
 bgm=1 adds background color to your background image, bgm=2 removes foreground color.<br>
(Theme 2)
 bgm=1 adds background color to your background image, bgm=2 centers detailed section.<br>
Example: bgm=1

`fgopacity`
 If you have custom background image, using with bgm=1 changes opacity of foreground color,<br> using with bgm=2 changes opacity of background color. (0.0-1.0)<br>
Example: fgopacity=0.5

`bgposx - bgposy`
 Change position of your background image. <br>
Example: bgposx=50&bgposy=50

`bgsizex - bgsizey` (only theme 0)<br>
 Resize your background image. <br>
Example: bgsizex=50&bgsizey=110

`logo` (only theme 0)<br>
 Show discord logo.<br>
Example: theme=0&logo=1

`wide` (only theme 0)<br>
 Make banner always wide.<br>
Example: theme=0&wide=1

`lgbg` (only theme 0)<br>
 Make banner background gradient.(req. wide=1)<br>
Example: theme=0&wide=1&lgbg=1

## Project Setup
<h4><a href="https://github.com/KanashiiDev/DiscordBadge">(required Discord Badge Bot)</a><br><br><h4>
**This project depends on Vercel's serverless functions.** First install the Vercel CLI by doing `npm i -g vercel`.

If you'd like to run this project locally, you will first need a Discord bot account. You can create one by following [this guide](https://discordpy.readthedocs.io/en/stable/discord.html).

**Very important!** In Bots > Privileged Gateway Intents, make sure "Presence Intent" and "Server Members Intent" is enabled. The bot won't be able to get presence data without these enabled. Copy the bot token as you'll need it later.

This project also requires a Discord server where the bot will be. Invite the bot you made to a Discord server and copy that server's ID. Make sure the bot has permissions to see all members.

Once you have a bot account and a server with the bot in it, clone this repo and rename `.env.example` to `.env`, filling out the required values. Now open a command prompt and do the following command in the project directory:

```
vercel dev
```

On first start Vercel may ask you to link this project. Set it up and you should be greeted with:

```
Vercel CLI
> Ready! Available at http://localhost:3000
```

Go to `http://localhost:3000/api?id=<your discord user id>` and you should see this project working locally on your machine.
