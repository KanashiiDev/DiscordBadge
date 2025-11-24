# 🎴 Discord Badge Card

Show your Discord presence in a **clean and customizable banner**!

---

## 🔹 Card States

| State                                        | Preview                                                                                  |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Default** – If you're not playing anything | <img height="150px" alt="Card Default" src="https://files.catbox.moe/12tasr.png" />      |
| **Playing a Game**                           | <img height="150px" alt="Card Playing" src="https://files.catbox.moe/yoleeu.png" />      |
| **Offline**                                  | <img height="150px" alt="Card Offline" src="https://files.catbox.moe/t5v6gt.png" />      |
| **Listening on Spotify**                     | <img height="150px" alt="Card with Spotify" src="https://files.catbox.moe/9wofes.png" /> |

---

## 🎨 Card URL Parameters

You can customize your badge using these URL parameters:

| Parameter             | Description                                      | Example                  |
| --------------------- | ------------------------------------------------ | ------------------------ |
| `theme`               | Changes banner theme (0-2)                       | `theme=1`                |
| `hideoffline`         | Hides banner when offline                        | `hideoffline=1`          |
| `hideplaying`         | Hides playing text                               | `hideplaying=1`          |
| `bg`                  | Banner background color                          | `bg=#0b1622`             |
| `fg`                  | Banner foreground color                          | `fg=#192231`             |
| `txtColor`            | Banner text color                                | `txtColor=#9fadbd`       |
| `detailColor`         | Banner detail text color                         | `detailColor=#677b94`    |
| `border`              | Banner border width                              | `border=1`               |
| `borderColor`         | Banner border color                              | `borderColor=#fff`       |
| `borderRadius`        | Smooth banner corners                            | `borderRadius=10`        |
| `hidebg`              | Hides your custom background image               | `hidebg=1`               |
| `bgm`                 | Theme-specific background behavior               | `bgm=1`                  |
| `fgopacity`           | Foreground/background opacity                    | `fgopacity=0.5`          |
| `bgposx` / `bgposy`   | Background image position                        | `bgposx=50&bgposy=50`    |
| `bgsizex` / `bgsizey` | Resize background image (theme 0)                | `bgsizex=50&bgsizey=110` |
| `logo`                | Show Discord logo (theme 0)                      | `logo=1`                 |
| `wide`                | Make banner always wide (theme 0)                | `wide=1`                 |
| `lgbg`                | Gradient background (requires `wide=1`, theme 0) | `lgbg=1`                 |

**Example URL parameters:**

```
&bg=0b1622&txtColor=9fadbd&detailColor=677b94&fg=192231&borderRadius=6&fgopacity=0.9&logo=1&wide=1
```

---

## ⚙️ Project Setup

This project depends on [Discord Badge Bot](https://github.com/KanashiiDev/DiscordBadgeBot) and **Vercel's serverless functions**.

### 1️⃣ Install Vercel CLI

```bash
npm i -g vercel
```

### 2️⃣ Create a Discord Bot

Follow [this guide](https://discordpy.readthedocs.io/en/stable/discord.html) to create a bot.

**Important:**

* Enable **Presence Intent** and **Server Members Intent** in your bot settings.
* Copy the bot token; you'll need it later.

### 3️⃣ Prepare a Discord Server

* Invite your bot to the server.
* Copy the **Server ID**.
* Make sure the bot has permissions to see all members.

### 4️⃣ Clone & Configure Project

```bash
git clone <repo-url>
cd <project-directory>
cp .env.example .env
```

Fill out your `.env` file with your **bot token, server ID, etc.**

### 5️⃣ Start Vercel Locally

```bash
vercel dev
```

* On first start, Vercel may ask you to link the project.
* Access your local project at:

```
http://localhost:3000/api?id=<your discord user id>
```

You should see your Discord badge card in action! 🎉
