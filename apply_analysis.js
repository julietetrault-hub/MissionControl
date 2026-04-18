const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Use non-regex replacement for safety
const revenueTag = '<div class="amount" style="color: var(--success);">$21,780.22</div>';
const newRevenue = '<div class="amount" style="color: var(--success);">$24,600.28</div>';
html = html.replace(revenueTag, newRevenue);

const expenseTag = '<div class="amount" style="color: var(--danger);">$8,647.88</div>';
const newExpense = '<div class="amount" style="color: var(--danger);">$11,987.46</div>';
html = html.replace(expenseTag, newExpense);

const netTag = '<div class="amount" style="color: var(--primary);">$13,132.34</div>';
const newNet = '<div class="amount" style="color: var(--primary);">$12,612.82</div>';
html = html.replace(netTag, newNet);

// Timestamp update
const timeTag = 'APR 18, 2026 - 01:17 UTC';
const now = new Date();
const timestamp = now.toUTCString().replace('GMT', 'UTC').toUpperCase().split(' ').slice(1, 5).join(' ');
html = html.replace(timeTag, timestamp);

fs.writeFileSync(indexFile, html);
console.log('✅ Dashboard updated.');
