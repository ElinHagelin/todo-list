import { circle, pen, trashCan } from '../../assets/icons';

export const taskElement = (todo, list) => {
	const listItem = document.createElement('li');
	const checkbox = document.createElement('input');
	const priorityIndicator = document.createElement('span');
	const textSpan = document.createElement('span');
	const text = document.createElement('p');
	const deleteButton = document.createElement('button');
	const editButton = document.createElement('button');
	const editInput = document.createElement('input');
	const editIcon = document.createElement('i');
	const deleteIcon = document.createElement('i');

	editIcon.innerHTML = pen;
	deleteIcon.innerHTML = trashCan;
	checkbox.type = 'checkbox';
	priorityIndicator.classList.add('priority-indicator');
	text.innerText = todo.text;
	textSpan.classList.add('todo-text-span');
	deleteButton.classList.add('delete-button');
	editButton.classList.add('edit-button');
	editInput.type = 'text';
	editInput.style.display = 'none';

	const createDot = () => {
		const dot = document.createElement('i');
		dot.innerHTML = circle;
		dot.classList.add('dot');
		if (todo.priority === 'low') {
			dot.style.color = '#54b23a';
		} else if (todo.priority === 'medium') {
			dot.style.color = '#fdcf44';
		} else if (todo.priority === 'high') {
			dot.style.color = '#f53c3c';
		}
		return dot;
	};
	const dot = createDot();

	if (todo.done === true) {
		checkbox.checked = true;
		text.classList.add('done');
	} else {
		checkbox.checked = false;
		text.classList.remove('done');
	}

	checkbox.addEventListener('click', () => {
		if (todo.done === false) {
			todo.done = true;
			checkbox.checked = true;
			text.classList.add('done');
		} else {
			todo.done = false;
			checkbox.checked = false;
			text.classList.remove('done');
		}
		list.dispatchEvent(
			new CustomEvent('checkboxToggle', {
				bubbles: true,
				detail: todo,
				composed: true,
			})
		);
	});

	deleteButton.addEventListener('click', () => {
		listItem.remove();
		list.dispatchEvent(
			new CustomEvent('delete', {
				bubbles: true,
				detail: todo.text,
				composed: true,
			})
		);
	});

	editInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			editButton.click();
		}
	});

	editButton.addEventListener('click', () => {
		if (editInput.style.display === 'none') {
			editInput.style.display = 'block';
			editInput.value = text.textContent;
			text.style.display = 'none';
		} else {
			editInput.style.display = 'none';
			text.style.display = 'block';
			const newText = editInput.value.trim();
			if (newText !== '') {
				text.textContent = newText;
				todo.text = newText;
				list.dispatchEvent(
					new CustomEvent('editTask', {
						bubbles: true,
						detail: todo,
						composed: true,
					})
				);
			}
		}
	});

	editButton.append(editIcon);
	deleteButton.append(deleteIcon);
	textSpan.append(text);
	textSpan.append(editInput);

	listItem.appendChild(checkbox);
	listItem.appendChild(textSpan);
	listItem.appendChild(dot);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
};
