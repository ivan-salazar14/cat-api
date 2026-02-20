# Cat API - Backend Service

By: **Ivan Salazar**

## Overview

service provides information about cat breeds, integrated with [TheCatAPI](https://thecatapi.com/), and includes a user authentication system secured with **JWT** and **bcrypt**.

## Technology Stack

- **Languages:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT (JSON Web Tokens) & Bcrypt (Password hashing)
- **Testing:** Vitest
- **DevOps:** Docker, Docker Compose, GitHub Actions (CI/CD)

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Node.js v20+](https://nodejs.org/) (Optional, if running locally without Docker)

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ivan-salazar14/cat-api.git
   cd cat-api
   ```

2. **Environment Variables:**
   A `.env` file is required in the root directory.

   ```env
   PORT=3000
   MONGO_URI=mongodb://mongodb:27017/cat-api
   CAT_API_KEY=your_cat_api_key_here
   JWT_SECRET=your_super_secret_key
   ```

   *Note: If running locally outside Docker, change `mongodb:27017` to `localhost:27017`.*

---

## Running the Application

### Using Docker (Recommended)

This will start both the MongoDB database and the API service.

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

### Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Start the server:

   ```bash
   npm run start
   ```

---

## API Endpoints

### 1. Authentication (Public)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/register` | Register a new user. Query params: `email`, `password`, `name`. |
| `GET` | `/login` | Authenticate and receive a JWT. Query params: `email`, `password`. |

### 2. Cat Information (Protected - Requires JWT)

*Must include header: `Authorization: Bearer <your_token>`*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/breeds` | Get all available cat breeds. |
| `GET` | `/breeds/search` | Search for breeds. Query param: `q` (e.g., `?q=sib`). |
| `GET` | `/imagesbybreedid` | Get images for a specific breed. Query param: `breed_id`. |

---

## Testing

The project uses **Vitest** for unit testing.

```bash
npm test
```

## Architecture Details

The service is structured following **Clean Architecture**:

- **Domain/Core:** Contains entities and repository interfaces.
- **Application:** Contains business logic (Use Cases).
- **Infrastructure:** Contains external implementations:
  - **Adapters:** Integration with External APIs (TheCatAPI).
  - **Persistence:** MongoDB models and data handling.
  - **Controllers:** Express entry points.
  - **Middleware:** Auth and security filters.

## CI/CD

A GitHub Actions pipeline is configured in `.github/workflows/ci.yml` to:

1. Validate dependencies.
2. Build the TypeScript project.
3. Start a MongoDB instance and run unit tests.
4. Verify the Docker build process.
