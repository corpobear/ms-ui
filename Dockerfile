FROM node:20.14.0-bookworm

WORKDIR /usr/src/application

# Copy package.json and package-lock.json separately to leverage Docker layer caching
COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

# Copy the rest of the application code
COPY . .

# Copy environment variables specific to the cloud environment
COPY .env.cloud .env

ENV ENVIRONMENT=cloud

# Ensure permissions are set correctly (if needed)
RUN chown -R root:root ./node_modules/.bin/react-scripts
RUN chmod -R 755 ./node_modules/.bin/react-scripts

EXPOSE 3000

# Start the application without trying to open a browser
CMD ["npm", "start"]
