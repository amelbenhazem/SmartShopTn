#!/bin/bash

# OWASP ZAP Baseline Security Scan Script
# This script runs a baseline security scan against the SmartShop TN application

set -e

echo "Starting SmartShop TN OWASP ZAP Baseline Scan..."

# Configuration
TARGET_URL="${TARGET_URL:-http://localhost:5173}"
REPORT_DIR="./security-tests/reports"
REPORT_FILE="$REPORT_DIR/zap-baseline-report-$(date +%Y%m%d-%H%M%S).html"

# Create report directory if it doesn't exist
mkdir -p "$REPORT_DIR"

# Check if ZAP is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is required to run OWASP ZAP"
    echo "Please install Docker: https://www.docker.com/get-started"
    exit 1
fi

echo "Target URL: $TARGET_URL"
echo "Report will be saved to: $REPORT_FILE"
echo ""

# Run ZAP Baseline Scan using Docker
docker run --rm \
  --network="host" \
  -v "$(pwd)/security-tests:/zap/wrk:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py \
  -t "$TARGET_URL" \
  -r "$(basename $REPORT_FILE)" \
  -c zap-baseline.conf \
  -I \
  || true

# Move report to correct location
if [ -f "$(basename $REPORT_FILE)" ]; then
  mv "$(basename $REPORT_FILE)" "$REPORT_FILE"
fi

echo ""
echo "ZAP Baseline Scan completed!"
echo "Report saved to: $REPORT_FILE"
