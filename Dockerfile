# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package*.json and .env into the /app/ directory
COPY package*.json .env ./

# Copy the contents of the 'api' and 'schemas' directories into the container
COPY ./api ./api
COPY ./schemas ./schemas

# Set the permissions for all the files to be executable
RUN chmod -R 755 /app/

# Install application dependencies
RUN npm install

# Start the application
CMD ["node", "api/express.js"]
