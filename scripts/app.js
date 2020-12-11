// Selectors

// Selects the input field of the form
const todoInput = document.querySelector('.todo-input');
// Selects the button within the form
const todoButton = document.querySelector('.todo-button');
// Selects the ul container
const todoList = document.querySelector('.todo-list');

// Event Listener

// Event listener for the button in order to call function addTodo upon clicking it
todoButton.addEventListener('click', addTodo);

// Functions

//Function to add a todo itemby inserting the appropriate HTML
function addTodo(event) {
    // Prevents the default action performed by the form, i.e to submit
    event.preventDefault();

    // Creating a div element
    const todoDiv = document.createElement('div');
    // Adding class to div element
    todoDiv.classList.add('todo');
    
    // Create a li element
    const newTodo = document.createElement('li');
    // Inserting temporary text inside the li element
    newTodo.innerText = todoInput.value;
    // Adding class to li element
    newTodo.classList.add("todo-item");
    // Making the li element a child of the above div container
    todoDiv.append(newTodo);

    // Create a button
    const completedButton = document.createElement('button');
    // Adding font-awesome check mark icon inside the button
    completedButton.insertAdjacentHTML('afterbegin', '<i class="fas fa-check"></i>');
    // Adding class to the button
    completedButton.classList.add('complete-btn');
    // Making the button a child of the above div container
    todoDiv.append(completedButton);

    // Create a button
    const deleteButton = document.createElement('button');
    // Adding font-awesome check mark icon inside the button
    deleteButton.insertAdjacentHTML('afterbegin', '<i class="fas fa-trash"></i>');
    // Adding class to the button
    deleteButton.classList.add('trash-btn');
    // Making the button a child of the above div container
    todoDiv.append(deleteButton);

    // Making the div container a child of the ul element with class name "todo-list"
    todoList.append(todoDiv);

    // Reset the input field
    todoInput.value = "";
}