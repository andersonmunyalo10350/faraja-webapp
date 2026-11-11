# Week 14: Individual Retrospective Report

## 1. The Hardest Part of the Lifecycle

The most challenging stage of the Faraja project for me was Integration. Building individual API endpoints and testing them locally was manageable compared to connecting our application to an external partner's API and ensuring that the communication worked correctly. Integration required coordination between our team and FundiLink, our upstream partner, because both systems had to agree on the correct endpoint, authentication method, API key and response structure.

One major challenge was distinguishing problems originating from our application from those originating from the partner's server. For example, a request could fail because of an incorrect API key, an unavailable server, an incorrect URL or a problem with the network. We had to test the partner's endpoint independently before testing it through our own backend. This helped us isolate problems rather than immediately assuming that our code was responsible.

Another challenge was ensuring that the data retrieved from FundiLink was actually displayed in our frontend. A successful backend response alone was not enough; we needed to connect the response to the frontend and display the user records meaningfully. This stage taught me that integration requires more than writing code. It requires communication, verification and patience when working with systems developed by different teams.

## 2. One Real Cross-Team Issue

One cross-team issue occurred on 11 November 2026 while testing our connection to FundiLink using an updated Cloudflare URL.

Initially, the root endpoint returned HTTP 200 OK with the message "FundiLink API is running". However, when we requested the actual `/users` endpoint using the `X-API-Key` header, the server returned HTTP 401 Unauthorized with the message "Missing or invalid API key".

This was important because it showed that the server was reachable, but authentication was failing. We therefore knew that the problem was not simply that the FundiLink server was offline. We needed to establish whether the key being supplied matched the key configured on their backend.

We communicated the issue to our FundiLink teammate and requested verification of the authentication configuration and a fresh API key. After receiving the correct key, we tested the `/users` endpoint again. The request succeeded and returned four user records: John Kamau, Peter Mwangi, Grace Wanjiru and Brian Otieno.

We then updated Faraja's partner configuration and tested our own integration endpoint, `/api/partner/fundilink/users`, to confirm that our backend could retrieve the upstream records.

This experience taught me the importance of testing external endpoints independently, communicating errors using actual HTTP status codes, and never assuming that a reachable server means that the entire integration is working.

## 3. What I Would Design Differently

If I were starting the project again, I would place greater emphasis on agreeing on integration requirements and response structures earlier in the development lifecycle. I would ensure that both teams clearly document their endpoint paths, authentication headers, response fields, error formats and versioning expectations before implementing the integration.

I would also introduce automated integration tests much earlier. Testing only after implementing several features makes it harder to identify where a problem originated. Early tests using realistic partner responses would help detect differences in field names and response formats before they affect the frontend.

Another improvement would be to establish a clear versioning and migration agreement with our partners from the beginning. During Week 13, we implemented Faraja V1 and V2 to demonstrate how breaking changes can be introduced without immediately disrupting existing consumers. However, the official FundiLink V2 contract was not available to complete our upstream migration. I would therefore agree on versioning requirements and migration timelines with partners much earlier.

I would keep our use of environment variables for API keys and partner URLs, the OpenAPI documentation, and the separation between frontend and backend responsibilities. These decisions helped make the application more secure, maintainable and easier to integrate with external systems.

## 4. My Contribution

I would rate my individual contribution at **8/10**. Throughout the project, I actively participated in developing and integrating Faraja, with particular involvement in the frontend and partner integration work.

I worked on the frontend interfaces and the FundiLink integration experience, ensuring that the application could present information retrieved from the upstream partner. I also participated in testing the API endpoints, checking authentication responses, configuring the partner connection and verifying that the retrieved user records could pass through our backend and appear in the application.

I contributed to understanding and demonstrating important API lifecycle requirements, including authentication, rate limiting, monitoring, resilience, API documentation and versioning. I also worked on verifying the V1 and V2 memorial endpoints, checking backward compatibility, and running the versioning automated tests.

However, I recognise that my contribution was not perfect. Some tasks depended on coordination with teammates, particularly when obtaining partner information and confirming that external services were available. I also relied on assistance when troubleshooting unfamiliar errors and understanding certain backend implementation details. My teammates contributed to other parts of the application and helped ensure that the overall system came together.

I believe I demonstrated commitment by continuing to investigate problems instead of abandoning features when they failed. The project improved my confidence in debugging, API integration, teamwork and understanding how independently developed systems communicate.

Overall, Faraja taught me that software development is not only about producing working code. It also involves communication, accountability, testing, documentation and being honest about limitations. These are lessons I will carry into future software development projects.