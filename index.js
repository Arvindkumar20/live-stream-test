const cmsv6playerMin = require("./cmsv6player.min");

var cmsv6player = null;
function initPlayerExample() {
// false means live video mode with no playback toolbar at the bottom.
// true indicates playback mode with a playback toolbar at the bottom.
var _isVodMode = false;
// zh indicates Chinese, en indicates English
var strLang = "zh ";
// cmsv6flash the ID of the window div element of the video plug- in.
var options = {
domId: "cmsv6flash ",
isVodMode: _isVodMode == "1" ? true : false,
width: 800,
height: 600,
lang: strLang == "" ? "en" : strLang
}
cmsv6player = new cmsv6playerMin(options);
initCmsv6Player();
}
// Execute the plug- in after initialization
function initCmsv6Player() {
// Configure the maximum number of windows
cmsv6player.setWindowNum(36);
// reconfigure the current number of windows
cmsv6player.setWindowNum(9);
var serverIp = "v7.cmsv8.com";
// Whether https is enabled or not. Both are login server ports, the default is 6605
var serverPort = 6605;
// Set server information
cmsv6player.setServerInfo(serverIp, serverPort);
}

initPlayerExample();