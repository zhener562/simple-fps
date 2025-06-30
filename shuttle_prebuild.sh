#!/bin/bash

set -e

# Build all frontend projects using npm workspaces
echo "Building frontend projects..."
cd static
npm install
npm run build
cd ..

echo "Frontend builds complete."
