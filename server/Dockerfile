# Start from node base image
FROM  node:10-alpine

# All subsequent commands will now be run from inside this folder
RUN mkdir -p /server
WORKDIR /server
# Copy all the code in the local directory into the container’s working directory
COPY ./dist/server ./
COPY ./private.pem ./
COPY ./package*.json ./
COPY ./.env ./

RUN apk --no-cache add --virtual builds-deps build-base python
# Install dependencies (Make sure to add node_modules to your .dockerignore
# in case you accidentally install locally.)
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 3010
