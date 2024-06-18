# Use an official node image as the base
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build



# Expose the port that nginx will run on
EXPOSE 5000

# Start nginx
CMD ["npm","start"]
