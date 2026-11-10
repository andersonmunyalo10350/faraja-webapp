# API Versioning Notes

## Part A — Choosing the Breaking Change

### 1. Description of the breaking change
The GET /memorials endpoint will change from returning a bare JSON array to returning an object containing a data array and a count field.

### 2. Why this change is worth breaking
The new response provides additional metadata, including the total number of memorials returned. This makes the API response more informative and easier for partner applications to consume. The old response format will remain available through v1 to maintain backward compatibility.

### 3. Predicted impact on partner code
A downstream partner currently expecting a JSON array may use code such as:

const memorials = await response.json();
memorials.map(memorial => memorial.name);

This will fail when v2 returns an object instead of an array because the map() method will no longer be available directly on the response.

The exact downstream source line still needs confirmation against the partner's implementation.

### 4. Version response formats

V1:
[
  {
    "id": 1,
    "name": "Example Memorial",
    "date": "2026-11-10",
    "location": "Nairobi"
  }
]

V2:
{
  "data": [
    {
      "id": 1,
      "name": "Example Memorial",
      "date": "2026-11-10",
      "location": "Nairobi"
    }
  ],
  "count": 1
}

## Part F — Monitoring and Reflection

### Monitoring Evidence

The `/stats` endpoint was checked after implementing API versioning.

| Metric | Result |
|---|---:|
| Total requests | 2 |
| GET /v1/memorials | 1 |
| GET /v2/memorials | 1 |
| Client errors | 0 |
| Server errors | 0 |
| Error rate | 0% |
| V1 average response time | 19.6 ms |
| V2 average response time | 3.4 ms |

### Reflection

Implementing API versioning demonstrated the importance of maintaining backward compatibility when introducing breaking changes. Changing the memorials response from a bare JSON array to an object containing data and count would break existing partner applications that directly use array methods such as map(). Introducing separate v1 and v2 endpoints allows existing consumers to continue using the original response while new consumers benefit from the improved structure.

The monitoring results showed that both versions were successfully accessed, with no client or server errors recorded in the captured statistics. V2 also recorded a lower average response time in this small sample. However, these results alone cannot establish that v1 is safe to retire because they do not confirm whether all downstream partners have migrated. The deprecation headers and migration notice provide partners with information about the change and its timeline.

This exercise has taught me that API versioning is not simply changing endpoint URLs. It also involves testing, documentation, communication, monitoring and a controlled migration process. Keeping v1 available during presentations protects existing integrations while partners prepare to adopt v2.

### Part F Conclusion

V1 and v2 are operational. Retirement of v1 should only proceed after downstream migration has been confirmed.

