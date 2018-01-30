import unknownFilter from "/lib/triggerable-generation/unknown.js"

export let defaults= {
	streamProperties: [ "active", "id"]
}

export class TeleStreamElement extends HTMLElement{
	get observedAttributes(){
		return []
	}
	constructor( stream, opts){
		super();
		Object.assign( this, opts);
		this.unknown= unknownFilter()
		this.addtrackHandler= this.addtrackHandler.bind( this)
		this.removetrackHandler= this.removetrackHandler.bind( this)
		this.stream= stream
	}
	addtrackHandler( e){
		this.dispatchEvent( e)
	}
	removetrackHandler( e){
		this.dispatchEvent( e)
	}
	get id(){
		return this._id|| this.deviceId
	}
	set id( val){
		this._id= val
	}
	get stream(){
		return this._stream
	}
	set stream( val){
		if( this._stream=== val){
			// we know
			return
		}
		if( this._stream){
			this._stream.removeEventListener( "addtrack", this.addtrackHandler)
			this._stream.removeEventListener( "removetrack", this.removetrackHandler)
		}
		this._stream= val
		if( !val){
			return
		}
		val.addEventListener( "addtrack", this.addtrackHandler)
		val.addEventListener( "removetrack", this.removetrackHandler)
	}
	get active(){
		return this.stream&& this.strem.active
	}

	/**
	  Read the underlying device, writing out the attributes that reflect the device
	*/
	renderAttributes(){
		var
		  props= this.streamProperties|| defaults.streamProperties,
		  stream= this.stream|| {}
		for( var prop of props){
			this.setAttribute( propToAttr[ prop], stream[ prop])
		}
	}
	attributesChangedCallback( name, oldValue, newValue){
		if( name&& newValue!== undefined){
			// honestly this is silly & won't do anything good
			this.stream[ attrToProp[ name]]= newValue
		}
	}
}
export default TeleStreamElement
