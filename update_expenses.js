const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

const expenseMetrics = `
<div class="section" id="expense-metrics">
    <h3>Top 5 Expense Optimization Metrics</h3>
    <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 16px;">
            <strong>1. Debt Service Concentration: ~65% of Outflow</strong><br>
            <small style="color: var(--text-muted);">The majority of "expenses" are actually vehicle financing payments. Consolidating or refinancing these as the fleet matures could significantly boost monthly liquidity.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>2. High-Frequency Maintenance Leakage</strong><br>
            <small style="color: var(--text-muted);">Tesla Supercharging and small-ticket items (Sheetz, Walgreens) add up. Standardizing charging locations or using business-only fuel cards could capture more tax-deductible data.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>3. Utility Volatility (Duke Energy)</strong><br>
            <small style="color: var(--text-muted);">Energy costs fluctuate significantly ($243 vs $441). Implementing smart-charging schedules during off-peak hours could shave 10-15% off fleet charging overhead.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>4. Uncategorized "Cash Out" Efficiency</strong><br>
            <small style="color: var(--text-muted);">A significant portion of expenses are bulk mobile payments. Breaking these down into specific vehicle IDs in the next sync will help identify which cars are "expense-heavy" versus "low-maintenance."</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>5. Reinvestment vs. Burn Ratio: 1.18x</strong><br>
            <small style="color: var(--text-muted);">For every $1 spent on maintenance/fixed costs, you are generating $1.18 in revenue. To grow, we need to push this ratio toward 1.5x by optimizing fleet uptime.</small>
        </li>
    </ul>
</div>
`;

// Clean up existing expense metrics if any
function cleanExpenseMetrics(content) {
    let result = content;
    const marker = '<div class="section" id="expense-metrics">';
    if (result.includes(marker)) {
        const start = result.indexOf(marker);
        const end = result.indexOf('</div>', result.indexOf('</ul>', start)) + 6;
        result = result.substring(0, start) + result.substring(end);
    }
    return result;
}

html = cleanExpenseMetrics(html);

// Inject after the "Total Expenses" summary card
const expenseCardMarker = '<h4>Total Expenses</h4>';
const expenseCardEnd = html.indexOf('</div>', html.indexOf(expenseCardMarker)) + 6;
html = html.substring(0, expenseCardEnd) + expenseMetrics + html.substring(expenseCardEnd);

// Update timestamp
const timestamp = new Date().toUTCString().replace('GMT', 'UTC').toUpperCase().split(' ').slice(1, 5).join(' ');
const timeTag = 'bold; margin: 0;">';
const tStart = html.indexOf(timeTag) + timeTag.length;
const tEnd = html.indexOf('</p>', tStart);
html = html.substring(0, tStart) + timestamp + html.substring(tEnd);

fs.writeFileSync(indexFile, html);
console.log('✅ Expense optimization metrics added to Mission Control.');
