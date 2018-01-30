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
		this.deviceInfo= deviceInfo
	}

	get deviceInfo(){
		return this._deviceInfo
	}
	set deviceInfo( val){
		this._deviceInfo= val
		if( !val){
			return
		}
		this.renderAttributes()
		if( val.getCapabilities){
			this._capabilities= val.getCapabilities()
		}
	}

	// attribute accessors
	get id(){
		return this.getAttribute( "id")
	}
	get deviceId(){
		return this.getAttribute( "device-id")
	}
	get groupId(){
		return this.getAttribute( "group-id")
	}
	get kind(){
		return this.getAttribute( "kind")
	}
	get label(){
		return this.getAttribute( "label")
	}

	get capabilities(){
		return this._capabilities
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
