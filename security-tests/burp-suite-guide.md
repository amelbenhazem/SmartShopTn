# Burp Suite Integration Guide for SmartShop TN

## Overview
Burp Suite is a powerful web application security testing platform. This guide covers how to use it with SmartShop TN.

## Prerequisites
- Download Burp Suite Community Edition: https://portswigger.net/burp/communitydownload
- Or use Burp Suite Professional (if available)

## Manual Testing Setup

### 1. Configure Proxy

1. Open Burp Suite
2. Go to **Proxy > Options**
3. Ensure the proxy listener is running on `127.0.0.1:8080`
4. Configure your browser to use this proxy

### 2. Configure Browser Proxy

**Firefox:**
1. Settings > Network Settings > Manual proxy configuration
2. HTTP Proxy: `127.0.0.1`, Port: `8080`
3. Check "Also use this proxy for HTTPS"

**Chrome (with extension):**
1. Install "Proxy SwitchyOmega" extension
2. Create new profile with proxy `127.0.0.1:8080`

### 3. Target SmartShop TN Application

1. In Burp Suite, go to **Target > Site map**
2. Add to scope:
   - `http://localhost:5173` (Frontend)
   - `http://localhost:5000` (Backend API)
3. Go to **Proxy > Options > Intercept Client Requests**
4. Add scope filter to only intercept in-scope items

## Testing Workflow

### 1. Spider/Crawl the Application
1. Navigate through your application with Burp proxy enabled
2. Right-click on target in Site map > **Spider this host**
3. Let spider discover all endpoints

### 2. Scan for Vulnerabilities
1. Right-click on target > **Actively scan this host**
2. Configure scan settings (Community Edition has limitations)
3. Review scan results in **Dashboard** and **Target > Site map**

### 3. Manual Testing

**Test Authentication:**
- Test login with SQL injection payloads
- Test password reset functionality
- Test session management
- Test JWT token handling

**Test API Endpoints:**
- Send requests to Repeater (Ctrl+R)
- Modify parameters and headers
- Test for:
  - SQL Injection
  - XSS (Cross-Site Scripting)
  - IDOR (Insecure Direct Object References)
  - Authorization bypass
  - Rate limiting

**Test Cart & Checkout:**
- Manipulate prices in requests
- Test quantity limits
- Test payment flow
- Test order manipulation

### 4. Using Intruder (Professional feature)
For automated testing of multiple payloads:
1. Send request to Intruder
2. Mark injection points
3. Load payload lists
4. Run attack and analyze results

## Key Test Cases for SmartShop TN

### Authentication Tests
```
POST /api/auth/login
- SQL injection in email/password
- NoSQL injection
- Brute force protection
- Account enumeration
```

### Product Tests
```
GET /api/products
- Authorization checks
- Parameter manipulation

POST /api/products (Admin only)
- Authorization bypass
- File upload vulnerabilities
```

### Cart Tests
```
POST /api/cart/add
- Price manipulation
- Quantity overflow
- Session fixation
```

### Order Tests
```
POST /api/orders
- Order amount manipulation
- Address validation bypass
- Payment bypass
```

## Common Vulnerabilities to Check

1. **Authentication & Session Management**
   - Weak password policies
   - Session fixation
   - JWT vulnerabilities
   - Insecure password reset

2. **Authorization**
   - Vertical privilege escalation (user → admin)
   - Horizontal privilege escalation (user → other user)
   - IDOR in API endpoints

3. **Input Validation**
   - SQL/NoSQL injection
   - XSS (reflected, stored, DOM-based)
   - Command injection
   - Path traversal

4. **Business Logic**
   - Price manipulation
   - Quantity overflow
   - Race conditions
   - Payment bypass

5. **API Security**
   - Missing rate limiting
   - Excessive data exposure
   - Mass assignment
   - Security misconfiguration

## Exporting Results

1. **Generate Report:**
   - Select issues in Dashboard
   - Right-click > **Report selected issues**
   - Choose HTML or XML format

2. **Export Site Map:**
   - Target > Site map
   - Right-click on target > **Save selected items**

## Integration with CI/CD (Professional Only)

If you have Burp Suite Professional, you can use the REST API for automation:

```bash
# Example using Burp Suite Enterprise
curl -X POST https://burp-enterprise-url/api/v1/scan \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "scope": {
      "included": ["http://localhost:5173", "http://localhost:5000"]
    }
  }'
```

## Best Practices

1. **Always test in a development environment first**
2. Get proper authorization before testing
3. Be careful with active scanning - it can modify data
4. Save your project regularly
5. Document all findings with steps to reproduce
6. Retest after fixes are applied

## Limitations of Community Edition

- No active scanning automation
- No scan scheduling
- Limited Intruder capabilities
- No REST API access
- Manual testing only for most features

Consider upgrading to Professional for:
- Advanced automation
- Burp Collaborator
- Scanner customization
- Integration capabilities

## Additional Resources

- Official Documentation: https://portswigger.net/burp/documentation
- Web Security Academy: https://portswigger.net/web-security
- Burp Suite Support: https://portswigger.net/support
