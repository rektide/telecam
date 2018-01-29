export class TeleRemoteElement extends HTMLElement{
	static get observedAttributes(){
		return [ "audio", "video"]
	}
	constructor(){
		super()
	}
	connectedCallback(){
	}
	disconnectedCallback(){
	}
	attributeChangedCallback(){
	}
}
export default TeleRemoteElement
