import { plus } from '../../assets/icons';
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
		const plusIcon = document.createElement('i');
		plusIcon.innerHTML = plus;
		addButton.appendChild(plusIcon);
		const todoInput = shadowRoot.querySelector('#todo-input');
		const lowPriorityRadio = shadowRoot.querySelector('#low');

		addButton.addEventListener('click', () => {
			const todoText = todoInput.value.trim();
			const priority = this.getPriorityValue();
			if (todoText !== '') {
				this.dispatchEvent(
					new CustomEvent('addTask', {
						bubbles: true,
						detail: {
							text: todoText,
							done: false,
							priority: priority,
						},
						composed: true,
					})
				);
				todoInput.value = '';
				lowPriorityRadio.checked = true;
			}
		});

		todoInput.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				addButton.click();
			}
		});
	}

	getPriorityValue() {
		const mediumPriorityRadio = this.shadowRoot.querySelector('#medium');
		const highPriorityRadio = this.shadowRoot.querySelector('#high');

		if (mediumPriorityRadio.checked) {
			return 'medium';
		} else if (highPriorityRadio.checked) {
			return 'high';
		} else {
			return 'low';
		}
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
