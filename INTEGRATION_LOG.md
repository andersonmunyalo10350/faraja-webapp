# Week 10 – Integration Log

## 1. Partner Details

* **Our application:** Faraja
* **Upstream partner:** FundiLink
* **Integration type:** REST API integration
* **Authentication:** API key using the `X-API-Key` header
* **Partner endpoint tested:** `/users`

## 2. Integration Tests and Issues

| No. | What happened / Symptom                                                                                                                                 | Root cause                                                                                         | Fix / Action taken                                                                                 | Whose code?                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 1   | Successfully called FundiLink's `/users` endpoint using the partner's API key. The response returned a list of users and their job-related information. | No issue encountered during this test.                                                             | Confirmed that the partner API was reachable and returned JSON data.                               | No fix required.                    |
| 2   | Subsequent requests to the partner API returned HTTP 502 Bad Gateway, including a request to the root endpoint.                                         | The partner's upstream server or Cloudflare tunnel was unavailable or failing to forward requests. | Reported the issue to the FundiLink partner and requested verification of their server and tunnel. | Partner side – awaiting resolution. |

## 3. Authentication

The integration uses the `X-API-Key` request header. The partner's API key is stored in an environment variable rather than being hardcoded into application code.

Sensitive API keys are not recorded in this document.

## 4. Failure Handling

The partner API became unavailable and returned HTTP 502. This demonstrated the need for Faraja to handle partner-service failures gracefully.

The application should return a clear error message when partner data cannot be retrieved, without crashing or affecting unrelated Faraja routes.

## 5. Collaboration

Communication was maintained with the FundiLink partner to obtain the API base URL and authentication key. The partner was informed of the HTTP 502 errors and asked to investigate the availability of their API and Cloudflare tunnel.

## 6. Current Integration Status

* Initial FundiLink `/users` request: Successful.
* Partner authentication: Successfully used during the initial request.
* Subsequent partner availability: HTTP 502.
* Full end-to-end integration: Not yet confirmed.
* Outstanding action: Restore partner API availability and complete integration testing.

**Conclusion:** The initial API connection was successful and returned FundiLink user data. Subsequent availability problems prevented completion of the remaining live integration tests.

### FundiLink – Partner Unavailable Test

* **Local endpoint:** `GET /api/partner/fundilink/users`
* **Test condition:** FundiLink server/Cloudflare tunnel unavailable.
* **Observed result:** Faraja attempted to contact FundiLink but received a `fetch failed` network error.
* **Fallback response:** HTTP 502 — `{"success":false,"message":"Unable to retrieve FundiLink users"}`
* **Backend log:** `FundiLink request failed: fetch failed`
* **Conclusion:** Faraja successfully handled the unavailable partner service without exposing the API key or crashing the backend.
* **Limitation:** Successful live integration and recovery testing remain pending until FundiLink's server becomes available.

# Week 13 — API Versioning and Integration Update

## 1. API Versioning

Faraja introduced two versions of its partner API:

- V1: GET /v1/memorials returns the original JSON array.
- V2: GET /v2/memorials returns an object containing data and count.

The original unversioned GET /memorials endpoint continues to work using the v1 response format.

## 2. Versioning Tests

The automated versioning tests were executed using Jest and Supertest.

- V1 response structure: Passed.
- Old unversioned endpoint compatibility: Passed.
- V1 unknown-route response: Passed.
- V2 structured response: Passed.
- V2 API-key authentication: Passed.
- V1 deprecation headers: Passed.
- V2 has no deprecation headers: Passed.

Total: 7 tests passed, 0 failed.

## 3. Deprecation Communication

A downstream API deprecation notice was prepared for Team Salama on 10 November 2026.

The notice explains the breaking response-format change, migration steps and planned retirement timeline.

V1 will remain available during presentations on 11 November 2026. Salama's receipt and migration confirmation are still pending.

## 4. Monitoring Evidence

The Faraja /stats endpoint recorded:

- Total requests: 2.
- V1 memorial requests: 1.
- V2 memorial requests: 1.
- Client errors: 0.
- Server errors: 0.
- Error rate: 0%.

These results demonstrate successful access to both versions but do not establish that all downstream partners have migrated.

## 5. FundiLink Integration Update

The earlier FundiLink availability issue was subsequently resolved.

Faraja successfully called the upstream FundiLink /users endpoint using API-key authentication and retrieved four user records.

The Faraja integration endpoint GET /api/partner/fundilink/users also returned a successful response containing the upstream data.

FundiLink's actual v2 migration notice and contract have not yet been received. Therefore, the upstream v2 migration and related compatibility tests remain pending.

## 6. Outstanding Actions

1. Send the deprecation notice to Salama and obtain confirmation.
2. Obtain FundiLink's actual v2 contract and migration notice.
3. Complete upstream v2 integration and rollback testing when the contract is available.
4. Continue monitoring v1 and v2 usage before considering v1 retirement.


