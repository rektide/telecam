import teleaudio from "./teleaudio.js"
import televideo from "./televideo.js"
import telecam from "./telecam.js"
import telepreview from "./telecontrol.js"
import telecontrol from "./telecontrol.js"
import teleremote from "./teleremote .js"
import teleshare from "./teleshare .js"

let teleElements= {
	teleauddio,
	televido,
	telecam,
	telepreview,
	telecontrol,
	teleremote,
	teleshare
}

for( var name of teleElements){
	var element= teleElements[ name]
	customElements.define( name, element)
}
