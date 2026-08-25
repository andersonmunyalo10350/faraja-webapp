# Team Charter — Faraja (Group 13)

## 1. Team name and members

Team name: Faraja Team / Group 13

- Anderson Munyalo — API Lead (endpoint/contract decisions)
- Willis Adika — Backend Dev(s) (endpoints and database logic)
- Naphtali Maina — Integration/QA Lead and Docs/DevOps Lead (testing, partner-team API validation, README, environment setup, deployment)

## 2. Project summary

Faraja is a funeral and memorial fundraising platform built to help families and community organizers manage a memorial campaign from creation to completion. The app allows users to create a funeral or memorial page, coordinate committee members, assign and track tasks, record expenses, and collect donations (including M-PESA-based contributions) toward a fundraising goal. It is designed for grieving families, funeral organizers, community committees, and contributors who want a transparent, centralized way to support a memorial project and monitor financial activity.

## 3. Part B — Audit of the existing app

Before exposing the API, we audited the current application and identified the main data resources and user actions currently supported by the codebase.

### A. Resources / “things” the app stores

The app stores the following core resources in the database:

- Users
  - user identity, email, password hash, phone, profile photo, role, active status
- Roles
  - seeded role types such as admin, family, contributor, vendor, and committee
- Password reset tokens
  - secure reset tokens for forgotten-password flows
- Funeral projects / memorials
  - deceased details, funeral date/time, venue, biography, photos, fundraising goal, amount raised, privacy, status
- Committee members
  - funeral committee name, role, contact details, location, membership to a funeral project
- Tasks
  - task title, description, priority, status, assignee, due date, linked to a funeral project
- Contributions / donations
  - donor name, amount, payment method, anonymous flag, message, status, linked to a funeral project and user
- Transactions
  - payment transaction metadata, phone number, M-PESA checkout request ID, callback payload, payment status
- Expenses
  - description, category, amount, status, paid-by, notes, expense date, linked to a funeral project

Notes:
- The app treats each funeral project as a separate fundraising and coordination unit.
- Most resources are scoped to one funeral project and are protected by ownership checks.
- There is no advanced search/filter service implemented yet; most listing is by owner or by funeral ID.

### B. User actions currently supported

#### 1) Auth and account actions

- Register a new user account
- Log in with email/password
- Fetch the current authenticated user profile
- Request a password reset email
- Reset a forgotten password using a token
- View own profile
- Update profile information and profile photo
- Delete a user profile

#### 2) Funeral project / memorial actions

- Create a funeral project (memorial campaign)
- View all memorials created by the logged-in user
- View public active memorials for public browsing / donation entry
- View a single funeral project by ID
- Update funeral project details
- Delete a funeral project
- View a dashboard summary for a funeral (raised, goal, expenses, contributors, tasks, activity)
- View upcoming days remaining until the funeral date

#### 3) Committee member actions

- View all committee members for a funeral
- Add a committee member
- Update committee member details
- Remove a committee member from the funeral team

#### 4) Task actions

- View all tasks for a funeral
- Create a new task
- Update a task
- Mark a task as complete
- Delete a task

#### 5) Expense actions

- View all expenses for a funeral
- See total paid and pending expense totals
- Add a new expense
- Update an expense record
- Delete an expense record

#### 6) Donation / contribution actions

- Create a contribution/donation for a funeral
- Support M-PESA payment initiation via STK push
- Support card, bank, or cash contribution recording
- Mark M-PESA transaction as pending until callback confirmation
- Receive M-PESA callback confirmation/failure updates
- View contributions for a funeral
- View a financial summary by payment method
- View fundraising and expense totals for a funeral

#### 7) Internal system actions

- Seed roles during setup
- Record password reset tokens and invalidate them after use
- Update funeral raised amount when a donation is confirmed
- Trigger best-effort notifications for new contributions and password resets

### C. Current API shape and ownership model

The app is organized around the following domains:

- /api/auth — registration, login, password reset, current-user lookups
- /api/users/profile — profile management and contribution history
- /api/funerals — memorial lifecycle, dashboard data, nested committee/expense/task views
- /api/tasks — task update and completion actions
- /api/expenses — per-expense updates and deletion
- /api/donations — contribution creation, callback handling, donor reports

Important behavioral pattern:
- Most sensitive writes are protected by authentication and ownership checks.
- Public access is limited to active memorial listing and donation submission flows.
- Donations are treated as both a user action and a financial update to the funeral project.

## 4. Ring position and integration boundaries

We are Group 13.

- Upstream consumer: We consume APIs from Group 12.
- Downstream provider: Group 14 will consume our API.

This means our team is positioned as the integration consumer for Group 12 and the API provider for Group 14. We will coordinate contract expectations with Group 12 while ensuring our API design and endpoints remain consistent, documented, and usable by Group 14.

## 5. Working principles

- Keep API contracts clear and versionable.
- Validate and document all payloads and response shapes.
- Protect sensitive data and enforce role/ownership checks.
- Maintain a clear separation between frontend behavior and backend business logic.
- Test integration flows with partner-group APIs before exposing or finalizing contracts.

## 6. Team commitments

- Anderson will own API design and contract decisions.
- Willis will own backend implementation and database logic.
- Naphtali will own integration testing, QA validation, and project documentation/deployment readiness.

This charter will guide how we design, document, test, and expose the Faraja API as the project evolves