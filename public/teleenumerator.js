import TeleMediaDevice from "./telemediadevice.js"

import unknownFilter from "/lib/triggerable-generation/unknown.js"

export let defaults= {
	pollDevicesInterval: 2000
}

export class TeleEnumeratorElement extends HTMLElement{
	constructor( options){
		super()
		Object.assign( this, {devices: []}, options)
		this.unknown= unknownFilter( this.devices)
		this.devicechangedhandler= this.devicechangedhandler.bind( this)
		this.start()
	}
	async ondevicechangehandler(){
		var devices= await navigator.mediaDevices.enumerateDevices()
		for( var d of devices){
			if( this.unknown( d)){
				var deviceEl= new TeleMediaDevice( mediaDevice)
				this.appendChild( deviceEl)
				// TODO: create & dispatch an mediadevice event
			}
		}
	}
	start(){
		if( this.running){
			console.warn("Already started")
			return
		}
		this.running= false
		MediaDevices.addEventListener( "devicechange", this.devicechangehandler)
	}
	stop(){
		MediaDevices.removeeEventListener( "devicechange", this.devicechangehandler)
	}
	mediaDevices(){
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
