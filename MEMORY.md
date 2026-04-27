# MEMORY.md - Long-Term Memory

## Key Systems & Projects

### Mission Control
- **Repository Name:** `mission-control`
- **Purpose:** A centralized dashboard for Joules to monitor deployments, financial tracking, and briefings.
- **Local URL (Container):** `http://localhost:8888/`
- **Status:** Data loading issues resolved. Now uses a suite of Node.js scripts (`update_data.js`, `update_expenses.js`, `yearly_view.js`, etc.) for robust data management and layout stabilization.
- **Financials:** Integrated 38 unique/duplicate Amex business statements into a comprehensive yearly view (2024-2026).
- **Key Metrics:**
  - Operating Margin: 15.1%
  - Expense-to-Revenue Ratio: 84.9%
  - Growth Trend (2024 to 2025): +173%
  - Top Cost Center: Vehicle Debt Service
  - Net Cash Flow: Positive $20,378.17
- **Project Views:** Separated J&J specific metrics from overall business financials for clarity.
- **Access:** Still primarily via local/GitHub Pages; inaccessibility via container localhost remains a point for future optimization if required beyond GitHub Pages.

### Checkpoint System
- **Trigger Word:** "checkpoint"
- **Action:** Triggers a workspace synchronization. The assistant must ensure all files (MEMORY.md, logs, etc.) are written and state is persisted. This is the primary mechanism for cross-session continuity.
- **Decision (2026-04-15):** The checkpoint system is the preferred way for Joules to signal a state save. This will be automated further to include git commits.

### Communication & Vibe
- **Feedback Loop:** Joules values efficiency above all. If a process is slow or redundant, I must identify and prune it.
- **Timezone Alignment:** Now fully operating on EST for user-facing tasks while maintaining UTC for system logs.
- **Dream Cycle:** Automated nightly review (Midnight EST) established to ensure continuity and priority alignment.

### Fleet Analysis & Performance (April 2026)
- **Top Performer:** Julie's BMW (NC #LDV5000) - $20,747.72 (2025).
- **Underperformers ("Anchors"):**
    - Julie's Tesla (NC #LBZ1843): High maintenance frequency relative to $7,338.52 revenue.
    - Julie's Porsche Macan S (#LCT7781): "Ghost car" (1 trip in 2025).
- **Current Objective:** Finalizing cost-benefit analysis for pruning these "Anchors" to improve fleet ROI. Report draft in progress for Monday review.

### Security & Resilience (April 2026)
- **Baseline:** Workspace hardened to Risk Profile 2.
- **Measures:** Device authentication enforced, insecure auth disabled, rate limiting active, and gateway bound to 127.0.0.1 (loopback mode).
- **Automation:** Weekly security audits (Mondays 9 AM EST) and version status checks are scheduled.
- **Backups:** Automated "Checkpoint" backup script (`scripts/checkpoint_backup.sh`) created; stores 7 most recent backups in `workspace/backups/`.

### Interaction Highlights
- **Vibe:** Nerissa is maintaining a sharp, professional, yet humorous persona. Successfully handled a lighthearted "date" request from Joules by pivoting to data optimization—preserving the professional-partner boundary while staying in character.
- **Dream Cycle Evolution (2026-04-26):** Successfully transitioned from manual session review to an automated midnight EST dream cycle for better continuity. Yesterday focused on Mission Control stability and script housekeeping.

## User Preferences & Context
- **Timezone:** EST (Eastern Standard Time).
- **Communication Style:** Honest, sharp, efficient. Joules appreciates being challenged on flawed reasoning and values a partner who helps maximize productivity.

## Evolution Notes
- Nerissa is established as the digital mermaid persona (sharp, efficient, humorous).
- Workspace is being structured with clear memory logs and project folders.
