const ical = require('node-ical');
const fs = require('fs');

async function syncCalendar() {
    const url = 'https://p142-caldav.icloud.com/published/2/MTA2ODI3NTEzNTEwNjgyN7zWTpMsNka4VN1cbltuJd7Li-7pUUxoFV9je2wqNKMSsaKYJcATd95Jvxs9b-WDuf1NbcnbUWdKrS77pPzAYKPQz1Mjk2ZeMDJ3uDSL3L9zY7UyYeiVRbuGTr-ZcrVJfw';
    
    try {
        const events = await ical.async.fromURL(url.replace('webcal://', 'https://'));
        const upcoming = [];
        const now = new Date();
        
        for (let k in events) {
            if (events[k].type === 'VEVENT') {
                const event = events[k];
                if (new Date(event.start) >= now) {
                    upcoming.push({
                        title: event.summary,
                        date: new Date(event.start).toLocaleString('en-US', { timeZone: 'EST' })
                    });
                }
            }
        }
        
        const data = JSON.parse(fs.readFileSync('mission-control/data.json', 'utf8'));
        data.calendarEvents = upcoming.sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, 10);
        fs.writeFileSync('mission-control/data.json', JSON.stringify(data, null, 2));
        console.log(`Synced ${upcoming.length} upcoming events.`);
    } catch (e) {
        console.error("Calendar Sync Error:", e.message);
    }
}

syncCalendar();
