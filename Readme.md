# Glean Integration

This project demonstrates the integration of Glean APIs with a web application. It includes features such as search, chat, and recommendations using Glean's backend services.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/glean-integration.git
    cd glean-integration
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    node index.js
    ```


2. Open your browser and navigate to `http://localhost:8080`.

3. To upload data from the CSV file, run:
    ```sh
    node upload-data.js
    ```

## Configuration

Update the [config.js](http://_vscodecontentref_/0) file with your Glean API credentials and other configuration settings.

## API Endpoints

- **Search API**: `/api/search`
- **Chat API**: `/api/chat`
- **Auth Token API**: `/api/getAuthTokenForEmail`

