import html from './todoList.html';
import FilterTodos from '../filterTodos/filter.js';
import { taskElement } from '../todoTask/task.js';
customElements.define('filter-todos', FilterTodos);

export default class TodoList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.tasks = [];
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
		this.loadTasksFromCookie();
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

		this.addEventListener(
			'filterChange',
			this.filterChangeHandler.bind(this)
		);
		this.addEventListener('delete', this.deleteHandler.bind(this));
		this.addEventListener(
			'checkboxToggle',
			this.checkboxToggleHandler.bind(this)
		);

		const addButton = shadowRoot.querySelector('.add-button');
		const todoInput = shadowRoot.querySelector('#todo-input');

		addButton.addEventListener('click', () =>
			this.addTaskHandler(todoInput)
		);
		todoInput.addEventListener('keydown', (event) =>
			this.enterKeyHandler(event, todoInput)
		);
	}

	loadTasksFromCookie() {
		if (document.cookie) {
			const [cookieName, cookieValue] = document.cookie.split('=');
			if (cookieName === 'todos' && cookieValue !== '[]') {
				this.tasks = JSON.parse(cookieValue);
				this.updateList(this.tasks);
				console.log('Det finns en todo-kaka:', cookieValue);
			} else if (cookieValue === '[]') {
				console.log('Det finns en todo-kaka men den är tom');
			} else {
				console.log('Det finns ingen todo-kaka');
			}
		}
	}

	addTaskHandler(todoInput) {
		const { shadowRoot } = this;
		const todoText = todoInput.value.trim();

		if (todoText !== '') {
			const todo = { text: todoText, done: false };
			const listItem = taskElement(todo, this);

			this.tasks.push(todo);

			const list = shadowRoot.querySelector('.list');
			list.appendChild(listItem);

			todoInput.value = '';
			document.cookie = `todos=${JSON.stringify(this.tasks)}`;
		}
	}

	enterKeyHandler(event, todoInput) {
		const todoText = todoInput.value.trim();
		if (event.key === 'Enter') {
			this.addTaskHandler(todoText, todoInput);
		}
	}

	filterChangeHandler(event) {
		const { filterText, checked } = event.detail;
		let filteredTasks = null;
		if (filterText !== '') {
			filteredTasks = this.tasks.filter(
				({ text, done }) =>
					text.toLowerCase().includes(filterText.toLowerCase()) &&
					(!checked || (checked && done))
			);
		} else {
			filteredTasks = this.tasks.filter(
				({ done }) => !checked || (checked && done)
			);
		}

		this.updateList(filteredTasks);
	}

	deleteHandler(event) {
		const index = this.tasks.findIndex(({ text }) => text === event.detail);
		this.tasks.splice(index, 1);
		document.cookie = `todos=${JSON.stringify(this.tasks)}`;
	}

	checkboxToggleHandler() {
		document.cookie = `todos=${JSON.stringify(this.tasks)}`;
	}

	updateList(filteredTasks) {
		const list = this.shadowRoot.querySelector('.list');
		list.innerHTML = '';

		filteredTasks.forEach((task) => {
			const listItem = taskElement(task, this);
			list.appendChild(listItem);
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
