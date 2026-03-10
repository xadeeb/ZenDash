import { fetchWeatherData } from './api.js';
import { storage } from './storage.js';

let tasks = storage.get();

// Core UI Updates
const updateUI = () => {
    const list = document.getElementById('taskList');
    list.innerHTML = tasks.map((t, i) => `
        <li class="task-item">
            <span>${t}</span>
            <button class="btn-delete" data-index="${i}">×</button>
        </li>
    `).join('');
    
    // Event listeners for delete
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.onclick = (e) => deleteTask(e.target.dataset.index);
    });
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    storage.save(tasks);
    updateUI();
};

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    updateUI();
    const weather = await fetchWeatherData('Moradabad');
    if (weather) {
        document.getElementById('weather').innerText = `${weather.temp}°C - ${weather.desc}`;
    }
});