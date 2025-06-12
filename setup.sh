#!/bin/bash
set -euo pipefail

# Install frontend dependencies only
if [ -f frontend/package-lock.json ]; then
  npm ci --prefix frontend
else
  npm install --prefix frontend
fi

echo "Setup complete"