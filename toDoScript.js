
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskContainer = document.getElementById("taskContainer");
const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");


addBtn.addEventListener("click", addTask);
filterAll.addEventListener("click", function () {
    filterTasks("all");
});

filterActive.addEventListener("click", function () {
    filterTasks("active");
});

filterCompleted.addEventListener("click", function () {
    filterTasks("completed");
});


taskContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains("toggle-btn")){
        const taskElement = event.target.parentElement;
        toggleTaskStatus(taskElement);
    }
    if(event.target.classList.contains("delete-btn")){
        const taskElement = event.target.parentElement;
        deleteTask(taskElement);
    }

});


function addTask(){
    const task = taskInput.value.trim();
    if(task === ""){
        alert("Please enter a task.");
        return;
    }
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    const taskText = document.createElement("span");
    taskText.textContent = task;
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "✓";
    toggleBtn.className = "toggle-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✗";
    deleteBtn.className = "delete-btn";

    taskItem.appendChild(taskText);
    taskItem.appendChild(toggleBtn);
    taskItem.appendChild(deleteBtn);

    taskContainer.appendChild(taskItem);
    taskInput.value = "";
}
function toggleTaskStatus(taskElement){
    taskElement.classList.toggle("completed");
}
function deleteTask(taskElement){
    taskElement.remove();
}
function filterTasks(filterType){

    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(function(task){
        if(filterType === "all"){
            task.style.display = "flex";
        }
        else if(filterType === "active"){

            if(task.classList.contains("completed")){
                task.style.display = "none";
            }
            else{
                task.style.display = "flex";
            }

        }
        else if(filterType === "completed"){

            if(task.classList.contains("completed")){
                task.style.display = "flex";
            }
            else{
                task.style.display = "none";
            }

        }
    });
}