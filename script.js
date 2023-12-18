function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);

    if (section) {
        var headerHeight = document.querySelector("header").offsetHeight; // Altura del header
        var sectionTop = section.offsetTop - headerHeight - 30; // Calcula la posición ajustada

        window.scrollTo({
            top: sectionTop,
            behavior: "smooth",
        });
    }
}
window.onload = function () {
    window.scrollTo(0, 0);
};


document.addEventListener('DOMContentLoaded', function () {
    readData();
});


function validateForm() {
    let categories = document.getElementById("categories").value;
    let taskTitle = document.getElementById("taskTitle").value;
    let taskDescription = document.getElementById("taskDescription").value;
    let stat = document.getElementById("status").value;
    let priority = document.getElementById("priority").value;
    console.log({ categories, taskTitle, taskDescription, stat, priority });

    if (categories == "" || taskTitle == "" || taskDescription == "" || priority == "" || stat == "") {
        alert("Please fill all the fields");
        return false;
    } else {
        return true;
    }
}
function readData() {
    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    displayTasks(taskList); // Mostrar todas las tareas

    if (localStorage.getItem('taskList') == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem('taskList'));
    }
    var html = "";
    taskList.forEach(function (element, index) {
        html += "<div class='card " + element.stat.toLowerCase() + " " + element.priority.toLowerCase() + "'>";
        html += "<div class='content'>";
        html += "<span class='title'>" + element.taskTitle + "</span>";
        html += "<div class='info'>";
        html += "<p><strong>Category: " + element.categories + "</strong></p>";
        html += "<p><strong> Status: " + element.stat + "</strong></p>";
        html += "</div>";
        html += "<p>" + element.description + "</p>";
        html += "<em>Priority: " + element.priority + "</em>";
        html += "<div class='button-container'>";
        html += "<button class='btn' id='btn_edit' onclick='editTask(" + index + ")'  name='edit'>Edit</button>";
        html += "<button class='btn' id='btn_delete' onclick='deleteTask(" + index + ")' name='delete'>Delete</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";


    });
    document.querySelector("#tasks").innerHTML = html;
    document.addEventListener('DOMContentLoaded', function () {
        readData();
    });
}



function addTask() {
    if (validateForm() == true) {
        let categories = document.getElementById("categories").value;
        let taskTitle = document.getElementById("taskTitle").value;
        let taskDescription = document.getElementById("taskDescription").value;
        let stat = document.getElementById("status").value; // Asegúrate de que el ID coincida
        let priority = document.getElementById("priority").value;

        let taskList;

        if (localStorage.getItem("taskList") == null) {
            taskList = [];
        } else {
            taskList = JSON.parse(localStorage.getItem("taskList"));
        }

        taskList.push({
            categories: categories,
            taskTitle: taskTitle,
            description: taskDescription,
            stat: stat,
            priority: priority
        });

        localStorage.setItem("taskList", JSON.stringify(taskList));
        readData();
        document.getElementById("formTask").reset();
    }
}
function deleteTask(index) {
    let taskList;
    if (localStorage.getItem("taskList") == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }
    taskList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    readData();

}
function editTask(index) {
    scrollToSection('formTask');
    document.getElementById("formTitle").textContent = "Edit task";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
    let taskList;

    if (localStorage.getItem("taskList") == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }

    document.getElementById("categories").value = taskList[index].categories;
    document.getElementById("taskTitle").value = taskList[index].taskTitle;
    document.getElementById("taskDescription").value = taskList[index].description;
    document.getElementById("status").value = taskList[index].stat;
    document.getElementById("priority").value = taskList[index].priority;

    document.querySelector('#btnUpdate').onclick = function () {
        if (validateForm() == true) {
            taskList[index].categories = document.getElementById("categories").value;
            taskList[index].taskTitle = document.getElementById("taskTitle").value;
            taskList[index].description = document.getElementById("taskDescription").value;
            taskList[index].stat = document.getElementById("status").value;
            taskList[index].priority = document.getElementById("priority").value;

            localStorage.setItem("taskList", JSON.stringify(taskList));
            document.getElementById("categories").value = "";
            document.getElementById("taskTitle").value = "";
            document.getElementById("taskDescription").value = "";
            document.getElementById("status").value = "";
            document.getElementById("priority").value = "";

            document.getElementById("formTitle").textContent = "Add a new task";
            document.getElementById("btnAdd").style.display = "block";
            document.getElementById("btnUpdate").style.display = "none";
            readData();
        };
    }
}
function filterTasks(category) {
    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    let tasksToShow;

    if (category === "all") {
        // Si la categoría es 'all', muestra todas las tareas.
        tasksToShow = taskList;
    } else {
        // De lo contrario, filtra las tareas por la categoría seleccionada.
        tasksToShow = taskList.filter(task => task.categories === category);
    }

    displayTasks(tasksToShow); // Función para mostrar las tareas filtradas o todas las tareas
}


function displayTasks(tasks) {
    var html = "";
    tasks.forEach(function (element, index) {
        html += "<div class='card " + element.stat.toLowerCase() + " " + element.priority.toLowerCase() + "'>";
        html += "<div class='content'>";
        html += "<span class='title'>" + element.taskTitle + "</span>";
        html += "<div class='info'>";
        html += "<p><strong>Category: " + element.categories + "</strong></p>";
        html += "<p><strong>Status: " + element.stat + "</strong></p>";
        html += "</div>";
        html += "<p>" + element.description + "</p>";
        html += "<em>Priority: " + element.priority + "</em>";
        html += "<div class='button-container'>";
        html += "<button class='btn' id='btn_edit' onclick='editTask(" + index + ")'  name='edit'>Edit</button>";
        html += "<button class='btn' id='btn_delete' onclick='deleteTask(" + index + ")' name='delete'>Delete</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
    });
    document.querySelector("#tasks").innerHTML = html;
}

document.querySelectorAll('.btn_filter').forEach(button => {
    button.addEventListener('click', function () {
        filterTasks(this.getAttribute('data-category'));
    });
});
