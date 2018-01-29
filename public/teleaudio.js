export class TeleAudioElement extends HTMLDivElement{
	static get observedAttributes(){
		return [ "device"]
	}
	constructor(){
		super()
		console.log("sup!")
		mediaDevices.enumateDevices().then( console.log.bind( console))
	}
	connectedCallback(){
	}
	disconnectedCallback(){
	}
	attributeChangedCallback(){
	}
}
export default TeleAudioElement
