const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

const jjMetrics = `
<div class="section" id="jj-metrics">
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
<div class="section" id="overall-metrics">
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
            <strong>4. Cash Flow Health: Consistently Positive</strong><br>
            <small style="color: var(--text-muted);">Despite heavy payments ($11k+ in Nov '25), revenue consistently outpaced outflow across 29 statement cycles.</small>
        </li>
        <li style="margin-bottom: 16px;">
            <strong>5. Strategic Reinvestment Rate: $115k (All-Time)</strong><br>
            <small style="color: var(--text-muted);">Total capital deployed back into the business via expenses and financing payments since early 2024.</small>
        </li>
    </ul>
</div>
`;

// String-based cleaning to avoid regex syntax errors in this environment
function cleanHtml(content) {
    let result = content;
    // Remove specific known sections if they exist
    const markers = [
        '<div class="section" id="jj-metrics">',
        '<div class="section" id="overall-metrics">',
        '<h3>Top 5 Business Metrics</h3>'
    ];
    
    markers.forEach(marker => {
        if (result.includes(marker)) {
            const start = result.lastIndexOf('<div class="section"', result.indexOf(marker));
            const end = result.indexOf('</div>', result.indexOf('</ul>', start)) + 6;
            if (start !== -1 && end !== -1) {
                result = result.substring(0, start) + result.substring(end);
            }
        }
    });
    return result;
}

html = cleanHtml(html);

// Inject JJ Metrics into Modern Luxury tab
const jjHeader = '<h3>Luxury Performance Metrics</h3>';
html = html.replace(jjHeader, jjHeader + jjMetrics);

// Inject Overall Metrics into Financials tab
const summaryCardsDiv = '<div class="summary-cards">';
const firstSummaryEnd = html.indexOf('</div>', html.indexOf(summaryCardsDiv)) + 6;
const pnlContainerEnd = html.indexOf('</div>', html.lastIndexOf('summary-card', html.indexOf('Net Profit'))) + 6;
html = html.substring(0, pnlContainerEnd) + overallMetrics + html.substring(pnlContainerEnd);

// Update timestamp
const timestamp = new Date().toUTCString().replace('GMT', 'UTC').toUpperCase().split(' ').slice(1, 5).join(' ');
const timeTag = 'bold; margin: 0;">';
const tStart = html.indexOf(timeTag) + timeTag.length;
const tEnd = html.indexOf('</p>', tStart);
html = html.substring(0, tStart) + timestamp + html.substring(tEnd);

fs.writeFileSync(indexFile, html);
console.log('✅ Mission Control updated successfully.');
