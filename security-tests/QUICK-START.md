# Security Testing Quick Start Guide

## Prerequisites

Before running security tests, ensure you have:

1. **Node.js 18+** installed
2. **Docker** installed (for OWASP ZAP)
3. **SmartShop TN application** ready to run

## Installation

### 1. Install Snyk (One-time setup)

```bash
# Install Snyk globally
npm install -g snyk

# Authenticate (opens browser for login)
snyk auth
```

### 2. OWASP ZAP Setup

OWASP ZAP runs via Docker - no additional installation needed!
Docker will automatically download the ZAP image on first run.

### 3. Burp Suite (Optional)

Download from: https://portswigger.net/burp/communitydownload

## Running Security Tests

### Quick Test (Recommended for CI/CD)

Run both Snyk and ZAP baseline scan:

```bash
# 1. Start your application
npm run docker:up

# 2. Wait for services to start (about 10 seconds)
sleep 10

# 3. Run security tests
npm run security:all
```

### Individual Tests

#### Snyk - Dependency Scanning

```bash
# Test backend dependencies
cd backend && snyk test

# Test frontend dependencies
cd frontend && snyk test

# Or from root
npm run security:snyk

# Set up continuous monitoring
npm run security:snyk:monitor
```

#### OWASP ZAP - Baseline Scan (Fast ~5 min)

```bash
# Make sure application is running first!
npm run docker:up

# Run baseline scan
npm run security:zap:baseline
```

#### OWASP ZAP - Full Scan (Slow ~30+ min)

```bash
# Make sure application is running first!
npm run docker:up

# Run full active scan (use in test environment only!)
npm run security:zap:full
```

#### Burp Suite - Manual Testing

1. Launch Burp Suite application
2. Configure browser proxy to 127.0.0.1:8080
3. Browse SmartShop TN application
4. Follow detailed guide: `burp-suite-guide.md`

## Understanding Results

### Snyk Output

```
✓ Tested backend for known issues, no vulnerable paths found.
✗ Tested frontend for known issues, found 5 issues, 5 vulnerable paths.

Issues to fix by upgrading:
  Upgrade axios@0.21.1 to axios@0.21.2 to fix
  ✗ Critical severity vulnerability found in axios
    introduced by axios@0.21.1
```

**Action:** Run `npm audit fix` or manually upgrade vulnerable packages.

### OWASP ZAP Reports

Reports saved to: `security-tests/reports/zap-*-report-*.html`

Open HTML reports in your browser to see:
- Risk levels (High, Medium, Low, Informational)
- Vulnerable URLs
- Attack descriptions
- Remediation advice

### Burp Suite

Review findings in Burp Suite Dashboard and Target Site Map.
Export reports via: Dashboard → Right-click issues → Report selected issues

## Common Issues

### Snyk: "Not authorized"
```bash
snyk auth
```

### ZAP: "Cannot connect to localhost:5173"
```bash
# Check if application is running
curl http://localhost:5173
curl http://localhost:5000

# Start application if needed
npm run docker:up
```

### ZAP: Permission denied on reports
```bash
chmod -R 755 security-tests/
```

### Burp Suite: Can't intercept traffic
- Check browser proxy settings (127.0.0.1:8080)
- Disable other proxy extensions
- For HTTPS: Install Burp CA certificate

## CI/CD Integration

### GitHub Actions

Security tests run automatically on:
- Push to main/develop branches
- Pull requests
- Weekly schedule (Mondays at 9 AM)
- Manual trigger

Configure by adding Snyk token:
1. Go to https://snyk.io → Settings → API Token
2. Add to GitHub: Settings → Secrets → New repository secret
3. Name: `SNYK_TOKEN`, Value: your token

### GitLab CI

Add to `.gitlab-ci.yml`:

```yaml
security-tests:
  stage: test
  script:
    - npm install -g snyk
    - snyk auth $SNYK_TOKEN
    - cd backend && snyk test --severity-threshold=high
    - cd ../frontend && snyk test --severity-threshold=high
    - docker-compose up -d
    - sleep 30
    - npm run security:zap:baseline
  artifacts:
    paths:
      - security-tests/reports/
```

## Best Practices

1. **Run Snyk weekly** to catch new vulnerabilities
2. **Run ZAP baseline before releases**
3. **Use Burp Suite for manual testing** of critical features
4. **Fix Critical/High vulnerabilities first**
5. **Retest after fixes** to verify resolution
6. **Never run full ZAP scan on production** (it's invasive!)

## Recommended Workflow

### Weekly (Automated)
- ✅ Snyk dependency scan

### Before Each Release
- ✅ Snyk dependency scan
- ✅ OWASP ZAP baseline scan
- ✅ Review and fix High/Critical issues

### Major Releases
- ✅ All above
- ✅ OWASP ZAP full scan (in test environment)
- ✅ Burp Suite manual testing
- ✅ Penetration testing by security team

## Getting Help

- **Snyk:** https://docs.snyk.io/
- **OWASP ZAP:** https://www.zaproxy.org/docs/
- **Burp Suite:** `security-tests/burp-suite-guide.md`
- **Detailed docs:** `security-tests/README.md`

## Next Steps

1. ✅ Run your first security scan: `npm run security:all`
2. ✅ Review any findings in the reports
3. ✅ Fix Critical and High vulnerabilities
4. ✅ Set up continuous monitoring: `npm run security:snyk:monitor`
5. ✅ Add `SNYK_TOKEN` to your CI/CD
6. ✅ Schedule regular security testing

## Emergency Security Issues

If you discover a **critical security vulnerability**:

1. 🚨 **Do NOT commit** the vulnerability details publicly
2. 🔒 Fix the issue immediately
3. 📝 Document what was affected
4. 🔄 Deploy the fix
5. 📧 Notify affected users if necessary
6. 🧪 Retest to confirm the fix

---

**Remember:** Security testing is an ongoing process, not a one-time task!
