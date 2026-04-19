#!/bin/bash
# Mission Control Auto-Update Script using Git

# No hardcoded tokens here. Using system credentials.
REPO_OWNER="julietetrault-hub"
REPO_NAME="MissionControl"
DATA_FILE_PATH="/home/ubuntu/.openclaw/workspace/mission-control/data.json"

# Setup git
cd /home/ubuntu/.openclaw/workspace/mission-control
git config --global user.email "julietetrault@icloud.com"
git config --global user.name "Julie Tetrault"

# Check if git is initialized
if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/${REPO_OWNER}/${REPO_NAME}.git
    git fetch origin
    git branch main origin/main || git checkout -b main
fi

# Stage and commit everything
git add .
git commit -m "Full Mission Control sync - $(date -u)" || echo "No changes to commit"

# Force push to main to ensure GitHub Pages updates immediately
git push -f origin master:main

echo "✅ Dashboard updated!"