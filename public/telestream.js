import TeleTrackElement from "./teletrack.js"

export class TeleStreamElement extends HTMLElement{
	constructor( stream, opts){
		super()
		Object.assign( this, opts)
		this.addtrackHandler= this.addtrackHandler.bind( this)
		this.removetrackHandler= this.removetrackHandler.bind( this)
		this.stream= stream // this trigger render
	}

	// underlying properties
	get id(){
		return this._id|| (this.stream&& this.stream.id)
	}
	set id( val){
		this._id= val
	}
	get active(){
		return this.stream&& this.stream.active
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
		this.render()
	}

	addtrackHandler( e){
		this.dispatchEvent( e)
		// add child -- notsure the shape here
	}
	_addtrack( track){
		var el= new TeleTrackElement( track)
		this.appendChild( el)
	}
	removetrackHandler( e){
		this.dispatchEvent( e)
		// remove child
	}

	/**
	  Update this element to reflect the current .stream
	*/
	render(){
		// store all current tracks
		var oldTracks= {}
		for( var i= 0; i< this.children.length; ++i){
			var child= this.children[ i]
			if( !( child instanceof TeleTrackElement)){
				continue
			}
			oldTracks[ child.id]= child
		}

		// set attributes
		this.setAttribute( "id", this.id)
		if( this.active){
			this.setAttribute( "active", "")
		}else{
			this.removeAttribute( "active")
		}

		// remove then add, one and only one listener
		var stream= this.stream
		if( stream){
			stream.removeEventListener( "addtrack", this.addtrackHandler)
			stream.removeEventListener( "removetrack", this.removetrackHandler)
			stream.addEventListener( "addtrack", this.addtrackHandler)
			stream.addEventListener( "removetrack", this.removetrackHandler)

			// add any tracks that aren't found
			for( var track of stream.getTracks()){
				if( oldTracks[ track.id]){
					// do not clean this up in the next step of dropping stales
					delete oldTracks[ track.id]
					// don't try to add it again
					continue
				}
				// once shape of addtrack is known, drop this fn and call addtrackHandler instead
				this._addtrack( track)
			}
		}

		// any tracks still in oldTracks are stale & need to be dropped
		for( var track in oldTracks){
			var el= oldTracks[ track]
			this.removeChild( el)
		}
	}
}
export default TeleStreamElement
