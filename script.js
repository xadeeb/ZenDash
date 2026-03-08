// 1. Digital Clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// 2. LocalStorage Task List
let tasks = JSON.parse(localStorage.getItem('zenTasks')) || [];

function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value !== "") {
        tasks.push(input.value);
        localStorage.setItem('zenTasks', JSON.stringify(tasks));
        input.value = "";
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = tasks.map(t => `<li>${t}</li>`).join('');
}

// Initial Render
renderTasks();
updateClock();