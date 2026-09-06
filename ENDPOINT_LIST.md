# Faraja API Endpoint List

## Team

Faraja Team

## Downstream Partner

Salama Web App

## Endpoint List

| Method | Path | Purpose | Maps to Need |
|---|---|---|---|
| GET | /memorials | Read memorial information including date, location and relevant cause-of-death information | Need 1: The downstream team needs to access memorial information for GBV awareness activities. |
| GET | /gbv-affected-areas | Read aggregated information about areas associated with deaths caused by gender-based violence | Need 2: The downstream team needs to access information about areas affected by gender-based violence. |
| GET | /memorial-events | Read scheduled funeral and memorial events | Need 3: The downstream team needs to access scheduled funeral and memorial events. |
| GET | /memorials/updates | Read updates to relevant memorial and funeral information | Need 4: The downstream team needs to receive updates when relevant memorial and funeral information changes. |
| GET | /funeral-projects/{id}/contributions | Read donation and contribution information for a specific funeral project | Need 5: The downstream team needs to access donation and contribution information for funeral projects. |
| POST | /awareness-activities | Submit information about a GBV awareness activity associated with a relevant memorial event | Need 6: The downstream team needs to submit awareness activity information for relevant memorial events. |

## REST Design Notes

The endpoints use nouns to represent resources rather than action verbs. HTTP methods are used to represent the operation being performed. GET is used for reading information from Faraja, while POST is used when the downstream team submits a new awareness activity.

Resource names are plural, such as /memorials, /memorial-events, /funeral-projects, and /awareness-activities.

The endpoint /funeral-projects/{id}/contributions uses one level of nesting because contributions are associated with a specific funeral project.

Identifiers are placed in the path when accessing information for a specific resource. Query parameters can be used for filtering or sorting collections where necessary.

The endpoints were derived from the API needs identified during the Week 2 downstream partner interview.

## Non-Functional Considerations

- Information relevant to GBV awareness activities should be kept up to date.

- Donation and contribution information should be close to real-time.

- Authentication should be required when accessing sensitive information.

- Information about GBV-related deaths should be aggregated or anonymized where appropriate to protect personal privacy.

- Memorial, funeral project and contribution information should be updated whenever changes are made.

## Peer Review

The endpoint list was reviewed by another team for REST convention compliance.

### Feedback 1: Funeral listing path

The reviewer mentioned the use of /funeral-listings and suggested using /funeralListings instead.

After reviewing our current endpoint list, we found that our endpoint list does not use /funeral-listings. It uses /funeral-projects instead. Therefore, no change was required for this issue because /funeral-projects is a noun-based resource path.

### Feedback 2: Status endpoint

The reviewer noted that /funeral-projects/{id}/status treats status as a resource and suggested using status as a query parameter.

We incorporated this feedback by removing the /funeral-projects/{id}/status endpoint. The current endpoint list does not treat status as a separate resource.

## Final REST Convention Check

- All endpoint paths use nouns rather than action verbs.

- GET is used for reading resources.

- POST is used for creating a new awareness activity resource.

- Resource names are plural.

- IDs are used when accessing information associated with a specific funeral project.

- Nesting is limited to one level.

- Query parameters can be used for filtering or sorting collections.

- No caller-specific logic is included in the endpoint paths.

- The endpoints map directly to the API needs identified during Week 2.

- The API contains six endpoints in total, including a write endpoint using POST.