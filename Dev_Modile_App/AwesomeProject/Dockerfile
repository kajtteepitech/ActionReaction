# Use the official Node.js runtime as a parent image
FROM node:latest

# Set working directory to /app
WORKDIR /app

# Copy project files to container
COPY . /app

WORKDIR /app

RUN yarn install

# Set working directory to android
WORKDIR /app/android

# Generate APK with gradlew
RUN ls && chmod +x ./gradlew && ./gradlew assembleRelease

# Set working directory back to /app
WORKDIR /app

# Expose port 8081 for Metro Bundler
EXPOSE 8081
