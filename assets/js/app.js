import { storage } from './storage.js';
import { getWeatherData } from './api.js';

let tasks = storage.get();

// 1. Clock Logic
const initClock = () => {
    const update = () => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    };
    setInterval(update, 1000);
    update();
};

// 2. Task Logic
const renderTasks = () => {
    const list = document.getElementById('taskList');
    list.innerHTML = tasks.map((t, i) => `
        <li class="task-item">
            <span>${t}</span>
            <button class="delete-btn" data-index="${i}">×</button>
        </li>
    `).join('');

    // Attach listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => {
            tasks.splice(btn.dataset.index, 1);
            storage.save(tasks);
            renderTasks();
        };
    });
};

document.getElementById('addBtn').onclick = () => {
    const input = document.getElementById('taskInput');
    if(input.value.trim()) {
        tasks.push(input.value.trim());
        storage.save(tasks);
        input.value = '';
        renderTasks();
    }
};

// 3. Init App
document.addEventListener('DOMContentLoaded', async () => {
    initClock();
    renderTasks();
    const weather = await getWeatherData();
    if(weather) {
        document.getElementById('weather').innerText = `${weather.temp}°C | ${weather.desc}`;
    }
});