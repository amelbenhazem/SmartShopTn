# Security Testing for SmartShop TN

This directory contains security testing tools and configurations for the SmartShop TN e-commerce application.

## Tools Integrated

### 1. Snyk - Dependency Vulnerability Scanning

**What it does:** Scans your dependencies for known security vulnerabilities.

#### Setup:
```bash
# Install Snyk globally
npm install -g snyk

# Authenticate with Snyk
snyk auth

# Test for vulnerabilities in backend
cd backend && snyk test

# Test for vulnerabilities in frontend
cd frontend && snyk test

# Or test from root
npm run security:snyk
```

#### Monitor your project:
```bash
# This sends results to Snyk dashboard for continuous monitoring
npm run security:snyk:monitor
```

#### Features:
- Scans `package.json` dependencies
- Identifies known CVEs
- Suggests fixes and patches
- Integration with CI/CD pipelines
- Free for open source projects

#### CI/CD Integration:
Add to your GitHub Actions workflow:
```yaml
- name: Run Snyk Security Test
  run: |
    npm install -g snyk
    snyk auth ${{ secrets.SNYK_TOKEN }}
    cd backend && snyk test --severity-threshold=high
    cd ../frontend && snyk test --severity-threshold=high
```

---

### 2. OWASP ZAP - Dynamic Application Security Testing

**What it does:** Tests your running application for security vulnerabilities.

#### Prerequisites:
- Docker installed on your system
- Application running (frontend and backend)

#### Setup:
```bash
# Make scripts executable (already done)
chmod +x security-tests/run-zap-baseline.sh
chmod +x security-tests/run-zap-full.sh
```

#### Run Baseline Scan (Fast - ~5 minutes):
```bash
# Start your application first
npm run dev:backend &
npm run dev:frontend &

# Run baseline scan
npm run security:zap:baseline

# Or with custom target
TARGET_URL=http://localhost:5173 npm run security:zap:baseline
```

#### Run Full Scan (Comprehensive - ~30+ minutes):
```bash
# Start your application first
npm run dev:backend &
npm run dev:frontend &

# Run full scan (WARNING: Takes long time!)
npm run security:zap:full
```

#### Baseline vs Full Scan:

**Baseline Scan:**
- Quick passive scan
- Minimal false positives
- Safe for CI/CD
- Doesn't modify data
- Good for regular checks

**Full Scan:**
- Active scanning with spider
- More comprehensive
- May have false positives
- Can modify data (use in test env only!)
- Better for thorough testing

#### Reports:
Reports are saved to: `security-tests/reports/zap-*-report-YYYYMMDD-HHMMSS.html`

#### Configuration:
- Edit `zap-baseline.conf` for baseline scan settings
- Edit `zap-full-scan.conf` for full scan settings

#### CI/CD Integration:
```yaml
- name: Run OWASP ZAP Baseline Scan
  run: |
    docker-compose up -d
    sleep 10  # Wait for services to start
    npm run security:zap:baseline
  continue-on-error: true  # Don't fail build on findings

- name: Upload ZAP Report
  uses: actions/upload-artifact@v3
  with:
    name: zap-report
    path: security-tests/reports/
```

---

### 3. Burp Suite - Manual Security Testing

**What it does:** Comprehensive manual security testing platform.

#### Setup:
1. Download Burp Suite Community Edition: https://portswigger.net/burp/communitydownload
2. Install and launch Burp Suite
3. Follow the guide: `security-tests/burp-suite-guide.md`

#### Key Features:
- **Proxy:** Intercept and modify HTTP/HTTPS traffic
- **Spider:** Crawl application to discover endpoints
- **Scanner:** Automated vulnerability scanning (Professional only)
- **Repeater:** Manual request testing and manipulation
- **Intruder:** Automated attack tool (limited in Community Edition)

#### Recommended Testing Workflow:
1. Configure browser proxy to use Burp (127.0.0.1:8080)
2. Add SmartShop TN to scope
3. Browse the application to map all endpoints
4. Run spider to discover additional endpoints
5. Manually test critical functions:
   - Authentication & authorization
   - Cart & checkout process
   - Admin functions
   - API endpoints
6. Export findings and generate report

