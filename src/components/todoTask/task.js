export const taskElement = (todo, list) => {
	const listItem = document.createElement('li');
	const checkbox = document.createElement('input');
	const text = document.createElement('span');
	const deleteButton = document.createElement('button');
	const editButton = document.createElement('button');
	const editInput = document.createElement('input');

	checkbox.type = 'checkbox';
	text.textContent = todo.text;
	deleteButton.textContent = 'Delete';
	deleteButton.classList.add('delete-button');
	editButton.textContent = 'Edit';
	editButton.classList.add('edit-button');
	editInput.type = 'text';
	editInput.style.display = 'none';

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
			editInput.style.display = 'inline-block';
			editInput.value = text.textContent;
			text.style.display = 'none';
		} else {
			editInput.style.display = 'none';
			text.style.display = 'inline-block';
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

	listItem.appendChild(checkbox);
	listItem.appendChild(text);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
};
