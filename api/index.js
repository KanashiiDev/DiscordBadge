require("dotenv").config();
export const revalidate = 0;
const mongoose = require("mongoose");
const model = require("../src/model");
mongoose.connect(process.env.MONGODB_TOKEN, { useUnifiedTopology: true, useNewUrlParser: true, });
const Card = require("../src/Card");
const Card2 = require("../src/Card2");
const Card3 = require("../src/Card3");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = async (req, res) => {
  const imageToBase64 = require("image-to-base64");
  const truncate = (input) => (input.length > detaillength ? `${input.substring(0, detaillength)}...` : input);
  const encodeHTML = (input) => {
    return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  };
  function nativeTimeElement(e) {
    let n = new Date(1000 * e);

    function calculateTimeDifference() {
      let now = Math.round(new Date().valueOf() / 1000);
      let timeDifference = now - Math.round(n.valueOf() / 1000);

      if (timeDifference === 0) {
        return "Now";
      } else if (timeDifference === 1) {
        return "1 second ago";
      } else if (timeDifference < 60) {
        return timeDifference + " seconds ago";
      } else if (timeDifference < 120) {
        return "1 minute ago";
      } else if (timeDifference < 3600) {
        return Math.floor(timeDifference / 60) + " minutes ago";
      } else if (timeDifference < 7200) {
        return "1 hour ago";
      } else if (timeDifference < 86400) {
        return Math.floor(timeDifference / 3600) + " hours ago";
      } else if (timeDifference < 172800) {
        return "1 day ago";
      } else if (timeDifference < 604800) {
        return Math.floor(timeDifference / 86400) + " days ago";
      } else if (timeDifference < 1209600) {
        return "1 week ago";
      } else if (timeDifference < 2419200) {
        return Math.floor(timeDifference / 604800) + " weeks ago";
      } else if (timeDifference < 29030400) {
        return Math.floor(timeDifference / 2419200) + " months ago";
      } else {
        return Math.floor(timeDifference / 29030400) + " years ago";
      }
    }

    return calculateTimeDifference();
  }

  const elapsedTime = (timestampstart) => {
    let startTime = timestampstart;
    let endTime = Number(new Date());
    let difference = (endTime - startTime) / 1000;
    let daysDifference = Math.floor(difference / 60 / 60 / 24);
    difference -= daysDifference * 60 * 60 * 24;
    let hoursDifference = Math.floor(difference / 60 / 60);
    difference -= hoursDifference * 60 * 60;
    let minutesDifference = Math.floor(difference / 60);
    difference -= minutesDifference * 60;
    let secondsDifference = Math.floor(difference);
    return `${hoursDifference >= 1 ? ("0" + hoursDifference).slice(-2) + ":" : ""}${("0" + minutesDifference).slice(
      -2
    )}:${("0" + secondsDifference).slice(-2)}`;
  };
  const elapsedTimeEnd = (timestampend) => {
    let countDownDate = new Date(timestampend).getTime();
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (hours < 0 || minutes < 0 || seconds < 0) {
      return '';
    }
    return `${hours >= 1 ? ("0" + hours).slice(-2) + ":" : ""}${minutes + ":" + seconds}`;
  };
  let detaillength = 32;
  let showlogo = 0;
  let bgresizex = 60;
  let bgresizey = 100;
  let dclogo = "";
  let gradientbg = 0;
  let makewide = 0;
  let bannertheme = 0;
  let bgmode = 0;
  let bgpositionx = "100";
  let bgpositiony = "100";
  let custom = 0;
  let customBg = "";
  let fg_opacity = "0.8";
  let setOffset = "0";
  let setWidth = "width:max-content";
  let playing = 1;
  let customName = "";
  let bgColor = "#fff0";
  let fgColor = "#fff0";
  let textColor = "#fff";
  let detailsColor = "#b3b5b8";
  let br = "0";
  let brRadius = "4px";
  let brColor = "#fff";
  let lastSeen = "";
  let redirecturl = "";
  let redirecturlis = false;
  let hide_offline = false;
  const processText = (input) => {
    return encodeHTML(truncate(input));
  };
  async function parsePresence(user) {
    if (user) {
      let displayName = "";
      let timestampstart = " ";
      let timestampsend = " ";
      if (user.presence.activities[0]) {
        if (user.presence.activities[0].timestamps) {
          timestampstart = user.presence.activities[0].timestamps.start;
          timestampsend = user.presence.activities[0].timestamps.end;
          if (user.presence.activities[1] && user.presence.activities[1].timestamps) {
            timestampstart = user.presence.activities[1].timestamps.start;
            timestampsend = user.presence.activities[1].timestamps.end;
          }
          if (user.presence.activities[2]) {
            timestampstart = user.presence.activities[2].timestamps.start;
            timestampsend = user.presence.activities[2].timestamps.end;
          }
        }
      };
      let timestamp = elapsedTime(timestampstart);
      let timestampend = elapsedTimeEnd(timestampsend);
      const username = processText(user.username);
      if (customName) displayName = customName;
      if (!customName) displayName = processText(user.username);
      let pfpImage = user.displayAvatarURL({
        format: "jpg",
        dynamic: true,
        size: 512,
      });
      pfpImage = await imageToBase64(pfpImage);
      pfpImage = "data:image/png;base64," + pfpImage;
      const statuses = user.presence.clientStatus;
      if (!statuses) {
        return {
          bgresizex,
          bgresizey,
          dclogo,
          gradientbg,
          showlogo,
          makewide,
          brRadius,
          lastSeen,
          setWidth,
          bgpositionx,
          bgpositiony,
          customBg,
          fg_opacity,
          hide_offline,
          setOffset,
          username,
          displayName,
          bgColor,
          fgColor,
          textColor,
          detailsColor,
          br,
          brColor,
          pfpImage,
          status: "offline",
          gameType: "",
          game: "",
          details: "",
          detailsImage: false,
          state: "",
          height: 97,
          height2: 150,
        };
      }
      const status = statuses.desktop || statuses.mobile || statuses.web;
      const playingRichGame = user.presence.activities.reverse().find((e) => (e.details || e.state));
      const playingGame = user.presence.activities.reverse().find((e) => !e.details && !e.state);
      const spotifyGame = user.presence.activities.find((e) => e.type == "LISTENING" && e.name == "Spotify");
      const gameObject = playingRichGame || playingGame || spotifyGame;

      if (!gameObject) {
        return {
          bgresizex,
          bgresizey,
          dclogo,
          gradientbg,
          showlogo,
          makewide,
          brRadius,
          setWidth,
          bgpositionx,
          bgpositiony,
          customBg,
          fg_opacity,
          setOffset,
          username,
          displayName,
          bgColor,
          textColor,
          detailsColor,
          br,
          brColor,
          fgColor,
          pfpImage,
          status,
          gameType: "",
          game: "",
          details: "",
          detailsImage: false,
          state: "",
          height: 97,
          height2: 150,
        };
      }
      let game = processText(gameObject.name);
      let gameType = "";
      let syncID = false;
      if (game == "Spotify") gameType = "";
      if (game == "Anime") { gameType = "Watching"; syncID = "https://anilist.co/search/anime?search=" + gameObject.details; redirecturl = syncID; redirecturlis = true; }
      if (game == "Anime" && gameObject.assets.smallText == "Paused") { gameType = "Paused"; }

      if (!gameObject.details && !gameObject.state) {
        return {
          bgresizex,
          bgresizey,
          dclogo,
          gradientbg,
          showlogo,
          makewide,
          playing,
          brRadius,
          setWidth,
          bgpositionx,
          bgpositiony,
          customBg,
          fg_opacity,
          timestamp,
          timestampend,
          username,
          displayName,
          bgColor,
          textColor,
          detailsColor,
          br,
          brColor,
          fgColor,
          pfpImage,
          status,
          gameType,
          game,
          details: "",
          detailsImage: false,
          state: "",
          height: 97,
          height2: 165,
        };
      }
      const state = gameObject.state ? processText(gameObject.state) : "";
      let emoji = "";
      if (game == "Custom Status") {
        if (gameObject.emoji) {
          emoji = gameObject.emoji.name;
        }
      }
      if (!gameObject.details) {
        return {
          emoji,
          bgresizex,
          bgresizey,
          dclogo,
          gradientbg,
          showlogo,
          makewide,
          playing,
          brRadius,
          setWidth,
          bgpositionx,
          bgpositiony,
          customBg,
          fg_opacity,
          username,
          displayName,
          bgColor,
          textColor,
          detailsColor,
          br,
          brColor,
          fgColor,
          pfpImage,
          status,
          gameType,
          game,
          details: "",
          detailsImage: false,
          state,
          height: 97,
          height2: 165,
        };
      }
      const details = gameObject.details ? processText(gameObject.details) : "";

      let detailsImage = false;
      if (gameObject.assets && gameObject.assets.largeImage) {

        if (gameObject.assets.largeImage.startsWith("mp:")) {
          detailsImage = `https://media.discordapp.net/${gameObject.assets.largeImage.substring(3)}`;
        } else {
          detailsImage = `https://cdn.discordapp.com/app-assets/${gameObject.applicationID}/${gameObject.assets.largeImage}.png`;
          if (game == "Spotify") detailsImage = `https://i.scdn.co/image/${gameObject.assets.largeImage.replace("spotify:", "")}`;
          if (game == "Spotify") { syncID = "spotify:track:" + gameObject.syncID; redirecturl = syncID; redirecturlis = true; }
        }
        if (user.presence.activities[1]) {
          if (user.presence.activities[0].type == "LISTENING" && user.presence.activities[1].type == "PLAYING") {
            game = user.presence.activities[1].name;
            redirecturl = syncID = "spotify:track:" + user.presence.activities[0].syncID;
          }
          else if (user.presence.activities[0].type == "PLAYING" && user.presence.activities[1].type == "LISTENING") {
            game = user.presence.activities[0].name;
            redirecturl = syncID = "spotify:track:" + user.presence.activities[1].syncID;
          }
          if (user.presence.activities[0].name == "Custom Status" && user.presence.activities[1].type == "PLAYING") {
            game = user.presence.activities[1].name;
          }
          if (user.presence.activities[1].name == "Custom Status" && user.presence.activities[0].type == "PLAYING") {
            game = user.presence.activities[0].name;
          }
        }
        if (user.presence.activities[2]) {
          if (user.presence.activities[2] && user.presence.activities[1].type == "LISTENING" && user.presence.activities[2].type == "PLAYING") {
            if (user.presence.activities[0].name == "Custom Status") {
              game = user.presence.activities[2].name;
              redirecturl = syncID = "spotify:track:" + user.presence.activities[1].syncID;
            }
          }
          if (user.presence.activities[2] && user.presence.activities[2].type == "LISTENING" && user.presence.activities[1].type == "PLAYING") {
            if (user.presence.activities[0].name == "Custom Status") {
              game = user.presence.activities[1].name;
              redirecturl = syncID = "spotify:track:" + user.presence.activities[2].syncID;
            }
          }
        }
        if (user.presence.activities[0].name == "YouTube Music") {
          redirecturl = syncID = "https://music.youtube.com/search?q=" + encodeURIComponent(user.presence.activities[0].details) + " - " + encodeURIComponent(user.presence.activities[0].state);
          redirecturlis = true;
        }
        detailsImage = await imageToBase64(detailsImage);
        detailsImage = "data:image/png;base64," + detailsImage;
      }

      if (game == "Custom Status") { game = state; custom = 1; }
      if (user.presence.activities[1]) {
        if (user.presence.activities[0] == "Custom Status" && user.presence.activities[1].type == "PLAYING") { game = user.presence.activities[1].name; custom = 2; }
        if (user.presence.activities[0] == "Custom Status" && user.presence.activities[1].name == "Anime") { custom = 0; }
      }
      return {
        bgresizex,
        bgresizey,
        dclogo,
        gradientbg,
        showlogo,
        makewide,
        playing,
        brRadius,
        bgmode,
        bgpositionx,
        bgpositiony,
        custom,
        customBg,
        fg_opacity,
        setWidth,
        timestamp,
        timestampend,
        redirecturl,
        username,
        displayName,
        bgColor,
        textColor,
        detailsColor,
        br,
        brColor,
        fgColor,
        pfpImage,
        status,
        game,
        gameType,
        details,
        detailsImage,
        state,
        height: 150,
        height2: 230,
      };
    }
  } res.setHeader("Content-Type", "image/svg+xml");
  const { brokenlink, wide, bgsizex, bgsizey, theme, logo, hideplaying, id, bg, lgbg, bgm, bgposx, bgposy, hidebg, fg, fgopacity, txtColor, detailColor, border, borderColor, borderRadius, hideoffline, offset, width, redirect } = req.query; {
    let dbdata = false;
    customName = false;
    if (id) {
      dbdata = await model.findOne({
        USERID: id,
      });
      if (dbdata) {
        if (dbdata.DISPLAYNAME) {
          customName = dbdata.DISPLAYNAME;
        }
        if (dbdata.LASTSEENENABLE === "TRUE") {
          if (dbdata.LASTSEEN) {
            let timestamp = new Date(dbdata.LASTSEEN).getTime();
            const timestampSeconds = Math.floor(timestamp / 1000);
            lastSeen = "Last Seen: " + nativeTimeElement(timestampSeconds);
          }
        }
        if (!hidebg == 1) {
          if (dbdata.CUSTOMBG) {
            customBg = await imageToBase64(dbdata.CUSTOMBG);
            customBg = "background-image: url('data:image/png;base64," + customBg + "');background-size: cover;background-repeat: no-repeat;";
          }
          else {
            customBg = false
          }
        }
      }
    }
    if (hideplaying == 1) { playing = 0; } else { playing = 1 }
    if (wide == 1) { makewide = 1; } else { makewide = 0 }
    if (lgbg == 1) { gradientbg = 1; detaillength = 64 } else { gradientbg = 0 }
    if (hideoffline == 1) { hide_offline = true; } else { hide_offline = false }
    if (logo == 1) { showlogo = logo; dclogo = await imageToBase64("https://i.imgur.com/8XCgTzf.png"); dclogo = "background-image: url('data:image/png;base64," + dclogo + "');"; } else { showlogo = false }
    if (redirect && redirecturlis) { redirectf(); function redirectf() { if (!redirecturl) { setTimeout(redirectf, 100) } } }
    if (bgposx) { bgpositionx = bgposx; } else { bgpositionx = "100"; }
    if (bgposy) { bgpositiony = bgposy; } else { bgpositiony = "100"; }
    if (bgsizex) { bgresizex = bgsizex; } else { bgresizex = 60; }
    if (bgsizey) { bgresizey = bgsizey; } else { bgresizey = 100; }
    if (theme) { bannertheme = theme; } else { bannertheme = 0; }
    if (bgm == 1 || bgm == 2) { bgmode = bgm; } else { bgmode = 0; }
    if (fgopacity) { fg_opacity = fgopacity; } else { fg_opacity = "0.8"; }
    if (offset) { setOffset = offset; } else { setOffset = "0"; }
    if (width) { setWidth = "width:" + width + "px"; } else { setWidth = "width:max-content"; }
    if (bg) { bgColor = "#" + bg; } else { bgColor = "#fff0"; }
    if (fg) { fgColor = "#" + fg; } else { fgColor = "#fff0"; }
    if (txtColor) { textColor = "#" + txtColor; } else { textColor = "#fff"; }
    if (detailColor) { detailsColor = "#" + detailColor; } else { detailsColor = "#ededed"; }
    if (border) { br = "1px solid"; } else { br = "0"; }
    if (borderColor) { brColor = "#" + borderColor; } else { brColor = "#fff"; }
    if (borderRadius) { brRadius = borderRadius + "px"; } else { brRadius = "0px"; }
    client.login(process.env.DISCORD_BOT_TOKEN).then(async () => {
      const member = await client.guilds.fetch(process.env.DISCORD_GUILD_ID).then(async (guild) => {
        return await guild.members
          .fetch({
            user: id,
            cache: false,
            force: true,
          })
          .catch((error) => {
            return error;
          });
      });
      client.destroy();
      let card;
      if (brokenlink) {
        card = new Card({
          username: " ",
          displayName: "Error",
          bgColor: "#000",
          textColor,
          detailsColor,
          br,
          brColor,
          fgColor,
          pfpImage: "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f",
          status: "offline",
          game: "Redirect Link is broken",
          gameType: "",
          details: "Error",
          detailsImage: "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f",
          state: " ",
          height: 97,
        });
      }
      else if (member instanceof Discord.DiscordAPIError || !id) {
        card = new Card({
          username: " ",
          displayName: "Error",
          bgColor: "#000",
          textColor,
          detailsColor,
          br,
          brColor,
          fgColor,
          pfpImage: "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f",
          status: "offline",
          game: "User not in server",
          gameType: "",
          details: "Error",
          detailsImage: "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f",
          state: " ",
          height: 97,
        });
      } else {
        const cardContent = await parsePresence(member.user);
        if (cardContent && bannertheme == 0) {
          card = new Card(cardContent);
        }
        if (cardContent && bannertheme == 1) {
          card = new Card2(cardContent);
        }
        if (cardContent && bannertheme == 2) {
          card = new Card3(cardContent);
        }
      }
      if (!redirect) {
        return res.send(card.render())
      }
      if (redirect && redirecturlis) {
        res.redirect(redirecturl)
      }
      else if (redirect && dbdata && dbdata.REDIRECT) {
        if (dbdata.REDIRECT.length > 10) {
          res.redirect(dbdata.REDIRECT);
        }
        else { res.redirect('https://hachiman-discord-badge.vercel.app/api?brokenlink=1') }
      }
    });
  }
};