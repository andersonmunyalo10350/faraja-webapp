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
