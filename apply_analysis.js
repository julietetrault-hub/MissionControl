const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Manual string search and replace to avoid regex issues
const findRev = 'Total Revenue</h4>';
const nextRev = html.indexOf('<div class="amount"', html.indexOf(findRev));
const endRev = html.indexOf('</div>', nextRev);
html = html.substring(0, nextRev) + '<div class="amount" style="color: var(--success);">$106,711.98' + html.substring(endRev);

const findExp = 'Total Expenses</h4>';
const nextExp = html.indexOf('<div class="amount"', html.indexOf(findExp));
const endExp = html.indexOf('</div>', nextExp);
html = html.substring(0, nextExp) + '<div class="amount" style="color: var(--danger);">$91,378.82' + html.substring(endExp);

const findNet = 'Net Profit</h4>';
const nextNet = html.indexOf('<div class="amount"', html.indexOf(findNet));
const endNet = html.indexOf('</div>', nextNet);
html = html.substring(0, nextNet) + '<div class="amount" style="color: var(--primary);">$15,333.16' + html.substring(endNet);

// Timestamp
const now = new Date();
const timestamp = now.toUTCString().replace('GMT', 'UTC').toUpperCase().split(' ').slice(1, 5).join(' ');
const findTime = 'Last Updated:</p>';
const nextTime = html.indexOf('bold; margin: 0;">', html.indexOf(findTime)) + 18;
const endTime = html.indexOf('</p>', nextTime);
html = html.substring(0, nextTime) + timestamp + html.substring(endTime);

fs.writeFileSync(indexFile, html);
console.log('✅ Dashboard updated.');
