import { magnifyingGlass } from '../../assets/icons';
import html from './filter.html';

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
		shadowRoot.appendChild(cssContent);
		shadowRoot.appendChild(htmlContent);

		const searchIcon = document.createElement('i');
		searchIcon.innerHTML = magnifyingGlass;
		const searchButton = shadowRoot.querySelector('.search-button');
		searchButton.appendChild(searchIcon);
	}

	setupEventListeners() {
		const { shadowRoot } = this;

		const filterCheckbox = shadowRoot.querySelector('#filter-checkbox');
		const searchInput = shadowRoot.querySelector('#search-input');
		const searchButton = shadowRoot.querySelector('.search-button');
		const prioritySelect = shadowRoot.querySelector('#priority-select');

		const dispatchFilterEvent = () => {
			const eventOptions = {
				bubbles: true,
				detail: {
					filterText: searchInput.value,
					checked: filterCheckbox.checked,
					priority: prioritySelect.value,
				},
				composed: true,
			};

			this.dispatchEvent(new CustomEvent('filterChange', eventOptions));
		};

		filterCheckbox.addEventListener('click', dispatchFilterEvent);

		searchButton.addEventListener('click', dispatchFilterEvent);

		searchInput.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				dispatchFilterEvent();
			}
		});

		prioritySelect.addEventListener('change', dispatchFilterEvent);
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
