import teleaudio from "./teleaudio.js"
import televideo from "./televideo.js"
import telepreview from "./telepreview.js"
import telecontrol from "./telecontrol.js"
import teleremote from "./teleremote.js"
import teleshare from "./teleshare.js"

let teleElements= {
	"tele-audio": teleaudio,
	"tele-video": televideo,
	"tele-preview": telepreview,
	"tele-control": telecontrol,
	"tele-remote": teleremote,
	"tele-share": teleshare
}

for( var name of Object.keys( teleElements)){
	var element= teleElements[ name]
	console.log(name)
	customElements.define( name, element)
}
