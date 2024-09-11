# Website List Test App

A brief description of what this microservice-based test task does:

## Table of Contents
- [Basic Usage](#usage)
- [Libraries](#libraries)
  - [Frontend Libraries](#frontend-libraries)
  - [Backend Libraries](#backend-libraries)
- [Project Setup](#project-setup)
- [Technical Implementation](#technical-implementation)
  - [Basic Architechture Diagram](#basic-architechture-diagram)
  - [Implementation Details (Microservices)](#implementation-details)

## Usage

A brief overview of the basic features of this app.

- **Frontend**
  The frontend includes two main functionalities:

  - **Add Website**: Users can add a website using the name and URL fields.
  - **List Websites**: Users can view all websites. Pagination is implemented on the backend to load 10 records at a time. Users can filter the data by website name and status.  

- **Backend**
 
   - **Model**:  A single model for websites includes the following fields:
     - status
     - url [Note: url is unique]
     - name 
   

  - As per the task, we have implemented following APIs:

    **APIs:**

    - **GET** `/api/v1/websites`

      Description: Retrieves a list of websites with pagination. By default, it returns 10 records per page and supports 
      filtering by status and name.

    - **GET** `/api/v1/websites/id/status`

      Description: Retrieves the status of a specific website based on its unique identifier (id). This endpoint returns the current status of the website, such as "active", "inactive", or any other status defined in your system.
    
    - **POST** `/api/v1/websites`

      Description: Creates a new website using the name and url.
    
    - **PUT** `/api/v1/websites/:id`

      Description: Updates a specific website's information by id.
    
    - **DELETE** `/api/v1/websites/:id`

      Description: Deletes a specific website by id.

## Libraries

Here are the main libraries used in the project:

### Frontend Libraries
- NextJS
- React
- MaterialUI
- Typescript
- React-query
- Axios

### Backend Libraries
- ExpressJS
- Typescript
- TypeORM
- `Bull`
- dotenv and convict

Additionally, we use `Docker` for setting up the environments.

## Project Setup

The project uses Docker to manage the development environment, with configurations combined using Docker Compose. You can find the `docker-compose.yml` file in the root directory.

### Prerequisites

Make sure the following applications are installed on your system:

- Docker (with Docker Compose)
- Makefile

### Docker Images

The following Docker images are used in the services:
- `node:21-alpine`
- `redis`
- `postgres:alpine`

### Setup Instructions

Please have a look at the steps to start the project:

#### Update Environment Variables: ####

- Update the .env files for the following services
  - backend
  - frontend
  - website-monitor-service  
  - You can modify the .env.sample file to .env if you don't need separate configurations. You can find `.env.sample` file in all services folders i.e backend, frontend and website-monitor-service.

#### Build the Project: ####

`sudo make build`

This command internally calls `docker compose build` to build all services (backend, frontend, database, website monitor service).

#### Database Configuration: ####

- Run Migration using the command `sudo make migrate-run`.
- Run seeder using the command `sudo make seed-run`. This command inserts 20 records into the websites table.

#### Start Services: ####

Once build done, you can use following command to start the services:

`sudo make up` 

This command will internally call the `docker compose up` command and run all the services in detach mode.

#### Other Make Commands ####

Some other `make commands` for the `docker services`:

- `sudo make build-no-cache`: This command will create the build for all the services without cache.
- `sudo make down`: This command will down all the running services.
- `sudo make logs`: This commnad will show the logs of all the services. You can use the following commands to view the logs of specific services:
    - `sudo make logs-frontend`: This command will show frontend service logs.
    - `sudo make logs-backend`: This command will show backend service logs.
    - `sudo make logs-website-monitor:`: This command will show website monitor logs.
    - `sudo make logs-db`: This command will show database logs.
- `sudo make clean-containers`: This command will clear all the containers.

#### Ports exposed
- For frontend:

  You can check `localhost:3000`

- For backend:

  You can check `localhost:4000`

## Technical Implementation

### Basic Architechture diagram: 
    
   ![Diagram](https://drive.google.com/uc?export=view&id=1n_09rE5xg_CPiNM37G7FXcfZoF53oO8L)
    
### Implementation Details

The project uses a **microservices architecture** with Docker and Docker Compose to manage various services. You can check `docker-compose.yml` 
file for more details.

We have divided this task into following services:
- Frontend
- Backend
- Website monitor service
  - Redis service  
- DB service

**Frontend Service**: 

- Technologies: Next.js, Material-UI, React Query.
- Features: 
  - Website create, read and delete operation.
  - Responsive design with materialUI.
  - State management with react-query.

**DB Service**: 

- Technology: PostgreSQL.

**Backend service**: 
- Exposes APIs to the frontend and interacts with the `DB service`.

**Website Monitor service**: 

As per the requirement, we have to check the websites status after certain periods. **Now if we use the same backend service for scheduling the cron job then there would be following issues:**
- It would block the main backend service event loop.
- There would be latency issues for client requests.
- Client may face timeout while calling the backend APIs.

Now, to overcome all the issues, we have created separate service i.e `website-monitor service`. This service do following:
- It uses the `bull` package for scheduling the cron job which internally uses the `redis`for queuing.
- We are running two `cron jobs` in this service:

  **website-monitoring**: 
   - This job runs after every 2 minutes.
   - It fetched all the websites data and check the each website status. Please have a look at the following code snippet:
      
    ```
    try {
      await axios(website.url)
      // status online
    } catch (error e) {
      // status offline
    }
    ```
   - To improve the performance, we are using the following:
     - `Promise.all`: We are checking all websites status parallelly.
     - `Promise.race`: While checking the status using the above code snippet, It might possible that we don't get any response until 6-7 seconds, In such case, we stop the status checking after `3 seconds` using the `Promise.race`.

   **random-website-update**: [**For the Test task only**]
    - This job is used to make `website status` more interactive on frontend side. This implementation only did for the test task, It is used only for the development mode.
    - The idea behind this job implementation is that the website status is rarely update, so we will not see any frequent status update on the frontend side. Now, to make it look more interactice, We are doing following in this job:
      - This job would run after event minutes.
      - It randomly selects the 10 websites records.
      - Toggle websites records i.e if website records is `online` the change it to `offline` or if website status is `offline` then change it to `online`   
- Both Jobs timer can configured using the following parameters:
  - `MONITOR_INTERVAL`: Default value is 120000 [2 minutes], You can modify it using the .env file.
  - `RANDOM_WEBSITE_UPDATE_INTERVAL`:  Default value is 60000 [1 minute], You can modify it using the .env file.
  