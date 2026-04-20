const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Inject Real Calendar Data from the grep earlier
data.calendarEvents = [
    { title: "Citibank 5k payment tomorrow", date: "Syncing..." },
    { title: "Appointment: Service at BMW of Raleigh", date: "Syncing..." },
    { title: "Dropoff X6", date: "Syncing..." },
    { title: "Alicia’s 50th Ibiza", date: "Syncing..." },
    { title: "The Armstrong Center for Hope", date: "Syncing..." }
];

// Ensure Financials are locked in
data.totalRevenue = "$21,780.22";
data.totalExpenses = "$8,647.88";
data.netProfit = "$13,132.34";

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
