# Faraja API Endpoint List

## Team

Faraja Team

## Endpoint List

| Method | Path | Purpose | Maps to Need |
|---|---|---|---|
| POST | /memorials | Create a new memorial | Need 1: The downstream team needs to create memorials in order to provide a dedicated page for remembering and sharing information about the deceased. |
| GET | /donations | Read donation records for funeral projects | Need 2: The downstream team needs to read donation records in order to display the contributions made towards a funeral project. |
| POST | /funeral-projects | Create a new funeral project | Need 3: The downstream team needs to create funeral projects in order to organize funeral-related activities and allow people to contribute towards them. |
| GET | /funeral-projects/{id}/donations | Read current donations for a funeral project | Need 4: The downstream team needs to receive real-time donation updates in order to display the current contribution amount and progress of a funeral project. |
| GET | /contributions/{id} | Read details of an individual contribution | Need 5: The downstream team needs to read individual contribution details in order to track how much has been contributed towards a funeral project. |
| GET | /funeral-projects?status=active | Read funeral projects filtered by their status | Need 6: The downstream team needs to read the status of funeral projects in order to show users whether a project is active, completed, or closed. |

## REST Design Notes

The endpoints use nouns to represent resources and HTTP methods to represent actions. GET is used for reading data, while POST is used for creating new resources.

Resource names are plural, such as /memorials, /donations, /funeral-projects, and /contributions. Individual resources are identified using an ID where necessary.

Query parameters are used for filtering collection resources. For example, the status of funeral projects is handled using ?status=active rather than treating status as a separate resource.

The endpoints were derived from the API needs identified during the Week 2 downstream partner interview.

## Non-Functional Considerations

- Donation information should be close to real-time.
- Donation and contribution data may be accessed frequently.
- Authentication should be required when accessing sensitive donation and user information.
- Memorial and funeral project information should be updated whenever changes are made.

## Peer Review

The endpoint list was reviewed by another team for REST convention compliance.

### Feedback 1: Funeral listing path

The reviewer mentioned the use of /funeral-listings and suggested using /funeralListings instead.

After reviewing our current endpoint list, we found that our endpoint uses /funeral-projects rather than /funeral-listings. Therefore, no change was required for this issue because /funeral-projects is already a noun-based resource path.

### Feedback 2: Status endpoint

The reviewer noted that /funeral-projects/{id}/status treats status as a resource and suggested using status as a query parameter.

We incorporated this feedback by changing the endpoint to:

GET /funeral-projects?status=active

This uses the status value as a filter on the funeral-projects collection rather than treating status as a separate resource.

## Final REST Convention Check

- All endpoint paths use nouns rather than action verbs.
- GET is used for reading resources.
- POST is used for creating resources.
- Resource names are plural.
- IDs are used when accessing individual resources.
- Status is handled as a query parameter because it is used to filter funeral projects.
- The endpoints map directly to the API needs identified during Week 2.
- The API contains six endpoints in total, including write endpoints using POST.