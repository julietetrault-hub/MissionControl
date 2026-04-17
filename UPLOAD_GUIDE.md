# Turo Fleet Financial Tracker - Upload Guide

## How to Upload Your Files

### Step 1: Export Your CSVs

#### **Turo Earnings**
1. Go to **Turo.com**
2. Navigate to **Earnings** tab
3. Select date range (monthly recommended)
4. Click **Export → CSV**
5. Save file as: `YYYY-MM-turo-earnings.csv`

#### **Delta Amex (Business Expenses)**
1. Log into **Delta Amex** account
2. Go to **Statements** or **Transactions**
3. Export to **CSV** (or download statement PDF → convert to CSV)
4. Save file as: `YYYY-MM-amex-expenses.csv`

#### **Wells Fargo Business Banking**
1. Log into **Wells Fargo** business account
2. Go to **Account Activity**
3. Select date range
4. Click **Download → CSV**
5. Save file as: `YYYY-MM-wells-fargo.csv`

---

## Upload Process

1. Open the **Turo Fleet Financial Tracker**
2. Click the **"Upload Data"** tab (second tab from left)
3. Click each button to select your CSV files:
   - **"Select Turo CSV"** → Upload your Turo earnings file
   - **"Select Amex CSV"** → Upload your Delta Amex file
   - **"Select Wells Fargo CSV"** → Upload your Wells Fargo file

---

## CSV Format Requirements

### Turo Earnings CSV
Your file should have these columns:
- `Date` or `Reservation Date`
- `Vehicle` or `Car Name`
- `Earnings` or `Amount` or `Total`
- `Trip ID` (optional)
- `Guest` (optional)

### Amex Expenses CSV
Your file should have these columns:
- `Date` or `Transaction Date`
- `Description` or `Merchant`
- `Amount`
- `Category` (optional - will auto-categorize)

### Wells Fargo CSV
Your file should have these columns:
- `Date`
- `Description`
- `Amount` or `Debit`/`Credit`
- `Type` (optional)

---

## Auto-Categorization Rules

The tracker will automatically categorize expenses into:

| Category | Keywords Detected |
|----------|-------------------|
| **Fuel/Gas** | gas, fuel, shell, chevron, bp, exxon, mobil, costco gas |
| **Maintenance** | repair, mechanic, oil change, tire, autozone, o'reilly, napa |
| **Insurance** | insurance, geico, progressive, allstate, state farm |
| **Cleaning/Detailing** | detail, wash, cleaning, car wash |
| **Parking/Tolls** | parking, toll, garage, meter |
| **Marketing/Photos** | photo, camera, listing |
| **Supplies** | supplies, air freshener, wipes, accessories |
| **Turo Fees** | turo, platform fee, trip fee |

---

## Manual Categorization (if needed)

If auto-categorization misses something, you can manually tag transactions in your CSV before upload by adding a `Category` column with values like:
- `Fuel`
- `Maintenance`
- `Insurance`
- `Cleaning`
- `Parking`
- `Marketing`
- `Supplies`

---

## P&L Statement Output

After uploading, the **P&L Statement** tab will show:

| Category | Description |
|----------|-------------|
| **Gross Revenue** | Total Turo earnings |
| **Turo Fees** | Platform fees deducted |
| **Net Revenue** | Revenue after Turo fees |
| **Operating Expenses** | Sum of all categorized expenses |
| **Vehicle-Specific Costs** | Maintenance, fuel per vehicle |
| **Net Profit** | Final bottom line |
| **Profit Margin %** | Net profit ÷ Gross revenue |

---

## Pro Tips

1. **Upload monthly** - Set a calendar reminder for the 1st of each month
2. **Use consistent filenames** - `2026-04-turo-earnings.csv` format
3. **Check the By Vehicle tab** - See which cars are most/least profitable
4. **Review uncategorized items** - The tracker will flag transactions it couldn't auto-categorize

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CSV won't upload | Check file format is CSV (not Excel .xlsx) |
| Dates not parsing | Use MM/DD/YYYY or YYYY-MM-DD format |
| Amounts showing wrong | Remove currency symbols ($) before upload |
| Missing categories | Add a `Category` column to your CSV |
