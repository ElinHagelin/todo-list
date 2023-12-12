import html from './add.html';

export default class AddTodo extends HTMLElement {
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
		shadowRoot.appendChild(cssContent);
		shadowRoot.appendChild(htmlContent);
	}

	setupEventListeners() {
		const { shadowRoot } = this;

		const addButton = shadowRoot.querySelector('.add-button');
		const todoInput = shadowRoot.querySelector('#todo-input');

		addButton.addEventListener('click', () => {
			const todoText = todoInput.value.trim();
			if (todoText !== '') {
				this.dispatchEvent(
					new CustomEvent('addTask', {
						bubbles: true,
						detail: { text: todoText, done: false },
						composed: true,
					})
				);
				todoInput.value = '';
			}
		});

		todoInput.addEventListener('keydown', (event) => {
			const todoText = todoInput.value.trim();
			if (event.key === 'Enter' && todoText !== '') {
				this.dispatchEvent(
					new CustomEvent('addTask', {
						bubbles: true,
						detail: { text: todoText, done: false },
						composed: true,
					})
				);
				todoInput.value = '';
			}
		});
	}

	htmlToElement(html) {
		var template = document.createElement('template');
		html = html.trim();
		template.innerHTML = html;
		return {
			cssContent: template.content.firstChild,
			htmlContent: template.content.lastChild,
		};
	}
}
