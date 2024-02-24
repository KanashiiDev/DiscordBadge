var pixelWidth = require('string-pixel-width');
const statusColors = {
  online: "#43b581",
  idle: "#faa61a",
  dnd: "#f04747",
  streaming: "#6441a5",
  offline: "#747f8d",
};
const statusNames = {
  online: "Online",
  idle: "Away",
  dnd: "Do Not Disturb",
  streaming: "Streaming",
  offline: "Offline",
};

function changeColorAlpha(color, opacity) {
  if (color.length > 7) color = color.substring(0, color.length - 2);
  const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  let opacityHex = _opacity.toString(16).toUpperCase()
  if (opacityHex.length == 1) opacityHex = "0" + opacityHex;
  return color + opacityHex;
}

class Card {
  constructor({
    emoji,
    bgresizex,
    bgresizey,
    dclogo,
    gradientbg,
    showlogo,
    playing,
    makewide,
    brRadius,
    custom,
    lastSeen,
    bgpositionx,
    bgpositiony,
    fg_opacity,
    fgbg,
    customBg,
    setOffset,
    setWidth,
    hide_offline,
    timestamp,
    timestampend,
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
  }) {
    this.emoji = emoji;
    this.slidePercent = 60;
    this.slidePercent2 = 60;
    this.slideSpeed = 8;
    this.slideSpeed2 = 8;
    this.bgresizex = bgresizex;
    this.bgresizey = bgresizey;
    this.dclogo = dclogo;
    this.wide = 300;
    this.linearbg = gradientbg;
    this.showlogo = showlogo;
    this.makewide = makewide;
    this.playing = "";
    this.playingstate = playing;
    this.isgame = 1;
    this.brRadius = brRadius;
    this.lastSeen = lastSeen;
    this.bgpositionx = bgpositionx;
    this.bgpositiony = bgpositiony;
    this.fgopacity = fg_opacity;
    this.fgbg = fgbg;
    this.offset = setOffset;
    this.customBg = customBg;
    this.width = setWidth;
    this.hideoffline = hide_offline;
    this.custom = custom;
    this.customstatus = 0;
    this.oveflows = "";
    this.timestamp = timestamp + " elapsed";
    this.timestampend = timestampend;
    this.displayName = displayName;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.detailsColor = detailsColor;
    this.br = br;
    this.brColor = brColor;
    this.fgColor = fgColor;
    this.pfpImage = pfpImage;
    this.status = status;
    this.game = game;
    this.gameType = gameType;
    this.gamestatus = "";
    this.details = details;
    this.detailsImage = detailsImage;
    this.state = state;
    this.height = 90;
    this.statusColor = statusColors[status];
    this.transform = "translate(94.66 67.11)";
    this.rich = "250";
    this.rich2 = "translate(0,0)";
    this.nameheight = "height: 24px";
    if (this.game == "YouTube Music") {
      playing = false;
      this.game = "Listening to YouTube Music";
      /*if (this.details.indexOf(' -') >= 0 || this.details.indexOf('- ') >= 0) {
        this.state = this.details.split('-')[1];
        this.details = this.details.split('-')[0];
      }
      else if (this.details.indexOf('~') >= 0) {
        this.state = this.details.split('~')[1];
        this.details = this.details.split('~')[0];
      }*/
    }
    if (this.details.length > 42) { this.slidePercent = 80; this.slideSpeed = 12 }
    if (this.state.length > 42) { this.slidePercent2 = 80; this.slideSpeed2 = 12 }
    if (playing && this.game !== "Anime" && this.game !== "Spotify" && this.game !== "Custom Status" && this.game !== "Listening to YouTube Music") {
      this.playing = "<b class='status'>Playing:</b>"
    }

    if (!this.game) {
      this.rich2 = "translate(" + this.offset + "px,0)";
      this.transform = "translate(94.66 70.11)";
      this.rich = setWidth;
    }
    if (custom == 1) {
      this.height = 90;
      this.rich = setWidth;
    }
    if (custom == 2) {
      this.height = 90;
    }
    if (!this.game) {
      this.gamestatus = statusNames[status];
      this.nameheight = " height: 26px";
    }
    else {
      this.gamestatus = "";
    }
    if (this.game === "Anime" && timestampend.length > 0 || this.game === "Listening to YouTube Music" && timestampend.length > 0) {
      this.timestamp = timestampend + " left";
    }
    if (this.game === "Spotify") {
      this.game = "Listening to Spotify";
    }
    if (this.timestamp === "NaN:NaN left" || this.timestamp === "undefined elapsed" || this.gameType === "Paused" || custom == 1) {
      this.timestamp = " ";
    }
    if (this.lastSeen) {
      this.timestamp = this.lastSeen;
      this.nameheight = " height: 24px";
    }
    if (this.hideoffline && this.status == "offline") {
      this.height = 0;
      this.rich = "0";
    }
    if (this.makewide == 1) {
      this.width = "width:100%";
      this.wide = 390;
    }
    if (customBg && fgColor && fgColor !== "#fff0") {
      this.fgbg = "background:" + changeColorAlpha(this.fgColor, this.fgopacity) + ";border-radius: 4px;";
      this.fgColor = changeColorAlpha(this.fgColor, this.fgopacity);
    }
    if (!this.game || this.game == "Listening to Spotify" || this.game == "YouTube Music" || this.game == "Listening to YouTube Music" || this.game == "Anime") {
      this.isgame = 0;
    }
    if (this.game == "Custom Status") {
      this.game = this.state;
      this.customstatus = 1;
    } else {
      this.emoji = "";
    }
  }

