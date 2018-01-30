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
	constructor( deviceInfo, opts){
		super()
		Object.assign( this, opts)
		if( deviceInfo){
			this.deviceInfo= deviceInfo
			this.renderAttributes()
		}
	}
	get capabilities(){
		if( this.deviceInfo&& this.deviceInfo.getCapabilities){
			return this.deviceInfo.getCapabilities()
		}
	}

	/**
	*/
	get stream(){
		
	}
	

	/**
	  Read the underlying device, writing out the attributes that reflect the device
	*/
	renderAttributes(){
		var props= this.mediaDeviceProperties|| defaults.mediaDeviceProperties
		for( var prop of props){
			this.setAttribute( propToAttr[ prop], this.deviceInfo[ prop])
		}
		if( !this.noSingleId){
			this.setAttribute( "id", this.deviceInfo.deviceId)
		}
	}
	attributesChangedCallback( name, oldValue, newValue){
		if( name=== "id"&& !this.noSingleId){
			// by default, id is an alias of deviceId
			this.setAttribute( "device-id", newValue)
			// the actual underlying property on the MediaDevice is deviceId not name
			name= "deviceId"
		}
		if( name&& newValue!== undefined){
			// honestly this is silly & won't do anything good
			this.mediaDevice[ attrToProp[ name]]= newValue
		}
	}
}
export default TeleDeviceElement
