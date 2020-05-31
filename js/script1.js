/*  The JavaScript file implements the functionality for the todo app.
    
    Here is what we want to happen:

    1. The user type in a task into the text box
    2. Then they hit the "add Task" button
    3. This trigger an event
    4. We add the value in the text box to the list of tasks
    5. Clear the input text box
    
    To "add" new task, requires us to manipulate the DOM tree
    In this case insert a new list item.
    
    DOM manipulation is usually triggered by an event, here is the basic pattern
    to link everything all together. 
      * Step 0 - add id, class attributes in HTML
      * Step 1 - locate id, class, selector in HTML and assign a JavaScript 
                 variable to the DOM  element.  We will manipulate the DOM 
                 through the JavaScript variable. 
      * Step 2 - write a function to handle the event 
      * Step 3 - connect the variable and the function via the 
                 event listener so a 'event' triggers the execution
                 of our function and we update the DOM

    This pattern is very common with 'professional' developers, in part because
    you can add multiple events to the same variable.  It also assists with 
    'separation of concerns' so we don't see 'onclick' attributes or JavaScript 
    within the HTML tag.

    Professional developers tend to use more modern syntax suchs as anonymous 
    function and the arrow function syntax (similar to what we did in flatland).
    But understanding the syntax is less important that having exposure to the pattern!

    For ISYS3004 Business Web Technologies you can do well with just the using 
    the 'onclick=' (or any other event) in the HTML tag, but I do think it is 
    important that you have some exposure to the 'right' way.  At the very least
    you will be able to read code in forums perhaps even be able to answer job 
    interview questions!
*/


/*  Step 1: locate DOM element and assign to a JavaScript variable
    --------------------------------------------------------------

    Here is a table overview of five methods you can use to access elements in 
    the DOM. The two most common are getElementById() and querySelector()

    |---------|------------------| -------------------------| ----------------|       
    |Gets     |Selector Syntax   |     Method               |     Returns     |
    |         | (used in CSS)    |                          |                 |
    |---------|------------------| -------------------------| ----------------|       
    |ID       | #example         | getElementById()         | single value    |
    |Class    | .example         | getElementsByClassName() | array of values |
    |Tag      | section          | getElementsByTagName()   | array of values |
    |Selector | .section.h1      | querySelector()          | first match     |
    |Selector | .section.h1      | querySelectorAll()       | all matches     |
    |---------|------------------| -------------------------| ----------------| */ 
let addTaskButton = document.getElementById("add-task");
let newTaskInput = document.getElementById("task-input");
let todoListContainer = document.getElementById("todo-list");


function saveTask(name, isCompleted) {
    localStorage.setItem(name, isCompleted);    //Every time to add task, can save it
}


/* We have chosen to use a template in our HTML.  So this time we need two
   steps, locate the parent of the template (the <script> tag then get the
   contents (innerHTML) which is our template.

   By encapsulating the HTML within a script tag we can reference it from our
   javascript without needing a big string (lots of quoting and adding bits of
   stings together to build a big string).  We experienced string building in
   Flatland when we built the buzzword phrase.

   Another reason to use templates, is 'separation of concerns'.  We want all
   HTML in the html file.  If we use string-building, the some of the layout is
   not hidden in the JavaScript file.

   We've actually just implemented an extremely minimalistic templating language
   to aid our todolist. This is VERY similar concept to how the modern front end
   frameworks (Vue, Reach, Angular etc) using templates.

   So instead of just adding text to our container, we're adding a big chunk of
   HTML (the template).*/

/* Locate where <script> tag which contains our template  */
let templateElement = document.getElementById("list-item-template");
/* Lets get the template, which is just all the HTML beteen the <script> tag */
let template = templateElement.innerHTML;

/* So we have now found everything in the HTML document, now we just need to
write the function to insert the new task into the DOm tree and link it so when
the click even on the 'Add Task" button activate our function will execute */




/* Step 2. Lets write the function to handle the 'click' event
---------------------------------------------------------------*/
function onAddTaskClicked(event) {
    /* We don't need any information about what triggered the event
    so we can ignore the 'event' parameter.
      
    Now lets get what was typed in the text box on the form*/
    let taskName = newTaskInput.value;
    /* Now clear the text box */
    newTaskInput.value = "";

    /* We have a new 'task', lets insert this into our template. In our template
    we included a "string".  We used a HTML comment so the browser would show
    (render) the string.  The idea is to search for this string in the templae
    and replace it with the 'task' the user typed in.  JavaScript like most
    languages has a string replace function, so this is pretty easy to do. */
    if (taskName != "") {
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
        /* So the HTML has been update, lets insert the HTML into the DOM tree */
        todoListContainer.insertAdjacentHTML('beforeend', taskHTML);

        saveTask(taskName, false)   //Not checked
    }
    
}


/* It would be be nice if instead of just having a tick-mark next to each task
when it was completed we could also strike-through the text. 

While it isn't good practice to style elements from JavaScript, it's perfectly
acceptable to add appropriate classes. So let's try that out now.

Up to now the JavaScript has been fairly easy to understand.  The following can
be a little confusing but we are trying to handle the case where a user may on
the task, or make click the text box. */
function onTodolistClicked(event) {
    /* We need to know which element triggered the click event */
    let targetElement = event.target;

    while (!targetElement.classList.contains("task")) {
        targetElement = targetElement.parentElement;
    }

    let checkbox = targetElement.querySelector(".checkbox");


    if (checkbox.checked) {
        targetElement.classList.add("completed");
    } else {
        targetElement.classList.remove("completed");
    }

    let taskNameElement = targetElement.querySelector(".task");
    let taskName = taskNameElement.innerText;

    saveTask(taskName, checkbox.checked)    //Change state
}


/* Step 3 make the event trigger our functions
-----------------------------------------------*/ 
addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodolistClicked);

// on load, read from the local storage
function renderTasks() {
    for (let i=0; i<localStorage.length; i++) {
        let taskName = localStorage.key(i);
        let isCompleted = localStorage.getItem(taskName) == "true";
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        if (!isCompleted) {
            todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
        }
    }
}

// Step 0. In the HTML, I need to assign a class or id to the HTML-tag

// Step 1. Locate DOM elements
let showActiveButton = document.getElementById("show-active")

// Step 2. Write function to handle the behaviour
function showActiveTasks() {
    let tasks = document.getElementsByClassName("task")
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "none";
        } else {
            tasks[i].style.display = "block";
        }
    }
}
// Step 3. Link the JS varibale to the behaviour
showActiveButton.addEventListener('click', showActiveTasks)

// Step 1
let showCompletedButton = document.getElementById("show-completed")

// Step 2
function showCompletedTasks() {
    let tasks = document.getElementsByClassName("task")
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "blcok";
        } else {
            tasks[i].style.display = "none";
        }
    }
}

// Step 3. Link the JS varibale to the behaviour
showCompletedButton.addEventListener('click', showCompletedTasks);


// Step 1
let showAllButton = document.getElementById("show-all")

// Step 2
function showAllTasks(event) {
    let tasks = document.getElementsByClassName("task")
    for (let i = 0; i <tasks.length; i++) {
        tasks[i].style.display = "block";
    }
}

// Step 3
showAllButton.addEventListener('click', showAllTasks);

renderTasks();  //eventhandler for load tasks from local storage