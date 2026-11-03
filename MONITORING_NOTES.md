# Week 12: Monitoring Notes

## Part A: Initial Predictions

### 1. Which endpoint do I think will be the slowest, and why?

I predict that `GET /api/funerals` will be among the slowest endpoints because retrieving funeral records may involve database queries and returning multiple records.

### 2. Which endpoint do I think will produce the most errors, and why?

I predict that `GET /api/tasks` may produce the most errors because requests may fail when authentication is missing or invalid, or when the requested data cannot be found.

These are initial predictions and will be compared with the actual monitoring results in Part E.


## Part D: Traffic Generation Results

I used the traffic.js script to generate 60 requests against the Faraja API.

### Observed Results

- Total requests sent: 60
- HTTP responses received: 60
- Network failures: 0
- HTTP 401 responses: 60
- Successfully authenticated requests: 0 verified

All requests returned HTTP 401, including requests using the configured API keys. This indicates an unresolved API authentication issue.

### Part E: Analysis and Recommendations

The initial predictions could not be fully verified because all requests were rejected during authentication. Consequently, endpoint performance and error comparisons could not be reliably established.

**Hypothesis:** The API may have an issue loading or validating configured API keys.

**Next check:** Inspect the API-key configuration, authentication middleware and request headers, then repeat the traffic test using a verified key.

**Production alert:** Alert when HTTP 5xx errors exceed 5% of requests over five minutes. Investigate server logs, database connectivity and external API dependencies.