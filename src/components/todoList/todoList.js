import html from './todoList.html'
import FilterTodos from '../filterTodos/filter.js';
customElements.define('filter-todos', FilterTodos)
import { taskElement } from '../todoTask/task.js'

export default class TodoList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.tasks = []
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

		// Custom event från filter.js
		this.addEventListener('filterChange', (event) => {
			const filterText = event.detail;
			this.filterTasks(filterText);
		});

		// Custom event från task.js
		this.addEventListener('delete', (event) => {
			const taskToDelete = event.detail;
			const index = this.tasks.findIndex(({ text }) => text === taskToDelete)
			this.tasks.splice(index, 1)
		});

		const addButton = shadowRoot.querySelector('.add-button');
		const todoInput = shadowRoot.querySelector('#todo-input');

		addButton.addEventListener('click', () => {
			const todoText = todoInput.value.trim();

			if (todoText !== '') {
				const todo = {
					text: todoText,
					done: false
				}
				const listItem = taskElement(todo, this)

				this.tasks.push(todo)

				const list = shadowRoot.querySelector('.list');
				list.appendChild(listItem);

				todoInput.value = '';
			}
		});
	}

	filterTasks(filterText) {
		let filteredTasks = null
		if (filterText !== '') {
			filteredTasks = this.tasks.filter(({ text }) => text.toLowerCase().includes(filterText.toLowerCase()));
		} else {
			filteredTasks = this.tasks
		}

		this.updateList(filteredTasks);
	}

	updateList(filteredTasks) {
		const list = this.shadowRoot.querySelector('.list');
		list.innerHTML = '';

		filteredTasks.forEach(task => {
			const listItem = taskElement(task, this)
			list.appendChild(listItem);
		});
	}


	htmlToElement(html) {
		var template = document.createElement('template');
		html = html.trim();
		template.innerHTML = html;
		return { cssContent: template.content.firstChild, htmlContent: template.content.lastChild };
	}
}