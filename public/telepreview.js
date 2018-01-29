export class TelePreviewElement extends HTMLDivElement{
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
export default TelePreviewElement
