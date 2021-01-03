// Selectors

// Selects the input field of the form
const todoInput = document.querySelector('.todo-input');
// Selects the button within the form
const todoButton = document.querySelector('.todo-button');
// Selects the ul container
const todoList = document.querySelector('.todo-list');
// Selects the filter drop down list
const filterSelect = document.querySelector(".filter-select");

// Event Listener

// Listens to the event that gets fired up upon loading and parsing of the HTML
document.addEventListener("DOMContentLoaded", getLocalTodos);

// Listens to when a new todo item is added
todoButton.addEventListener('click', addTodo);

// Listens to when the todo item has been marked complete
todoList.addEventListener("click", completeCheck);

// Listens to when the todo item has been marked deleted
todoList.addEventListener("click", deleteCheck);

// Listens to when the mouse is hovered over the filter dropdown
filterSelect.addEventListener("mouseover", filterHoverOn);

// Listens to when the mouse is hovered away from the filter dropdown
filterSelect.addEventListener("mouseleave", filterHoverOff);

// Listens to when the filter dropdown is clicked upon
filterSelect.addEventListener("click", filterTodoClick);
// Functions

//Add new todo element by passing value from the input area
function addTodo(event) {
    // Prevents the default action performed by the form, i.e to submit
    event.preventDefault();

    // Create the todo element
    createTodo(todoInput.value);

    // Calls function to save the todo item to the local storage
    saveLocalTodos(todoInput.value);
    
    // Reset the input field
    todoInput.value = "";
}

// Creating new todo element to be appended to todo list container
function createTodo(value, completedState = false) {
    // Creating a div element
    const todoDiv = document.createElement('div');
    // Adding class to div element
    todoDiv.classList.add('todo');
    
    // Create a li element
    const newTodo = document.createElement('li');
    // Inserting temporary text inside the li element
    newTodo.innerText = value;
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
   
    // If the completion state of the todo item had been passed as true, 
    // set the state of the todo item as complete
    if(completedState === true) {
        todoDiv.classList.add("completed");
    }

    // Making the div container a child of the ul element with class name "todo-list"
    todoList.append(todoDiv);   
}

// Function that gets triggered upon deletion of a todo item
function deleteCheck(event) {
    const item = event.target;

    // Checks if it is the trash button that had been clicked on
    if(item.classList[0] == "trash-btn"){
        const itemParent = item.parentElement;
        
        // We retrieve the todo items stored previously on the local storage
        // and remove the item based on its location within the container
        // This is preferred over deleting based on value of the innerText
        // since there could be multiple todo items with the same innerText value
        let todoSaved = JSON.parse(localStorage.getItem("todos"));
        let todoCompletedSaved = JSON.parse(localStorage.getItem("completed"));
        let indexOfDeletedTodo = Array.from(itemParent.parentElement.children).indexOf(itemParent);

        todoSaved.splice(indexOfDeletedTodo, 1);
        todoCompletedSaved.splice(indexOfDeletedTodo, 1);
        localStorage.setItem("todos", JSON.stringify(todoSaved));
        localStorage.setItem("completed", JSON.stringify(todoCompletedSaved));

        // Apply the CSS transition
        itemParent.classList.add("fall");
        // Upon completion of the transition, remove the todo item
        itemParent.ontransitionend = () => {
            itemParent.remove();
        };
    }
    
}

// Function that gets triggered upon completion of a todo item
function completeCheck(event) {
    const item = event.target;

    // Confirms if the button clicked upon was the complete button
    if(item.classList[0] == "complete-btn"){
        const itemParent = item.parentElement;

        // Access the completed state of the todo item from the local storage
        // If the item was initally incomplete (default state), then change to completed
        // Else if the item was completed, then change to incomplete
        // Also, store the new state of the todo item to the local storage
        let todoCompletedSaved = JSON.parse(localStorage.getItem("completed"));
        let indexOfCompletedTodo = Array.from(itemParent.parentElement.children).indexOf(itemParent);

        if(!(itemParent.classList.contains("completed"))) {
            todoCompletedSaved[indexOfCompletedTodo] = true;

            localStorage.setItem("completed", JSON.stringify(todoCompletedSaved));
        } else {
            todoCompletedSaved[indexOfCompletedTodo] = false;

            localStorage.setItem("completed", JSON.stringify(todoCompletedSaved));
        }

        itemParent.classList.toggle("completed");
    }
}

