import styles from '../src/css/styles.css';
import AppHeader from './components/appHeader/header.js';
import TodoList from './components/todoList/todoList.js';
customElements.define('app-header', AppHeader);
customElements.define('todo-list', TodoList);