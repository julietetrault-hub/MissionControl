#!/bin/bash
cd /home/ubuntu/.openclaw/workspace/mission-control
node final_sync.js
./update-dashboard.sh
git push origin master:main --force
