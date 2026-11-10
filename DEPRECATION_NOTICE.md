# API Deprecation Notice

**To:** Team Salama (Downstream Partner)
**From:** Faraja Integration Team
**Date:** 10 November 2026
**Subject:** Faraja Partner API v1 Deprecation — Migration to v2

## 1. Summary

Faraja is introducing API version 2 (v2) and announcing the
deprecation of the existing v1 memorials endpoint.

The v1 endpoint will remain available during the presentations
on 11 November 2026. The planned retirement date is
12 November 2026.

## 2. What Is Changing?

The GET /memorials endpoint currently returns a JSON array
directly.

The new GET /v2/memorials endpoint returns an object containing
the memorial records under `data` and their total number under
`count`.

This is a breaking change for clients that expect the response
to be an array.

## 3. Why Are We Making This Change?

The new response provides additional metadata, including the
total number of memorial records, and establishes a clearer
structure for future API improvements.

## 4. Response Examples

### Before — v1

GET /v1/memorials

[
  {
    "id": 4,
    "name": "John Kamau",
    "date": "2025-05-12",
    "location": "new baptist church"
  }
]

### After — v2

GET /v2/memorials

{
  "data": [
    {
      "id": 4,
      "name": "John Kamau",
      "date": "2025-05-12",
      "location": "new baptist church"
    }
  ],
  "count": 1
}

## 5. Migration Steps

1. Update the integration to call GET /v2/memorials.
2. Read memorial records from the `data` property.
3. Use the `count` property when the total number of records is needed.
4. Continue including the X-API-Key authentication header.
5. Test the updated integration before retiring v1.

## 6. Migration Timeline

- 10 November 2026: Deprecation notice issued.
- 11 November 2026: Presentations. Both v1 and v2 remain available.
- 12 November 2026: Planned v1 retirement.

The v1 endpoint will remain available through the presentations
to avoid disrupting demonstrations.

## 7. Questions and Confirmation

Please confirm receipt of this notice and indicate whether
your team can complete the migration to v2 before the planned
retirement date.

For questions or assistance, contact the Faraja Integration Team.
