# Faraja API — Week 8 Blind Test Report

**Project:** Faraja Digital Funeral Planning and Memorial Platform
**API Version:** 1.0.0
**Documentation:** `README.md` and `openapi.yaml`
**Testing Environment:** Local development environment
**Date:** 13 October 2026

## 1. Objective

The objective of the blind API testing exercise is to assess whether another developer can understand and use an API using its README documentation without relying on explanations from the original developer.

The assessment focuses on documentation clarity, endpoint accessibility, request formats, response structures, and error handling.

## 2. Testing Approach

The documented API endpoints were reviewed against the available implementation. Requests were made to the local API to verify the documented routes and examine their responses.

The following endpoints were tested:

| Endpoint                                 | Method | Test Case                                       | Observed Result                     |
| ---------------------------------------- | ------ | ----------------------------------------------- | ----------------------------------- |
| `/memorials`                             | GET    | Retrieve memorial information                   | HTTP 200; memorial data returned    |
| `/gbv-affected-areas`                    | GET    | Retrieve GBV-affected areas                     | HTTP 200; empty array returned      |
| `/memorial-events`                       | GET    | Retrieve scheduled memorial events              | HTTP 200; event data returned       |
| `/memorials/updates`                     | GET    | Retrieve memorial updates                       | HTTP 200; update data returned      |
| `/funeral-projects/1/contributions`      | GET    | Retrieve contributions for an existing project  | HTTP 200; empty array returned      |
| `/funeral-projects/999999/contributions` | GET    | Request contributions for a nonexistent project | HTTP 404; error message returned    |
| `/awareness-activities`                  | POST   | Submit a request with missing required fields   | HTTP 400; validation error returned |
| `/awareness-activities`                  | POST   | Submit an invalid event identifier              | HTTP 400; validation error returned |

## 3. Findings

The tested GET endpoints returned responses consistent with their implemented behavior. The contributions endpoint correctly returned a 404 response for a nonexistent funeral project.

The awareness-activities endpoint rejected requests with missing required fields and invalid event identifiers. These responses demonstrate that the API implements basic request validation and error handling.

The GBV-affected-areas endpoint returned an empty array. Although this is a valid response structure, the absence of data should be documented so that API consumers understand the current limitation.

## 4. Documentation Assessment

The API documentation was rendered using Swagger Editor. The documented endpoints, request methods, schemas, and response definitions provide a starting point for developers integrating with the API.

The README should provide the base URL, setup instructions, sample requests, example responses, and explanations of common errors. The quickstart command should be tested exactly as written.

## 5. Recommendations

1. Keep the README examples consistent with actual API responses.
2. Document required fields and validation rules for POST requests.
3. Include examples of successful and unsuccessful requests.
4. Explain when an endpoint may return an empty array.
5. Keep the OpenAPI specification synchronized with the implementation.
6. Conduct an independent blind test with another team's API and record the actual results before declaring that step complete.

## 6. Conclusion

The completed local tests verified the responses and basic error handling of the listed Faraja API endpoints. Swagger Editor also rendered the API specification successfully.

These checks support the documentation and implementation review. An independent blind test using another team's README remains a separate validation step.
