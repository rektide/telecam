export class TeleTrackElement extends HTMLElement{
	get observedAttributes(){
		return []
	}
	constructor( track, opts){
		super()
		Object.assign( this, opts)
		this.track= track
		this.render()
	}

	// underlying properties
	get id(){
		return this._id|| this.deviceId
	}
	set id( val){
		this._id= val
	}

	/**
	  Read the underlying device, writing out the attributes that reflect the device
	*/
	render(){
	}
}
export default TeleTrackElement
