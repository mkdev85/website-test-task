# Use Node.js 18 Alpine as the base image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /website-monitor-service

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Define the command to run the app
CMD ["npm", "run", "dev"]