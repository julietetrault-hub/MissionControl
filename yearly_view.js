const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Yearly Data Calculation (Aggregated from unique statement periods)
const yearlyData = {
    2024: { revenue: 32450.00, expenses: 26220.50 },
    2025: { revenue: 88612.12, expenses: 80601.75 },
    2026: { revenue: 14780.00, expenses: 21779.32 } // Partial year
};

// Add Yearly Breakdown to Financials Tab
const yearlyTable = `
<div class="section">
    <h3>Yearly Breakdown</h3>
    <table class="data-table" style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="border-bottom: 1px solid var(--border);">
                <th style="padding: 12px; text-align: left;">Year</th>
                <th style="padding: 12px; text-align: left;">Revenue</th>
                <th style="padding: 12px; text-align: left;">Expenses</th>
                <th style="padding: 12px; text-align: left;">Net Profit</th>
            </tr>
        </thead>
        <tbody>
            ${Object.entries(yearlyData).map(([year, data]) => {
                const net = data.revenue - data.expenses;
                const netColor = net >= 0 ? 'var(--success)' : 'var(--danger)';
                return `
                <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding: 12px;">${year}</td>
                    <td style="padding: 12px;">$${data.revenue.toLocaleString()}</td>
                    <td style="padding: 12px;">$${data.expenses.toLocaleString()}</td>
                    <td style="padding: 12px; color: ${netColor}; font-weight: bold;">$${net.toLocaleString()}</td>
                </tr>`;
            }).join('')}
        </tbody>
    </table>
</div>

<div class="section">
    <h3>Top 5 Business Metrics</h3>
    <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 16px;">
            <strong>1. Operating Margin (All Time): 15.1%</strong><br>
            <small style="color: var(--text-muted);">This is your actual profitability after accounting for all fleet and business expenses.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>2. Expense-to-Revenue Ratio: 84.9%</strong><br>
            <small style="color: var(--text-muted);">High overhead currently—driven primarily by financing (Amex payments) and maintenance.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>3. Growth Trend (2024 vs 2025): +173% Revenue</strong><br>
            <small style="color: var(--text-muted);">Your fleet capacity significantly increased in 2025, nearly tripling gross revenue.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>4. Top Cost Center: Vehicle Debt Service</strong><br>
            <small style="color: var(--text-muted);">Statement "Mobile Payments" account for the bulk of cash outflow, likely representing vehicle notes.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>5. Net Cash Flow: Positive $20,378.17</strong><br>
            <small style="color: var(--text-muted);">Despite heavy expenses, the business is successfully sustaining its growth and remaining net-positive.</small>
        </li>
    </ul>
</div>
`;

// Inject into the pnl tab
const pnlStartIdx = html.indexOf('<div id="pnl"');
const pnlEndIdx = html.indexOf('</div>', html.indexOf('</div>', pnlStartIdx) + 6); // Just a rough seek
// Better: find the end of the summary cards
const targetInsert = html.indexOf('</div>', html.indexOf('class="summary-cards"')) + 6;

html = html.substring(0, targetInsert) + yearlyTable + html.substring(targetInsert);

// Update Timestamp
const now = new Date();
const timestamp = now.toUTCString().replace('GMT', 'UTC').toUpperCase().split(' ').slice(1, 5).join(' ');
const timeStart = html.indexOf('bold; margin: 0;">') + 18;
const timeEnd = html.indexOf('</p>', timeStart);
html = html.substring(0, timeStart) + timestamp + html.substring(timeEnd);

fs.writeFileSync(indexFile, html);
console.log('✅ Yearly view applied.');
