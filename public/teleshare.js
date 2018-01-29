export class TeleShareElement extends HTMLElement{
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
export default TeleShareElement
