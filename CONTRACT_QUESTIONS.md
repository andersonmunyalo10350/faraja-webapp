# Contract Questions

## Questions about the FundiLink API Contract

1. For `POST /jobs`, what are the allowed values for the `payType` field? Should it be restricted using an enum, for example `fixed` or another defined payment type?

2. For `POST /jobs`, what format should the `duration` field use? Is it expected to be free-text such as `~2 hours`, or should the API use a standardized format such as a number of minutes?

3. For `POST /jobs`, what response should the API return when the request contains missing or invalid required fields such as `title`, `pay`, or `employerId`? Should a `400 Bad Request` response be documented?