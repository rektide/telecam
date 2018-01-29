import ParamCase from "/lib/param-case.js"

export let defaults= {
	mediaProperties: [ "deviceId", "groupId", "kind", "label"]
}

export class TeleDeviceElement extends HTMLElement{
	constructor( mediaDevice){
		super()
		this.mediaDevice= mediaDevice
		if( this.mediaDevice){
			this.regenAttributes()
		}
	}
	regenAttributes(){
		var props= this.mediaProperties|| defaults.mediaProperties
		for( var prop of props){
			this.setAttribute( prop.toLowerCase(), this.mediaDevice[ prop])
		}
	}
}
export default TeleDeviceElement
