export const taskElement = (todo, list) => {
	const listItem = document.createElement('li');

	const checkbox = document.createElement('input')
	checkbox.type = 'checkbox';
	const text = document.createElement('span');
	console.log(todo);
	text.textContent = todo.text;


	if (todo.done === true) {
		checkbox.checked = true
		text.classList.add('done')
	} else {
		checkbox.checked = false
		text.classList.remove('done')
	}

	checkbox.addEventListener('click', () => {
		if (todo.done === false) {
			todo.done = true
			checkbox.checked = true
			text.classList.add('done')
		} else {
			todo.done = false
			checkbox.checked = false
			text.classList.remove('done')
		}
	})


	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', () => {
		listItem.remove();
		list.dispatchEvent(new CustomEvent('delete', { bubbles: true, detail: todo.text, composed: true }));
	});

	listItem.appendChild(checkbox);
	listItem.appendChild(text);
	listItem.appendChild(deleteButton);

	return listItem
}
