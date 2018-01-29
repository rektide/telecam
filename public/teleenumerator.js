import TeleMediaDevice from "./telemediadevice.js"

import TriggerableGeneration from "/lib/triggerable-generation/triggerable-generation.js"
import ParamCase from "/lib/param-case/param-case.js"

export let defaults= {
	checkInterval: 2000
}

export class TeleEnumeratorElement extends HTMLElement{
	static get observedAttributes(){
		return [ "poll-devices-interval"]
	}
	constructor( options){
		super()
		Object.assign( this, {devices: []}, options)
		this.start()
	}
	start(){
		if( this.interval){
			console.warn("Already started")
			return
		}

		if( !this.refreshTrigger){
			// generator of all devices
			var enumerator= TriggerableGeneration(()=> navigator.mediaDevices.enumerateDevices())
			(async ()=>{
				for await( var mediaDevice of enumerator.asyncGenerator()){
					// create a device element (which also stores it?)
					var deviceEl= new TeleMediaDevice( mediaDevice)
					this.appendChild( deviceEl)
					// TODO: create & dispatch an mediadevice event
				}
			})()
			this.refreshTrigger= enumerator.trigger
		}

		// trigger poll periodically
		var delay= this.pollDevicesInterval|| defaults.pollDevicesInterval
		this.interval= setInterval( this.refreshTrigger, delay)
	}
	stop(){
		clearInterval( this.interval)
		delete this.interval
	}
	get pollDevicesInterval(){
		var attr= this.getAttribute( "poll-devices-interval")
		if( attr){
			return Number.parseFloat( attr)
		}
		return defaults.pollDevicesInterval
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
		if( this.interval){
			this.stop()
			this.start()
		}
	}
}
export default TeleEnumeratorElement
