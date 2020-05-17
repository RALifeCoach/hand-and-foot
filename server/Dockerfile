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

RUN apk add --virtual builds-deps build-base python

RUN npm install

EXPOSE 3010
