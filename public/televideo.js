export class TeleVideoElement extends HTMLElement{
	static get observedAttributes(){
		return [ "device"]
	}
	constructor(){
		super()
		navigator.mediaDevices.enumerateDevices().then( console.log.bind( console))
	}
	connectedCallback(){
	}
	disconnectedCallback(){
	}
	attributeChangedCallback(){
	}
}
export default TeleVideoElement