// Styling of the custom dropdown button has been done via JS
// since we removed the pointer events for the button
// There isn't an easy way to activate a dropdown list upon 
// clicking the button, hence the pointer events has been removed

// Change the style of the custom dropdown button for the filter upon hovering
function filterHoverOn(event) {
    const item = event.target;

    const button = item.parentElement.children[1];

    button.style.color = "white";
    button.style.backgroundColor = "#d88771";
}

// Reset the style of the custom dropdown button for the filter after the pointer moving away from it
function filterHoverOff(event) {
    const item = event.target;

    const button = item.parentElement.children[1];

    button.style.color = "#d88771";
    button.style.backgroundColor = "white";
}

// Function is activated upon clicking the filter dropdown menu
function filterTodoClick(event) {
    const option = event.target.value;
    filterTodo(option);

    // Store the option selected to the local storage
    localStorage.setItem("filter", option);
}

// A separate function to implement filtering of the todo based on
// a value passed to it has been implemented since the code had to
// be reused upon refreshing the webpage (within getLocalTodos function)
function filterTodo(option) {
    const todos = Array.from(todoList.children);

    // Depending on the current selected option for the filter,
    // display the apropriate todo items
    todos.forEach(element => {
        switch(option) {
            case "all":
                element.style.display = "flex";
                break;
            case "completed":
                if(element.classList.contains("completed")) {
                    element.style.display = "flex";
                } else {
                    element.style.display = "none";
                }
                break;
            case "incomplete":
                if(!(element.classList.contains("completed"))) {
                    element.style.display = "flex";
                } else {
                    element.style.display = "none";
                }
                break;
        }
    });
}

// Saves the todo item text to the local storage
// Function is executed upon adding a new todo item
function saveLocalTodos(todo) {
    // Using JSON to store and access data since local storage accepts only strings
    // JSON enables conversion of our array of items into string and vice versa

    // Retreiving previously stored info from the lcoal storage
    // todoSaved is used to hold info pertaining to the textual info of the todo item
    let todoSaved = JSON.parse(localStorage.getItem("todos"));
    // todoCompletedSaved is used to hold info pertaining to the completed status of each todo item
    let todoCompletedSaved = JSON.parse(localStorage.getItem("completed"));

    // If there wasn't any stored todo item information before, then create a new array for storing
    if(todoSaved == null) {
       todoSaved = []; 
    }

    // If there wasn't any stored todo item completion status information, then create a new array for storing
    if(todoCompletedSaved == null) {
        todoCompletedSaved = [];
    }

    // Push the arrays into local storage
    // The default completion status of any new todo would be false, i.e incomplete
    // Hence the value pushed into the local storage is false
    todoSaved.push(todo);
    todoCompletedSaved.push(false);

    // Storing the new array with the info of the new todo item to local storage
    localStorage.setItem("todos", JSON.stringify(todoSaved));
    localStorage.setItem("completed", JSON.stringify(todoCompletedSaved));
}

// The function is used to retreive the stored values from the local storage
// and display it upon reloading of the site
function getLocalTodos() {

    // Retreiving previously stored info from the lcoal storage
    // todoSaved is used to hold info pertaining to the textual info of the todo item
    let todoSaved = JSON.parse(localStorage.getItem("todos"));
    // todoCompletedSaved is used to hold info pertaining to the completed status of each todo item
    let todoCompletedSaved = JSON.parse(localStorage.getItem("completed"));
   
    // If there wasn't any todo item, then initialize the array to have the information stored in
    if(todoSaved == null) {
        todos = [];
    } else {
        // For each todo item, create the todo element
        todoSaved.forEach(todo => {
            let indexOfTodo = todoSaved.indexOf(todo);
            
            // Pass the appropriate value of the completion status of the todo item
            if(todoCompletedSaved[indexOfTodo] === true) {
                createTodo(todo, true);
            } else {
                createTodo(todo);
            }
        })

        // Retreives the last selected filter option from the local storage
        let currentFilterOption = localStorage.getItem("filter");
    
        // Applies the filter option
        filterTodo(currentFilterOption);
    }

    // Display the filter value that was last selected in the dropdown list
    // The reason this is implemented outside out the above if else condition
    // is because the user could possibly have selected a filter even without having
    // any todo items and hence is applied regardless of a todo item present
    let filterOption = localStorage.getItem("filter");

    if(filterOption != null) {
        document.querySelector(`.filter-select [value="${filterOption}"]`).selected = true;
    }
}