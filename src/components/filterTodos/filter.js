import html from './filter.html'

export default class FilterTodos extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}


	render() {
		const { shadowRoot } = this;

		const { cssContent, htmlContent } = this.htmlToElement(html);
		shadowRoot.innerHTML = '';
		shadowRoot.appendChild(cssContent)
		shadowRoot.appendChild(htmlContent)
	}

	setupEventListeners() {
		const { shadowRoot } = this;

		const filterInput = shadowRoot.querySelector('#filter-input');
		const filterButton = shadowRoot.querySelector('.filter-button')

		filterButton.addEventListener('click', () => {
			const filterText = filterInput.value;
			this.dispatchEvent(new CustomEvent('filterChange', { bubbles: true, detail: filterText, composed: true }));
		});
	}


	htmlToElement(html) {
		var template = document.createElement('template');
		html = html.trim();
		template.innerHTML = html;
		return { cssContent: template.content.firstChild, htmlContent: template.content.lastChild };
	}
}