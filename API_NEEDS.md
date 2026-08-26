# API Needs

## Team
Faraja Team

## Downstream Partner Needs

1. Create memorials.
2. Access donation information.
3. Create funeral projects and allow contributions.
4. Receive real-time donation updates.

## API Needs Statements

1. The downstream team needs to create memorials in order to provide a dedicated page for remembering and sharing information about the deceased.

2. The downstream team needs to read donation records in order to display the contributions made towards a funeral project.

3. The downstream team needs to create funeral projects in order to organize funeral-related activities and allow people to contribute towards them.

4. The downstream team needs to receive real-time donation updates in order to display the current contribution amount and progress of a funeral project.

5. The downstream team needs to read individual contribution details in order to track how much has been contributed towards a funeral project.

6. The downstream team needs to read the status of funeral projects in order to show users whether a project is active, completed, or closed.

## Non-Functional Details

- Donation information should be close to real-time.
- Donation and contribution data may be accessed frequently.
- Authentication should be required when accessing sensitive donation and user information.
- Memorial and funeral project information should be updated whenever changes are made.

## Sanity Check

The API needs identified by the downstream partner map back to the resources and actions identified in our Week 1 audit. Memorials, donations, funeral projects and contributions are all resources or actions that are part of our application. The downstream partner's requirements therefore provide a valid basis for planning our API.

## Reflection

The partner interview helped us understand that not every feature in our application needs to be exposed through the API. What surprised us was that the downstream team was particularly interested in memorials, funeral projects and donation information rather than requiring access to every resource in our application. We also realized that donation information needs to be relatively up-to-date because users need to see the current contribution progress. This showed us why it is important to understand the actual needs of the API consumer before designing endpoints.