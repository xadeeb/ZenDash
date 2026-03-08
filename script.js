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
    list.innerHTML = tasks.map((t, index) => `
        <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px;">
            <span>${t}</span>
            <button onclick="deleteTask(${index})" style="background: #ff4d4d; color: white; border: none; border-radius: 5px; cursor: pointer; padding: 2px 8px;">×</button>
        </li>
    `).join('');
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('zenTasks', JSON.stringify(tasks));
    renderTasks();
}

async function getWeather() {
    const city = 'Moradabad'; // Aap apni city ka naam likh sakte hain
    try {
        // wttr.in ek open service hai jo bina key ke data deti hai
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await response.json();

        const current = data.current_condition[0];
        const temp = current.temp_C;
        const desc = current.weatherDesc[0].value;

        document.getElementById('weather').innerHTML = `
            <div style="font-size: 1.5rem; font-weight: bold;">${temp}°C</div>
            <p style="text-transform: capitalize;">${desc}</p>
            <small>${city}, India</small>
        `;
    } catch (error) {
        console.error("Weather error:", error);
        document.getElementById('weather').innerText = "Mausam ki malomat nahi mil saki.";
    }
}

getWeather();

// Initial Render
renderTasks();
updateClock();