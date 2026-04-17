// Morning Briefing Generator
// This script generates the morning briefing and updates data.json

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const LOCATION = '27614';

async function generateBriefing() {
    try {
        // Read current data
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        // Get weather (using wttr.in)
        const weather = await fetchWeather();
        
        // Get top 3 tasks
        const topTasks = data.todaysTasks
            .filter(t => !t.completed)
            .slice(0, 3);
        
        // Update data
        data.weather = weather;
        data.lastUpdated = new Date().toISOString();
        
        // Save updated data
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        
        // Generate briefing text for Telegram
        const briefingText = generateTelegramBriefing(weather, topTasks, data.calendarEvents);
        
        console.log('Morning briefing generated successfully');
        console.log(briefingText);
        
        return briefingText;
    } catch (error) {
        console.error('Error generating briefing:', error);
        throw error;
    }
}

async function fetchWeather() {
    // For now, return placeholder - will integrate with weather skill
    return {
        temp: '72',
        condition: 'Partly Cloudy',
        humidity: '65',
        wind: '8'
    };
}

function generateTelegramBriefing(weather, tasks, calendarEvents) {
    const date = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });
    
    let briefing = `🌅 **Good Morning Joules!**\n\n`;
    briefing += `📅 ${date}\n\n`;
    
    briefing += `🌤️ **Weather for 27614**\n`;
    briefing += `${weather.temp}°F - ${weather.condition}\n`;
    briefing += `Humidity: ${weather.humidity}% | Wind: ${weather.wind} mph\n\n`;
    
    briefing += `📋 **Today's 3 Most Important Tasks**\n`;
    if (tasks.length > 0) {
        tasks.forEach((task, index) => {
            briefing += `${index + 1}. ${task.title}\n`;
        });
    } else {
        briefing += 'No pending tasks for today!\n';
    }
    briefing += '\n';
    
    if (calendarEvents.length > 0) {
        briefing += `📅 **Calendar Events**\n`;
        calendarEvents.forEach(event => {
            briefing += `• ${event.time} - ${event.title}\n`;
        });
        briefing += '\n';
    }
    
    briefing += `🧜‍♀️ **Nerissa's Note**\n`;
    briefing += `Focus on what moves the needle today. You've got this!\n\n`;
    briefing += `View full dashboard: https://julietetrault-hub.github.io/mission-control/`;
    
    return briefing;
}

// Run if called directly
if (require.main === module) {
    generateBriefing();
}

module.exports = { generateBriefing };
