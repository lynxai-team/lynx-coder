---
name: security-review
description: use when asked to perform an adversarial security review of a codebase
---

This skill describes the workflow for conducting a comprehensive adversarial security review. It synthesizes best practices from multiple reviewer analyses to produce the highest-quality security assessment for any codebase and programming language.

## Workflow

Execute these steps in order:

### 1. Understand the Codebase

- Read `.agents/documentation/codebase-summary.md` and `.agents/documentation/project-nav.md` for project context
- Identify all source files, entry points, dependencies, and frameworks used
- Map the architecture: authentication flows, data handling, external integrations, API endpoints
- Note the programming language(s), runtime environment, and deployment model

### 2. Review All Source Files Systematically

Review every source file, focusing on these **8 security dimensions**:

| Dimension | What to Look For |
|-----------|------------------|
| **Authentication** | Secret handling, session management, brute-force protection, timing attacks, credential storage |
| **Authorization** | Access controls, privilege escalation, role verification, session binding, missing checks |
| **Input Validation** | Injection vectors (command, SQL, XSS, LDAP, NoSQL), sanitization, allowlists, type safety |
| **Resource Management** | Rate limiting, connection limits, payload size limits, timeouts, thread/process leaks |
| **Cryptography** | Constant-time comparisons, key storage, TLS/encryption, random value generation, cipher choices |
| **Error Handling** | Exception recovery, information disclosure in errors, silent failures, stack traces to clients |
| **Concurrency** | Data races, lock protection, atomic operations, global mutable state, deadlocks |
| **Architecture** | Global state, exception propagation, encryption requirements, process isolation, sandboxing |

### 3. Identify Vulnerabilities with Full Detail

For **every finding**, document using this template:

```markdown
### [SEVERITY-N] Short Title

| Field | Detail |
|-------|--------|
| **Severity** | 🔴 CRITICAL / 🟠 HIGH / 🟡 MEDIUM / 🔵 LOW |
| **File** | `path/to/file.ext` — lines XX–YY |
| **CWE** | CWE-NNN: Vulnerability Name |

**Description**: What is wrong and why it matters.

```[language]
// Current vulnerable code with line numbers referenced
```

**Exploitation Scenario**: Concrete attack steps an adversary would take.

**Attack Vector**: Include actual payloads (JSON, HTTP requests, shell commands, SQL, etc.):
```json
{"field": "malicious_payload"}
```

**Impact**: What happens if exploited (RCE, DoS, data breach, privilege escalation, etc.)

**Recommended Fix**: Working code that resolves the vulnerability:
```[language]
// Fixed implementation
```
```

### 4. Assign Severity Using This Rubric

| Severity | Criteria |
|----------|----------|
| 🔴 **CRITICAL** | Remote Code Execution, Authentication Bypass, Complete DoS, Data Breach, Privilege Escalation to Root/Admin |
| 🟠 **HIGH** | Partial DoS, Sensitive Information Disclosure, Resource Exhaustion, Injection (partial), Broken Access Control |
| 🟡 **MEDIUM** | Missing Best Practices, Defense-in-Depth Gaps, Silent Failures, Weak Cryptography, Information Leakage |
| 🔵 **LOW** | Code Hygiene, Minor Info Disclosure, Recommendations, Non-exploitable Issues |

### 5. Mandatory CWE References

