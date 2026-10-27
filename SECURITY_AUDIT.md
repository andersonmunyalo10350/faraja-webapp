# Faraja API Security Audit

## 1. API Authentication

The partner API uses API keys supplied through the `X-API-Key` HTTP header. The backend validates requests against keys configured in the `API_KEYS` environment variable.

* Requests without an API key are rejected with HTTP 401.
* Requests with an invalid API key are rejected with HTTP 401.
* Requests with a valid API key can access protected partner endpoints.
* The `/api/health` endpoint remains publicly accessible.

## 2. Rate Limiting

Partner API requests are rate-limited to 100 requests per minute.

When the limit is exceeded, the API returns HTTP 429, includes a `Retry-After` header, and provides a JSON error response.

The rate limiter was tested temporarily with a limit of three requests per minute. The first three requests returned HTTP 200, while requests four and five returned HTTP 429. The configured limit was subsequently restored to 100 requests per minute.

## 3. Sensitive Data and Access Control

Review API responses and database queries to ensure that passwords, authentication tokens, API keys, and other sensitive information are not exposed.

Verify that authenticated users cannot access records belonging to other users merely by changing resource IDs in requests.

Write endpoints should validate permitted fields and must not allow clients to grant themselves administrative privileges or modify protected ownership fields.

**Verification status:** These checks require confirmation against the relevant controllers, database queries, and authorization middleware before they can be considered passed.

## 4. Secret Management

API keys and other credentials must be stored in environment variables rather than committed to source control.

* Keep the actual `.env` files out of Git.
* Use placeholders in `.env.example`.
* Do not include real API keys in source code, README files, logs, or test output.
* Provide each API consumer with its own key and share keys privately.

## 5. Test Evidence

Authentication tests passed for missing, invalid, and valid API keys. The public health endpoint returned HTTP 200.

The rate-limiting test passed: three requests were accepted under the temporary test limit, and the next two requests returned HTTP 429 with a `Retry-After` value of 60 seconds.

## 6. Remaining Verification

Before declaring the security audit complete:

* Inspect response fields for sensitive information.
* Verify ownership and authorization checks on protected resources.
* Inspect write endpoints for unauthorized field updates.
* Confirm no real secrets are tracked by Git.
* Run the automated test suite and document any remaining failures.
