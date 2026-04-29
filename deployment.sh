#!/bin/bash
# Deploy Control Plane (production-safe)
# Usage: bash deployment.sh

set -euo pipefail

PROJECT_ROOT="/opt/control-plane"
BACKUP_DIR="${PROJECT_ROOT}/backup/$(date +%Y%m%d_%H%M%S)"
LOGFILE="${PROJECT_ROOT}/deployment.log"
GIT_USER=$(whoami)

echo "----[ControlPlane Deployment]----" | tee -a "$LOGFILE"
echo "Start time: $(date)" | tee -a "$LOGFILE"

cd "$PROJECT_ROOT"

echo "[1/7] Creating backup directory: $BACKUP_DIR" | tee -a "$LOGFILE"
mkdir -p "$BACKUP_DIR"

echo "[2/7] Backing up current public/core/modules/brain/api/server.js" | tee -a "$LOGFILE"
for d in public core modules brain api; do
  if [ -d "$d" ]; then
    cp -a "$d" "$BACKUP_DIR/"
  fi
done
if [ -f server.js ]; then
  cp server.js "$BACKUP_DIR/"
fi

echo "[3/7] Pulling latest code from git [User: $GIT_USER]" | tee -a "$LOGFILE"
git pull | tee -a "$LOGFILE"

echo "[4/7] Checking server.js and directories" | tee -a "$LOGFILE"
for d in public core modules brain api; do
  if [ ! -d "$d" ]; then
    echo "ERROR: Directory '$d' missing after pull! Restoring backup..." | tee -a "$LOGFILE"
    cp -a "$BACKUP_DIR/$d" "$PROJECT_ROOT/"
  fi
done

if [ ! -f server.js ]; then
  echo "ERROR: server.js missing after pull! Restoring backup..." | tee -a "$LOGFILE"
  cp "$BACKUP_DIR/server.js" .
fi

echo "[5/7] Installing/updating Node.js dependencies" | tee -a "$LOGFILE"
if [ -f package.json ]; then
  npm ci --production | tee -a "$LOGFILE"
else
  echo "WARNING: No package.json found. Skipping npm install." | tee -a "$LOGFILE"
fi

echo "[6/7] Restarting Node server..." | tee -a "$LOGFILE"
if [ -f .pid ]; then
  OLD_PID=$(cat .pid)
  if ps -p $OLD_PID > /dev/null 2>&1; then
    echo "Stopping old Node server PID $OLD_PID..." | tee -a "$LOGFILE"
    kill $OLD_PID || true
    sleep 2
  fi
fi

nohup node server.js >> server.out 2>&1 &
NEW_PID=$!
echo $NEW_PID > .pid
echo "Started Node server with PID $NEW_PID" | tee -a "$LOGFILE"

echo "[7/7] Deployment complete!" | tee -a "$LOGFILE"
echo "End time: $(date)" | tee -a "$LOGFILE"