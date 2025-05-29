let todos = [];

const todoInput = document.getElementById('todoInput');
const prioritySelect = document.getElementById('prioritySelect');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const stats = document.getElementById('stats');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: prioritySelect.value
    };

    todos.push(todo);
    todoInput.value = '';
    prioritySelect.value = 'normal';
    render();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    render();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

function clearCompleted() {
    if (todos.filter(t => t.completed).length === 0) {
        alert('완료된 할 일이 없습니다!');
        return;
    }
    if (confirm('완료된 할 일을 모두 삭제하시겠습니까?')) {
        todos = todos.filter(todo => !todo.completed);
        render();
    }
}

function clearAll() {
    if (todos.length === 0) {
        alert('삭제할 할 일이 없습니다!');
        return;
    }
    if (confirm('모든 할 일을 삭제하시겠습니까?')) {
        todos = [];
        render();
    }
}

function render() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    stats.textContent = `전체: ${total}개, 완료: ${completed}개`;

    if (todos.length === 0) {
        todoList.innerHTML = '<p style="text-align:center; color:#999;">할 일을 추가해보세요!</p>';
        return;
    }

    todoList.innerHTML = todos.map(todo => `
        <div class="todo-item ${todo.priority}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text ${todo.completed ? 'completed' : ''}">
                ${todo.priority === 'important' ? '⚠️ ' : ''}${todo.text}
            </span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
        </div>
    `).join('');
}

addBtn.addEventListener('click', addTodo);
clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTodo();
});

render();