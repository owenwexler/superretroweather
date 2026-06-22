# Security Policy

## Overview

This document outlines the security practices, guidelines, and responsible disclosure procedures for web applications — covering both traditional CRUD applications and AI agent-powered systems. All contributors, operators, and integrators are expected to adhere to these standards to ensure the safety and integrity of the system and its users.

---

## Table of Contents

**General (All Web Applications)**
1. [Reporting a Vulnerability](#reporting-a-vulnerability)
2. [Authentication & Authorization](#authentication--authorization)
3. [Secrets & Credential Management](#secrets--credential-management)
4. [Logging, Monitoring & Auditability](#logging-monitoring--auditability)
5. [Dependency & Supply Chain Security](#dependency--supply-chain-security)
6. [Incident Response](#incident-response)
7. [Compliance & Regulatory Considerations](#compliance--regulatory-considerations)

**CRUD Application Security**
8. [CRUD Threat Model](#crud-threat-model)
9. [Database & Query Security](#database--query-security)
10. [Input Validation & Sanitization](#input-validation--sanitization)
11. [Session Management](#session-management)
12. [CSRF Protection](#csrf-protection)
13. [Security Headers & CORS](#security-headers--cors)
14. [File Upload Security](#file-upload-security)
15. [Error Handling & Information Disclosure](#error-handling--information-disclosure)
16. [Rate Limiting & Brute Force Protection](#rate-limiting--brute-force-protection)

**AI Agent Application Security**
17. [AI Agent-Specific Threat Model](#ai-agent-specific-threat-model)
18. [Prompt Injection Defense](#input-validation--prompt-injection-defense)
19. [Data Privacy & Minimization](#data-privacy--minimization)
20. [API & LLM Integration Security](#api--llm-integration-security)
21. [Tool Use & Agent Action Boundaries](#tool-use--agent-action-boundaries)
22. [Output Sanitization & Safety](#output-sanitization--safety)

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, **do not open a public issue**. Please follow responsible disclosure:

- **Email:** security@your-org.com
- **PGP Key:** _(link or fingerprint if applicable)_
- **Response SLA:** We aim to acknowledge reports within **48 hours** and provide a resolution timeline within **7 business days**.

Please include:
- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested mitigations (optional but appreciated)

We will credit researchers who responsibly disclose valid issues, unless they prefer to remain anonymous.

---

# CRUD Application Security

The following sections apply to any web application that creates, reads, updates, or deletes data — regardless of whether AI features are present.

---

## CRUD Threat Model

Traditional CRUD applications face a well-documented set of attack vectors. Teams should threat-model against the following before any production deployment:

| Threat | Description |
|---|---|
| **SQL / NoSQL Injection** | Unsanitized user input is interpreted as database commands |
| **Cross-Site Scripting (XSS)** | Malicious scripts are injected into pages viewed by other users |
| **Cross-Site Request Forgery (CSRF)** | Authenticated users are tricked into submitting unintended requests |
| **Broken Access Control** | Users access or modify records belonging to other users or elevated roles |
| **Insecure Direct Object Reference (IDOR)** | Predictable resource identifiers expose unauthorized data |
| **Mass Assignment** | API endpoints accept and bind unexpected fields (e.g., `isAdmin: true`) |
| **Sensitive Data Exposure** | Plaintext storage or transmission of passwords, tokens, or PII |
| **Brute Force / Credential Stuffing** | Automated attacks against login or password-reset endpoints |
| **Business Logic Abuse** | Legitimate features exploited in unintended sequences (e.g., price tampering) |
| **Denial of Service** | Resource-exhausting requests degrade availability for legitimate users |

---

## Database & Query Security

- **Always use parameterized queries or prepared statements.** Never interpolate user input directly into SQL or NoSQL query strings.
- Apply an **ORM safely** — be aware that raw query escape hatches (e.g., `.raw()`, `$queryRaw`) bypass injection protections and must be treated with the same care as hand-written SQL.
- Run the application database user with **minimum necessary privileges** — no `DROP`, `CREATE`, or schema-level permissions in production unless explicitly required.
- Enforce **row-level security (RLS)** at the database layer where supported (e.g., PostgreSQL RLS policies) as a defense-in-depth measure beyond application-layer access control.
- Validate all **sort fields, filter keys, and pagination parameters** on the server — never pass user-supplied column names directly into a query.
- Protect against **mass assignment** by maintaining explicit allow-lists of bindable fields on every create and update operation; never bind all incoming request fields to a model.
- Prevent **IDOR** by scoping all data queries to the authenticated user's identity or tenancy — never look up records by raw ID without confirming ownership.
- **Encrypt sensitive fields at rest** (e.g., SSNs, payment data) using a well-vetted library; do not rely solely on disk-level encryption.
- Maintain and test a **database backup and restore** procedure; store backups encrypted and off-site.

---

## Input Validation & Sanitization

- Validate all user input **server-side**, even when client-side validation exists — client-side validation is for UX, not security.
- Define and enforce **strict schemas** for all API request bodies, query parameters, and path parameters (e.g., using Zod, Joi, Pydantic, or JSON Schema).
- Reject requests that contain **unexpected fields** rather than silently ignoring them.
- Apply **type coercion safely** — ensure numeric IDs are actually numeric, dates are valid date strings, and enums only accept permitted values.
- Enforce **maximum length limits** on all string inputs to prevent buffer abuse and denial-of-service via oversized payloads.
- Sanitize any input that will be **rendered as HTML** to prevent XSS — prefer an allow-list sanitizer (e.g., DOMPurify) over a deny-list approach.
- Strip or reject **null bytes** and other control characters from inputs that will be passed to file systems, shell commands, or downstream services.
- Treat **file names supplied by users** as untrusted — never use them directly as filesystem paths.

---

## Session Management

- Use **server-side sessions or short-lived signed JWTs** — avoid storing sensitive state in client-readable cookies or localStorage.
- Set session cookies with the **`HttpOnly`, `Secure`, and `SameSite=Strict` (or `Lax`) attributes** to mitigate XSS theft and CSRF.
- Assign session identifiers using a **cryptographically random generator** with sufficient entropy (≥128 bits).
- **Rotate the session ID** upon privilege escalation events (login, role change, password reset) to prevent session fixation attacks.
- Enforce an **absolute session timeout** (e.g., 24 hours) and an **idle timeout** (e.g., 30 minutes) regardless of activity.
- Implement **server-side session invalidation** on logout — do not rely solely on deleting the client-side cookie.
- Protect **password-reset and email-verification tokens** with short expiry windows (≤15 minutes), single-use enforcement, and secure comparison.
- Offer, and where appropriate require, **multi-factor authentication (MFA)** — prefer TOTP or passkeys over SMS.

---

## CSRF Protection

- Use **framework-provided CSRF protection middleware** — do not implement CSRF token generation manually unless thoroughly reviewed.
- For cookie-based session apps, issue a **per-session or per-request CSRF token** that is validated server-side on all state-mutating requests (`POST`, `PUT`, `PATCH`, `DELETE`).
- For API endpoints using **token-based authentication** (e.g., Bearer tokens in the `Authorization` header), CSRF risk is reduced — but verify that no sensitive endpoint is accessible via cookie-only auth.
- Set `SameSite=Strict` or `SameSite=Lax` on session cookies as an additional CSRF mitigation layer.
- Validate the **`Origin` or `Referer` header** on sensitive endpoints as a secondary check where feasible.
- Never use `GET` or `HEAD` requests to perform state-mutating operations.

---

## Security Headers & CORS

Apply the following HTTP response headers on all application responses:

| Header | Recommended Value |
|---|---|
| `Content-Security-Policy` | Strict policy; restrict `script-src`, `object-src`, and `base-uri` at minimum |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` (or `SAMEORIGIN` if framing is required) |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disable unused browser features (camera, microphone, geolocation) |
| `Cache-Control` | `no-store` on sensitive responses (profile pages, admin views) |

**CORS configuration:**
- Define an explicit **`Access-Control-Allow-Origin` allowlist** — never use a wildcard (`*`) for authenticated endpoints.
- Restrict `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers` to only what each endpoint actually requires.
- Only set `Access-Control-Allow-Credentials: true` when strictly necessary, and never in combination with a wildcard origin.
- Validate the incoming `Origin` header server-side against your allowlist before reflecting it in the response.

---

## File Upload Security

- **Validate file type server-side** using magic byte inspection (not just the `Content-Type` header or file extension, both of which are user-controlled).
- Maintain an **allow-list of permitted MIME types** rather than a deny-list of prohibited ones.
- Enforce **maximum file size limits** at both the application and web server/proxy layers.
- **Never store uploaded files within the web root** or any directory served directly by the application server.
- Rename uploaded files to a **server-generated random identifier** before storage — never use the original file name.
- Scan uploaded files with an **antivirus or malware detection** service before making them available to other users.
- Serve user-uploaded content from a **separate domain or CDN** with a strict Content Security Policy to prevent script execution.
- For images, **re-encode through an image processing library** (e.g., Sharp, Pillow) rather than storing and serving the raw upload — this strips embedded malicious payloads.
- Apply **access control checks** on every file retrieval request — do not assume a hard-to-guess URL is sufficient authorization.

---

## Error Handling & Information Disclosure

- **Never expose stack traces, internal paths, database error messages, or framework version strings** in API responses or rendered pages in any environment accessible outside the development machine.
- Return **generic error messages** to clients (e.g., `"An unexpected error occurred."`) and log detailed diagnostics server-side only.
- Use **distinct HTTP status codes** correctly (401 vs. 403, 404 vs. 403) but avoid leaking information about resource existence to unauthorized users — prefer returning 404 over 403 when the resource's existence itself is sensitive.
- Implement a **global error handler** that catches unhandled exceptions and ensures they never produce a raw stack trace in the response body.
- Validate that your **development-only debug modes** (e.g., `DEBUG=True`, `NODE_ENV=development`) are disabled in staging and production environments.
- Avoid leaking **server software and version information** via `Server`, `X-Powered-By`, or similar response headers — suppress or spoof these in your web server configuration.
- **Test error paths explicitly** — run integration tests that deliberately trigger validation failures, auth errors, and 500-level errors to confirm safe error output.

---

## Rate Limiting & Brute Force Protection

- Apply **rate limiting** on all authentication-related endpoints: login, registration, password reset, MFA verification, and email confirmation.
- Implement **exponential backoff or account lockout** after a configurable number of failed login attempts (e.g., 5–10 attempts triggers a temporary lock or CAPTCHA challenge).
- Use **IP-based and account-based rate limiting together** — neither alone is sufficient, as attackers distribute requests across IPs or target many accounts from one IP.
- Apply rate limiting to **all public-facing API endpoints**, not just auth flows — protect search, lookup, and bulk-read endpoints against scraping and enumeration.
- Use a **distributed rate-limiting store** (e.g., Redis) in multi-instance deployments — in-memory counters per instance are ineffective.
- Return `429 Too Many Requests` with a `Retry-After` header rather than silently dropping requests.
- Monitor for **credential stuffing patterns** (high volume of login attempts with low per-account frequency) and consider integrating with breach-credential databases (e.g., HaveIBeenPwned API).
- Protect account enumeration on password-reset endpoints by returning **identical responses** whether or not the submitted email address is registered.

---

# AI Agent Application Security

The following sections apply specifically to applications that incorporate LLM-based agents, autonomous reasoning, or AI-driven tool use.

---

## AI Agent-Specific Threat Model

AI agents introduce attack surfaces beyond traditional web applications. Operators must consider the following threat categories:

| Threat | Description |
|---|---|
| **Prompt Injection** | Malicious input manipulates the agent into executing unintended instructions |
| **Indirect Prompt Injection** | Agent retrieves external content (e.g., web pages, documents) containing embedded adversarial instructions |
| **Privilege Escalation via Agent** | User leverages agent capabilities to access resources beyond their authorization level |
| **Data Exfiltration via Tool Use** | Agent is manipulated into sending sensitive data to unauthorized endpoints |
| **Jailbreaking / System Prompt Leakage** | Adversarial prompts extract system-level instructions or bypass safety guardrails |
| **Autonomous Action Abuse** | Agent takes unintended real-world actions (e.g., sending emails, deleting records) |
| **Model Denial of Service** | Expensive or infinite-loop prompts exhaust API quotas or degrade service availability |
| **Training Data Poisoning** | If fine-tuning is used, malicious data influences model behavior at inference time |

---

## Authentication & Authorization

- **Require authentication** for all endpoints that invoke AI agent functionality.
- Implement **role-based access control (RBAC)** or **attribute-based access control (ABAC)** to restrict what actions users and agents can perform.
- Use **short-lived tokens** (e.g., JWT with tight expiry) rather than long-lived API keys for user sessions.
- Enforce **least privilege** — agents should only have access to the tools, APIs, and data strictly necessary for the current task.
- Implement **per-user and per-session scoping** so one user's agent context cannot bleed into another's.
- Re-authenticate or require explicit confirmation for high-impact agent actions (e.g., deleting data, sending external communications).

---

## Prompt Injection Defense

- **Never trust user input as trusted instructions.** Treat all user-supplied content as untrusted data, even when it is embedded in a prompt.
- Maintain a strict **structural separation** between system instructions and user-provided content in all LLM API calls.
- Apply **input length limits** to prevent token flooding and resource exhaustion.
- Sanitize and validate all inputs before passing them to an LLM or tool.
- When agents browse the web or read external documents, treat retrieved content as **untrusted third-party data** — apply indirect prompt injection mitigations.
- Use **allow-lists over deny-lists** when defining permissible agent actions or tool invocations.
- Consider using **LLM-based input classifiers** or content moderation layers to detect adversarial prompt patterns before they reach the core model.

---

## Data Privacy & Minimization

- **Do not include sensitive personal data** (PII, financial data, health information) in prompts unless absolutely required, and anonymize or pseudonymize where possible.
- Apply the principle of **data minimization** — retrieve and expose only the data an agent needs for a given task.
- Do not persist raw conversation logs containing sensitive user data beyond the minimum retention period required.
- Ensure user data processed by third-party LLM providers is covered by appropriate **Data Processing Agreements (DPAs)**.
- Provide users with **transparency** about what data is sent to AI models and how it is used.
- Implement **data access controls** so agents cannot read datastores beyond a user's own authorized scope.

---

## API & LLM Integration Security

- **Rotate API keys** regularly and immediately upon suspected compromise.
- Store all LLM provider API keys in a **secrets manager** (e.g., AWS Secrets Manager, HashiCorp Vault) — never in source code or environment variable files committed to version control.
- Enforce **rate limiting and quota controls** on LLM API calls to prevent abuse and runaway costs.
- Validate and sanitize **all responses from the LLM** before acting on them or rendering them to users.
- Pin or version-lock the LLM **model identifier** in API calls — model behavior can change between versions.
- Monitor for **unexpected spikes** in token usage, which may indicate prompt injection attacks or abuse.
- Where supported, use **structured outputs** (e.g., JSON mode, tool-call schemas) to reduce the risk of the model producing unintended free-form instructions.

---

## Tool Use & Agent Action Boundaries

When AI agents are equipped with tools (web browsing, code execution, file access, external API calls, etc.):

- Define and enforce an explicit **tool allowlist** — only expose tools that the agent requires.
- Apply **scoped permissions per tool** — e.g., a file-reading tool should not have write access.
- Implement a **human-in-the-loop (HITL) confirmation gate** for any irreversible or high-impact actions (sending emails, making purchases, deleting records, executing code).
- Log every **tool invocation** with the full input, output, and invoking user/session context.
- Apply **timeouts and resource limits** to all tool executions to prevent runaway processes.
- Sandbox code execution environments (e.g., using containers or isolated VMs) to prevent escape from the execution context.
- Validate tool **output schemas** before the agent uses results in subsequent reasoning steps.
- Restrict **network egress** from agent tool environments to known, approved destinations.

---

## Secrets & Credential Management

- **Never hardcode secrets** (API keys, passwords, tokens) in source code, configuration files, or prompt templates.
- Use environment variables injected at runtime via a **secrets management system**.
- Rotate secrets on a regular schedule and immediately following any suspected exposure.
- Apply the **principle of least privilege** to all service accounts and API credentials used by the agent.
- Audit access logs for all secret retrievals.
- Use **short-lived credentials** and dynamic secrets wherever the infrastructure supports it.

---

## Output Sanitization & Safety

- **Treat all LLM output as untrusted** before rendering it in a UI or passing it to another system.
- Apply standard **HTML/JS escaping** when rendering agent responses in a browser to prevent XSS.
- Do not execute LLM-generated code without human review or a sandboxed execution environment with strict resource limits.
- Apply **content safety filters** on agent outputs to detect harmful, inappropriate, or policy-violating content before delivery to users.
- Validate structured outputs (e.g., JSON, SQL, shell commands) against a strict schema before use.
- Prevent **second-order injection** — LLM output that is fed back into another system (e.g., a database query or another prompt) must be sanitized as carefully as primary user input.

---

## Logging, Monitoring & Auditability

- Log all agent **inputs, outputs, tool calls, and errors** with sufficient context for incident investigation.
- Ensure logs are **tamper-resistant** and stored separately from the application runtime.
- Do **not log raw sensitive data** (passwords, PII, API keys) — mask or redact before writing to log systems.
- Implement **real-time alerting** for anomalous agent behavior, including:
  - Unusual token consumption spikes
  - Repeated tool invocation failures
  - Attempts to access out-of-scope resources
  - High-frequency requests from a single user or IP
- Retain audit logs for a period consistent with your regulatory obligations (typically 90 days to 1 year minimum).
- Provide an **audit trail** for all high-impact agent actions, including who triggered them and what was executed.

---

## Dependency & Supply Chain Security

- Pin all **package versions** and use a lock file (e.g., `package-lock.json`, `poetry.lock`).
- Regularly run **dependency vulnerability scans** (e.g., `npm audit`, `pip-audit`, Dependabot, Snyk).
- Vet any **third-party LLM plugins, tools, or MCP servers** before integration — treat them as you would any third-party code dependency.
- Review the **security posture of LLM providers** and third-party tool vendors before integrating them.
- Use **Software Bill of Materials (SBOM)** tooling to maintain visibility into all components.
- Enable automated **pull request scanning** in CI/CD pipelines for newly introduced vulnerabilities.

---

## Incident Response

In the event of a suspected security incident involving the AI agent:

1. **Contain** — Immediately disable or throttle the affected agent endpoint or API key.
2. **Assess** — Determine the scope: what data was accessed, what actions were taken, which users were affected.
3. **Preserve Evidence** — Capture and preserve relevant logs, traces, and LLM API call records before any remediation.
4. **Notify** — Follow applicable breach notification obligations (GDPR 72-hour rule, CCPA, etc.) and notify affected users as required.
5. **Remediate** — Patch the root cause, rotate compromised credentials, and harden affected surfaces.
6. **Review** — Conduct a post-incident review and update threat models, guardrails, and monitoring rules accordingly.

Maintain a documented **incident response runbook** and conduct tabletop exercises at least annually.

---

## Compliance & Regulatory Considerations

Depending on your jurisdiction and industry, AI agent deployments may be subject to:

| Framework / Regulation | Relevance |
|---|---|
| **GDPR / CCPA** | Data privacy obligations for user data processed by AI systems |
| **OWASP Top 10 for LLMs** | Industry standard checklist for LLM application vulnerabilities |
| **NIST AI RMF** | Risk management framework for AI systems |
| **EU AI Act** | Risk-based regulatory requirements for AI systems deployed in the EU |
| **SOC 2 Type II** | Trust service criteria for SaaS and AI-powered services |
| **HIPAA** | Required if agent processes protected health information (PHI) |
| **PCI DSS** | Required if agent handles payment card data |

Review applicable requirements with your legal and compliance teams before production deployment.

---

## Acknowledgements

This policy draws on guidance from:
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/system/files/documents/2023/01/26/NIST-AI-600-1.pdf)
- [Anthropic Usage Policy](https://www.anthropic.com/legal/usage-policy)
- [MITRE ATLAS™ — Adversarial Threat Landscape for AI Systems](https://atlas.mitre.org/)

---

_Last updated: April 2026 — Review annually or following any significant architectural change._

