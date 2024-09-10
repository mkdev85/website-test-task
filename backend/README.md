# Website Monitoring Server

This is a Node.js server built using Express that allows users to add websites to a monitoring list, track their online/offline status, and manage them. The application periodically checks the websites' statuses and updates them in a PostgreSQL database.

## Features

- **Add Websites**: Users can add websites to a monitoring list for periodic status checks.
- **Monitor Websites**: Automatically monitor websites' online/offline status at regular intervals.
- **View Monitored Websites**: Retrieve the list of monitored websites and their current statuses.
- **Remove Websites**: Remove websites from the monitoring list.
- **Check Specific Website Status**: Retrieve the current status of any specific website.

## Technologies Used

- **Node.js**: JavaScript runtime used to build the server.
- **Express.js**: Web framework used for building the API.
- **PostgreSQL**: Database for storing website information and statuses.
- **TypeORM**: ORM (Object-Relational Mapping) library used for database management and interactions.


## Project Structure

website-monitoring-server
│
├── /config # Configuration files (DB, env, etc.)
├── /controllers # API controllers for handling requests
├── /middleware
├── /models # Database models (PostgreSQL)
├── /migration
├── /seeders
├── /routes # Express routes
├── /services # Business logic and helper functions
├── /utils # Utility functions (status check, etc.)
├── data-sourse.ts (database options)
└── index.js # Entry point to the application



## Prerequisites

To run this project, you need the following installed:

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/website-monitoring-server.git
   cd website-monitoring-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL database:**

   - Create a new database in PostgreSQL:

     ```sql
     CREATE DATABASE website_monitoring;
     ```

   - Update the `.env` file with your PostgreSQL credentials:
     ```
     NODE_ENV=development
     POSTGRES_USER=your_username
     POSTGRES_PASSWORD=your_password
     POSTGRES_DB=your_db
     POSTGRES_HOST=localhost
     POSTGRES_PORT=5432
     APP_PORT=4000
     ```

4. **Run database migrations:**

   - Use the following command to run migrations and create the `websites` table:

   ```bash
   npm run migration:run
   ```

5. **Seed the database with initial data:**

   - Populate the database with 20 website entries using the seeding script:

   ```bash
   npm run seed
   ```

6. **Run the server:**

   - Start the server using:

   ```bash
   npm run dev
   ```

7. ## API Endpoints

### 1. Get Websites Data

- **Endpoint**: `GET /api/v1/websites/`
- **Description**: Retrieve a list of websites with optional filtering and pagination.

#### Query Parameters:

- `page` (optional): Page number for pagination. Defaults to `1` if not provided.
- `page_size` (optional): Number of items per page. Defaults to `10` if not provided.
- `search_by_website_keyword` (optional): Search term to filter websites by their name.
- `status` (optional): Filter websites based on their status (`online`, `offline`).

#### Request Example:

````http
GET http://localhost:4000/api/v1/websites/?page=1&page_size=5&search_by_website_keyword=example&status=online


````
### 2. Create Website

- **Endpoint**: `POST /api/v1/websites`
- **Description**: Create a new website entry.

#### Request Body:
- `name` (required): The name of the website.
- `url` (required): The URL of the website.

#### Request Example:
```http
POST http://localhost:4000/api/v1/websites
Content-Type: application/json

{
  "name": "New Website",
  "url": "http://www.newwebsite.com"
}
```

### 3. Delete Website

- **Endpoint**: `DELETE /api/v1/websites/:id`
- **Description**: Delete a website by its ID.

#### Path Parameters:
- `id` (required): The unique identifier of the website to be deleted.

#### Request Example:
```http
DELETE http://localhost:4000/api/v1/websites/1

```
### 4. Update Website

- **Endpoint**: `PATCH /api/v1/websites/:id`
- **Description**: Update an existing website entry.

#### Path Parameters:
- `id` (required): The unique identifier of the website to be updated.

#### Request Body:
- `name` (optional): The new name for the website.
- `url` (optional): The new URL for the website.

#### Request Example:
```http
PATCH http://localhost:4000/api/v1/websites/1
Content-Type: application/json

{
  "name": "Updated Website Name",
  "url": "http://www.updatedwebsite.com"
}
```
### 5. Check Website Status

- **Endpoint**: `GET /api/v1/websites/:id/status`
- **Method**: `GET`
- **Description**: Retrieve the status of a specific website by its unique ID.

#### Path Parameters:
- `id` (required): The unique identifier of the website.

#### Request Example:
```http
GET http://localhost:4000/api/v1/websites/96829180-01b1-41c7-9f6a-da132a9a6343/status

```


## Entity Details

### Website Entity

The `Website` entity represents the structure of the `websites` table in the database. This entity is managed using TypeORM and defines the following fields:

#### Fields:

- **id** (`PrimaryGeneratedColumn`):
  - Type: `uuid`
  - Description: A unique identifier for each website entry.

- **name** (`Column`):
  - Type: `varchar`
  - Description: The name of the website.

- **url** (`Column`):
  - Type: `varchar`
  - Description: The URL of the website.
  - **Unique Constraint**: Each URL must be unique across all website entries.

- **status** (`Column`):
  - Type: `enum`
  - Enum Values: `ONLINE`, `OFFLINE`
  - Default: `OFFLINE`
  - Description: The current status of the website.

- **createdAt** (`CreateDateColumn`):
  - Type: `timestamp`
  - Description: The timestamp when the website entry was created.

- **updatedAt** (`UpdateDateColumn`):
  - Type: `timestamp`
  - Description: The timestamp when the website entry was last updated.


## Docker Setup

### Dockerfile

The Dockerfile defines the steps to build a Docker image for the application. Below are the details of the Dockerfile used for this project:

```dockerfile
# Use the official Node.js image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variable for the port
ENV PORT=4000

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["npm", "run", "dev"]
