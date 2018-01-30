import TeleStream from "./telestream.js"

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
		this.stream; // does this evaluate? I think so?
	}

	// attribute accessors
	get id(){
		return this._id|| this.deviceId
	}
	set id( val){
		this._id= val
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
	  Return an existing TeleStream or create one for this device
	*/
	get stream(){
		var val
		for( var i= this.children.length; i>= 0; --i){
			var child= this.children[ i]
			if( child instanceof TeleStream){
				// we assume only one child
				return child
			}
		}
		if( !val&& this.deviceId){
			// eat zalgo
			var opts= { deviceID: this.deviceId, ...this.constraints}
			if( this.kind.startsWith( "audio")){
				opts.audio= true
			}else if( this.kind.startsWith("video")){
				opts.video= true
			}
			val= navigator.mediaDevices.getUserMedia( opts)
			val.then( stream=> this.appendChild( new TeleStream( stream)))
		}
		return val
	}

	/**
	  Read the underlying device, writing out the attributes that reflect the device
	*/
	renderAttributes(){
		var
		  props= this.mediaDeviceProperties|| defaults.mediaDeviceProperties,
		  deviceInfo= this.deviceInfo
		for( var prop of props){
			this.setAttribute( propToAttr[ prop], deviceInfo[ prop])
		}
		if( !this.noSingleId&& !this._id){
			this.setAttribute( "id", deviceInfo.deviceId)
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
