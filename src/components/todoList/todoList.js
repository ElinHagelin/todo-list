import html from './todoList.html';
import FilterTodos from '../filterTodos/filter.js';
import AddTodo from '../addTodo/add.js';
import { taskElement } from '../todoTask/task.js';

customElements.define('filter-todos', FilterTodos);
customElements.define('add-todo', AddTodo);

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
		console.log(this);
		const { shadowRoot } = this;

		this.addEventListener('addTask', (event) =>
			this.addTaskHandler(event.detail)
		);
		this.addEventListener(
			'filterChange',
			this.filterChangeHandler.bind(this)
		);
		this.addEventListener('delete', this.deleteHandler.bind(this));
		this.addEventListener(
			'checkboxToggle',
			this.checkboxToggleHandler.bind(this)
		);
		this.addEventListener('editTask', this.editTaskHandler.bind(this));
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

	addTaskHandler(todo) {
		const listItem = taskElement(todo, this);
		this.tasks.push(todo);
		const list = this.shadowRoot.querySelector('.list');
		list.appendChild(listItem);
		this.updateCookieList();
	}

	editTaskHandler() {
		this.updateCookieList();
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
		this.updateCookieList();
	}

	checkboxToggleHandler() {
		this.updateCookieList();
	}

	updateList(filteredTasks) {
		const list = this.shadowRoot.querySelector('.list');
		list.innerHTML = '';

		filteredTasks.forEach((task) => {
			const listItem = taskElement(task, this);
			list.appendChild(listItem);
		});
	}

	updateCookieList() {
		document.cookie = `todos=${JSON.stringify(this.tasks)}`;
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
