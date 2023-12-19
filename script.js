document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
  });
  
  function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const categoryDropdown = document.getElementById('category-dropdown');
    const deadlineInput = document.getElementById('deadline-input');
    
    const todo = todoInput.value;
    const category = categoryDropdown.value;
    const deadline = deadlineInput.value || '';
    
    if (todo.trim() === '') {
      alert('Please enter a valid to-do');
      return;
    }
  
    const todoItem = {
      id: new Date().getTime(),
      todo,
      category,
      deadline,
    };
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todos));
  
    loadTodos();
    todoInput.value = '';
    deadlineInput.value = '';
  }
  
  function loadTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${todo.todo} - ${todo.category} - ${todo.deadline || 'No deadline'}</span>
        <span>
          <button onclick="editTodo(${todo.id})">Edit</button>
          <button onclick="deleteTodo(${todo.id})">Delete</button>
        </span>
      `;
      todoList.appendChild(li);
    });
  }
  
  function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
  }
  
  function editTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoToEdit = todos.find((todo) => todo.id === id);
  
    const todoInput = document.getElementById('todo-input');
    const categoryDropdown = document.getElementById('category-dropdown');
    const deadlineInput = document.getElementById('deadline-input');
  
    todoInput.value = todoToEdit.todo;
    categoryDropdown.value = todoToEdit.category;
    deadlineInput.value = todoToEdit.deadline || '';
  
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
  
    loadTodos();
  }
  