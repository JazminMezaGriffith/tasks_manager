class Task {
    constructor(id, categories, taskTitle, description, dateFrom, dateTo) {
        this.id = id;
        this.categories = categories;
        this.taskTitle = taskTitle;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
class UI {
    addTask(task){
        const taskList = document.getElementById('tasks');
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="card">
            <h3>${task.taskTitle}</h3>
            <p><strong>Category: ${task.categories} </strong></p>
            <p><strong> Status: </strong> </p>
            <p>${task.description}</p>
            <p>Date: ${task.dateFrom} to ${task.dateFrom}</p>
            <div class="button-container">
                <button id="btn_edit">Edit <img src="images/pencil-square.svg" alt="Edit"></button>
                <button id="btn_delete" name="delete">Delete <img src="images/trash.svg" alt="Delete"></button>
            </div>
        </div>
            `;
            taskList.appendChild(element);
            formTask.reset();
      
    }
    deleteTask(element){
        if (element.name === 'delete'){
            element.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }


    showMessage(){

    }
}

//DOM Events
document.getElementById('formTask').addEventListener('submit', function(e){
    const id = Date.now();
    const categories = document.getElementById('categories').value;
    const taskTitle = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const task = new Task(id, categories, taskTitle, description, dateFrom, dateTo);

    const ui = new UI();
    ui.addTask(task);


    e.preventDefault();

    document.getElementById('tasks').addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteTask(e.target);
        
    });
});

