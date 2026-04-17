// Mission Control Dashboard
let dashboardData = {};

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json?t=' + Date.now());
        dashboardData = await response.json();
        updateDashboard();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load dashboard data');
    }
}

// Update all dashboard elements
function updateDashboard() {
    updateWeather();
    updateTasks();
    updateGoals();
    updateBriefing();
    updateLastUpdated();
}

// Update weather display
function updateWeather() {
    const weatherEl = document.getElementById('weather-card');
    const briefingWeatherEl = document.getElementById('briefing-weather');
    
    const weatherHTML = `
        <div class="weather-display">
            <p><strong>${dashboardData.weather.temp}°F</strong></p>
            <p>${dashboardData.weather.condition}</p>
            <p class="muted">Humidity: ${dashboardData.weather.humidity}% | Wind: ${dashboardData.weather.wind} mph</p>
        </div>
    `;
    
    if (weatherEl) weatherEl.innerHTML = weatherHTML;
    if (briefingWeatherEl) briefingWeatherEl.innerHTML = weatherHTML;
}

// Update tasks display
function updateTasks() {
    const tasksCard = document.getElementById('tasks-card');
    const tasksList = document.getElementById('tasks-list');
    const briefingTasks = document.getElementById('briefing-tasks');
    
    const incompleteTasks = dashboardData.todaysTasks.filter(t => !t.completed);
    
    // Update overview card
    if (tasksCard) {
        const top3 = incompleteTasks.slice(0, 3);
        tasksCard.innerHTML = top3.length ? `
            <ol>
                ${top3.map(t => `<li>${t.title}</li>`).join('')}
            </ol>
        ` : '<p class="muted">No pending tasks</p>';
    }
    
    // Update full tasks list
    if (tasksList) {
        tasksList.innerHTML = dashboardData.todaysTasks.length ? `
            <ul>
                ${dashboardData.todaysTasks.map(t => `
                    <li class="${t.completed ? 'completed' : ''}">
                        <input type="checkbox" ${t.completed ? 'checked' : ''} disabled>
                        ${t.title} <span class="source">(${t.source})</span>
                    </li>
                `).join('')}
            </ul>
        ` : '<p class="muted">No tasks</p>';
    }
    
    // Update briefing tasks
    if (briefingTasks) {
        const top3 = incompleteTasks.slice(0, 3);
        briefingTasks.innerHTML = top3.length ? 
            top3.map(t => `<li>${t.title}</li>`).join('') :
            '<li>No pending tasks</li>';
    }
}

// Update goals display
function updateGoals() {
    const goalsCard = document.getElementById('goals-card');
    const goalsList = document.getElementById('goals-list');
    
    const activeGoals = dashboardData.goals.filter(g => g.status === 'active');
    
    // Update overview card
    if (goalsCard) {
        goalsCard.innerHTML = activeGoals.slice(0, 3).map(g => `
            <div class="goal-item">
                <p><strong>${g.title}</strong></p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${g.progress}%"></div>
                </div>
                <p class="muted">${g.progress}% complete</p>
            </div>
        `).join('');
    }
    
    // Update full goals list
    if (goalsList) {
        goalsList.innerHTML = dashboardData.goals.map(g => `
            <div class="goal-item">
                <h4>${g.title}</h4>
                <p class="muted">${g.description}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${g.progress}%"></div>
                </div>
                <p>${g.progress}% complete</p>
            </div>
        `).join('');
    }
}

// Update briefing tab
function updateBriefing() {
    const dateEl = document.getElementById('briefing-date');
    const calendarEl = document.getElementById('briefing-calendar');
    const contextEl = document.getElementById('briefing-context');
    
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    if (calendarEl) {
        calendarEl.innerHTML = dashboardData.calendarEvents.length ? `
            <ul>
                ${dashboardData.calendarEvents.map(e => `<li>${e.time} - ${e.title}</li>`).join('')}
            </ul>
        ` : '<p class="muted">No calendar events today</p>';
    }
    
    if (contextEl) {
        contextEl.innerHTML = `<p>${dashboardData.context}</p>`;
    }
}

// Update last updated timestamp
function updateLastUpdated() {
    const el = document.getElementById('last-updated');
    if (el && dashboardData.lastUpdated) {
        const date = new Date(dashboardData.lastUpdated);
        el.textContent = date.toLocaleString();
    }
}

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Show error message
function showError(message) {
    console.error(message);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // Refresh data every 5 minutes
    setInterval(loadData, 5 * 60 * 1000);
});
