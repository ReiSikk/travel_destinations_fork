# Travel Destinations

This is a full stack application with a frontend, a backend built with Express.js, and a MongoDB database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/).
* You have a basic understanding of Docker and Docker Compose.

## Using My Full Stack Application

To use My Full Stack Application, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone <repository-url>

2. Navigate to the project directory

cd <travel_destinations_fork>

3. Create a .env file to store neccessary environment variables

jwt_secret="D9678F1E8D648B7D57D7D5CFC4BF40EF589800CEF4C047AE2B24E09A2E7E270F"
MONGODB_URI="mongodb://127.0.0.1:27017/travel_destinations_ola"

4. Start the application using Docker Compose

docker compose up


This will build the Docker images for the frontend and backend, create the Docker volumne and start the containers

The frontend will be accessible at http://localhost:5501, and the backend will be accessible at http://localhost:4000.


This is a school project for CPHBusiness Web Development PBA. 
