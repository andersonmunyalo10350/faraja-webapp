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