**Every finding must include a CWE reference.** Use the Common Weakness Enumeration (https://cwe.mitre.org/). Common examples:

| Issue | CWE |
|-------|-----|
| OS Command Injection | CWE-78 |
| SQL Injection | CWE-89 |
| Cross-Site Scripting (XSS) | CWE-79 |
| Improper Input Validation | CWE-20 |
| Timing Attack / Side Channel | CWE-208 |
| Unchecked Return Value | CWE-252 |
| Insufficient Logging & Monitoring | CWE-778 |
| Use of Hard-coded Password | CWE-259 |
| Cleartext Transmission (CWE-319) | CWE-319 |
| Missing Encryption | CWE-311 |
| Insufficiently Random Values | CWE-330 |
| Data Race | CWE-362 |
| Use After Free | CWE-416 |
| Uncontrolled Resource Consumption | CWE-400 |
| Allocation Without Limits | CWE-770 |
| Sensitive Info in Log File | CWE-532 |
| Origin Validation Error | CWE-346 |
| Improper Authorization | CWE-862 |
| Missing Authentication | CWE-306 |
| Broken Access Control | CWE-285 |
| Path Traversal | CWE-22 |
| LDAP Injection | CWE-90 |
| XML External Entities (XXE) | CWE-611 |
| Insecure Deserialization | CWE-502 |
| Server-Side Request Forgery (SSRF) | CWE-918 |

### 6. Check for These Common Vulnerabilities (Don't Miss Them)

#### Authentication & Authorization
- [ ] Timing side-channel in secret/password comparison
- [ ] No brute-force protection or rate limiting on authentication
- [ ] Secrets, API keys, or passwords logged in plaintext
- [ ] Secrets printed to stdout during startup or generation
- [ ] Missing origin/CORS validation on WebSocket or API endpoints
- [ ] Session tokens predictable or improperly generated
- [ ] Missing multi-factor authentication where required

#### Injection & Input Validation
- [ ] Command injection via unsanitized user input passed to subprocesses
- [ ] SQL injection from user-controlled query parameters
- [ ] XSS via reflected or stored user input
- [ ] Unsafe type casting without null/type checks
- [ ] Options/flags passed directly to external processes without allowlist validation
- [ ] Configuration file injection (YAML tags, JSON types, XML entities)
- [ ] Path traversal via `../` in file operations
- [ ] LDAP, NoSQL, or other database injection

#### Resource Management
- [ ] No payload/request size limits
- [ ] No rate limiting on API endpoints or connections
- [ ] No connection count limits
- [ ] Thread/process leaks on disconnect (resources not cleaned up)
- [ ] Unbounded memory allocation (buffers, streams, caches)
- [ ] No read/write deadline after authentication
- [ ] No timeout on external command or service execution
- [ ] Missing idle connection timeout

#### Concurrency & State
- [ ] Data races on shared variables without synchronization
- [ ] Unprotected concurrent access to maps, lists, or collections
- [ ] Dangling references to local/temporary variables
- [ ] Global mutable state without proper locking
- [ ] Race conditions in authentication or authorization checks

#### Information Disclosure
- [ ] Verbose error messages revealing internal details to clients
- [ ] Debug mode exposing sensitive data in production
- [ ] Stack traces sent to external clients
- [ ] Health check or status endpoints leaking server information
- [ ] File paths, versions, or internal IPs in responses

#### Process & Environment
- [ ] External processes run with full privileges (no sandboxing)
- [ ] Environment variable inheritance (secrets leaked to child processes)
- [ ] File descriptor or handle leaks on error paths
- [ ] PATH-based binary resolution (uncontrolled search path)
- [ ] Missing principle of least privilege

#### Cryptography & Secrets
- [ ] Secrets stored in plaintext config files
- [ ] Weak random number generation for tokens/keys
- [ ] Missing TLS/HTTPS for sensitive data transmission
- [ ] Deprecated or weak cipher algorithms
- [ ] Hard-coded credentials in source code

#### Architecture
- [ ] Missing encryption for data at rest or in transit
- [ ] Missing exception/error recovery middleware
- [ ] Unimplemented critical functionality left as stubs
- [ ] No session binding for cross-session operations
- [ ] Missing input validation at API boundaries

### 7. Include Architecture-Level Analysis Section

After individual findings, add a dedicated section on systemic concerns:

```markdown
## Architecture-Level Concerns

### 1. Global Mutable State
Analyze all global variables and their synchronization mechanisms.

### 2. Error Handling & Exception Propagation
Check if handlers have proper error recovery for unexpected failures.

### 3. Encryption Requirements
Assess encryption requirements for production deployment (TLS, data at rest).

### 4. Process Isolation & Sandboxing
Evaluate whether external processes or services are properly isolated.

### 5. [Other Systemic Issues]
Identify design patterns that create security risk surface area.
```

### 8. Structure the Report Exactly Like This

```markdown
# 🔴 Security Code Review — [Project Name]

**Date**: YYYY-MM-DD  
**Scope**: Full adversarial security audit of [codebase description]  
**Verdict**: **REJECT for production deployment** — Critical vulnerabilities require immediate remediation  

---

## Executive Summary

[2-3 sentences on overall security posture]

This project has **X CRITICAL**, **Y HIGH**, **Z MEDIUM**, and **W LOW** severity vulnerabilities. The most dangerous issues are:

1. [Critical finding 1]
2. [Critical finding 2]
3. [Critical finding 3]

The codebase should **not be deployed** until all CRITICAL and HIGH issues are resolved.

---

## Severity Summary

| Severity | Count | Issues |
|----------|-------|--------|
| 🔴 CRITICAL | X | [list brief titles] |
| 🟠 HIGH | Y | [list brief titles] |
| 🟡 MEDIUM | Z | [list brief titles] |
| 🔵 LOW | W | [list brief titles] |

---

## CRITICAL Vulnerabilities

### C1. [Title]

[Full finding with CWE, exploitation scenario, attack vector, impact, fix]

---

## HIGH Vulnerabilities

### H1. [Title]

[Full finding]

---

## MEDIUM Vulnerabilities

### M1. [Title]

[Full finding]

---

## LOW Vulnerabilities

### L1. [Title]

[Full finding]

---

## Architecture-Level Concerns

[Section on systemic issues — at least 3 concerns]

---

## Remediation Priority Matrix

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| **P0** | [Critical fix] | Low/Med/High | [What it prevents] |
| **P1** | [High fix] | Low/Med/High | [What it prevents] |
| **P2** | [Medium fix] | Low/Med/High | [What it prevents] |

---

## Pre-Deployment Checklist

- [ ] All CRITICAL and HIGH findings resolved
- [ ] Static analysis passes with no warnings
- [ ] Dependency vulnerability scan shows no known issues
- [ ] Concurrency tests pass (race detector, thread sanitizer)
- [ ] TLS enabled (natively or via reverse proxy)
- [ ] Rate limiting configured and tested
- [ ] Connection/request limits set
- [ ] Secrets not logged in plaintext
- [ ] Input validation comprehensive

---

## Conclusion

[Final verdict and immediate action required]

---

**Report Generated By**: Adversarial Security Analysis  
**Next Review**: After remediation completion
```

### 9. Quality Checklist Before Submitting

Verify your review includes:

- [ ] **CWE references for every finding** (minimum 10+ citations)
- [ ] **Exploitation scenarios with concrete payloads** (JSON, HTTP requests, shell commands, SQL, etc.)
- [ ] **Line-level code references** (`file.ext:XX`)
- [ ] **Remediation code examples** for every finding
- [ ] **Architecture-level analysis section** (at least 3 systemic concerns)
- [ ] **Severity summary table** with counts
- [ ] **Remediation priority matrix** with effort/impact
- [ ] **Pre-deployment checklist**
- [ ] All **8 security dimensions** covered
- [ ] Common vulnerabilities from Section 6 checked

### Rules

- Be adversarial — think like an attacker trying to exploit the system
- Every finding must have: CWE reference, exploitation scenario, attack payload, remediation code
- Classify severity conservatively — when in doubt, rate higher
- Include unique insights others might miss (resource leaks, edge cases, uncommon attack vectors)
- Provide actionable fixes, not just descriptions of problems
- Use emoji severity indicators: 🔴 🟠 🟡 🔵
- Keep the executive summary concise but comprehensive
- The report should be immediately useful for developers implementing fixes
- Adapt terminology and code examples to the target language/framework
