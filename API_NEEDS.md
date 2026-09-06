# API Needs

## Team

Faraja Team

## Downstream Partner

Salama Web App

## Downstream Partner Needs

1. Access memorial information for GBV awareness activities.

2. Access information about areas affected by gender-based violence.

3. Access scheduled funeral and memorial events.

4. Receive updates when relevant memorial and funeral information changes.

5. Access donation and contribution information for funeral projects.

6. Submit awareness activity information for relevant memorial events.

## API Needs Statements

1. The downstream team needs to access memorial information, including the memorial date, location and relevant cause-of-death information, in order to identify memorials related to gender-based violence and coordinate awareness activities with the affected community.

2. The downstream team needs to access aggregated information about areas associated with deaths caused by gender-based violence in order to identify areas that are highly affected by gender-based violence and plan targeted awareness and support activities.

3. The downstream team needs to access scheduled funeral and memorial events in order to identify upcoming events where Salama can coordinate attendance and provide gender-based violence awareness and community education.

4. The downstream team needs to receive updates when relevant memorial or funeral information changes in order to keep its awareness and support activities synchronized with the latest information provided by Faraja.

5. The downstream team needs to access donation and contribution information associated with funeral projects in order to understand the contribution progress of relevant funeral projects.

6. The downstream team needs to submit awareness activity information for relevant memorial events in order to coordinate gender-based violence awareness activities with Faraja.

## Non-Functional Details

- Information relevant to GBV awareness activities should be kept up to date.

- Donation and contribution information should be close to real-time.

- Authentication should be required when accessing sensitive information.

- Information about GBV-related deaths should be aggregated or anonymized where appropriate to protect personal privacy.

- Memorial, funeral project and contribution information should be updated whenever changes are made.

## Sanity Check

The API needs identified by the downstream partner map back to resources and information maintained by the Faraja application. Faraja creates and maintains memorial, funeral, contribution and donation information, while the Salama Web App accesses the relevant information through the API. The API therefore allows Salama to use Faraja data for gender-based violence awareness and community support activities without creating or directly managing Faraja resources.

## Reflection

The partner interview helped us understand that the API needs should be based on what the downstream team needs to access from Faraja rather than on features that the downstream team would create in Faraja. We also learned that Faraja can provide useful information such as memorial dates, locations and relevant causes of death to help Salama identify opportunities for gender-based violence awareness. In addition, aggregated information can help identify areas that are highly affected by gender-based violence. This showed us that an API should expose only the information that the partner actually needs while also considering privacy, security and timely updates.