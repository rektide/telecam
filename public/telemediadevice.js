export let defaults= {
	mediaDeviceProperties: [ "deviceId", "groupId", "kind", "label"]
}

let
  mediaDeviceProperties=[ "deviceId", "groupId", "kind", "label"],
  propToAttr= {
	deviceId: "device-id",
	groupId: "group-id",
	kind: "kind",
	label: "label"
  },
  attrToProp= {
	"device-id": "deviceId",
	"group-id": "groupId",
	kind: "kind",
	label: "label",
	id: "deviceId"
  }

export class TeleDeviceElement extends HTMLElement{
	get observedAttributes(){
		return mediaDeviceProperties
	}
	constructor( mediaDevice, opts){
		super()
		Object.assign( this, opts)
		this.mediaDevice= mediaDevice
		this.renderAttributes()
	}
	renderAttributes(){
		var props= this.mediaDeviceProperties|| defaults.mediaDeviceProperties
		for( var prop of props){
			this.setAttribute( propToAttr[ prop], this.mediaDevice[ prop])
		}
		if( !this.noSingleId){
			this.setAttribute( "id", this.mediaDevice.deviceId)
		}
	}
	attributesChangedCallback( name, oldValue, newValue){
		if( name=== "id"&& !this.noSingleId){
			name= "deviceId"
		}
		if( name&& newValue!== undefined){
			this.mediaDevice[ attrToProp[ name]]= newValue
		}
	}
}
export default TeleDeviceElement
