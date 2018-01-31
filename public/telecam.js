import teleenumerator from "./teleenumerator.js"
import telemediadevice from "./telemediadevice.js"
import telestream from "./telestream.js"
import teletrack from "./teletrack.js"
import teleaudio from "./teleaudio.js"
import televideo from "./televideo.js"
import teletrial from "./teletrial.js"

import telepreview from "./telepreview.js"
import telecontrol from "./telecontrol.js"

import teleremote from "./teleremote.js"
import teleshare from "./teleshare.js"

let teleElements= {
	"tele-enumerator": teleenumerator,
	"tele-media-device": telemediadevice,
	"tele-stream": telestream,
	"tele-track": teletrack,
	"tele-trial": teletrial,
	"tele-audio": teleaudio,
	"tele-video": televideo,
	"tele-preview": telepreview,
	"tele-control": telecontrol,
	"tele-remote": teleremote,
	"tele-share": teleshare
}

for( var name of Object.keys( teleElements)){
	var element= teleElements[ name]
	customElements.define( name, element)
}
