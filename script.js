let taskList = [];

const objTask = {
    id: 0,
    categories: '',
    taskTitle: '',
    description: '',
    day:0,
    month:0,
    year:0,
    day2:0,
    month2:0,
    year2:0,
}
let editStatus = false;

const formTask = document.querySelector('#formTask');
const categories = document.querySelector('#categories');
const taskTitle = document.querySelector('#taskTitle');
const taskDescription = document.querySelector('#taskDescription');
const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const day2 = document.querySelector('#day2');
const month2 = document.querySelector('#month2');
const year2 = document.querySelector('#year2');
const btnSave = document.querySelector('#btnSave');

formTask.addEventListener('submit', validateForm);

function validateForm(e){
    e.preventDefault();
    if(categories.value ==='' || taskTitle.value == '' || taskDescription.value == '' || day.value == '' || month.value == '' || year.value == '' || day2.value == '' || month2.value == '' || year2.value == ''){
        alert('Please fill all the fields');
        return;
    }
    if(editStatus){
        updateTask();
        editStatus = false;
    }else{
        objTask.id = objTask.id + 1;
        objTask.categories = categories.value;
        objTask.taskTitle = taskTitle.value;
        objTask.description = taskDescription.value;
        objTask.day = day.value;
        objTask.month = month.value;
        objTask.year = year.value;
        objTask.day2 = day2.value;
        objTask.month2 = month2.value;
        objTask.year2 = year2.value;
        addTask();

    }
    formTask.reset();
}
function addTask(){
    taskList.push({...objTask});
    showTasks();
    formTask.reset();
}

function  showTasks(){
    cleanHtml();

    const taskContainer = document.querySelector('#tasks');
    taskList.forEach(task => {
        const {id, categories, taskTitle, description, day, month, year, day2, month2, year2} = task;
        const div = document.createElement('div');
        div.className = 'card';
      
        div.innerHTML = `
        <h3>${id} ${taskTitle}</h3>
        <p><strong>Category: ${categories} </strong></p>
        <p><strong> Status: </strong> </p>
        <p>${description}</p>
        <p>Date: ${day} / ${month}/ ${year} to ${day2} / ${month2}/ ${year2}</p>
        <div class="button-container">
            <button id="btn_edit"  name="edit">Edit <img src="images/pencil-square.svg" alt="Edit"></button>
            <button id="btn_delete" name="delete">Delete <img src="images/trash.svg" alt="Delete"></button>
        </div>
        `;
        taskContainer.appendChild(div);
        div.dataset.id = id;

        const btnDelete = document.getElementById('btn_delete');
        btnDelete.onclick = () => deleteTask(task);
        const btnEdit = document.getElementById('btn_edit');
        btnEdit.onclick = () => loadTask(task);
        
    });
}

document.getElementById('tasks').addEventListener('click', function (e) {
    const target = e.target;
    if (target.name === 'delete') {
        deleteTask(target.parentElement.parentElement);
    } else if (target.name === 'edit') {
        const taskId = target.parentElement.parentElement.dataset.id;
        const task = taskList.find(task => task.id === parseInt(taskId));
        loadTask(task);
    }
});

function deleteTask(taskElement) {
    const taskId = taskElement.dataset.id;
    taskList = taskList.filter(task => task.id !== parseInt(taskId));
    taskElement.remove();
}

function loadTask(task) {
    const { id, categories, taskTitle, description, dateFrom, dateTo } = task;
    categories.value = categories;
    taskTitle.value = taskTitle;
    taskDescription.value = description;  // Aquí debería ser taskDescription en lugar de description
    day.value = day;
    month.value = month;
    year.value = year;
    day2.value = day2;
    month2.value = month2;
    year2.value = year2;
    objTask.id = id;
    btnSave.textContent = 'Update';
    editStatus = true;
}
function cleanHtml(){
        const taskContainer = document.querySelector('#tasks');
        while(taskContainer.firstChild){
            taskContainer.removeChild(taskContainer.firstChild);
        }
}
function editTask() {
    objTask.categories = categories.value;
    objTask.taskTitle = taskTitle.value;
    objTask.description = taskDescription.value;
    objTask.day = day.value;
    objTask.month = month.value;
    objTask.year = year.value;
    objTask.day2 = day2.value;
    objTask.month2 = month2.value;
    objTask.year2 = year2.value;

    const index = taskList.findIndex(task => task.id === objTask.id);
    if (index !== -1) {
        taskList[index] = { ...objTask };
        updateTaskInUI(objTask);
        formTask.reset();
        btnSave.textContent = 'Save';
        editStatus = false;
    }
}
function updateTaskInUI(updatedTask) {
    const taskContainer = document.querySelector('#tasks');
    const existingTaskElement = taskContainer.querySelector(`div[data-id="${updatedTask.id}"]`);
    if (existingTaskElement) {
        existingTaskElement.innerHTML = `
            <h3>${updatedTask.id} ${updatedTask.taskTitle}</h3>
            <p><strong>Category: ${updatedTask.categories} </strong></p>
            <p><strong> Status: </strong> </p>
            <p>${updatedTask.description}</p>
            <p>Date: ${updatedTask.dateFrom} to ${updatedTask.dateTo}</p>
            <div class="button-container">
                <button id="btn_edit"  name="edit">Edit <img src="images/pencil-square.svg" alt="Edit"></button>
                <button id="btn_delete" name="delete">Delete <img src="images/trash.svg" alt="Delete"></button>
            </div>
        `;
    }
}



