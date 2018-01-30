export class TeleAudioElement extends HTMLElement{
	static get observedAttributes(){
		return [ "device"]
	}
	static get kind(){
		return "audio"
	}
	constructor(){
		super()
		navigator.mediaDevices.enumerateDevices().then( console.log.bind( console))
		this.setup()
	}
	setup(){
		if( this.setupDevice){
			this.setupDevice()
		}else{
			defaults.setupDevice.call( this)
		}
	}
	setupDevice(){
		if( !this.device&& !this.noDefaultDevice){
			var devices= document.querySelectorAll( "tele-media-device")
			for( var i= 0; i< devices.length; ++i){
				var device= devices[ i]
				if( device.getAttribute( "kind")== this.constructor.kind){
				}
			}
		}
	}
	get device(){
		var attr= this.getAttribute( "device-id")
		return attr&& document.getElementById( attr)|| null
	}
	connectedCallback(){
	}
	disconnectedCallback(){
	}
	attributeChangedCallback(){
	}
}
export default TeleAudioElement
