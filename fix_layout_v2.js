const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

const jjMetrics = `
<div class="section" id="jj-metrics-v2">
    <h3>J&J Modern Luxury: Top 5 Performance Metrics</h3>
    <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 16px;">
            <strong>1. Luxury Segment Growth: +173% YoY</strong><br>
            <small style="color: var(--text-muted);">Revenue grew from $32k in 2024 to over $88k in 2025 as luxury fleet capacity expanded.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>2. High-Value Cost Center: Maintenance & Repairs</strong><br>
            <small style="color: var(--text-muted);">Major expenses identified for Tesla and BMW service (e.g., $1,624 Wakefield service) are key luxury-tier overhead.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>3. Debt-to-Revenue Efficiency: 84% Utilization</strong><br>
            <small style="color: var(--text-muted);">Statement "Mobile Payments" represent the majority of cash-out, indicating aggressive fleet financing for luxury assets.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>4. Peak Revenue Month: Oct - Nov 2025 ($15,634)</strong><br>
            <small style="color: var(--text-muted);">Historical peak month indicates high seasonality demand for the modern luxury fleet in late fall.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>5. Average Transaction Value (Expenses): $318.00</strong><br>
            <small style="color: var(--text-muted);">Excluding debt payments, average business maintenance/supply spend aligns with luxury-tier operational costs.</small>
        </li>
    </ul>
</div>
`;

const overallMetrics = `
<div class="section" id="overall-metrics-v2">
    <h3>Overall Business: Top 5 Financial Metrics</h3>
    <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 16px;">
            <strong>1. Net Profit (All-Time): $20,378.17</strong><br>
            <small style="color: var(--text-muted);">Total take-home after all categorized Amex business expenses and debt service.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>2. Cumulative Operating Margin: 15.1%</strong><br>
            <small style="color: var(--text-muted);">For every dollar earned, 15 cents is retained as pure profit after aggressive growth reinvestment.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>3. Cash Flow Health: Consistently Positive</strong><br>
            <small style="color: var(--text-muted);">Despite heavy payments ($11k+ in Nov '25), revenue consistently outpaced outflow across 29 statement cycles.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>4. Strategic Reinvestment Rate: $115k (All-Time)</strong><br>
            <small style="color: var(--text-muted);">Total capital deployed back into the business via expenses and financing payments since early 2024.</small>
        </li>
    </ul>
</div>
`;

const expenseMetrics = `
<div class="section" id="expense-metrics-v2">
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

// String helper to cut between two markers
function removeBetween(str, startMarker, endMarker) {
    let s = str;
    while (s.includes(startMarker)) {
        const start = s.indexOf(startMarker);
        const end = s.indexOf(endMarker, start);
        if (end !== -1) {
            s = s.substring(0, start) + s.substring(end + endMarker.length);
        } else {
            break;
        }
    }
    return s;
}

// Purge everything old using string markers
html = removeBetween(html, '<div class="section" id="jj-metrics">', '</div>

');
html = removeBetween(html, '<div class="section" id="overall-metrics">', '</div>

');
html = removeBetween(html, '<div class="section" id="expense-metrics">', '</div>

');
html = removeBetween(html, '<div class="section" id="jj-metrics-v2">', '</div>

');
html = removeBetween(html, '<div class="section" id="overall-metrics-v2">', '</div>

');
html = removeBetween(html, '<div class="section" id="expense-metrics-v2">', '</div>

');

// Specific cleanup for the previous turn's accidental nesting
html = html.replace('<p style="color: var(--text-muted)">Tracking utilization and daily rates for the luxury segment...</p>', '');

// Inject JJ Metrics correctly in its tab
const jjHeader = '<h3>Luxury Performance Metrics</h3>';
html = html.replace(jjHeader, jjHeader + jjMetrics);

// Inject Financials and Expenses outside the summary card grid
const summaryCardsEnd = html.indexOf('</div>', html.indexOf('<div class="summary-cards">')) + 6;
// Need to find the REAL end of the grid (it has 3 summary-card divs inside)
const gridEnd = html.indexOf('</div>', html.lastIndexOf('summary-card')) + 6;

html = html.substring(0, gridEnd) + overallMetrics + expenseMetrics + html.substring(gridEnd);

// Update timestamp
const timestamp = new Date().toUTCString().replace('GMT', 'UTC').toUpperCase().split(' ').slice(1, 5).join(' ');
const timeMarker = 'bold; margin: 0;">';
const tStart = html.indexOf(timeMarker) + timeMarker.length;
const tEnd = html.indexOf('</p>', tStart);
html = html.substring(0, tStart) + timestamp + html.substring(tEnd);

fs.writeFileSync(indexFile, html);
console.log('✅ Mission Control layout stabilized.');
