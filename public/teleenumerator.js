import TeleMediaDevice from "./telemediadevice.js"

import unknownFilter from "/lib/triggerable-generation/unknown.js"

export class TeleEnumeratorElement extends HTMLElement{
	constructor( options){
		super()
		Object.assign( this, {devices: []}, options)
		this.unknown= unknownFilter( this.devices)
		this.devicechangehandler= this.devicechangehandler.bind( this)
		this.start()
		this.devicechangehandler()
	}
	async devicechangehandler(){
		var devices= await navigator.mediaDevices.enumerateDevices()
		for( var mediaDevice of devices){
			if( this.unknown( mediaDevice)){
				var deviceEl= new TeleMediaDevice( mediaDevice)
				this.appendChild( deviceEl)
				// TODO: create & dispatch an mediadevice event
			}
		}
	}
	start(){
		if( !this.running){
			this.running= true
			navigator.mediaDevices.addEventListener( "devicechange", this.devicechangehandler)
		}
	}
	stop(){
		if( this.running){
			this.running= false
			navigator.mediaDevices.removeEventListener( "devicechange", this.devicechangehandler)
		}
	}
	get mediaDevices(){
		var foundDevices= []
		for( var i= 0; i< this.children.length; ++i){
			var child= this.children[ i]
			if( child instanceof TeleMediaDevice){
				foundDevices.push( child)
			}
		}
		return foundDevices
	}
	attributeChangedCallback(){
	}
}
export default TeleEnumeratorElement
