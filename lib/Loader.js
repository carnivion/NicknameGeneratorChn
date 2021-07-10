export { Loader }

class Loader extends EventTarget {
	#XHR
	#content
	constructor(uri=null) {
		super()
		if (uri) this.load(uri)
	}
	get content() {
		return this.#content
	}
	#readyStateChange = () => {
		if (this.#XHR.readyState === 4) {
			if (this.#XHR.status === 200 || this.#XHR.status === 0) {
				this.#content = this.#XHR.responseText
				this.dispatchEvent(new CustomEvent('complete', {detail: {content: this.#content}}))
			}
		}
	}
	load = (uri) => {
		this.#XHR = new XMLHttpRequest()
		this.#XHR.open('GET', uri)
		this.#XHR.onreadystatechange = this.#readyStateChange
		this.#XHR.send()
	}
}