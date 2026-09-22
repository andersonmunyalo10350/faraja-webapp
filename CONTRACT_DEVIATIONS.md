# Contract Deviations

## GET /gbv-affected-areas

### Current behaviour
The endpoint returns an empty JSON array:

[]

### Reason
The current Faraja database does not contain a dedicated table or dataset for GBV-affected areas or GBV case counts.

### Contract impact
The OpenAPI contract requires an array of `GBVAffectedArea` objects containing `area` and `numberOfCases`. The endpoint currently returns an empty array because there are no corresponding records available in the existing database.

### Decision
No GBV statistics were fabricated. The contract was kept unchanged, and the limitation was documented. A dedicated GBV data source can be integrated in a future iteration.

## Week 6 — POST /awareness-activities

### Contract status

No contract changes were required.

### Implementation

The POST /awareness-activities endpoint was implemented according to the existing OpenAPI contract. The endpoint returns 201 Created when a valid awareness activity is successfully created.

### Validation

The endpoint validates all required fields, data types, non-empty values, optional date format, and memorial event existence before writing to the database. Invalid requests are rejected with 400 Bad Request and do not create database records.

### Testing

Valid and invalid requests were tested. The successful requests returned 201 Created, while invalid requests returned 400 Bad Request. Repeated valid POST requests were also tested successfully.

### Decision

The OpenAPI contract accurately describes the implemented endpoint, so no changes were made to openapi.yaml.
