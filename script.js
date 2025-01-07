const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const emptyMessage = document.getElementById('emptyMessage');

let todos = [];

function updateEmptyMessage() {
    emptyMessage.style.display = todos.length === 0 ? 'block' : 'none';
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="delete-button">Delete</button>
            `;

    const checkbox = li.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        li.querySelector('.todo-text').classList.toggle('completed', todo.completed);
        saveTodos();
    });

    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== todo.id);
        li.remove();
        updateEmptyMessage();
        saveTodos();
    });

    return li;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        todos.forEach(todo => {
            todoList.appendChild(createTodoElement(todo));
        });
        updateEmptyMessage();
    }
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoText = todoInput.value.trim();
    if (!todoText) return;

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todo);
    todoList.appendChild(createTodoElement(todo));
    saveTodos();
    updateEmptyMessage();

    todoInput.value = '';
    todoInput.focus();
});

loadTodos();