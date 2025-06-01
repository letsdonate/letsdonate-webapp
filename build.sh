#!/bin/bash

# Install dependencies
npm install

# Build the project
npm run build

# Create the public/dist directory if it doesn't exist
mkdir -p public/dist

# Copy built files to public directory
cp -r dist/* public/dist/

echo "Build completed. Files are ready for deployment." 