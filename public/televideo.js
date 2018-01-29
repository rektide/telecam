export class TeleVideoElement extends HTMLDivElement{
	static get observedAttributes(){
		return [ "device"]
	}
	constructor(){
		super()
		mediaDevices.enumateDevices().then( console.log.bind( console))
	}
	connectedCallback(){
	}
	disconnectedCallback(){
	}
	attributeChangedCallback(){
	}
}
export default TeleVideoElement
