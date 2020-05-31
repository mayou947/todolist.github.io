// 1. locate DOM element and assign to a JavaScript variable
let addTaskButton = document.getElementById("add-task");
let newTaskInput = document.getElementById("task-input");
let todoListContainer = document.getElementById("todo-list");

// Save tasks in the loacl storage
function saveTask(name, isCompleted) {
    // Store value 'isCompleted' as key 'name'
    localStorage.setItem(name, isCompleted);        //Every time to add task, can save it
}

// 1-1. Find the template
let templateElement = document.getElementById("list-item-template");
let template = templateElement.innerHTML;


// 2. Write function (Event-handler) to handle the 'click' event
// 2-1. Function when Click 'Add Task' button
function onAddTaskClicked(event) {
    // 2-1-1. Get what was typed in the text box on the form
    let taskName = newTaskInput.value;  //Declear variable named 'taskName' to store the value of newTaskInput
    
    // 2-1-2. Update template as long and the input is not empty
    if (taskName != "") {
        
        // Update template
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
        // Add to list: Insert HTML into DOM tree to update HTML
        todoListContainer.insertAdjacentHTML('beforeend', taskHTML);

        saveTask(taskName, false)   //Not checked ?????
    }
    
    // 2-1-3. Clear the input box
    newTaskInput.value = "";            // clear the text box
}

// 2-2. Function when Click 'Checkbox' to tick
function onTodolistClicked(event) {
    // 2-2-1. Match element triggered and ckick event
    let targetElement = event.target;

    // 2-2-2. Return a Boolean value, indicating whether an element has 'task' (specified class name)
    while (!targetElement.classList.contains("task")) {     //"Does targetElement contain 'task' class?"
        targetElement = targetElement.parentElement;        //"If so, execute"
    }
    
    // 2-2-3. Return the first element that matches '.ckeckbox' (specified CSS selector)
    let checkbox = targetElement.querySelector(".checkbox");

    // 2-2-4. Add/Remove class name to element
    if (checkbox.checked) {
        targetElement.classList.add("completed");
    } else {
        targetElement.classList.remove("completed");
    }

    // 2-2-5. Return the first element that matches '.task-name'
    let taskNameElement = targetElement.querySelector(".task-name");
    let taskName = taskNameElement.innerText;   //Save the returned value in 'taskName'

    saveTask(taskName, checkbox.checked)    // Change state
}


// 3. Make the event trigger to functions
addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodolistClicked);


/*----------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------*/


// On load, Read from the local storage
function renderTasks() {
    for (let i=0; i<localStorage.length; i++) {
        // Return key name with the specified index (i)
        let taskName = localStorage.key(i);
        let isCompleted = localStorage.getItem(taskName) == "true";
        // Update template
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        if (!isCompleted) {
            // Insert HTML into DOM tree to update HTML
            todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
        }
    }
}


/*----------------------------------------------------------------------------------
0. In the HTML, Assign a class or id to the HTML-tag
1. Locate the element
2. Write a fuction to handle the event
3. Add event listener 
----------------------------------------------------------------------------------*/

// 1. Active button
// 1-1. Locate DOM elements
let showActiveButton = document.getElementById("show-active")

// 1-2. Write function to handle the behaviour
function showActiveTasks() {
    // 1-2-1. Take all element in 'task' class (List of tasks)
    let tasks = document.getElementsByClassName("task")

    // 1-2-2. For Loop
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].classList.contains("completed")){      // If nth task's class name contain "completed"
            tasks[i].style.display = "none";                // Set the task's style as 'none' (Do not display if it's completed)
        } else {
            tasks[i].style.display = "block";               // Set the task's style 'block'
        }
    }
}

// 1-3. Link the JS varibale to the behaviour
showActiveButton.addEventListener('click', showActiveTasks)

// 2. Completed button
// 2-1.
let showCompletedButton = document.getElementById("show-completed")

// 2-2.
function showCompletedTasks() {
    let tasks = document.getElementsByClassName("task")
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "block";               // Display if it's completed
        } else {
            tasks[i].style.display = "none";
        }
    }
}

// 2-3.
showCompletedButton.addEventListener('click', showCompletedTasks);

// 3. All button
// 3-1.
let showAllButton = document.getElementById("show-all")

// 3-2.
function showAllTasks() {
    let tasks = document.getElementsByClassName("task")
    for (let i = 0; i <tasks.length; i++) {
        tasks[i].style.display = "block";
    }
}

// 3-3.
showAllButton.addEventListener('click', showAllTasks);
// Event-handler to load tasks from local storage
renderTasks();


/*----------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------*/
// Trigger the same action as a button-click when user presss the enter key

// 2. Write a function to handle the event
function enterToButton(event){
    if (event.keyCode === 13) {     // Number 13 is the "Enter" key on the keyboad
        event.preventDefault();     // Cancel the default action, which is clear the input box and lose point 
        addTaskButton.click();      // Trigger the button element with a click
    }
}

// 3. Add event listener
newTaskInput.addEventListener("keydown", enterToButton);