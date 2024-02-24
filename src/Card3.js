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
	if(color.length > 7) color = color.substring(0, color.length - 2);
	const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
	let opacityHex = _opacity.toString(16).toUpperCase()
	if(opacityHex.length == 1) opacityHex = "0" + opacityHex;
	return color + opacityHex;
}
class Card {
	constructor({
		playing,
		brRadius,
		custom,
		lastSeen,
		bgmode,
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
		height2,
	}) {
		this.playing = "";
		this.brRadius = brRadius;
		this.lastSeen = lastSeen;
		this.bgmode = bgmode;
		this.bgmodeoption = "";
		this.bgpositionx = bgpositionx;
		this.bgpositiony = bgpositiony;
		this.fgopacity = fg_opacity;
		this.fgbg = fgbg;
		this.offset = setOffset;
		this.customBg = customBg;
		this.width = setWidth;
		this.hideoffline = hide_offline;
		this.custom = custom;
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
		this.details = details;
		this.detailsImage = detailsImage;
		this.state = state;
		this.height = height2;
		this.statusColor = statusColors[status];
		this.transform = "translate(94.66 67.11)";
		this.rich = "250";
		this.rich2 = "translate(0,0)";
		this.nameheight = "height: 26px";
		if(playing && this.game !== "Anime" && this.game !== "Spotify") {
			this.playing = "<b>Playing:</b>"
		}
		if(!this.game) {
			this.rich2 = "translate(" + this.offset + "px,0)";
			this.transform = "translate(94.66 70.11)";
			this.rich = setWidth;
		}
		if(custom == 1) {
			this.height = 150;
			this.rich = setWidth;
		}
		if(custom == 2) {
			this.height = 150;
		}
		if(!this.game) {
			this.game = statusNames[status];
		}
		if(this.game === "Anime" && timestampend.length > 0) {
			this.timestamp = timestampend + " left";
		}
		if(this.game === "Spotify") {
			this.game = "Listening to Spotify";
		}
		if(this.timestamp === "NaN:NaN left" || this.timestamp === "undefined elapsed" || this.gameType === "Paused" || custom == 1) {
			this.timestamp = " ";
		}
		if(this.lastSeen) {
			this.timestamp = this.lastSeen;
			this.nameheight = " height: 24px";
		}
		if(this.hideoffline && this.status == "offline") {
			this.height = 0;
			this.rich = "0";
		}
		if(this.bgmode == 1 || this.bgmode == 2) {
			this.bgmodeoption = "height:100%;background:" + changeColorAlpha(this.bgColor, this.fgopacity) + ";"
		}
		if(customBg && fgColor && fgColor !== "#fff0") {
			this.fgbg = "background:" + changeColorAlpha(this.fgColor, this.fgopacity) + ";border-radius: 4px;";
			this.fgColor = changeColorAlpha(this.fgColor, this.fgopacity);
			if(this.height == 230) {
				this.fgbg = "height:80px;background:" + changeColorAlpha(this.fgColor, this.fgopacity) + ";margin: 10px;margin-top: 7.5px;border-radius: 4px;";
			}
		}
		else if(this.height == 230) {
			this.fgbg = "height:80px;background:" + this.fgColor + ";margin: 10px;margin-top: 7.5px;border-radius: 4px;";
		}
	}
	render() {
		return `
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="215" height="${this.height}" viewBox="0 0 215 ${this.height}" role="img">
  <style>
  svg#Layer_1{
    text-align: -webkit-center;
    text-align-last: start;
    OVERFLOW: HIDDEN;
    width:auto;
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
    width: max-content;
    min-width: 150px;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding; 
    background-clip: padding-box;
    max-width: 100%;
    border:${this.br};
    border-color:${this.brColor};
    ${this.customBg}
  }
  .cls-detail{
    background:${this.fgColor};
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    ${this.status == "offline" || this.custom || !this.game || (!this.details && !this.state) ? 'display:none' : ""}
    ${this.bgmode == 2 ? 'background:none;height: 15px;justify-content: center;' : ""}
  }
  .namediv{
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow:hidden;
    margin-top: -5px;
    padding-bottom: 10px;
    height: unset;
    padding: 0px 10px;
    width: -webkit-fill-available;
  }
  #bgcolor{
    ${this.bgmodeoption};
    height: 100%
  }
  .namedetails {
    ${this.nameheight}
  }
  .namedetails2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.8px;
    margin-left: 0.2px;
    padding-right:5px;
    text-wrap: nowrap;
    overflow:hidden;
    text-wrap: nowrap
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
  }
  .cls-11, .cls-3 {
    color: ${this.textColor};
    font-family: SegoeUI-Bold, Segoe UI;
    font-weight: 700;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }
  .cls-4 {
    color: ${this.detailsColor};
    font-size: 13px;
    text-wrap:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cls-14,.cls-15,.cls-16, .cls-4 {
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
  }
  .cls-11{
    font-size: 12px;
  }
  .cls-11, .cls-14 {
    text-wrap:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-variant-east-asian: proportional-width
  }
  .cls-14 { 
    color: ${this.detailsColor};
    font-size: 12px;
    font-weight:500;
  }
  .cls-15 { 
    font-size: 11px;
    font-weight:400;
    ${this.lastSeen ? 'font-size: 8px;' : ""}
    }
  .cls-11,.cls-16{
    overflow: hidden;
    text-overflow: ellipsis
  }
  .cls-16 { 
    font-size: 10px;
    font-weight:500
  }
  .imgDiv {
    padding: 20px;
    padding-bottom: 10px
  }
  .test{
    display: flex;
    align-items: center;
    ${this.fgbg};
    ${this.br ? 'border-radius:2px;' : ""}
    flex-direction: column;
    height: 165px;
    text-align-last: center;
    ${this.bgmode == 2 ? 'background:none;' : ""}
  }
  .test2{
    padding: 0px 10px 0px 10px;
    max-width: 200px;
    ${this.bgmode == 2 ? 'padding-bottom: 20px;' : ""}
    }
  .detailimgDiv {
    padding: 5px 5px 5px 6px;
    height: 28px;
    width: 28px;
    align-self: center;
    }
  img#pfp-image {
    border-radius: 50px;
    -webkit-mask-image: radial-gradient( circle 10px at -webkit-calc(100% - 8px) -webkit-calc(100% - 8px), transparent 30px, #000 0 );
    mask-image: radial-gradient( circle 10px at calc(100% - 8px) calc(100% - 8px), transparent 30px, #000 0 );
    }
  img#detail-image {
    border-radius: 4px;
    object-fit: cover;
  }
  </style>
  <foreignObject height="100%" width="100%">
  <div id="base-shape" height="97px" width="100%" class="cls-main" xmlns="http://www.w3.org/1999/xhtml">
  <div id="bgcolor">
  <div class="test">
  <div class="imgDiv" height="100%" width="50%" xmlns="http://www.w3.org/1999/xhtml">
  <img id="pfp-image" height="60px" width="60px" src="${this.pfpImage}"/>
  <div id="status-color" class="cls-8"></div>
  </div>
  <div class="namediv">
  <div class="namedetails">
  <div class="cls-3" id="username-text"  xmlns="http://www.w3.org/1999/xhtml" >${this.displayName}</div>
  </div>
  <div class="cls-4" xmlns="http://www.w3.org/1999/xhtml">${this.playing}${this.gameType + " " + this.game}</div>
  <div class="cls-15" xmlns="http://www.w3.org/1999/xhtml">${this.timestamp}</div>
  </div>
  </div>
  <div class="test2">
  <div id="detail-shape" height="97px" width="100%" class="cls-detail" xmlns="http://www.w3.org/1999/xhtml">
  <div class="detailimgDiv" height="100%" width="50%" xmlns="http://www.w3.org/1999/xhtml">
  <img id="detail-image" height="28px" width="28px" src="${this.detailsImage}"/></div>
  <div class="namedetails2">
  <div class="cls-11" id="username-text"  xmlns="http://www.w3.org/1999/xhtml" >${this.details}</div>
  <div class="cls-16" xmlns="http://www.w3.org/1999/xhtml">${this.state}</div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </foreignObject>
  </svg>`;
	}
}
module.exports = Card;