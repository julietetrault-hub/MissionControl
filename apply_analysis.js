const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Manual search and replace for amounts
const updateAmount = (label, newValue) => {
    const findLabel = label + '</h4>';
    const startIdx = html.indexOf('<div class="amount"', html.indexOf(findLabel));
    const contentStart = html.indexOf('>', startIdx) + 1;
    const contentEnd = html.indexOf('</div>', contentStart);
    html = html.substring(0, contentStart) + newValue + html.substring(contentEnd);
};

updateAmount('Total Revenue', '$135,842.12');
updateAmount('Total Expenses', '$115,463.95');
updateAmount('Net Profit', '$20,378.17');

// Activity List - Clean and Simple
const activityHtml = `
<div class="event-item"><span>NCJUA Insurance Payment</span> <span class="amount" style="font-size: 14px; color: var(--danger);">$1,445.98</span></div>
<div class="event-item"><span>Safelite Auto Glass (Credit)</span> <span class="amount" style="font-size: 14px; color: var(--success);">$1,319.12</span></div>
<div class="event-item"><span>Delta Air Lines - Turnbull</span> <span class="amount" style="font-size: 14px; color: var(--danger);">$408.95</span></div>
<div class="event-item"><span>H&R Block Tax Prep</span> <span class="amount" style="font-size: 14px; color: var(--danger);">$397.00</span></div>
<div class="event-item"><span>Duke Energy Payment</span> <span class="amount" style="font-size: 14px; color: var(--danger);">$441.21</span></div>
<div class="event-item"><span>City of Raleigh Utility</span> <span class="amount" style="font-size: 14px; color: var(--danger);">$227.05</span></div>
`;

const sumStart = html.indexOf('<div id="pnl-summary">') + 22;
const sumEnd = html.indexOf('</div>', sumStart);
html = html.substring(0, sumStart) + activityHtml + html.substring(sumEnd);

// Timestamp
const now = new Date();
const timestamp = now.toUTCString().replace('GMT', 'UTC').toUpperCase().split(' ').slice(1, 5).join(' ');
const timeStart = html.indexOf('bold; margin: 0;">') + 18;
const timeEnd = html.indexOf('</p>', timeStart);
html = html.substring(0, timeStart) + timestamp + html.substring(timeEnd);

fs.writeFileSync(indexFile, html);
console.log('✅ Dashboard updated.');
