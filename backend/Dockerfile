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

ENV PORT=4000

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["npm", "run", "dev"]