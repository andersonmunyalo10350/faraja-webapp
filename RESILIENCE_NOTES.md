# Week 11: Resilience — When Your Partner Is Slow, Flaky, or Gone

## 1. Tests and Observations

| Test                  | Expected behaviour                               | Actual observation                                                               |
| --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Partner in OK mode    | Returns data successfully.                       | Stand-in partner returned the task records successfully.                         |
| Partner in Slow mode  | Request times out after 1500 ms.                 | Timeout is configured in the partner request.                                    |
| Partner in Flaky mode | Retries twice and succeeds on the third attempt. | Independently tested `fetchWithRetry`: two failed attempts followed by HTTP 200. |
| Partner in Error mode | Stops after two retries and reports failure.     | Retry logic is configured to stop after two retries.                             |

## 2. Timeout and Retry Configuration

* Timeout: 1500 milliseconds.
* Maximum retries: 2.
* Initial retry delay: 200 milliseconds.
* Second retry delay: 400 milliseconds.
* Retryable status codes: 429, 500, 502, 503 and 504.
* Retry-After: respected for HTTP 429, up to 5 seconds.
* Retries are restricted to GET requests.

The worst-case wait when all three attempts time out is:

(3 × 1500) + 200 + 400 = 5100 milliseconds.

The 1500 ms timeout limits how long an individual request can wait. Exponential delays prevent repeated requests from overwhelming an already struggling partner.

## 3. User Impact

Without resilience measures, a student using the Faraja application could experience delays when accessing information supplied by an external partner. If the partner becomes slow, the application may keep waiting and make the feature feel unresponsive. If the partner returns temporary errors, the student may receive an error even when another attempt could succeed. The timeout and retry mechanisms improve reliability by limiting waiting time and allowing temporary failures to recover. A saved-data fallback and visible stale-data banner remain part of the intended user experience but require further integration and verification.

## 4. Limitations and Future Improvement

A circuit breaker is a mechanism that temporarily stops requests to a partner after repeated failures and periodically tests whether the partner has recovered. It was not implemented in this lab; the current retry mechanism can still make up to three attempts for each eligible request.

## 5. Integration Limitations

The stand-in partner and retry helper were tested independently. The Faraja partner endpoint continued returning HTTP 502 during integration testing, and the expected stand-in request logs were not observed during the final test. Therefore, successful end-to-end integration, the saved-data fallback, and the frontend stale-data banner have not been verified. The real FundiLink availability test also remains outstanding.
