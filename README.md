# Glean Integration

A comprehensive Node.js application that integrates with Glean's enterprise search APIs, providing search, chat, answers, and document indexing capabilities through a web interface.

## Overview

This project demonstrates a production-ready integration with Glean's backend services, featuring:

- 🔍 **Search**: Full-text search across indexed documents
- 💬 **Chat**: Interactive chat interface powered by Glean's AI
- ❓ **Answers**: Get direct answers from your knowledge base
- 📊 **Document Indexing**: Bulk upload and index documents from CSV files
- 🔐 **Authentication**: OAuth 2.0 integration with Identity Provider (IDP)
- 🐳 **Docker Support**: Containerized deployment ready

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js 23.x or higher (Alpine 3.20 recommended for Docker)
- npm or yarn package manager
- Glean API credentials (client token, global token, indexing token)
- Identity Provider (IDP) credentials for OAuth authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-org/glean-integration.git
   cd glean-integration
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `creds.js` file in the root directory:
   ```js
   module.exports = {
       idpClientId: 'your-idp-client-id',
       idpSecret: 'your-idp-client-secret',
       idpHost: 'https://your-idp-host.com',
       idpRedirectUri: 'http://localhost:8080/api/auth/getGleanToken'
   }
   ```

## Configuration

Update the `config.js` file with your Glean API credentials:

```js
module.exports = {
    indexingToken: 'your-indexing-token',
    clientToken: 'your-client-token',
    globalToken: 'your-global-token',
    host: 'https://your-glean-instance.glean.com',
    loggingPath: './logs',
    // ... other configuration
}
```

### Environment Variables

- `PORT`: Server port (default: 8080)

## Usage

### Starting the Server

Development mode (with auto-reload):
```sh
npm run dev
```

Production mode:
```sh
node index.js
```

The server will start on `http://localhost:8080` (or the port specified in the `PORT` environment variable).

### Web Interface

Open your browser and navigate to `http://localhost:8080` to access the web interface.

### Uploading Data

To bulk index documents from a CSV file:

```sh
node upload-data.js
```

Ensure your CSV file is properly formatted and the path is configured in `config.js`.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/authorize` | Create authentication token |
| GET | `/api/auth/sendToIDP` | Redirect to Identity Provider |
| GET | `/api/auth/getGleanToken` | Exchange IDP token for Glean token |
| GET | `/api/auth/whoAmI` | Get current user information |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search` | Search documents with query parameters |

### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send a chat message |
| GET | `/api/chat` | List chat conversations |
| DELETE | `/api/chat` | Delete a chat conversation |

### Answers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/answers` | Get answers to queries |

### Indexing

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/index` | Index documents |
| POST | `/api/index/datasourcestatus` | Get data source status |
| POST | `/api/index/checkuser` | Check users in data source |
| POST | `/api/index/indexuser` | Index users in data source |

## Docker Deployment

### Building the Image

```sh
docker build -t glean-integration .
```

### Running the Container

```sh
docker run -d \
  -p 8080:8080 \
  -e PORT=8080 \
  -v $(pwd)/creds.js:/home/node/app/creds.js \
  -v $(pwd)/logs:/home/node/app/logs \
  --name glean-app \
  glean-integration
```

### Docker Compose (Optional)

Create a `docker-compose.yml` file for easier deployment:

```yaml
version: '3.8'
services:
  glean-integration:
    build: .
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
    volumes:
      - ./creds.js:/home/node/app/creds.js
      - ./logs:/home/node/app/logs
      - ./cache:/home/node/app/cache
```

Run with:
```sh
docker-compose up -d
```

## Project Structure

```
glean-integration/
├── index.js                 # Main application entry point
├── config.js                # Configuration settings
├── upload-data.js           # Bulk document upload script
├── Dockerfile               # Docker container definition
├── package.json             # Node.js dependencies
├── lib/
│   ├── api/                 # Glean API client modules
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── searching.js
│   │   ├── answers.js
│   │   └── indexing.js
│   ├── controllers/         # Request handlers
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── search.js
│   │   ├── answers.js
│   │   └── indexing.js
│   ├── middlewares/         # Express middlewares
│   │   ├── auth-token-extract.js
│   │   ├── auth-state-extract.js
│   │   └── extract-api-host.js
│   ├── routes/              # API route definitions
│   ├── models/              # Data models
│   ├── utils/               # Utility functions
│   └── logger/              # Logging functionality
├── web/                     # Static web assets
│   ├── index.html
│   └── assets/
├── cache/                   # Application cache (gitignored)
├── logs/                    # Application logs (gitignored)
└── input/                   # Input data files
```

## Development

### Code Style

This project uses ESLint for code quality. Run linting with:

```sh
npm run lint
```

### Logging

Logs are stored in the `./logs` directory by default. The logger supports:
- File logging (rotating logs)
- Console output
- Configurable log levels

### Caching

The application uses `keyv` for caching with in-memory storage. Cache data is ephemeral by default.

## Features

### Authentication Flow

1. User initiates login via `/api/auth/sendToIDP`
2. Redirected to Identity Provider for authentication
3. IDP redirects back with authorization code
4. Exchange code for Glean token via `/api/auth/getGleanToken`
5. Token stored in cookies for subsequent requests

### Middleware Pipeline

- **CORS**: Configured for `http://localhost:5173` (frontend dev server)
- **Cookie Parser**: Handles authentication cookies
- **Auth State Extraction**: Validates and extracts auth state
- **Auth Token Extraction**: Adds auth token to request body
- **API Host Extraction**: Determines target Glean API host

### Error Handling

All API requests include comprehensive error handling with:
- Detailed logging
- User-friendly error messages
- HTTP status code propagation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Support

For issues, questions, or contributions, please open an issue in the GitHub repository.

---

**Note**: This is a demonstration project. Ensure proper security measures (HTTPS, secure token storage, rate limiting, etc.) before deploying to production.