  render() {
    let detailswidth = pixelWidth(this.details, { font: 'Tahoma', size: 8, bold: true });
    let statewidth = pixelWidth(this.state, { font: 'Tahoma', size: 8, bold: false });
    const REGEX_FIX = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
    const detailscheck = this.details.match(REGEX_FIX); if (detailscheck) { detailswidth = detailswidth + detailswidth * 0.5; }
    if (detailswidth > 270) {
      this.slidePercent = 95;
    }
    const statecheck = this.state.match(REGEX_FIX); if (statecheck) { statewidth = statewidth + statewidth * 0.5; }
    return `
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="${this.wide}" height="${this.height}" viewBox="0 0 ${this.wide} ${this.height}" role="img">
  <style>
  svg#Layer_1{
    min-width:250px;
    text-align: -webkit-center;
    text-align-last: start;
    OVERFLOW: HIDDEN;
    transform:${this.rich2};
  }
  .cls-main{
    background:${this.bgColor};
    background-position:${this.bgpositionx}% ${this.bgpositiony}%;
    border-radius: ${this.brRadius};
    height: -webkit-fill-available;
    display: flex;
    overflow:hidden;
    align-items: center;
    flex-direction: column;
    align-items: stretch;
    max-width: ${this.wide}px;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding; 
    background-clip: padding-box;
    border:${this.br};
    border-color:${this.brColor};
   ${this.width};
   ${this.linearbg && this.makewide == 1 ? 'background-size: ' + this.bgresizex + '% ' + this.bgresizey + '%!important;' : ""}
   ${this.customBg}
  }
  .cls-detail{
    background:${this.fgColor};
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    ${this.status == "offline" || this.custom || !this.game || (!this.details && !this.state) ? 'display:none' : ""}
  }
  .namediv{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow:hidden;
    margin-top: -5px;
    padding-right: 10px;
    ${this.details && this.state ? 'margin-top:0;' : ""}
    ${this.linearbg && this.makewide == 1 ? 'max-width: 115px;min-width: 115px;' : ""}
  }
  .namedetails {
    ${this.nameheight};
    ${this.linearbg && this.makewide == 1 ? 'height:18px;' : ""}
  }
  .namedetails2 {
    display: flex;
    margin-bottom: 1.8px;
    ${this.linearbg && this.makewide == 1 ? 'margin-bottom:0.5px;margin-left: -2px;padding-left: 3px;padding-right: 2px;-webkit-mask-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,1) 5%, rgba(0,0,0,1) 85%, rgba(0,0,0,0));' : ""}
    ${this.game !== "Anime" && this.linearbg && this.makewide == 1 ? 'width: 69px;' : ""}
    ${this.game === "Anime" && this.linearbg && this.makewide == 1 ? 'width: 60px;' : ""}
    ${this.details == "" ? 'width: 92px;' : ""}
    flex-direction: column;
    justify-content: center;
    overflow:hidden;
    margin-left: 0.2px;
    text-wrap: nowrap;
    ${this.game === "Anime" ? 'margin-bottom:0' : ""};
  }
  #status-outline{
    height: 21px;
    width: 21px;
    background: ${this.bgColor};
    border-radius: 30px;
    position: fixed;
    margin-top: -22.5px;
    margin-left: 41px
  }
  .cls-3 {
    font-size: 20px;
    ${this.linearbg && this.makewide == 1 ? 'font-size: 15px;-webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 85%,rgb(0 0 0 / 0%) 98%, rgba(0,0,0,0));' : ""}
    color: ${this.textColor};
    font-family: SegoeUI-Bold, Segoe UI;
    font-weight: 700;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cls-4 {
    display:flex;
    color: ${this.detailsColor};
    font-size: 13px;
    text-wrap:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${this.linearbg && this.makewide == 1 ? 'height: 12px;font-size: 9px;padding-right: 6px;-webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 85%,rgb(0 0 0 / 0%) 98%, rgba(0,0,0,0));' : ""}
    ${this.customstatus == 1 ? 'margin-left: -4px;padding-left: 5px;-webkit-mask-image: linear-gradient(to right,rgb(0 0 0 / 0%),rgb(0 0 0 / 0%) 0%,rgb(0 0 0 / 0%) 3.5%,rgb(0 0 0) 6%,rgb(0 0 0) 0%,rgba(0,0,0,1) 85%, rgba(0,0,0,0));' : ""}
  
  }
  .cls-14,.cls-15,.cls-15-5,.cls-16, .cls-4 {
    color: ${this.detailsColor};
    font-family: SegoeUI, Segoe UI;
  }
  .cls-8 {
    height: 13px;
    width: 13px;
    background: ${this.statusColor};
    border-radius: 30px;
    position: fixed;
    margin-top: -18.5px;
    margin-left: 45.5px;
    text-align-last: center;
    font-size: 0.55rem;
  }
  .cls-11{
    color: ${this.textColor};
    font-family: SegoeUI-Bold, Segoe UI;
    font-weight: 700;
    width: min-content;
    font-size: 10px;
    height: 14px;
    ${this.details == "" ? 'display:none;' : ""}
    ${!this.linearbg ? ' overflow: hidden;text-overflow: ellipsis;' : ""}
    ${this.linearbg && this.makewide == 1 && detailswidth >= 68 ? '-webkit-animation: marquee ' + this.slideSpeed + 's linear infinite alternate;animation: marquee ' + this.slideSpeed + 's linear infinite alternate;' : ""}
    ${this.linearbg && this.makewide == 1 && detailswidth >= 68 ? '-webkit-animation: marquee ' + this.slideSpeed + 's linear infinite alternate;animation: marquee ' + this.slideSpeed + 's linear infinite alternate;' : ""}
  
    ${this.linearbg && this.makewide == 1 ? 'font-family: Tahoma;font-size: 8px;height: 11px;' : ""}
    ${this.game === "Anime" ? 'height: 10px;' : ""}
  }
  .cls-11, .cls-14 {
    text-wrap:nowrap;
  }
  .cls-14 { 
    color: ${this.detailsColor};
    font-size: 12px;
    font-weight:500;
  }
  .cls-15 { 
    font-size: 8px;
    font-weight:400;
    text-wrap:nowrap;
    display:none;
    ${this.lastSeen ? 'font-size: 8px;' : ""}
    ${!this.details ? 'display:block;' : ""}
  }
  .cls-15-5 {
    font-size: 8px;
    font-weight:500;
    text-wrap:nowrap;
    ${this.game !== "Anime" ? 'display:none;' : ""}
  }
  .cls-16 { 
    font-size: 8px;
    font-weight:500;
    width: min-content;
     ${!this.linearbg ? ' overflow: hidden;text-overflow: ellipsis;' : ""}
     ${this.linearbg && this.makewide == 1 ? 'font-family: Tahoma;' : ""}
     ${this.game !== "Anime" && this.linearbg && this.makewide == 1 && statewidth >= 70 ? '-webkit-animation: marquee2 ' + this.slideSpeed2 + 's linear infinite alternate;animation: marquee ' + this.slideSpeed + 's linear infinite alternate;' : ""}
  }
  .imgDiv {
    padding:15px;
    height: 60px;
    width: 60px;
  }
  .test{
    display: flex;
    align-items: center;
    height:90px;
    ${this.fgbg}
    ${this.linearbg && this.makewide == 1 ? 'background: -webkit-linear-gradient(162deg,' + changeColorAlpha(this.bgColor, 0.25) + ',' + this.bgColor + ' 52%, ' + this.bgColor + ')!important;' : ""}
    ${this.br ? 'border-radius:2px' : ""}
  }
  .test2{
    padding:0px 25px 0px 25px;
  }
  .detailimgDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: 1px;
    ${this.linearbg && this.makewide == 1 ? 'margin-top: 4px;' : ""}
    ${this.status == "offline" || this.customstatus == 1 || this.custom || !this.game || (!this.details && !this.state) ? 'display:none;' : ""}
  }
  img#pfp-image {
    border-radius: 50px;
    -webkit-mask-image: radial-gradient( circle 10px at -webkit-calc(100% - 8px) -webkit-calc(100% - 8px), transparent 10px, #000 0 );
    mask-image: radial-gradient( circle 10px at calc(100% - 8px) calc(100% - 8px), transparent 10px, #000 0 );
  }
  img#detail-image {
    border-radius: 2px;
    object-fit: cover;
    margin-right: 5px;
    ${this.detailsImage == false ? 'display:none;' : ""}
    ${this.linearbg && this.makewide == 1 ? 'margin-right:0;' : ""}
    ${this.game === "Anime" && this.gameType !== "Paused" ? 'height:30px;width:30px' : ""}
  }
  .logo{
    ${this.dclogo}
    height: 8px;
    width: 40px;
    left: calc(100% - 47px); 
    bottom: calc(100% - 13px);
    float: left;
    opacity: 0.9;
    position: relative;
    background-size: 40px 8px;
    background-repeat: no-repeat;
    display:none;
    ${this.showlogo == 1 ? 'display:block' : ""}
  }
  .game{
    ${this.isgame == 1 && this.linearbg && this.makewide == 1 && this.game.length >= 16 ? 'width: max-content;-webkit-animation: marquee2 ' + this.slideSpeed2 + 's linear infinite alternate;animation: marquee ' + this.slideSpeed + 's linear infinite alternate;' : ""}
    ${this.isgame == 1 && !this.linearbg && !this.makewide ? 'overflow: hidden;text-overflow: ellipsis;' : ""}
  }
  .gamediv{
    ${this.isgame == 1 ? 'padding-left: 2px;' : ""}
    ${this.isgame == 0 ? 'overflow: hidden; padding-left: 0px;' : ""}
    ${this.isgame == 1 && this.playingstate == 0 && this.linearbg && this.makewide == 1 ? 'width: 90%;padding-left: 0px;' : ""}
    ${this.isgame == 1 && this.playingstate == 1 && this.linearbg && this.makewide == 1 ? 'width:68px;' : ""}
    ${this.isgame == 1 && this.playingstate == 1 && this.isgame == 1 && this.linearbg && this.makewide == 1 && this.game.length >= 16 ? '-webkit-mask-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,1) 5%, rgba(0,0,0,1) 90%, rgba(0,0,0,0));text-align: start;' : ""}
    ${this.isgame == 1 && this.playingstate == 0 && this.isgame == 1 && this.linearbg && this.makewide == 1 && this.game.length >= 23 ? '-webkit-mask-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,1) 1%, rgba(0,0,0,1) 90%, rgba(0,0,0,0));text-align: start;' : ""}
    ${this.isgame == 1 && !this.linearbg && !this.makewide ? 'overflow: hidden;text-overflow: ellipsis;' : ""}
    ${this.isgame == 0 && !this.linearbg && !this.makewide ? 'overflow: hidden;text-overflow: ellipsis;' : ""}
    ${this.isgame == 1 && this.customstatus == 1 && this.linearbg && this.makewide == 1 ? 'width: 90%;padding-left: 0px;-webkit-mask-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,0));' : ""}
  }
  b.status{
    color: ${this.textColor};
    ${this.linearbg && this.makewide == 1 ? 'z-index:2;background:' + this.bgColor + ';' : ""}
  }
  @-moz-keyframes marquee {
    0% {-moz-transform: translateX(0%);}
    33% {-moz-transform: translateX(0%);}
    100% {-moz-transform: translateX(-${this.slidePercent}%);}
  }
  @-webkit-keyframes marquee {
    0% {-webkit-transform: translateX(0%);}
    33% {-webkit-transform: translateX(0%);}
    100% {-webkit-transform: translateX(-${this.slidePercent}%);}
  }
  @keyframes marquee {
    0% {-moz-transform: translateX(0%);-webkit-transform: translateX(0%);transform: translateX(0%);}
    33% {-moz-transform: translateX(0%);-webkit-transform: translateX(0%);transform: translateX(0%);}
    100% {-moz-transform: translateX(-${this.slidePercent}%);-webkit-transform: translateX-${this.slidePercent}%);transform: translateX(-${this.slidePercent}%);}
  }
  @-moz-keyframes marquee2 {
    0% {-moz-transform: translateX(0%);}
    33% {-moz-transform: translateX(0%);}
    100% {-moz-transform: translateX(-${this.slidePercent2}%);}
  }
  @-webkit-keyframes marquee2 {
    0% {-webkit-transform: translateX(0%);}
    33% {-webkit-transform: translateX(0%);}
    100% {-webkit-transform: translateX(-${this.slidePercent2}%);}
  }
  @keyframes marquee2 {
    0% {-moz-transform: translateX(0%);-webkit-transform: translateX(0%);transform: translateX(0%);}
    33% {-moz-transform: translateX(0%);-webkit-transform: translateX(0%);transform: translateX(0%);}
    100% {-moz-transform: translateX(-${this.slidePercent2}%);-webkit-transform: translateX-${this.slidePercent2}%);transform: translateX(-${this.slidePercent2}%);}
  }
  }
  </style>
  <foreignObject height="100%" width="100%">
  <div id="base-shape" height="90px" width="100%" class="cls-main" xmlns="http://www.w3.org/1999/xhtml">
  <div id="bgcolor">
  <div class="test">
  <div class="imgDiv" height="100%" width="50%" xmlns="http://www.w3.org/1999/xhtml">
  <img id="pfp-image" height="60px" width="60px" src="${this.pfpImage}"/>
  <div id="status-color" class="cls-8">${this.emoji}</div>
  </div>
  <div class="namediv">
  <div class="namedetails">
  <div class="cls-3" id="username-text"  xmlns="http://www.w3.org/1999/xhtml" >${this.displayName}</div>
  </div>
  <div class="cls-4" xmlns="http://www.w3.org/1999/xhtml">${this.gamestatus}${this.playing}<div class="gamediv"><div class="game">${this.gameType + " " + this.game}</div></div></div>
  <div class="cls-15" xmlns="http://www.w3.org/1999/xhtml">${this.timestamp}</div>
  <div class="detailimgDiv" height="100%" width="50%" xmlns="http://www.w3.org/1999/xhtml">
  <img id="detail-image" height="22px" width="22px" src="${this.detailsImage}"/>
  <div class="namedetails2">
  <div class="cls-11" id="username-text"  xmlns="http://www.w3.org/1999/xhtml" >${this.details}</div>
  <div class="cls-16" xmlns="http://www.w3.org/1999/xhtml">${this.state}</div>
  <div class="cls-15-5">${this.timestamp}</div>
  </div>
  </div>
  </div>
  </div>
  <div class="logo"></div>
  </div>
  </div>
  </foreignObject>
  </svg>`;
  }
}
module.exports = Card;