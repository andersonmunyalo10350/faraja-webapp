# Faraja — Funeral Management Platform

A full-stack funeral/memorial management app with a **React (Vite) frontend** and **Node.js + Express + MySQL backend**.

---

## Prerequisites

| Tool | Version | Why |
|------|---------|-----|
| [XAMPP](https://www.apachefriends.org/) | Latest | Runs MySQL + management GUI |
| [Node.js](https://nodejs.org/) | 18+ | Runs backend API and frontend dev server |
| Git | Any | Clone the repo |

---

## Setup

### 1. Clone

```bash
git clone <repo-url> faraja
cd faraja
```

### 2. Database

#### XAMPP
1. Open **XAMPP Control Panel** → click **Start** next to **MySQL**
2. Click **Admin** (opens phpMyAdmin)
3. Click **Import** → **Choose File** → select `js/Backend/database/schema.sql`
4. Scroll down → click **Import**

This creates the `faraja_db` database with all tables and seed data.

### 3. Backend

```bash
cd js/Backend
npm install
npm start        # or: npm run dev (auto-restart)
```

You should see:
```
🚀 Faraja API listening on http://localhost:5000
✅ MySQL connected
```

### 4. Frontend

Open a **second terminal** and run:

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Usage

1. Register an account at `/register`
2. Log in at `/login`
3. Create a memorial from the **Dashboard** → **New Funeral**
4. Browse public memorials at `/memorials`
5. Browse vendors at `/vendors`
6. Make a test donation from any memorial page
7. Manage committee, tasks, financials from the sidebar

---

## Project Structure

```
faraja/
├── client/                        # React SPA (Vite)
│   ├── src/
│   │   ├── api/                   # Axios API modules
│   │   ├── components/ui/         # Reusable UI components
│   │   ├── contexts/              # Auth, Funeral, Toast contexts
│   │   ├── layouts/               # PublicLayout, DashboardLayout, Sidebar
│   │   ├── pages/                 # All route pages
│   │   │   ├── auth/              # Login, Register, Forgot/Reset password
│   │   │   ├── dashboard/         # FuneralDashboard, Tasks, Committee, etc.
│   │   │   ├── memorial/          # Memorial, Donate, MemorialDirectory
│   │   │   ├── vendors/           # VendorDirectory, VendorDetail, VendorDashboard
│   │   │   ├── profile/           # Profile, EditProfile
│   │   │   └── admin/             # AdminDashboard
│   │   └── styles/                # Global CSS
│   ├── vite.config.js             # Vite config with /api proxy
│   └── package.json
├── js/
│   └── Backend/
│       ├── server.js              # Express entry point
│       ├── .env                   # Environment config
│       ├── config/db.js           # MySQL connection pool
│       ├── controllers/           # Route handlers
│       ├── middleware/auth.js     # JWT verification
│       ├── routes/                # Express routers
│       ├── utils/                 # Response helpers
│       └── database/schema.sql    # MySQL schema + seed data
└── README.md
```

---

## Environment Variables

| Variable | Default | Notes |
|----------|---------|-------|
| `PORT` | `5000` | Backend API port |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_USER` | `root` | MySQL user |
| `DB_PASSWORD` | *(empty)* | MySQL password |
| `DB_NAME` | `faraja_db` | Created by `schema.sql` |
| `JWT_SECRET` | `change_this_to_a_long_random_string` | **Change in production** |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `CLIENT_URL` | `http://localhost:3000` | CORS origin — matches Vite dev server |

M-PESA, email, and Google OAuth vars can be left blank for local development.

---


# Faraja API Documentation

## 1. Overview

The Faraja API provides endpoints for retrieving public memorial information, funeral events, memorial updates, funeral project contributions, and submitting GBV awareness activities.

The API is built using Node.js and Express, with MySQL as the database.

### Base URL

When running locally, the API base URL is:

```text
http://localhost:5000
```

### API Documentation Interface

When the backend is running, interactive API documentation is available at:

```text
http://localhost:5000/api-docs
```

This interface allows developers to inspect the documented endpoints, view request parameters, and examine response schemas.

## 2. Authentication

The six contract endpoints documented below do not explicitly attach authentication middleware in the contract router. They are therefore designed to be accessible without an authentication token, subject to the running application's actual configuration.

Other Faraja application endpoints may require authentication.

For protected endpoints, follow the authentication implementation and configuration in the backend. Do not assume that the contract endpoints and the rest of the application share identical authentication requirements.

## 3. API Endpoints

### 3.1 Get Public Memorials

**Endpoint:** `GET /memorials`

**Description:** Retrieves active, public memorials that have a funeral date and venue.

**Example request:**

```bash
curl.exe -i http://localhost:5000/memorials
```

**Observed successful response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "Sizler Coman",
    "date": "2026-11-10",
    "location": "Muhoroni Catholic Church"
  }
]
```

**Response fields:**

* `id`: Unique memorial identifier.
* `name`: Name of the deceased.
* `date`: Scheduled funeral date.
* `location`: Funeral venue.

### 3.2 Get GBV-Affected Areas

**Endpoint:** `GET /gbv-affected-areas`

**Description:** Retrieves information about areas affected by gender-based violence.

**Example request:**

```bash
curl.exe -i http://localhost:5000/gbv-affected-areas
```

**Observed successful response:** `200 OK`

```json
[]
```

**Note:** The current database does not contain a dedicated GBV-affected-areas dataset. Consequently, this endpoint currently returns an empty array rather than fabricated statistics.

### 3.3 Get Memorial Events

**Endpoint:** `GET /memorial-events`

**Description:** Retrieves scheduled funeral events associated with active, public funeral projects that have a funeral date and venue.

**Example request:**

```bash
curl.exe -i http://localhost:5000/memorial-events
```

**Observed successful response:** `200 OK`

```json
[
  {
    "id": 1,
    "memorialId": 1,
    "eventName": "Funeral Service",
    "date": "2026-11-10",
    "location": "Muhoroni Catholic Church"
  }
]
```

**Response fields:**

* `id`: Event identifier.
* `memorialId`: Identifier of the associated memorial.
* `eventName`: Name of the event.
* `date`: Scheduled event date.
* `location`: Event venue.

### 3.4 Get Memorial Updates

**Endpoint:** `GET /memorials/updates`

**Description:** Retrieves update information for active, public memorials.

**Example request:**

```bash
curl.exe -i http://localhost:5000/memorials/updates
```

**Observed successful response:** `200 OK`

```json
[
  {
    "memorialId": 1,
    "update": "Memorial information available for Muhoroni Catholic Church",
    "updatedAt": "2026-07-10T13:54:53.000Z"
  }
]
```

**Response fields:**

* `memorialId`: Identifier of the associated memorial.
* `update`: Description of the update.
* `updatedAt`: Date and time the update was recorded, in ISO 8601 format.

### 3.5 Get Funeral Project Contributions

**Endpoint:** `GET /funeral-projects/{id}/contributions`

**Description:** Retrieves contributions associated with a funeral project.

**Path parameter:**

* `id`: Required funeral project identifier.

**Example request:**

```bash
curl.exe -i http://localhost:5000/funeral-projects/1/contributions
```

**Successful response:** `200 OK`

The endpoint returns a JSON array. Each contribution contains the following fields:

* `id`: Contribution identifier.
* `funeralProjectId`: Associated funeral project identifier.
* `contributorName`: Contributor's name.
* `amount`: Contribution amount.
* `date`: Contribution date and time in ISO 8601 format.

If a project has no contributions, the expected response is an empty array.

**Error response:** `404 Not Found`

Example request:

```bash
curl.exe -i http://localhost:5000/funeral-projects/999999/contributions
```

Observed error response:

```json
{
  "message": "Funeral project not found"
}
```

This error is returned when the specified funeral project does not exist.

### 3.6 Submit a GBV Awareness Activity

**Endpoint:** `POST /awareness-activities`

**Description:** Creates an awareness activity associated with an existing memorial event.

**Content type:** `application/json`

**Required request fields:**

* `memorialEventId`: Positive integer identifying an existing memorial event.
* `activityName`: Non-empty string describing the activity.

**Optional request fields:**

* `description`: String describing the activity.
* `date`: Valid date in `YYYY-MM-DD` format.

**Example request:**

```bash
curl.exe -i -X POST http://localhost:5000/awareness-activities -H "Content-Type: application/json" -d "{\"memorialEventId\":1,\"activityName\":\"GBV Awareness Workshop\",\"description\":\"Community awareness activity\",\"date\":\"2026-11-05\"}"
```

This example uses memorial event ID `1`. Run it only when you intend to create the corresponding record in your local database.

**Successful response:** `201 Created`

The response contains the created activity's `id`, `memorialEventId`, and `activityName`. The `description` and `date` fields are included when supplied.

**Important:** Verify the successful response against the running API before treating it as a tested example.

## 4. Error Handling

The contract endpoints return JSON error responses.

Common HTTP status codes include:

| Status code                 | Meaning                                                  |
| --------------------------- | -------------------------------------------------------- |
| `200 OK`                    | The request succeeded.                                   |
| `201 Created`               | An awareness activity was created successfully.          |
| `400 Bad Request`           | The request contains missing or invalid data.            |
| `404 Not Found`             | The requested funeral project or resource was not found. |
| `500 Internal Server Error` | An unexpected server-side error occurred.                |

### Example: Missing required fields

**Request:**

```bash
curl.exe -i -X POST http://localhost:5000/awareness-activities -H "Content-Type: application/json" -d "{}"
```

**Observed response:** `400 Bad Request`

```json
{
  "message": "memorialEventId and activityName are required"
}
```

### Example: Invalid event ID

**Request:**

```bash
curl.exe -i -X POST http://localhost:5000/awareness-activities -H "Content-Type: application/json" -d "{\"memorialEventId\":-1,\"activityName\":\"Test Awareness Activity\"}"
```

**Observed response:** `400 Bad Request`

```json
{
  "message": "memorialEventId must be a positive integer"
}
```

The API returns a `message` field explaining the error.

## 5. Running Faraja Locally

### Prerequisites

Install the following:

* Node.js 18 or later.
* npm.
* XAMPP with MySQL.
* Git.

### Step 1: Start the database

1. Open XAMPP Control Panel.
2. Start MySQL.
3. Open phpMyAdmin.
4. Import the database schema from `js/Backend/database/schema.sql` if the database has not already been initialized.

Follow the project's existing database configuration when setting up the database.

### Step 2: Configure environment variables

Create or update the backend `.env` file with the appropriate local settings.

Typical settings include:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=faraja_db
JWT_SECRET=replace_with_a_local_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Use values appropriate for your local environment. Keep real credentials and secrets out of Git commits.

### Step 3: Start the backend

Open a terminal in the project root and run:

```bash
cd js/Backend
npm install
npm start
```

If your project uses a different development script, use the appropriate script defined in `js/Backend/package.json`.

The backend should listen on:

```text
http://localhost:5000
```

### Step 4: Start the frontend

Open a second terminal in the project root:

```bash
cd client
npm install
npm run dev
```

Open the frontend URL printed by Vite. In the current local configuration, this is:

```text
http://localhost:3000
```

### Step 5: Open the API documentation

With the backend running, visit:

```text
http://localhost:5000/api-docs
```

You can now inspect the API documentation and test the endpoints.

## 6. Quickstart

After starting the backend and database, open a terminal and run:

```bash
curl.exe -i http://localhost:5000/memorials
```

This sends a GET request to retrieve public memorials and displays the HTTP status and response headers alongside the response body.

A successful request should return HTTP `200 OK`.

## 7. Known Limitations

* The GBV-affected-areas endpoint currently returns an empty array because a dedicated dataset is not available.
* The memorial-events endpoint currently represents funeral services using data from funeral projects.
* The memorial-updates endpoint generates update descriptions from memorial information rather than retrieving a separate history of update records.
* The successful awareness-activity endpoint creates a database record, so test requests should use appropriate test data.

## 8. API Specification

The API contract is maintained in the root-level `openapi.yaml` file.

The specification describes the available endpoints, request parameters, request bodies, and response schemas.

The interactive Swagger UI is available at `/api-docs` while the backend is running.