#### What to Test:
- SQL/NoSQL injection in all inputs
- XSS in product names, reviews, profiles
- Authorization bypass (user accessing admin functions)
- IDOR (accessing other users' orders)
- Price manipulation in cart
- JWT token tampering
- Rate limiting on login/API endpoints

See full guide: `security-tests/burp-suite-guide.md`

---

## Complete Security Testing Workflow

### 1. Dependency Scanning (Daily/Weekly)
```bash
npm run security:snyk
```

### 2. Automated Dynamic Scanning (Before releases)
```bash
# Start application
npm run docker:up
sleep 10

# Run ZAP baseline scan
npm run security:zap:baseline
```

### 3. Manual Testing (Major releases)
- Use Burp Suite for comprehensive manual testing
- Follow test cases in `burp-suite-guide.md`
- Focus on critical business logic

### 4. Continuous Monitoring
```bash
# Set up Snyk monitoring (once)
npm run security:snyk:monitor
```

---

## Security Test Reports

All security test reports are saved to: `security-tests/reports/`

**Report Types:**
- `zap-baseline-report-*.html` - ZAP baseline scan reports
- `zap-full-report-*.html` - ZAP full scan reports
- Snyk reports - View on Snyk dashboard at https://snyk.io

---

## Quick Reference

### Run All Automated Security Tests:
```bash
npm run security:all
```

### Individual Tools:
```bash
# Snyk dependency scan
npm run security:snyk

# ZAP baseline scan
npm run security:zap:baseline

# ZAP full scan (takes 30+ min)
npm run security:zap:full

# Burp Suite
# Manual - Launch Burp Suite application
```

---

## Understanding Security Findings

### Severity Levels:
- **Critical:** Fix immediately - actively exploitable
- **High:** Fix in next release - significant risk
- **Medium:** Fix soon - moderate risk
- **Low:** Fix when possible - minor risk
- **Info:** No immediate action - informational

### Common Vulnerabilities to Watch For:

1. **A01:2021 – Broken Access Control**
   - IDOR in orders/cart endpoints
   - Admin function access by regular users

2. **A02:2021 – Cryptographic Failures**
   - Sensitive data in logs/errors
   - Weak JWT configuration

3. **A03:2021 – Injection**
   - SQL/NoSQL injection in queries
   - XSS in product descriptions

4. **A05:2021 – Security Misconfiguration**
   - Default credentials
   - Verbose error messages
   - Missing security headers

5. **A07:2021 – Identification and Authentication Failures**
   - Weak password policies
   - Session fixation
   - Insecure password reset

6. **A08:2021 – Software and Data Integrity Failures**
   - Dependency vulnerabilities (Snyk finds these)

---

## Best Practices

1. **Test in isolated environments** - Never run active scans on production
2. **Get authorization** - Ensure you have permission to test
3. **Regular scanning** - Run Snyk weekly, ZAP baseline before releases
4. **Fix prioritization** - Fix Critical/High vulnerabilities first
5. **Retest after fixes** - Verify vulnerabilities are actually fixed
6. **Document everything** - Keep records of findings and fixes
7. **Security in CI/CD** - Integrate Snyk and ZAP baseline in your pipeline

---

## Troubleshooting

### Snyk:
```bash
# Authentication issues
snyk auth

# Can't find vulnerabilities database
snyk test --all-projects

# Ignore specific vulnerabilities
snyk ignore --id=SNYK-XXX-XXX
```

### OWASP ZAP:
```bash
# ZAP can't reach application
# Make sure app is running and accessible
curl http://localhost:5173
curl http://localhost:5000/api/health

# Docker network issues
docker run --rm --network="host" ...

# Permission issues with reports
chmod -R 777 security-tests/reports/
```

### Burp Suite:
- **Proxy not working:** Check browser proxy settings
- **Can't intercept HTTPS:** Install Burp CA certificate
- **Application not loading:** Disable intercept temporarily

---

## Additional Resources

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Snyk Documentation:** https://docs.snyk.io/
- **OWASP ZAP Documentation:** https://www.zaproxy.org/docs/
- **Burp Suite Documentation:** https://portswigger.net/burp/documentation
- **Web Security Academy:** https://portswigger.net/web-security

---

## Support

For issues or questions about security testing:
1. Check tool documentation
2. Review this README and guides
3. Consult OWASP resources
4. Contact security team
