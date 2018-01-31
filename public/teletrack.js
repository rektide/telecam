export let defaults= {
	trackProperties: [ "kind", "id", "label", "enabled", "muted", "readyState"]
}

export class TeleTrackElement extends HTMLElement{
	constructor( track, opts){
		super()
		Object.assign( this, opts)
		this.mutedHandler= this.mutedHandler.bind( this)
		this.unmutedHandler= this.unmutedHandler.bind( this)
		this.endedHandler= this.endedHandler.bind( this)
		this.track= track
	}

	// underlying properties
	get id(){
		return this._id|| (this.track&& this.track.id)
	}
	set id( val){
		this._id= val
	}
	get kind(){
		return this.track&& this.track.kind
	}
	get label(){
		return this.track&& this.track.label
	}
	get enabled(){
		return this.track&& this.track.enabled
	}
	get muted(){
		return this.track&& this.track.muted
	}
	get readyState(){
		return this.track&& this.track.readyState
	}
	// underlying gets
	get capabilities(){
		return this.track&& this.track.getCapabilities()
	}
	get constraints(){
		return this.track&& this.track.getConstraints()
	}
	get settings(){
		return this.track&& this.track.getSettings()
	}
	// underlying methods
	stop(){
		this.track.stop()
	}

	get track(){
		return this._track
	}
	set track( val){
		if( this._track=== val){
			// we know
			return
		}
		if( this._track){
			this._track.removeEventListener( "muted", this.mutedHandler)
			this._track.removeEventListener( "unmuted", this.unmutedHandler)
			this._track.removeEventListener( "ended", this.endedHandler)
		}
		this._track= val
		if( !val){
			return
		}
		this.render()
	}

	/**
	  Read the underlying device, writing out the attributes that reflect the device
	*/
	render(){
		this.renderAttributes()

		var track= this.track
		if( track){
			// in case we're already bound, remove
			track.removeEventListener( "onmuted", this.mutedHandler)
			track.removeEventListener( "onunmuted", this.unmutedHandler)
			track.removeEventListener( "ended", this.endedHandler)
			// bind events
			track.addEventListener( "onmuted", this.mutedHandler)
			track.addEventListener( "onunmuted", this.unmutedHandler)
			track.addEventListener( "ended", this.endedHandler)
		}
	}

	renderAttributes(){
		var props= this.trackProperties|| defaults.trackProperties
		for( var prop of props){
			var val= this[ prop]
			if( val=== false){
				this.removeAttribute( prop)
			}else{
				val= val=== true? "": val
				this.setAttribute( prop, val)
			}
		}
	}

	mutedHandler( evt){
		this.setAttribute( "muted", "")
		this.dispatchEvent( evt)
	}
	unmutedHandler( evt){
		this.removeAttribute( "muted")
		this.dispatchEvent( evt)
	}
	endedHandler( evt){
		this.setAttribute( "ended")
		this.dispatchEvent( evt)
	}
}
export default TeleTrackElement
